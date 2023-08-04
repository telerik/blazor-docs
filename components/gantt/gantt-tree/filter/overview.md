---
title: Overview
page_title: Gantt Chart - Filtering Overview
description: Overview of the filtering for the Gantt Chart for Blazor.
slug: gantt-filtering-overview
tags: telerik,blazor,gantt,chart,tree,filtering,filter,menu,row
published: True
position: 0
---

# Blazor Filtering Overview

The Gantt Tree component offers built-in support for filtering.

## Basics

To enable filtering, set the grid's `FilterMode` property to one of the following values:

* [`Telerik.Blazor.GanttFilterMode.FilterRow`]({%slug gantt-filter-row%}) - a row of filter options is rendered below the column headers

* [`Telerik.Blazor.GanttFilterMode.FilterMenu`]({%slug gantt-filter-menu%}) - the column headers render a button that shows a popup with filtering options

The behavior of the filter input and the available filter operators will depend on the column data type. For example, a `boolean` field will only have the options `"is true"` and `"is false"` and will not have operators like `"contains"` or `"greater than"`.

You can filter more than one column at a time, and all filter rules will be applied together with an `AND` logic.

## Filter Descriptors

The Gantt filter state is stored in [CompositeFilterDescriptors](/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor). The below information is important if you want to [get or change the Gantt filters programmatically]({%slug gantt-state%}).

Each `CompositeFilterDescriptor` contains a [**collection** of `FilterDescriptor`s](/blazor-ui/api/Telerik.DataSource.FilterDescriptorCollection). All descriptors in the collection are applied with an *AND* or an *OR* `LogicalOperator`.

* [Filter Row]({%slug gantt-filter-row%}) - each `CompositeFilterDescriptor` targets a specific field. By default, one filter can be applied to a field using the Filter Row operator. The filter value is stored in the first `FilterDescriptor` instance of the `CompositeFilterDescriptor` for that field.

* [Filter Menu]({%slug gantt-filter-menu%}) - each `CompositeFilterDescriptor` targets a specific field. Filter values from the separate filter operators in the menu are stored in different `FilterDescriptor` instances of the dedicated `CompositeFilterDescriptor` for that field.


## Customize The Filter Editors

You can customize the editors rendered in the Gantt
by providing the `FilterEditorType` attribute, exposed on the `<GanttColumn>`. The `FilterEditorType` attribute accepts a member of the `GanttTreeListFilterEditorType` enum:

| Field data type | GanttTreeListFilterEditorType enum members |
|-----------------|------------------------------------------|
| **DateTime**  | `GanttTreeListFilterEditorType.DatePicker`<br> `GanttTreeListFilterEditorType.DateTimePicker` |


````CSHTML
@* The usage of the FilterEditorType parameter *@

<TelerikGantt Data="@Data"
               Width="900px"
               Height="600px"
               IdField="Id"
               FilterMode="@GanttFilterMode.FilterMenu"
               ParentIdField="ParentId">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="Id"
                     Visible="false">
        </GanttColumn>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     FilterEditorType="@GanttTreeListFilterEditorType.DateTimePicker"
                     TextAlign="@ColumnTextAlign.Right">
        </GanttColumn>
        <GanttColumn Field="End"
                     FilterEditorType="@GanttTreeListFilterEditorType.DatePicker"
                     DisplayFormat="End: {0:d}"
                     Width="100px">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;
    List<FlatModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Employee  " + i.ToString(),
                Start = new DateTime(2020, 12, 6 + i),
                End = new DateTime(2020, 12, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new FlatModel()
                {
                    Id = LastId,
                    ParentId = parentId,
                    Title = "    Employee " + i + " : " + j.ToString(),
                    Start = new DateTime(2020, 12, 6 + i + j),
                    End = new DateTime(2020, 12, 7 + i + j),
                    PercentComplete = Math.Round(random.NextDouble(), 2)
                });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

