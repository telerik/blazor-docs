---
title: Search Grid on Button Click
description: How to search the Grid programmatically via Button click.
type: how-to
page_title: Search Grid Programmatically on Button Click
slug: grid-kb-search-button-click
position: 
tags: grid, search, gridsearchbox
ticketid: 1558540
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

I am using the Grid SearchBox, but I don't want it to search for every typed letter. I would like a button next to the search textbox set the search filter after the button is clicked.


## Solution

1. [Bind the Grid with an OnRead event handler](slug://components/grid/manual-operations).
1. Replace the [**GridSearchBox**](slug://grid-searchbox) with a [TextBox](slug://components/textbox/overview) and a [Button](slug://components/button/overview) with an [OnClick event handler](slug://button-events).
1. Optionally, handle the [TextBox `OnChange` event](slug://components/textbox/events) too. This will allow searching on textbox blur and Enter keypress.
1. In the click/change handler, build a [`CompositeFilterDescriptor`](slug://Telerik.DataSource.CompositeFilterDescriptor) with a `LogicalOperator` of `Or`. Populate its `FilterDescriptors` collection with filters for all searchable Grid model fields.
1. [Add the composite filter descriptor to the Grid State to search programmatically](slug://grid-state#setstateasync-examples).

Note the [difference between searching and filtering in the Grid state](slug://grid-state#information-in-the-grid-state). Filtering affects the Grid's filtering UI (row or menu), while searching does not.

Also see the [Filter Descriptors documentation](slug://components/grid/filtering#filter-descriptors), which explains the differences between `FilterDescriptor` and `CompositeFilterDescriptor`.

>caption Search Grid Programmatically on Button Click

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@GridItem"
             OnRead="@GridReadHandler"
             Pageable="true"
             PageSize="5"
             @ref="@GridRef">
    <GridToolBarTemplate>
        <TelerikTextBox @bind-Value="@SearchValue" Width="200px" OnChange="@SearchGrid" />
        <TelerikButton OnClick="@SearchGrid" Icon="@SvgIcon.Search">Search Grid</TelerikButton>
        <TelerikButton OnClick="@ClearSearch" Icon="@SvgIcon.Cancel">Clear Search</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.Name1)" />
        <GridColumn Field="@nameof(GridItem.Name2)" />
    </GridColumns>
</TelerikGrid>

@code {
    List<GridItem> GridData { get; set; } = new List<GridItem>();
    TelerikGrid<GridItem> GridRef { get; set; }

    string SearchValue { get; set; }

    async Task SearchGrid()
    {
        var state = GridRef.GetState();

        var cfd = new CompositeFilterDescriptor();
        cfd.LogicalOperator = FilterCompositionLogicalOperator.Or;
        cfd.FilterDescriptors = new FilterDescriptorCollection();

        // add one FilterDescriptor for each string column to search in

        cfd.FilterDescriptors.Add(new FilterDescriptor()
        {
            Member = nameof(GridItem.Name1),
            Value = SearchValue,
            Operator = FilterOperator.Contains
        });

        cfd.FilterDescriptors.Add(new FilterDescriptor()
        {
            Member = nameof(GridItem.Name2),
            Value = SearchValue,
            Operator = FilterOperator.Contains
        });

        state.SearchFilter = cfd;
        await GridRef.SetStateAsync(state);
    }

    async Task ClearSearch()
    {
        var state = GridRef.GetState();
        state.SearchFilter = null;
        await GridRef.SetStateAsync(state);

        SearchValue = String.Empty;
    }

    private async Task GridReadHandler(GridReadEventArgs args)
    {
        var result = GridData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override Task OnInitializedAsync()
    {
        for (int j = 1; j <= 25; j++)
        {
            GridData.Add(new GridItem() {
                ID = j,
                Name1 = "Name " + (char)(j + 64) + (char)(j + 64),
                Name2 = "Name " + (char)(j + 65) + (char)(j + 65)
            });
        }

        return base.OnInitializedAsync();
    }

    public class GridItem
    {
        public int ID { get; set; }
        public string Name1 { get; set; }
        public string Name2 { get; set; }
    }
}
````

## See Also

* [Search the Grid in Numeric and Date Model Fields](slug://grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug://grid-kb-search-in-hidden-fields)
* [Search the Grid with a `StartsWith` operator](slug://grid-kb-search-startswith)
* [Format or Bold Search Results in the Grid](slug://grid-kb-search-highlight-results)
