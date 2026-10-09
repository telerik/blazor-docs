---
title: Excel
page_title: TreeList - Excel Export
description: Export to Excel the TreeList for Blazor.
slug: treelist-export-excel
tags: telerik,blazor,treelist,export,excel
published: True
position: 5
components: ["treelist"]
---

# TreeList Excel Export

You can export the grid to Excel with a click of a button. The current filter, sort, page, grouping, column order and column size are applied to the `xlsx` document.

When you click the Export button, your browser will receive the resulting file.

>tip Make sure to get familiar with all the [general export documentation first](slug:treelist-export-overview).

#### In This Article

* [Basics](#basics)
* [Programmatic Export](#programmatic-export)
* [Customization](#customization)

## Basics

To enable the Excel export in the TreeList:

1. [Add the Export Tool](#add-the-export-tool)
1. [Configure the Export Settings](#configure-the-export-settings)
1. [Set the Column Widths in Pixels](#set-the-column-widths-in-pixels)

If the TreeList has a column with an `Expandable="true"` setting, this column must be the first one during export. Otherwise, the cell colspans and cell layout in the exported Excel file will be incorrect.

### Add the Export Tool

Add a `TreeListCommandButton` with `Command="ExcelExport"` and optional `Icon` inside the [`<TreeListToolBarTemplate>`](slug:treelist-toolbar):

````RAZOR.skip-repl
<TreeListToolBarTemplate>
    <TreeListCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</TreeListCommandButton>
</TreeListToolBarTemplate>
````

### Configure the Export Settings

To configure the Excel export settings, add the `TreeListExcelExport` tag under the `TreeListExport` tag. You can set the following options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AllPages` | `bool` | Whether to export the current page only, or the entire data from the data source. |
| `ExpandAll` | `bool` | Whether to expand all parent items, so that the children are exported too. |
| `FileName` | `string` | The name of the file. The grid will add the `.xslx` extension for you. |

>caption Using TreeList Excel Export Settings

````RAZOR.skip-repl
<TreeListExport>
    <TreeListExcelExport AllPages="true" ExpandAll="true" FileName="telerik-treelist-export" />
</TreeListExport>
````

For further customizations, use the `TreeListExcelExport` tag to subscribe to the [TreeList export events](slug:treelist-export-events).

### Set the Column Widths in Pixels

The export to Excel does not require that all columns have explicit widths set. However, if you do set the column widths, ensure you use only `px`. 

Excel cannot parse units different than `px` (e.g., `rem` or `%`) and renders a collapsed (hidden) column with zero width. This is an Excel limitation. If you prefer to use different than `px` units in the UI, handle the [`OnBeforeExport` event to provide the column width in pixels for the proper export](slug:treelist-export-events).

>caption Export the TreeList to Excel

<demo metaUrl="client/treelist/export/excel/example-1/" height="720"></demo>

## Programmatic Export

You can programmatically invoke the export feature of the TreeList, by using the following methods exposed on the `@ref` of the TreeList:

| Method | Type | Description |
| --- | --- | --- |
| `SaveAsExcelFileAsync` | `ValueTask` | Sends the exported Excel file to the browser for download. You can pass [`TreeListExcelExportOptions`](slug:Telerik.Blazor.Components.TreeListExcelExportOptions) to customize the export. |
| `ExportToExcelAsync` | `Task<MemoryStream>` | Returns the exported data as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance. You can pass [`TreeListExcelExportOptions`](slug:Telerik.Blazor.Components.TreeListExcelExportOptions) to customize the export. |

When exporting programmatically with a `TreeListExcelExportOptions` argument, the `Columns` and `Data` properties of `TreeListExcelExportOptions` are required.

>caption Invoke the export function from code

<demo metaUrl="client/treelist/export/excel/example-2/" height="720"></demo>

## Customization

To customize the exported file, handle the `OnBeforeExport` or `OnAfterExport` events the TreeList exposes. 

The component allows you to control the data set that will be exported. It also provides built-in customization options for the columns such as `Width`, `Title` and more.

For more advanced customization (such as coloring the headers or bolding the titles) the TreeList lets you get the `MemoryStream` of the file. Thus, you can customize it using the [`SpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) or the [`SpreadStreamProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) libraries that are available with your license. Find examples on how to [format the cells of the exported Excel file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing) and how to [format the cells of the exported Excel file with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing).

Read more about how to [customize the exported file](slug:treelist-export-events).

## See Also

* [Live Demo: TreeList Export](https://demos.telerik.com/blazor-ui/treelist/excel-export)
* [Custom Cell Formatting of the Exported File with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Custom Cell Formatting of the Exported File with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing)
* [Showing a Loader While Exporting](slug:grid-kb-show-loader-while-exporting)
