---
title: PDF
page_title: Grid - PDF Export
description: Export to PDF the Grid for Blazor.
slug: grid-export-pdf
tags: telerik,blazor,grid,export,pdf
published: True
position: 1
---

# PDF Export

You can export the Grid to PDF with the click of a button. The current filter, sort, page, grouping, column order, and column size are applied to the exported PDF document.

When you click the Export button, your browser will receive the resulting file.

#### In This Article

  - [Basics](#basics)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)
  - [Notes](#notes)
  - [Custom Export](#custom-export)

## Basics

To enable the Grid PDF Export, add a [command button](slug:components/grid/columns/command) with the `PdfExport` command name to the [Grid toolbar](slug:components/grid/features/toolbar).

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
 
>caption Export the Grid to PDF - Example

````RAZOR
@* You can sort, group, filter, page the grid, resize and reodrder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true"
             Sortable="true"
             Reorderable="true"
             Resizable="true"
             Groupable="true"
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
                Price = 3.14159m * x,
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

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Type | Description |
| --- | --- | --- |
| `ExportToPdfAsync` | `Task<MemoryStream>` | returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. |
| `SaveAsPdfFileAsync` | `ValueTask` | sends the exported PDF file to the browser for download. |

>caption Invoke the export function from code

````RAZOR
@* Send the exported file for download and get the exported data as a memory stream *@

@using System.IO

<TelerikButton OnClick="@(async () => await GridRef.SaveAsPdfFileAsync())">Download the PDF file</TelerikButton>
<TelerikButton OnClick="@GetTheDataAsAStream">Get the Exported Data as a MemoryStream</TelerikButton>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             FilterMode="@GridFilterMode.FilterMenu"
             Pageable="true"
             Sortable="true"
             Reorderable="true"
             Resizable="true"
             Groupable="true"
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

    private MemoryStream exportedPdfStream { get; set; }

    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

    private async Task GetTheDataAsAStream()
    {
        MemoryStream finalizedStream = await GridRef.ExportToPdfAsync();

        exportedPdfStream = new MemoryStream(finalizedStream.ToArray());
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

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns such as `Width`, `Title` and more.

For more advanced customization the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`PdfProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radpdfprocessing/overview) library that is available with your license.

Read more about how to [customize the exported file](slug:grid-export-events).

## Notes

The PDF export has the following specifics:

* When exporting Grid columns, the developer must provide column widths that are appropriate for exporting the data. While an Excel file allows resizing its columns, the PDF file format does not allow resizing the columns. You can change the width of the column from the [`OnBeforeExportEventArgs.Columns[0].Width property`](slug://grid-export-events#for-pdf-export), so you have full control over this value (note that it can be different from the one defined in the corresponding Grid column, thus ensuring flexibility to render the Grid columns with one width and export them with another).
* Avoid exporting columns without widths&mdash;while Excel has a default width for a column,  PDF requires fixed dimensions. Set specific widths to all columns  when exporting (note that this is unrelated to the width of the column as the export width can be configured through the [`OnBeforeExport` event](slug://grid-export-events#for-pdf-export).
* PDF does not understand units different than `px` for the column `Width`, and if you use them (such as `rem` or `%`), it will fail to parse them and will render a collapsed (hidden) column with zero width.
* When exporting Grid columns, you must provide appropriate `PaperSize` and `PageOrientation` properties. For example, if you want to render 20 columns (100px each) in an A4 sheet, then this will yield unexpected results. The column dimensions in a PDF file are fixed, thus they cannot be resized as in Excel, which requires the developer to ensure proper export dimensions.
* Exporting to PDF in UI for Blazor is different from exporting in Kendo jQuery, where the full HTML is exported. The Blazor export to PDF will export the Grid to a table, similar to an Excel table. If you want [to export to PDF as HTML, you can use a custom approach](#custom-export).
* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in a Field in the model, or create your own PDF file. Find a <a href="https://feedback.telerik.com/blazor/1485764-customize-the-Pdf-file-before-it-gets-to-the-client" target="_blank">project example on how to generate your own exported file</a>. Find additional information on how to [export an image that is rendered in a Grid column template](slug:grid-export-image-column-Pdf).

@[template](/_contentTemplates/grid/export.md#export-common-notes)


## Custom Export

If you want to have full control over the PDF export, you can perform it with a custom approach.

The following sample projects show two ways to implement a PDF export

* <a href="https://github.com/telerik/blazor-ui/tree/master/grid/pdf-export-server" target="_blank">Export Grid to PDF on the Server</a> - This export is achieved through the [Telerik Document Processing tools](slug:dpl-in-blazor) that come with your Blazor license. The example shows how to get the `DataSourceRequest` from the Grid and send it to the server service for processing. Thus, you can fetch the same data that the Grid has (including paging, filtering, sorting) so you can generate the PDF. For WebAssembly apps, this improves the performance by not generating the file in the browser, which is, at the time of writing, too slow for a real-life scenario.

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/pdf-jpg-export-js" target="_blank">PDF and JPG Export in the Browser with JS</a> - This sample uses Kendo JS libraries to generate the PDF file from the current DOM in the browser.

## See Also

* [Blazor Grid](slug:grid-overview)
* [Live Demo: Grid PDF Export](https://demos.telerik.com/blazor-ui/grid/export-pdf)
