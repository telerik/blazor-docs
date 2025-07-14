---
title: Overview
page_title: Gantt Tree - Editing Overview
description: Edit tasks in the Gantt Tree.
slug: gantt-tree-editing
tags: telerik,blazor,gantt,tree,editing,overview
published: True
position: 5
---

# Edit Tasks

The Blazor Gantt supports CRUD operations and validation. Use the CRUD events to transfer the changes to the underlying data source (for example, call a service to update the database, and not only with the view data).

The Gantt Tree has by default the InCell editing enable. 

This page explains how to use the relevant events and command buttons. There is also a runnable code example.


Sections in this article:

* [Basics](#basics)
* [Events](#events)
* [Example](#example)
* [Notes](#notes)

## Basics

The Gantt Tree offers several editing modes with different user experience. Set the `TreeListEditMode` property to a member of the `GanttTreeListEditMode` enum:

* `None` - The built-in [`Add` and `Edit` commands](slug:gantt-columns-command#built-in-commands) don't work in this mode.
* `Incell` - the default `TreeListEditMode` value. [Edit a single cell](slug:gant-tree-incell-editing) by clicking on it or tabbing
* `Inline` - [edit a row](slug:gant-tree-inline-editing) by clicking on an [Edit command button](slug:gantt-columns-command)
* `Popup` - [edit a row in a popup form](slug:gant-tree-popup-editing) by clicking on an Edit button


## Events

* `OnCreate` - fires when the `Save` [command button](slug:gantt-columns-command) button for a newly added item is clicked. The event handler receives an argument of type `GanttCreateEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.

    * `ParentItem` - an object you can cast to your model class to obtain the parent of current data item. Will be `null` if the current item is at the root level.

* `OnUpdate` - fires when the `Save` command button is clicked on an existing item. The model reference is a copy of the original data source item. The event handler receives an argument of type `GanttUpdateEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.

    * `ParentItem` - an object you can cast to your model class to obtain the parent of current data item. Will be `null` if the current item is at the root level.

* `OnDelete` - fires when the `Delete` command button is clicked. The event handler receives an argument of type `GanttDeleteEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.
    
    
## Customize The Editor Fields

You can customize the editors rendered in the Gantt Tree by providing the `EditorType` attribute, exposed on the `<GanttColumn>`. The `EditorType` attribute accepts a member of the `GanttTreeListEditorType` enum:

| Field data type | GanttTreeListEditorType enum members              |
|-----------------|------------------------------------------|
| **Text**            | `GanttTreeListEditorType.TextArea`<br> `GanttTreeListEditorType.TextBox` |
| **Boolean**         | `GanttTreeListEditorType.CheckBox`<br> `GanttTreeListEditorType.Switch` |
| **DateTime**        | `GanttTreeListEditorType.DatePicker`<br> `GanttTreeEditorType.DateTimePicker`<br> `GanttTreeListEditorType.TimePicker` |


````RAZOR
@* The usage of the EditorType parameter *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              OnCreate="@CreateItem">
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
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
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Width="60px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="100px"
                     EditorType="@GanttTreeListEditorType.DateTimePicker"
                     TextAlign="@ColumnTextAlign.Right">
        </GanttColumn>
        <GanttColumn Field="End"
                     DisplayFormat="End: {0:d}"
                     Width="100px">
        </GanttColumn>
        <GanttCommandColumn>
            <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@SvgIcon.Trash"></GanttCommandButton>
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

* `OnEdit` - fires when the user is about to enter edit mode on an existing item(Cancellable). The event handler receives an argument of type `GanttEditEventArgs` that exposes the following fields:

    * `Item` - an object you can cast to your model class to obtain the current data item.
    
    * `IsCanceled`- a boolean field indicating whether the operation is to be prevented.

## New Row Position

You can control whether a newly added item appears at the top or bottom of the Gantt Tree. Use the [`NewRowPosition`](https://www.telerik.com/blazor-ui/documentation/api/telerik.blazor.gantttreelistnewrowposition) parameter to specify the position. This parameter does not affect Popup edit mode, which always displays a dialog for new items.

This configuration is available in InCell and Inline edit modes. For more details, see the [Tree InCell Editing](slug:gant-tree-incell-editing#new-row-position) and [Tree Inline Editing](slug:gant-tree-inline-editing#new-row-position) articles.

> When you set `NewRowPosition` to `Bottom`, add the new item at the end of your data collection in the `OnCreate` event handler. When set to `Top`, insert the new item at the beginning of the collection. This ensures the new row appears in the correct position in the view after successfully creating the new record.

>caption Example of adding a new item to the Gantt based on the `NewRowPosition` value

<div class="skip-repl"></div>
````C#
private void OnCreate(GanttCreateEventArgs args)
{
    if (NewRowPosition == GanttTreeListNewRowPosition.Bottom)
    {
        dataCollection.Add(newItem);
    }
    else // Top
    {
        dataCollection.Insert(0, newItem);
    }
}    
````

## Example

The example below shows how you can handle the events the Gantt component exposes, so you can Create, Update or Delete records in your data source and the view model.

>tip The Gantt CUD events use `EventCallback` and can be synchronous or asynchronous. The example below shows async versions, and the signature for synchronous events is `void <MethodName>(TreeListCommandEventArgs args)`.

>caption Handling the CRUD events of the Gantt to save data to the actual data source

````RAZOR
@* Sample CUD operations in the Gantt chart *@

<TelerikGantt Data="@Data"
              Width="1200px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListEditMode="@GanttTreeListEditMode.Incell"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              OnCreate="@CreateItem"
              OnEdit="@OnEditItem">
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
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
            <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@SvgIcon.Trash"></GanttCommandButton>
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

    private async Task OnEditItem(GanttEditEventArgs args)
    {
        var item = args.Item as FlatModel;

        //prevent opening for edit based on condition
        if(item.Id < 7)
        {
            args.IsCancelled = true;
        }
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

* Double clicking on a task within the Timeline part of the component will always trigger Popup edit of the said task, even if edit mode is set to Inline or Incell.

## See Also

  * [Live Demo: Gantt Inline Editing](https://demos.telerik.com/blazor-ui/treelist/editing-inline)
  * [Live Demo: Gantt Popup Editing](https://demos.telerik.com/blazor-ui/treelist/editing-popup)
  * [Live Demo: Gantt InCell Editing](https://demos.telerik.com/blazor-ui/treelist/editing-incell)