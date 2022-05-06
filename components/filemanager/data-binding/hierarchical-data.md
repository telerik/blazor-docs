---
title: Hierarchical Data
page_title: FileManager - Data Binding to Hierarchical Data
description: Data Binding the FileManager for Blazor to hierarchical data.
slug: filemanager-data-binding-hierarchical-data
tags: telerik,blazor,filemanager,data,bind,databind,databinding,hierarchical
published: True
position: 2
---

# FileManager Data Binding to Hierarchical Data

This article explains how to bind the FileManager for Blazor to hierarchical data. Before continuing, make sure you are familiar with the [FileManager data binding basics]({%slug filemanager-data-binding-overview%}).

Hierarchical data means that the collection of child items is provided in a field of its parent's model:

* The `Items` field contains a collection of all children icluding sub-folders and files. They will be rendered in the [Preview Pane]({%slug filemanager-preview-page%}) when the parent folder is selected.

* The `Directories` field contains a collection of the subolders of a directory. They will be rendered in the TreeView navigation pane. If there are `Directories` for a specific folder it will have an expand icon. The `HasDirectories` field can override this, however, but it is not required for hierarchical data binding.

This approach of providing items lets you gather separate collections of data that may even come from different sources.

>caption Example of hierarchical data binding

````CSHTML

````

## See Also

  * [FileManager Data Binding Basics]({%slug filemanager-data-binding-overview%})
  * [Binding to Flat Data]({%slug filemanager-data-binding-flat-data%})
  * [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/filemanager/hierarchical-data)
  * [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/filemanager/flat-data)