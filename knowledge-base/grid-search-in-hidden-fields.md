---
title: Search in hidden fields of the Grid
description: How to search in hidden fields of the Grid?
type: how-to
page_title: Search in hidden fields of the Grid
slug: grid-kb-search-in-hidden-fields
position: 
tags: telerik, blazor, grid, search, searchbox
ticketid: 1540910
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

I want to customize the Grid Toolbar Searchbox, so it also searches in the hidden fields of the Grid and not only in the visible ones. How to achieve that?

## Solution

By default, the Grid looks in all string fields in its currently visible columns. You can [customize the SearchBox](slug://grid-searchbox#customize-the-searchbox), so the Grid will search only in certain columns. However, the search will still be based on the **visible** fields provided to the `Fields` parameter of the `GridSearchBox`.

If you want to search in the hidden fields of the Grid, do the following:

* Bind the Grid with an [`OnRead` event handler](slug://common-features-data-binding-onread).
* In the `OnRead` handler, [check if there is a filter applied](slug://components/grid/manual-operations#get-information-from-the-datasourcerequest) in `args.Request.Filters`.
* The applied filters are of type [`CompositeFilterDescriptor`](slug://Telerik.DataSource.CompositeFilterDescriptor). The composite filter descriptor has a `FilterDescriptors` property, which holds a collection plain [single-field `FilterDescriptor`s](slug://Telerik.DataSource.FilterDescriptor). Each of the `FilterDescriptor` in the search descriptor targets one of the visible columns.
* Obtain the search string from the `SearchFilter` property of the Grid state. It holds a `CompositeFilterDescriptor` too.
* Add one additional `FilterDescriptor` to the search `CompositeFilterDescriptor` for every hidden column.

>caption Search in hidden Grid columns

````RAZOR
@using Telerik.DataSource.Extensions
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             TItem="@GridItem"
             OnRead="@OnGridRead"
             FilterMode="@GridFilterMode.FilterRow">
    <GridToolBarTemplate>
        <strong style="color:#900">Search for "secret#", where # is the ID number:</strong>
        <GridSearchBox DebounceDelay="200"></GridSearchBox>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.ID)" />
        <GridColumn Field="@nameof(GridItem.Name)" />
        <GridColumn Field="@nameof(GridItem.Secret)" Visible="false" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridItem> GridRef { get; set; }

    private List<GridItem> GridData { get; set; }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        // check if we have any filtering at all
        if (args.Request.Filters.Count > 0)
        {
            // get the search string from the Grid state
            var searchDescriptor = (CompositeFilterDescriptor)GridRef.GetState().SearchFilter;
            var searchString = (searchDescriptor?.FilterDescriptors[0] as FilterDescriptor)?.Value.ToString();

            if (!string.IsNullOrEmpty(searchString))
            {
                // locate the search filter descriptor among all others in the request
                // if Grid filtering is disabled, then args.Request.Filters will contain only the search descriptor
                foreach (var rootFilterDescriptor in args.Request.Filters)
                {
                    // in versions 3.x: row filters are FilterDescriptors; search and menu filters are CompositeFilterDescriptors
                    // in versions 4.x: all filters are CompositeFilterDescriptors
                    var filterDescriptor = rootFilterDescriptor as CompositeFilterDescriptor;
                    var filterString = (filterDescriptor.FilterDescriptors[0] as FilterDescriptor).Value.ToString();

                    if (searchString == filterString)
                    {
                        // add a descriptor for each hidden column that you want to search in
                        filterDescriptor.FilterDescriptors.Add(new FilterDescriptor()
                        {
                            Member = "Secret",
                            MemberType = typeof(string),
                            Value = searchString,
                            Operator = FilterOperator.Contains
                        });

                        break;
                    }
                }
            }
        }

        var result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override Task OnInitializedAsync()
    {
        GridData = new List<GridItem>();

        for (int j = 1; j <= 10; j++)
        {
            GridData.Add(new GridItem() { ID = j, Name = "Name " + j, Secret = "Secret" + j });
        }

        return base.OnInitializedAsync();
    }

    public class GridItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Secret { get; set; }
    }
}
````

## See Also

* [Change Grid Search Results on Column Hide or Show](slug://grid-kb-search-match-visible-columns)
* [Search the Grid in Numeric and Date Model Fields](slug://grid-kb-search-numeric-fields)
* [Search the Grid on Button Click](slug://grid-kb-search-button-click)
* [Search the Grid with a `StartsWith` operator](slug://grid-kb-search-startswith)
* [Format or Bold Search Results in the Grid](slug://grid-kb-search-highlight-results)
