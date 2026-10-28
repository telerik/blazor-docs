---
title: Toolbar
page_title: FileManager Toolbar
description: Toolbar of the FileManager for Blazor.
slug: filemanager-toolbar
tags: telerik,blazor,filemanager,toolbar, commands
published: True
position: 15
components: ["filemanager"]
---

# FileManager Toolbar

The Blazor FileManager Toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

By default, the Blazor FileManager displays all its built-in tools in the order below. Use the *tool tag* if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| New Folder | `FileManagerToolBarNewFolderTool` | A button that creates a new folder in the current location. Read how to handle the creation in the [FileManager Events](slug:filemanager-events) article.|
| Upload | `FileManagerToolBarUploadTool` | A button that opens a dialog with integrated [Upload component](slug:upload-overview). Read more in the [FileManager Upload](slug:filemanager-upload) article. |
| Sort Direction | `FileManagerToolBarSortDirectionTool` | A ButtonGroup with ToggleButtons that selects the [sort direction (ascending or descending) to sort the files in the current location](slug:filemanager-sort). |
| Sort By | `FileManagerToolBarSortTool` | A SplitButton that selects the desired [sort member to sort by](slug:filemanager-sort). |
| Views | `FileManagerToolBarFileViewTool` | A ButtonGroup with ToggleButtons that [toggles the file and folder visualization between a ListView and a Grid](slug:filemanager-views). |
| View Details | `FileManagerToolBarViewDetailsTool` | A Switch that toggles the visibility of the [FileManager Preview Pane](slug:filemanager-preview-pane). By default, the preview pane is hidden. |
| Search | `FileManagerToolBarSearchTool` | A TextBox that [filters the files by name](slug:filemanager-search). |

By default, the FileManager Toolbar also includes a spacer (`<FileManagerToolBarSpacer />`). This spacer consumes the available empty space and pushes the rest of the tools next to one another.

## Custom Tools

In addition to built-in tools, the FileManager also supports custom tools. Use the `<FileManagerToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Configuration

Add a `<FileManagerToolBar>` tag inside `<TelerikFileManager>` to configure a custom toolbar, for example:

* Arrange the FileManager tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the FileManager Toolbar

<demo metaUrl="client/filemanager/toolbar/example-1/" height="420"></demo>

## Next Steps

* [Handle FileManager Events](slug:filemanager-events)


## See Also

* [Live Demo: FileManager Toolbar](https://demos.telerik.com/blazor-ui/filemanager/toolbar)
