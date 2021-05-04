#value-proposition
component can virtualize the elements in its dropdown so you can use huge data source without UI performance issues.

Enabling the UI virtualization feature makes the component reuse a set number of items in the dropdown as you scroll, instead of rendering out the entire data source. It can work both with local data that the view-model already has, or you can fetch remote data every time the user scrolls through an event the component provides.
#end



#basics-core
This section will explain the parameters and behaviors that are related to the virtualization feature so you can set it up.

>caption To enable UI virtualization, you need to set the following parameters of the component:

* `ScrollMode` - `Telerik.Blazor.DropDownScrollMode` - set it to `DropDownScrollMode.Virtual`. It defaults to the "regular" scrolling.

* `PopupHeight` - `string` - set the height of the popup element to a valid CSS unit. It must **not** be a `null/empty` string.

* `ItemHeight` - `decimal` - set it to the height each individual item will have in the dropdown. Make sure to accommodate the content your items will have and any item template.

* `PageSize` - `int` - defines how many items will actually be rendered and reused. The value determines how many items are loaded on each scroll. The number of items must be large enough according to the `ItemHeight` and `PopupHeight` so that there are more items than the dropdown so there is a scrollbar.

You can find a basic example in the [Local Data](#local-data-example) section below.

>caption For working with [remote data](#remote-data-example), you also need:
#end



#value-mapper-text
the component will call this method to request the model that matches the `Value` it has set. This is required because with remote data the `Value` may not be in the initial collection of `Data` that the component has, and so there would otherwise be no way to extract the `DataTextField` from it to render it. Usually, this method will be called on the initial render only to fetch the data item for the current selection.
#end



#remote-data-specifics
* `OnRead` - `EventCallback` - the component will call this event when the user scrolls with the corresponding offset (`Skip`), `PageSize` and any filters. This lets you optimize the data queries and return only what is needed at the moment, when it is needed.

* `TotalCount` - `int` - the total number of items that the dropdown can have. Needs to take into account any current filtering.
#end



#limitations

* When the initially selected item/items are on a page different than the first one, opening the dropdown list will NOT scroll the list to the selected item.

#end



#remote-data-sample-intro
This example showcases sample implementations of:

* An async remote service that returns the data. It is mocked by a static class for this example, you can refactor as needed, and you can find examples of serializing it over the wire in <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server" target="_blank">this collection of sample projects</a> for the grid component - the approach is identical.

* An `OnRead` event handler that calls that service.

#end


#value-mapper-in-remote-example
* A `ValueMapper` that also calls the service.
#end