---
title: Excel
page_title: Grid - Excel Export
description: Export to Excel the Grid for Blazor.
slug: grid-export-excel
tags: telerik,blazor,grid,export,excel
published: True
position: 1
---

# Excel Export

You can export the grid to Excel with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.


#### In This Article

  - [Basics](#basics)
  - [Programmatic Export](#programmatic-export)
  - [Customization](#customization)
  - [Notes](#notes)

## Basics

To enable the Grid Excel Export, add a [command button]({%slug components/grid/columns/command%}) with the `ExcelExport` command name to the [Grid toolbar]({%slug components/grid/features/toolbar%}).

````
<GridToolBarTemplate>
    <GridCommandButton Command="ExcelExport" Icon="@FontIcon.FileExcel">Export to Excel</GridCommandButton>
</GridToolBarTemplate>
````

Optionally, you can also set the `GridExcelExport` tag settings under the `GridExport` tag to choose:

* `FileName` - the name of the file. The grid will add the `.xslx` extension for you.
* `AllPages` - whether to export the current page only, or the entire data from the data source.
* Subscribe to [Grid export events]({%slug grid-export-events%}) that allow further customizations of the exported columns or data.

>caption Export the Grid to Excel - Example

````CSHTML
@* You can sort, group, filter, page the grid, resize and reodrder its columns, and you can click the
    Export button to save the current data *@

<TelerikGrid Data="@GridData" Pageable="true" Sortable="true" Resizable="true" Reorderable="true"
             FilterMode="@GridFilterMode.FilterRow" Groupable="true" >

    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@FontIcon.FileExcel">Export to Excel</GridCommandButton>
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

* `SaveAsExcelFileAsync` - `ValueTask` - sends the exported excel file to the browser for download.
* `ExportToExcelAsync` - `Task<MemoryStream>` - returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>note The same methods are exposed for exporting a [CSV file]({%slug grid-export-csv%}#programmatic-export-from-code).

>caption Invoke the export function from code

````CSHTML
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
        <GridCommandButton Command="ExcelExport" Icon="@FontIcon.FileExcel">Export to Excel</GridCommandButton>
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

    private async Task GetTheDataAsAStream()
    {
        MemoryStream finalizedStream = await GridRef.ExportToExcelAsync();

        exportedExcelStream = new MemoryStream(finalizedStream.ToArray());
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

For more advanced customization (such as coloring the headers or bolding the titles) the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license.

[Read more about how to customize the exported file...]({%slug grid-export-events%})

## Notes

The Excel export has the following specifics:

* Excel does not understand units different than `px` for the column `Width`, and if you use them (such as `rem` or `%`), it will fail to parse them and will render a collapsed (hidden) column with zero width.

@[template](/_contentTemplates/grid/export.md#export-common-notes)


## See Also

  * [Live Demo: Grid Excel Export](https://demos.telerik.com/blazor-ui/grid/export-excel)
  * [Custom cell formatting of the exported file with RadSpreadProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadprocessing%})
  * [Custom cell formatting of the exported file with RadSpreadStreamProcessing]({%slug grid-kb-custom-cell-formatting-with-radspreadstreamprocessing%}) 
