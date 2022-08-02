#set-sort-from-code
@*Sort from code via the Gantt state*@

@using Telerik.DataSource

<TelerikButton OnClick="@SetGanttSort">Sort Gantt by Status</TelerikButton>

<TelerikGantt @ref="@GanttRef"
              Data="@GanttData"
              Sortable="true"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@GanttView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
              OnUpdate="@OnGanttUpdate"
              OnDelete="@OnGanttDelete">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
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
    private TelerikGantt<GanttTask> GanttRef;

    private List<GanttTask> GanttData { get; set; }

    private string TreeListWidth { get; set; } = "50%";

    private GanttView GanttView { get; set; } = GanttView.Week;

    private async Task SetGanttSort()
    {
        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.SortDescriptors = new List<SortDescriptor>()
        {
            new SortDescriptor { Member = "PercentComplete", SortDirection = ListSortDirection.Ascending }
        };

        await GanttRef.SetStateAsync(currState);
    }

    #region Gantt model, dummy data generation and sample CRUD operations

    private void OnGanttUpdate(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void OnGanttDelete(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
            {
                Id = LastId,
                Title = "Task  " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new GanttTask()
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

    public class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    #endregion
}
#end

#filter-row-from-code
@*Filter from code through the Gantt state*@

@using Telerik.DataSource

<TelerikButton OnClick="@SetGanttFilter">Filter Gantt by Task 2</TelerikButton>

<TelerikGantt @ref="@GanttRef"
              Data="@GanttData"
              FilterMode="@GanttFilterMode.FilterRow"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@GanttView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
              OnUpdate="@OnGanttUpdate"
              OnDelete="@OnGanttDelete">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
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
    private TelerikGantt<GanttTask> GanttRef;

    private List<GanttTask> GanttData { get; set; }

    private string TreeListWidth { get; set; } = "50%";

    private GanttView GanttView { get; set; } = GanttView.Week;

    private async Task SetGanttFilter()
    {
        var filterDescriptorCollection = new FilterDescriptorCollection();

        filterDescriptorCollection.Add(new FilterDescriptor(nameof(GanttTask.Title), FilterOperator.Contains, "Task 2") { MemberType = typeof(string) });

        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.FilterDescriptors = new List<IFilterDescriptor>()
        {
            new CompositeFilterDescriptor() { FilterDescriptors = filterDescriptorCollection }
        };

        await GanttRef.SetStateAsync(currState);
    }

    #region Gantt model, dummy data generation and sample CRUD operations

    private void OnGanttUpdate(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void OnGanttDelete(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
            {
                Id = LastId,
                Title = "Task  " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new GanttTask()
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

    public class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    #endregion
}
#end


#filter-menu-from-code
@*Filter from code through the Gantt state*@

@using Telerik.DataSource

<TelerikButton OnClick="@SetGanttFilter">Filter Gantt by Task 2 and 5</TelerikButton>

<TelerikGantt @ref="@GanttRef"
              Data="@GanttData"
              FilterMode="@GanttFilterMode.FilterMenu"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@GanttView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
              OnUpdate="@OnGanttUpdate"
              OnDelete="@OnGanttDelete">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
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
    private TelerikGantt<GanttTask> GanttRef;

    private List<GanttTask> GanttData { get; set; }

    private string TreeListWidth { get; set; } = "50%";

    private GanttView GanttView { get; set; } = GanttView.Week;

    private async Task SetGanttFilter()
    {
        var filterDescriptorCollection = new FilterDescriptorCollection()
        {
            new FilterDescriptor(nameof(GanttTask.Title), FilterOperator.Contains, "Task 2") { MemberType = typeof(string) },
            new FilterDescriptor(nameof(GanttTask.Title), FilterOperator.Contains, "Task 5") { MemberType = typeof(string) }
        };

        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.FilterDescriptors = new List<IFilterDescriptor>()
        {
            new CompositeFilterDescriptor() {
                FilterDescriptors = filterDescriptorCollection,
                LogicalOperator=FilterCompositionLogicalOperator.Or
            }
        };

        await GanttRef.SetStateAsync(currState);
    }

    #region Gantt model, dummy data generation and sample CRUD operations

    private void OnGanttUpdate(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void OnGanttDelete(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
            {
                Id = LastId,
                Title = "Task  " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new GanttTask()
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

    public class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    #endregion
}
#end

#expand-hierarchy-from-code
@*Expand and collapse items through the Gantt state*@

<TelerikButton OnClick="@SetExpandedItems">Expand First Task Only</TelerikButton>

<TelerikGantt Data="@GanttData"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterRow"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@GanttView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
              OnUpdate="@OnGanttUpdate"
              OnDelete="@OnGanttDelete">
    <GanttColumns>
        <GanttColumn Field="Title"
                     Expandable="true"
                     Width="160px"
                     Title="Task Title">
        </GanttColumn>
        <GanttColumn Field="PercentComplete"
                     Title="Status"
                     Width="100px">
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
    private TelerikGantt<GanttTask> GanttRef;

    private List<GanttTask> GanttData { get; set; }

    private string TreeListWidth { get; set; } = "50%";

    private GanttView GanttView { get; set; } = GanttView.Week;

    async Task SetExpandedItems()
    {
        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.ExpandedItems = new List<GanttTask>() { GanttData.FirstOrDefault() };

        await GanttRef.SetStateAsync(currState);
    }

    #region Gantt model, dummy data generation and sample CRUD operations

    private void OnGanttUpdate(GanttUpdateEventArgs args)
    {
        var item = args.Item as GanttTask;

        var foundItem = GanttData.FirstOrDefault(i => i.Id.Equals(item.Id));

        if (foundItem != null)
        {
            foundItem.Title = item.Title;
            foundItem.Start = item.Start;
            foundItem.End = item.End;
            foundItem.PercentComplete = item.PercentComplete;
        }
    }

    private void OnGanttDelete(GanttDeleteEventArgs args)
    {
        var item = GanttData.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = GanttData.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        GanttData.Remove(item);
    }

    private int LastId { get; set; } = 1;

    protected override void OnInitialized()
    {
        GanttData = new List<GanttTask>();
        var random = new Random();

        for (int i = 1; i < 6; i++)
        {
            var newItem = new GanttTask()
            {
                Id = LastId,
                Title = "Task  " + i.ToString(),
                Start = new DateTime(2021, 7, 5 + i),
                End = new DateTime(2021, 7, 11 + i),
                PercentComplete = Math.Round(random.NextDouble(), 2)
            };

            GanttData.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                GanttData.Add(new GanttTask()
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

    public class GanttTask
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
        public double PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }

    #endregion
}
#end
