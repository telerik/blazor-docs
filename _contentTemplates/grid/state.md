#initial-state
>tip If you want to set an initial state to the Grid, use a similar snippet, but in the [`OnStateInit event`](slug:grid-state#onstateinit)
#end


#set-sort-from-code
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Sortable="true"
             SortMode="@SortMode.Multiple"
             Height="400px">
    <GridToolBarTemplate>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@SetGridSort">Sort Grid by HireDate</TelerikButton>
        <label>
            <TelerikCheckBox @bind-Value="@ShouldResetSortState" />
            Clear Existing Sorting On Button Click
        </label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(Employee.Team))" Title="Team" />
        <GridColumn Field="@(nameof(Employee.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
        <GridColumn Field="@(nameof(Employee.IsOnLeave))" Title="Is On Leave" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Employee>? GridRef { get; set; }

    private List<Employee> GridData { get; set; } = new();

    private bool ShouldResetSortState { get; set; } = true;

    private async Task SetGridSort()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            if (ShouldResetSortState)
            {
                // Remove any existing sorts.
                gridState.SortDescriptors.Clear();
            }

            SortDescriptor? hireDateSortDescriptor = gridState.SortDescriptors
                .Where(x => x.Member == nameof(Employee.HireDate)).FirstOrDefault();

            if (hireDateSortDescriptor != null)
            {
                // Update the existing HireDate sort if it exists.
                hireDateSortDescriptor.SortDirection = ListSortDirection.Descending;
            }
            else
            {
                // Add a new sort descriptor.
                // In multi-column sorting scenarios
                // you can also insert the new SortDescriptor
                // before the existing ones to control the sort priority.
                gridState.SortDescriptors.Add(new SortDescriptor()
                {
                    Member = nameof(Employee.HireDate),
                    SortDirection = ListSortDirection.Descending
                });
            }

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Employee()
            {
                Id = i,
                Name = $"Name {i}",
                Team = $"Team {i % 5 + 1}",
                HireDate = DateTime.Today.AddDays(-Random.Shared.Next(1, 3000)),
                IsOnLeave = i % 4 == 0 ? true : false
            });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
#end


#filter-row-from-code
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Height="400px">
    <GridToolBarTemplate>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@( () => SetGridFilters(false) )">Filter Grid by Team</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@( () => SetGridFilters(true) )">Filter Grid by Team and HireDate</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton OnClick="@RemoveGridFilters">Remove All Filters</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(Employee.Team))" Title="Team" />
        <GridColumn Field="@(nameof(Employee.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
        <GridColumn Field="@(nameof(Employee.IsOnLeave))" Title="Is On Leave" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Employee>? GridRef { get; set; }

    private List<Employee> GridData { get; set; } = new();

    private async Task SetGridFilters(bool shouldFilterSecondColumn)
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            // Find the Team CompositeFilterDescriptor if it exists.
            CompositeFilterDescriptor? teamCFD = gridState.FilterDescriptors.Cast<CompositeFilterDescriptor>()
                .Where(x => x.FilterDescriptors.Cast<FilterDescriptor>().First().Member == nameof(Employee.Team))
                .FirstOrDefault();

            if (teamCFD != null)
            {
                // Update the existing Team CompositeFilterDescriptor.

                var teamFilterDescriptors = teamCFD.FilterDescriptors.Cast<FilterDescriptor>();

                // When using a filter row, the column's CompositeFilterDescriptor
                // always contains one FilterDescriptor.

                FilterDescriptor firstTeamFD = teamFilterDescriptors.First();
                firstTeamFD.Operator = FilterOperator.IsEqualTo;
                firstTeamFD.Value = "Team 1";
            }
            else
            {
                // Create a new Team CompositeFilterDescriptor.

                var teamFdCollection = new FilterDescriptorCollection();

                teamFdCollection.Add(new FilterDescriptor()
                {
                    Member = nameof(Employee.Team),
                    MemberType = typeof(string),
                    Operator = FilterOperator.IsEqualTo,
                    Value = "Team 1"
                });

                // Add one CompositeFilterDescriptor per column.
                gridState.FilterDescriptors.Add(new CompositeFilterDescriptor()
                {
                    // The LogicalOperator property doesn't matter, because
                    // there is only one FilterDescritor in the CompositeFilterDescriptor.
                    FilterDescriptors = teamFdCollection
                });
            }

            // Find the HireDate CompositeFilterDescriptor if it exists.
            CompositeFilterDescriptor? hireDateCFD = gridState.FilterDescriptors.Cast<CompositeFilterDescriptor>()
                .Where(x => x.FilterDescriptors.Cast<FilterDescriptor>().First().Member == nameof(Employee.HireDate))
                .FirstOrDefault();

            if (hireDateCFD != null)
            {
                // Instead of changing the existing CompositeFilterDescriptor,
                // you can also remove it and create a new one.
                gridState.FilterDescriptors.Remove(hireDateCFD);
            }

            if (shouldFilterSecondColumn)
            {
                var hireDateFdCollection = new FilterDescriptorCollection();

                hireDateFdCollection.Add(new FilterDescriptor()
                {
                    Member = nameof(Employee.HireDate),
                    MemberType = typeof(DateTime),
                    Operator = FilterOperator.IsGreaterThanOrEqualTo,
                    Value = DateTime.Today.AddYears(-3)
                });

                gridState.FilterDescriptors.Add(new CompositeFilterDescriptor()
                {
                    FilterDescriptors = hireDateFdCollection
                });
            }

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task RemoveGridFilters()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.FilterDescriptors.Clear();

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Employee()
            {
                Id = i,
                Name = $"Name {i}",
                Team = $"Team {i % 5 + 1}",
                HireDate = DateTime.Today.AddDays(-Random.Shared.Next(1, 3000)),
                IsOnLeave = i % 4 == 0 ? true : false
            });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
