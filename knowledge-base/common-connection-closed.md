---
title: Connection Closed Error and Attempting to Reconnect
description: How to fix a Blazor application error about closed collection, which occurs when pasting large images into the Editor, or uploading large files in the FileSelect.
type: troubleshooting
page_title: Blazor Connection Closed with an Error
slug: common-kb-connection-closed
position: 
tags: telerik, blazor, signalr
ticketid: 1480863, 1495039, 1524793, 1534372, 1535204, 1539809, 1550828, 1551288, 1551857, 1552427, 1555847, 1556196, 1557177, 1559614, 1568863, 1571806, 1571934, 1577980, 1579764, 1587204
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Editor for Blazor, <br />
                FileManager for Blazor, <br />
                FileSelect for Blazor, <br />
                PdfViewer for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This article is relevant to different scenarios and Telerik Blazor components. Here are a few examples:

* [Editor](#editor)
* [FileSelect](#fileselect)
* [PDFViewer](#pdfviewer)
* [XLSX Import with `SpreadProcessing`](#import-xslx-files)

### Editor

* Pasted images inside the Editor are discarded. They are not converted to base64 and not saved to the database.
* Pasting large images or large data always drops the Blazor app SignalR connection. The browser console shows "Attempting to reconnect" message and I have to reload the page.
* Large HTML content in the Editor restarts the Blazor app connection.
* The Editor freezes when copying and pasting long text.
* An error shows when the Editor contains a large document and the HTML string has lot of characters.

### FileSelect

* The FileSelect `OnSelect` handler fails on `Stream` processing.
* FileSelect upload scenarios break with large files. The `Stream` has no data.
* Cannot `CopyToAsync` the FileSelect `Stream` to a new `MemoryStream`. There is no error message.
* Files are written to the server directory with a size of zero bytes.
* The `FileSelectFileInfo.Stream.CopyToAsync` method hangs. Execution stops and no exception is thrown. The next line in the code is never reached. I am attempting to load a JPG image into the MemoryStream.

### PdfViewer

The PDF Viewer doesn't display PDF files, which are assigned to its `Data` parameter, but it displays local files from the user device.

### Import XSLX Files

Cannot import XSLX files which have a lot of records. It works for few records. It's a random behavior.

## Error Message

The exceptions may be similar to:

`Connection disconnected with error 'Error: Server returned an error on close: Connection closed with an error.' Attempting to reconnect to the server...`

Or:

`System.Threading.Tasks.TaskCanceledException. A task was canceled.`

## Possible Cause

Blazor Server apps use a **SignalR WebSocket** to communicate between the client (browser) and server. The SignalR WebSocket has a default maximum message size of **32 KB**. A large Editor `Value`, FileSelect file size, or a PDFViewer `Data` can exceed the maximum SignalR message size, which will close the connection and abort the current application task.

## Solution

[Increase the maximum SignalR WebSocket message size (`MaximumReceiveMessageSize`) for the Blazor application in `HubOptions`](slug:common-kb-increase-signalr-max-message-size).

## Notes

Make sure that `AddServerSideBlazor()` is called **only once**. All configuration settings in `AddHubOptions` and `AddCircuitOptions` must go together with this single statement.

## See Also

* [ASP.NET Core SignalR configuration](https://learn.microsoft.com/en-us/aspnet/core/signalr/configuration)
* [SignalR Buffer management](https://learn.microsoft.com/en-us/aspnet/core/signalr/security?view=aspnetcore-7.0#buffer-management)
