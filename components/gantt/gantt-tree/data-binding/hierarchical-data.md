---
title: Hierarchical Data
page_title: Gantt Tree - Data Binding to Hierarchical Data
description: Data Binding the Gatt Chart for Blazor to hierarchical data.
slug: gantt-data-binding-hierarchical-data
tags: telerik,blazor,gantt,data,bind,databind,databinding,hierarchical
published: True
position: 5
---

# Gantt Data Binding to Hierarchical Data

This article explains how to bind the Gantt Chart for Blazor to hierarchical data. 


Hierarchical data means that the collection of child items is provided in a field of its parent's model. By default, this is the `Items` field, and hierarchical data binding is the default mode of the Gantt Tree. This approach of providing items lets you gather separate collections of data that may even come from different sources.

If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

>caption Example of hierarchical data binding

````CSHTML
@* Hierarchical data items hold collections of the child items *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              ItemsField="Items"
              OnCreate="@CreateItem"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu">
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
        <GanttCommandColumn>
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
        </GanttCommandColumn>
        <GanttColumn Field="Id"
                     Visible="false">
        </GanttColumn>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Width="100px">
        </GanttColumn>
        <GanttColumn Field="Start"
                     Width="200px"
                     TextAlign="@ColumnTextAlign.Right">
        </GanttColumn>
        <GanttColumn Field="End"
                     DisplayFormat="End: {0:d}"
                     Width="200px">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    class HierarchicalModel
    {
        public int Id { get; set; }
        public List<HierarchicalModel> Items { get; set; }
        public HierarchicalModel Parent { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    public int LastId { get; set; } = 1;

    List<HierarchicalModel> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = new List<HierarchicalModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new HierarchicalModel()
            {
                Id = LastId,
                Items = new List<HierarchicalModel>(),
                Title = "Employee  " + i.ToString(),
                Start = new DateTime(2020, 12, 6 + i),
                End = new DateTime(2020, 12, 11 + i),
                PercentComplete = i * 0.125
            };

            Data.Add(newItem);
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                newItem.Items.Add(new HierarchicalModel()
                {
                    Id = LastId,
                    Title = "    Employee " + i + " : " + j.ToString(),
                    Start = new DateTime(2020, 12, 6 + i + j),
                    End = new DateTime(2020, 12, 7 + i + j),
                    PercentComplete = j * 0.225,
                    Parent = newItem
                });

                LastId++;
            }
        }
    }

    private void CreateItem(GanttCreateEventArgs args)
    {
        var argsItem = args.Item as HierarchicalModel;

        argsItem.Id = LastId++;

        if (args.ParentItem != null)
        {
            var parent = (HierarchicalModel)args.ParentItem;

            if (parent.Items == null)
            {
                parent.Items = new List<HierarchicalModel>();
            }

            parent.Items.Add(argsItem);

            argsItem.Parent = parent;

            CalculateParentPercentRecursive(parent);
            CalculateParentRangeRecursive(parent);
        }
        else
        {
            Data.Insert(0, argsItem);
        }
    }

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as HierarchicalModel;

        var foundItem = FindItemRecursive(Data, item.Id);

        if (foundItem != null)
        {
            var startOffset = item.Start - foundItem.Start;
            if (startOffset != TimeSpan.Zero && foundItem.Items != null)
            {
                MoveChildrenRecursive(foundItem, startOffset);
            }

            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;

            if (foundItem.Parent != null)
            {
                CalculateParentPercentRecursive(foundItem.Parent);
                CalculateParentRangeRecursive(foundItem.Parent);
            }
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = FindItemRecursive(Data, (args.Item as HierarchicalModel).Id);

        if (item.Parent != null)
        {
            item.Parent.Items.Remove(item);

            CalculateParentPercentRecursive(item.Parent);
            CalculateParentRangeRecursive(item.Parent);
        }
        else
        {
            Data.Remove(item);
        }
    }

    private void CalculateParentPercentRecursive(HierarchicalModel item)
    {
        if (item.Items != null && item.Items.Any())
        {
            item.PercentComplete = item.Items.Average(i => i.PercentComplete);

            if (item.Parent != null)
            {
                CalculateParentPercentRecursive(item.Parent);
            }
        }
    }

    private void CalculateParentRangeRecursive(HierarchicalModel item)
    {
        if (item.Items != null && item.Items.Any())
        {
            item.Start = item.Items.Min(i => i.Start);
            item.End = item.Items.Max(i => i.End);

            if (item.Parent != null)
            {
                CalculateParentRangeRecursive(item.Parent);
            }
        }
    }

    private void MoveChildrenRecursive(HierarchicalModel parent, TimeSpan offset)
    {
        foreach (var item in parent.Items)
        {
            item.Start = item.Start.Add(offset);
            item.End = item.End.Add(offset);

            if (item.Items != null)
            {
                MoveChildrenRecursive(item, offset);
            }
        }
    }

    private HierarchicalModel FindItemRecursive(List<HierarchicalModel> items, int id)
    {
        foreach (var item in items)
        {
            if (item.Id.Equals(id))
            {
                return item;
            }

            if (item.Items?.Count > 0)
            {
                var childItem = FindItemRecursive(item.Items, id);

                if (childItem != null)
                {
                    return childItem;
                }
            }
        }

        return null;
    }
}
````


## See Also

  * [Gantt Data Binding Basics]({%slug gantt-data-binding-overview%})
  * [Binding to Flat Data]({%slug gantt-data-binding-flat-data%})

