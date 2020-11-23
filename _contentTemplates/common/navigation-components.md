#navman-used
* The `UrlField` has a default value (`Url`) and that will be used if present in the model even if you do not define it explicitly.

#end

#double-navigation
* The component uses the `NavigationManager` from the framework to perform the navigation based on the value from the `UrlField`.

    * If you have a template that adds anchors, or use a click event to navigate the user yourself, this may lead to double navigation and errors, especially if your model has a field called `Url`. To avoid such problems, either let the Telerik component do the navigation and remove the application-specific code that does it as well, or remove the URL setting (either rename the model field, or point the `UrlField` to a non-existing field).

#end