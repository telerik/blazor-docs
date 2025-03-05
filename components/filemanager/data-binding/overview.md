---
title: Overview
page_title: FileManager - Data Binding Overview
description: Data Binding basics in the FileManager for Blazor.
slug: filemanager-data-binding-overview
tags: telerik,blazor,treeview,data,bind,databind,databinding,basics
published: True
position: 0
---

# FileManager Data Binding Basics

This article explains the different ways to provide data to a FileManager component and the properties related to data binding. Reviewing this article will explain the basics of how you can describe the hierarchy of items in your data source to the treeview component so they can render.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

First, review:

* The available (bindable) [features of a FileManager items](#filemanager-item-features).
* How to match fields in the model with the FileManager item [data bindings](#data-bindings).

There are two modes of providing data to a FileManager, and they both use the items' features. Once you are familiar with the current article, choose the data binding more you wish to use:

* [Flat data](slug:filemanager-data-binding-flat-data) - a collection of self-referencing items with parent-child relationships See the `Id` and `ParentId` settings.

* [Hierarchical data](slug:filemanager-data-binding-hierarchical-data) - each item holds its children in a nested property. See the `Directories` setting.

## FileManager Item Features

The FileManager has features that map to properties in the model. The following model uses property names that will work automatically, with no additional FileManager configuration:

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

The above model properties have the following meaning for the FileManager:


@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| **Item features** | |
| `Name` | The name of the file. |
| `Size` | The size of the file. |
| `Path` | The path of the file. |
| `Extension` | The extension of the file. |
| `IsDirectory` | Whether the item is a directory. If its value is `false` the item is considered a file and not a directory. |
| `DateCreated` | The creation date of the file. |
| `DateCreateUtc` | The creation date of the file in UTC. Required. |
| `DateModified` | The modification date of the file. |
| `DateModifiedUtc` | The modification date of the file in UTC. Required. |
| **Item relations** | |
| `Id `| The unique identifier of the file. Required for [**binding to flat data**](slug:filemanager-data-binding-flat-data). |
| `ParentId` | Identifies the file's parent. Required for [**binding to flat data**](slug:filemanager-data-binding-flat-data). Set to `null` for root items. Do *not* use `ParentId` with hierarchical data. |
| `HasDirectories` | Determines whether the item has subdirectories. Required for binding to [**flat data**](slug:filemanager-data-binding-flat-data) If `true`, the directory will show an expand arrow. With [**hierarchical data**](slug:filemanager-data-binding-hierarchical-data), the FileManager renders expand icons based on `Directories`, but `HasDirectories` will take precedence. |
| `Directories` | Defines the item subdirectories. Required for [binding to **hierarchical data**](slug:filemanager-data-binding-hierarchical-data).
| `Items` | Defines all the subitems (directories and files) of the item. |

## Data Bindings

All [FileManager item features](#fileManager-item-features) map to model properties.  The properties of a treeview item match directly to a field of the model the treeview is bound to. You provide that relationship by providing the name of the field from which the corresponding information is to be taken. To do this, in the main `TelerikFileManager` tag, use the parameters described below:

| FileManager Parameter | Default Value |
| --- | --- |
| **Item features** | |
| `NameField`| `"Name"` |
| `SizeField`| `"Size"` |
| `PathField`| `"Path"` |
| `ExtensionField`| `"Extension"` |
| `IsDirectoryField`| `"IsDirectoryField"` |
| `DateCreatedField`| `"DateCreated"` |
| `DateCreateUtcField`| `"DateCreateUtc"` |
| `DateModifiedField`| `"DateModified"` |
| `DateModifiedUtcField`| `"DateModifiedUtc"` |
| **Item relations** | |
| `IdField `| `"Id" ` |
| `ParentIdField`| `"ParentId"` |
| `HasDirectoriesField`| `"HasDirectories"` |
| `DirectoriesField`| `"Directories"` |
| `EntriesField`| `"Entries"` |

>important Do not use `ParentId` with hierarchical data. This will confuse the FileManager that it is bound to flat data and the component may not render any items. If the model must have a `ParentId` property, set `ParentIdField` to a non-existent property.

## Next Steps

Learn the different ways to provide data to a TreeView:

* [Use flat data](slug:filemanager-data-binding-flat-data)
* [Use hierarchical data](slug:filemanager-data-binding-hierarchical-data) - each item holds its children in a nested property


## See Also

* [Binding to Flat Data](slug:filemanager-data-binding-flat-data)
* [Binding to Hierarchical Data](slug:filemanager-data-binding-hierarchical-data)
* [Live Demo: FileManager Flat Data](https://demos.telerik.com/blazor-ui/filemanager/flat-data)
* [Live Demo: FileManager Hierarchical Data](https://demos.telerik.com/blazor-ui/filemanager/hierarchical-data)
