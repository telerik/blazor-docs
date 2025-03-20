---
title: PDF
page_title: Grid - PDF Export
description: Export to PDF the Grid for Blazor.
slug: grid-export-pdf
tags: telerik,blazor,grid,export,pdf
published: True
position: 7
---

# Grid PDF Export

You can export the Grid to PDF with the click of a button. The current filter, sort, page, grouping, column order, and column size are applied to the exported PDF document.

When you click the Export button, your browser will receive the resulting file.

#### In This Article

  - [Basics](#basics)
  - [How It Works](#how-it-works)
  - [Requirements](#requirements)
  - [Limitations](#limitations)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)
  - [Custom Export](#custom-export)

## Basics

To enable users to export the Grid to PDF, add a [command button](slug:components/grid/columns/command) with the `PdfExport` command name to the [Grid toolbar](slug:components/grid/features/toolbar).

````RAZOR.skip-repl
<GridToolBarTemplate>
    <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to Pdf</GridCommandButton>
</GridToolBarTemplate>
````

Optionally, you can also set the `GridPdfExport` tag settings under the `GridExport` tag to subscribe to the [Grid export events](slug:grid-export-events) that allow further customization of the exported columns/data or configure the PDF export options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | The name of the file. The Grid will add the `.pdf` extension for you. |
| `AllPages` | `bool` |  Whether to export the current page only, or the entire data from the data source. |
| `PaperSize` | `GridPdfExportPaperSize` enum <br/> (`A4`) | The size of the paper for the exported file. |
| `PageOrientation` | `GridPdfExportPageOrientation` enum <br/> (`Portrait`)| The orientation of the page&mdash;portrait or landscape. |
 
> Before enabling the export feature, ensure you are familiar with [its specifics](slug:grid-export-overview#how-it-works).

>caption Export the Grid to PDF

````RAZOR
@* You can sort, group, filter, page the grid, resize and reorder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Groupable="true"
             Pageable="true"
             Reorderable="true"
             Resizable="true"             
             Sortable="true"
             Width="650px">
    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to PDF</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="200px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="150px" />
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
                Price = 3.15m * x,
                Discontinued = x % 4 == 0,
            }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## How It Works

* For performance reasons, the PDF export mechanism draws each cell value on a single line. Any content that does not fit in the available space will be clipped. Text wrapping and PDF column resizing is not supported.
* Exporting to PDF in UI for Blazor is different from exporting in Kendo jQuery, where the full HTML is exported. The Blazor export to PDF will export the Grid to a table, similar to an Excel table. If you want [to export to PDF as HTML, you can use a custom approach](#custom-export).

## Requirements

* PDF export requires pixel widths for all columns. Widths in other units such as `%` or `em` cannot be translated correctly and the respective columns will collapse in the exported PDF file. The column widths for the PDF export can differ from the ones in the Grid configuration for the web browser. To set column widths for the PDF file only, use the `Width` property of the [`OnBeforeExportEventArgs.Columns`](slug:grid-export-events#for-pdf-export) members.
* Provide appropriate `PaperSize` and `PageOrientation` properties. For example, if you want to render 20 columns (100px each) in an A4 sheet, then this will yield unexpected results. The column dimensions in a PDF file are fixed, thus they cannot be resized as in Excel, which requires the developer to ensure proper export dimensions.

## Limitations

* Some PDF fonts do not include Cyrillic or other non-Latin characters. In such cases, [load a compatible font explicitly](https://docs.telerik.com/devtools/document-processing/knowledge-base/pdfprocessing-implement-fontsprovider).

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Type | Description |
| --- | --- | --- |
| `ExportToPdfAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. |
| `SaveAsPdfFileAsync` | `ValueTask` | Sends the exported PDF file to the browser for download. |

>caption Invoke the PDF export function from code

````RAZOR
@* Send the exported file for download and get the exported data as a memory stream *@

@using System.IO

<TelerikButton OnClick="@(async () => await GridRef.SaveAsPdfFileAsync())">Download the PDF file</TelerikButton>
<TelerikButton OnClick="@GetTheDataAsAStream">Get the Exported Data as a MemoryStream</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Groupable="true"
             Pageable="true"
             Reorderable="true"
             Resizable="true"
             Sortable="true"            
             Width="650px">
    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to PDF</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="200px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="150px" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleData> GridRef { get; set; }

    private MemoryStream ExportedPdfStream { get; set; }

    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

    private async Task GetTheDataAsAStream()
    {
        MemoryStream finalizedStream = await GridRef.ExportToPdfAsync();

        ExportedPdfStream = new MemoryStream(finalizedStream.ToArray());
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = $"Product {x}",
                UnitsInStock = x * 2,
                Price = 3.15m * x,
                Discontinued = x % 4 == 0,
            }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Customization

To customize the exported file, handle the `OnBeforeExport` or `OnAfterExport` events the Grid exposes. 

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns such as `Width`, `Title`, and more. The [column widths in the exported PDF file must be large enough, so that the cell content fits](#notes). Text wrapping is not supported.

For more advanced customization the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`PdfProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview) library that is available with your license.

Read more about how to [customize the exported file](slug:grid-export-events).

## Custom Export

If you want to have full control over the PDF export, you can perform it with a custom approach.

The following sample projects show two ways to implement a PDF export

* <a href="https://github.com/telerik/blazor-ui/tree/master/grid/pdf-export-server" target="_blank">Export Grid to PDF on the Server</a> - This export is achieved through the [Telerik Document Processing tools](slug:dpl-in-blazor) that come with your Blazor license. The example shows how to get the `DataSourceRequest` from the Grid and send it to the server service for processing. Thus, you can fetch the same data that the Grid has (including paging, filtering, sorting) so you can generate the PDF. For WebAssembly apps, this improves the performance by not generating the file in the browser, which is, at the time of writing, too slow for a real-life scenario.

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/pdf-jpg-export-js" target="_blank">PDF and JPG Export in the Browser with JS</a> - This sample uses Kendo JS libraries to generate the PDF file from the current DOM in the browser.

## See Also

* [Blazor Grid](slug:grid-overview)
* [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
* [Sowing a Loader While Exporting the Grid](slug:grid-kb-show-loader-while-exporting)
* [Loading Cyrillic Fonts When Exporting the Grid to PDF](slug:grid-kb-load-cyrillic-fonts-in-pdf-export)