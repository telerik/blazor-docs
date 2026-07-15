---
title: Overview
page_title: TreeList - Export Overview
description: Export basics for the TreeList for Blazor.
slug: treelist-export-overview
tags: telerik, blazor, treelist, export
published: True
position: 1
components: ["treelist"]
---

# Blazor TreeList Export

The TreeList for Blazor provides a built-in functionality to export the data to Excel.

## How the Export Works

The TreeList Excel Export uses [Telerik SpreadStreamProcessing](slug:dpl-in-blazor) to generate an `.xlsx` file. The exporting time depends on the number of records and whether the exporting occurs on a server or in a WebAssembly.

While the file is being generated, the UI will be unresponsive, so you may want to [show a loading sign to the user during the export process](slug:grid-kb-show-loader-while-exporting).

## Requirements

In server-side Blazor apps, the file may become larger than the default SignalR message size limit. This can disconnect the client and result in an error. You may need to [increase the maximum SignalR message size](slug:common-kb-increase-signalr-max-message-size).

## Limitations

The TreeList export feature has the following limitations:

* Templates are not exported, because there is no provision in the framework for getting `RenderFragment` content at runtime. Thus, column, header or group header/footer templates are ignored. The headers in the exported file match the `Title` of the column. The exported values match the data from the column `Field`. If you need additional information, see if you can add it to a property in the model, or create your own file. Find a [project example on how to generate your own exported file](https://feedback.telerik.com/blazor/1485764-customize-the-Pdf-file-before-it-gets-to-the-client).
* `bool` fields are exported as `TRUE` or `FALSE` strings, because there is no native boolean data type in the exported formats and these string values are the most common ones used in data and macros.
* Dates are exported in the following format: `mm/dd/yyyy hh:mm:ss` plus the current app culture AM/PM specifier. The Excel date formats are different than .NET date formats and Excel may not always recognize the column as dates, for example, if the entire date format from the .NET culture is used. To customize the date formats, use the [Export Events](slug:treelist-export-events).
* Numbers are exported in the following format which uses the current thread culture: `Convert.ToDouble(value)`. To customize the number formats use the [Export Events](slug:treelist-export-events).
* The TreeList exports only `<TreeListColumn>` instances. Other types of columns are not exported (for example: command, checkbox, row-drag columns).

## Customization

The TreeList allows customization of the exported files. You can determine the desired data to be exported, change the number and date formats, and more. For such customizations, [handle the export events](slug:treelist-export-events).

## See Also

* [TreeList Export to Excel](slug:treelist-export-excel)
* [Live Demo: TreeList Excel Export](https://demos.telerik.com/blazor-ui/treelist/excel-export)
