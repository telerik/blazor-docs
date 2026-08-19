---
title: Export Events
page_title: Grid - Export Events
description: Export to Excel the Grid for Blazor.
slug: grid-export-events
tags: telerik,blazor,grid,export,events
published: True
position: 15
components: ["grid"]
---

# Export Events

You can customize the files exported to Excel and CSV by using the [OnBeforeExport](#onbeforeexport) and the [OnAfterExport](#onafterexport) events exposed to the `GridExcelExport` and `GridCsvExport` tags.

#### In This Article

  * [OnBeforeExport](#onbeforeexport)
    * [For Excel Export](#for-excel-export)
    * [For CSV Export](#for-csv-export)
    * [For PDF Export](#for-pdf-export)
  * [OnAfterExport](#onafterexport)
    * [For Excel Export](#for-excel-export-1)
    * [For CSV Export](#for-csv-export-1)
    * [For PDF Export](#for-pdf-export-1)

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicks the `ExcelExport` or `CsvExport` button and before the export process starts. You can use the event to configure the exported Grid columns or change the exported data. The event handler receives a `GridBeforeExcelExportEventArgs` and `GridBeforeCsvExportEventArgs` object, depending on the type of export, which provides the following properties:

### For Excel Export

* `Columns`&mdash;`List<GridExcelExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Width`&mdash;Define the width of the column **in pixels**.
    * `Title`&mdash;Define the column title to be shown in the Excel file header.
    * `NumberFormat`&mdash;Provide an Excel-compatible number/date format
    * `Field`&mdash;Set the data bound field of the column.

To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridExcelExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.


* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to Excel, [for example only the selected items in the Grid](slug:grid-kb-export-selected-rows).

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` property to `true`.

>caption Using the Grid OnBeforeExport with Excel export

<demo metaUrl="client/grid/export-events-excel-before/" height="550"></demo>

### For CSV Export

* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to CSV, [for example only the selected items in the Grid](slug:grid-kb-export-selected-rows).

* `Columns`&mdash;`List<GridCsvExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into Excel:

    * `Title`&mdash;Define the column title to be shown in the Excel file header.
    * `Field`&mdash;Set the data bound field of the column.

To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridCsvExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` field to `true`.

<demo metaUrl="client/grid/export-events-csv-before/" height="500"></demo>

### For PDF Export

* `Columns`&mdash;`List<GridPdfExportColumn>`&mdash;A collection of all exportable columns in the Grid. These are all visible `GridColumn` instances. You can customize the following attributes of the Grid column before exporting it into PDF:

    * `Width`&mdash;Define the width of the column **in pixels**.
    * `Title`&mdash;Define the column title to be shown in the PDF file header.
    * `NumberFormat`&mdash;Provide a PDF-compatible number/date format.
    * `Field`&mdash;Set the data bound field of the column.

To export a hidden Grid column that has its `Visible` parameter set to `false`, you can manually define an instance of the `GridPdfExportColumn` in the handler for the `OnBeforeExport` event and add that column to the `args.Columns` collection.

* `Data`&mdash;`IEnumerable<object>`&mdash;Assign a custom collection of data to be exported to PDF, [for example only the selected items in the Grid](slug:grid-kb-export-selected-rows).

* `isCancelled`&mdash; `bool`&mdash;Cancel the `OnBeforeExcel` event by setting the `isCancelled` property to `true`.

>caption Using the Grid OnBeforeExport with PDF export

<demo metaUrl="client/grid/export-events-pdf-before/" height="550"></demo>

## OnAfterExport

The `OnAfterExport` event fires after [OnBeforeExport](#onbeforeexport) and before the generated file is provided to the user. You can use the event to make changes to the exported file. The event handler receives a `GridAfterExcelExportEventArgs` or `GridAfterCsvExportEventArgs` object, depending on the type of export, which provides the following fields:

### For Excel Export

* `Stream`&mdash;`MemoryStream`&mdash;The output of the Excel export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported Excel file

<demo metaUrl="client/grid/export-events-excel-after/" height="450"></demo>

### For CSV Export

* `Stream`&mdash;`MemoryStream`&mdash;The output of the CSV export as a `MemoryStream`. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported CSV file

<demo metaUrl="client/grid/export-events-csv-after/" height="450"></demo>

### For PDF Export

* `Stream`&mdash;`MemoryStream`&mdash;The output of the PDF export as a memory stream. The stream itself is finalized, so that the resource does not leak. To read and work with the stream, clone its available binary data to a new `MemoryStream` instance.

>caption Get the stream of the exported PDF file

<demo metaUrl="client/grid/export-events-pdf-after/" height="450"></demo>

## See Also

* [Grid Excel Export](slug:grid-export-excel)
* [Grid CSV Export](slug:grid-export-csv)
* [Grid PDF Export](slug:grid-export-pdf)
* [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Custom cell formatting of the exported file with RadSpreadStreamProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadstreamprocessing)
* [Format numbers and dates in the exported CSV file from the Grid](slug:grid-kb-number-formatting-of-the-csv-export)
* [Change the default CSV delimiter (comma) during Grid export](slug:grid-kb-csv-export-change-field-delimiter)
* [Blazor Grid](slug:grid-overview)
*