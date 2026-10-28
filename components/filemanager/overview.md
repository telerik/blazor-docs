---
title: Overview
page_title: FileManager Overview
description: Overview of the FileManager for Blazor.
slug: filemanager-overview
tags: telerik,blazor,filemanager,overview
published: True
position: 0
components: ["filemanager"]
---

# Blazor FileManager Overview

The <a href = "https://www.telerik.com/blazor-ui/file-manager" target="_blank">Blazor FileManager component</a> is an Explorer-like component that enables you to [upload](slug:filemanager-upload), [download](slug:filemanager-context-menu#download), [rename](slug:filemanager-context-menu#rename) and manage file and folders.


## Creating Blazor FileManager

1. Add the `TelerikFileManager` tag.
2. Set FileManager `Data` attribute to an `IEnumerable<TItem>`. [Read more for the component data binding](slug:filemanager-data-binding-overview).
3. Set the `Path` parameter via one-way or two-way binding.
4. To allow file operations such as rename, delete, and create new folder, handle the following FileManager [events](slug:filemanager-events): ([`OnModelInit`](slug:filemanager-events#onmodelinit), [`OnCreate`](slug:filemanager-events#oncreate), [`OnUpdate`](slug:filemanager-events#onupdate), [`OnDelete`](slug:filemanager-events#ondelete), [`OnDownload`](slug:filemanager-events#ondownload)).

>caption Telerik Blazor FileManager

<demo metaUrl="client/filemanager/overview/example-2/" height="570"></demo>

>Each `FileManagerEntry`'s `Path` needs to finish with the data item's `Name`, following the style used in real file systems. Also, ensure the top-level directories and files start with a predefined root path.

## Data Binding

The FileManager allows data binding to flat and hierarchical data. There are two alternative ways to provide data to the FileManager:

* Set the FileManager `Data` attribute. In this case, the component will hold all the data.

* Use the FileManager `OnRead` event and pass the data to the event argument. In this case, the FileManager will hold only the data items for the current folder.

The following list of resources provides details and examples for data binding a FileManager in various scenarios:

* General information on how data binding works - [FileManager Data Binding Overview](slug:filemanager-data-binding-overview).

* Binding to a self-referencing flat data source - [Bind FileManager to Flat Self-Referencing Data](slug:filemanager-data-binding-flat-data).

* Using hierarchical data source with item collections nested in each item - [Bind FileManager to Hierarchical Data](slug:filemanager-data-binding-hierarchical-data).

* Handling the `OnRead` event to provide only the current folder data - [FileManager `OnRead`](slug:filemanager-events#onread).

## Views

The FileManager can [show files and folders in a Grid or in a ListView](slug:filemanager-views). The default mode is ListView, which displays files and folders as thumbnails.

## Toolbar

The FileManger integrates a Toolbar with various commands. [Read more about the available FileManager Toolbar commands...](slug:filemanager-toolbar)

## Navigation

The FileManger allows navigating through the file system in a couple ways - TreeView in a dedicated pane and a Breadcrumb. [Read more about the FileManager Navigation...](slug:filemanager-navigation)

## Preview Pane

A dedicated Preview Pane can be toggled to display details for the selected file or folder. Its visibility is controlled via a Switch in the Toolbar. [Read more about the FileManager Preview Pane...](slug:filemanager-preview-pane)

## Context Menu

The FileManager displays a Context Menu on right click of an item. The menu provides several built-in commands. [Read more about the Context Menu options...](slug:filemanager-context-menu)


## Reference and Methods

To use the FileManager methods, define a reference to the component instance with the `@ref` attribute (example below). The FileManager is a generic component and its type comes from the model it is bound to.

The available FileManager methods are:

* `Rebind` - refreshes the FileManager data.

<div class="skip-repl"></div>
<demo metaUrl="client/filemanager/overview/example-1/" height="570"></demo>


## FileManager Parameters

The following table lists the FileManager parameters. Also check the [FileManager API Reference](slug:Telerik.Blazor.Components.TelerikFileManager-1) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and &nbsp; DefaultValue | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<TItem>` | Allows providing data source to the component. See [data bindnig](slug:filemanager-data-binding-overview).
| `EnableLoaderContainer` | `bool` |  Specifies if loader container should be shown on slow async operations
| `Path` | `string` | The current path. Updated when the user navigates. Two-way bindale. Handle the [`PathChanged`](slug:filemanager-events#pathchanged) event if you need to react to the user navigation.
| `View` | `FileManagerViewType` enum <br /> (`ListView`) | The layout of the FileManager main section. It can [show the files and folders as table rows or as thumbnails](slug:filemanager-views). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor FileManager:

| Parameter | Type and &nbsp; DefaultValue | Description |
|----------|----------|----------|
| `Class`| `string` |The CSS class that will be rendered on the topmost wrapping element of the component.
| `Width`|`string`|The width of the component.
| `Height` | `string` | The height of the component.

## Next Steps

* [Data bind the FileManager](slug:filemanager-data-binding-overview)
* [Explore FileManager Events](slug:filemanager-events)


## See Also

* [FileManager API](slug:Telerik.Blazor.Components.TelerikFileManager-1)
* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
