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

You can export the grid to Pdf with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.


#### In This Article

  - [Basics](#basics)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)
  - [Notes](#notes)
  - [Custom Export](#custom-export)

## Basics

To enable the Grid Pdf Export, add a [command button]({%slug components/grid/columns/command%}) with the `PdfExport` command name to the [Grid toolbar]({%slug components/grid/features/toolbar%}).

````RAZOR.skip-repl
<GridToolBarTemplate>
    <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to Pdf</GridCommandButton>
</GridToolBarTemplate>
````

Optionally, you can also set the `GridPdfExport` tag settings under the `GridExport` tag to subscribe to [Grid export events]({%slug grid-export-events%}) that allow further customizations of the exported columns/data or configure the Pdf export options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | the name of the file. The grid will add the `.xslx` extension for you. |
| `AllPages` | `bool` |  whether to export the current page only, or the entire data from the data source. |
| `PaperSize` | `GridPdfExportPaperSize` enum | The size of the paper for the xported file. |
| `PageOrientation` | `GridPdfExportPageOrientation` enum| The orientation of the page - portrait and landscape. |
 
>caption Export the Grid to Pdf - Example

````RAZOR
@* You can sort, group, filter, page the grid, resize and reodrder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true" >

    <GridToolBarTemplate>
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to Pdf</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
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

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

* `SaveAsPdfFileAsync` - `ValueTask` - sends the exported Pdf file to the browser for download.
* `ExportToPdfAsync` - `Task<MemoryStream>` - returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Invoke the export function from code

````RAZOR
@* Send the exported file for download and get the exported data as a memory stream *@

@using System.IO

<TelerikButton OnClick="@(async () => await GridRef.SaveAsPdfFileAsync())">Download the Pdf file</TelerikButton>
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
        <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to Pdf</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
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

    private MemoryStream exportedPdfStream { get; set; }

    private async Task GetTheDataAsAStream()
    {
        MemoryStream finalizedStream = await GridRef.ExportToPdfAsync();

        exportedPdfStream = new MemoryStream(finalizedStream.ToArray());
    }

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

## Customization

To customize the exported file, handle the `OnBeforeExport` or `OnAfterExport` events the Grid exposes. 

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns such as `Width`, `Title` and more.

For more advanced customization (such as coloring the headers or bolding the titles) the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license. Find examples on how to [format the cells of the exported Pdf file with RadSpreadProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadprocessing%}) and how to [format the cells of the exported Pdf file with RadSpreadStreamProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadstreamprocessing%}).

Read more about how to [customize the exported file]({%slug grid-export-events%}).

## Notes

The Pdf export has the following specifics:

* Pdf does not understand units different than `px` for the column `Width`, and if you use them (such as `rem` or `%`), it will fail to parse them and will render a collapsed (hidden) column with zero width.
* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in a Field in the model, or create your own Pdf file. Find a <a href="https://feedback.telerik.com/blazor/1485764-customize-the-Pdf-file-before-it-gets-to-the-client" target="_blank">project example on how to generate your own exported file</a>. Find additional information on how to [export an image that is rendered in a Grid column template]({%slug grid-export-image-column-Pdf%}).

@[template](/_contentTemplates/grid/export.md#export-common-notes)


## Custom Export  

The [Telerik Document Processing tools]({%slug dpl-in-blazor%}) that come with your Blazor license let you generate a PDF file based on the data in the grid.

The following sample projects show two ways to implement a PDF export

* <a href="https://github.com/telerik/blazor-ui/tree/master/grid/pdf-export-server" target="_blank">Export Grid to PDF on the Server</a> - gets the `DataSourceRequest` from the grid and sends it to the server service for processing. It is used to let you fetch the same data that the grid has (including paging, filtering, sorting) so you can generate the PDF. For WebAssembly apps, this improves the performance by not generating the file in the browser, which is, at the time of writing, too slow for a real-life scenario.

* <a href="https://github.com/telerik/blazor-ui/tree/master/common/pdf-jpg-export-js" target="_blank">PDF and JPG Export in the Browser with JS</a> - uses Kendo JS libraries to generate the PDF file from the current DOM in the browser.


You can also follow the feature request for <a href="https://feedback.telerik.com/blazor/1434269-export-grid-to-pdf" target="_blank">built-in Grid export to PDF</a>.

## See Also

* [Blazor Grid]({%slug grid-overview%})
* [Live Demo: Grid Pdf Export](https://demos.telerik.com/blazor-ui/grid/export-Pdf)
