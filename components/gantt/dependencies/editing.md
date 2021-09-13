---
title: Editing
page_title: Gantt Dependencies - Editing
description: Create and Delete Dependencies.
slug: gantt-dependencies-editing
tags: telerik,blazor,gantt,chart,dependency,edit,editing,dependencies
published: True
position: 15
---

# Editing

The Gantt Chart component lets you edit dependencies. This article will explain how to enable and use it.

* [OnCreate](#oncreate)

* [OnDelete](#ondelete)

## OnCreate

The `OnCreate` event fires when the users drag the dependency line from one end-point to another and thus create a new dependency. It provides a `GanttDependencyCreateEventArgs` object that contains the currently created dependency.

### Use the OnCreate event to react to the user creating a new dependency

````CSHTML
@* Drag the line of a dependecy to a new end-point to fire the event *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu">
    <GanttToolBar>
        <GanttCommandButton Command="Add" Icon="add">Add</GanttCommandButton>
    </GanttToolBar>
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
                           OnCreate="@CreateDependency">
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
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
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

## OnDelete

The `OnDelete` event fires when the users deletes a dependency. To delete a dependency the user should select it using the mouse and press the `Delete` keyboard button. It provides a `GanttDependencyDeleteEventArgs` object that contains the currently deleted dependency. You can cast that object to your model.

### Use the OnDelete event to react to the user deleting a dependency

````CSHTML
@* Delete a dependency to fire the event *@

<TelerikGantt Data="@Data"
              Width="100%"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu">
    <GanttToolBar>
        <GanttCommandButton Command="Add" Icon="add">Add</GanttCommandButton>
    </GanttToolBar>
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
            <GanttCommandButton Command="Add" Icon="add"></GanttCommandButton>
            <GanttCommandButton Command="Delete" Icon="delete"></GanttCommandButton>
        </GanttCommandColumn>
    </GanttColumns>
</TelerikGantt>

@code { 
    public DateTime SelectedDate { get; set; } = new DateTime(2019, 11, 11, 6, 0, 0);

    private void DeleteDependency(GanttDependencyDeleteEventArgs args)
    {
        Dependencies.RemoveAll(d => d.Id.Equals((args.Item as DependencyModel).Id));
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