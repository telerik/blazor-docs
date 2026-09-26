---
title: Events
page_title: FileManager Events
description: Events in the FileManager for Blazor.
slug: filemanager-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
components: ["filemanager"]
---

# FileManager Events

This article explains the events available in the Telerik FileManager for Blazor. They are grouped logically.

* [CRUD Events](#crud-events) - events related to Creating, Updating and Deleting items.
    * [OnCreate](#oncreate)
    * [OnDelete](#ondelete)
    * [OnEdit](#onedit)
    * [OnUpdate](#onupdate)
* [OnDownload](#ondownload)
* [OnModelInit](#onmodelinit)
* [OnRead Event](#onread) - event related to obtaining data.
* [PathChanged](#pathchanged)
* [SelectedItemsChanged](#selecteditemschanged)
* [ViewChanged](#viewchanged)

## CRUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` event let you respond to user actions - when they want to edit an item. See the [example](#example).

### OnCreate

The `OnCreate` event fires when a new item is created (new folder). Its event handler receives the updated `FileManagerCreateEventArgs` as an argument.

### OnDelete

The `OnDelete` event fires when a file is deleted. Its event handler receives the updated `FileManagerDeleteEventArgs` as an argument.

### OnEdit

The `OnEdit` event fires when the user is about to enter edit mode for an existing item. Its event handler receives the updated `FileManagerEditEventArgs` as an argument.

### OnUpdate

The `OnUpdate` event fires when a file is updated (rename finishes). Its event handler receives the updated `FileManagerUpdateEventArgs` as an argument.

## OnDownload

The `OnDownload` event fires before a file download starts. The event is cancellable. The event handler argument is an `FileManagerDownloadEventArgs` object. See the [example](#example).

### MIME Type

The `FileManagerDownloadEventArgs` event argument has a `MimeType` property, which is `null` when the `OnDownload` event fires. .NET does not provide a built-in MIME type tool, so the application must set the correct MIME type, depending on the file extension or content. Consider [`Microsoft.AspNetCore.StaticFiles`](https://github.com/dotnet/aspnetcore/blob/main/src/Middleware/StaticFiles/src/FileExtensionContentTypeProvider.cs) or a similar tool.

### Downloading Large Files

The files are downloaded with the help of a Base64 data URL, which is sent to the browser through `JSInterop`. JavaScript code generates an `<a>` tag with an [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) on the web page and the tag is clicked programmatically, so that the browser shows its **Save File** dialog.

Large files (tens or hundreds of megabytes) may hit the browser's max data URL length or some memory threshold. In such cases, perform the following steps:

* Use the [Microsoft JSInterop approach and serve the file directly from the server to the user](https://learn.microsoft.com/en-us/aspnet/core/blazor/file-downloads?view=aspnetcore-6.0#download-from-a-url).
* Start the Microsoft JSInterop algorithm from the FileManager's `OnDownload` handler, but cancel the event to prevent duplicate downloads.

>tip You can also vote for the [FileManager feature request to expose a Proxy Url](https://feedback.telerik.com/blazor/1633629) for serving files from the server to the browser.

### Downloading Server Files in WebAssembly Apps

A FileManager in a WebAssembly app usually displays files from a remote server. In such cases, use the following download approach:

1. The `OnDownload` handler serializes and sends `args.Item` to the remote server. Do not try to serialize and send `args.Stream`.
1. The server returns the file content.
1. The `OnDownload` handler puts the returned file content to a `MemoryStream` and assigns it to `args.Stream`.

## OnModelInit

The `OnModelInit` event fires when a new instance of the model is about to be created. Handle this event to allow the creation of a new folder/file. Provide an instance of the model that the component is bound to and include the desired properties (name, path, date of creation and more). See the [example](#example).

## OnRead

The `OnRead` event is an alternative way to provide the FileManager with data, instead of the `Data` parameter. The event fires when the FileManager is initialized. The event handler receives a `FileManagerReadEventArgs` object as an argument.

Use the `OnRead` event if you want to load chunks of FileManager data on demand. The following API members are required:

* `PathChanged` event
* `Rebind()` method
* `OnRead` event

For more information, refer to [How to Load FileManager File Data on Demand](slug:filemanager-kb-load-file-data-on-demand).

## PathChanged

The `PathChanged` event fires when the user navigates to a different folder through the TreeView or by double-clicking a folder item in the [FileManager View](slug:filemanager-views). The event handler receives the new path as a `string` argument.

## SelectedItemsChanged

The `SelectedItemChanged` event fires every time the user clicks on a new file/folder in the main pane of the FileManager. You can use it with one-way binding of the `SelectedItems` parameter to respond to user selection.

## ViewChanged

The `ViewChanged` event fires when the user toggles between the [two FileManager views (`Grid` and `ListView`)](slug:filemanager-views). If you are using the event, make sure to update the value of the `View` parameter, otherwise the user action will have no effect.

## Example

>caption Handle FileManager events.

<demo metaUrl="client/filemanager/events/example-1/" height="570"></demo>
