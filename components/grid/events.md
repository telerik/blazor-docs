---
title: Events
page_title: Grid for Blazor | Events
description: Events of the Grid for Blazor
slug: grid-events
tags: telerik,blazor,grid,events
published: True
position: 100
---

# Grid Events

This article explains the events available in the Telerik Grid for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Read Event](#read-event) - event related to obtaining data
* [Other Events](#other-events) - other events the grid provides
    * [State Events](#state-events)
	* [Command Button Click](#command-button-click)
	* [SelectedItemsChanged](#selecteditemschanged)
	* [OnRowClick](#onrowclick)
	* [OnRowDoubleClick](#onrowdoubleclick)
	* [PageChanged](#pagechanged)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when the want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Editing Overview]({%slug components/grid/editing/overview%}) article.

## Read Event

In the common case, you provide all the data to the grid's `Data` collection and the grid performs operations like paging, filtering, sorting on it for you. In some cases you may want to do this with your own code (for example, to retrieve only a small number of items in order to improve the backend performance). You can do this by attaching to the `OnRead` event where you can perform all the data read operations in the grid. You can read more about them in the [Manual Data Source Operations]({%slug components/grid/manual-operations%}) article.


## Other Events

### State Events

The grid state lets you control through code the aspects of the grid the user can control in the UI - such as filtering, sorting, grouping. The grid provides two events related to the state:

* `OnStateInit` - fires when the grid initializes so you can provide a stored version of the grid.

* `OnStateChanged` - fires when the user performs an action so you can see what area was changed and, if needed, alter the grid state.

Review the [grid state]({%slug grid-state%}) article for more details and examples on how the grid state works and what you can do with it.

### Command Button Click

The command buttons of a grid provide an `OnClick` event before firing their built-in command (such as opening a row for editing, or adding a new row). You can do this to implement some additional logic and to also handle custom commands - both from a [Command Column]({%slug components/grid/columns/command%}), and from a [Toolbar Button]({%slug components/grid/features/toolbar%})

### SelectedItemsChanged

Fires when the item selection is enabled and the user changes the selected [item]({%slug components/grid/selection/single%}#selecteditemschanged-event) or [items]({%slug components/grid/selection/multiple%}#selecteditemschanged-event).

### OnRowClick

The `OnRowClick` event fires as a response to the user clicking on a row of the Grid. Clicking on the `GridCommandButton`, select row `CheckBox`, expanding a `Detail Template` or when the row is in `edit/insert mode` will not trigger the event.

The event handler receives a `GridRowClickEventArgs` object which provides the model of the clicked row in the `Item` field that you can cast to your model type.

>caption Use the OnRowClick event to load data on demand based on the clicked row

````CSHTML
@* Use the OnRowClick event to load data on demand based on the clicked row *@

<TelerikGrid Data="@MyData"
             Height="400px"
             Width="700px"
             Pageable="true"
             OnRowClick="@OnRowClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@if (ProjectData.Any())
{
    <br />
    <TelerikGrid Data="@ProjectData" AutoGenerateColumns="true"
                 Pageable="true" PageSize="4" Width="700px">
    </TelerikGrid>
}

@code {
    public List<ProjectModel> ProjectData { get; set; } = new List<ProjectModel>();

    async Task OnRowClickHandler(GridRowClickEventArgs args)
    {
        var item = args.Item as SampleData;

        ProjectData = await GetProjectData(item.Id);
    }

    async Task<List<ProjectModel>> GetProjectData(int id)
    {
        ProjectData = new List<ProjectModel>()
        {
            new ProjectModel()
            {
                ProjectManagerId = id,
                ProjectName = $"Project name {id}",
                DueDate = DateTime.Today.AddDays(-id),
                isActive = id % 2 == 0 ? true : false
            }
        };
        return await Task.FromResult(ProjectData);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
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

    public class ProjectModel
    {
        public int ProjectManagerId { get; set; }
        public string ProjectName { get; set; }
        public DateTime DueDate { get; set; }
        public bool isActive { get; set; }
    }
}
````

>caption The result from the code snippet above

![OnRowClick example](images/onrowclick-example.gif)

### OnRowDoubleClick

The `OnRowDoubleClick` event fires as a response to the user double clicking on a row of the Grid. Clicking on the `GridCommandButton`, select row `CheckBox`, expanding a `Detail Template` or when the row is in `edit/insert mode` will not trigger the event.

The event handler receives a `GridRowClickEventArgs` object which provides the model of the clicked row in the `Item` field that you can cast to your model type

>caption Use the OnRowDoubleClick event to receive information on the clicked row

````CSHTML

@* Use the OnRowDoubleClick event to receive information on the row the user clicked on *@

<TelerikGrid Data="@MyData"
             Height="400px"
             Width="700px"
             Pageable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@if (!String.IsNullOrEmpty(logger))
{
    <div>
        @logger
    </div>
}

@code {
    string logger = String.Empty;

    void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        var item = args.Item as SampleData;

        logger = $"Double clicked on {item.Name}";
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
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

### PageChanged

The event fires when the user pages the grid.

````CSHTML
@result

<TelerikGrid Data="@MyData" Pageable="true" PageSize="30"
    PageChanged="@PageChangedHandler" Height="300px">
    <GridColumns>
        <GridColumn Field="ID"></GridColumn>
        <GridColumn Field="TheName" Title="Employee Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    string result { get; set; }
    async Task PageChangedHandler(int currPage)
    {
        result = $"the user is now on page {currPage}. Note - the indexes are 1-based, not 0-based";
    }

    public IEnumerable<object> MyData = Enumerable.Range(1, 150).Select(x => new { ID = x, TheName = "name " + x });
}
````

## See Also

  * [Grid Overview]({%slug components/grid/overview%})
  * [Grid Editing Overview]({%slug components/grid/editing/overview%})
  * [Manual Data Source Operations]({%slug components/grid/manual-operations%})
