---
title: Access Model Fields in the Gantt Timeline Tooltip
description: How to access and display fields from the model in the Tooltip of the Gantt Timeline?
type: how-to
page_title: How to Display Model Fields in the Gantt Tooltip?
slug: gantt-kb-tooltip-access-model-fields
tags: gantt, blazor, tooltip, tooltiptemplate, model, fields
res_type: kb
ticketid: 1653280
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

I want to access and display model fields in the Gantt Timeline Tooltip. In the [`TooltipTemplate`]({%slug gantt-tooltip-template%}) I can access some of the model fields, which [match the properties of a Gantt Tree item]({%slug gantt-data-binding-overview%}#data-bindings). But how to access and show all model fields?

## Solution

The `TooltipTemplate` context .... . If you want to accsess and dispaly the other fields form you model, you have two options:

* [Get the Model from Your Data Based on the Context Properties](#get-the-model-from-your-data-based-on-the-context-properties)
* [Use a custom Tooltip](#use-a-custom-tooltip)


### Get the Model from Your Data Based on the Context Properties

This solution relies on finding the task item in your data based on the properties that the `TooltipTemplateContext` provides. The approach is applicable only if all items in your data have unique values for these properties and the application that hosts the Gantt is not a multi-language one.

1. Cast the [`TooltipTemplate`]({%slug gantt-tooltip-template%}) `context` to `TooltipTemplateContext`.
2. Use the [available properties of the `TooltipTemplateContext`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TooltipTemplateContext) to find the data item in the Gantt data collection. The example below uses the `Title` property.
3. Display the desired fields of the model instance in the `TooltipTemplate`.

>caption Use a custom Tooltip component

````CSHTML
<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <TooltipTemplate>
        @{
            FlatModel model = GetModel(((TooltipTemplateContext)context).Title);
        }
        @model.CustomField
        <br/>
        @model.SomeIntField
    </TooltipTemplate>
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="60px"
                     DisplayFormat="{0:P}">
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

    private FlatModel GetModel(string title)
    {
        return Data.FirstOrDefault(x => x.Title == title);
    }

    public class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string CustomField { get; set; }
        public int SomeIntField {get; set;}
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
                    PercentComplete = Math.Round(random.NextDouble(), 2),
                    CustomField = "Details for task " + i, 
                    SomeIntField = i
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
                        CustomField = "Details for task " + i,
                        SomeIntField = j
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

### Use a Custom Tooltip

This solution relies on disabling the built-in Tooltip and adding a custom one, so you have full control over its rendering and content.

1. Disable the built-in Tooltip - set the `ShowTooltip` parameter to `false`.
1. Use [`TaskTemplate`]({%slug gantt-task-template%}) to add a unique `id` to the task.
1. Add a [TelerikTooltip]({%slug tooltip-overview%}) in the `TaskTemplate`.
1. Set the Tooltip's [`TargetSelector`]({%slug tooltip-overview%}#tooltip-parameters) to point to the task wrapper unique `id`.
1. Access the model from the `context` of the `TaskTemplate` and get the needed properties to display in the Tooltip.

>caption Use a custom Tooltip component

````CSHTML
<TelerikGantt Data="@Data"
              Width="900px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              ShowTooltip="false">
    <TaskTemplate Context="taskContext">
        <div id="@($"id-{taskContext.Id.ToString()}")">
            <div class="task-title">@taskContext.Title</div>
            <div class="k-task-complete" style="width:@(taskContext.PercentComplete * 100)%; z-index: -1;"></div>
        </div>
        <TelerikTooltip TargetSelector="@($"#id-{taskContext.Id.ToString()}")" >
            <Template>
                @{
                    @taskContext.CustomField
                    <br />
                    @taskContext.SomeIntField
                }
            </Template>
        </TelerikTooltip>
    </TaskTemplate>
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="60px"
                     DisplayFormat="{0:P}">
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

    public class FlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string CustomField { get; set; }
        public int SomeIntField { get; set; }
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
                    PercentComplete = Math.Round(random.NextDouble(), 2),
                    CustomField = "Details for task " + i,
                    SomeIntField = i
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
                        CustomField = "Details for task " + i,
                        SomeIntField = j
                    });

                LastId++;
            }
        }

        base.OnInitialized();
    }
}
````

## See Also

- [Gantt Overview - Telerik UI for Blazor]({%slug gantt-overview%})
- <a href="https://demos.telerik.com/blazor-ui/gantt/templates" target="_blank">Live Demo: Gantt Templates</a>