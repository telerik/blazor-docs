---
title: Filter Grid by Date Only
description: How to filter the Grid by date values only, and ignore the time values.
type: how-to
page_title: How to Filter the Grid by Date Only
slug: grid-kb-filter-date-only
position: 
tags: grid, filter, date
ticketid: 1464665, 1522948, 1531072, 1559607, 1570059, 1570460
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

A Grid has a DateTime column with filtering. How to filter only by date and ignore the time part?

How to filter the Grid only by date without the time portion? The filter operator is `equal to`.


## Solution

Here are 4 different ways to achieve date-only filtering with `is equal to` filter operator. Each option is suitable for different scenarios.

* [Use the Grid `OnStateChanged` event](#handle-onstatechanged)
* [Bind the Grid via `OnRead` event](#bind-via-onread)
* [Use an additional model property](#use-additional-model-property)
* [Use a filter template](#use-filter-template)

### Handle OnStateChanged

This approach is suitable for [`FilterMenu` filter mode](slug:grid-filter-menu). The Grid will reveal the filtering customization in its filter menu - the filter operators will change and the two DatePickers will show adjacent date values. After the initial `is equal to` filtering, the application business logic should determine how to handle the next user actions.

1. Subscribe to the [`OnStateChanged` event](slug:grid-state#events).
1. Check if [`args.PropertyName`](slug:Telerik.Blazor.Components.GridStateEventArgs-1) is `"FilterDescriptors"`.
1. Iterate the filter descriptors in `args.GridState.FilterDescriptors`.
1. If there is an active filter for the date column, [modify the filter descriptors to filter the Grid rows between two dates](slug:grid-state#setstateasync-examples).

Note the [difference between `FilterDescriptor` and `CompositeFilterDescriptor`](slug:components/grid/filtering#filter-descriptors). This scenario involves both types.

>caption Filter Grid by date via filter descriptor changes in OnStateChanged

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@GridItem"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="GridFilterMode.FilterMenu"
             OnStateChanged="@((GridStateEventArgs<GridItem> args) => OnStateChangedHandler(args))">
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.TaskName)" Title="Task Name"></GridColumn>
        <GridColumn Field="@nameof(GridItem.TaskStart)" Title="Task Start Date" />
    </GridColumns>
</TelerikGrid>

@code {
    List<GridItem> GridData { get; set; }

    void OnStateChangedHandler(GridStateEventArgs<GridItem> args)
    {
        if (args.PropertyName == "FilterDescriptors")
        {
            foreach (CompositeFilterDescriptor cfd in args.GridState.FilterDescriptors)
            {
                FilterDescriptor fd1 = cfd.FilterDescriptors.ElementAt(0) as FilterDescriptor;
                FilterDescriptor fd2 = cfd.FilterDescriptors.ElementAt(1) as FilterDescriptor;

                if (fd1.Member == nameof(GridItem.TaskStart) &&
                    fd1.Operator == FilterOperator.IsEqualTo && // optional
                    fd1.Value != null &&
                    fd2.Value == null) // optional
                {
                    fd1.Operator = FilterOperator.IsGreaterThanOrEqualTo;
                    fd2.Operator = FilterOperator.IsLessThan;

                    fd2.Value = ((DateTime)fd1.Value).AddDays(1);
                }
            }
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new GridItem()
            {
                Id = i,
                TaskName = "Task Name " + i,
                TaskStart = DateTime.Now.AddDays(-i / 2).AddHours(-i).AddMinutes(-i * 5)
            });
        }

        base.OnInitialized();
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskStartDate => TaskStart.Date;
    }
}
````

### Bind via OnRead

This approach is suitable for [`FilterRow` filter mode](slug:grid-filter-row). The Grid filtering interface will not reveal the filtering customization to the user.

1. Bind the Grid via its [`OnRead` event](slug:common-features-data-binding-onread).
1. Check for existing filters in the [`DataSourceRequest` argument](slug:common-features-data-binding-onread#event-argument) (`args.Request.Filters`).
1. If there is an active filter for the date column, change the `Operator` and `Value` of the existing [`FilterDescriptor`](slug:Telerik.DataSource.FilterDescriptor). Add one more filter descriptor for the same column (`Member`), so that the date column is filtered between two dates.
1. Continue the `OnRead` handler execution with the modified `DataSourceRequest` object.

>caption Filter Grid by date via filter descriptor changes in OnRead

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@GridItem"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.TaskName)" Title="Task Name"></GridColumn>
        <GridColumn Field="@nameof(GridItem.TaskStart)" Title="Task Start Date" />
    </GridColumns>
</TelerikGrid>

@code {
    List<GridItem> GridData { get; set; }

    async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(200); // simulate network delay

        DateTime filterDate = DateTime.MinValue;

        foreach (CompositeFilterDescriptor cfd in args.Request.Filters)
        {
            foreach (FilterDescriptor fd in cfd.FilterDescriptors)
            {
                if (fd.Member == nameof(GridItem.TaskStart) &&
                    //fd.Operator == FilterOperator.IsEqualTo && // optional
                    fd.Value != null)
                {
                    fd.Operator = FilterOperator.IsGreaterThanOrEqualTo;
                    filterDate = (DateTime)fd.Value;
                }
            }
        }

        if (filterDate != DateTime.MinValue)
        {
            args.Request.Filters.Add(new FilterDescriptor()
            {
                Member = nameof(GridItem.TaskStart),
                MemberType = typeof(System.DateTime),
                Operator = FilterOperator.IsLessThan,
                Value = filterDate.AddDays(1)
            });
        }

        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new GridItem()
            {
                Id = i,
                TaskName = "Task Name " + i,
                TaskStart = DateTime.Now.AddDays(-i / 2).AddHours(-i).AddMinutes(-i * 5)
            });
        }

        base.OnInitialized();
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskStartDate => TaskStart.Date;
    }
}
````

### Use Additional Model Property

This approach is suitable for both filter menu and filter row modes. It has the following specifics:

* Sorting will ignore the time values, unless there is an extra column, which is bound to the complete `DateTime` value.
* Time value display requires a [column `Template`](slug:grid-templates-column) or an extra "time" column.
* Time value editing requires an [`EditorTemplate`](slug:grid-templates-editor).

>caption Filter Grid by date via additional model property

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@GridItem"
             Pageable="true"
             PageSize="5"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow"
             EditMode="@GridEditMode.Incell"
             OnUpdate="@OnGridUpdate">
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.TaskName)" Title="Task Name"></GridColumn>
        <GridColumn Field="@nameof(GridItem.TaskStartDate)" Title="Task Start Date">
            <Template>
                @((context as GridItem).TaskStart.ToString())
            </Template>
            <EditorTemplate>
                @{
                    var item = context as GridItem;
                }
                <TelerikDateTimePicker @bind-Value="@item.TaskStart"
                                       DebounceDelay="0" />
            </EditorTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<GridItem> GridData { get; set; }

    void OnGridUpdate(GridCommandEventArgs args)
    {
        var item = args.Item as GridItem;
        var index = GridData.FindIndex(x => x.Id == item.Id);
        GridData[index] = item;
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new GridItem()
            {
                Id = i,
                TaskName = "Task Name " + i,
                TaskStart = DateTime.Now.AddDays(-i / 2).AddHours(-i).AddMinutes(-i * 5)
            });
        }

        base.OnInitialized();
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskStartDate => TaskStart.Date;
    }
}
````

### Use Filter Template

* This approach is suitable for [`FilterMenu` filter mode](slug:grid-filter-menu).
* The date column requires a [`FilterMenuTemplate`](slug:grid-templates-filter).
* The filter menu template provides full control over filtering interface and behavior.
* More coding may be required.

See the [Grid Filter Menu Template Demo](https://demos.telerik.com/blazor-ui/grid/custom-filter-menu).


## See Also

* [Grid State](slug:grid-state)
* [Grid Filtering Overview](slug:components/grid/filtering)
* [Grid Manual Data Operations with OnRead](slug:components/grid/manual-operations)
