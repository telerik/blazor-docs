---
title: Filter Row
page_title: Gantt - Filter Row
description: Enable and configure Filter Row in Gantt for Blazor.
slug: gantt-filter-row
tags: telerik,blazor,gantt,filtering,filter,row
published: True
position: 5
---

# Gantt Filter Row

One of the filter modes of the Gantt Chart is a row of filter that renders below the column headers.

To enable the filter row set the `FilterMode` property of the Gantt Chart to `Telerik.Blazor.GanttFilterMode.FilterRow`.

The Gantt Chart will render a row below the column headers in the Gantt Tree with UI that you can use to fill in the filter criteria. You can type in the input to execute the default operator as you type, or click a button to choose a different filter operator (like "contains", "greater than" and so on). Filters are applied as the user types in the inputs.

Once a filter is a applied to a column, a button will appear that lets you clear that filter.

>caption Filter Row in Telerik Gantt

````CSHTML
@* Filter row mode *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              FilterMode="@GanttFilterMode.FilterRow"
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
