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

The FileManager allows uploading of files through an integrated Upload component. It is displayed in a dialog on click of the [`Upload` Toolbar button]({%slug filemanager-toolbar%}).

Before continuing, make sure you are familiar with the specifics of the [Upload component]({%slug upload-overview%}).

The upload can be configured through the `FileManagerUploadSettings` child tag of the `FileManagerSettings`.

The available settings are inherited from the Upload features and events. Here is a list of the supported configurations:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|----------|
| **General configuration** (also check [Upload - Parameters]({%slug upload-overview%}#upload-parameters)) |
| `SaveUrl` | The upload url
| `SaveField`| Sets the FormData key which contains the files submitted to saveUrl.
| `RemoveUrl`| The URL of the handler which is responsible for the removal of the uploaded files (if any).
| `RemoveField`| Sets the FormData key which contains the list of file names that are submitted to removeUrl.
| `WithCredentials`| Configures whether credentials (cookies, headers) will be sent for cross-site requests.
| **File validation** (also check [Upload - Validation]({%slug upload-validation%}))| |
| `AllowedExtensions` | The list of the allowed file extensions.
| `MinFileSize` | Defines the minimum file size in bytes.
| `MaxFileSize` | Defines the maximum file size in bytes.
| **Events** (also check [Upload - Events]({%slug upload-events%}))| |
| `OnUpload` | Triggered before a file is uploaded.
| `OnRemove` | Triggered before an Upload file is removed.
| `OnSuccess` | Triggered when a file has been uploaded.
| `OnError` | Triggered when a file upload has failed.
| `OnCancel` | Triggered when a file upload is canceled.
| `OnSelect` | Triggered when a file is selected for upload.
| `OnProgress` | Triggered when the progress of the file upload is changed.


## Example

The example below demonstrates how to handle successful upload on the FileManager. To actually upload the file, you must configure an appropriate controller similar to the []({%slug upload-overview%}#implement-controller-methods).

````CSHTML
@using System.IO

<TelerikFileManager Data="@Data"
                    @bind-Path="@DirectoryPath"                    
                    Height="400px">
    <FileManagerSettings>
        <FileManagerUploadSettings SaveUrl="api/filemanager/save"
                                   RemoveUrl="/api/filemanager/remove"
                                   OnSuccess="@OnUploadSuccess">
        </FileManagerUploadSettings>
    </FileManagerSettings>
</TelerikFileManager>

@code {
    public List<FlatFileEntry> Data = new List<FlatFileEntry>();
    public string DirectoryPath { get; set; } = string.Empty;

    public async Task OnUploadSuccess(UploadSuccessEventArgs args)
    {
        await UploadAsync(args, DirectoryPath);
    }

    async Task UploadAsync(UploadSuccessEventArgs args, string path)
    {
        await Task.Delay(300);

        var uploadFiles = args.Files;

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
        var directoryItems = Data;

        for (int i = 0; i < files.Count; i++)
        {
            var file = files[i];
            directoryItems.Add(file);
        }

        RefreshData();
    }

    private FlatFileEntry GetDirectory(string path)
    {
        var directory = Data.FirstOrDefault(x => x.IsDirectory && x.Path == path);

        return directory;
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

## Next Steps

* [Upload Events]({%slug upload-events%})
* [Upload Validation]({%slug upload-validation%})

## See Also

* [FileManager Upload Demo](https://demos.telerik.com/blazor-ui/upload/overview)
