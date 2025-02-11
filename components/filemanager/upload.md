---
title: Upload
page_title: FileManager - Upload
description: Upload files in the FileManager for Blazor.
slug: filemanager-upload
tags: telerik,blazor,upload,files
published: True
position: 17
---

# FileManager Upload

The FileManager allows uploading of files through an integrated Upload component. The Upload shows in a dialog when the user clicks on the [`Upload` Toolbar button](slug:filemanager-toolbar).

>tip Before continuing, make sure you are familiar with the features and API of the [Upload component](slug:upload-overview).

Configure the integrated Upload through the `FileManagerUploadSettings` child tag of `FileManagerSettings`. The FileManager exposes parameter names that are identical to the respective Upload component API members:

* [Upload parameters](slug:upload-overview#upload-parameters)
* [Upload validation settings](slug:upload-validation)
* [Upload events](slug:upload-events)

## Example

The example below demonstrates how to handle successful upload on the FileManager. Note the following milestones:

* To actually **upload** the file, [implement a controller method](slug:upload-overview#implement-controller-methods).
* To save the file in the **correct folder**, use the [Upload's `OnUpload` event](slug:upload-events#onupload) and send the FileManager's `Path` value to the controller.
* To receive an optional **custom response** from the controller, use the [Upload's `OnSuccess` event arguments](slug:upload-events#onsuccess).

>caption Using FileManager Upload

<div class="skip-repl"></div>

````RAZOR
@using System.IO

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@DirectoryPath"
                    OnModelInit="@OnModelInitHandler"
                    Height="400px">
    <FileManagerSettings>
        <FileManagerUploadSettings SaveUrl="api/filemanager/save"
                                   RemoveUrl="/api/filemanager/remove"
                                   OnUpload="@OnUploadUpload"
                                   OnSuccess="@OnUploadSuccess">
        </FileManagerUploadSettings>
    </FileManagerSettings>
</TelerikFileManager>

@code {
    private List<FlatFileEntry> FileManagerData = new List<FlatFileEntry>();

    private string RootPath { get; set; } = "root-folder-path";
    private string DirectoryPath { get; set; } = "root-folder-path";

    private async Task OnUploadUpload(UploadEventArgs args)
    {
        // Send the correct save location to the Upload controller
        args.RequestData.Add("FileManagerPath", DirectoryPath);
    }

    private async Task OnUploadSuccess(UploadSuccessEventArgs args)
    {
        await UploadAsync(args, DirectoryPath);
    }

    private async Task UploadAsync(UploadSuccessEventArgs args, string path)
    {
        await Task.Delay(300);

        var uploadFiles = args.Files;

        // Optional: use information from the Upload controller response
        //var uploadResponse = args.Request.ResponseText;

        var files = uploadFiles
            .Select(x => new FlatFileEntry()
                {
                    Name = Path.GetFileNameWithoutExtension(x.Name),
                    IsDirectory = false,
                    HasDirectories = false,
                    DateCreated = DateTime.Now,
                    DateCreatedUtc = DateTime.Now,
                    DateModified = DateTime.Now,
                    DateModifiedUtc = DateTime.Now,
                    Path = Path.Combine(path, x.Name),
                    Extension = Path.GetExtension(x.Name),
                    Size = x.Size
                })
            .ToList();

        var directory = GetDirectory(path);
        var directoryItems = FileManagerData;

        for (int i = 0; i < files.Count; i++)
        {
            var file = files[i];
            directoryItems.Add(file);
        }

        RefreshData();
    }

    private FlatFileEntry GetDirectory(string path)
    {
        var directory = FileManagerData.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
    }

    private void RefreshData()
    {
        FileManagerData = new List<FlatFileEntry>(FileManagerData);
    }

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

    // The FileManager is hard-coded, so you can explore the component more easily
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
}
````

## Next Steps

* [Upload Events](slug:upload-events)
* [Upload Validation](slug:upload-validation)

## See Also

* [FileManager Upload Demo](https://demos.telerik.com/blazor-ui/upload/overview)
