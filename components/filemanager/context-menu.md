---
title: Context Menu
page_title: FileManager Context Menu
description: Context Menu of the FileManager for Blazor.
slug: filemanager-context-menu
tags: telerik,blazor,filemanager,contextmenu, menu, context
published: True
position: 3
components: ["filemanager"]
---

# FileManager Context Menu

The ContextMenu of the FileManager enables you to easily execute commands on the selected file or folder.

The component uses the Telerik UI for [Blazor ContextMenu](slug:contextmenu-overview) and provides the following commands:

* [Rename](#rename)
* [Download](#download)
* [Delete](#delete)


## Rename

The `Rename` command of the FileManager ContextMenu allows renaming the selected file or folder. Users can rename one item at a time - the one they open the ContextMenu for.

Clicking the command will fire the [`OnEdit`](slug:filemanager-events#onedit) event. An input with the file/folder name will be rendered, so the user can edit it. Pressing `Enter` or blurring the input will fire the [`OnUpdate`](slug:filemanager-events#onupdate) event allowing you can handle the name update of the actual item in your data source.

When an item is renamed, make sure to also update its `Path`. Renaming a directory that has children will require updating their `Path` as well. If the actual file system is modified, then this will be handled out of the box.

## Download

The `Download` command of the FileManager ContextMenu allows downloading of the selected file.

Clicking the command will fire the [`OnDownload`](slug:filemanager-events#ondownload) event, so you can handle the actual download.

The component does not have the actual files, so the `Item` field of the `FileManagerDownloadEventArgs` just provide metadata of the selected file. Based on that, you should find the actual in the file system you are using and provide the following data to the arguments, so the download can be performed:

* `args.Stream` - the `MemoryStream` of the actual selected file.
* `args.MimeType` - the `MimeType` of the actual file, e.g. "image/png".

In addition, you can also provide a custom file name through the `FileName` field of the `FileManagerDownloadEventArgs`.

## Delete

The `Delete` command of the FileManager ContextMenu allows deleting of the selected files. Multiple file deletion is supported. It does not matter which item the ContextMenu for, the `Delete` command will handle the deletion of all selected files.

Clicking the command will open a delete confirmation dialog. Pressing the `OK` button will fire the [`OnDelete`](slug:filemanager-events#ondelete) event, so you can handle the deletion of the actual files in the data source. Pressing the `Cancel` button will close the dialog and prevent the deletion.

# Example

The following example demonstrates handling of the ContextMenu commends.

<demo metaUrl="client/filemanager/context-menu/example-1/" height="570"></demo>

## See Also

* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
* [FileManager Events](slug:filemanager-events)
