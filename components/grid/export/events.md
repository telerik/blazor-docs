---
title: Export Events
page_title: Grid - Export Events
description: Export to Excel the Grid for Blazor.
slug: grid-export-events
tags: telerik,blazor,grid,export,events
published: True
position: 15
---

# Export Events

You can customize the files exported to Excel and CSV by using the [OnBeforeExport](#onbeforeexport) and the [OnAfterExport](#onafterexport) events exposed to the `GridExcelExport` and `GridCsvExport` tags. 

#### In this article

* [OnBeforeExport](#onbeforeexport)
    * [For Excel Export](#for-excel-export)
    * [For CSV export](#for-csv-export)
    * [Examples](#examples)

* [OnAfterExport](#onafterexport)
    * [For Excel Export](#for-excel-export)
    * [For CSV export](#for-csv-export)
    * [Examples](#examples)

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicked the `ExcelExport` or `CsvExport` buttons, or by [programmatically invoking the export]({%slug grid-export-excel%}#programmatic-export-from-code). The event handler receives a `GridBeforeExcelExportEventArgs` and `GridBeforeCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

## For Excel Export

* `Columns` - `List<ExcelExportableColumns` - a collection of all exportable columns in the Grid (the columns that have a defined `Field` and are visible). You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Width` - define the width of the column **in pixels**.
    * `Title` - define the column title to be shown in the Excel file header. 
    * `NumberFormat` - you can use the `NumberFormat` to provide an Excel-compatible number/date format
    * `Field` - provides the data bound field of the column.
    
    
* `Data` - `IEnumerable<object>` - assign a custom collection of data to be exported to Excel, for example only the selected items in the Grid. 

* `isCancelled` -  `bool` - you can cancel the OnBeforeExcel event by setting the `isCancelled` field to `true`.


### For CSV Export

* `Data` - `IEnumerable<object>` - you can assign a custom collection of data to be exported to excel/csv such as the selected items in the Grid. 

* `isCancelled` -  `bool` - you can cancel the OnBeforeExcel event by setting the `isCancelled` field to `true`.

>note Unlike Excel, the CSV files do not have defined columns, so the `args.Columns` field will not be applicable when exporting the Grid to CSV.


### Examples

<div class="skip-repl"></div>
````Excel
@* This example showcases the capabilities of the OnBeforeExport event when exporting the Grid to excel. *@

@using Telerik.Documents.SpreadsheetStreaming

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" 
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBar>
        <GridCommandButton Command="ExcelExport" Icon="file-excel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnExcelBeforeExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
        private async Task OnExcelBeforeExport(GridBeforeExcelExportEventArgs args)
        {
            //customize the width of the first column when exporting
            args.Columns[0].Width = "200px";

            //change the format of the exported column
            //the BuiltInNumberFormats is part of the Telerik.Documents.SpreadsheetStreaming namespace
            args.Columns[3].NumberFormat = BuiltInNumberFormats.GetCurrency2();
    
            //export only the first 4 columns in the Grid
            args.Columns = (args.Columns.Take(4)).ToList();

            //export the SelectedItems
            args.Data = SelectedItems;

            //set the IsCancelled flag to true if you want to cancel the OnBeforeExport event
            args.IsCancelled = false;
        }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    List<SampleData> GridData { get; set; }
    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            FirstReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````
````CSV
@* This example showcases the capabilities of the OnBeforeExport event when exporting the Grid to CSV file. *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBar>
        <GridCommandButton Command="CsvExport" Icon="file-csv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnBeforCsvExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private async Task OnBeforCsvExport(GridBeforeCsvExportEventArgs args)
    {
        args.Data = SelectedItems;

        args.IsCancelled = false;
    }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    List<SampleData> GridData { get; set; }
    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            FirstReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````

## OnAfterExport

The `OnAfterExport` event fires after the [OnBeforeExport](#onbeforeexport) event, and before the actual file is provided to the user. The event handler receives a `GridAfterExcelExportEventArgs` and `GridAfterCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

### For Excel Export

* `Stream` - `MemoryStream` - The output of the Excel export as a memory stream. 

### For CSV Export

### For Excel Export

* `Stream` - `MemoryStream` - The output of the CSV export as a memory stream. 

### Examples

<div class="skip-repl"></div>
````Excel
@* Get the output of the excel export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBar>
        <GridCommandButton Command="ExcelExport" Icon="file-excel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" 
                         AllPages="@ExportAllPages"
                         OnAfterExport="@OnExcelAfterExport"/>
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private async Task OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
        excelStream = args.Stream;
    }

    private MemoryStream excelStream { get; set; }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    List<SampleData> GridData { get; set; }
    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            FirstReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````
````CSV
@* Get the output of the CSV export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBar>
        <GridCommandButton Command="CsvExport" Icon="file-csv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBar>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" 
                       AllPages="@ExportAllPages" 
                       OnAfterExport="@OnCSVAfterExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private async Task OnCSVAfterExport(GridAfterCsvExportEventArgs args)
    {
        csvStream = args.Stream;
    }

    private MemoryStream csvStream { get; set; }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    List<SampleData> GridData { get; set; }
    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            FirstReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````

## See Also

  * [Grid Excel Export]({%slug grid-export-excel%})
  * [Grid CSV Export]({%slug grid-export-csv%})
  
   
