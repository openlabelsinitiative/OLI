## `tag_id` Definitions

Each `tag_id` is linked to a `value` in the OLI-framework, allowing it to flexibly represent complex concepts. The definition of each tag_id is stored in the [tag_definitions.yml](tags/tag_definitions.yml) file, which contains key information such as ID, name, description, type, creator, and version for each `tag_id`.

- **`id`**: unique identifier for the tag
- **`name`**: descriptive name of the tag
- **`description`**: short explanation of what the tag represents
- **`type`**: data type of the tag
- **`value_set`** (optional): predefined value set or URL to an external value set
- **`creator`**: entity responsible for creating the tag
- **`version`**: version of this `tag_id`

### Predefined Value Sets
Certain tags can only take values from predefined value sets specified in the `tag_definitions.yml` file under the `value_set` key. Examples of such tags include the `tag_ids`: `oli.owner_project` and `oli.usage_category`. 

These predefined value sets can reside and be maintained in the OLI GitHub repository under the [tags/valuesets](tags/valuesets) folder or in external directories. 

##### External Value Sets 
An example of an external value set is `oli.deployer_project`, which uses the names from the [OSS-directory](https://github.com/opensource-observer/oss-directory/tree/main) as unique identifiers for projects.

##### Internal Value Sets
An example of an internal value set is `oli.usage_category`, for which we defined a value set to ensure standardization. The full list with the hierarchical mapping can be found [here](https://github.com/openlabelsinitiative/OLI/blob/main/valuesets/category_definitions.yml). The OLI-maintained value sets are community-based and can be expanded through a PR.

### Data model
The dbml file for the OLI data model can be found [here](https://github.com/openlabelsinitiative/oli/blob/main/data_model/data_model.dbml). Further an interactive dbml OLI model can be found [here](https://dbdiagram.io/d/OpenLabelsInitative-66e97037a0828f8aa61f60ce)
