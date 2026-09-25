---
title: Flat Data
page_title: FileManager - Data Binding to Flat Data
description: Data Binding the FileManager for Blazor to flat data.
slug: filemanager-data-binding-flat-data
tags: telerik,blazor,filemanager,data,bind,databind,databinding,flat
published: True
position: 1
components: ["filemanager"]
---

# FileManager Data Binding to Flat Data

This article explains how to bind the FileManager for Blazor to flat data. Before continuing, make sure you are familiar with the [FileManager data binding basics](slug:filemanager-data-binding-overview).

Flat data means that the entire collection of FileManager items (both files and directories) is available at one level, for example `List<FlatFileEntry>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the FileManager renders anything.

You must also provide the correct value for the `HasDirectories` field - for the directories that have subdirectories, you must set it to `true`, so that the expand arrow is rendered.

>caption Example of flat data in a FileManager

<demo metaUrl="client/filemanager/flat-data/example-1/" height="570"></demo>

## See Also

* [FileManager Data Binding Basics](slug:filemanager-data-binding-overview)
* [Binding to Hierarchical Data](slug:filemanager-data-binding-hierarchical-data)
* [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/filemanager/flat-data)
* [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/blazor-ui/filemanager/hierarchical-data)
