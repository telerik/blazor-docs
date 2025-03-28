---
title: CSV
page_title: Grid - CSV Export
description: Export to CSV the Grid for Blazor.
slug: grid-export-csv
tags: telerik,blazor,grid,export,csv
published: True
position: 1
---

# Grid CSV Export

You can export the grid to CSV with a click of a button. The current filter, sort, page, grouping and column order are applied to the `.csv` document.

When you click the Export button, your browser will receive the resulting file.

#### In This Article

  - [Basics](#basics)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)
  - [Notes](#notes)
  - [See Also](#see-also)

## Basics

To enable the grid CSV Export, add a [command button](slug:components/grid/columns/command) with the `CsvExport` command name to the [Grid toolbar](slug:components/grid/features/toolbar).

````RAZOR.skip-repl
<GridToolBarTemplate>
    <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
</GridToolBarTemplate>
````

Optionally, you can also set the `GridCsvExport` tag settings under the `GridExport` tag to subscribe to the [Grid export events](slug:grid-export-events) that allow further customization of the exported columns/data or configure the CSV export options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | The name of the file. The grid will add the `.csv` extension for you. |
| `AllPages` | `bool` | Whether to export the current page only, or the entire data from the data source. |

>caption Export the Grid to CSV - Example

````RAZOR
@* You can sort, group, filter, page the grid, reorder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

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

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

| Method | Type | Description |
| --- | --- | --- |
| `SaveAsCsvFileAsync` | `ValueTask` | Sends the exported CSV file to the browser for download. You can pass [`GridCsvExportOptions`](slug:Telerik.Blazor.Components.GridCsvExportOptionsDescriptor) to customize the export. |
| `ExportToCsvAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. You can pass [`GridCsvExportOptions`](slug:Telerik.Blazor.Components.GridCsvExportOptionsDescriptor) to customize the export. |

>caption Invoke the export function from code

````RAZOR
@* Send the exported file for download and get the exported data as a memory stream *@

@using System.IO
@using Telerik.Blazor.Components.Grid;

<TelerikButton OnClick="@(async () => await GridRef.SaveAsCsvFileAsync())">Download the CSV file</TelerikButton>
<TelerikButton OnClick="@GetTheDataAsAStream">Get the Exported Data as a MemoryStream</TelerikButton>
<TelerikButton OnClick="@(async () => await SaveAsCsvWithOptions())">Download CSV with Options</TelerikButton>
<TelerikButton OnClick="@(async () => await ExportToCsvWithOptions())">Get CSV Data with Options</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Sortable="true"
             Resizable="true"
             Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
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
    private TelerikGrid<SampleData> GridRef { get; set; }
    private MemoryStream exportedCsvStream { get; set; }
    private List<SampleData> GridData { get; set; }
    private bool ExportAllPages { get; set; }

    private async Task GetTheDataAsAStream()
    {
        var exportStream = await GridRef.ExportToCsvAsync();
        exportedCsvStream = new MemoryStream(exportStream.ToArray());
    }

    private async Task SaveAsCsvWithOptions()
    {
        await GridRef.SaveAsCsvFileAsync(new GridCsvExportOptions()
        {
            FileName = "custom-export",
            Data = GridData.Take(10).ToList(),
            Columns = new List<GridCsvExportColumn>()
            {
                new GridCsvExportColumn() { Field = nameof(SampleData.ProductId) },
                new GridCsvExportColumn() { Field = nameof(SampleData.ProductName) }
            }
        });
    }

    private async Task ExportToCsvWithOptions()
    {
        var exportStream = await GridRef.ExportToCsvAsync(new GridCsvExportOptions()
        {
            Data = GridData.Take(10).ToList(),
            Columns = new List<GridCsvExportColumn>()
            {
                new GridCsvExportColumn() { Field = nameof(SampleData.ProductId) },
                new GridCsvExportColumn() { Field = nameof(SampleData.ProductName) }
            }
        });
        exportedCsvStream = new MemoryStream(exportStream.ToArray());
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

## Customization

To customize the exported file, handle the `OnBeforeExport` or `OnAfterExport` events the Grid exposes. 

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns, such as `Width`, `Title`, and more.

For more advanced customizations (such as coloring the headers, bolding the titles, or even changing cell values) the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license.

[Read more about how to customize the exported file...](slug:grid-export-events)

## Notes

The CSV export has the following specifics:

* Column widths are not applied because a CSV document does not have such a concept. You can use any units in the grid itself, they will not be reflected in the exported document. If you need to add such structure, consider [exporting to an Excel file](slug:grid-export-excel).
* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in a Field in the model, or create your own Excel file. Find a <a href="https://feedback.telerik.com/blazor/1485764-customize-the-excel-file-before-it-gets-to-the-client" target="_blank">project example on how to generate your own exported file</a>.

@[template](/_contentTemplates/grid/export.md#export-common-notes)

## See Also

  * [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
  * [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
  * [Custom cell formatting of the exported file with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing) 
  * [Format numbers and dates in the exported CSV file from the Grid](slug:grid-kb-number-formatting-of-the-csv-export)
  * [Change the default CSV delimiter (comma) during Grid export](slug:grid-kb-csv-export-change-field-delimiter)
  * [Blazor Grid](slug:grid-overview)
