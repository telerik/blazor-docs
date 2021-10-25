---
title: Command Column
page_title: Gantt Tree - Command Column
description: Command buttons per row in treelist for Blazor.
slug: gantt-columns-command
tags: telerik,blazor,gantt,column,command
published: True
position: 1
---

# Gantt Tree Command Column

The command column of a Gantt Tree allows you to initiate [editing]({%slug gantt-tree-editing%}), or to execute your own commands.

To define it, add a `GanttCommandColumn` in the `GanttColumns` collection of a Gantt Chart. The command column takes a collection of `GanttCommandButton` instances that invoke the commands.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

In this article:

* [Gantt Tree Command Column Features](#features)
   * [GanttCommandButton](#the-ganttcommandbutton-tag)
   * [Built-in Commands](#built-in-commands)
   * [OnClick Handler](#onclick-handler)
   * [Context](#context)
* [Code Example](#example)


## Features

This section describes the available features and their use.

### The GanttCommandButton Tag

The `GanttCommandButton` tag offers the following features:

* `Command` - the command that will be invoked. Can be one of the built-in commands (see below), or a custom command name.
* `ShowInEdit` - a `boolean` property indicating whether the button is only visible while the user is editing/inserting data.
* `ChildContent` - the text the button will render. You can also place it between the command button's opening and closing tags.
* Appearance properties like `Icon`, `Class`, `Enabled` that are come from the underlying [Button Component features]({%slug components/button/overview%}).

### Built-in Commands

There are two built-in commands:

* `Add` - initiates the creation of a new item. Can apply to rows as well, to create a child element for the current row.
* `Delete` - initiates the deletion of an existing item.

### OnClick handler

The `OnClick` handler of the commands receives an argument of type `GanttTaskCommandEventArgs` that exposes the following properties:

* `IsCancelled` - set this to `true` to prevent the operation if the business logic requires it.
* `Item` - the model item of the Gantt row. You can use it to access the model fields and perform the actual data source operations. Applicable for buttons in a row, not in a toolbar.
* `IsNew` - a boolean field indicating whether the item was just added through the Gantt interface.

>tip For handling CRUD operations we recommend that you use the Gantt events (`OnEdit`, `OnUpdate`, `OnCancel`, `OnCreate`). The `OnClick` handler is available for the built-in commands to provide consistency of the API.

### Context

The command column provides access to the data item via `context`. This may be useful for conditional statements or passing parameters to custom business logic.

Use a **named** context variable to avoid errors when nesting components or `RenderFragment`s in general. In such cases, the exception will be similar to ["Child content element ... uses the same parameter name ('context') as enclosing child content element ..."]({%slug nest-renderfragment%}).

````CSHTML
        <GanttCommandColumn Context="currTask">
            @{
                var task = currTask as FlatModel;

                if (task.ParentId != null)
                {
                    <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
                }
                else
                {
                    <span>Cannot delete main tasks</span>
                }
            }            
        </GanttCommandColumn>
````

## Example

The following code example demonstrates declarations and handling.

>tip The event handlers use `EventCallback` and can be synchronous or async. This example shows async versions, and the signature for the synchronous handlers is `void MyHandlerName(GanttTaskCommandEventArgs args)`.

>caption Example of handling built-in and custom commands in the Gantt component

````CSHTML
@* This sample showcases:
    - using the built-in Add and Delete commands
    - a custom command for a row
*@

<TelerikGantt Data="@Data"
              @bind-View="@SelectedView"
              Width="1000px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnCreate="@CreateItem"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
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
        <GanttCommandColumn>
            <GanttCommandButton OnClick="@((args) => GetTaskDetails(args))" Icon="info-circle
"></GanttCommandButton>
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
        </GanttCommandColumn>
    </GanttColumns>
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
    </GanttViews>
</TelerikGantt>

@code {
    public GanttView SelectedView { get; set; } = GanttView.Week;

    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    public async Task GetTaskDetails(GanttTaskCommandEventArgs args)
    {
        var currTask = args.Item as FlatModel;

        await Dialogs.AlertAsync(
            $"Completed: {currTask.PercentComplete}%",
            $"Summary for {currTask.Title}"
            );
    }
    private async Task CreateItem(GanttCreateEventArgs args)
    {
        var argsItem = args.Item as FlatModel;

        argsItem.Id = LastId++;

        if (args.ParentItem != null)
        {
            var parent = (FlatModel)args.ParentItem;

            argsItem.ParentId = parent.Id;
        }

        Data.Insert(0, argsItem);

        CalculateParentPercentRecursive(argsItem);
        CalculateParentRangeRecursive(argsItem);
    }

    private async Task UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            var startOffset = item.Start - foundItem.Start;
            if (startOffset != TimeSpan.Zero)
            {
                MoveChildrenRecursive(foundItem, startOffset);
            }

            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }

        CalculateParentPercentRecursive(foundItem);
        CalculateParentRangeRecursive(foundItem);
    }

    private async Task DeleteItem(GanttDeleteEventArgs args)
    {
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);

        CalculateParentPercentRecursive(item);
        CalculateParentRangeRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GetChildren(item).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }

    private void CalculateParentPercentRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.PercentComplete = children.Average(i => i.PercentComplete);

                CalculateParentPercentRecursive(parent);
            }
        }
    }

    private void CalculateParentRangeRecursive(FlatModel item)
    {
        if (item.ParentId != null)
        {
            var parent = GetParent(item);

            var children = GetChildren(parent);

            if (children.Any())
            {
                parent.Start = children.Min(i => i.Start);
                parent.End = children.Max(i => i.End);

                CalculateParentRangeRecursive(parent);
            }
        }
    }

    private void MoveChildrenRecursive(FlatModel item, TimeSpan offset)
    {
        var children = GetChildren(item);

        foreach (var child in children)
        {
            child.Start = child.Start.Add(offset);
            child.End = child.End.Add(offset);

            MoveChildrenRecursive(child, offset);
        }
    }

    private FlatModel GetParent(FlatModel item)
    {
        return Data.FirstOrDefault(i => i.Id.Equals(item.ParentId));
    }

    private IEnumerable<FlatModel> GetChildren(FlatModel item)
    {
        return Data.Where(i => item.Id.Equals(i.ParentId));
    }

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
                Title = "Task  " + i.ToString(),
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
                    Title = "    Task " + i + " : " + j.ToString(),
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

  * [Live Demo: TreeList Command Column](https://demos.telerik.com/blazor-ui/treelist/inlineediting)
