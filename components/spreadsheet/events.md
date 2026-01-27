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

````RAZOR
<p><label><TelerikCheckBox @bind-Value="@ShouldCancelEvents" /> Cancel Spreadsheet Events</label></p>

<p>Spreadsheet Event Log: @( new MarkupString(SpreadSheetEventLog) )</p>

<TelerikSpreadsheet OnDownload="@OnSpreadsheetDownload"
                    OnOpen="@OnSpreadsheetOpen">
</TelerikSpreadsheet>

@code {
    private string SpreadSheetEventLog { get; set; } = string.Empty;

    private bool ShouldCancelEvents { get; set; }

    private void OnSpreadsheetDownload(SpreadsheetDownloadEventArgs args)
    {
        var now = DateTime.Now;

        args.FileName = $"telerik-spreadsheet-{now.ToString("HH-mm-ss")}";

        SpreadSheetEventLog = $"<code>OnDownload</code> for file <strong>{args.FileName}</strong>.";

        if (ShouldCancelEvents)
        {
            args.IsCancelled = true;
            SpreadSheetEventLog = SpreadSheetEventLog.Insert(0, "<strong>Cancelled</strong> ");
        }
    }

    private void OnSpreadsheetOpen(SpreadsheetOpenEventArgs args)
    {
        var file = args.Files.First();

        SpreadSheetEventLog = $"<code>OnOpen</code> for file <strong>{file.Name}</strong> with size <strong>{file.Size.ToString("n0")}</strong> bytes.";

        if (ShouldCancelEvents)
        {
            args.IsCancelled = true;
            SpreadSheetEventLog = SpreadSheetEventLog.Insert(0, "<strong>Cancelled</strong> ");
        }
    }
}
````


## See Also

* [Live Demo: Spreadsheet Events](https://demos.telerik.com/blazor-ui/spreadsheet/events)
