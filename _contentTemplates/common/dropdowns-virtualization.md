#value-proposition
component can virtualize the elements in its dropdown so you can use huge data source without UI performance issues.

Enabling the UI virtualization feature makes the component reuse a set number of items in the dropdown as you scroll, instead of rendering out the entire data source. It can work both with local data that the view-model already has, or you can fetch remote data every time the user scrolls through an event the component provides.
#end


#basics-core
This section will explain the parameters and behaviors that are related to the virtualization feature so you can set it up.

>caption To enable UI virtualization, you need to set the following parameters of the component:

* `ScrollMode` - `Telerik.Blazor.DropDownScrollMode` - set it to `DropDownScrollMode.Virtual`. It defaults to the "regular" scrolling.
* `Height` - `string` - [set the height](slug:common-features/dimensions) in the nested **popup settings** tag of the component. It must **not** be a `null/empty` string.
* `ItemHeight` - `decimal` - set it to the height each individual item will have in the dropdown. Make sure to accommodate the content your items will have and any item template. [Disable text wrapping](slug:dropdowns-kb-disable-long-text-wrap) if the items have long text, which wraps and overlaps. Another option is to increase the component `Width` or just the dropdown `Width` in the nested `<ComponentName>PopupSettings` tag.
* `PageSize` - `int` - defines how many items will actually be rendered and reused. The value determines how many items are loaded on each scroll. The number of items must be large enough according to the `ItemHeight` and popup `Height`, so that there are more items than the dropdown so there is a scrollbar.

You can find a basic example in the [Local Data](#local-data-example) section below.

>caption For working with [remote data](#remote-data-example), you also need:
#end


#value-mapper-text
the component will call this method to request the model that matches the `Value` it has set. This is required because with remote data the `Value` may not be in the initial collection of data that the component has, and so there would otherwise be no way to extract the `DataTextField` from it to render it. Usually, this method will be called on the initial render only to fetch the data item for the current selection.
#end


#remote-data-specifics
* `OnRead` - `EventCallback` - the component will call this event when the user scrolls with the corresponding offset (`Skip`), `PageSize` and any filters. This lets you optimize the data queries and return only what is needed at the moment, when it is needed. Set the `args.Data` and `args.Total` properties of the event argument object.
#end


#limitations
* When the initially selected item is not on the first page, the dropdown does not scroll to it on first opening.
* The component calculates the position of the dropdown items during virtual scrolling. In this case, the loading indicators (skeletons) do not display as they will affect the proper item positioning.
#end

#remote-data-sample-intro
This example showcases sample implementations of:

* An async remote service that returns the data. It is mocked by a static class for this example, you can refactor as needed, and you can find examples of serializing it over the wire in <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server" target="_blank">this collection of sample projects</a> for the grid component - the approach is identical.
* An `OnRead` event handler that calls that service.
#end


#value-mapper-in-remote-example
* A `ValueMapper` that also calls the service.
#end


#value-in-onread
>important The `OnRead` handler should change **only the data** of the component, and **not** other parameters such as `Value`. This can lead to issues with the asynchronous nature of the event, and race conditions can occur with the arrival of the new data. Moreover, such a change is likely to be unexpected by the user and cause bad UX.
#end
