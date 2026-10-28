---
title: Overview
page_title: Grid - Export Overview
description: Learn how to export Telerik UI for Blazor Grid data to CSV, Excel, and PDF files and customize the exported content.
slug: grid-export-overview
tags: telerik, blazor, grid, export
published: True
position: 1
components: ["grid"]
---

# Grid Export Overview

The Telerik UI for Blazor Grid provides built-in functionality to export data to the following formats:
* [CSV](slug:grid-export-csv)
* [Excel](slug:grid-export-excel)
* [PDF](slug:grid-export-pdf)

Before proceeding to the dedicated export articles, ensure you are familiar with the following information:

## How the Export Works

The Grid export feature has the following specifics:

* If the Grid is using `OnRead` and is exporting all pages, it will fire an additional `OnRead` event at the time of exporting, with a request `PageSize` of `0`. This will enable the component to obtain all data.
* Export takes longer when:
    * The Grid has a lot of records.
    * The Grid is in a WebAssembly app where all the code runs in the browser and in one thread.

>tip While the file is being generated, the UI will be unresponsive, so you may want to [show a loading sign to the user during the export process](slug:grid-kb-show-loader-while-exporting).

## Requirements

In server-side Blazor apps, the file may become larger than the default SignalR message size limit. This can disconnect the client and result in an error. You may need to [increase the maximum SignalR message size](slug:common-kb-increase-signalr-max-message-size).

## Limitations

The Grid export feature has the following limitations:

* Templates are not exported because the framework does not provide a way to get `RenderFragment` content at runtime. Column, header, and group header or footer templates are ignored. Headers in the exported file match the column `Title`, and exported values match the column `Field`. To include additional information, add it to a model property or create a custom file. See the [project example for generating a custom exported file](https://feedback.telerik.com/blazor/1485764-customize-the-Pdf-file-before-it-gets-to-the-client). You can also learn how to [export an image rendered in a Grid column template](slug:grid-export-image-column-excel).
* `bool` fields are exported as `TRUE` or `FALSE` strings, because there is no native boolean data type in the exported formats and these string values are the most common ones used in data and macros.
* Dates are exported in the following format: `mm/dd/yyyy hh:mm:ss` plus the current app culture AM/PM specifier. Excel date formats differ from .NET date formats, and Excel may not always recognize the column as a date, for example, if the entire date format from the .NET culture is used. To customize the date formats, use the [Export Events](slug:grid-export-events).
* Numbers are exported in the following format which uses the current thread culture: `Convert.ToDouble(value)`. To customize the number formats use the [Export Events](slug:grid-export-events).
* The Grid exports only `<GridColumn>` instances. Other types of columns are not exported (for example: command, checkbox, hierarchy, group and row-drag columns).

## Customization

The Grid allows customization of the exported files. You can determine the desired data to be exported, change the number and date formats, and more. For such customizations, [handle the export events](slug:grid-export-events).

## See Also

* [Grid Export to CSV](slug:grid-export-csv)
* [Grid Export to Excel](slug:grid-export-excel)
* [Grid Export to PDF](slug:grid-export-pdf)
* [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
