---
title: Export Events
page_title: TreeList - Export Events
description: Learn about the Blazor TreeList events related to exporting the component data.
slug: treelist-export-events
tags: telerik,blazor,treelist,export,events
published: True
position: 15
components: ["treelist"]
---

# Export Events

You can customize the files exported to Excel by using the [OnBeforeExport](#onbeforeexport) and the [OnAfterExport](#onafterexport) events exposed to the `TreeListExcelExport` tag.

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicks the `ExcelExport` command button and before the export process starts. You can use the event to configure the exported TreeList columns or change the exported data. The event handler receives a `TreeListBeforeExcelExportEventArgs` object, which provides the following properties:

* `Columns`&mdash;`List<TreeListExcelExportColumn>`&mdash;A collection of all exportable columns in the TreeList. These are all visible `TreeListColumn` instances. You can customize the following attributes of the TreeList column before exporting it into Excel:

    * `Width`&mdash;Define the width of the column **in pixels**.
    * `Title`&mdash;Define the column title to be shown in the Excel file header. 
    * `NumberFormat`&mdash;Provide an Excel-compatible number/date format
    * `Field`&mdash;Set the data bound field of the column.

To export a hidden TreeList column that has its `Visible` parameter set to `false`, you can manually define an instance of the `TreeListExcelExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.

* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to Excel.

* `IsCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` property to `true`.

>caption Using the TreeList OnBeforeExport with Excel export

````RAZOR
@using Telerik.Documents.SpreadsheetStreaming

<TelerikTreeList @ref="@TreeListRef"
                 Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 Height="400px"
                 Pageable="true">
    <TreeListExport>
        <TreeListExcelExport AllPages="true"
                             ExpandAll="true"
                             FileName="telerik-treelist-export"
                             OnBeforeExport="@OnTreeListBeforeExport" />
    </TreeListExport>
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" Width="300px" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="120px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="180px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Visible="false" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee>? TreeListRef;
    private IEnumerable<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private void OnTreeListBeforeExport(TreeListBeforeExcelExportEventArgs args)
    {
        // Export the hidden IsDriver column that has Visible="false"
        var exportableHiddenColumn = new TreeListExcelExportColumn()
        {
            Title = "Is Driver",
            Field = nameof(Employee.IsDriver)
        };
        args.Columns.Add(exportableHiddenColumn);

        // Customize the Width of the first exported column
        args.Columns[0].Width = "360px";

        // Change the format of the Salary column
        // BuiltInNumberFormats is part of the Telerik.Documents.SpreadsheetStreaming namespace
        args.Columns[1].NumberFormat = BuiltInNumberFormats.GetCurrency2();

        // Change the format and title of the HireDate column
        args.Columns[2].NumberFormat = BuiltInNumberFormats.GetShortDate();
        args.Columns[2].Title = "Hired On";

        // Set IsCancelled to true if you want to prevent exporting
        // args.IsCancelled = false;
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

    public class Employee
    {
        public int Id { get; set; }
        public bool HasChildren { get; set; }
        public List<Employee>? Items { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is Employee && ((Employee)obj).Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    #region Data Service

    public class EmployeeService
    {
        private List<Employee> Items { get; set; } = new();

        private readonly int TreeLevelCount;
        private readonly int RootItemCount;
        private readonly int ChildItemCount;

        private int LastId { get; set; }
        private readonly Random Rnd = Random.Shared;

        public async Task<List<Employee>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        private void PopulateItems(List<Employee> items, int level)
        {
            for (int i = 1; i <= (level == 1 ? RootItemCount : ChildItemCount); i++)
            {
                var itemId = ++LastId;

                Employee newItem = new Employee()
                {
                    Id = itemId,
                    HasChildren = level < TreeLevelCount,
                    Name = $"Employee Name {itemId} ({level}-{i})",
                    Notes = $"Multi-line\nnotes {itemId}",
                    Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                    HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                    IsDriver = itemId % 2 == 0
                };

                items.Add(newItem);
            }

            if (level < TreeLevelCount)
            {
                PopulateChildren(items, level + 1);
            }
        }

        private void PopulateChildren(List<Employee> items, int level)
        {
            foreach (var item in items)
            {
                item.Items = new List<Employee>();

                PopulateItems(item.Items, level);
            }
        }

        public EmployeeService(int treeLevelCount = 3, int rootItemCount = 5, int childItemCount = 3)
        {
            TreeLevelCount = treeLevelCount;
            RootItemCount = rootItemCount;
            ChildItemCount = childItemCount;

            List<Employee> items = new();
            PopulateItems(items, 1);

            Items = items;
        }
    }

    #endregion Data Service
}
````

## OnAfterExport

The `OnAfterExport` event fires after [OnBeforeExport](#onbeforeexport) and before the generated file is provided to the user. You can use the event to make changes to the exported file. The event handler receives a `TreeListAfterExcelExportEventArgs` object, which provides the following properties:

* `Stream`&mdash;`MemoryStream`&mdash;The output of the Excel export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. Then, use [Telerik Document Processing](slug:dpl-in-blazor) to make changes to the exported file, for example, [apply custom cell formatting with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing).

>caption Get the stream of the exported Excel file

````RAZOR Excel
<TelerikTreeList @ref="@TreeListRef"
                 Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 Height="400px"
                 Pageable="true">
    <TreeListExport>
        <TreeListExcelExport AllPages="true"
                             ExpandAll="true"
                             FileName="telerik-treelist-export"
                             OnAfterExport="@OnTreeListAfterExport" />
    </TreeListExport>
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" Width="300px" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="120px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="180px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Visible="false" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private TelerikTreeList<Employee>? TreeListRef;
    private IEnumerable<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private void OnTreeListAfterExport(TreeListAfterExcelExportEventArgs args)
    {
        byte[] streamBytes = args.Stream.ToArray();
        MemoryStream excelStream = new MemoryStream(streamBytes);        
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

    public class Employee
    {
        public int Id { get; set; }
        public bool HasChildren { get; set; }
        public List<Employee>? Items { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public decimal? Salary { get; set; }
        public DateTime? HireDate { get; set; }
        public bool IsDriver { get; set; }

        public override bool Equals(object? obj)
        {
            return obj is Employee && ((Employee)obj).Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    #region Data Service

    public class EmployeeService
    {
        private List<Employee> Items { get; set; } = new();

        private readonly int TreeLevelCount;
        private readonly int RootItemCount;
        private readonly int ChildItemCount;

        private int LastId { get; set; }
        private readonly Random Rnd = Random.Shared;

        public async Task<List<Employee>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        private void PopulateItems(List<Employee> items, int level)
        {
            for (int i = 1; i <= (level == 1 ? RootItemCount : ChildItemCount); i++)
            {
                var itemId = ++LastId;

                Employee newItem = new Employee()
                {
                    Id = itemId,
                    HasChildren = level < TreeLevelCount,
                    Name = $"Employee Name {itemId} ({level}-{i})",
                    Notes = $"Multi-line\nnotes {itemId}",
                    Salary = Rnd.Next(1_000, 10_000) * 1.23m,
                    HireDate = DateTime.Today.AddDays(-Rnd.Next(365, 3650)),
                    IsDriver = itemId % 2 == 0
                };

                items.Add(newItem);
            }

            if (level < TreeLevelCount)
            {
                PopulateChildren(items, level + 1);
            }
        }

        private void PopulateChildren(List<Employee> items, int level)
        {
            foreach (var item in items)
            {
                item.Items = new List<Employee>();

                PopulateItems(item.Items, level);
            }
        }

        public EmployeeService(int treeLevelCount = 3, int rootItemCount = 5, int childItemCount = 3)
        {
            TreeLevelCount = treeLevelCount;
            RootItemCount = rootItemCount;
            ChildItemCount = childItemCount;

            List<Employee> items = new();
            PopulateItems(items, 1);

            Items = items;
        }
    }

    #endregion Data Service
}
````

## See Also

* [TreeList Excel Export](slug:treelist-export-excel)
* [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Custom cell formatting of the exported file with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing)  
