---
title: Refresh Data
page_title: Gantt Refresh Data
description: Refresh Gantt Data using the Rebind method, Observable Data or creating a new Collection reference.
slug: gantt-refresh-data
tags: telerik,blazor,Gantt,observable,data,new,collection
published: True
position: 20
components: ["gantt"]
---
# Gantt - Refresh Data

@[template](/_contentTemplates/common/observable-data.md#intro)

In this article:
- [Rebind Method](#rebind-method)
- [Observable Data](#observable-data)
- [New Collection Reference](#new-collection-reference)

## Rebind Method

@[template](/_contentTemplates/common/rebind-method.md#intro)

````RAZOR
@* Add/remove task and rebind the Gantt to react to that change. *@

<TelerikButton OnClick="@AddRootTask">Add root task</TelerikButton>

<TelerikButton OnClick="@RemoveTask">Remove Task 1</TelerikButton>

<TelerikGantt @ref="@GanttRef"
              Data="@GanttData"
              @bind-View="@SelectedView"
              Width="1000px"
              TreeListWidth="500px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
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
    private TelerikGantt<FlatModel> GanttRef;
    
    private List<FlatModel> GanttData { get; set; }
    
    private GanttView SelectedView { get; set; } = GanttView.Week;

    private void AddRootTask()
    {
        var i = GanttData.Last().Id + 1;

        GanttData.Insert(0,new FlatModel()
        {
            Id = i,
            ParentId = null,
            Title = "new task",
            PercentComplete = 0,
            Start = new DateTime(2021, 7, 5),
            End = new DateTime(2021, 7, 15)
        });

        GanttRef.Rebind();
    }

    private void RemoveTask()
    {
        var taskToRemove = GanttData.FirstOrDefault(x => x.Title == "Task 1");

        GanttData.Remove(taskToRemove);

        GanttRef.Rebind();
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

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Task " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new FlatModel()
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

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }
}
````

## Observable Data

@[template](/_contentTemplates/common/observable-data.md#observable-data)

>caption Bind the Gantt to an ObservableCollection, so it can react to collection changes.

````RAZOR
@* Add/remove task to see how the Gantt reacts to that change.*@

@using System.Collections.ObjectModel

<TelerikButton OnClick="@AddRootTask">Add root task</TelerikButton>

<TelerikButton OnClick="@RemoveTask">Remove Task 1</TelerikButton>

<TelerikGantt Data="@GanttData"
              @bind-View="@SelectedView"
              Width="1000px"
              TreeListWidth="500px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
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
    private ObservableCollection<FlatModel> GanttData { get; set; }
    
    private GanttView SelectedView { get; set; } = GanttView.Week;

    private void AddRootTask()
    {
        GanttData.Insert(0,new FlatModel()
        {
            Id = ++LastId,
            ParentId = null,
            Title = "new task",
            PercentComplete = 0,
            Start = new DateTime(2021, 7, 5),
            End = new DateTime(2021, 7, 15)
        });
    }

    private void RemoveTask()
    {
        var taskToRemove = GanttData.FirstOrDefault(x => x.Title == "Task 1");

        GanttData.Remove(taskToRemove);
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

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new ObservableCollection<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Task " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new FlatModel()
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

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }
}
````

@[template](/_contentTemplates/common/observable-data.md#tip-for-new-collection)

## New Collection Reference

@[template](/_contentTemplates/common/observable-data.md#refresh-data)

>caption Create new collection reference to refresh the Gantt data.

````RAZOR
@* Add/remove task and create new collection reference to react to that change.*@

<TelerikButton OnClick="@AddRootTask">Add root task</TelerikButton>

<TelerikButton OnClick="@RemoveTask">Remove Task 1</TelerikButton>

<TelerikGantt Data="@GanttData"
              @bind-View="@SelectedView"
              Width="1000px"
              TreeListWidth="500px"
              Height="600px"
              IdField="Id"
              ParentIdField="ParentId"
              OnUpdate="@UpdateItem"
              OnDelete="@DeleteItem">
    <GanttColumns>
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
    private List<FlatModel> GanttData { get; set; }

    private GanttView SelectedView { get; set; } = GanttView.Week;


    void AddRootTask()
    {
        var i = GanttData.Last().Id + 1;

        GanttData.Insert(0, new FlatModel()
        {
            Id = i,
            ParentId = null,
            Title = "new task",
            PercentComplete = 0,
            Start = new DateTime(2021, 7, 5),
            End = new DateTime(2021, 7, 15)
        });

        GanttData = new List<FlatModel>(GanttData);
    }

    private void RemoveTask()
    {
        var taskToRemove = GanttData.FirstOrDefault(x => x.Title == "Task 1");

        GanttData.Remove(taskToRemove);

        GanttData = new List<FlatModel>(GanttData);
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

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<FlatModel>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new FlatModel()
            {
                Id = LastId,
                Title = "Task " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new FlatModel()
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

    private void UpdateItem(GanttUpdateEventArgs args)
    {
        var item = args.Item as FlatModel;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void DeleteItem(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as FlatModel).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(FlatModel item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }
}
````

## See Also

  * [ObservableCollection](slug:common-features-observable-data)
  * [INotifyCollectionChanged Interface](https://docs.microsoft.com/en-us/dotnet/api/system.collections.specialized.inotifycollectionchanged?view=netframework-4.8)
  * [Live Demos](https://demos.telerik.com/blazor-ui)
