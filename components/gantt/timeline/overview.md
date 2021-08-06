---
title: Overview
page_title: Gantt Chart - Timeline
description: Overview of the Timeline for the Gantt Chart for Blazor.
slug: gantt-timeline
tags: telerik,blazor,gantt,chart,timeline
published: True
position: 0
---

# Timeline

The Timeline of the Gantt component provides visual representation of the Gantt records in a timeline view. It is configured similarly to a Scheduler Timeline view, where the horizontal dimension is divided into time slots.

The Timeline exposes four predefined [views]({%slug gantt-timeline-views%}), which dictate how much time a single time slot represents. It also includes two rows of hierarchical slot headers, which show the time divisions

It is rendered in the right pane of the Gantt component and allows you to interact with the tasks. You can invoke [editing]({%slug gantt-timeline-editing%}) of a task by double click on it. You can drag it to change the time slot in which it will be displayed. You can resize it or delete it.

You can control the rendering of the tasks and their ToolTip in the Timeline through the [Templates]({%slug gantt-timeline-templates%}) the Gantt exposes. The [`TaskTemplate`]({%slug gantt-task-template%}) will allow to customize the tasks content and the [`ToolTipTemplate`]({%slug gantt-tooltip-template%}) - the rendering of the ToolTip.

>Simple Gantt with Timeline. The result from the snippet below.

````CSHTML
@*Simple Gantt component *@

<TelerikGantt Data="@Data"
              @bind-View="@SelectedView"
              Width="1000px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="End"
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

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
````


## See Also

* [Live Demos: Gantt](https://demos.telerik.com/blazor-ui/gantt/overview)