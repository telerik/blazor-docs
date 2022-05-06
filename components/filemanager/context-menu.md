---
title: Context Menu
page_title: FileManager Context Menu
description: Context Menu of the FileManager for Blazor.
slug: filemanager-context-menu
tags: telerik,blazor,filemanager,contextmenu, menu, context
published: True
position: 3
---

# FileManager Context Menu

The ContextMenu of the FileManager enables you to easily execute commands on the selected file or folder.

The component uses the Telerik UI for Blazor ContextMenu and provides the following commands:

* [Rename](#rename)
* [Download](#download)
* [Delete](#delete)


## Rename

The `Rename` command of the FileManager ContextMenu allows renaming the selected file or folder. Users can rename one item at a time - the one they open the ContextMenu for.

Clicking the command will fire the [`OnEdit`]({%slug filemanager-events%}#onedit) event. An input with the file/folder name will be rendered, so the user can edit it. Pressing `Enter` or bluring the input will fire the [`OnUpdate`]({%slug filemanager-events%}#onupdate) event allowing you can handle the name update of the actual item in your data source.

When an item is renamed, make sure to also update its `Path`. Renaming a directory that has children will require updating their `Path` as well.

## Download

The `Download` command of the FileManager ContextMenu allows downloading of the selected file.

Clicking the command will fire the [`OnDownload`]({%slug filemanager-events%}#ondownload) event, so you can handle the actual download.

The component does not have the actual files, so the `Item` field of the `FileManagerDownloadEventArgs` just provide metadata of the selected file. Based on that, you shold find the actual in the data source and provide the following data to the arguments, so the download can be performed:

* `args.Stream` - the `MemoryStream` of the actual selected file.
* `args.MimeType` = the `MimeType` of the actual file.

In addition, you can also provide a custom file name through the `FileName` field of the `FileManagerDownloadEventArgs`.

## Delete

The `Delete` command of the FileManager ContextMenu allows deleting of the selected files. Multiple file deletion is supported. It does not matter which item the ContextMenu for, the `Delete` command will handle the deletion of all selected files.

Clicking the command will open a delete confirmation dialog. Pressing the `OK` button wil fire the [`OnDelete`]({%slug filemanager-events%}#ondelete) event, so you can handle the deletion of the actual files in the data source. Plessing the `Cancel` button will close the dialog and prevent the deletion.

# Example

The following example demonstrates handling of the ContextMenu commends.

````CSHTML
<TelerikFileManager Data="@Data"
                    @bind-Path="@DirectoryPath"
                    Height="400px"
                    OnUpdate="@OnUpdateHandler"
                    OnModelInit="@OnModelInitHandler"
                    OnDownload="@OnDownloadHandler"
                    OnDelete="@OnDeleteHandler">
</TelerikFileManager>

@code {
    public List<FlatFileEntry> Data = new List<FlatFileEntry>();
    public string DirectoryPath { get; set; } = string.Empty;  

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

            var updatedItem = Data.FirstOrDefault(x => x.Id == item.Id);

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

        var itemToDelete = Data.FirstOrDefault(x => x.Id == currItem.Id);

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

        #region folder My Files config
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
        #endregion


        #region folder Documents config
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
        #endregion

        #region folder Images config
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
        #endregion

        #region Documents files config
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

        #endregion


        #region Images files coonfig
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

        #endregion

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

## See Also

* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
* [FileManager Events]({%slug filemanager-events%})