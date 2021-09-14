---
title: Types
page_title: Gantt Dependencies - Types
description: Overview of the Dependency Types for the Gantt Chart for Blazor.
slug: gantt-dependencies-types
tags: telerik,blazor,gantt,chart,dependency,types
published: True
position: 10
---

# Types

The Telerik Gantt Chart for Blazor allows you to define four distinct types of dependencies. To define the dependency type use the `TypeField`, a parameter available on the `GanttDependencies` tag. The parameter accepts `int` and `enum` as values and can be one of the following:  

* `FinishFinish` - `0` - A line from the end date of the predecessor to the end date of the successor.

* `FinishStart` - `1` - A line from the end date of the predecessor to the start date of the successor.

* `StartStart` - `2` - A line from the start date of the predecessor to the start date of the successor.

* `StartFinish` - `3` - A line from the start date of the predecessor to the end date of the successor.

## Examples

This section showcases both ways to define the dependency type - by using an `int`, and an `enum`:  

* [Use an int to define the dependency type](#use-an-int-to-define-the-dependency-type)
* [Use an enum to define the dependency type](#use-an-enum-to-define-the-dependency-type)

### Use an int to define the dependency type

````CSHTML
@* Set the dependency type to FinishStart *@

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
                           TypeField="Type">
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
            Type = 1
        });

        Dependencies.Add(new DependencyModel()
        {
            Id = LastDependencyId++,
            PredecessorId = 2,
            SuccessorId = 5,
            Type = 1
        });

        base.OnInitialized();
    }
}
````

### Use an enum to define the dependency type

````CSHTML
@* Set the dependency type by using an enum *@

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
                           TypeField="Type">
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
    public enum DependencyTypes
    {
        FinishFinish,
        FinishStart,
        StartStart,
        StartFinish
    };

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
        public DependencyTypes Type { get; set; }
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
            Type = DependencyTypes.FinishFinish
        });

        Dependencies.Add(new DependencyModel()
        {
            Id = LastDependencyId++,
            PredecessorId = 2,
            SuccessorId = 5,
            Type = DependencyTypes.StartFinish
        });

        base.OnInitialized();
    }
}
````