#end

#filter-menu-from-code
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Height="400px">
    <GridToolBarTemplate>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@( () => SetTeamFilter(false) )">Filter Grid by Team 1</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@( () => SetTeamFilter(true) )">Filter Grid by Team 1 or 3</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton OnClick="@RemoveGridFilters">Remove All Filters</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(Employee.Team))" Title="Team" />
        <GridColumn Field="@(nameof(Employee.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
        <GridColumn Field="@(nameof(Employee.IsOnLeave))" Title="Is On Leave" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Employee>? GridRef { get; set; }

    private List<Employee> GridData { get; set; } = new();

    private async Task SetTeamFilter(bool shouldSetSecondFilter)
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            // Find the Team CompositeFilterDescriptor if it exists.
            CompositeFilterDescriptor? teamCFD = gridState.FilterDescriptors.Cast<CompositeFilterDescriptor>()
                .Where(x => x.FilterDescriptors.Cast<FilterDescriptor>().First().Member == nameof(Employee.Team))
                .FirstOrDefault();

            if (teamCFD != null)
            {
                // Update the existing Team CompositeFilterDescriptor.

                teamCFD.LogicalOperator = FilterCompositionLogicalOperator.Or;

                var teamFilterDescriptors = teamCFD.FilterDescriptors.Cast<FilterDescriptor>();

                // When using a filter menu, the column's CompositeFilterDescriptor
                // always contains two FilterDescriptors.

                FilterDescriptor firstTeamFD = teamFilterDescriptors.First();
                firstTeamFD.Operator = FilterOperator.IsEqualTo;
                firstTeamFD.Value = "Team 1";

                // Set a null FilterDescriptor Value and IsEqualTo Operator
                // to disable a filter.
                FilterDescriptor secondTeamFD = teamFilterDescriptors.Last();
                secondTeamFD.Operator = FilterOperator.IsEqualTo;
                secondTeamFD.Value = shouldSetSecondFilter ? "Team 3" : null;
            }
            else
            {
                // Create a new Team CompositeFilterDescriptor.

                var fdCollection = new FilterDescriptorCollection();

                fdCollection.Add(new FilterDescriptor()
                {
                    Member = nameof(Employee.Team),
                    MemberType = typeof(string),
                    Operator = FilterOperator.IsEqualTo,
                    Value = "Team 1"
                });

                fdCollection.Add(new FilterDescriptor()
                {
                    Member = nameof(Employee.Team),
                    MemberType = typeof(string),
                    Operator = FilterOperator.IsEqualTo,
                    Value = shouldSetSecondFilter ? "Team 3" : null
                });

                // Add one CompositeFilterDescriptor per column.
                gridState.FilterDescriptors.Add(new CompositeFilterDescriptor()
                {
                    LogicalOperator = FilterCompositionLogicalOperator.Or,
                    FilterDescriptors = fdCollection
                });
            }

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task RemoveGridFilters()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.FilterDescriptors.Clear();

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Employee()
            {
                Id = i,
                Name = $"Name {i}",
                Team = $"Team {i % 5 + 1}",
                HireDate = DateTime.Today.AddDays(-Random.Shared.Next(1, 3000)),
                IsOnLeave = i % 4 == 0 ? true : false
            });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
#end

#filter-menu-default-filters

>note If you want to alter the filters for a specific column, do not use more than one `FilterDescriptor` in `FilterRow` mode, and more than two `FilterDescriptors` in `FilterMenu` mode. Otherwise additional descriptors will not show up in the UI. This means that you may need to replace or modify an existing descriptor, rather than add a new one.
>
> Inactive filter descriptors in `FilterMenu` mode are distinguished by their `null` `Value`.

