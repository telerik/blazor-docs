---
title: Manual Data Source Operations
page_title: Grid - Manual Operations
description: How to implement your own read, page, fiter, sort operations for the grid data and load data on demand.
slug: components/grid/manual-operations
tags: telerik,blazor,grid,read,filter,sort,page,manual,data,data source
published: True
position: 55
components: ["grid"]
---

# Manual Data Source Operations

By default, the Grid will receive the entire collection of data, and it will perform the necessary operations (like [paging](slug:components/grid/features/paging), [sorting](slug:components/grid/features/sorting), [filtering](slug:components/grid/filtering)) internally.

You can perform all data operations yourself (e.g. on the server) and load data on demand by using the `OnRead` event of the Grid. The data source will be read after each [CUD operation](slug:grid-editing-overview) as well, to ensure fresh data.

>tip Make sure to get familiar with all the general [`OnRead` event documentation](slug:common-features-data-binding-onread) first.


## Examples

Below you can find a few examples of using the `OnRead` event to perform custom data source operations. They may not implement all operations for brevity. They showcase the basics only, and it is up to the application's data access layer to implement them. You can read more about implementing the CUD operations in the [CRUD Operations Overview](slug:grid-editing-overview) article.

The comments in the code provide explanations on what is done and why.

Examples:

* [Custom paging with a remote service](#custom-paging-with-a-remote-service)
* [Telerik .ToDataSourceResult(request)](#telerik-todatasourceresult-request)
* [Grouping with OnRead](#grouping-with-onread)
* [Aggregates with OnRead](#aggregates-with-onread)
* [Virtual Scrolling with OnRead](#virtual-scrolling-with-onread)
* [Get Information From the DataSourceRequest](#get-information-from-the-datasourcerequest)
* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
* [Serialize the DataSoureRequest to the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)
* [Debounce Data Source Operations and Requests](slug:grid-kb-debounce-operations)

## Custom paging with a remote service

>note The example below demonstrates how to use just Paging with a remote service. For a more complex setup including other Grid functionalities (such as sorting, filtering etc.) you can check [this project for using Telerik DataSourceRequest and DataSourceResult on the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server) in our public repository.

<demo metaUrl="client/grid/manual-operations-paging/"></demo>

## Telerik .ToDataSourceResult(request)

If you have all the data at once, the Telerik .ToDataSourceResult(request) extension method can manage the operations for you.

>tip You can find examples of how to use this object to easily retrieve data on the server in a performant manner in the following repo: [https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server).
>
> We support the `System.Text.Json` serialization that is built-in in Blazor.

>caption Use Telerik .ToDataSourceResult() extension method to filter, sort and page data.

<demo metaUrl="client/grid/manual-operations-data-source-result/"></demo>

## Grouping with OnRead

When the Grid needs to be grouped, the shape of the data changes and it is no longer a flat list of models. Instead, the data is a nested list of [`AggregateFunctionsGroup` objects](slug:telerik.datasource.aggregatefunctionsgroup) that describe each group and include its data items.

When you bind the Grid with its `Data` parameter, or when [using `OnRead` with `ToDataSourceResult()`](slug:common-features-data-binding-onread#todatasourceresult-method), this complexity is hidden. But if you perform the data operations yourself, you need to create and populate the `AggregateFunctionsGroup` objects manually.

>caption Grouping with OnRead

<demo metaUrl="client/grid/manual-operations-grouping/"></demo>

>important This approach cannot work directly with a [DataTable](https://demos.telerik.com/blazor-ui/grid/data-table) or [OData](https://github.com/telerik/blazor-ui/tree/master/grid/odata) as underlying data sources, because these two external data sources do not return objects that can be converted to the data structure needed for grouping by the Grid. We recommend that you consider creating actual models to use the Grid in a native Blazor way. If that's not possible, you can consider [ExpandoObject collections](slug:grid-kb-binding-to-expando-object) which are a bit more flexible and can be parsed to the needed grouping structure.


## Aggregates with OnRead

When using [aggregates](slug:grid-aggregates) with `OnRead`, the Grid expects you to set one more property of the `GridReadEventArgs` object - `AggregateResults`. Otherwise the component will show aggregate values for the current page only.

````C#.skip-repl
private async Task OnGridRead(GridReadEventArgs args)
{
    DataSourceResult result = AllGridData.ToDataSourceResult(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults;
}
````

## Virtual Scrolling with OnRead

When using [virtual Grid scrolling](slug:components/grid/virtual-scrolling), get the values of `args.Request.Skip` and `args.Request.PageSize` to determine the current Grid scroll offset and load the correct data items. Do not use `args.Request.Page` with virtual scrolling, because it is always `1`.

````C#.skip-repl
private List<Product> GridData { get; set; } = new();

private async Task OnGridRead(GridReadEventArgs args)
{
    args.Data = GridData.Skip(args.Request.Skip).Take(args.Request.PageSize);
    args.Total = GridData.Count;
}
````

## Get Information From the DataSourceRequest

With a few simple loops, you can extract information from the DataSourceRequest object to use in your own API (such as filters, sorts, paging state). The [Grid SearchBox value](slug:grid-searchbox) can be extracted in two ways: from the last `CompositeFilterDescriptor` in the `args.Request.Filters` collection, or from the [`SearchFilter` property of the Grid state](slug:grid-state#information-in-the-grid-state).

<demo metaUrl="client/grid/manual-operations-request/"/></demo>


## See Also

* [CRUD Operations Overview](slug:grid-editing-overview)
* [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
* [Custom Server Operations](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)
* [DataSourceRequest Object API](slug:Telerik.DataSource.DataSourceRequest)
* [DataSourceResult Object API](slug:Telerik.DataSource.DataSourceResult)
* [Blazor Grid](slug:grid-overview)
