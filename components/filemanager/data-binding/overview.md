---
title: Overview
page_title: FileManager - Data Binding Overview
description: Data Binding basics in the FileManager for Blazor.
slug: filemanager-data-binding-overview
tags: telerik,blazor,treeview,data,bind,databind,databinding,basics
published: True
position: 0
---

# FileManager Data Binding Overview

This FileManager Data Binding section explains the different ways to provide data to a FileManager component and the properties related to data binding. This article describes what are the available (bindable) features of FileManager data items and how to map model properties to these features.

There are two data binding modes that the FileManager supports:

* [Flat data](slug:filemanager-data-binding-flat-data)&mdash;a collection of self-referencing items with parent-child relationships.
* [Hierarchical data](slug:filemanager-data-binding-hierarchical-data)&mdash;each item holds its children in a nested property.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

## FileManager Item Features

The FileManager has features that map to properties in the model. The following flat data model uses property names that will work automatically, with no additional FileManager configuration:

````RAZOR
@using System.IO

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    Height="400px"
                    IdField="MyModelId"
                    NameField="Name"
                    SizeField="Size"
                    PathField="Path"
                    ExtensionField="Extension"
                    IsDirectoryField="IsDirectory"
                    HasDirectoriesField="HasDirectories"
                    ParentIdField="ParentId"
                    DateCreatedField="DateCreated"
                    DateCreatedUtcField="DateCreatedUtc"
                    DateModifiedField="DateModified"
                    DateModifiedUtcField="DateModifiedUtc"
                    OnModelInit="@OnModelInitHandler">
</TelerikFileManager>

@code {
    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";
    private string DirectoryPath { get; set; } = "root-folder-path";

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFlatFileEntries();
    }

    private FlatFileEntry OnModelInitHandler()
    {
        var item = new FlatFileEntry();
        item.Name = $"New folder";
        item.Size = 0;
        item.Path = Path.Combine(DirectoryPath, item.Name);
        item.IsDirectory = true;
        item.HasDirectories = false;
        item.DateCreated = DateTime.Now;
        item.DateCreatedUtc = DateTime.Now;
        item.DateModified = DateTime.Now;
        item.DateModifiedUtc = DateTime.Now;

        return item;
    }

    // a model to bind the FileManager. Should usually be in its own separate location.
    public class FlatFileEntry
    {
        public string MyModelId { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Path { get; set; }
        public string Extension { get; set; }
        public bool IsDirectory { get; set; }
        public bool HasDirectories { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateCreatedUtc { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateModifiedUtc { get; set; }
    }

    // the next lines are hardcoded data generation so you can explore the FileManager freely
    private async Task<List<FlatFileEntry>> GetFlatFileEntries()
    {
        var workFiles = new FlatFileEntry()
        {
            MyModelId = "1",
            ParentId = null,
            Name = "Work Files",
            IsDirectory = true,
            HasDirectories = true,
            DateCreated = new DateTime(2022, 1, 2),
            DateCreatedUtc = new DateTime(2022, 1, 2),
            DateModified = new DateTime(2022, 2, 3),
            DateModifiedUtc = new DateTime(2022, 2, 3),
            Path = Path.Combine(RootPath, "Work Files"),
            Size = 3 * 1024 * 1024
        };

        var Documents = new FlatFileEntry()
        {
            MyModelId = "2",
            ParentId = workFiles.MyModelId,
            Name = "Documents",
            IsDirectory = true,
            HasDirectories = false,
            DateCreated = new DateTime(2022, 1, 2),
            DateCreatedUtc = new DateTime(2022, 1, 2),
            DateModified = new DateTime(2022, 2, 3),
            DateModifiedUtc = new DateTime(2022, 2, 3),
            Path = Path.Combine(workFiles.Path, "Documents"),
            Size = 1024 * 1024
        };

        var Images = new FlatFileEntry()
        {
            MyModelId = "3",
            ParentId = workFiles.MyModelId,
            Name = "Images",
            IsDirectory = true,
            HasDirectories = false,
            DateCreated = new DateTime(2022, 1, 2),
            DateCreatedUtc = new DateTime(2022, 1, 2),
            DateModified = new DateTime(2022, 2, 3),
            DateModifiedUtc = new DateTime(2022, 2, 3),
            Path = Path.Combine(workFiles.Path, "Images"),
            Size = 2 * 1024 * 1024
        };

        var specification = new FlatFileEntry()
        {
            MyModelId = "4",
            ParentId = Documents.MyModelId,
            Name = "Specification",
            IsDirectory = false,
            HasDirectories = false,
            Extension = ".docx",
            DateCreated = new DateTime(2022, 1, 5),
            DateCreatedUtc = new DateTime(2022, 1, 5),
            DateModified = new DateTime(2022, 2, 3),
            DateModifiedUtc = new DateTime(2022, 2, 3),
            Path = Path.Combine(Documents.Path, "specification.docx"),
            Size = 462 * 1024
        };

        var report = new FlatFileEntry()
        {
            MyModelId = "5",
            ParentId = Documents.MyModelId,
            Name = "Monthly report",
            IsDirectory = false,
            HasDirectories = false,
            Extension = ".xlsx",
            DateCreated = new DateTime(2022, 1, 20),
            DateCreatedUtc = new DateTime(2022, 1, 20),
            DateModified = new DateTime(2022, 1, 25),
            DateModifiedUtc = new DateTime(2022, 1, 25),
            Path = Path.Combine(Documents.Path, "Monthly report.xlsx"),
            Size = 538 * 1024
        };

        var dashboardDesign = new FlatFileEntry()
        {
            MyModelId = "6",
            ParentId = Images.MyModelId,
            Name = "Dashboard Design",
            IsDirectory = false,
            HasDirectories = false,
            Extension = ".png",
            DateCreated = new DateTime(2022, 1, 10),
            DateCreatedUtc = new DateTime(2022, 1, 10),
            DateModified = new DateTime(2022, 2, 13),
            DateModifiedUtc = new DateTime(2022, 2, 13),
            Path = Path.Combine(Images.Path, "Dashboard Design.png"),
            Size = 1024
        };

        var gridDesign = new FlatFileEntry()
        {
            MyModelId = "7",
            ParentId = Images.MyModelId,
            Name = "Grid Design",
            IsDirectory = false,
            HasDirectories = false,
            Extension = ".jpg",
            DateCreated = new DateTime(2022, 1, 12),
            DateCreatedUtc = new DateTime(2022, 1, 12),
            DateModified = new DateTime(2022, 2, 13),
            DateModifiedUtc = new DateTime(2022, 2, 13),
            Path = Path.Combine(Images.Path, "Grid Design.jpg"),
            Size = 1024
        };

        var files = new List<FlatFileEntry>()
        {
            workFiles,

            Documents,
            specification,
            report,

            Images,
            dashboardDesign,
            gridDesign
        };

        return await Task.FromResult(files);
    }
}
````

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
| `DirectoriesField`| `"Directories"` | `IEnumerable<TItem>` | The item's child folders to display in the TreeView. Required for [binding to hierarchical data](slug:filemanager-data-binding-hierarchical-data) |
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
