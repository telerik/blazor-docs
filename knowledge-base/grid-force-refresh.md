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

### Automatic operations

For general cases, to change the data that is rendered in the grid from an external source, use an `ObservableCollection`: [https://demos.telerik.com/blazor-ui/grid/observable-data](https://demos.telerik.com/blazor-ui/grid/observable-data). To change the entire data collection, `.Clear()` the collection first to notify the grid that this old data is gone, then create a new one with the new data.

### Manual operations

When using manual operations through the [OnRead event](https://docs.telerik.com/blazor-ui/components/grid/manual-operations), the general pattern is to store the last `DataSourceRequest` so you can repeat it over the new data. Here is an example:

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
