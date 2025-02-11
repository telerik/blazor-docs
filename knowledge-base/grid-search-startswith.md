---
title: Search Grid by StartsWith Filter Operator
description: How to search the Grid with a starts with operator, instead of contains. How to customize the GridSeachBox filtering behavior.
type: how-to
page_title: How to Search Grid Items with a StartsWith Filter Operator
slug: grid-kb-search-startswith
position: 
tags: grid, search, filter, gridsearchbox
ticketid: 1565940
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

How to search the Grid items, so that the results start with the search value?

If users search for `"AA"`, I only want to see items starting with `AA`, like `AAB` and `AAC`. The Grid should not return results like `BAAC`, `SLAA`, etc.


## Solution

There are two ways to quickly search Grid items with a **`starts with`** filter operator:

* [Use the Grid filter row](#use-the-grid-filter-row)
* [Use the Grid SearchBox](#use-the-grid-searchbox)

### Use the Grid Filter Row

By default, the [`GridSearchBox` searches in **string** values with a **`contains`** filter](slug:grid-searchbox). The easiest way to search by **`starts with`** filter is to use the [built-in row filter](slug:grid-filter-row) with a configured [default filter operator](slug:grid-filter-row#configuring-the-filter-row).

>caption Filter Grid columns with a "StartsWith" operator

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.ID)" Filterable="false" />
        <GridColumn Field="@nameof(GridItem.Text)" DefaultFilterOperator="@FilterOperator.StartsWith" />
    </GridColumns>
</TelerikGrid>

@code {
    List<GridItem> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();
        var rnd = new Random();

        for (int i = 0; i < 100; i++)
        {
            GridData.Add(new GridItem()
            {
                ID = i + 1,
                Text = $"{(char)(i % 26 + 65)} {(char)(rnd.Next(1, 26) + 64)} " + (i + 1)
            });
        }

        base.OnInitialized();
    }

    public class GridItem
    {
        public int ID { get; set; }
        public string Text { get; set; }
    }
}
````

### Use the Grid SearchBox

1. Subscribe to the [Grid OnStateChanged event](slug:grid-state#events).
1. In the handler, check if the user has just changed the SearchBox value. `args.PropertyName` will be `"SearchFilter"`.
1. Obtain the current Grid state with `GetState()`.
1. See if the Search [`CompositeFilterDescriptor`](slug:components/grid/filtering#filter-descriptors) is populated. This means the SearchBox is not empty.
1. Iterate the search filter descriptors and change the `Operator`.
1. Reset the Grid state with `SetStateAsync()`.

>caption Search in Grid columns with a "StartsWith" operator

````RAZOR
@using Telerik.DataSource

<TelerikGrid @ref="@Grid"
             Data="@GridData"
             Pageable="true"
             OnStateChanged="@( (GridStateEventArgs<GridItem> args) => OnStateChanged(args) )">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.Id)" />
        <GridColumn Field="@nameof(GridItem.Text1)" Title="Search: starts with letter" />
        <GridColumn Field="@nameof(GridItem.Text2)" Title="Search: ends with number" />
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<GridItem> Grid { get; set; }
    List<GridItem> GridData { get; set; }

    async Task OnStateChanged(GridStateEventArgs<GridItem> args)
    {
        // if the user changed the SearchBox value
        if (args.PropertyName == "SearchFilter")
        {
            var state = Grid.GetState();
            var searchFD = state.SearchFilter as CompositeFilterDescriptor;

            // if a search filter is applied
            if (searchFD?.FilterDescriptors.Count > 0)
            {
                foreach (FilterDescriptor fd in searchFD.FilterDescriptors)
                {
                    // change the filter operator for all or some searchable columns
                    if (fd.Member == nameof(GridItem.Text1))
                    {
                        fd.Operator = FilterOperator.StartsWith;
                    }

                    if (fd.Member == nameof(GridItem.Text2))
                    {
                        fd.Operator = FilterOperator.EndsWith;
                    }
                }

                await Grid.SetStateAsync(state);
            }
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();
        var rnd = new Random();

        for (int i = 0; i < 100; i++)
        {
            GridData.Add(new GridItem()
            {
                Id = i + 1,
                Text1 = $"{(char)(i % 26 + 65)} {(char)(rnd.Next(1, 26) + 64)} " + (i + 1),
                Text2 = $"{(char)(rnd.Next(1, 26) + 64)} " + (i + 1) * rnd.Next(2, 9)
            });
        }

        base.OnInitialized();
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
    }
}
````

## See Also

* [Search the Grid in Numeric and Date Model Fields](slug:grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug:grid-kb-search-in-hidden-fields)
* [Search the Grid on Button Click](slug:grid-kb-search-button-click)
* [Format or Bold Search Results in the Grid](slug:grid-kb-search-highlight-results)
