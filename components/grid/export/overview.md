---
title: Overview
page_title: Grid - Export Overview
description: Export basics for the Grid for Blazor.
slug: grid-export-overview
tags: telerik, blazor, grid, export
published: True
position: 1
---

# Blazor Grid Export

The Grid for Blazor provides a built-in functionality to export the data to:
* [CSV](slug:grid-export-csv)
* [Excel](slug:grid-export-excel)
* [PDF](slug:grid-export-pdf)

Before proceeding to the dedicated export articles, ensure you are familiar with the following specifics:

## How the Export Works

* If the Grid is using `OnRead` and is exporting all pages, it will fire an additional `OnRead` event at the time of exporting, with a request `PageSize` of `0`. This will enable the component to obtain all data.
* The time for export will be longer if the Grid has a lot of records and/or in Client-side Blazor (WebAssembly) where all the code runs in the browser and, at the time of writing, is considerably slower than server-side Blazor, and it only has one actual thread. While the file is being generated, the UI will be unresponsive, so you may want to [show a loading sign to the user during the export process](slug:grid-kb-show-loader-while-exporting).

## Requirements

* With Server-side Blazor, the file may become larger than the default SignalR connection limit, and this can disconnect the client and result in an error. Generally, this requires quite a lot of data to happen, but you may need to increase the size limit of the connection in the `ConfigureServices` method of your `Startup.cs` file, for example:

````C#.skip-repl
services.AddServerSideBlazor().AddHubOptions(o =>
{
    o.MaximumReceiveMessageSize = 1024 * 1024; // 1MB
});
````

## Limitations

* Templates are not exported, because there is no provision in the framework for getting them at runtime. If a column, header or group header/footer has a template or aggregates, it will be ignored. The headers will be the `Title` of the column, the data is the data from the `Field`. If you need additional information, see if you can add it in a Field in the model, or create your own file. Find a <a href="https://feedback.telerik.com/blazor/1485764-customize-the-Pdf-file-before-it-gets-to-the-client" target="_blank">project example on how to generate your own exported file</a>. Find additional information on how to [export an image that is rendered in a Grid column template](slug:grid-export-image-column-excel).

* `bool` fields are exported as `TRUE` or `FALSE` strings, because there is no native boolean data type in the exported formats and these string values are the most common ones used in data and macros.

* Date and number formats are exported in the following format: `mm/dd/yyyy hh:mm:ss` plus the current app culture AM/PM specifier for dates, and `Convert.ToDouble(value)` for numbers (which uses the current thread culture). The Excel date formats are different than .NET date formats and Excel may not always recognize the column as dates, for example, if the entire date format from the .NET culture is used. To customize the date and number formats, use the [Export Events](slug: grid-export-events).

* The Grid exports only `<GridColumn>` instances. Other types of columns are not exported (for example: command, checkbox, hierarchy, group and row-drag columns).

## Customization

The Grid allows customizing the exported files - determine the desired data to be exported, changing the number/date formats and more. For such customizations, [handle the export events](slug:grid-export-events).

## See Also

* [Grid Export to CSV](slug:grid-export-csv)
* [Grid Export to Excel](slug:grid-export-excel)
* [Grid Export to PDF](slug:grid-export-pdf)
* [Live Demo: Grid Export](https://demos.telerik.com/blazor-ui/grid/export)
