---
title: Editing
page_title: Gantt Dependencies - Editing
description: Create and Delete Dependencies.
slug: gantt-dependencies-editing
tags: telerik,blazor,gantt,chart,dependency,edit,editing,dependencies
published: True
position: 15
components: ["gantt"]
---
# Dependencies Editing

The Gantt Chart component allows you delete its dependencies and create new ones. It exposes dedicated events for dependency editing that you can use to transfer the changes to the underlying data source.

## Basics

This section explains the available events that you need to use for creating and deleting the Gantt dependencies. After that, you will find a code example.

The Gantt provides the following dependency events:

* `OnCreate` fires when the users drag the dependency handle of a task from one end point to another and thus create a new dependency. It provides a `GanttDependencyCreateEventArgs` object that contains the currently created dependency.
* `OnDelete` fires when the users deletes a dependency. To delete a dependency the user should select it using the mouse and press the `Delete` keyboard button. It provides a `GanttDependencyDeleteEventArgs` object that contains the currently deleted dependency in the `Item` field that you can cast to your model.

## Example

````RAZOR
@* Drag the dependency handle of a task to a new end-point to fire the Oncreate event. Delete a dependency to fire the OnDelete event *@

<TelerikGantt Data="@GanttData"
              Height="600px"
              IdField="@nameof(GanttFlatModel.Id)"
              ParentIdField="nameof(GanttFlatModel.ParentId)"
              Sortable="true"
              SortMode="@SortMode.Multiple"
              FilterMode="@GanttFilterMode.FilterMenu"
              FilterMenuType="@FilterMenuType.Menu"
              OnEdit="@( (GanttEditEventArgs args) => args.IsCancelled = true )">
    <GanttViews>
        <GanttWeekView></GanttWeekView>
        <GanttMonthView></GanttMonthView>
        <GanttYearView></GanttYearView>
    </GanttViews>
    <GanttDependenciesSettings>
        <GanttDependencies Data="@Dependencies"
                           IdField="@nameof(GanttDependencyModel.Id)"
                           PredecessorIdField="@nameof(GanttDependencyModel.PredecessorId)"
                           SuccessorIdField="@nameof(GanttDependencyModel.SuccessorId)"
                           TypeField="@nameof(GanttDependencyModel.Type)"
                           OnCreate="@CreateDependency"
                           OnDelete="@DeleteDependency">
        </GanttDependencies>
    </GanttDependenciesSettings>
    <GanttColumns>
        <GanttColumn Field="@nameof(GanttFlatModel.Id)"
                     Visible="false">
        </GanttColumn>
        <GanttColumn Field="@nameof(GanttFlatModel.Title)"
                     Expandable="true"
                     Width="120px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="@nameof(GanttFlatModel.PercentComplete)"
                     Title="Complete"
                     TextAlign="@ColumnTextAlign.Right"
                     DisplayFormat="{0:p0}"
                     Width="80px">
        </GanttColumn>
        <GanttColumn Field="@nameof(GanttFlatModel.Start)"
                     Width="80px"
                     DisplayFormat="{0:d}">
        </GanttColumn>
        <GanttColumn Field="@nameof(GanttFlatModel.End)"
                     DisplayFormat="{0:d}"
                     Width="80px">
        </GanttColumn>
    </GanttColumns>
</TelerikGantt>

@code {
    private List<GanttFlatModel> GanttData { get; set; } = new();
    private List<GanttDependencyModel> Dependencies { get; set; } = new();

    public int LastId { get; set; }
    public int LastDependencyId { get; set; }

    private int NextYear { get; set; } = DateTime.Today.AddYears(1).Year;

    private void CreateDependency(GanttDependencyCreateEventArgs args)
    {
        var dependency = new GanttDependencyModel()
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
        var deletedDependency = (GanttDependencyModel)args.Item;
        Dependencies.RemoveAll(d => d.Id == deletedDependency.Id);
    }

    protected override void OnInitialized()
    {
        GanttData = new List<GanttFlatModel>();

        for (int i = 1; i <= 3; i++)
        {
            GanttData.Add(new GanttFlatModel()
            {
                Id = ++LastId,
                Title = $"Task  {i}",
                Start = new DateTime(NextYear, 1, 6 + i),
                End = new DateTime(NextYear, 1, 11 + i),
                PercentComplete = i * 0.125
            });

            var parentId = LastId;

            for (int j = 1; j <= 3; j++)
            {
                GanttData.Add(new GanttFlatModel()
                {
                    Id = ++LastId,
                    ParentId = parentId,
                    Title = $"Task {i} : {j}",
                    Start = new DateTime(NextYear, 1, 6 + i + j),
                    End = new DateTime(NextYear, 1, 7 + i + j),
                    PercentComplete = j * 0.225
                });

                if (i == 1 && j > 1)
                {
                    Dependencies.Add(new GanttDependencyModel()
                    {
                        Id = ++LastDependencyId,
                        PredecessorId = LastId - 1,
                        SuccessorId = LastId,
                        Type = GanttDependencyType.FinishStart
                    });
                }

                if (i == 2 && j > 1)
                {
                    Dependencies.Add(new GanttDependencyModel()
                    {
                        Id = ++LastDependencyId,
                        PredecessorId = LastId - 1,
                        SuccessorId = LastId,
                        Type = GanttDependencyType.FinishFinish
                    });
                }

                if (i == 3 && j > 1)
                {
                    Dependencies.Add(new GanttDependencyModel()
                    {
                        Id = ++LastDependencyId,
                        PredecessorId = LastId - 1,
                        SuccessorId = LastId,
                        Type = GanttDependencyType.StartStart
                    });
                }
            }
        }

        base.OnInitialized();
    }

    class GanttFlatModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    class GanttDependencyModel
    {
        public int Id { get; set; }
        public int PredecessorId { get; set; }
        public int SuccessorId { get; set; }
        public GanttDependencyType Type { get; set; }
    }
}
````
