#navman-used
* The `UrlField` has a default value (`Url`) and that will be used if present in the model even if you do not define it explicitly.

#end

#double-navigation
* The component uses the `NavigationManager` from the framework to perform the navigation based on the value from the `UrlField`.

    * If you have a template that adds anchors, or use a click event to navigate the user yourself, this may lead to double navigation and errors, especially if your model has a field called `Url`. To avoid such problems, either let the Telerik component do the navigation and remove the application-specific code that does it as well, or remove the URL setting (either rename the model field, or point the `UrlField` to a non-existing field).

#end


#default-fields-match-issues

If your model field names match any of the default names, the component will try to use them. For example, a field called `Icon` will try to produce a Telerik icon out of those values and that may not be what you want. If you want to override such behaviors, you can set `IconField="someNonExistingField"`. You can read more about this [here]({%slug common-kb-custom-font-icons-fail%}). This also applies to other fields too. Another example would be a field called `Url` - in case you want to perform navigation yourself through templates, you may want to set `UrlField="someFakeField"` so that the component does not navigate on its own.

#end