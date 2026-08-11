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

You can customize the files exported to Excel, CSV, and PDF by using the `OnBeforeExport` and `OnAfterExport` events exposed by the corresponding Grid export tags.

## OnBeforeExport

The `OnBeforeExport` event fires after the user clicks an export command and before the export process starts. Use it to configure exported columns, provide a custom data collection, or cancel the export. The event arguments expose the export-specific column collection and `Data`/`IsCancelled` properties.

### For Excel Export

* `Columns` is a collection of `GridExcelExportColumn` objects. You can set `Width`, `Title`, `NumberFormat`, and `Field`.
* `Data` lets you export a custom collection, such as only selected Grid items.
* Set `IsCancelled` to `true` to prevent the export.

>caption Using the Grid OnBeforeExport with Excel export

<demo metaUrl="client/grid/export-events-excel-before/" height="550"></demo>

### For CSV Export

* `Columns` is a collection of `GridCsvExportColumn` objects. You can set `Title` and `Field`.
* `Data` lets you export a custom collection.
* Set `IsCancelled` to `true` to prevent the export.

>caption Using the Grid OnBeforeExport with CSV export

<demo metaUrl="client/grid/export-events-csv-before/" height="500"></demo>

### For PDF Export

* `Columns` is a collection of `GridPdfExportColumn` objects. You can set pixel `Width`, `Title`, `NumberFormat`, and `Field`.
* `Data` lets you export a custom collection.
* Set `IsCancelled` to `true` to prevent the export.

>caption Using the Grid OnBeforeExport with PDF export

<demo metaUrl="client/grid/export-events-pdf-before/" height="550"></demo>

## OnAfterExport

The `OnAfterExport` event fires after the export is generated and before the file is provided to the user. Its event arguments expose the finalized `MemoryStream`, which you can copy for further processing.

### For Excel Export

>caption Get the stream of the exported Excel file

<demo metaUrl="client/grid/export-events-excel-after/" height="450"></demo>

### For CSV Export

>caption Get the stream of the exported CSV file

<demo metaUrl="client/grid/export-events-csv-after/" height="450"></demo>

### For PDF Export

>caption Get the stream of the exported PDF file

<demo metaUrl="client/grid/export-events-pdf-after/" height="450"></demo>

## See Also

* [Grid Export to Excel](slug:grid-export-excel)
* [Grid Export to CSV](slug:grid-export-csv)
* [Grid Export to PDF](slug:grid-export-pdf)
* [Blazor Grid](slug:grid-overview)