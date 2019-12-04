---
title: Overview
page_title: Grid for Blazor | Selection Overview
description: Selection basics in the Grid for Blazor
slug: components/grid/selection/overview
tags: telerik,blazor,grid,selection,overview
published: True
position: 0
---

# Grid Selection

The Grid component offers support for row selection.

In this article:

* [Selection Basics](#selection-basics)
* [Example - Enable Row Selection](#example---enable-row-selection)
* [Notes](#notes)
	* [Editing Modes](#editing-modes)
	* [Observable Collections](#observable-collections)

## Selection Basics

You can configure the selection behavior by setting `SelectionMode` to a member of the `Telerik.Blazor.GridSelectionMode` enum. The row selection can be:

* [Single]({%slug components/grid/selection/single%})
* [Multiple]({%slug components/grid/selection/multiple%})
* `None` - to disable row selection

To select a row, click on it. To select multiple rows, hold down the `Ctrl` or `Shift` key to extend the selection.

You can also use a [checkbox column](#checkbox-support) to select rows. To use it, add a `GridCheckboxColumn` in the `GridColumns` collection of the grid. It works with both selection modes. The checkbox in the header selects all items in the current page (if its `SelectAll` parameter is set to `true`).

You can get or set the [selected items](#get-or-set-selected-items) through the `SelectedItems` property. It is a collection of items from the Grid's `Data`. You can use two-way binding, or the `SelectedItemsChanged` event to track the user selection.

The [single selection]({%slug components/grid/selection/single%}) and [multiple selection]({%slug components/grid/selection/multiple%}) articles provide more examples and details on using the grid features.

## Example - Enable Row Selection

````CSHTML
See how the row selection modes work

<select @bind=@selectionMode>
    <option value=@GridSelectionMode.Single>Single</option>
    <option value=@GridSelectionMode.Multiple>Multiple</option>
</select>

<TelerikGrid Data=@GridData
             SelectionMode="@selectionMode"
             Pageable="true">
    <GridColumns>
        <GridCheckboxColumn SelectAll="@( selectionMode == GridSelectionMode.Single ? false : true )" Title="Select" Width="70px" />
        <GridColumn Field=@nameof(Employee.Name) />
        <GridColumn Field=@nameof(Employee.Team) Title="Team" />
    </GridColumns>
</TelerikGrid>

@code {
    public List<Employee> GridData { get; set; }

    GridSelectionMode selectionMode = GridSelectionMode.Single;

    protected override void OnInitialized()
    {
        GridData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            GridData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````

## Notes

## Editing Modes

In the [Incell EditMode]({%slug components/grid/editing/incell%}) selection can be applied only via a checkbox column. This is required due to the overlapping action that triggers selection and incell editing (clicking in the row).

## Observable Collections

When binding the grid to an observable collection, changing the data source does not change the selected items automatically. 

If you plan on changing the data source in your own code, you may want to clear or otherwise modify the `SelectedItems` collection to ensure the user will select only what they want from the new data.

If you want to clear the data source, make sure to use its `.Clear()` method as this will notifiy the grid of the change. Creating an entirely new `ObservableCollection` will not.

>caption Example of cleaning up selected items (review this mostly through the Select All checkbox in the header)

````Component
@using System.Collections.ObjectModel
@using ServerApp.Data
@inject WeatherForecastServiceMod WeatherForecastService

<TelerikButton OnClick="@AddForecast">Add</TelerikButton>
<TelerikButton OnClick="@RemoveForecast">Remove</TelerikButton>
<TelerikButton OnClick="@NewDataSet">New Data Set</TelerikButton>
<TelerikButton OnClick="@ClearDataSet">Clear Data Set</TelerikButton>

<TelerikGrid Data=@GridData Height="400px"
             SelectionMode="@GridSelectionMode.Multiple" @bind-SelectedItems="@SelectedItems">
    <GridColumns>
        <GridCheckboxColumn></GridCheckboxColumn>
        <GridColumn Field="Id" />
        <GridColumn Field="Summary" />
        <GridColumn Field="TemperatureC" Title="Temp. C" />
        <GridColumn Field="Date" />
    </GridColumns>
</TelerikGrid>

<ul>
    @foreach (WeatherForecast itm in SelectedItems)
    {
        <li>
            @itm.Id
            @itm.Summary
            @itm.TemperatureC
        </li>
    }

</ul>

@code {
    public ObservableCollection<WeatherForecast> GridData { get; set; }
    public IEnumerable<WeatherForecast> SelectedItems { get; set; } = Enumerable.Empty<WeatherForecast>();

    protected override async Task OnInitializedAsync()
    {
        await LoadData();
    }

    private async Task LoadData()
    {
        var forecasts = await WeatherForecastService.GetForecastAsync(5);

        GridData = new ObservableCollection<WeatherForecast>(forecasts);
    }

    void AddForecast()
    {
        GridData.Add(WeatherForecastService.GenerateForecast(GridData.Count + 1));
    }

    void RemoveForecast()
    {
        if (GridData.Count > 0)
        {
            GridData.RemoveAt(0);
        }
    }

    async Task NewDataSet()
    {
        GridData.Clear(); // clear the current data source first
        // fetch actual data. Adding the new items one at a time through 
        // the Add(), Insert(), InsertItem() methods will fire the events many times
        // and that may not be needed as it will perform a lot of unnecessary operations
        var forecasts = await WeatherForecastService.GetForecastAsync(3);
        GridData = new ObservableCollection<WeatherForecast>(forecasts);
        
        // optionally, clear the selected items, as they will be the old data
        SelectedItems = Enumerable.Empty<WeatherForecast>();
    }

    void ClearDataSet()
    {
        GridData.Clear(); // clear the current data source
        // do not create a new collection
        //GridData = new ObservableCollection<WeatherForecast>();
        
        // optionally, clear the selected items, as they will be the old data
        SelectedItems = Enumerable.Empty<WeatherForecast>();
    }
}
````
````Service
    public class WeatherForecastServiceMod
    {
        public static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public Task<List<WeatherForecast>> GetForecastAsync()
        {
            return GetForecastAsync(30);
        }

        public Task<List<WeatherForecast>> GetForecastAsync(int count)
        {
            var rng = new Random();

            return Task.FromResult(Enumerable.Range(1, count).Select(index => GenerateForecast(index)).ToList());
        }

        public WeatherForecast GenerateForecast(int index)
        {
            var rng = new Random();
            return new WeatherForecast
            {
                Id = index,
                Date = DateTime.Now.AddDays(rng.Next(-10, 10)).Date,
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            };
        }

        public WeatherForecast GenerateForecast()
        {
            var rng = new Random();
            return new WeatherForecast
            {
                Date = DateTime.Now.AddDays(rng.Next(-10, 10)),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            };
        }
    }
````
````Model
    public class WeatherForecast
    {
        public int Id { get; set; } // used to clearly identify the items
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        public string Summary { get; set; }
    }
````


## See Also

  * [Live Demo: Grid Selection](https://demos.telerik.com/blazor-ui/grid/selection)
  * [Live Demo: Grid Checkbox Selection](https://demos.telerik.com/blazor-ui/grid/checkbox-selection)
  * [Single Selection]({%slug components/grid/selection/single%})
  * [Multiple Selection]({%slug components/grid/selection/multiple%})

