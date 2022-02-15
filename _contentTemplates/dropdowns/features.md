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
| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `Width` | `string` | the width of the component. It will target both the dropdown and the main element if the dropdown has no specific width set. @[template](/_contentTemplates/inputs/inputs-width-template.md#inputs-width-information)
| `Class` | `string` | the CSS class that will be rendered on the main wrapping element of the component.
#end

#popup-settings
| Parameter      | Type | Description
| ----------- | ----------- | -----------|
| `Class` | `string` | additional CSS class to customize the appearance of the dropdown.
| `Height` | `string` | the height of the expanded dropdown list element.
| `Width` | `string` | the width of the expanded dropdown list element. If you don't specify a value, the dropdown width will match the main element which can help with responsive layouts and 100% widths.
#end