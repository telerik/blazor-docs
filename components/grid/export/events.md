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
    - [For PDF Export](#for-pdf-export)
  - [OnAfterExport](#onafterexport)
    - [For Excel Export](#for-excel-export-1)
    - [For CSV Export](#for-csv-export-1)
    - [For PDF Export](#for-pdf-export-1)

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicks the `ExcelExport` or `CsvExport` button and before the export process starts. You can use the event to configure the exported Grid columns or change the exported data. The event handler receives a `GridBeforeExcelExportEventArgs` and `GridBeforeCsvExportEventArgs` object, depending on the type of export, which provides the following properties:

### For Excel Export

* `Columns`&mdash;`List<GridExcelExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Width`&mdash;Define the width of the column **in pixels**.
    * `Title`&mdash;Define the column title to be shown in the Excel file header. 
    * `NumberFormat`&mdash;Provide an Excel-compatible number/date format
    * `Field`&mdash;Set the data bound field of the column.
    
To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridExcelExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.
    
    
* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to Excel, [for example only the selected items in the Grid](slug://grid-kb-export-selected-rows).

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` property to `true`.

>caption Using the Grid OnBeforeExport with Excel export

````RAZOR
@* This example shows the capabilities of the OnBeforeExport event when exporting the Grid to Excel. *@

@* Required by BuiltInNumberFormats in the OnExcelBeforeExport handler *@
@using Telerik.Documents.SpreadsheetStreaming

@* Required by GridExcelExportColumn in the OnExcelBeforeExport handler *@
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportSelectedItemsOnly" />Export Selected Items Only</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnExcelBeforeExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" Visible="false" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; } = new();

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private bool ExportAllPages { get; set; }

    private bool ExportSelectedItemsOnly { get; set; } = true;

    private void OnExcelBeforeExport(GridBeforeExcelExportEventArgs args)
    {
        // Export the hidden ProductId column that has Visible="false"
        var exportableHiddenColumn = new GridExcelExportColumn()
        {
            Title = "Product Id",
            Field = nameof(SampleData.ProductId)
        };
        args.Columns.Insert(0, exportableHiddenColumn);

        // Customize the Width of the first exported column
        args.Columns[0].Width = "200px";

        // Change the format of the Price column
        // BuiltInNumberFormats is part of the Telerik.Documents.SpreadsheetStreaming namespace
        args.Columns[3].NumberFormat = BuiltInNumberFormats.GetCurrency2();

        // Change the format of the ReleaseDate column
        args.Columns[3].NumberFormat = BuiltInNumberFormats.GetShortDate();

        // Export only the first 4 columns in the Grid
        //args.Columns = (args.Columns.Take(4)).ToList();

        if (ExportSelectedItemsOnly)
        {
            // Export only the SelectedItems instead of the Grid data
            args.Data = SelectedItems;
        }

        // Set IsCancelled to true if you want to prevent exporting
        args.IsCancelled = false;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 9).Select(x => new SampleData
        {
            ProductId = x,
            ProductName = $"Product {x}",
            UnitsInStock = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            ReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();

        SelectedItems = GridData.Take(5);
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
````

### For CSV Export

* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to CSV, [for example only the selected items in the Grid](slug://grid-kb-export-selected-rows).

* `Columns`&mdash;`List<GridCsvExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Title`&mdash;Define the column title to be shown in the Excel file header.
    * `Field`&mdash;Set the data bound field of the column.

To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridCsvExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` field to `true`.

````RAZOR
@* This example showcases the capabilities of the OnBeforeExport event when exporting the Grid to CSV file. *@

@using Telerik.Documents.SpreadsheetStreaming

@*This using is for the GridCsvExportColumn in the OnExcelBeforeExport method*@
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
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
    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private List<SampleData> GridData { get; set; }
    
    private bool ExportAllPages { get; set; }

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
      
        SelectedItems = GridData.Take(5);
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

### For PDF Export

* `Columns`&mdash;`List<GridPdfExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into PDF:

    * `Width`&mdash;Define the width of the column **in pixels**.
    * `Title`&mdash;Define the column title to be shown in the PDF file header. 
    * `NumberFormat`&mdash;Provide a PDF-compatible number/date format.
    * `Field`&mdash;Set the data bound field of the column.
    
To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridPdfExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.  
    
* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to PDF, [for example only the selected items in the Grid]({%slug grid-kb-export-selected-rows%}).

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` property to `true`.

>caption Using the Grid OnBeforeExport with PDF export

````RAZOR
@* This example shows the capabilities of the OnBeforeExport event when exporting the Grid to PDF. *@

@* Required by BuiltInNumberFormats in the OnBeforePDFExport handler *@
@using Telerik.Documents.SpreadsheetStreaming

@* Required by GridPdfExportColumn in the OnBeforePDFExport handler *@
@using Telerik.Blazor.Components.Grid

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true"
             Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Groupable="true"
             Width="700px">

    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to PDF</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportSelectedItemsOnly" />Export Selected Items Only</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" OnBeforeExport="@OnBeforePDFExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Visible="false" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="150px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ReleaseDate)" Title="Release Date" Width="200px" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; } = new();

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private bool ExportAllPages { get; set; }

    private bool ExportSelectedItemsOnly { get; set; } = true;

    private void OnBeforePDFExport(GridBeforePdfExportEventArgs args)
    {
        // Export the hidden ProductId column that has Visible="false"
        var exportableHiddenColumn = new GridPdfExportColumn()
            {
                Title = "Product Id",
                Field = nameof(SampleData.ProductId)
            };
        args.Columns.Insert(0, exportableHiddenColumn);

        // Customize the Width of the first exported column
        args.Columns[0].Width = "100px";

        // Customize the Title of the first exported column
        args.Columns[0].Title = "Product Id";

        // Change the format of the Price column
        // BuiltInNumberFormats is part of the Telerik.Documents.SpreadsheetStreaming namespace
        args.Columns[3].NumberFormat = BuiltInNumberFormats.GetCurrency2();

        // Change the format of the ReleaseDate column
        args.Columns[4].NumberFormat = BuiltInNumberFormats.GetShortDate();

        // Export only the first 4 columns in the Grid
        //args.Columns = (args.Columns.Take(4)).ToList();

        if (ExportSelectedItemsOnly)
        {
            // Export only the SelectedItems instead of the Grid data
            args.Data = SelectedItems;
        }

        // Set IsCancelled to true if you want to prevent exporting
        //args.IsCancelled = false;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 50).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = $"Product {x}",
                UnitsInStock = x * 2,
                Price = 3.14159m * x,
                Discontinued = x % 4 == 0,
                ReleaseDate = DateTime.Now.AddDays(-x)
            }).ToList();

        SelectedItems = GridData.Take(5);
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
````

## OnAfterExport

The `OnAfterExport` event fires after [OnBeforeExport](#onbeforeexport) and before the generated file is provided to the user. You can use the event to make changes to the exported file. The event handler receives a `GridAfterExcelExportEventArgs` or `GridAfterCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

### For Excel Export

* `Stream`&mdash;`MemoryStream`&mdash;The output of the Excel export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported Excel file

````RAZOR Excel
@* Get the output of the excel export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
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
    private MemoryStream excelStream { get; set; }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private List<SampleData> GridData { get; set; }
    
    private bool ExportAllPages { get; set; }

    private async Task OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
        var bytes = args.Stream.ToArray();
        var excelStream = new MemoryStream(bytes);        
    }

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

* `Stream`&mdash;`MemoryStream`&mdash;The output of the CSV export as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported CSV file

````RAZOR CSV
@* Get the output of the CSV export as a memory stream *@

@using System.IO

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
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
    private MemoryStream csvStream { get; set; }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private List<SampleData> GridData { get; set; }
    
    private bool ExportAllPages { get; set; }

    private async Task OnCSVAfterExport(GridAfterCsvExportEventArgs args)
    {
        var bytes = args.Stream.ToArray();
        var excelStream = new MemoryStream(bytes);       
    }

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

### For PDF Export

* `Stream`&mdash;`MemoryStream`&mdash;The output of the PDF export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported PDF file

````RAZOR
@* Get the output of the PDF export as a MemoryStream *@

@using System.IO

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Resizable="true"
             Reorderable="true"
             FilterMode="@GridFilterMode.FilterMenu"
             Groupable="true"
             Width="700px">

    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to PDF</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export"
                       AllPages="@ExportAllPages"
                       OnAfterExport="@OnAfterPDFExport" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="50px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="150px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ReleaseDate)" Title="Release Date" Width="200px" />
    </GridColumns>
</TelerikGrid>

@code {
    private MemoryStream pdfStream { get; set; }

    private IEnumerable<object> SelectedItems = Enumerable.Empty<object>();

    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

    private async Task OnAfterPDFExport(GridAfterPdfExportEventArgs args)
    {
        var bytes = args.Stream.ToArray();
        var pdfStream = new MemoryStream(bytes);
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = $"Product {x}",
                UnitsInStock = x * 2,
                Price = 3.14159m * x,
                Discontinued = x % 4 == 0,
                ReleaseDate = DateTime.Now.AddDays(-x)
            }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
````

## See Also

* [Grid Excel Export](slug://grid-export-excel)
* [Grid CSV Export](slug://grid-export-csv)
* [Grid PDF Export](slug://grid-export-pdf)
* [Custom cell formatting of the exported file with RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Custom cell formatting of the exported file with RadSpreadStreamProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadstreamprocessing)  
* [Format numbers and dates in the exported CSV file from the Grid](slug://grid-kb-number-formatting-of-the-csv-export)
* [Change the default CSV delimiter (comma) during Grid export](slug://grid-kb-csv-export-change-field-delimiter)
* [Blazor Grid](slug://grid-overview)

