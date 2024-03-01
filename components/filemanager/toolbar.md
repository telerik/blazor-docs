---
title: Toolbar
page_title: FileManager Toolbar
description: Toolbar of the FileManager for Blazor.
slug: filemanager-toolbar
tags: telerik,blazor,filemanager,toolbar, commands
published: True
position: 15
---

# FileManager Toolbar

The FileManager includes a built-in Toolbar that contains several commands. You may use it as is or customize it to include your desired tools.

>caption In this article:
* [Default Toolbar](#default-toolbar)
* [Custom Toolbar](#custom-toolbar)

## Default Toolbar

The default Toolbar will be automatically rendered when you declare the component. If you want to use that version, no further action is required. 

The default Toolbar contains the following built-in tools (rendered in this exact order):

<!-- * [New Folder](#new-folder)
* [Upload](#upload)
* [Sort](#sort)
* [Views](#views)
* [View Details](#view-details)
* [Search](#search) -->

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool | Description |
| --- | --- |
| New Folder| The `New Folder` button allows creating of a new folder in the current location. Read how to handle the creation in the [FileManager - Events]({%slug filemanager-events%}). |
| Upload | The Upload button allows updloading of new files. Clicking the button will open a dialog with integrated [Upload component]({%slug upload-overview%}). Read more in the [FileManager - Upload]({%slug filemanager-upload%}) article. |
| Sort Direction | FileManager allows sorting of the files in the current location. The sorting direction (ascending or descending) is controlled through dedicated buttons in the Toolbar.  |
| Sort By | The `SortBy` dropdown provides option to select the desired sort member to sort by. Read more in the [FileManager - Sort]({%slug filemanager-sort%}) article. |
| Views | The `Views` button group allows you to control how the content of the selected directory will be visualized. The users can choose between two options. Read more in the [FileManager - Views]({%slug filemanager-views%}) article. |
| View Details | The `View Details` toggles the visibility of the [Preview Pane]({%slug filemanager-preview-pane%}). By default is is `Off` and you can enable it to see the selected file details. |
| Search | The `View Details` toggles the visibility of the [Preview Pane]({%slug filemanager-preview-pane%}). By default is is `Off` and you can enable it to see the selected file details. |


<!-- ## New Folder

The `New Folder` button allows creating of a new folder in the current location. Read how to handle the creation in the [FileManager - Events]({%slug filemanager-events%}).

## Upload

The Upload button allows updloading of new files. Clicking the button will open a dialog with integrated [Upload component]({%slug upload-overview%}). Read more in the [FileManager - Upload]({%slug filemanager-upload%}) article. 

## Sort

FileManager allows sorting of the files in the current location. The sorting direction (ascending or descending) is controlled through dedicated buttons in the Toolbar. The `SortBy` dropdown provides option to select the desired sort member to sort by. Read more in the [FileManager - Sort]({%slug filemanager-sort%}) article.

## Views

The `Views` button group allows you to control how the content of the selected directory will be visualized. The users can choose between two options. Read more in the [FileManager - Views]({%slug filemanager-views%}) article.

## View Details

The `View Details` toggles the visibility of the [Preview Pane]({%slug filemanager-preview-pane%}). By default is is `Off` and you can enable it to see the selected file details.

## Search

The FileManager allows searching files in the current location via a Searchbar in the Toolbar. Read more in the [FileManager - Search]({%slug filemanager-search%}) article. -->

## Custom Toolbar

To customize the Toolbar, add the `<FileManagerToolBar>` tag as a direct child of the `<TelerikFileManager>`. Inside the `<FileManagerToolBar>` you can include your desired built-in tools, manage their order and add custom tools.

### Built-in tools

To add the desired built-in tools, declare the tool component in the `<FileManagerToolBar>`. The tools will be rendered in the order that you declare them.

>caption Built-in tool components:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Component | Description |
|------|-------------|
| FileManagerToolBarNewFolderTool | Renders the button for creating a new folder |
| FileManagerToolBarUploadTool | Renders the button for the upload window |
| FileManagerToolBarSortDirectionTool | Renders a button group for the sort direction |
| FileManagerToolBarSortTool | Renders the split button for choosing which field to sort by |
| FileManagerToolBarFileViewTool | Renders a button group to toggle between Grid and ListView views |
| FileManagerToolBarSpacer | Renders a spacer element |
| FileManagerToolBarViewDetailsTool | Renders a switch to toggle the extra details for a file |
| FileManagerToolBarSearchTool | Renders a search box | 

### Custom tools

To create a custom tool, declare the `<FileManagerToolBarCustomTool>` inside `<FileManagerToolBar>` tag and specify the content of your tool.

>caption Toolbar with some built-in and custom tools

````CSHTML

````

## See Also

* [Live Demo: FileManager Toolbar](https://demos.telerik.com/blazor-ui/filemanager/toolbar)