#end


#search-from-code
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Sortable="true">
    <GridToolBarTemplate>
        <GridSearchBox />
        <TelerikButton Icon="@SvgIcon.Search"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@OnSearchButtonClick">Search Programmatically</TelerikButton>
        <TelerikButton Icon="@SvgIcon.X"
                       OnClick="@OnClearButtonClick">Clear Search</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridModel.Name)" />
        <GridColumn Field="@nameof(GridModel.Description)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridModel>? GridRef { get; set; }

    private List<GridModel> GridData { get; set; } = new();

    private async Task OnSearchButtonClick()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            var searchString = $"{(char)Random.Shared.Next(97, 123)}{(char)Random.Shared.Next(97, 123)}";

            var cfd = new CompositeFilterDescriptor();

            cfd.LogicalOperator = FilterCompositionLogicalOperator.Or;
            cfd.FilterDescriptors = new FilterDescriptorCollection();

            // Add one FilterDesccriptor for each string column
            cfd.FilterDescriptors.Add(new FilterDescriptor()
            {
                Member = nameof(GridModel.Name),
                MemberType = typeof(string),
                Operator = FilterOperator.Contains,
                Value = searchString
            });
            cfd.FilterDescriptors.Add(new FilterDescriptor()
            {
                Member = nameof(GridModel.Description),
                MemberType = typeof(string),
                Operator = FilterOperator.Contains,
                Value = searchString
            });

            gridState.SearchFilter = cfd;

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task OnClearButtonClick()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            (gridState.SearchFilter as CompositeFilterDescriptor)?.FilterDescriptors.Clear();

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 500; i++)
        {
            GridData.Add(new GridModel()
            {
                Id = i,
                Name = $"{(char)Random.Shared.Next(65, 91)}{(char)Random.Shared.Next(65, 91)} " +
                    $"{(char)Random.Shared.Next(65, 91)}{(char)Random.Shared.Next(65, 91)} {i}",
                Description = $"{(char)Random.Shared.Next(97, 123)}{(char)Random.Shared.Next(97, 123)} " +
                    $"{(char)Random.Shared.Next(97, 123)}{(char)Random.Shared.Next(97, 123)} {i}"
            });
        }
    }

    public class GridModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
#end


#group-from-code
@using Telerik.DataSource

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Groupable="true">
    <GridToolBarTemplate>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@( () => SetGridGroups(false) )">Group Grid by Team</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@( () => SetGridGroups(true) )">Group Grid by Team and IsOnLeave</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton OnClick="@RemoveGridGroups">Remove All Groups</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Employee.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(Employee.Team))" />
        <GridColumn Field="@(nameof(Employee.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
        <GridColumn Field="@(nameof(Employee.IsOnLeave))" Title="Is On Leave" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Employee>? GridRef { get; set; }

    private List<Employee> GridData { get; set; } = new();

    private async Task SetGridGroups(bool shouldGroupBySecondColumn)
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            // Remove any existing Grid groups
            // You can also modify or reorder existing GroupDescriptors.
            gridState.GroupDescriptors.Clear();

            gridState.GroupDescriptors.Add(new GroupDescriptor()
            {
                Member = nameof(Employee.Team),
                MemberType = typeof(string),
                // https://feedback.telerik.com/blazor/1544196-allow-sorting-the-grouped-column
                SortDirection = ListSortDirection.Ascending
            });

            if (shouldGroupBySecondColumn)
            {
                gridState.GroupDescriptors.Add(new GroupDescriptor()
                {
                    Member = nameof(Employee.IsOnLeave),
                    MemberType = typeof(bool),
                    // https://feedback.telerik.com/blazor/1544196-allow-sorting-the-grouped-column
                    SortDirection = ListSortDirection.Descending
                });
            }

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task RemoveGridGroups()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.GroupDescriptors.Clear();

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Employee()
            {
                Id = i,
                Name = $"Name {i}",
                Team = $"Team {i % 5 + 1}",
                HireDate = DateTime.Today.AddDays(-Random.Shared.Next(1, 3000)),
                IsOnLeave = i % 4 == 0 ? true : false
            });
        }
    }

    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public DateTime HireDate { get; set; }
        public bool IsOnLeave { get; set; }
    }
}
#end


