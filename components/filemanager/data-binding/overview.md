---
title: Overview
page_title: FileManager - Data Binding Overview
description: Data Binding basics in the FileManager for Blazor.
slug: filemanager-data-binding-overview
tags: telerik,blazor,treeview,data,bind,databind,databinding,basics
published: True
position: 0
components: ["filemanager"]
---

# FileManager Data Binding Overview

This FileManager Data Binding section explains the different ways to provide data to a FileManager component and the properties related to data binding. This article describes what are the available (bindable) features of FileManager data items and how to map model properties to these features.

There are two data binding modes that the FileManager supports:

* [Flat data](slug:filemanager-data-binding-flat-data)&mdash;a collection of self-referencing items with parent-child relationships.
* [Hierarchical data](slug:filemanager-data-binding-hierarchical-data)&mdash;each item holds its children in a nested property.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

## FileManager Item Features

The FileManager extracts information about the displayed files and folders from properties in the model. The following flat data model uses property names that will work automatically, with no additional FileManager configuration:

<demo metaUrl="client/filemanager/overview/example-1/" height="570"></demo>

The following section describes the meaning of the model properties for the FileManager.

## Data Bindings

All [FileManager item features](#fileManager-item-features) map to model properties. You define that relationship by providing the property name from which the corresponding information is taken. To do this, use the following parameters of the main `TelerikFileManager` tag:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| FileManager Parameter | Default&nbsp;Parameter&nbsp;Value <br /> (Model Property Name) | Model Property Type | Model Value Description | 
| --- | --- | --- | --- |
| **Item features** | | | |
| `NameField`| `"Name"` | `string` | The name of the file or folder, excluding the extension. |
| `SizeField`| `"Size"` | `long` | The size of the  file in bytes. |
| `PathField`| `"Path"` | `string` | The path to the item, including the name and extension. |
| `ExtensionField`| `"Extension"` | `string` | The item extension, starting with a dot `.` |
| `IsDirectoryField`| `"IsDirectory"` | `bool` | Whether the item is a folder. If `false`, it's treated as a file. |
| `DateCreatedField`| `"DateCreated"` | `DateTime` | The creation date of the file. |
| `DateCreatedUtcField`| `"DateCreatedUtc"` | `DateTime` | The creation date of the file in UTC. Required. |
| `DateModifiedField`| `"DateModified"` | `DateTime` | The modification date of the file. |
| `DateModifiedUtcField`| `"DateModifiedUtc"` | `DateTime` | The modification date of the file in UTC. Required. |
| **Item relations** | | | |
| `IdField `| `"Id" ` | any | The unique identifier of the file. Required for [binding to flat data](slug:filemanager-data-binding-flat-data). |
| `ParentIdField`| `"ParentId"` | any | Identifies the item's parent. Required for [binding to flat data](slug:filemanager-data-binding-flat-data). Set to `null` for root items. Do not use `ParentId` with hierarchical data. |
| `HasDirectoriesField`| `"HasDirectories"` | `bool` | Determines whether the item has child folders. Required for [binding to flat data](slug:filemanager-data-binding-flat-data). If `true`, the folder will show an expand arrow in the TreeView. With [hierarchical data](slug:filemanager-data-binding-hierarchical-data), the FileManager renders expand icons based on `Directories`, but `HasDirectories` takes precedence. |
| `DirectoriesField`| `"Directories"` | `IEnumerable<TItem>` | The item's child folders to display in the TreeView. Required for [binding to hierarchical data](slug:filemanager-data-binding-hierarchical-data). |
| `ItemsField`| `"Items"` | `IEnumerable<TItem>` | The folder's child files and folders to display in the FileManager view. Required for [binding to hierarchical data](slug:filemanager-data-binding-hierarchical-data). |

>important Do not use `ParentId` with hierarchical data. This will confuse the FileManager that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` to a non-existent property name.

## Next Steps

Learn the different ways to provide data to a FileManager:

* [Use flat data](slug:filemanager-data-binding-flat-data), where all items at all levels represent a single collection.
* [Use hierarchical data](slug:filemanager-data-binding-hierarchical-data), where each folder item holds its child files and folders in nested properties.

## See Also

* [Binding to Flat Data](slug:filemanager-data-binding-flat-data)
* [Binding to Hierarchical Data](slug:filemanager-data-binding-hierarchical-data)
* [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/filemanager/flat-data)
* [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/blazor-ui/filemanager/hierarchical-data)
