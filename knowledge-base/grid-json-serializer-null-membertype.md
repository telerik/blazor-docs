---
title: Grid Filtering after State Restore Throws NullReferenceException
description: Null Reference exception is thrown by the Grid when filters are restored in OnStateInit.
type: troubleshooting
page_title: Grid Filtering after State Restore from JSON Throws NullReferenceException
slug: kb-grid-json-serializer-null-membertype
position: 
tags: blazor, json, serializer
ticketid: 1545884, 1574761
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I see errors when I load the Grid state at initialization (`OnStateInit` event handler) and then try to filter.


## Steps to Reproduce

1. Load (restore) the [Grid state](slug:grid-state) from a serialized Json string in the `OnStateInit` handler.
1. The serialized state should contain filter descriptors.
1. Open a filter menu.


## Error Message

The exception messages can vary, for example:

````C#.skip-repl
System.NullReferenceException: Object reference not set to an instance of an object.
    at Telerik.Blazor.Common.Filter.FilterOperatorFactory.GetFilterOperatorsForType(Type type, ITelerikStringLocalizer localizer)
````

Or alternatively:

````C#.skip-repl
System.NullReferenceException: Object reference not set to an instance of an object.
    at Telerik.Blazor.Components.Common.Filters.FilterList.TelerikFilterList.GetFilterOperators()
    at Telerik.Blazor.Components.Common.Filters.FilterList.TelerikFilterList.InitFilterOperators()
````

If the Grid is bound to **OData**, the OData query may be incorrect and the following exception may occur:

````C#.skip-repl
A binary operator with incompatible types was detected. Found operand types '...' and '...' for operator kind '...'.", "type": "Microsoft.OData.ODataException".
````


## Possible Cause

The `FilterDescriptor` class has a `MemberType` property that is of type `Type`. The default [`JsonSerializer` is unable to serialize types](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to?pivots=dotnet-6-0#types-without-built-in-support). After state restore in `OnStateInit`, the Grid filter descriptors end up with `null` `MemberType` values. This omission causes the errors.

There is a [public issue about filtering error after Grid state restore in OnStateInit](https://feedback.telerik.com/blazor/1505237-set-deserialized-grid-state-in-onstateinit-handler-cause-error-on-open-filter-menu-of-column-on-ui). Follow the item to receive status updates.


## Solution

All suggested options are demonstrated in the examples below.

* Restore the Grid State later than `OnStateInit`. For example, use `OnAfterRenderAsync` and the Grid `SetStateAsync()` method instead.
* Manually set the missing `MemberType` property values in the restored [filter descriptors](slug:components/grid/filtering#filter-descriptors) in `OnStateInit`. There is no need to include filter descriptors for all columns in the state object.
* Restore the Grid State in a `try {} catch() {}` block. The Grid `OnStateInit` event fires two times - [once in the prerender phase and once in the render phase](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-6.0#component-initialization-oninitializedasync). The deserialization problem will occur only if the Grid state is restored in the prerender phase. It is possible to skip state restoration during prerender with a `JSInterop` call. This is not allowed during prerender, so it will trigger an `InvalidOperationException` and `OnStateInit` execution will abort. This approach is used in example [Save and Load Grid State from Browser LocalStorage](slug:grid-kb-save-load-state-localstorage)

> There are serializers which support `Type` serialization, for example Newtonsoft Json.NET. They, however, can [cause other undesired side effects](slug:common-kb-newtonsoft-breaks-datasourcerequest-serialization).


## Examples

>caption Restore the Grid state in OnAfterRenderAsync

<div class="skip-repl"></div>

````RAZOR
@using System.Text.Json

<TelerikGrid @ref="@GridRef" />

@code {
    private TelerikGrid<GridModel> GridRef { get; set; }

    private string SerializedGridState { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var gridState = JsonSerializer.Deserialize<GridState<GridModel>>(SerializedGridState);
            await GridRef.SetStateAsync(gridState);
        }

        await base.OnAfterRenderAsync(firstRender);
    }
}
````

>caption Restore the Grid state and set MemberType manually

<div class="skip-repl"></div>

````RAZOR
@using System.Text.Json

<TelerikGrid OnStateInit="@( (GridStateEventArgs<GridModel> args) => OnGridStateInit(args) )" />

@code {
    private string SerializedGridState { get; set; }

    private async Task OnStateInitHandler(GridStateEventArgs<GridModel> args)
    {
        var gridState = JsonSerializer.Deserialize<GridState<GridModel>>(SerializedGridState);

        var itemType = typeof(GridModel);

        foreach (CompositeFilterDescriptor cfd in gridState.FilterDescriptors)
        {
            foreach (FilterDescriptor fd in cfd.FilterDescriptors)
            {
                fd.MemberType = itemType.GetProperty(fd.Member).PropertyType;
            }
        }

        args.GridState = gridState;
    }
}
````

>caption Restore the Grid state in the Blazor render phase

<div class="skip-repl"></div>

````RAZOR
@using System.Text.Json
@inject IJSRuntime js

<TelerikGrid OnStateInit="@( (GridStateEventArgs<GridModel> args) => OnGridStateInit(args) )" />

<!-- suppress-error allows script tags in a .razor file. Avoid in production apps. -->
<script suppress-error="BL9992">function foo() {}</script>

@code {
    private string SerializedGridState { get; set; }

    private async Task OnGridStateInit(GridStateEventArgs<GridModel> args)
    {
        try
        {
            await js.InvokeVoidAsync("foo");
            args.GridState = JsonSerializer.Deserialize<GridState<GridModel>>(SerializedGridState);
        }
        catch (InvalidOperationException e)
        {

        }
    }
}
````

## See Also

* [Grid State documentation](slug:grid-state)
* [Filter Descriptors](slug:components/grid/filtering#filter-descriptors)
