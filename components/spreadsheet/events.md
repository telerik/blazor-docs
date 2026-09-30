---
title: Events
page_title: Spreadsheet - Events
description: Discover and handler the Spreadsheet events and event arguments. Find complete runnable example with all Spreadsheet events.
slug: spreadsheet-events
tags: telerik,blazor,spreadsheet
published: True
position: 60
components: ["spreadsheet"]
---

# Spreadsheet Events

The Telerik Blazor Spreadsheet fires events that are related to different user actions. This article describes all events and event arguments.

* [`OnDownload`](#ondownload)
* [`OnOpen`](#onopen)


## OnDownload

The `OnDownload` event fires when the user clicks on the **Download** button in the Spreadsheet toolbar. The `SpreadsheetDownloadEventArgs` event argument has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `FileName` | `string` | The filename, which will appear in the browser's save file dialog. |
| `IsCancelled` | `bool` | Sets if the download action will be prevented. |

See the [example below](#example).


## OnOpen

The `OnOpen` event fires when the user clicks on the **Open** button in the Spreadsheet toolbar and opens a file for editing from their file system. The Spreadsheet uses a [FileSelect component](slug:fileselect-overview) for opening files. The Spreadsheet `OnOpen` event is similar to the [FileSelect `OnSelect` event](slug:fileselect-events#onselect).

The `SpreadsheetOpenEventArgs` argument of the `OnOpen` event has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `Files` | `List<FileSelectFileInfo>` | The `List` contains one member and it is the file that the user opened. Check the [`FileSelectFileInfo` section in the FileSelect Events documentation](slug:fileselect-events#fileselectfileinfo) for more information about the `FileSelectFileInfo` properties `Name`, `Size,` `Extension`, and `Stream`. |
| `IsCancelled` | `bool` | Sets if the open action should be prevented. |


## Example

>caption Using the Spreadsheet events

<demo metaUrl="client/spreadsheet/events/example-1/" height="770"></demo>


## See Also

* [Live Demo: Spreadsheet Events](https://demos.telerik.com/blazor-ui/spreadsheet/events)
