import { AttestationShareablePackageObject, EAS, NO_EXPIRATION, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import axios from 'axios';
import * as fs from 'fs';
import * as csv from 'csv-parse/sync';

// Type definitions
export type StoreAttestationRequest = { 
    filename: string; 
    textJson: string;
};

export type StoreIPFSActionReturn = {
    error: null | string;
    ipfsHash: string | null;
    offchainAttestationId: string | null;
};

type AttestationLog = {
    timestamp: string;
    address: string;
    success: boolean;
    ipfsHash?: string | null; 
    offchainAttestationId?: string | null; 
    error?: string;
};

// Configuration
const baseURL = 'https://base.easscan.org/'; // 'https://base-sepolia.easscan.org/'
const EASContractAddress = '0x4200000000000000000000000000000000000021';
const schemaUID = '0xb763e62d940bed6f527dd82418e146a904e62a297b8fa765c9b3e1f0bc6fdd68';

// Helper Functions
function isHexString(value: any): boolean {
  return typeof value === "string" && /^0x[0-9a-fA-F]+$/.test(value);
}

function convertBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (typeof obj === 'boolean' || typeof obj === 'number') {
    return obj; // Keep booleans and numbers as-is
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }

  if (typeof obj === 'object') {
    const converted: any = {};
    for (const key in obj) {
      converted[key] = convertBigIntToString(obj[key]);
    }
    return converted;
  }

  return obj;
}

function saveToLogFile(logs: AttestationLog[]) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logFileName = `attestation_logs_${timestamp}.json`;
  
  try {
    fs.writeFileSync(logFileName, JSON.stringify(logs, null, 2));
    console.log(`Logs saved to ${logFileName}`);
  } catch (error) {
    console.error('Error saving log file:', error);
  }
}

// API Functions
async function submitSignedAttestation(pkg: AttestationShareablePackageObject) {
  const convertedPkg = convertBigIntToString(pkg);
  const data: StoreAttestationRequest = {
    filename: `eas.txt`,
    textJson: JSON.stringify(convertedPkg),
  };
  return await axios.post<StoreIPFSActionReturn>(
    `${baseURL}/offchain/store`,
    data
  );
}

// Main Processing Function
async function processRow(
  row: any,
  eas: EAS,
  offchain: any,
  schemaEncoder: SchemaEncoder,
  signer: ethers.Wallet
): Promise<AttestationLog> {
  const timestamp = new Date().toISOString();
  
  try {
    // Create tags_json object only from fields that exist in the CSV
    const tagsObject: { [key: string]: any } = {};
    
    // List of all possible tags as defined in the OLI Data Model
    const possibleFields = [
      'is_owner',
      'is_eoa',
      'is_contract',
      'is_factory_contract',
      'is_proxy',
      'is_safe_contract',
      'contract_name',
      'deployment_tx',
      'deployer_address',
      'owner_project',
      'deployment_date',
      'erc_type',
      'erc20.symbol',
      'erc20.decimals',
      'erc721.name',
      'erc721.symbol',
      'erc1155.name',
      'erc1155.symbol',
      'usage_category',
      'version',
      'audit',
      'contract_monitored',
      'source_code_verified'
    ];

    // Only add fields that exist in the row and have non-null values
    for (const field of possibleFields) {
      if (field in row && row[field] !== null && row[field] !== undefined && row[field] !== '') {
        if (row[field] === 'true') {
          tagsObject[field] = true; // Convert "true" string to boolean
        } else if (row[field] === 'false') {
          tagsObject[field] = false; // Convert "false" string to boolean
        } else if (!isNaN(row[field]) && !isHexString(row[field])) {
          tagsObject[field] = Number(row[field]); // Convert numeric values, but not hex strings
        } else {
          tagsObject[field] = row[field]; // Keep everything else as is (like hex strings)
        }
      }
    }

    const encodedData = schemaEncoder.encodeData([
      { name: 'chain_id', value: row.chain_id || '', type: 'string' },
      { name: 'tags_json', value: JSON.stringify(tagsObject), type: 'string' }
    ]);

    const offchainAttestation = await offchain.signOffchainAttestation(
      {
        recipient: row.address,
        expirationTime: NO_EXPIRATION,
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true,
        schema: schemaUID,
        refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      },
      signer
    );

    const pkg: AttestationShareablePackageObject = {
      sig: offchainAttestation,
      signer: signer.address
    };

    const response = await submitSignedAttestation(pkg);
    console.log(`Attestation submitted successfully for address ${row.address}:`, response.data);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
        timestamp,
        address: row.address,
        success: true,
        ipfsHash: response.data.ipfsHash || undefined,
        offchainAttestationId: response.data.offchainAttestationId || undefined
    };
  } catch (error) {
    console.error(`Error processing attestation for address ${row.address}:`, error);
    console.error('Problematic row data:', row);
    
    return {
      timestamp,
      address: row.address,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Main Function
async function main() {
  const provider = new ethers.JsonRpcProvider('https://base-rpc.publicnode.com'); // `https://sepolia.base.org`
  const privateKey = '...'; // Replace with your private key
  const signer = new ethers.Wallet(privateKey, provider);

  // Initialize EAS instance
  const eas = new EAS(EASContractAddress);
  eas.connect(provider);

  // Get offchain instance
  const offchain = await eas.getOffchain();

  // Initialize SchemaEncoder with new schema
  const schemaEncoder = new SchemaEncoder('string chain_id,string tags_json');

  try {
    const fileContent = fs.readFileSync('example-labels.csv', 'utf-8');
    const records = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    console.log(`Found ${records.length} records to process`);

    const attestationLogs: AttestationLog[] = [];
    let successCount = 0;

    for (const row of records) {
      const log = await processRow(row, eas, offchain, schemaEncoder, signer);
      attestationLogs.push(log);
      
      if (log.success) {
        successCount++;
      }
      
      console.log(`Processed ${successCount}/${records.length} attestations`);
    }

    saveToLogFile(attestationLogs);

    console.log(`Completed processing. Successfully processed ${successCount}/${records.length} attestations`);
    
    const failedAttestations = attestationLogs.filter(log => !log.success);
    if (failedAttestations.length > 0) {
      console.log('\nFailed attestations:');
      failedAttestations.forEach(log => {
        console.log(`Address: ${log.address}`);
        console.log(`Error: ${log.error}`);
        console.log('---');
      });
    }

  } catch (error) {
    console.error('Error reading or processing CSV:', error);
  }
}

// Run main function
main().catch((error) => {
  console.error('Error in main function:', error);
});