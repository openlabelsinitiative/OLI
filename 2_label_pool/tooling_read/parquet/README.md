# Label Pool Parquet Exports

This repository contains exports of all labels from [OLI Label Pool](2_label_pool/README.md) in parquet file format.

## File Types

Two types of parquet files are available:

- **Raw**: Each row is equivalent to one attestation
- **Decoded (recommended)**: Each row represents one `tag_id`, `value` & `chain_id` combination, as defined by the [OLI Data Model](1_data_model/README.md)

## API Endpoints

Access the parquet files via:

Raw:
```
https://api.growthepie.xyz/v1/oli/labels_raw.parquet
```
Decoded:
```
https://api.growthepie.xyz/v1/oli/labels_decoded.parquet
```

## Getting Started

A Python script is available in the [main.ipynb](main.ipynb) notebook in this repository. Script downloads and also turns the parquet files into a df.

## Update Schedule

The parquet files are updated daily at 5:30am UTC.