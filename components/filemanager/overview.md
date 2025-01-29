---
title: Overview
page_title: FileManager Overview
description: Overview of the FileManager for Blazor.
slug: filemanager-overview
tags: telerik,blazor,filemanager,overview
published: True
position: 0
---

# Blazor FileManager Overview

The <a href = "https://www.telerik.com/blazor-ui/file-manager" target="_blank">Blazor FileManager component</a> is an Explorer-like component that enables you to [upload](slug://filemanager-upload), [download](slug://filemanager-context-menu#download), [rename](slug://filemanager-context-menu#rename) and manage file and folders.


## Creating Blazor FileManager

1. Add the `TelerikFileManager` tag.
2. Set FileManager `Data` attribute to an `IEnumerable<TItem>`. [Read more for the component data binding](slug://filemanager-data-binding-overview).
3. Set the `Path` parameter via one-way or two-way binding.
4. To allow file operations such as rename, delete, and create new folder, handle the following FileManager [events](slug://filemanager-events): ([`OnModelInit`](slug://filemanager-events#onmodelinit), [`OnCreate`](slug://filemanager-events#oncreate), [`OnUpdate`](slug://filemanager-events#onupdate), [`OnDelete`](slug://filemanager-events#ondelete), [`OnDownload`](slug://filemanager-events#ondownload)).

>caption Telerik Blazor FileManager

````RAZOR
@using System.IO

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    Height="400px"
                    OnCreate="@OnCreateHandler"
                    OnUpdate="@OnUpdateHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    OnDelete="@OnDeleteHandler">
</TelerikFileManager>

@code {
    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";
    private string DirectoryPath { get; set; } = "root-folder-path";

    private async Task OnCreateHandler(FileManagerCreateEventArgs args)
    {
        // the new item data is hardcoded for the purpose of the example
        var newFolder = args.Item as FlatFileEntry;

        var parent = GetParent(newFolder, DirectoryPath);

        newFolder.Id = DirectoryPath + newFolder.Name.ToString();
        newFolder.ParentId = parent != null ? parent.Id : null;
        newFolder.IsDirectory = true;
        newFolder.HasDirectories = false;
        newFolder.DateCreated = DateTime.Now;
        newFolder.DateCreatedUtc = DateTime.Now;
        newFolder.DateModified = DateTime.Now;
        newFolder.DateModifiedUtc = DateTime.Now;
        newFolder.Path = Path.Combine(DirectoryPath, newFolder.Name);
        newFolder.Extension = null;

        var parentDirectory = GetDirectory(DirectoryPath) ?? GetParent(newFolder, DirectoryPath);

        if (parentDirectory != null)
        {
            // simulate add in file system
            newFolder.ParentId = parentDirectory.Id;
            FileManagerData.Add(newFolder);
            parentDirectory.HasDirectories = FileManagerData.Count(x => x.ParentId == parentDirectory.Id) > 0;
        }
        else
        {
            // create a folder in the root dir
            FileManagerData.Add(newFolder);
        }

        RefreshData();
    }

    private FlatFileEntry GetDirectory(string path)
    {
        var directory = FileManagerData.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
    }

    private FlatFileEntry GetParent(FlatFileEntry currItem, string currDirectory)
    {
        var parentItem = FileManagerData
            .FirstOrDefault(x => x.IsDirectory == true && x.Path == currDirectory);

        return parentItem;
    }


    private async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
    {
        var item = args.Item as FlatFileEntry;

        if (item.IsDirectory)
        {
            // prevent renaming of directories. If you allow that, make sure
            // to also update the Path of the children
        }
        else
        {
            // the name prop is updated, but update the path to the file as well
            var name = item.Name ?? string.Empty;
            var extension = item.Extension ?? string.Empty;
            var fullName = extension.Length > 0 && name.EndsWith(extension) ?
                name : $"{name}{extension}";

            var updatedItem = FileManagerData.FirstOrDefault(x => x.Id == item.Id);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
            Console.WriteLine(updatedItem.Path);
        }
    }

    private async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
    {
        var selectedItem = args.Item as FlatFileEntry;

        //the Filemanager does not have the actual file.
        //To download it, find the selected file through args.Item and
        //assign the actual file to the argument as follows:

        //args.Stream = the file stream of the actual selected file;
        //args.MimeType = the mime type of the actual file, so it can be downloaded;
        //args.FileName = allows overriding the name of the downloaded file;
    }

    private async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var currItem = args.Item as FlatFileEntry;

        var itemToDelete = FileManagerData.FirstOrDefault(x => x.Id == currItem.Id);

        FileManagerData.Remove(itemToDelete);

        RefreshData();
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

    private void RefreshData()
    {
        FileManagerData = new List<FlatFileEntry>(FileManagerData);
    }

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFlatFileEntries();
    }

    // a model to bind the FileManager. Should usually be in its own separate location.
    public class FlatFileEntry
    {
        public string Id { get; set; }
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
            Id = "1",
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
            Id = "2",
            ParentId = workFiles.Id,
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
            Id = "3",
            ParentId = workFiles.Id,
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
            Id = "4",
            ParentId = Documents.Id,
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
            Id = "5",
            ParentId = Documents.Id,
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
            Id = "6",
            ParentId = Images.Id,
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
            Id = "7",
            ParentId = Images.Id,
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

        return files;
    }
}
````

>Each `FileManagerEntry`'s `Path` needs to finish with the data item's `Name`, following the style used in real file systems. Also, ensure the top-level directories and files start with a predefined root path.

## Data Binding

The FileManager allows data binding to flat and hierarchical data. There are two alternative ways to provide data to the FileManager:

* Set the FileManager `Data` attribute. In this case, the component will hold all the data.

* Use the FileManager `OnRead` event and pass the data to the event argument. In this case, the FileManager will hold only the data items for the current folder.

The following list of resources provides details and examples for data binding a FileManager in various scenarios:

* General information on how data binding works - [FileManager Data Binding Overview](slug://filemanager-data-binding-overview).

* Binding to a self-referencing flat data source - [Bind FileManager to Flat Self-Referencing Data](slug://filemanager-data-binding-flat-data).

* Using hierarchical data source with item collections nested in each item - [Bind FileManager to Hierarchical Data](slug://filemanager-data-binding-hierarchical-data).

* Handling the `OnRead` event to provide only the current folder data - [FileManager `OnRead`](slug://filemanager-events#read-event).

## Views

The FileManager can [show files and folders in a Grid or in a ListView](slug://filemanager-views). The default mode is ListView, which displays files and folders as thumbnails.

## Toolbar

The FileManger integrates a Toolbar with various commands. [Read more about the available FileManager Toolbar commands...](slug://filemanager-toolbar)

## Navigation

The FileManger allows navigating through the file system in a couple ways - TreeView in a dedicated pane and a Breadcrumb. [Read more about the FileManager Navigation...](slug://filemanager-navigation)

## Preview Pane

A dedicated Preview Pane can be toggled to display details for the selected file or folder. Its visibility is controlled via a Switch in the Toolbar. [Read more about the FileManager Preview Pane...](slug://filemanager-preview-pane)

## Context Menu

The FileManager displays a Context Menu on right click of an item. The menu provides several built-in commands. [Read more about the Context Menu options...](slug://filemanager-context-menu)


## Reference and Methods

To use the FileManager methods, define a reference to the component instance with the `@ref` attribute (example below). The FileManager is a generic component and its type comes from the model it is bound to.

The available FileManager methods are:

* `Rebind` - refreshes the FileManager data.

<div class="skip-repl"></div>
````RAZOR
<TelerikFileManager Data="@Data"
                    @ref="@FileManagerRef" />

@code{
    TelerikFileManager<FlatFileEntry> FileManagerRef;
}
````


## FileManager Parameters

The following table lists the FileManager parameters. Also check the [FileManager API Reference](slug://Telerik.Blazor.Components.TelerikFileManager-1) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and &nbsp; DefaultValue | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<TItem>` | Allows providing data source to the component. See [data bindnig](slug://filemanager-data-binding-overview).
| `EnableLoaderContainer` | `bool` |  Specifies if loader container should be shown on slow async operations
| `Path` | `string` | The current path. Updated when the user navigates. Two-way bindale. Handle the [`PathChanged`](slug://filemanager-events#pathchanged) event if you need to react to the user navigation.
| `View` | `FileManagerViewType` enum <br /> (`ListView`) | The layout of the FileManager main section. It can [show the files and folders as table rows or as thumbnails](slug://filemanager-views). |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor FileManager:

| Parameter | Type and &nbsp; DefaultValue | Description |
|----------|----------|----------|
| `Class`| `string` |The CSS class that will be rendered on the topmost wrapping element of the component.
| `Width`|`string`|The width of the component.
| `Height` | `string` | The height of the component.

## Next Steps

* [Data bind the FileManager](slug://filemanager-data-binding-overview)
* [Explore FileManager Events](slug://filemanager-events)


## See Also

* [FileManager API](slug://Telerik.Blazor.Components.TelerikFileManager-1)
* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
