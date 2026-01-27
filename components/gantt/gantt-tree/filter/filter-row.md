---
title: Filter Row
page_title: Gantt - Filter Row
description: Enable and configure Filter Row in Gantt for Blazor.
slug: gantt-filter-row
tags: telerik,blazor,gantt,filtering,filter,row
published: True
position: 5
components: ["gantt"]
---
# Gantt Filter Row

One of the filter modes of the Gantt Chart is a row of filter that renders below the column headers.

In this article:

* [Basics](#basics)
* [Customization](#customization)

## Basics

To enable the filter row set the `FilterMode` property of the Gantt Chart to `Telerik.Blazor.GanttFilterMode.FilterRow`.

The Gantt Chart will render a row below the column headers in the Gantt Tree with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type, or click a button to choose a different filter operator (like "contains", "greater than" and so on). Filters are applied as the user types in the inputs. Once you enter a filter criteria, the clear button will be enabled to allow you to reset the filter state.

>caption Filter Row in Telerik Gantt

````RAZOR
@* Filter row mode *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              FilterMode="@GanttFilterMode.FilterRow">
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
                     Title="Task Title" >
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     TextAlign="@ColumnTextAlign.Right">
        </GanttColumn>
        <GanttColumn Field="End"
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

## Customization

The Gantt allows you to customize the default behavior of the Filter Row in a couple ways:

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Configuring the Filter Row

You can customize the default Filter Row behavior for each Gantt Tree column through the following properties the `GanttColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

>caption Configure the Filter Row

````RAZOR
@*Customize the Filter Menu*@

@using Telerik.DataSource

<TelerikGantt Data="@Data"
              @bind-View="@SelectedView"
              FilterMode="@GanttFilterMode.FilterRow"
              FilterRowDebounceDelay="200"
              Width="1000px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <GanttColumns>
        <GanttColumn DefaultFilterOperator="FilterOperator.StartsWith"
                     ShowFilterCellButtons="false"
                     Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn DefaultFilterOperator="FilterOperator.IsEqualTo"
                     ShowFilterCellButtons="false"
                     Field="PercentComplete"
                     Title="Status"
                     Width="60px">
        </GanttColumn>
        <GanttColumn DefaultFilterOperator="FilterOperator.IsGreaterThanOrEqualTo"
                     ShowFilterCellButtons="false" 
                     Field="Start"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn DefaultFilterOperator="FilterOperator.IsLessThanOrEqualTo"
                     ShowFilterCellButtons="false"
                     Field="End"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@code {
    public GanttView SelectedView { get; set; } = GanttView.Week;

    List<FlatModel> Data { get; set; }

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

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
                {
                    Id = LastId,
                    Title = "Task  " + i.ToString(),
                    Start = new DateTime(2021, 7, 5 + i),
                    End = new DateTime(2021, 7, 11 + i),
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
                        Title = "    Task " + i + " : " + j.ToString(),
                        Start = new DateTime(2021, 7, 5 + j),
                        End = new DateTime(2021, 7, 6 + i + j),
                        PercentComplete = Math.Round(random.NextDouble(), 2)
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

## See Also

  * [Gantt Filtering Overview](slug:gantt-filtering-overview)
  * [Live Demo: Gantt Filter Row](https://demos.telerik.com/blazor-ui/gantt/filter-row)