#expand-hierarchy-from-code
<TelerikGrid @ref="@GridRef"
             Data="@CategoryData"
             Pageable="true"
             PageSize="2">
    <GridToolBarTemplate>
        <TelerikDropDownList Data="@CategoryData"
                             @bind-Value="@DropDownListCategoryId"
                             TextField="@nameof(Category.Name)"
                             ValueField="@nameof(Category.Id)">
        </TelerikDropDownList>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@ExpandCategory">Expand Category</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                       OnClick="@ExpandAll">Expand All Categories</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton OnClick="@CollapseAll">Collapse All Categories</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Category.Id))" Width="80px" />
        <GridColumn Field="@(nameof(Category.Name))" Title="Category Name" />
    </GridColumns>
    <DetailTemplate Context="category">
        <TelerikGrid Data="@ProductData.Where(x => x.CategoryId == category.Id)">
            <GridColumns>
                <GridColumn Field="@(nameof(Product.Name))" Title="Product Name" />
                <GridColumn Field="@(nameof(Product.Price))" DisplayFormat="{0:c2}" />
                <GridColumn Field="@(nameof(Product.Quantity))" />
            </GridColumns>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

@code {
    private TelerikGrid<Category>? GridRef { get; set; }

    private List<Category> CategoryData { get; set; } = new();

    private List<Product> ProductData { get; set; } = new();

    private int DropDownListCategoryId { get; set; } = 1;

    private async Task ExpandCategory()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            var categoryToExpand = CategoryData.First(x => x.Id == DropDownListCategoryId);

            gridState.ExpandedItems.Add(categoryToExpand);

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task ExpandAll()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.ExpandedItems = CategoryData;

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task CollapseAll()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.ExpandedItems.Clear();

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        var categoryCount = 3;

        for (int i = 1; i <= categoryCount; i++)
        {
            CategoryData.Add(new Category()
            {
                Id = i,
                Name = $"Category {i}"
            });
        }

        for (int i = 1; i <= 12; i++)
        {
            ProductData.Add(new Product()
            {
                Id = i,
                CategoryId = i % categoryCount + 1,
                Name = $"Product {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 100)
            });
        }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
#end


#column-state-from-code
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Reorderable="true"
             Resizable="true">
    <GridToolBarTemplate>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@ReorderPriceAndQuantity">Reorder Price and Quantity</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@MakeIdColumnLast">Make Id Column Last</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
                       OnClick="@ResizeColumns">Resize Columns</TelerikButton>
        <span class="k-separator"></span>
        <TelerikButton OnClick="@ResetColumns">Reset Column Configuration</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(Product.Id))" Width="80px" />
        <GridColumn Field="@(nameof(Product.Name))" Title="Product Name" />
        <GridColumn Field="@(nameof(Product.Price))" DisplayFormat="{0:c2}" />
        <GridColumn Field="@(nameof(Product.Quantity))" />
        <GridColumn Field="@(nameof(Product.ReleaseDate))" DisplayFormat="{0:d}" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product>? GridRef { get; set; }

    private List<Product> GridData { get; set; } = new();

    private async Task ReorderPriceAndQuantity()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            // Get column by its index in the Grid markup.
            var priceColumnState = gridState.ColumnStates.ElementAt(2);
            var priceColumnIndex = priceColumnState.Index;

            // Get column by a parameter such as Field or Id.
            var quantityColumnState = gridState.ColumnStates.First(x => x.Field == nameof(Product.Quantity));
            var quantityColumnIndex = quantityColumnState.Index;

            priceColumnState.Index = quantityColumnIndex;
            quantityColumnState.Index = priceColumnIndex;

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task MakeIdColumnLast()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            var idColumnState = gridState.ColumnStates.First(x => x.Field == nameof(Product.Id));
            var oldIdIndex = idColumnState.Index;

            idColumnState.Index = gridState.ColumnStates.Count - 1;

            foreach (var columnState in gridState.ColumnStates)
            {
                // Decrement the indexes of all columns that were after Id.
                if (columnState.Field != nameof(Product.Id) && columnState.Index > oldIdIndex)
                {
                    --columnState.Index;
                }
            }

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task ResizeColumns()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();
            int newColumnWidth = 160;

            foreach (GridColumnState columnState in gridState.ColumnStates)
            {
                columnState.Width = $"{newColumnWidth}px";
            }

            gridState.TableWidth = $"{newColumnWidth * gridState.ColumnStates.Count}px";

            await GridRef.SetStateAsync(gridState);
        }
    }

    private async Task ResetColumns()
    {
        if (GridRef != null)
        {
            var gridState = GridRef.GetState();

            gridState.ColumnStates = new List<GridColumnState>();
            gridState.TableWidth = null;

            await GridRef.SetStateAsync(gridState);
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Product {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 100),
                ReleaseDate = DateTime.Today.AddDays(-Random.Shared.Next(150, 3000))
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
#end

#statechanged-possible-prop-values
The possible values for the `PropertyName` are `SortDescriptors`, `FilterDescriptors`, `SearchFilter`, `GroupDescriptors`, `Page`, `Skip`, `CollapsedGroups`, `ColumnStates`, `ExpandedItems`, `InsertedItem`, `OriginalEditItem`, `EditItem`.
#end
