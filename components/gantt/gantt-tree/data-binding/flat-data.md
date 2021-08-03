---
title: Flat Data
page_title: Gantt Tree - Data Binding to Flat Data
description: Data Binding the Gantt Tree for Blazor to flat data.
slug: gantt-data-binding-flat-data
tags: telerik,blazor,gantt,data,bind,databind,databinding,flat
published: True
position: 2
---

# Gantt Tree Data Binding to Flat Data

This article explains how to bind the treelist for Blazor to flat data. 
@[template](/_contentTemplates/treelist/databinding.md#link-to-basics)


Flat data means that the entire collection of gantt items is available at one level, for example `List<MyGanttItemModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the Gantt tree renders anything.

If there are child items for a certain node (items whose `ParentId` points to the current item's `Id`), it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for flat data binding.

>caption Example of flat data in a Gantt Tree - you need to point the TreeList to the Id and ParentId fields in your model

````CSHTML
@* Using self-referencing flat data. In this model, the field names match the defaults, but they are set to showcase the concept. *@

<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              HasChildrenField=""
              IdField="Id"
              ParentIdField="ParentId">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttColumn Field="@nameof(FlatModel.Id)">
        </GanttColumn>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="End"
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

  * [TreeList Data Binding Basics]({%slug gantt-data-binding-overview%})
  * [Binding to Hierarchical Data]({%slug gantt-data-binding-hierarchical-data%})

