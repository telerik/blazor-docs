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
    * [PathChanged](#pathchanged)
    * [SelectedItemsChanged](#selecteditemschanged)
    * [ViewChanged](#viewchanged)

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

````RAZOR
@using System.IO

<TelerikFileManager @bind-Path="@DirectoryPath"
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
    private List<FlatFileEntry> SourceData = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";
    private string DirectoryPath { get; set; } = "root-folder-path";

    private async Task OnRead(FileManagerReadEventArgs args)
    {
        await Task.Delay(500);

        //here you can pass only the files for the current directory, so you don't load the whole data collection
        args.Data = SourceData;
        args.Total = SourceData.Count;
    }

    private async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
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

            var updatedItem = SourceData.FirstOrDefault(x => x.MyModelId == item.MyModelId);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
        }
    }

    private async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
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


    private async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var currItem = args.Item as FlatFileEntry;

        var itemToDelete = SourceData.FirstOrDefault(x => x.MyModelId == currItem.MyModelId);

        //simulate item deletion
        SourceData.Remove(itemToDelete);

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
        SourceData = new List<FlatFileEntry>(SourceData);
    }

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        SourceData = await GetFlatFileEntries();
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
            Path = Path.Combine(Documents.Path, "Specification.docx"),
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

## Other Events

### OnModelInit

