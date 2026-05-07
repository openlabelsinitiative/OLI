### Public BigQuery Tables

Historical OLI data is available through public BigQuery tables:

- `growthepie.oli_public.attestations`
- `growthepie.oli_public.labels`

These are native BigQuery tables, partitioned by `time_created` and clustered for common filters.

### Example: Query Labels

```sql
SELECT
  chain_id,
  address,
  tag_id,
  tag_value,
  attester,
  time_created,
  last_updated_time
FROM `growthepie.oli_public.labels`
WHERE chain_id = 'eip155:8453'
  AND tag_id = 'owner_project'
LIMIT 100;
```

### Example: Get All Labels For One Address

```sql
SELECT
  *
FROM `growthepie.oli_public.labels`
WHERE address = '0x8e3f4c587f72123678a72decf4dade8b447b1a50'
ORDER BY time_created DESC;
```

### Example: Query Raw Attestations

```sql
SELECT
  id,
  time_created,
  chain_id,
  attester,
  recipient,
  revoked,
  is_offchain,
  ipfs_hash,
  schema_info,
  tags_json,
  raw,
  last_updated_time
FROM `growthepie.oli_public.attestations`
WHERE chain_id = 'eip155:8453'
ORDER BY time_created DESC
LIMIT 100;
```

### Update Model

Both tables are updated incrementally. Rows include `last_updated_time`, which changes when an attestation or derived label is updated.

Primary keys:

- `attestations`: `id`
- `labels`: `id`, `tag_id`

For most use cases, querying the BigQuery tables directly returns the current state. Revoked attestations are available in `attestations` via the `revoked` column. The `labels` table is derived from non-revoked attestations.

### Costs

The dataset is public, but BigQuery query costs are charged to the project running the query. Use filters on `chain_id`, `tag_id`, `address`, or `time_created` to reduce scanned data.