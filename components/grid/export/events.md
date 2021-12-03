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

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicked the `ExcelExport` or `CsvExport` buttons. The event handler receives a `GridBeforeExcelExportEventArgs` and `GridBeforeCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

* `Columns` - `List<ExcelExportableColumns` - a collection of all exportable columns in the Grid (the columns that have a defined `Field` and are visible). You can customize the following attributes of the Grid column before exporting it into excel or CSV:

    * `Width` - define the width of the column when exported to excel/csv file.
    * `Title` - define the title of the column that would be shown in the header in excel/csv file. 
    * `NumberFormat` - you can use the `NumberFormat` to provide an Excel-compatible number/date format
    * `Field` - provides the data bound field of the column.
    
    
* `Data` - `IEnumerable<object>` - you can assign a custom collection of data to be exported to excel/csv such as the selected items in the Grid. 

* `isCancelled` -  `bool` - you can cancel the OnBeforeExcel event by setting the `isCancelled` field to `true`.

````Excel
@* This example showcases the capabilities of the OnBeforeExport event when exporting the Grid to excel. *@

@using Telerik.Blazor.Extensions
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


````


## See Also

  * [Live Demo: Grid Excel Export](https://demos.telerik.com/blazor-ui/grid/export-excel)
   
