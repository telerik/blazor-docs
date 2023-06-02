---
title: Popup Editing
page_title: Gantt Tree - Popup Editing
description: Popup editing of data in Gantt Tree for Blazor.
slug: gant-tree-popup-editing
tags: telerik,blazor,gantt,popup,editing
published: True
position: 15
---

# Gantt Tree Popup Editing

In this article:

* [Basics](#basics)
* [Customization](#customization)

## Basics

Popup editing lets the user click an [Edit command button]({%slug components/grid/columns/command%}) on the row, and a popup shows up with the editable fields associated with a Gantt Task. They can then click the `Save` button in the dialog to submit the changes to the model. This fires the `OnUpdate` event where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service).

In a similar fashion, the `Cancel`, `Delete` command buttons and the `Add` toolbar button fire events to let you handle the data source operations.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Popup editing in the Gantt Tree, set its `TreeListEditMode` property to `GanttTreeListEditMode.Popup`, then handle the CRUD events as shown in the example below.


>caption The Command buttons and the Gantt events let you handle data operations in Popup edit mode.

````CSHTML
<TelerikGantt Data="@Data"
              Width="1200px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              TreeListEditMode="@GanttTreeListEditMode.Popup"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              OnCreate="@CreateItem">
    <GanttViews>
        <GanttDayView></GanttDayView>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttColumns>
        <GanttCommandColumn Width="110px">
            <GanttCommandButton Command="Add" Icon="@FontIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Edit" Icon="@FontIcon.Pencil"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@FontIcon.Trash"></GanttCommandButton>
        </GanttCommandColumn>
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

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## Customization

The Gantt exposes options to customize the edit popup and its form. You can define your desired configuration in the `GanttPopupEditSettings` and `GanttPopupEditFormSettings` tags under the `GanttSettings` tag.

### Popup Customization

The `GanttPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

### Edit Form Customization

The `GanttPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

Parameter | Type | Description
---------|----------|---------
 `Columns` | `int` | The count of the columns
 `ColumnSpacing` | `int` | The column spacing 
 `Orientation` | `FormOrientation` <br/> (`Vertical`) | The orientation of the form. Takes a member of the `FormOrientation` enum: <br/> - `Horizontal` <br/> - `Vertical`

>caption Customize the popup edit form

````CSHTML
@*The snippet focuses on the popup edit form customization. CRUD events are not handled for brevity*@

<TelerikGantt Data="@Data"
              @bind-View="@SelectedView"
              TreeListEditMode="@GanttTreeListEditMode.Popup"
              Width="1000px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId">
    <GanttSettings>
        <GanttPopupEditSettings Width="700px"
                                MinWidth="650px"
                                MaxHeight="300px"
                                Class="custom-popup">
        </GanttPopupEditSettings>
        <GanttPopupEditFormSettings Orientation="@FormOrientation.Horizontal"
                                    Columns="2"
                                    ColumnSpacing="50px">
        </GanttPopupEditFormSettings>
    </GanttSettings>
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@FontIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
    <GanttColumns>
        <GanttCommandColumn Width="110px">
            <GanttCommandButton Command="Add" Icon="@FontIcon.Plus"></GanttCommandButton>
            <GanttCommandButton Command="Edit" Icon="@FontIcon.Pencil"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="@FontIcon.Trash"></GanttCommandButton>
        </GanttCommandColumn>
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
}
````

## See Also

  * [Live Demo: Gantt Popup Editing](https://demos.telerik.com/blazor-ui/gantt/editing-popup)
   
