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
const baseURL = 'https://optimism.easscan.org';
const EASContractAddress = '0x4200000000000000000000000000000000000021';
const schemaUID = '0x5283a290268ebd286c379b633b1f8f8241edb577a074d67a3ceea636461dd13f'; // use latest schema UID

// Helper Functions
function convertBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString();
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

function parseErcType(ercType: string): number[] {
  if (!ercType || ercType === '') {
    return [];
  }
  return ercType.split(',').map(num => parseInt(num.trim()));
}

function parseBoolean(value: string): boolean {
  return value.toLowerCase() === 'true';
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
    const encodedData = schemaEncoder.encodeData([
      { name: 'chain_id', value: parseInt(row.chain_id), type: 'uint256' },
      { name: 'is_owner', value: parseBoolean(row.is_owner), type: 'bool' },
      { name: 'is_eoa', value: parseInt(row.is_eoa), type: 'uint8' },
      { name: 'is_contract', value: parseInt(row.is_contract), type: 'uint8' },
      { name: 'is_factory_contract', value: parseInt(row.is_factory_contract), type: 'uint8' },
      { name: 'is_proxy', value: parseInt(row.is_proxy), type: 'uint8' },
      { name: 'is_safe_contract', value: parseInt(row.is_safe_contract), type: 'uint8' },
      { name: 'name', value: row.name, type: 'string' },
      { name: 'deployment_tx', value: row.deployment_tx, type: 'string' },
      { name: 'deployer_address', value: row.deployer_address, type: 'address' },
      { name: 'owner_project', value: row.owner_project, type: 'string' },
      { name: 'deployment_date', value: parseInt(row.deployment_date), type: 'uint256' },
      { name: 'erc_type', value: parseErcType(row.erc_type), type: 'uint16[]' },
      { name: 'erc20_symbol', value: row.erc20_symbol, type: 'string' },
      { name: 'erc20_decimals', value: parseInt(row.erc20_decimals), type: 'uint8' },
      { name: 'erc721_name', value: row.erc721_name, type: 'string' },
      { name: 'erc721_symbol', value: row.erc721_symbol, type: 'string' },
      { name: 'erc1155_name', value: row.erc1155_name, type: 'string' },
      { name: 'erc1155_symbol', value: row.erc1155_symbol, type: 'string' },
      { name: 'usage_category', value: row.usage_category, type: 'string' },
      { name: 'version', value: parseInt(row.version), type: 'uint8' },
      { name: 'audit', value: row.audit, type: 'string' },
      { name: 'contract_monitored', value: row.contract_monitored, type: 'string' },
      { name: 'source_code_verified', value: row.source_code_verified, type: 'string' },
    ]); // use latest OLI data model

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
        ipfsHash: response.data.ipfsHash || undefined,  // Convert null to undefined if needed
        offchainAttestationId: response.data.offchainAttestationId || undefined  // Convert null to undefined if needed
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
  const provider = new ethers.JsonRpcProvider('https://mainnet.optimism.io'); // change to your provider if needed
  const privateKey = '...'; // Replace with your private key
  const signer = new ethers.Wallet(privateKey, provider);

  // Initialize EAS instance
  const eas = new EAS(EASContractAddress);
  eas.connect(provider);

  // Get offchain instance
  const offchain = await eas.getOffchain();

  // Initialize SchemaEncoder
  const schemaEncoder = new SchemaEncoder(
    'uint256 chain_id,bool is_owner,uint8 is_eoa,uint8 is_contract,uint8 is_factory_contract,uint8 is_proxy,uint8 is_safe_contract,string name,string deployment_tx,address deployer_address,string owner_project,uint256 deployment_date,uint16[] erc_type,string erc20_symbol,uint8 erc20_decimals,string erc721_name,string erc721_symbol,string erc1155_name,string erc1155_symbol,string usage_category,uint8 version,string audit,string contract_monitored,string source_code_verified'
  ); // use latest schema

  try {
    const fileContent = fs.readFileSync('example-labels.csv', 'utf-8'); // Replace with your file name
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