---
title: Get Filtered and Sorted Data from Grid
description: How to get the current filtered and sorted data from the Telerik Blazor Grid. How to get the correct table row index when the Grid data state doesn't match the order in the original data source.
type: how-to
page_title: How to Get the Filtered and Sorted Data from the Grid
slug: grid-kb-get-filtered-data
position: 
tags: 
ticketid: 1629418, 1627421, 1626964, 1617119, 1561446, 1534078, 1489807
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

This KB article answers the following questions. All of them revolve around the Grid table rows, which the component is currently displaying to the user.

* How to obtain the filtered data in the Grid? This applies to filtering and the `SearchBox`.
* How do I know the filtered item count? How to get how many rows are in the filtered Grid?
* How to find only the used (displayed) items the Grid data list?
* How can I get the Grid data after filtering or sorting?
* How to get the sorted data in the Grid? How to get the Grid items in the order that is on the user screen?
* Is a way to get current Grid state data?
* How to find the next or previous data row if the user has sorted the Grid? In this case the original table row index doesn't match the index in the sorted data.
* How to get the clicked row index if the Grid is sorted or filtered?


## Solution

The solution is different when:

* [The Grid is databound with its `Data` parameter](#when-using-data-parameter)
* [The Grid is databound with its `OnRead` event handler](#when-using-onread-event)

Things to consider:

* When using `OnRead`, there will be less custom code and no need to repeat the internal Grid data operations manually.
* When the Grid data is grouped, the `DataSourceResult.Data` collection contains members of type [`AggregateFunctionsGroup`](/blazor-ui/api/Telerik.DataSource.AggregateFunctionsGroup) instead of Grid model class objects.

### When Using Data Parameter

1. Obtain the [Grid state](slug://grid-state) in the [Grid `OnStateChanged` event](slug://grid-state#events) or with the [Grid `GetState()` method](slug://grid-state#methods). The exact approach depends on if you want to get the current visible Grid data automatically or on demand.
1. Create a new [`DataSourceRequest` object](/blazor-ui/api/Telerik.DataSource.DataSourceRequest). Populate its properties with [the respective information from the `GridState` object](slug://grid-state#information-in-the-grid-state). Note that the `Filters` property of the `DataSourceRequest` will have to include filter descriptors from two [`GridState` properties](/blazor-ui/api/Telerik.Blazor.Components.GridState-1) - `FilterDescriptors` and `SearchFilter`.
1. (optional) If you want to get the currently filtered and sorted data from all Grid pages, do not set the `Page`, `PageSize`, and `Skip` properties of the `DataSourceRequest` object.
1. Execute the [`ToDataSourceResult()` extension method](slug://common-features-data-binding-onread#todatasourceresult-method) on the Grid `Data` collection. You will need to import the `Telerik.DataSource.Extensions` namespace.
1. The currently visible Grid data will be in the `Data` property of the `DataSourceResult` object, which is returned by `ToDataSourceResult()`. The total Grid item count (on all pages) will be in the `Total` property.

The most important part of the example below is in the `RequestCurrentMainGridData()` method.

>caption Get current filtered and sorted Grid data when using Data parameter

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@GetCurrentMainGridData">Get Main Grid Data</TelerikButton>

or

<label>
    <TelerikCheckBox @bind-Value="@ShouldUseOnStateChanged" />
    Detect Main Grid Changes Automatically
</label>

<h2>Main Grid</h2>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@Product"
             Pageable="true"
             PageSize="@GridPageSize"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             Groupable="true"
             OnStateChanged="@OnGridStateChanged">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" />
        <GridColumn Field="@nameof(Product.InProduction)" />
    </GridColumns>
</TelerikGrid>

<h2>Current Page in Main Grid</h2>

<p>Showing @( Math.Min(GridPageSize, CurrentMainGridTotal) ) item(s) out of @CurrentMainGridTotal.</p>

<TelerikGrid Data="@CurrentMainGridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" />
        <GridColumn Field="@nameof(Product.InProduction)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product> GridRef { get; set; } = null!;

    private List<Product> GridData { get; set; } = new List<Product>();
    private List<Product> CurrentMainGridData { get; set; } = new List<Product>();
    private int CurrentMainGridTotal { get; set; }

    private int GridPageSize { get; set; } = 4;

    private bool ShouldUseOnStateChanged { get; set; } = true;

    private void OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        if (ShouldUseOnStateChanged)
        {
            RequestCurrentMainGridData(args.GridState);
        }
    }

    private void GetCurrentMainGridData()
    {
        RequestCurrentMainGridData(GridRef.GetState());
    }

    private void RequestCurrentMainGridData(GridState<Product> gridState)
    {
        var filterAndSearchDescriptors = new List<IFilterDescriptor>(gridState.FilterDescriptors);
        filterAndSearchDescriptors.Add(gridState.SearchFilter);

        var request = new DataSourceRequest()
        {
            Filters = filterAndSearchDescriptors,
            Groups = gridState.GroupDescriptors.ToList(),
            Page = gridState.Page ?? 1, // for paging
            PageSize = GridPageSize,
            Skip = gridState.Skip ?? 0, // for virtual scrolling
            Sorts = gridState.SortDescriptors.ToList()
        };

        var result = GridData.ToDataSourceResult(request);

        if (gridState.GroupDescriptors.Any())
        {
            var groups = result.Data.Cast<AggregateFunctionsGroup>();
            CurrentMainGridData = new List<Product>();

            foreach (var group in groups)
            {
                CurrentMainGridData.AddRange(group.Items.Cast<Product>().ToList());
            }
        }
        else
        {
            CurrentMainGridData = result.Data.Cast<Product>().ToList();
        }

        CurrentMainGridTotal = result.Total;
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = (decimal)rnd.Next(1, 100),
                Stock = rnd.Next(0, 50),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                InProduction = i % 4 == 0
            });
        }

        CurrentMainGridData = GridData.Take(GridPageSize).ToList();
        CurrentMainGridTotal = GridData.Count;
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool InProduction { get; set; }
    }
}
````

