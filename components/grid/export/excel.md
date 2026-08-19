---
title: Excel
page_title: Grid - Excel Export
description: Export to Excel the Grid for Blazor.
slug: grid-export-excel
tags: telerik,blazor,grid,export,excel
published: True
position: 5
components: ["grid"]
---

# Grid Excel Export

You can export the grid to Excel with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.

>tip Make sure to get familiar with all the [general export documentation first](slug:grid-export-overview).

#### In This Article

  * [Basics](#basics)
  * [Programmatic Export](#programmatic-export)
  * [Customization](#customization)

## Basics

To enable the Excel export in the Grid:

1. [Add the Export Tool](#add-the-export-tool)
1. [Configure the Export Settings](#configure-the-export-settings)
1. [Set the Columns Width in Pixels](#set-the-columns-width-in-pixels)

### Add the Export Tool

Add the `GridToolBarExcelExportTool` inside the [`<GridToolBar>`](slug:components/grid/features/toolbar#command-tools):

````RAZOR.skip-repl
<GridToolBar>        
    <GridToolBarExcelExportTool>
        Export to Excel
    </GridToolBarExcelExportTool>
</GridToolBar>
````

If you have a custom Toolbar, add a command button with the `ExcelExport` command name inside a [templated Grid Toolbar](slug:components/grid/features/toolbar#custom-toolbar-configuration)(`<GridToolBarTemplate>`).

### Configure the Export Settings

To configure the Excel export settings, add the `GridExcelExport` tag under the `GridExport` tag. You may set the following options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | The name of the file. The grid will add the `.xslx` extension for you. |
| `AllPages` | `bool` | Whether to export the current page only, or the entire data from the data source. |

For further customizations, use the `GridExcelExport` tag to subscribe to the [Grid export events](slug:grid-export-events).

### Set the Columns Width in Pixels

The export to Excel does not require that all columns have explicit widths set. However, if you do set the column widths, ensure you use only `px`. 

Excel cannot parse units different than `px` (e.g., `rem` or `%`) and renders a collapsed (hidden) column with zero width. This is an Excel limitation. If you prefer to use different than `px` units in the UI, handle the [`OnBeforeExport` event to provide the column width in pixels for the proper export](slug:grid-export-events#for-excel-export).

>caption Export the Grid to Excel

<demo metaUrl="client/grid/export-excel/"></demo>

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

| Method | Type | Description |
| --- | --- | --- |
| `SaveAsExcelFileAsync` | `ValueTask` | Sends the exported Excel file to the browser for download. You can pass [`GridExcelExportOptions`](slug:Telerik.Blazor.Components.Grid.GridExcelExportOptions) to customize the export. |
| `ExportToExcelAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. You can pass [`GridExcelExportOptions`](slug:Telerik.Blazor.Components.Grid.GridExcelExportOptions) to customize the export. |

When exporting programmatically with a `GridExcelExportOptions` argument:

* The `Columns` and `Data` properties of `GridExcelExportOptions` are required.
* Multi-column headers are not supported.

>caption Invoke the export function from code

<demo metaUrl="client/grid/export-excel-programmatic/"/></demo>

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
