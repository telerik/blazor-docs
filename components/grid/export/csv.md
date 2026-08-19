---
title: CSV
page_title: Grid - CSV Export
description: Export to CSV the Grid for Blazor.
slug: grid-export-csv
tags: telerik,blazor,grid,export,csv
published: True
position: 3
components: ["grid"]
---

# Grid CSV Export

You can export the grid to CSV with a click of a button. The current filter, sort, page, grouping and column order are applied to the `.csv` document.

When you click the Export button, your browser will receive the resulting file.

>tip Make sure to get familiar with all the [general export documentation first](slug:grid-export-overview).

#### In This Article

  * [Basics](#basics)
  * [Programmatic Export](#programmatic-export)
  * [Customization](#customization)

## Basics

To enable the CSV export in the Grid:

1. [Add the Export Tool](#add-the-export-tool)
1. [Configure the Export Settings](#configure-the-export-settings)

### Add the Export Tool

Add the `GridToolBarCsvExportTool` inside the [`<GridToolBar>`](slug:components/grid/features/toolbar#command-tools):

````RAZOR.skip-repl
<GridToolBar>        
    <GridToolBarCsvExportTool>
        Export to CSV
    </GridToolBarCsvExportTool>
</GridToolBar>
````

If you have a custom Toolbar, add a command button with the `CsvExport` command name inside a [templated Grid Toolbar](slug:components/grid/features/toolbar#custom-toolbar-configuration)(`<GridToolBarTemplate>`).

### Configure the Export Settings

To configure the CSV export settings, add the `GridCsvExport` tag under the `GridExport` tag. You may set the following options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `FileName` | `string` | The name of the file. The grid will add the `.csv` extension for you. |
| `AllPages` | `bool` | Whether to export the current page only, or the entire data from the data source. |

For further customizations, use the `GridExcelExport` tag to subscribe to the [Grid export events](slug:grid-export-events).

>caption Export the Grid to CSV

<demo metaUrl="client/grid/export-csv/" height="550"></demo>

## Programmatic Export

You can programmatically invoke the export feature of the Grid, by using the following methods exposed on the `@ref` of the Grid:

| Method | Type | Description |
| --- | --- | --- |
| `SaveAsCsvFileAsync` | `ValueTask` | Sends the exported CSV file to the browser for download. You can pass [`GridCsvExportOptions`](slug:Telerik.Blazor.Components.TelerikGrid-1) to customize the export. |
| `ExportToCsvAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. You can pass [`GridCsvExportOptions`](slug:Telerik.Blazor.Components.Grid.GridCsvExportOptions) to customize the export. |

When exporting programmatically with a `GridCsvExportOptions` argument:

* The `Columns` and `Data` properties of `GridCsvExportOptions` are required.
* Multi-column headers are not supported.

>caption Invoke the export function from code

<demo metaUrl="client/grid/export-csv-programmatic/" height="600"></demo>

## Customization

To customize the exported file, handle the `OnBeforeExport` or `OnAfterExport` events the Grid exposes. 

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns, such as `Width`, `Title`, and more.

For more advanced customizations (such as formatting the numbers and dates, or changing the default comma delimiter) the Grid lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license.

[Read more about how to customize the exported file...](slug:grid-export-events)


## See Also

* [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
* [Format numbers and dates in the exported CSV file from the Grid](slug:grid-kb-number-formatting-of-the-csv-export)
* [Change the default CSV delimiter (comma) during Grid export](slug:grid-kb-csv-export-change-field-delimiter)
* [Sowing a Loader While Exporting the Grid](slug:grid-kb-show-loader-while-exporting)
* [Blazor Grid](slug:grid-overview)
