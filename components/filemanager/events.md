---
title: Events
page_title: FileManager Events
description: Events in the FileManager for Blazor.
slug: filemanager-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
---

# FileManager Events

This article explains the events available in the Telerik FileManager for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items.
    * [OnCreate](#oncreate)
    * [OnUpdate](#onupdate)
    * [OnEdit](#onedit)
    * [OnDelete](#ondelete)
* [Read Event](#read-event) - event related to obtaining data.
* [Other Events](#other-events) - other events the grid provides.
    * [OnModelInit](#onmodelinit)
    * [OnDownload](#ondownload)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` event let you respond to user actions - when they want to edit an item. See the [example](#example).

### OnCreate

The `OnCreate` event fires when a new item is created (new folder). Its event handler receives the updated `FileManagerCreateEventArgs` as an argument.

### OnUpdate

The `OnUpdate` event fires when a file is updated (rename finishes). Its event handler receives the updated `FileManagerUpdateEventArgs` as an argument.

### OnEdit

The `OnEdit` event fires when the user is about to enter edit mode for an existing item. Its event handler receives the updated `FileManagerEditEventArgs` as an argument.

### OnDelete

The `OnDelete` event fires when a file is deleted. Its event handler receives the updated `FileManagerDeleteEventArgs` as an argument.

## Read Event

In the common case, all the data is provided to the filemanager's `Data` collection and the `FileManager` performs the operations on it for you. In some cases, you may want to do this programmatically (for example, to retrieve only a small number of items to improve the backend performance). Attach the `OnRead` event to perform all the data read operations programmatically in the `FileManager`.

The `OnRead` event fires when the data source is read. Its event handler receives the updated `FileManagerReadEventArgs` as an argument.

>caption Handle OnRead.

````CSHTML
@using System.IO

<TelerikFileManager Data="@Data"
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
                    OnRead="@OnRead"
                    OnUpdate="@OnUpdateHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    OnDelete="@OnDeleteHandler">
</TelerikFileManager>

@code {
    public List<FlatFileEntry> Data = new List<FlatFileEntry>();
    public string DirectoryPath { get; set; } = string.Empty;

    public async Task OnRead(FileManagerReadEventArgs args)
    {
        await GetFlatFileEntries();

        args.Data = Data;
        args.Total = Data.Count;

        await Task.Yield();
    }

    async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
    {
        var item = args.Item as FlatFileEntry;

        if (item.IsDirectory)
        {
            // prevent renaming of directories. If you allow that, make sure
            //to also update the Path of the children
        }
        else
        {
            // simulate update of the file name and path
            var name = item.Name ?? string.Empty;
            var extension = item.Extension ?? string.Empty;
            var fullName = extension.Length > 0 && name.EndsWith(extension) ?
                name : $"{name}{extension}";

            var updatedItem = Data.FirstOrDefault(x => x.MyModelId == item.MyModelId);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
        }
    }

    async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
    {
        var selectedItem = args.Item as FlatFileEntry;

        //the FileManager does not have the actual file.
        //To download it, find the actual file in the datasource  
        //based on the selected file (args.Item) and
        //assign the following data to the argument:

        //args.Stream = the file stream of the actual selected file;
        //args.MimeType = the mime type of the actual file, so it can be downloaded;
        //args.FileName = allows overriding the name of the downloaded file;
    }


    async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var currItem = args.Item as FlatFileEntry;

        var itemToDelete = Data.FirstOrDefault(x => x.MyModelId == currItem.MyModelId);

        //simulate item deletion
        Data.Remove(itemToDelete);

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
        Data = new List<FlatFileEntry>(Data);
    }

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        Data = await GetFlatFileEntries();
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

    async Task<List<FlatFileEntry>> GetFlatFileEntries()
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
                Path = Path.Combine("files"),
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
                Path = Path.Combine(workFiles.Path, "documents"),
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
                Path = Path.Combine(workFiles.Path, "images"),
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
                Path = Path.Combine(Documents.Path, "monthly-report.xlsx"),
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
                Path = Path.Combine(Images.Path, "dashboard-design.png"),
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
                Path = Path.Combine(Images.Path, "grid-design.jpg"),
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

## Other Events

### OnModelInit

The `OnModelInit` event fires when a new instance of the model is about to be created. See the [example](#example).

### OnDownload

The `OnDownload` event fires before a file is to be downloaded, cancellable. Its event handler receives the updated `FileManagerDownloadEventArgs` as an argument. See the [example](#example).

## Example

>caption Handle FileManager events.

````CSHTML
@using System.IO

<TelerikFileManager Data="@Data"
                    @bind-Path="@DirectoryPath"
                    Height="400px"
                    OnCreate="@OnCreateHandler"
                    OnUpdate="@OnUpdateHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    OnDelete="@OnDeleteHandler">
</TelerikFileManager>

@code {
    public List<FlatFileEntry> Data = new List<FlatFileEntry>();
    public string DirectoryPath { get; set; } = string.Empty;

    async Task OnCreateHandler(FileManagerCreateEventArgs args)
    {
        var newFolder = args.Item as FlatFileEntry;

        var parent = GetParent(newFolder, DirectoryPath);

        newFolder.Id = "20";
        newFolder.ParentId = parent.Id;
        newFolder.Name = "New folder";
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
            Data.Add(newFolder);
            parentDirectory.HasDirectories = Data.Count(x => x.ParentId == parentDirectory.Id) > 0;
        }
        else
        {
            // create a folder in the root dir
            Data.Add(newFolder);
        }

        RefreshData();
    }

    private FlatFileEntry GetDirectory(string path)
    {
        var directory = Data.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
    }

    private FlatFileEntry GetParent(FlatFileEntry currItem, string currDirectory)
    {
        var parentItem = Data
            .FirstOrDefault(x => x.IsDirectory && x.Path == currDirectory);

        return parentItem;
    }


    async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
    {
        var item = args.Item as FlatFileEntry;

        if (item.IsDirectory)
        {
            // prevent renaming of directories. If you allow that, make sure
            //to also update the Path of the children
        }
        else
        {
            // the name prop is updated, but update the path to the file as well
            var name = item.Name ?? string.Empty;
            var extension = item.Extension ?? string.Empty;
            var fullName = extension.Length > 0 && name.EndsWith(extension) ?
                name : $"{name}{extension}";

            var updatedItem = Data.FirstOrDefault(x => x.Id == item.Id);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
            Console.WriteLine(updatedItem.Path);
        }
    }

    async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
    {
        var selectedItem = args.Item as FlatFileEntry;

        //the Filemanager does not have the actual file.
        //To download it, find the selected file through args.Item and
        //assign the actual file to the argument as follows:

        //args.Stream = the file stream of the actual selected file;
        //args.MimeType = the mime type of the actual file, so it can be downloaded;
        //args.FileName = allows overriding the name of the downloaded file;

    }


    async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var currItem = args.Item as FlatFileEntry;

        var itemToDelete = Data.FirstOrDefault(x => x.Id == currItem.Id);

        Data.Remove(itemToDelete);

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
        Data = new List<FlatFileEntry>(Data);
    }

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        Data = await GetFlatFileEntries();
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

    async Task<List<FlatFileEntry>> GetFlatFileEntries()
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
                Path = Path.Combine("files"),
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
                Path = Path.Combine(workFiles.Path, "documents"),
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
                Path = Path.Combine(workFiles.Path, "images"),
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
                Path = Path.Combine(Documents.Path, "monthly-report.xlsx"),
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
                Path = Path.Combine(Images.Path, "dashboard-design.png"),
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
                Path = Path.Combine(Images.Path, "grid-design.jpg"),
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
