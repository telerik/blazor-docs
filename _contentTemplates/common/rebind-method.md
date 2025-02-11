#intro
You can refresh the data by invoking the [`Rebind` method](slug:common-features-data-binding-overview#refresh-data). Use the component reference to call the `Rebind` method after you have made the data changes (for example adding, removing items). This is needed in case you are not using [Observable data](#observable-data) or [resetting the collection reference](#new-collection-reference). Calling `Rebind` will force the component process the available data anew to reflect the updates.

>caption Use the `Rebind` method to refresh the data.
#end