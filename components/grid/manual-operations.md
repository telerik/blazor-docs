---
title: Manual Data Source Operations
page_title: Grid - Manual Operations
description: How to implement your own read, page, fiter, sort operations for the grid data and load data on demand.
slug: components/grid/manual-operations
tags: telerik,blazor,grid,read,filter,sort,page,manual,data,data source
published: True
position: 55
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
* [Get Information From the DataSourceRequest](#get-information-from-the-datasourcerequest)
* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
* [Serialize the DataSoureRequest to the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)
* [Debounce Data Source Operations and Requests](slug:grid-kb-debounce-operations)

## Custom paging with a remote service

>note The example below demonstrates how to use just Paging with a remote service. For a more complex setup including other Grid functionalities (such as sorting, filtering etc.) you can check [this project for using Telerik DataSourceRequest and DataSourceResult on the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server) in our public repository.

````RAZOR
Custom paging. There is a deliberate delay in the data source operations in this example to mimic real life delays and to showcase the async nature of the calls.

<TelerikGrid TItem="@Employee"
			 OnRead="@ReadItems"
			 Pageable="true" PageSize="15">
	<GridColumns>
		<GridColumn Field=@nameof(Employee.Id) Title="ID" />
		<GridColumn Field=@nameof(Employee.Name) Title="Name" />
	</GridColumns>
</TelerikGrid>

@code {
	protected async Task ReadItems(GridReadEventArgs args)
	{
		Console.WriteLine("data requested: " + args.Request);

		//this is a basic imlementation of custom paging of the grid

		DataEnvelope DataResult = await FetchPagedData(args.Request.Page, args.Request.PageSize);

		//use the current page of data and the total amount of items in the data source that are returned from the service
		args.Data = DataResult.CurrentPageData;
		args.Total = DataResult.TotalItemCount;
	}

	//This sample implements only reading pages of the data. To add the rest of the CRUD operations see
	//https://docs.telerik.com/blazor-ui/components/grid/editing/overview
	//in a real case, the methods and classes below will usually be in dedicated locations/services
	//this example illustrates the approach

	public async Task<DataEnvelope> FetchPagedData(int pageNumber, int pageSize)
	{
		//in a real case, this is likely to be an async HTTP call to a real API
		//maybe there will even be two separate calls to fetch the current page data, and the total count
		//Or the server can return the envelope with the count and data. The exact implementation depends on the project
		
		List<Employee> fullList =  new List<Employee>();
		
		//generate dummy data for the example
		int totalCount = 100;
		for (int i = 1; i <= totalCount; i++)
		{
			fullList.Add(new Employee()
			{
				Id = i,
				Name = "Name " + i,
			});
		}
		//end of dummy data generation

		DataEnvelope result = new DataEnvelope();

		//perform the actual paging operation here or on the server, depending on how your data access layer is designed
		//send only the current page of data to the grid, and set the total
		
		result.CurrentPageData = fullList.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();
		result.TotalItemCount = fullList.Count;

		await Task.Delay(1000); //simulate network delay from a real async call

		return result;
	}

	//this is a middleware class to help transfer all the data in one request
	public class DataEnvelope
	{
		public List<Employee> CurrentPageData { get; set; }
		public int TotalItemCount { get; set; }
	}

	public class Employee
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}
}
````

## Telerik .ToDataSourceResult(request)

If you have all the data at once, the Telerik .ToDataSourceResult(request) extension method can manage the operations for you.

>tip You can find examples of how to use this object to easily retrieve data on the server in a performant manner in the following repo: [https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server).
>
> We support the `System.Text.Json` serialization that is built-in in Blazor.

>caption Use Telerik .ToDataSourceResult() extension method to filter, sort and page data.

````RAZOR
Using Telerik DataSource extension methods to manipulate all the data into paged chunks and also perform other operations like filtering, sorting, etc. There is a deliberate delay in the data source operations in this example to mimic real life delays and to showcase the async nature of the calls.

