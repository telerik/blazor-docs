---
title: Data Binding
page_title: Gantt Dependencies - Data Binding
description: Data Binding in the Gantt Dependencies.
slug: gantt-dependencies-databind
tags: telerik,blazor,gantt,chart,dependency,databind,data,databound
published: True
position: 5
previous_url: /components/gantt/dependencies/types
---

# Dependencies Data Binding

To bind a collection of dependencies to the Gantt Chart you should use the `Data` parameter, available for the `GanttDependencies` tag. This article explains how to use the data binding schema for the Gantt Dependencies.

## Gantt Dependencies Features:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Feature | Type | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<object>` | The collection of dependencies. |
| `IdField` | `string` | Unique identifier for each task. Use it for editing and hierarchy. |
| `PredecessorField` | `string` | Points to the predecessor task. |
| `SuccessorField` | `string` | Points to the successor task. |
| `TypeField` | `GanttDependencyType` enum | Points to the dependency type, which is the relationship between the two affected tasks. The supported values include `FinishFinish`, `FinishStart`, `StartStart`, and `StartFinish`. |

>note To use the Data Binding for the Gantt Dependencies you must provide all data binding features listed above.

### Provide a collection of dependencies to the Gantt Chart

````RAZOR
@* Bind a collection to the Data parameter of GanttDependencies. *@

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
                           TypeField="@nameof(GanttDependencyModel.Type)">
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

## Next Steps

* [Explore Gantt dependency editing](slug:gantt-dependencies-editing)
