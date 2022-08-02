#set-sort-from-code
@*Set sorting from code through the Gantt state*@

@using Telerik.DataSource

<TelerikButton OnClick="@SetGanttSort">Sort from code</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              Sortable="true"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@SelectedView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
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
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }
    public string TreeListWidth { get; set; } = "50%";
    public GanttView SelectedView { get; set; } = GanttView.Week;

    async Task SetGanttSort()
    {
        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.SortDescriptors = new List<SortDescriptor>()
        {
            new SortDescriptor { Member = "PercentComplete", SortDirection = ListSortDirection.Ascending }
        };
            
        await GanttRef.SetStateAsync(currState);
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
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
        Data = new List<GanttTask>();
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

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
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
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

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
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
#end

#filter-row-from-code
@*Set filter from code through the Gantt state*@

@using Telerik.DataSource

<TelerikButton ThemeColor="primary" OnClick="@SetGanttFilter">Set filter from code</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterRow"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@SelectedView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
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
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }
    public string TreeListWidth { get; set; } = "50%";
    public GanttView SelectedView { get; set; } = GanttView.Week;

    async Task SetGanttFilter()
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

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
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
        Data = new List<GanttTask>();
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

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
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
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

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
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
#end


#filter-menu-from-code
@*Set filter from code through the Gantt state*@

@using Telerik.DataSource

<TelerikButton ThemeColor="primary" OnClick="@SetGanttFilter">Set filter from code</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterMenu"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@SelectedView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
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
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }
    public string TreeListWidth { get; set; } = "50%";
    public GanttView SelectedView { get; set; } = GanttView.Week;

    async Task SetGanttFilter()
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

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
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
        Data = new List<GanttTask>();
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

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
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
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

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
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
#end

#expand-hierarchy-from-code
@*Programmatically expand and collapse items through the Gantt state*@

<TelerikButton ThemeColor="primary" OnClick="@SetExpandedItems">Expand only first item and collapse the rest</TelerikButton>

<TelerikGantt Data="@Data"
              @ref="@GanttRef"
              FilterMode="@GanttFilterMode.FilterRow"
              IdField="Id"
              ParentIdField="ParentId"
              @bind-View="@SelectedView"
              @bind-TreeListWidth="@TreeListWidth"
              Width="1000px"
              Height="600px"
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
    TelerikGantt<GanttTask> GanttRef;
    List<GanttTask> Data { get; set; }
    public string TreeListWidth { get; set; } = "50%";
    public GanttView SelectedView { get; set; } = GanttView.Week;

    async Task SetExpandedItems()
    {
        GanttState<GanttTask> currState = GanttRef.GetState();

        currState.ExpandedItems = new List<GanttTask>() { Data.FirstOrDefault() };

        await GanttRef.SetStateAsync(currState);
    }

    //Gantt model, dummy data generation and sample CRUD operations
    class GanttTask
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
        Data = new List<GanttTask>();
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

            Data.Add(newItem);
            var parentId = LastId;
            LastId++;

            for (int j = 0; j < 5; j++)
            {
                Data.Add(new GanttTask()
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
        var item = args.Item as GanttTask;

        var foundItem = Data.FirstOrDefault(i => i.Id.Equals(item.Id));

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
        var item = Data.FirstOrDefault(i => i.Id.Equals((args.Item as GanttTask).Id));

        RemoveChildRecursive(item);
    }

    private void RemoveChildRecursive(GanttTask item)
    {
        var children = Data.Where(i => item.Id.Equals(i.ParentId)).ToList();

        foreach (var child in children)
        {
            RemoveChildRecursive(child);
        }

        Data.Remove(item);
    }
}
#end
