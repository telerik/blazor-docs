#data-binding
requires a data source so that it can populate the dropdown with data. To provide a data source, use the `Data` property.
#end

#filtering
has a built-in filter that narrows down the shown suggestions as the end-user types. To configure this feature, use the `Filterable` parameter. Additionally, you can choose between different filter operators and configure after how many symbols the list with suggestions will appear.
#end

#grouping
enables you to group the listed suggestions into categories so you can help the end-user to browse faster through longer lists.
#end

#templates
You can use the functionality of the built-in templates and customize the default rendering of the component.
#end

#validation
You can ensure that the component value is acceptable by using the built-in validation. [Read more about input validation...]({%slug common-features/input-validation%}).
#end

#virtualization
By virtualizing the elements in the dropdown, you can use huge data sources without performance issues. The UI virtualization works with both local and remote data.
#end

#styling
| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the component. Use it to [override the theme or apply custom styles]({%slug themes-override%}). |
| `Width` | `string` | The width of the component. It will target both the dropdown and the main element if the dropdown has no specific width set. @[template](/_contentTemplates/inputs/inputs-width-template.md#inputs-width-information) |
#end

#popup-settings
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `AnimationDuration` | `int` | The animation duration of the popup in milliseconds. |
| `Class` | `string` | Additional CSS class to customize the appearance of the popup. |
| `Height` | `string` | The height of the popup. |
| `MinHeight`| `string` | The minimum height of the popup. |
| `MinWidth` | `string` | The minimum width of the popup. |
| `MaxHeight` | `string` | The maximum height of the popup. |
| `MaxWidth` | `string` | The maximum width of the popup. |
| `Width` | `string` | The width of the popup. If you don't specify a value, the dropdown width will match the anchor element width which can help with responsive layouts and 100% widths. |

>If the **Virtualization** feature is enabled, the dropdown popup width does not depend on the data items. Thus, using virtualization alongside long items requires a fixed popup `Width`, e.g., '300px'. You can determine this fixed width value by identifying the longest item in the dropdown collection and calculating the required pixel width based on it.
#end
