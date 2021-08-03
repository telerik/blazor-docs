---
title: Editing
page_title: Gantt Tree - Editing
description: Edit tasks in the Gantt Tree.
slug: gantt-tree-editing
tags: telerik,blazor,gantt,tree,editing,overview
published: True
position: 0
---

# Edit Tasks

The Gantt Tree allows you to edit the tasks. This article will explain how to enable and use it.

Sections in this article:

* [Basics](#basics)
* [Example](#example)
* [Notes](#notes)

## Basics

This section explains the available events and command buttons that you need to use for editing records in a Gantt Tree. After that, you will find a code example. By default the Gantt Chart will enable the user to edit a record by double clicking on the respective node.

List of the available events:

* `OnCreate` - fires when the `Save` [command button]({%slug gantt-columns-command%}) button for a newly added item is clicked. The event handler receives an argument of type `GanttCreateEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.

    * `ParentItem` - an object you can cast to your model class to obtain the parent of current data item. Will be `null` if the current item is at the root level.

* `OnUpdate` - fires when the `Save` command button is clicked on an existing item. The model reference is a copy of the original data source item. The event handler receives an argument of type `GanttUpdateEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.

    * `ParentItem` - an object you can cast to your model class to obtain the parent of current data item. Will be `null` if the current item is at the root level.

* `OnDelete` - fires when the `Delete` command button is clicked. The event handler receives an argument of type `GanttDeleteEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.


## Example

The example below shows how you can handle the events the Gantt component exposes, so you can Create, Update or Delete records in your data source and the view model.

>tip The Gantt CUD events use `EventCallback` and can be synchronous or asynchronous. The example below shows async versions, and the signature for synchronous events is `void <MethodName>(TreeListCommandEventArgs args)`.

>caption Handling the CRUD events of the Gantt to save data to the actual data source

````CSHTML
@* Sample CUD operations in the Gantt chart *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              OnCreate="@CreateItem">
    <GanttToolBar>
        <GanttCommandButton Command="Add" Icon="add">Add</GanttCommandButton>
    </GanttToolBar>
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
        <GanttCommandColumn>
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
        </GanttCommandColumn>
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
}
````

## Notes

There are a few considerations to keep in mind with the CUD operations of the treelist. They are explained in the following list:

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

* The CRUD event handlers must be `async Task` and **not** `async void`. A Task can be properly awaited and allows working with services and contexts, and lets the treelist update after the actual data source operations complete.

    * When the method returns `void`, the execution of the context operations is not actually awaited, and you may get errors from the context (such as "Cannot access a disposed object. A common cause of this error is disposing a context that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application" or "A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext"). The treelist may also re-render before the actual data update happens and you may not see the result.

* The Gantt uses `Activator.CreateInstance<TItem>();` to generate a new item when an Insert or Edit action is invoked, so the Model should have a parameterless constructor defined.

* While editing, the Gantt creates a **copy of your original object** which has a **different reference**. You receive that copy in the `OnUpdate` event handler.


## See Also

  * [Live Demo: TreeList Inline Editing](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
  * [Live Demo: TreeList PopUp Editing](https://demos.telerik.com/blazor-ui/treelist/editing-popup)
  * [Live Demo: TreeList InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)
  * [Live Demo: TreeList Custom Editor Template](https://demos.telerik.com/blazor-ui/treelist/custom-editor)
  * [Live Demo: TreeList Custom Edit Form](https://demos.telerik.com/blazor-ui/treelist/editing-custom-form)
