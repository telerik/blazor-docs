---
title: Manual Data Source Operations
page_title: Scheduler - Manual Operations
description: How to implement your own read and navigate operations for the scheduler appointments.
slug: scheduler-manual-operations
tags: telerik,blazor,scheduler,read,navigate,manual,data,data source
published: false
position: 15
---

# Manual Data Source Operations

By default, the scheduler will receive the entire collection of appointments, and it will perform the necessary operations (like determining which ones to go into the current view) internally to it. You can perform these operations yourself by handling the `OnRead` event of the scheduler as shown in the example below. The data source will be read after each [navigation]({%slug scheduler-navigation%}) as well, to ensure fresh data.

The parameter of type `DataSourceRequest` exposes information about the desired paging, filtering and sorting so you can, for example, call your remote endpoint with appropriate parameters so its performance is optimized and it fetches only the relevant data.

When the `OnRead` event is used, the internal operations are disabled and you must perform them all in the `OnRead` event. You must also set the `TotalCount` property of the grid to the total number of items in the data source.

## Examples

Below you can find a few examples of using the `OnRead` event to perform custom data source operations. They may not implement all operations for brevity. They showcase the basics only, and it is up to the application's data access layer to implement them. You can read more about implementing the CUD operations in the [CRUD Operations Overview](editing/overview) article.

The comments in the code provide explanations on what is done and why.

>tip You can also use a synchronous version of the event. Its signature is `void ReadItems(GridReadEventArgs args)`.

>caption Custom paging with a remote service

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

>caption If you have all the data at once, the Telerik .ToDataSourceResult(request) extension method can manage the operations for you

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



## See Also

  * [CRUD Operations Overview]({%slug components/grid/editing/overview%})
  * [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
  * [Use OData Service](https://github.com/telerik/blazor-ui/tree/master/grid/odata)
  
