---
title: Manual Data Source Operations
page_title: Grid for Blazor | Manual Operations
description: How to implement your own read, page, fiter, sort operations for the grid data.
slug: components/grid/manual-operations
tags: telerik,blazor,grid,read,filter,sort,page,manual,data,data source
published: True
position: 30
---

# Manual Data Source Operations

By default, the grid will receive the entire collection of data, and it will perform the necessary operations (like [paging]({%slug components/grid/features/paging%}), [sorting]({%slug components/grid/features/sorting%}), [filtering]({%slug components/grid/filtering%})) internally to it. You can perform these operations yourself by handling the `OnRead` event of the grid as shown in the example below. The data source will be read after each [CUD operation]({%slug components/grid/editing/overview%}) as well, to ensure fresh data.

The parameter of type `DataSourceRequest` exposes information about the desired paging, filtering and sorting so you can, for example, call your remote endpoint with appropriate parameters so its performance is optimized and it fetches only the relevant data.

When the `OnRead` event is used, the internal operations are disabled and you must perform them all in the `OnRead` event. You must also set the `TotalCount` property of the grid to the total number of items in the data source.

>caption Handling the data source operations with your own code. This example showcases how to use the OnRead event. To implement the CUD operations, see the [CRUD Operations Overview](editing/overview) article.

````CSHTML
@using Telerik.Blazor.Components.Grid
@using Telerik.DataSource.Extensions;

<TelerikGrid Data=@GridData TotalCount=@Total
			 Filterable=true Sortable=true Pageable=true EditMode="inline">
	<TelerikGridEvents>
		<EventsManager OnRead=@ReadItems></EventsManager>
	</TelerikGridEvents>
	<TelerikGridColumns>
		<TelerikGridColumn Field=@nameof(Employee.ID) />
		<TelerikGridColumn Field=@nameof(Employee.Name) Title="Name" />
		<TelerikGridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
		<TelerikGridCommandColumn>
			<TelerikGridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Edit" Icon="edit">Edit</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Delete" Icon="delete">Delete</TelerikGridCommandButton>
			<TelerikGridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</TelerikGridCommandButton>
		</TelerikGridCommandColumn>
	</TelerikGridColumns>
	<TelerikGridToolBar>
		<TelerikGridCommandButton Command="Add" Icon="add">Add Employee</TelerikGridCommandButton>
	</TelerikGridToolBar>
</TelerikGrid>

@functions {
	public List<Employee> SourceData { get; set; }
	public List<Employee> GridData { get; set; }
	public int Total { get; set; } = 0;

	protected override void OnInit()
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

>tip You can aslso use a synchronous version of the event. Its signature is `void ReadItems(GridReadEventArgs args)`.

## See Also

  * [CRUD Operations Overview]({%slug components/grid/editing/overview%})
  * [Live Demo: Manual Data Source Operations](https://demos.telerik.com/blazor-ui/grid/manual-operations)
  
