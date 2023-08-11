#item-template
The `ItemTemplate` determines how the individual items are rendered in the dropdown of the component. By default, the text from the particular suggestions is rendered.

The `ItemTemplate` exposes a `context` which represents the data item object. Cast it to the respective model type to access or render the item properties.
#end

#tag-template
The `TagTemplate` determines how the selected items are rendered in the main element of the component. By default, the text of the particular item is rendered inside the tag.

The `TagTemplate` exposes a `context` which represents the data item object. Cast it to the respective model type to access or render the item properties.
#end

#header-template
The `HeaderTemplate` controls the content that you can place above the list of items inside the dropdown element. It is always visible when the combobox is expanded. By default it is empty.
#end

#footer-template
The `FooterTemplate` allows you to render content below the list of items inside the dropdownlist element. It is always visible when the dropdown is expanded. By default it is empty.
#end

#no-data-template
The `NoDataTemplate` controls the content of the popup element when the component does not have any items. By default, simply "No data" text is rendered.
#end