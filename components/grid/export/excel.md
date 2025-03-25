---
title: Excel
page_title: Grid - Excel Export
description: Export to Excel the Grid for Blazor.
slug: grid-export-excel
tags: telerik,blazor,grid,export,excel
published: True
position: 5
---

# Grid Excel Export

You can export the grid to Excel with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.


#### In This Article

  - [Basics](#basics)
  - [Requirements](#requirements)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)

## Basics

To enable the Grid Excel Export, add a [command button](slug:components/grid/columns/command) with the `ExcelExport` command name to the [Grid toolbar](slug:components/grid/features/toolbar).

````RAZOR.skip-repl
<GridToolBarTemplate>
    <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
</GridToolBarTemplate>
````

Optionally, you can also set the `GridExcelExport` tag settings under the `GridExport` tag to subscribe to the [Grid export events](slug:grid-export-events) that allow further customization of the exported columns/data or configure the Excel export options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | The name of the file. The grid will add the `.xslx` extension for you. |
| `AllPages` | `bool` | Whether to export the current page only, or the entire data from the data source. |

> Before enabling the export feature, ensure that you are familiar with [its specifics](slug:grid-export-overview#how-the-export-works).

>caption Export the Grid to Excel - Example

````RAZOR
@* You can sort, group, filter, page the grid, resize and reodrder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true" >

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
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


## Requirements

The Excel export has the following requirement:

* When setting column `Width`, use only `px`. Excel cannot parse units different than `px` (e.g., `rem` or `%`) and renders a collapsed (hidden) column with zero width. This is an Excel limitation.

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

| Method | Type | Description |
| --- | --- | --- |
| `SaveAsExcelFileAsync` | `ValueTask` | Sends the exported excel file to the browser for download. |
| `ExportToExcelAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. |

>note The same methods are exposed for exporting a [CSV file](slug:grid-export-csv#programmatic-export).

>caption Invoke the export function from code

````RAZOR
@* Send the exported file for download and get the exported data as a memory stream *@

@using System.IO

<TelerikButton OnClick="@(async () => await GridRef.SaveAsExcelFileAsync())">Download the excel file</TelerikButton>
<TelerikButton OnClick="@GetTheDataAsAStream">Get the Exported Data as a MemoryStream</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             Sortable="true"
             Resizable="true"
             Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Groupable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
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

    private MemoryStream exportedExcelStream { get; set; }

    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

    private async Task GetTheDataAsAStream()
    {
        MemoryStream finalizedStream = await GridRef.ExportToExcelAsync();

        exportedExcelStream = new MemoryStream(finalizedStream.ToArray());
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

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns such as `Width`, `Title` and more.

For more advanced customization (such as coloring the headers or bolding the titles) the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license. Find examples on how to [format the cells of the exported Excel file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing) and how to [format the cells of the exported Excel file with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing).

Read more about how to [customize the exported file](slug:grid-export-events).

## See Also

  * [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
  * [Custom Cell Formatting of the Exported File with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
  * [Custom Cell Formatting of the Exported File with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing)
  * [Showing a Loader While Exporting the Grid](slug:grid-kb-show-loader-while-exporting)
  * [Blazor Grid](slug:grid-overview)
