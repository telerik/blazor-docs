---
title: Column Menu
page_title: Gantt - Column Menu
description: Use the Column Menu for the Gantt to show a menu that allows you to perform column customization.
slug: gantt-column-menu
tags: telerik,blazor,gantt,column,columns,menu
published: True
position: 20
---

# Column Menu

The Gantt allows you to set up a menu for its columns. The Column Menu enables you to perform high-level customization like [sorting](slug://gantt-sorting), [filtering](slug://gantt-filtering-overview), and [showing or hiding](slug://gantt-columns-visible) columns.

>caption In this article:
* [Basics](#basics)
* [Features](#features)
    * [Column Chooser](#column-chooser)
    * [Filtering](#filtering)
    * [Frozen Columns](#frozen-columns)
    * [Column Sections](#column-sections)
    * [Sorting](#sorting)
    * [Reordering](#reordering)
* [Example](#example)
* [Notes](#notes)

## Basics

To enable the Column Menu, set the `ShowColumnMenu` parameter of the `<TelerikGantt>` tag to `true`. This will enable the menu for each column of the Gantt.

To disable the Column Menu for a specific column in the Gantt, set the `ShowColumnMenu` parameter of the column to `false`.

>caption Enable the column menu for all Gantt columns.

````RAZOR
<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Navigable="true"
              ColumnReorderable="true"
              Sortable="true"
              ColumnResizable="true"
              ShowColumnMenu="true">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="@nameof(FlatModel.Title)" ShowColumnMenu="false">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.PercentComplete)">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.Start)">
        </GanttColumn>
        <GanttColumn Field="@nameof(FlatModel.End)">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    private DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    public class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    private int LastId { get; set; } = 1;
    private List<FlatModel> Data { get; set; }

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
                    Start = new DateTime(2020, 12, 10 + i),
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
                        Start = new DateTime(2020, 12, 20 + j),
                        End = new DateTime(2020, 12, 21 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }

}
````

## Features

To control the features of the Column Menu, use the `<GanttColumnMenuSettings>` tag, nested inside the `<GanttSettings>` tag.

By default, all Column Menu features are enabled.

### Column Chooser

The Column Chooser in the Column Menu allows you to toggle the visibility of Gantt columns. By default, all columns are visible under the **Columns** section of the Column Menu. To expand the menu, click the **Columns** item.

The **Apply** button sets the column visibility according to the current checkbox values and closes the column menu. The **Reset** button reverts the checkbox values to their state when the column menu was opened. At this point, the user can start over, click **Apply**, or click outside the column menu to close it.

* To disable the column chooser, set the `ShowColumnChooser` parameter of the `<GanttColumnMenuSettings>` to `false`.
* To hide a column from the Column Chooser, set the `VisibleInColumnChooser` property of the column to `false`.

### Filtering

To control whether filtering is possible from the Column Menu, set the `FilterMode` parameter of the `GanttColumnMenuSettings` tag to a member of the `ColumnMenuFilterMode` enum:

* `None`—disables the filtering from the Column Menu. This is the recommended option if you use the [`FilterRow` mode](slug://gantt-filter-row).
* `FilterMenu`—enables filtering from a filter menu.

### Frozen Columns

To disable the locking and unlocking of a column from the Column Menu, set the `Lockable` parameter of the `GanttColumnMenuSettings` tag to `false`.

### Sorting

To remove the sorting option from the Column Menu, set the `Sortable` parameter of the `GanttColumnMenuSettings` tag to `false`.

### Reordering

To allow column reordering from the Column Menu, set the `Reorderable` parameter of the `GanttColumnMenuSettings` tag to `true`.

### Column Sections

The Gantt Column Menu lets you group the columns in the [Column Chooser](#column-chooser) into different sections:

1. Use the `GanttColumnMenuChooser` tag (child to the `GanttColumnMenuSettings`).

1. Add the [Template](slug://gantt-templates-column-chooser) tag.

1. Provide a `GanttColumnMenuChooserGroup`, which is a collection of the columns that will be in the section. To render a title for the section, use the `Title` parameter.
    

1. Use the `GanttColumnMenuChooserItem` to denote the columns that belong to the group.

    * You must set the `ColumnId` parameter of the `GanttColumnMenuChooserItem` to the value of the [`Id`] parameter of the corresponding Gantt Column.
    
    * If you set the `Title` parameter of the `GanttColumnMenuChooserItem`, it will override the value of the `Title` parameter of the corresponding Gantt Column. 

## Example

The example shows the following things: 
* A custom `GanttColumnChooser`
* How to use the `GanttColumnMenuSettings` tag to control the features of the Column Menu.
* How to use column parameters to affect the column's relationship with the column menu.

````RAZOR
@* Disable filtering and locking columns, hide a column from the chooser (PercentComplete), disable the menu for a column (Title). *@

<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Navigable="true"
              ColumnReorderable="true"
              Sortable="true"
              FilterMode="@GanttFilterMode.FilterRow"
              ColumnResizable="true"
              ShowColumnMenu="true">
    <GanttSettings>
        <GanttColumnMenuSettings Lockable="false"
                                 Reorderable="true"
                                 FilterMode="@ColumnMenuFilterMode.None">
            <GanttColumnMenuChooser>
                <Template>
                    <GanttColumnMenuChooserGroup Title="Worker Information">
                        <GanttColumnMenuChooserItem ColumnId="title-column-id" />
                    </GanttColumnMenuChooserGroup>
                    <GanttColumnMenuChooserGroup Title="Time-Frame Information">
                        <GanttColumnMenuChooserItem ColumnId="percentcomplete-column-id" />
                        <GanttColumnMenuChooserItem ColumnId="start-column-id" />
                        <GanttColumnMenuChooserItem ColumnId="end-column-id" />
                    </GanttColumnMenuChooserGroup>
                </Template>
            </GanttColumnMenuChooser>
        </GanttColumnMenuSettings>
    </GanttSettings>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="@nameof(FlatModel.Id)" ShowColumnMenu="false" />
        <GanttColumn Field="@nameof(FlatModel.Title)" Id="title-column-id" Reorderable="false" />
        <GanttColumn Field="@nameof(FlatModel.PercentComplete)" Id="percentcomplete-column-id" VisibleInColumnChooser="false" />
        <GanttColumn Field="@nameof(FlatModel.Start)" Id="start-column-id" />
        <GanttColumn Field="@nameof(FlatModel.End)" Id="end-column-id" />
    </GanttColumns>
</TelerikGantt>

@code {
    public class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    private int LastId { get; set; } = 1;
    private List<FlatModel> Data { get; set; }

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
                    Start = new DateTime(2020, 12, 10 + i),
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
                        Start = new DateTime(2020, 12, 20 + j),
                        End = new DateTime(2020, 12, 21 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

## Notes

* The settings applied to a Gantt column take precedence over the settings applied to the Column Menu through the `<GanttColumnMenuSettings>` tag. For example, if you set `Lockable="false"` to a Gantt column and `Lockable="true"` to the Gantt Column Menu, the Frozen Columns functionality will be disabled.

* When using the [Column Chooser Template](slug://gantt-templates-column-chooser) or grouping the columns into [sections](#column-sections), add the `Title` parameter to all Gantt Columns.

## See Also
  * [Live Demo: Gantt Column Menu](https://demos.telerik.com/blazor-ui/gantt/column-menu)
  * [Live Demo: Gantt Custom Column Menu](https://demos.telerik.com/blazor-ui/gantt/custom-column-menu)