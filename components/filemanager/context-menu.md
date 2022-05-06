---
title: Context Menu
page_title: FileManager Context Menu
description: Context Menu of the FileManager for Blazor.
slug: filemanager-context-menu
tags: telerik,blazor,filemanager,contextmenu, menu, context
published: True
position: 3
---

# FileManager Context Menu

The ContextMenu of the FileManager enables you to easily execute commands on the selected file or folder.

The component uses the Telerik UI for Blazor ContextMenu and provides the following commands:

* [Rename](#rename)
* [Download](#download)
* [Delete](#delete)


## Rename

The `Rename` command of the FileManager ContextMenu allows renaming files and folders.

Clicking the command will fire the [`OnEdit`]({%slug filemanager-events%#onedit}) event. An input with the file/folder name will be rendered, so the user can edit it. Pressing `Enter` or bluring the input will fire the [`OnUpdate`]({%slug filemanager-events%#onupdate}) event, so you can handle the name update.

Renaming a directory that has children will require updqting their Path as well.

## Download

The `Download` command of the FileManager ContextMenu allows downloading of the selected files.

Clicking the command will fire the [`OnDownload`]({%slug filemanager-events%#ondownload}) event, so you can handle the actual download.

## Delete

The `Delete` command of the FileManager ContextMenu allows deleting of the selected files.

Clicking the command will open a delete confirmation dialog. Pressing the `OK` button wil fire the [`OnDelete`]({%slug filemanager-events%#ondelete}) event, so you can handle the actual deletion. Plessing the `Cancel` button will close the dialog.

# Example

