---
title: Change the Grid Filter Mode at Runtime
description: How to change the Grid filter mode at runtime and recreate the Grid to display the updated filtering UI.
type: how-to
page_title: Change the Grid Filter Mode at Runtime
slug: grid-kb-change-filter-mode-at-runtime
position: 
tags: telerik,blazor,grid,filtering,filtermode,runtime
ticketid: 
res_type: kb
components: ["grid"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

How to change the Grid `FilterMode` at runtime?

How to disable filtering and show the filter row or filter menu again?

## Solution

Set the Grid `FilterMode` parameter to one of the following values:

* `GridFilterMode.None` - hides the filtering UI.
* `GridFilterMode.FilterRow` - displays a filter row below the column headers.
* `GridFilterMode.FilterMenu` - displays a filter button in the column headers.

When you change the filter mode at runtime, recreate the Grid so that it rebuilds the columns and filter templates. Use a render flag around the Grid, update the filter mode, and render the Grid again.

>caption Change the Grid FilterMode at runtime

````RAZOR
@if (ShowGrid)
{
    <TelerikGrid Data="@GridData"
                 FilterMode="@CurrentFilterMode">
        <GridColumns>
            <GridColumn Field="@nameof(Product.Name)" />
        </GridColumns>
    </TelerikGrid>
}

<TelerikButton OnClick="@(() => ChangeFilterMode(GridFilterMode.None))">
    Disable Filtering
</TelerikButton>
<TelerikButton OnClick="@(() => ChangeFilterMode(GridFilterMode.FilterRow))">
    Show Filter Row
</TelerikButton>
<TelerikButton OnClick="@(() => ChangeFilterMode(GridFilterMode.FilterMenu))">
    Show Filter Menu
</TelerikButton>

@code {
    private bool ShowGrid { get; set; } = true;
    private GridFilterMode CurrentFilterMode { get; set; } = GridFilterMode.FilterMenu;

    private async Task ChangeFilterMode(GridFilterMode newFilterMode)
    {
        ShowGrid = false;
        await Task.Delay(100);

        CurrentFilterMode = newFilterMode;
        ShowGrid = true;
    }

    private List<Product> GridData { get; set; } = new();

    private class Product
    {
        public string Name { get; set; } = string.Empty;
    }
}
````

This approach recreates the Grid after each filter mode change. If you also use Grid state, save the state before recreation and restore the applicable state after the Grid renders again. For more information, refer to the [Grid state](slug:grid-state) documentation.

## See Also

* [Grid Filtering Overview](slug:components/grid/filtering)
* [Grid Filter Row](slug:grid-filter-row)
* [Grid Filter Menu](slug:grid-filter-menu)