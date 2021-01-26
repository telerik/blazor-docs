---
title: Loading Sign
page_title: Loading Sign
description: Components that peform long running operations can show a loading indicator to the user to indicate they are busy.
slug: common-features-loading-sign
tags: telerik,blazor,loading,sign,busy,indicator,data
published: True
position: 2
---

# Loading Sign

Many times a component loads or saves data and that can take some time. To show your users the app is working, and to prevent them from performing the same action multiple times, the Telerik Blazor components can show a busy indicator while such an operation is under way.

The Telerik components use the Telerik [Loader]({%slug loader-overview%}) and [LoaderContainer]({%slug loadercontainer-overview%}) components internally to match the theme and design.

The components add the busy indicator when they detect a slow-running `async` **data operation** (when it takes more than 600ms). For example, when the user inserts a record in the grid and the data service operation takes longer than that, there will be a loading indicator over the grid.

#### In this article:

* [List of Components That Have Loading Indicators](#list-of-components-that-have-loading-indicators)
* [Notes](#notes)
	* [Initial Data](#initial-data)
	* [Slow Rendering](#slow-rendering)
* [Disable The Loading Indicator](#disable-the-loading-indicator)
* [Troubleshooting](#troubleshooting)
	* [Loading Sign Does Not Hide](#loading-sign-does-not-hide)


## List of Components That Have Loading Indicators

The following list shows the components that have a built-in loading sign for data operations:

<!-- 

* **AutoComplete** - while data is loading through the `OnRead` event, the dropdown is visible and new items are placeholders that are replaced with actual data when it arrives.

* **ComboBox** - while data is loading through the `OnRead` event, the dropdown is visible and new items are placeholders that are replaced with actual data when it arrives. The dropdown arrow becomes a loading icon.

-->

* [**Grid**](https://demos.telerik.com/blazor-ui/grid/loading-animation) - a loading sign covers the data portion of the component for slow data operations such as paging, filtering, sorting, grouping, expanding groups with load-on-demand; editing, inserting and deleting records. It is shown when the `OnRead` event is called (except on the [initial load](#initial-data)).

* **ListView** - a loading sign covers the data portion of the component for slow data operations such as editing, inserting and deleting records. It is also shown when the `OnRead` event is called (except on the [initial load](#initial-data)).

<!--

* **MultiSelect** - while data is loading through the `OnRead` event, the dropdown is visible and new items are placeholders that are replaced with actual data when it arrives.
-->

* **Scheduler** - a loading sign covers the data portion of the component for slow data operations such as editing, inserting and deleting appointments.

* **TreeList** - a loading sign covers the data portion of the component for slow data operations such as editing, inserting and deleting records. Expanding items with load-on-demand shows a loading indicator next to the item while the `OnExpand` event is running.

* **TreeView** - for expanding nodes with load-on-demand, a loading indicator is shown next to the item while the `OnExpand` event is running.

* **Upload** - in addition to the progress bar for each individual file in the file list, the entire component shows a loading sign and message in its header while a file is uploading.

If the components are bound to `IQueriable` data which takes a long time to return, the loading signs will also be shown (e.g., as if the `OnRead` or `OnExpand` events are used). Note that this can only work in a server-side Blazor app where the query will be resolved against the real database.

## Notes

This section explains a few points that you need to keep in mind when using and relying on busy indicators.

* [Initial Data](#initial-data)
* [Slow Rendering](#slow-rendering)


### Initial Data

The initial load of `Data` is not covered by the built-in busy indicator. The components cannot know when or even *if* data will be provided to them, so showing the loading animation may keep it there indefinitely and confuse the users.

In other cases it could even prevent them from interacting with the component so they can see data. For example, when a grid's State is loaded there may be no data due to specific filters, so the user may want to remove filters, but would be unable to do so because the busy indicator is blocking the grid.

Thus, to show a loading indicator during the initial data load, you can do either of the following:
* Use the standard Blazor approach of adding an if-block and a busy indicator in your own code.
* Use a Telerik busy indicator and set its `Visible` parameter value depending on the initial data load status (as shown in the examples below).

>caption Loading Sign for the initial data load - a few examples

````Grid
This sample shows only an indicator for the initial data load, only the DELETE operation is slowed down so you can see a loading sign.

<div style="position: relative; width:100%; min-height: 400px;">
    <TelerikLoaderContainer OverlayThemeColor="light" Visible="@( !InitialDataLoadComplete )"
                            Text="@null">
        <Template>
            <TelerikLoader Type="@LoaderType.InfiniteSpinner" Size="@LoaderSize.Large"></TelerikLoader>
        </Template>
    </TelerikLoaderContainer>

    @*The loader container and styles above mimic the appearance of the built-in loading sign*@

    <TelerikGrid Data="@GridData" Height="400px"
                 Pageable="true" AutoGenerateColumns="true"
                 Sortable="true" Groupable="true"
                 FilterMode="@GridFilterMode.FilterRow"
                 OnDelete="@DeleteHandlerWithDelay">
        <GridColumns>
            <GridCommandColumn>
                <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            </GridCommandColumn>
        </GridColumns>
    </TelerikGrid>
</div>

@code {
    List<SampleData> GridData { get; set; }
    
    // Initial data load flag
    bool InitialDataLoadComplete { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadGridData();
        InitialDataLoadComplete = true;
    }

    async Task LoadGridData()
    {
        await Task.Delay(2000); // artificial delay to showcase the concept

        GridData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        }).ToList();
    }

    async Task DeleteHandlerWithDelay(GridCommandEventArgs e)
    {
        await Task.Delay(2000); // artificial delay to showcase the concept

        GridData.Remove(e.Item as SampleData);
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
````Scheduler
This sample shows only an indicator for the initial data load, only the DELETE operation is slowed down so you can see a loading sign.

<div style="position: relative; width:100%; min-height: 600px;">
    <TelerikLoaderContainer OverlayThemeColor="light" Visible="@( !InitialDataLoadComplete )"
                            Text="@null">
        <Template>
            <TelerikLoader Type="@LoaderType.InfiniteSpinner" Size="@LoaderSize.Large"></TelerikLoader>
        </Template>
    </TelerikLoaderContainer>

    @*The loader container and styles above mimic the appearance of the built-in loading sign*@

    <TelerikScheduler Data="@Appointments"
                      OnDelete="@DeleteAppointment"
                      AllowDelete="true"
                      @bind-Date="@StartDate" Height="600px" @bind-View="@CurrView">
        <SchedulerViews>
            <SchedulerDayView StartTime="@DayStart" />
            <SchedulerWeekView StartTime="@DayStart" />
            <SchedulerMultiDayView StartTime="@DayStart" NumberOfDays="10" />
        </SchedulerViews>
    </TelerikScheduler>

</div>

@code {
    // sample data and scheduler settings
    public SchedulerView CurrView { get; set; } = SchedulerView.Week;
    public DateTime StartDate { get; set; } = new DateTime(2019, 12, 2);
    public DateTime DayStart { get; set; } = new DateTime(2000, 1, 1, 8, 0, 0); //the time portion is important

    List<SchedulerAppointment> Appointments { get; set; }

    // Initial data load flag
    bool InitialDataLoadComplete { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await GetAppointments();
        InitialDataLoadComplete = true;
    }

    async Task GetAppointments()
    {
        await Task.Delay(2000); // artificial delay to showcase the concept

        Appointments = new List<SchedulerAppointment>()
        {
            new SchedulerAppointment
            {
                Title = "Board meeting",
                Description = "Q4 is coming to a close, review the details.",
                Start = new DateTime(2019, 12, 5, 10, 00, 0),
                End = new DateTime(2019, 12, 5, 11, 30, 0)
            },

            new SchedulerAppointment
            {
                Title = "Vet visit",
                Description = "The cat needs vaccinations and her teeth checked.",
                Start = new DateTime(2019, 12, 2, 11, 30, 0),
                End = new DateTime(2019, 12, 2, 12, 0, 0)
            },

            new SchedulerAppointment
            {
                Title = "Planning meeting",
                Description = "Kick off the new project.",
                Start = new DateTime(2019, 12, 6, 9, 30, 0),
                End = new DateTime(2019, 12, 6, 12, 45, 0)
            },

            new SchedulerAppointment
            {
                Title = "Trip to Hawaii",
                Description = "An unforgettable holiday!",
                IsAllDay = true,
                Start = new DateTime(2019, 11, 27),
                End = new DateTime(2019, 12, 05)
            }
        };
    }

    async Task DeleteAppointment(SchedulerDeleteEventArgs args)
    {
        await Task.Delay(2000); // artificial delay to showcase the concept

        Appointments.Remove(args.Item as SchedulerAppointment);
    }

    public class SchedulerAppointment
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public bool IsAllDay { get; set; }

        public SchedulerAppointment()
        {
            Id = Guid.NewGuid();
        }
    }
}
````
````TreeView
This sample shows a loading panel over the treeview container (tweak as required by your layout and design) in addition to the loading indicators the treeview provides while loading data on demand.

<div style="position: relative; width:100%; min-height: 400px;">
    <TelerikLoaderContainer Visible="@( !InitialDataLoadComplete )">
    </TelerikLoaderContainer>

    <TelerikTreeView Data="@TreeViewData" OnExpand="@LoadChildren">
    </TelerikTreeView>
</div>

@code {
    List<TreeViewItem> TreeViewData { get; set; }

    // Initial data load flag
    bool InitialDataLoadComplete { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadInitialData();
        InitialDataLoadComplete = true;
    }

    async Task LoadInitialData()
    {
        await Task.Delay(2000); // artificial delay to showcase the concept

        List<TreeViewItem> roots = new List<TreeViewItem>();

        roots.Add(new TreeViewItem
        {
            Text = "Category 1",
            HasChildren = true
        });

        roots.Add(new TreeViewItem
        {
            Text = "Category 2",
            HasChildren = true
        });

        TreeViewData = roots;
    }

    async Task LoadChildren(TreeViewExpandEventArgs args)
    {
        TreeViewItem currItem = args.Item as TreeViewItem;
        if (args.Expanded && currItem.Items == null)
        {
            await Task.Delay(1000); // artificial delay to showcase the concept

            currItem.Items = new List<TreeViewItem>();

            if (currItem.Text.Length > 15)
            {
                currItem.HasChildren = false;
                await InvokeAsync(StateHasChanged);
                return;
            }

            currItem.Items = Enumerable.Range(1, 3).Select(x => new TreeViewItem { Text = $"{currItem.Text} - {x}", HasChildren = true }).ToList();
        }
    }

    public class TreeViewItem
    {
        public string Text { get; set; }
        public List<TreeViewItem> Items { get; set; }
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }
}
````



### Slow Rendering

The loading indicator can be shown only during an `async` data operation that takes a while (the event handler for the operations must be `async Task` and *not* `void`). Synchronous operations do not render the components anew while they are running, only after they complete, so an indicator cannot be shown during them.

Rendering the UI is a synchronous operation that runs on the UI thread and blocks it. If that operation is slow, there will be no loading indicator.

A prime example of a slow synchronous operation is the actual component rendering under WebAssembly - the framework still uses a single thread only, and it can be rather slow in general, and that blocks the UI rendering thread of the browser. 

For a second example, lets's say that you have a grid with a large page size and too many columns - paging that grid could take some time to render even when all the data is in the view-model and there are no data requests simply because there are many DOM elements to re-render.

Another example could be a slow calculation (for example, grouping a large amount of data). A loading animation cannot be shown during this time because the page is actually rendering already.

A fourth example could be a dropdown that has far too many items in it - expanding the dropdown will take some time to render because the DOM operation itself takes time. This would affect server-side Blazor apps too.

To combat such performance issues, see the [Slow Performance]({%slug troubleshooting-general-issues%}#slow-performance) section of the documentation.

Truly asynchronous operations will still allow for a loading sign - such as the grid's `OnRead` event that is really `async` (for example, calls some WebAPI) will let the framework release the UI thread and re-render the component with a loading sign until the data response comes back.


## Disable The Loading Indicator

We believe that having a loading sign that tells the user something is happening improves the user experience. This is why this feature is enabled by default on all data bound components that perform data operations.

We understand, however, that you might want to disable this feature in some cases. You can disable the large loading container that overlays the data portion of the components by setting their `EnableLoaderContainer` parameter to `false`.

>caption Remove the main loading animation from the grid with a parameter

````CSHTML
@* The data operations (such as filtering, sorting, paging) are slow in this example, but there is no loading sign *@

<TelerikGrid EnableLoaderContainer="false"
             Data=@GridData TotalCount=@Total OnRead=@ReadItems
             FilterMode=@GridFilterMode.FilterRow Sortable=true Pageable=true EditMode="@GridEditMode.Inline">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
</TelerikGrid>

@* Everything else here is sample data binding *@

@using Telerik.DataSource.Extensions

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
        await Task.Delay(2000); //simulate delay from a real async call

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

There are some components that show small (inline) loading indicators, and you can hide those with CSS if you wish to remove them.

>caption How to hide inline loading signs with CSS (example with TreeView)

````CSHTML
@* The CSS rule hides the loading sign. If you want to disable it for all treeviews, remove the custom Class from the treeview declaration and the CSS rule.
In a similar fashion you can inspect the rendered HTML and target the element you want to hide for other components.
Make sure to have the proper cascade so that you do not break other components on the page you do not intend to affect. *@

<style>
    .no-loading-indicator .k-treeview-item .k-loader {
        display:none;
    }
</style>

<TelerikTreeView Class="no-loading-indicator"
                    Data="@TreeViewData" OnExpand="@LoadChildren">
</TelerikTreeView>


@code {
    List<TreeViewItem> TreeViewData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        await LoadInitialData();
    }

    async Task LoadInitialData()
    {
        List<TreeViewItem> roots = new List<TreeViewItem>();

        roots.Add(new TreeViewItem
        {
            Text = "Category 1",
            HasChildren = true
        });

        roots.Add(new TreeViewItem
        {
            Text = "Category 2",
            HasChildren = true
        });

        TreeViewData = roots;
    }

    async Task LoadChildren(TreeViewExpandEventArgs args)
    {
        TreeViewItem currItem = args.Item as TreeViewItem;
        if (args.Expanded && currItem.Items == null)
        {
            await Task.Delay(2000); // artificial delay to showcase the concept - no loading signs now

            currItem.Items = new List<TreeViewItem>();

            if (currItem.Text.Length > 15)
            {
                currItem.HasChildren = false;
                await InvokeAsync(StateHasChanged);
                return;
            }

            currItem.Items = Enumerable.Range(1, 3).Select(x => new TreeViewItem { Text = $"{currItem.Text} - {x}", HasChildren = true }).ToList();
        }
    }

    public class TreeViewItem
    {
        public string Text { get; set; }
        public List<TreeViewItem> Items { get; set; }
        public bool Expanded { get; set; }
        public bool HasChildren { get; set; }
    }
}
````



## Troubleshooting

### Loading Sign Does Not Hide

In some situations, peforming a certain action will show a loading indicator that will appear to never hide. There are two common reasons for such behavior:

* **Reason**: The operation is actually very slow, it may take minutes to return the data in some complex scenarios. 

    * **Solution**: To solve this, make sure that the data queries are as efficient as possible and return data as quickly as possible.

* **Reason**: There has been an error during the operation. For example, a certain filter value could not be parsed (e.g., it was only a part of a GUID, not a full one) and the backend threw an exception.

    * **Solution**: To solve this, monitor the console/logs and look for errors thrown during the problematic operation. Enabling the detailed Blazor errors may help you <a href="https://docs.microsoft.com/en-us/aspnet/core/blazor/fundamentals/handle-errors" target="_blank">troubleshoot</a> application errors:
    
        **Enable Detailed Errors in Server-side Blazor**
        
            services.AddServerSideBlazor(opts => opts.DetailedErrors = true);

