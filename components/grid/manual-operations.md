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

By default, the grid will receive the entire collection of data, and it will perform the necessary operations (like [paging]({%slug components/grid/features/paging%}), [sorting]({%slug components/grid/features/sorting%}), [filtering]({%slug components/grid/filtering%})) internally to it. You can perform these operations yourself by handling the `OnRead` event of the grid as shown in the example below. The data source will be read after each [CUD operation]({%slug components/grid/editing/overview%}) as well, to ensure fresh data.

The parameter of type `DataSourceRequest` exposes information about the desired paging, filtering and sorting so you can, for example, call your remote endpoint with appropriate parameters so its performance is optimized and it fetches only the relevant data. Through this event, you can load data on demand.

When the `OnRead` event is used, the internal operations are disabled and you must perform them all in the `OnRead` event. You must also set the `TotalCount` property of the grid to the total number of items in the data source.

If you are using an `ObservableCollection`, make sure to create a `new` one, because using `.Add()`, `.Remove()` or `.Clear()` on it will cause an infinite loop - the [grid monitors the ObservableCollection events]({%slug common-features-observable-data%}) and updates its data, which will fire `OnRead`.

## Examples

Below you can find a few examples of using the `OnRead` event to perform custom data source operations. They may not implement all operations for brevity. They showcase the basics only, and it is up to the application's data access layer to implement them. You can read more about implementing the CUD operations in the [CRUD Operations Overview](editing/overview) article.

The comments in the code provide explanations on what is done and why.

>tip You can also use a synchronous version of the event. Its signature is `void ReadItems(GridReadEventArgs args)`.

Examples:


