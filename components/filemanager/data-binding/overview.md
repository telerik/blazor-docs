---
title: Overview
page_title: FileManager - Data Binding Overview
description: Data Binding basics in the FileManager for Blazor.
slug: filemanager-data-binding-overview
tags: telerik,blazor,treelist,data,bind,databind,databinding,basics
published: True
position: 0
---

# FileManager Data Binding Basics

This article explains the different ways to provide data to a FileManager component and the properties related to data binding. Reviewing this article will explain the basics of how you can describe the hierarchy of items in your data source to the treelist component so they can render.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

First, review:

* The available (bindable) [features of a FileManager items](#fileManager-item-features).
* How to match fields in the model with the FileManager item [data bindings](#data-bindings).

There are two modes of providing data to a FileManager, and they both use the items' features. Once you are familiar with the current article, choose the data binding more you wish to use:

* [Flat data] - a collection of self-referencing items with parent-child relationships See the `Id` and `ParentId` settings.

* [Hierarchical data]({%slug filemanager-data-binding-hierarchical-data%}) - each item holds its children in a nested property. See the `Directories` setting.

## FileManager Item Features

The FileManager has features that map to properties in the model. The following model uses property names that will work automatically, with no additional FileManager configuration:

````CSHTML
````

The above model properties have the following meaning for the FileManager:


@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|----------|----------|
| **Item features** | |
| `Name` | The name of the file.
| `Size` | The size of the file.
| `Path` | The path of the file.
| `Extension` | The extension of the file.
| `IsDirectory` | Whether the item is a directory. If its value is `false` the item is considered a file and not a directory.
| `DateCreated` | The creation date of the file.
| `DateCreateUtc` | The creation date of the file in UTC. Required.
| `DateModified` | The modification date of the file.
| `DateModifiedUtc` | The modification date of the file in UTC. Required.
| **Item relations** | |
| `Id `| The unique identifier of the file. Required for [**binding to flat data**]({%slug filemanager-data-binding-flat-data%}).
| `ParentId` | Identifies the file's parent. Required for [**binding to flat data**]({%slug filemanager-data-binding-flat-data%}). Set to `null` for root items. Do *not* use `ParentId` with hierarhical data.
| `HasDirectories` | Determines whether the item has subdirectories. Required for binding to [**flat data**]({%slug filemanager-data-binding-flat-data%}) If `true`, the directory will show an expand arrow. With [**hierarchical data**]({%slug filemanager-data-binding-hierarchical-data%}), the FileManager renders expand icons based on `Directories`, but `HasDirectories` will take precedence.
| `Directories` | Defines the item subdirectories. Required for [binding to **hierarchical data**]({%slug filemanager-data-binding-hierarchical-data%}).
| `Items` | Defines all the subitems (directories and files) of the item.

## Data Bindings

All [FileManager item features](#fileManager-item-features) map to model properties.  The properties of a treelist item match directly to a field of the model the treelist is bound to. You provide that relationship by providing the name of the field from which the corresponding information is to be taken. To do this, in the main `TelerikFileManager` tag, use the parameters described below:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| FileManager Parameter | DEFAULT VALUE |
|----------|----------|----------|
| **Item features** | |
| `NameField`| `"Name"`
| `SizeField`| `"Size"`
| `PathField`| `"Path"`
| `ExtensionField`| `"Extension"`
| `IsDirectoryField`| `"IsDirectoryField"`
| `DateCreatedField`| `"DateCreated"`
| `DateCreateUtcField`| `"DateCreateUtc"`
| `DateModifiedField`| `"DateModified"`
| `DateModifiedUtcField`| `"DateModifiedUtc"`
| **Item relations** | || **Item relations** | |
| `IdField `| `"Id" `
| `ParentIdField`| `"ParentId"`
| `HasDirectoriesField`| `"HasDirectories"`
| `DirectoriesField`| `"Directories"`
| `EntriesField`| `"Entries"`

>important Do not use `ParentId` with hierarhical data. This will confuse the FileManager that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` to a non-existent property.

## Next Steps

Learn the different ways to provide data to a TreeView:

* [Use flat data]({%slug filemanager-data-binding-flat-data%})
* [Use hierarchical data]({%slug filemanager-data-binding-hierarchical-data%}) - each item holds its children in a nested property


## See Also

  * [Binding to Flat Data]({%slug filemanager-data-binding-flat-data%})
  * [Binding to Hierarchical Data]({%slug filemanager-data-binding-hierarchical-data%})
  * [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/treelist/flat-data)
  * [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/hierarchical-data)