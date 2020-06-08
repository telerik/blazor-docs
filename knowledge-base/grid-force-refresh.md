---
title: Force a Grid to Refresh
description: how to force a grid to refresh its data
type: how-to
page_title: Refresh Grid Data
slug: grid-force-refresh
position: 
tags: 
ticketid: 1448335
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

Is there anyway say I can have a button click event cause a Grid to redraw? 

I'm using manual data operations, how do I use an observable collection to refresh the grid?

## Solution

There are two different cases:

* [Automatic operations](#automatic-operations)
* [Manual operations](#manual-operations)

### Automatic operations

For general cases, to change the data that is rendered in the grid from an external source, use an `ObservableCollection`: [https://demos.telerik.com/blazor-ui/grid/observable-data](https://demos.telerik.com/blazor-ui/grid/observable-data). To change the entire data collection, `.Clear()` the collection first to notify the grid that this old data is gone, then create a new one with the new data.

If you don't use an `ObservableCollection`, you can create a `new` instance of the collection and set it to the `Data` parameter. A `new` instance provides a new reference, which fires the `OnParametersSet` event from the framework which lets the grid redraw. If you only add/remove items from the same collection, the reference to the entire data collection stays the same and the grid is not notified of the change.

>caption Refresh grid data with automatic data source operations


````CSHTML
@* change grid data on external action. 
    Try grouping or filtering the grid, for example, then change its data through the button above it *@

<button @onclick="@ChangeGridData">change grid data</button>

<TelerikGrid Data="@MyData" Height="400px"
             Pageable="true" Sortable="true" Groupable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true" Reorderable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    async Task ChangeGridData()
    {
        Random rnd = new Random();
        var newData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + rnd.Next(1, 100),
            Team = "team " + rnd.Next(1, 100),
            HireDate = DateTime.Now.AddDays(-rnd.Next(1, 100)).Date
        });

        // create a new collection to get a new reference
        MyData = new List<SampleData>(newData);
    }
    

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

### Manual operations

When using manual operations through the [OnRead event](https://docs.telerik.com/blazor-ui/components/grid/manual-operations), the general pattern is to store the last `DataSourceRequest` so you can repeat it over the new data and create a `new` Data collection. Here is an example:

>caption Refresh grid data with manual data source operations


````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions
@using System.Collections.ObjectModel

<TelerikButton OnClick="@ChangeData">Change Data Source</TelerikButton>

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
    public int Total { get; set; } = 0;
    public ObservableCollection<Employee> GridData { get; set; } = new ObservableCollection<Employee>(); //prevent null reference errors by intializing the field
    DataSourceRequest LastRequest { get; set; }//store the last request so we can repeat it when changing the data

    async Task ChangeData()
    {
        SourceData = GenerateData(DateTime.Now.Millisecond.ToString());
        await LoadData();//repeat the last request when changing data
    }

    async Task LoadData()
    {
        await Task.Delay(500); //simulate network delay from a real async call
        
        //this example uses the Telerik .ToDataSourceResult() method for brevity, you can call an API here instead
        var datasourceResult = SourceData.ToDataSourceResult(LastRequest);

        //should not be needed, but if the data does not update, try clearing it in order to fire the observable collection event
        //GridData.Clear();

        //update the grid data as usual
        GridData = new ObservableCollection<Employee>(datasourceResult.Data as IEnumerable<Employee>);
        Total = datasourceResult.Total;

        //tell the UI to update
        StateHasChanged();
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData(string.Empty);
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        LastRequest = args.Request;

        await LoadData();
    }

    //This sample implements only reading of the data. To add the rest of the CRUD operations see
    //https://docs.telerik.com/blazor-ui/components/grid/editing/overview

    private List<Employee> GenerateData(string generationIdentifier)
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
            {
                ID = i,
                Name = $"Name {i} {generationIdentifier}",
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