### When Using OnRead Event

1. Implement the [Grid `OnRead` event handler](slug://common-features-data-binding-onread) as usual. More Grid-specific examples are available in the [Grid Manual Operations](slug://components/grid/manual-operations) article.
1. The visible data items on the current Grid page are in [the `args.Data` collection, which is set in the Grid `OnRead` handler](slug://common-features-data-binding-onread#event-argument). `args.Data` is a property of the `GridReadEventArgs` event argument, so it's not accessible outside `OnRead`. That's why you can cache it in a separate variable, together with the total item count (`args.Total`).

Optionally, if you want to get the currently filtered and sorted data from all Grid pages:

1. Execute `ToDataSourceResult()` over the Grid datasource as usual. This will produce the data items on the current Grid page.
1. Reset the `Page`, `PageSize`, and `Skip` properties of the `DataSourceRequest` object in the `GridReadEventArgs` event argument.
1. Repeat the `ToDataSourceResult()` call over the Grid datasource. This will produce the data items from all Grid pages.

The most important part of the example below is in the `OnGridRead` handler.

>caption Get current filtered and sorted Grid data when using OnRead event

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<h2>Main Grid</h2>

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             Pageable="true"
             PageSize="@GridPageSize"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             Groupable="true">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" />
        <GridColumn Field="@nameof(Product.InProduction)" />
    </GridColumns>
</TelerikGrid>

<h2>Current Page in Main Grid</h2>

<p>Showing @( Math.Min(GridPageSize, CurrentMainGridTotal) ) item(s) out of @CurrentMainGridTotal.</p>

<TelerikGrid Data="@CurrentMainGridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" />
        <GridColumn Field="@nameof(Product.InProduction)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();
    private List<Product> CurrentMainGridData { get; set; } = new List<Product>();
    private int CurrentMainGridTotal { get; set; }

    private int GridPageSize { get; set; } = 4;

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = CurrentMainGridTotal = result.Total;

        if (args.Request.Groups.Any())
        {
            var groups = result.Data.Cast<AggregateFunctionsGroup>();
            CurrentMainGridData = new List<Product>();

            foreach (var group in groups)
            {
                CurrentMainGridData.AddRange(group.Items.Cast<Product>().ToList());
            }
        }
        else
        {
            CurrentMainGridData = result.Data.Cast<Product>().ToList();
        }
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = (decimal)rnd.Next(1, 100),
                Stock = rnd.Next(0, 50),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                InProduction = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool InProduction { get; set; }
    }
}
````


## See Also

* [Grid State](slug://grid-state)
* [Data Binding with OnRead Event](slug://common-features-data-binding-onread)
