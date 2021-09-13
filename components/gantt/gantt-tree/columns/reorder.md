---
title: Reorder
page_title: Gantt Tree - Reorder Columns
description: Drag to reorder columns in the Gantt Tree for Blazor.
slug: gantt-columns-reorder
tags: telerik,blazor,gantt,column,reorder,drag
published: True
position: 2
---

# Reorder Columns

The Gantt Tree lets the user reorder columns by dragging their headers.

To enable column reordering, set the `Reorderable` parameter of the respective `GanttColumn` to `true`.

To prevent the user from moving a certain column, set its own parameter `Reorderable="false"`. Note that the user can still re-arrange other columns around it.

>caption Enable column reordering in Telerik Gantt

````CSHTML
@* Drag a column header between other columns to change the columns positions. *@

<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Reorderable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Reorderable="true"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="End"
                     Reorderable="true"
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


## See Also

  * [Live Demo: Column Reordering](https://demos.telerik.com/blazor-ui/gantt/column-reordering)