@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@Employee" OnRead="@ReadItems"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true" Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> SourceData { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        Console.WriteLine("data requested: " + args.Request);

        //update the Data and Total properties
        //the ToDataSourceResult() extension method can be used to perform the operations over the full data collection
        //in a real case, you can call data access layer and remote services here instead, to fetch only the necessary data

        await Task.Delay(1000); //simulate network delay from a real async call

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;
        args.Total = datasourceResult.Total;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
            {
                ID = i,
                Name = "Name " + i,
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## Grouping with OnRead

When the Grid needs to be grouped, the shape of the data changes and it is no longer a flat list of models. Instead, the data is a nested list of [`AggregateFunctionsGroup` objects](slug:telerik.datasource.aggregatefunctionsgroup) that describe each group and include its data items.

When you bind the Grid with its `Data` parameter, or when [using `OnRead` with `ToDataSourceResult()`](slug:common-features-data-binding-onread#todatasourceresult-method), this complexity is hidden. But if you perform the data operations yourself, you need to create and populate the `AggregateFunctionsGroup` objects manually.

>caption Grouping with OnRead

````RAZOR
This sample shows how to set up the grid to use grouping with manual data source operations, and how to use the Telerik DataSource extensions to prepare grouped data.

@using Telerik.DataSource.Extensions

<TelerikGrid TItem="@Employee"
             OnRead="@ReadItems"
             Groupable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             Pageable="true">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) FieldType="@(typeof(string))" Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) FieldType="@(typeof(string))" Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) FieldType="@(typeof(bool))" Title="On Vacation" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> SourceData { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        // in this example, we use the Telerik extension methods to shape the data
        // you can, instead, call a service, read more in the following example projects
        // https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        // to work with grouping, the grid data needs to be an IEnumerable<object>
        // because grouped data has a different shape than non-grouped data
        // and this is, generally, hidden from you by the grid, but now it cannot be
        args.Data = datasourceResult.Data;

        args.Total = datasourceResult.Total;
        args.AggregateResults = datasourceResult.AggregateResults;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 1; i <= 15; i++)
        {
            result.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3,
                IsOnLeave = i % 2 == 0
            });
        }

        return result;
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
````

>important This approach cannot work directly with a [DataTable](https://demos.telerik.com/blazor-ui/grid/data-table) or [OData](https://github.com/telerik/blazor-ui/tree/master/grid/odata) as underlying data sources, because these two external data sources do not return objects that can be converted to the data structure needed for grouping by the Grid. We recommend that you consider creating actual models to use the Grid in a native Blazor way. If that's not possible, you can consider [ExpandoObject collections](slug:grid-kb-binding-to-expando-object) which are a bit more flexible and can be parsed to the needed grouping structure.


## Aggregates with OnRead

When using [aggregates](slug:grid-aggregates) with `OnRead`, the Grid expects you to set one more property of the `GridReadEventArgs` object - `AggregateResults`. Otherwise the component will show aggregate values for the current page only.

<div class="skip-repl"></div>

````CS
private async Task OnGridRead(GridReadEventArgs args)
{
    DataSourceResult result = AllGridData.ToDataSourceResult(args.Request);

    args.Data = result.Data;
    args.Total = result.Total;
    args.AggregateResults = result.AggregateResults;
}
````


## Get Information From the DataSourceRequest

With a few simple loops, you can extract information from the DataSourceRequest object to use in your own API (such as filters, sorts, paging state).

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>@ConsoleSim</p>

<TelerikGrid TItem="@SampleData"
             OnRead="@OnReadHandler"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Pageable="true" PageSize="15"
             Height="400px">
    <GridColumns>
        <GridColumn Field="Id" />
        <GridColumn Field="Name" />
        <GridColumn Field="Team" />
        <GridColumn Field="HireDate" />
    </GridColumns>
</TelerikGrid>


@code {
    MarkupString ConsoleSim { get; set; } // to showcase what you get

    async Task OnReadHandler(GridReadEventArgs args)
    {
        string output = string.Empty;
        output += "FILTERS:<br />";
        // loop the DataSourceRequest collections to extract the data you require
        foreach (var item in args.Request.Filters)
        {
            if (item is CompositeFilterDescriptor)
            {
                CompositeFilterDescriptor currFilter = item as CompositeFilterDescriptor;
                output += $"START nested filter: logical operator: {currFilter.LogicalOperator}, details:<br />";
                // by design, there will actually be 2 only, this showcases the concept and the types
                foreach (FilterDescriptor nestedFilter in currFilter.FilterDescriptors)
                {
                    output += $"field: {nestedFilter.Member}, operator {nestedFilter.Operator}, value: {nestedFilter.Value}<br />";
                }
                output += "END nested filter<br />";
            }
        }
        output += "SORTS:<br />";
        foreach (SortDescriptor item in args.Request.Sorts)
        {
            output += $"field: {item.Member}, direction: {item.SortDirection} <br />";
        }
        output += $"Current page: {args.Request.Page}, page size: {args.Request.PageSize}";

        // show that data in the UI for a visual aid
        ConsoleSim = new MarkupString(output);

        // actual data source operation, implement as required in your case (e.g., call a service with parameters you built)
        var result = PristineData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    public IEnumerable<SampleData> PristineData = Enumerable.Range(1, 300).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````


## See Also

* [CRUD Operations Overview](slug:grid-editing-overview)
* [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
* [Custom Server Operations](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)
* [DataSourceRequest Object API](slug:Telerik.DataSource.DataSourceRequest)
* [DataSourceResult Object API](slug:Telerik.DataSource.DataSourceResult)
* [Blazor Grid](slug:grid-overview)
