---
title: Preview Pane
page_title: FileManager Preview Pane
description: Preview Pane in the FileManager for Blazor.
slug: filemanager-preview-pane
tags: telerik,blazor,filemanager,preview,pane
published: True
position: 9
---

# FileManager Preview Pane

The Preview Pane shows additional information about the selected file or folder in the view.

The preview pane visibility toggles by the Switch Tool in the FileManager Toolbar. By default, it shows the following information about the selected file or folder:

* Thumbnail, representing the file
* File Type Category
* File size
* Date created
* Date modified

>caption Toggle Preview Pane using the Switch.

![Blazor Filemanager Preview Pane](images/filemanager-preview-pane.png)

````CSHTML
@using System.IO

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    OnModelInit="@OnModelInitHandler"
                    Height="400px" />

@code {
    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private string DirectoryPath { get; set; } = string.Empty;

    // fetch the FileManager data
    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFlatFileEntries();
    }

    //initialize the model to allow new folder creation
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
                Path = Path.Combine("Work Files"),
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
                Path = Path.Combine(Documents.Path, "Specification.docx"),
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

        return await Task.FromResult(files);
    }
}
````

## See Also

* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
