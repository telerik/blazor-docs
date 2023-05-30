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

#### In This Article

  - [OnBeforeExport](#onbeforeexport)
    - [For Excel Export](#for-excel-export)
    - [For CSV Export](#for-csv-export)
  - [OnAfterExport](#onafterexport)
    - [For Excel Export](#for-excel-export-1)
    - [For CSV Export](#for-csv-export-1)

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicked the `ExcelExport` or `CsvExport` buttons. The event handler receives a `GridBeforeExcelExportEventArgs` and `GridBeforeCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

### For Excel Export

* `Columns` - `List<GridExcelExportColumn>` - a collection of all exportable columns in the Grid (the columns that have a defined `Field` and are visible). You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Width` - define the width of the column **in pixels**.
    * `Title` - define the column title to be shown in the Excel file header. 
    * `NumberFormat` - provide an Excel-compatible number/date format
    * `Field` - set the data bound field of the column.
    
To export a hidden (the Visible attribute set to `false`) column you can manually define an instance of the `GridExcelExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.
    
    
* `Data` - `IEnumerable<object>` - assign a custom collection of data to be exported to Excel, [for example only the selected items in the Grid]({%slug grid-kb-export-selected-rows%}).

* `isCancelled` -  `bool` - cancel the OnBeforeExcel event by setting the `isCancelled` property to `true`.

````CSHTML
@* This example shows the capabilities of the OnBeforeExport event when exporting the Grid to excel. *@

@using Telerik.Documents.SpreadsheetStreaming
@using Telerik.FontIcons

@*This using is for the GridExcelExportColumn in the OnExcelBeforeExport method*@
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@FontIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnExcelBeforeExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID"
                    Visible="false"
                    Width="100px" />
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
        //export a hidden column (Visible set to false)

        var exportableHiddenColumn = new GridExcelExportColumn()
            {
                Title = "Product Id",
                Field = nameof(SampleData.ProductId)
            };

        args.Columns.Insert(0, exportableHiddenColumn);

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

### For CSV Export

* `Data` - `IEnumerable<object>` - assign a custom collection of data to be exported to CSV, [for example only the selected items in the Grid]({%slug grid-kb-export-selected-rows%}).

* `Columns` - `List<GridCsvExportColumn>` - a collection of all exportable columns in the Grid (the columns that have a defined `Field` and are visible). You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Title` - define the column title to be shown in the Excel file header.
    * `Field` - set the data bound field of the column.

To export a hidden (the Visible attribute set to `false`) column you can manually define an instance of the `GridCsvExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.

* `isCancelled` -  `bool` - you can cancel the OnBeforeExcel event by setting the `isCancelled` field to `true`.

````CSHTML
@* This example showcases the capabilities of the OnBeforeExport event when exporting the Grid to CSV file. *@

@using Telerik.Documents.SpreadsheetStreaming
@using Telerik.FontIcons

@*This using is for the GridCsvExportColumn in the OnExcelBeforeExport method*@
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@FontIcon.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnBeforeCsvExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" 
                    Title="ID"
                    Visible="false"
                    Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private async Task OnBeforeCsvExport(GridBeforeCsvExportEventArgs args)
    {
        //export the SelectedItems

        args.Data = SelectedItems;

        //export a hidden column (Visible set to false)

        var exportableHiddenColumn = new GridCsvExportColumn()
            {
                Title = "Id",
                Field = nameof(SampleData.ProductId)
            };

        args.Columns.Insert(0, exportableHiddenColumn);

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

## OnAfterExport

The `OnAfterExport` event fires after the [OnBeforeExport](#onbeforeexport) event, and before the actual file is provided to the user. The event handler receives a `GridAfterExcelExportEventArgs` or `GridAfterCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

### For Excel Export

* `Stream` - `MemoryStream` - The output of the Excel export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

````Excel
@* Get the output of the excel export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@FontIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export"
                         AllPages="@ExportAllPages"
                         OnAfterExport="@OnExcelAfterExport" />
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
        var bytes = args.Stream.ToArray();
        var excelStream = new MemoryStream(bytes);        
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

### For CSV Export

* `Stream` - `MemoryStream` - The output of the CSV export as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

````CSV
@* Get the output of the CSV export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@FontIcon.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

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
        var bytes = args.Stream.ToArray();
        var excelStream = new MemoryStream(bytes);       
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
* [Custom cell formatting of the exported file with RadSpreadProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadprocessing%})
* [Custom cell formatting of the exported file with RadSpreadStreamProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadstreamprocessing%})  
* [Format numbers and dates in the exported CSV file from the Grid]({%slug grid-kb-number-formatting-of-the-csv-export%})
* [Change the default CSV delimiter (comma) during Grid export]({%slug grid-kb-csv-export-change-field-delimiter%})
