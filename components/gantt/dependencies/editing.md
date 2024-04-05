---
title: Editing
page_title: Gantt Dependencies - Editing
description: Create and Delete Dependencies.
slug: gantt-dependencies-editing
tags: telerik,blazor,gantt,chart,dependency,edit,editing,dependencies
published: True
position: 15
---

# Dependencies Editing

The Gantt Chart component allows you delete its dependencies and create new ones. It exposes dedicated events for dependency editing that you can use to transfer the changes to the underlying data source.

Sections in this article:

* [Basics](#basics)

* [Example](#example)

## Basics

This section explains the available events that you need to use for creating and deleting the Gantt dependencies. After that, you will find a code example.

List of the available events:

* `OnCreate` - fires when the users drag the dependency handle of a task from one end-point to another and thus create a new dependency. It provides a `GanttDependencyCreateEventArgs` object that contains the currently created dependency.


* `OnDelete` - fires when the users deletes a dependency. To delete a dependency the user should select it using the mouse and press the `Delete` keyboard button. It provides a `GanttDependencyDeleteEventArgs` object that contains the currently deleted dependency in the `Item` field that you can cast to your model.

## Example

````CSHTML
@* Drag the dependency handle of a task to a new end-point to fire the Oncreate event. Delete a dependency to fire the OnDelete event *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu">
    <GanttToolBarTemplate>
        <GanttCommandButton Command="Add" Icon="@SvgIcon.Plus">Add</GanttCommandButton>
    </GanttToolBarTemplate>
    <GanttViews>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttDependenciesSettings>
        <GanttDependencies Data="@Dependencies"
                           PredecessorIdField="PredecessorId"
                           SuccessorIdField="SuccessorId"
                           TypeField="Type"
                           OnCreate="@CreateDependency"
                           OnDelete="@DeleteDependency">
        </GanttDependencies>
    </GanttDependenciesSettings>
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
                     Width="100px">
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

    private void CreateDependency(GanttDependencyCreateEventArgs args)
    {
        var dependency = new DependencyModel()
        {
            Id = LastDependencyId++,
            PredecessorId = (int)args.PredecessorId,
            SuccessorId = (int)args.SuccessorId,
            Type = args.Type
        };

        Dependencies.Add(dependency);
    }

    private void DeleteDependency(GanttDependencyDeleteEventArgs args)
    {
        Dependencies.RemoveAll(d => d.Id.Equals((args.Item as DependencyModel).Id));
    }

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

    class DependencyModel
    {
        public int Id { get; set; }
        public int PredecessorId { get; set; }
        public int SuccessorId { get; set; }
        public int Type { get; set; }
    }

    public int LastId { get; set; } = 1;
    public int LastDependencyId { get; set; } = 1;
    List<FlatModel> Data { get; set; }
    List<DependencyModel> Dependencies { get; set; } = new List<DependencyModel>();

    protected override void OnInitialized()
    {
        Data = new List<FlatModel>();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Employee  " + i.ToString(),
                Start = new DateTime(2020, 12, 6 + i),
                End = new DateTime(2020, 12, 11 + i),
                PercentComplete = i * 0.125
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
                    PercentComplete = j * 0.225
                });

                LastId++;
            }
        }

        Dependencies.Add(new DependencyModel()
        {
            Id = LastDependencyId++,
            PredecessorId = 3,
            SuccessorId = 4,
            Type = 0
        });

        Dependencies.Add(new DependencyModel()
        {
            Id = LastDependencyId++,
            PredecessorId = 2,
            SuccessorId = 5,
            Type = 2
        });

        base.OnInitialized();
    }
}
````
