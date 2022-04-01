#filter-row-customization-properties

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `DefaultFilterOperator` | `FilterOperator` | Sets the default filter operator in the column it is declared for. Accepts a member of the `FilterOperator` enum. The selected operator must be applicable for the specific data type. Check the supported options in the [Filter Operators]({%slug common-features-filter-operators%}) article.
| `ShowFilterCellButtons` | `bool` <br/> (`true`) | controls the visibility of the filter buttons
#end

#filter-menu-customization-properties

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter      | Type and Default Value | Description
| ----------- | ----------- | -----------|
| `DefaultFilterOperator` | `FilterOperator` | Sets the default filter operator in the column it is declared for. Accepts a member of the `FilterOperator` enum. The selected operator must be applicable for the specific data type Check the supported options in the [Filter Operators]({%slug common-features-filter-operators%}) article. The provided default filter operator will be applied for both filters in the menu.
#end

#filter-debounce-delay-customization

By default, the filtering will be debounced with 150ms. Configure that with the following component parameter:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter      | Type and Default Value | Description
| ----------- | ----------- | -----------|
| `FilterRowDebounceDelay` | `int` <br/> 150 | Time in milliseconds between the last typed symbol in the input and the actual filtering. Affects how fast the component fires the `OnFilter` event. Use it to balance between client-side performance and number of database queries.
#end