The `OnModelInit` event fires when a new instance of the model is about to be created. Handle this event to allow the creation of a new folder/file. Provide an instance of the model that the component is bound to and include the desired properties (name, path, date of creation and more). See the [example](#example).

### OnDownload

The `OnDownload` event fires before a file download starts. The event is cancellable. The event handler argument is an `FileManagerDownloadEventArgs` object. See the [example](#example).

#### Downloading Large Files

The files are downloaded with the help of a Base64 data URL, which is sent to the browser through `JSInterop`. JavaScript code generates an `<a>` tag with an [object URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static) on the web page and the tag is clicked programmatically, so that the browser shows its **Save File** dialog.

Large files (tens or hundreds of megabytes) may hit the browser's max data URL length or some memory threshold. In such cases, perform the following steps:

* Use the [Microsoft JSInterop approach and serve the file directly from the server to the user](https://learn.microsoft.com/en-us/aspnet/core/blazor/file-downloads?view=aspnetcore-6.0#download-from-a-url).
* Start the Microsoft JSInterop algorithm from the FileManager's `OnDownload` handler, but cancel the event to prevent duplicate downloads.

>tip You can also vote for the [FileManager feature request to expose a Proxy Url](https://feedback.telerik.com/blazor/1633629) for serving files from the server to the browser.

#### Downloading Server Files in WebAssembly Apps

A FileManager in a WebAssembly app usually displays files from a remote server. In such cases, use the following download approach:

1. The `OnDownload` handler serializes and sends `args.Item` to the remote server. Do not try to serialize and send `args.Stream`.
1. The server returns the file content.
1. The `OnDownload` handler puts the returned file content to a `MemoryStream` and assigns it to `args.Stream`.

### PathChanged

The `PathChanged` event fires when the user navigates to a different folder through the TreeView or by double-clicking a folder item in the [FileManager View](slug:filemanager-views). The event handler receives the new path as a `string` argument.

### SelectedItemsChanged

The `SelectedItemChanged` event fires every time the user clicks on a new file/folder in the main pane of the FileManager. You can use it with one-way binding of the `SelectedItems` parameter to respond to user selection.

### ViewChanged

The `ViewChanged` event fires when the user toggles between the [two FileManager views (`Grid` and `ListView`)](slug:filemanager-views). If you are using the event, make sure to update the value of the `View` parameter, otherwise the user action will have no effect.

## Example

>caption Handle FileManager events.

````RAZOR
@using System.IO

<TelerikFileManager Data="@Files"
                    Path="@DirectoryPath"
                    PathChanged="@OnPathChanged"
                    View="@CurrentView"
                    ViewChanged="@OnViewChanged"
                    Height="400px"
                    OnCreate="@OnCreateHandler"
                    OnUpdate="@OnUpdateHandler"
                    OnDelete="@OnDeleteHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    SelectedItems="@SelectedItems"
                    SelectedItemsChanged="@((IEnumerable<FlatFileEntry> selectedFiles) => OnSelect(selectedFiles))">
</TelerikFileManager>

@code {
    private List<FlatFileEntry> Files { get; set; } = new();

    private string DirectoryPath { get; set; } = string.Empty;

    private IEnumerable<FlatFileEntry> SelectedItems { get; set; } = new List<FlatFileEntry>();

    private FileManagerViewType CurrentView { get; set; }

    private void OnViewChanged(FileManagerViewType newView)
    {
        CurrentView = newView;
    }

    private async Task OnCreateHandler(FileManagerCreateEventArgs args)
    {
        var newFolder = (FlatFileEntry)args.Item;

        var parent = GetParent(newFolder, DirectoryPath);

        newFolder.Id = "20";
        newFolder.ParentId = parent?.Id;
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
            // Simulate add to the file system.
            newFolder.ParentId = parentDirectory.Id;
            Files.Add(newFolder);
            parentDirectory.HasDirectories = Files.Count(x => x.ParentId == parentDirectory.Id) > 0;
        }
        else
        {
            // Create a folder in the root directory.
            Files.Add(newFolder);
        }

        await RefreshData();
    }

    private FlatFileEntry? GetDirectory(string path)
    {
        var directory = Files.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
    }

    private FlatFileEntry? GetParent(FlatFileEntry currItem, string currDirectory)
    {
        var parentItem = Files
            .FirstOrDefault(x => x.IsDirectory && x.Path == currDirectory);

        return parentItem;
    }


    private async Task OnUpdateHandler(FileManagerUpdateEventArgs args)
    {
        var item = (FlatFileEntry)args.Item;

        if (item.IsDirectory)
        {
            // Prevent renaming of directories. If you allow that, make sure
            // to also update the Path of the children.
        }
        else
        {
            // The name property is updated, but also update the path to the file.
            var name = item.Name ?? string.Empty;
            var extension = item.Extension ?? string.Empty;
            var fullName = extension.Length > 0 && name.EndsWith(extension) ?
                name : $"{name}{extension}";

            var updatedItem = Files.FirstOrDefault(x => x.Id == item.Id);

            updatedItem.Name = item.Name;
            updatedItem.Path = Path.Combine(DirectoryPath, fullName);
            Console.WriteLine(updatedItem.Path);
        }

        await Task.Delay(1); // simulate async operation
    }

    private async Task OnDownloadHandler(FileManagerDownloadEventArgs args)
    {
        var selectedItem = args.Item as FlatFileEntry;

        // The Filemanager does not have the actual file.
        // Obtain the file contents, based on args.Item, and set the event arguments:

        //args.Stream = the file stream of the actual selected file;
        //args.MimeType = the MIME type of the actual file;
        //args.FileName = the file name that the browser will receive (optional);

        FlatFileEntry actualFile = (FlatFileEntry)args.Item;

        await Task.Delay(1); // simulate async operation
        string dummyFileContent = $"This file is a dummy version of {actualFile.Name}. It was downloaded with the Telerik Blazor FileManager.";
        byte[] dummyFileBuffer = System.Text.Encoding.UTF8.GetBytes(dummyFileContent);

        args.Stream = new MemoryStream(dummyFileBuffer);
        args.MimeType = "text/plain";
        args.FileName = $"filemanager-{actualFile.Name}-{DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss")}.txt";
    }

    private async Task OnDeleteHandler(FileManagerDeleteEventArgs args)
    {
        var item = (FlatFileEntry)args.Item;

        var itemToDelete = Files.FirstOrDefault(x => x.Id == item.Id);

        Files.Remove(itemToDelete);

        await RefreshData();
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

    private void OnPathChanged(string newPath)
    {
        DirectoryPath = newPath;
    }

    private void OnSelect(IEnumerable<FlatFileEntry> selectedFiles)
    {
        // Update the view model.
        SelectedItems = selectedFiles;
    }

    private async Task RefreshData()
    {
        await Task.Delay(1); // simulate async operation
        Files = new List<FlatFileEntry>(Files);
    }

    protected override async Task OnInitializedAsync()
    {
        Files = await GetFlatFileEntries();
    }

    public class FlatFileEntry
    {
        public string Id { get; set; } = string.Empty;
        public string? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public long Size { get; set; }
        public string Path { get; set; } = string.Empty;
        public string Extension { get; set; } = string.Empty;
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

        await Task.Delay(1); // simulate async operation

        return files;
    }
}
````