* [Custom paging with a remote service](#custom-paging-with-a-remote-service)

* [Telerik .ToDataSourceResult(request)](#telerik-todatasourceresultrequest)

* [Grouping with OnRead](#grouping-with-onread)

* [Get Information From the DataSourceRequest](#get-information-from-the-datasourcerequest)

* [Cache Data Request](#cache-data-request)

* [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)

* [Serialize the DataSoureRequest to the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)

* [Debounce Data Source Operations and Requests]({%slug grid-kb-debounce-operations%})

## Custom paging with a remote service

````CSHTML
Custom paging. There is a deliberate delay in the data source operations in this example to mimic real life delays and to showcase the async nature of the calls.

<TelerikGrid Data=@GridData TotalCount=@Total
			 Pageable=true PageSize=15
             OnRead=@ReadItems>
	<GridColumns>
		<GridColumn Field=@nameof(Employee.Id) Title="ID" />
		<GridColumn Field=@nameof(Employee.Name) Title="Name" />
	</GridColumns>
</TelerikGrid>

@code {
	public List<Employee> GridData { get; set; }
	public int Total { get; set; } = 0;

	protected async Task ReadItems(GridReadEventArgs args)
	{
		Console.WriteLine("data requested: " + args.Request);

		//this is a basic imlementation of custom paging of the grid

		DataEnvelope DataResult = await FetchPagedData(args.Request.Page, args.Request.PageSize);

		//use the current page of data and the total amount of items in the data source that are returned from the service
		GridData = DataResult.CurrentPageData;
		Total = DataResult.TotalItemCount;

		StateHasChanged();
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
		for (int i = 0; i < totalCount; i++)
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

		await Task.Delay(2000); //simulate network delay from a real async call

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

````CSHTML
Using Telerik DataSource extension methods to manipulate all the data into paged chunks and also perform other operations like filtering, sorting, etc. There is a deliberate delay in the data source operations in this example to mimic real life delays and to showcase the async nature of the calls.

@using Telerik.DataSource.Extensions

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems
			 FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true EditMode="@GridEditMode.Inline">
	<GridColumns>
		<GridColumn Field=@nameof(Employee.ID) />
		<GridColumn Field=@nameof(Employee.Name) Title="Name" />
		<GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
		<GridCommandColumn>
			<GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
			<GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
			<GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
			<GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
		</GridCommandColumn>
	</GridColumns>
	<GridToolBar>
		<GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
	</GridToolBar>
</TelerikGrid>

@code {
	public List<Employee> SourceData { get; set; }
	public List<Employee> GridData { get; set; }
	public int Total { get; set; } = 0;

	protected override void OnInitialized()
	{
		SourceData = GenerateData();
	}

	protected async Task ReadItems(GridReadEventArgs args)
	{
		Console.WriteLine("data requested: " + args.Request);

		//you need to update the total and data variables
		//the ToDataSourceResult() extension method can be used to perform the operations over the full data collection
		//in a real case, you can call data access layer and remote services here instead, to fetch only the necessary data

		await Task.Delay(2000); //simulate network delay from a real async call

		var datasourceResult = SourceData.ToDataSourceResult(args.Request);

		GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
		Total = datasourceResult.Total;

		StateHasChanged();
	}
	
	//This sample implements only reading of the data. To add the rest of the CRUD operations see
	//https://docs.telerik.com/blazor-ui/components/grid/editing/overview

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

When the grid needs to be grouped, the shape of the data changes - it is no longer a flat list of models, but a nested list of collections that describe each group and have the group data. At the same time, the grid is designed for a data source that is a collection of models, and the source of this collection is up to the application.

When you let the grid handle the operations internally, it hides that complexity from you, but when you perform the operations youerself, this data structure cannot be expressed with the typical `IEnumerable<TItem>` data source for the grid.

Thus, to use the `OnRead` event with grouping, you must:

1. Use an `IEnumerable<object>` for the grid `Data`.
1. Set the `FieldType` of the columns to match the type of the field you will be showing.
    * If you also use [filtering]({%slug components/grid/filtering%}), do not use nullable types. For example, if the model field is `int?`, set `FieldType="@(typeof(int))"`. If a nullable type is used, you may get errors similar to `Error: System.ArgumentException: Operator 'IsEqualTo' is incompatible with operand types 'Int16?'`.
1. Prepare the appropriate group collections.
    * The example below shows a simple way through the Telerik `.ToDataSourceResult` extension method that is easy to use when you have all the data, or when you can pass objects by reference, like in a server-side Blazor app.
    * The examples in the following repo show one way you can serialize such data through HTTP and service calls: [Use Telerik DataSourceRequest and DataSourceResult on the server](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server).

>caption Grouping with OnRead

````CSHTML
This sample shows how to set up the grid to use grouping with manual data source operations, and how to use the Telerik DataSource extensions to prepare grouped data.

@using Telerik.DataSource.Extensions

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems Groupable="true"
             FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true EditMode="@GridEditMode.Inline">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.Name) FieldType="@(typeof(string))" Groupable="false" />
        <GridColumn Field=@nameof(Employee.Team) FieldType="@(typeof(string))" Title="Team" />
        <GridColumn Field=@nameof(Employee.IsOnLeave) FieldType="@(typeof(bool))" Title="On Vacation" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
</TelerikGrid>

@code {
    public List<Employee> SourceData { get; set; }

    // the grid Data needs to be IEnumerable<object> to work with grouping in OnRead
    public List<object> GridData { get; set; }

    public int Total { get; set; } = 0;

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    // Handling grouping happens here - by casting the DataSourceResult.Data to objects
    protected async Task ReadItems(GridReadEventArgs args)
    {
        // in this example, we use the Telerik extension methods to shape the data
        // you can, instead, call a service, read more in the following example projects
        // https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server
        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        // to work with grouping, the grid Data needs to be an IEnumerable<object>
        // because grouped data has a different shape than non-grouped data
        // and this is, generally, hidden from you by the grid, but now it cannot be
        GridData = datasourceResult.Data.Cast<object>().ToList();

        Total = datasourceResult.Total;

        StateHasChanged();
    }

    //This sample implements only reading of the data. To add the rest of the CRUD operations see
    //https://docs.telerik.com/blazor-ui/components/grid/editing/overview

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 15; i++)
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

>important This approach cannot work directly with a [DataTable](https://demos.telerik.com/blazor-ui/grid/data-table) or [OData](https://github.com/telerik/blazor-ui/tree/master/grid/odata) as underlying data sources, because these two external data sources do not return objects that can be converted to the data structure needed for grouping by the grid. We recommend that you consider creating actual models to use the Grid in a native Blazor way. If that's not possible, you can consider [ExpandoObject collections](https://github.com/telerik/blazor-ui/tree/master/grid/binding-to-expando-object) which are a bit more flexible and can be parsed to the needed grouping structure.


## Get Information From the DataSourceRequest

With a few simple loops, you can extract information from the DataSourceRequest object to use in your own API (such as filters, sorts, paging state).

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

@ConsoleSim

<br />

<TelerikGrid Data=@CurrPageData OnRead="@OnReadHandler" TotalCount=@Total
             Sortable="true" FilterMode="@GridFilterMode.FilterRow"
             Pageable="true" PageSize="15"
             Height="400px">
    <GridColumns>
        <GridColumn Field="Id" />
        <GridColumn Field="Name" />
        <GridColumn Field="Team" />
        <GridColumn Field="HireDate" />
    </GridColumns>
</TelerikGrid>


@functions {
    MarkupString ConsoleSim { get; set; } // to showcase what you get

    // implementation of OnRead
    List<SampleData> CurrPageData { get; set; }
    int Total { get; set; }

    async Task OnReadHandler(GridReadEventArgs args)
    {
        string output = string.Empty;
        output += "FILTERS:<br />";
        // loop the DataSourceRequest collections to extract the data you require
        foreach (var item in args.Request.Filters)
        {
            if(item is FilterDescriptor) // filter row
            {
                FilterDescriptor currFilter = item as FilterDescriptor;
                output += $"field: {currFilter.Member}, operator {currFilter.Operator}, value: {currFilter.Value}<br />";
            }

            if(item is CompositeFilterDescriptor) // filter menu
            {
                CompositeFilterDescriptor currFilter = item as CompositeFilterDescriptor;
                output += $"START nested filter: logical operator: {currFilter.LogicalOperator}, details:<br />";
                // there will actually be 1 or 2 only, this showcases the concept and the types
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
        CurrPageData = (result.Data as IEnumerable<SampleData>).ToList();
        Total = result.Total;

        StateHasChanged();
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


## Cache Data Request

If you need to replay the last request for some reason (your data has updated, or you need to await some business logic that determines what data to request), store the `DataSourceRequest` object in a field in your view model, then run the method that will read the data when necessary - a button click, or when some async operation completes.


````CSHTML
@* This example awaits some business data in OnInitializedAsync and fetches grid data according to it
You can call the SetGridData() method from button clicks or other events according to your needs *@

@using Telerik.DataSource.Extensions
@using Telerik.DataSource

<TelerikGrid Data=@GridData TotalCount=@Total OnRead=@ReadItems
             FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true>
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    string something { get; set; } // an object on which the grid data depends

    protected override async Task OnInitializedAsync()
    {
        // the business logic that determines the global object - such as a user, their role, access rights, settings, etc.
        await GetSomething();

        // Refresh the Grid Data after the business data has arrived
        SetGridData();

        await base.OnInitializedAsync();
    }

    async Task GetSomething()
    {
        // in a real case - apply the desired business logic here
        await Task.Delay(3000);
        something = DateTime.Now.Millisecond.ToString();
    }

    public List<Employee> SourceData { get; set; }
    public List<Employee> GridData { get; set; }
    public int Total { get; set; } = 0;

    // cache the last data request so you can "replay" it and update the grid data anytime
    public DataSourceRequest CurrentRequest { get; set; }


    protected async Task ReadItems(GridReadEventArgs args)
    {
        // cache the last data request so you can update teh grid data with it at any time
        CurrentRequest = args.Request;

        if (!string.IsNullOrEmpty(something)) // business logic that dictates when/what to request for the grid
        {
            SetGridData();
        }
    }

    // Update the grid data with the cached request at any time
    private void SetGridData()
    {
        if (CurrentRequest == null)
        {
            return;
        }

        // implement actual reading of the data, for example, use the "something" business object above
        // this is merely some generated data to get the grid running
        var datasourceResult = SourceData.ToDataSourceResult(CurrentRequest);

        GridData = (datasourceResult.Data as IEnumerable<Employee>).ToList();
        Total = datasourceResult.Total;
    }

    //This sample implements only reading of the data. To add the rest of the CRUD operations see
    //https://docs.telerik.com/blazor-ui/components/grid/editing/overview

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


## See Also

  * [CRUD Operations Overview]({%slug components/grid/editing/overview%})
  * [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
  * [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
  * [Custom Server Operations](https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server)
  
