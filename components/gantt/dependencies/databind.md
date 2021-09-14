---
title: Data Binding
page_title: Gantt Dependencies - Data Binding
description: Data Binding in the Gantt Dependencies.
slug: gantt-dependencies-databind
tags: telerik,blazor,gantt,chart,dependency,databind,data,databound
published: True
position: 5
---

# Dependencies Data Binding

To bind a collection of dependencies to the Gantt Chart you should use the `Data` parameter, available for the `GanttDependencies` tag. This article explains how to use the data binding schema for the Gantt Dependencies.

## Gantt Dependencies Features:

* `Data` - `IEnumerable<Object>` - you can pass the collection of dependencies you would like to see rendered to the Data parameter.

* `IdField` - `string` - Unique identifier for each task. You can use it for editing and hierarchy.

* `PredecessorField` - `string` - Points to the predecessor task. 

* `SuccessorField` - `string` - Points to the successor task.

>note To use the Data Binding for the Gantt Dependencies you must provide all data binding features listed above.

### Provide a collection of dependencies to the Gantt Chart

````CSHTML
@* Bind a collection to the Data parameter of GanttDependencies. *@

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

