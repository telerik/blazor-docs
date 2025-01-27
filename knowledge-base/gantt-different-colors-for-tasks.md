---
title: Set Different Colors for the Gantt Tasks
description: How to set different colors for the Gantt tasks?
type: how-to
page_title: Set Different Colors for the Gantt Tasks
slug: gantt-kb-different-colors-for-tasks
position: 
tags: 
ticketid: 1536209
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Gantt for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to set different colors for the Gantt tasks. I store the colors in my data source. How to apply the colors from my data source to the rendered Gantt tasks?


## Solution

Follow these steps to apply the desired colors to the Gantt tasks:

1. Use a [Task Template](slug://gantt-task-template) to override the default task rendering.
1. In the template, declare a wrapping element that will contain all the task details. Specify the desired task information inside.
1. Add an attribute `style="background-color"` to the wrapper and set the desired color. If your model has a color field that you want to use, you may get its value from the template's `context`.
1. Use custom CSS to remove the default padding of the task template element (`<div class="k-task-template">`) and adjust the custom wrapper, so it covers the whole task element. This ensures that the background color covers the whole task.

>caption Set Different Colors for the Gantt Tasks

````RAZOR
<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              RowHeight="60"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <TaskTemplate>
        @{
            CurrTask = context;
        }
        <div class="wrapper" style="background-color:@CurrTask.Color">
            <div class="task-title">@CurrTask.Title</div>
            <div class="task-assignee">Assignee: @CurrTask.Assignee</div>
            <div class="progress" style="width:@(CurrTask.PercentComplete * 100)%"></div>
        </div>
    </TaskTemplate>
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
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
        <GanttWeekView></GanttWeekView>
    </GanttViews>
</TelerikGantt>

@code {
    private List<FlatModel> Data { get; set; }

    private FlatModel CurrTask { get; set; } = new FlatModel();    

    private int LastId { get; set; } = 1;

    private List<string> Colors = new List<string>()
    {
        "lightgreen",
        "orange",
        "lightblue",
        "cyan",
        "lightcoral",
        "lightpink"
    };

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
                    PercentComplete = Math.Round(random.NextDouble(), 2),
                    Color = Colors[i]
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
                        PercentComplete = Math.Round(random.NextDouble(), 2),
                        Assignee = "    Employee " + j,
                        Color = Colors[j]
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

    class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Assignee { get; set; }
        public string Color { get; set; }
    }
}

<style>
    .k-task-single {
        background-color: none;
    }

    .k-task-actions {
        position: absolute;
        right: 0;
        top: 14px;
    }

    .k-task-template {
        padding: 0px;
    }

    .k-task-content {
        display: block;
    }

    .wrapper {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;
        border-radius: 4px
    }

    .task-title {
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px solid;
    }

    .task-assignee {
        font-style: italic;
    }

    .progress {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        background: rgba(252, 98, 87, .7);
    }
</style>
````

## See Also

* [Gantt Task Overview](slug://gantt-overview)
* [Gantt Task Template](slug://gantt-task-template)
* [Live Demos: Gantt](https://demos.telerik.com/blazor-ui/gantt/overview)
* [Gantt API Reference](slug://Telerik.Blazor.Components.TelerikGantt-1)
