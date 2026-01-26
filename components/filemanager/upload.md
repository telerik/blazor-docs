---
title: Upload
page_title: FileManager - Upload
description: Upload files in the FileManager for Blazor.
slug: filemanager-upload
tags: telerik,blazor,upload,files
published: True
position: 17
components: ["filemanager"]
---
# FileManager Upload

The FileManager allows uploading of files through an integrated Upload component. The Upload shows in a dialog when the user clicks on the [`Upload` Toolbar button](slug:filemanager-toolbar).

>tip Before you continue, make sure you are familiar with the features and API of the [Telerik Upload component](slug:upload-overview).

Configure the integrated Upload through the `FileManagerUploadSettings` child tag of `FileManagerSettings`. The FileManager exposes parameter names that are identical to the respective Upload component API members:

* [Upload parameters](slug:upload-overview#upload-parameters)
* [Upload validation settings](slug:upload-validation)
* [Upload events](slug:upload-events)

## Example

The example below demonstrates how to handle successful uploads in the FileManager. Note the following milestones:

* To upload the file, [implement a controller method](slug:upload-overview#implement-controller-methods).
* To save the file to the correct folder, use the [Upload's `OnUpload` event](slug:upload-events#onupload) and send the FileManager's `Path` value to the controller.
* To receive an optional custom response from the controller, use the [Upload's `OnSuccess` event arguments](slug:upload-events#onsuccess).

The `FileManagerController` class below assumes that the project name and namespace is `TelerikBlazorApp`. The FileManager `Data` is the contents of the application's `wwwroot` folder.

>caption Using FileManager Upload

<div class="skip-repl"></div>

````RAZOR
@using System.IO

@inject NavigationManager NavigationManager

<p>Path: @FileManagerPath</p>

<TelerikFileManager Data="@FileManagerData"
                    @bind-Path="@FileManagerPath">
    <FileManagerSettings>
        <FileManagerUploadSettings SaveUrl="@ToAbsoluteUrl("api/filemanager/save")"
                                   RemoveUrl="@ToAbsoluteUrl("api/filemanager/remove")"
                                   Multiple="true"
                                   OnUpload="@OnFileManagerUploadRequest"
                                   OnRemove="@OnFileManagerUploadRequest"
                                   OnSuccess="@OnFileManagerUploadSuccess" />
    </FileManagerSettings>
</TelerikFileManager>

@code {
    private List<FileManagerItem> FileManagerData { get; set; } = new();

    private string FileManagerPath { get; set; } = string.Empty;

    // The source root folder for FileManagerData
    private readonly string RootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

    private string ToAbsoluteUrl(string url)
    {
        return string.Concat(NavigationManager.BaseUri, url);
    }

    private void OnFileManagerUploadRequest(UploadEventArgs args)
    {
        // If FileManagerPath is empty, the controller action will not be hit
        string pathToSend = string.IsNullOrEmpty(FileManagerPath) ? "/" : FileManagerPath;

        args.RequestData.Add("FileManagerPath", pathToSend);
    }

    private async Task OnFileManagerUploadSuccess(UploadSuccessEventArgs args)
    {
        FileManagerData = await GetFileManagerData();

        // OR
        // you can add or remove items in FileManagerData manually
        // depending on the value of args.Operation and args.Files
    }

    protected override async Task OnInitializedAsync()
    {
        FileManagerData = await GetFileManagerData();
    }

    #region FileManager Data Generation

    private async Task<List<FileManagerItem>> GetFileManagerData()
    {
        // Simulate async operation
        await Task.CompletedTask;

        return ReadFileSystem();
    }

    private List<FileManagerItem> ReadFileSystem()
    {
        var items = new List<FileManagerItem>();

        string rootPath = Path.Combine(RootPath);
        DirectoryInfo rootDirectory = new(rootPath);

        AddChildren(items, rootDirectory, null);

        return items;
    }

    private void AddDirectory(List<FileManagerItem> items, DirectoryInfo directoryInfo, string? parentId)
    {
        FileManagerItem directoryEntry = ConvertToFileManagerItem(directoryInfo, parentId);
        items.Add(directoryEntry);

        AddChildren(items, directoryInfo, directoryEntry.Id);
    }

    private void AddChildren(List<FileManagerItem> items, DirectoryInfo directoryInfo, string? directoryId)
    {
        IEnumerable<FileInfo> files = directoryInfo.EnumerateFiles();
        foreach (FileInfo file in files)
        {
            FileManagerItem item = ConvertToFileManagerItem(file, directoryId);
            items.Add(item);
        }

        IEnumerable<DirectoryInfo> directories = directoryInfo.EnumerateDirectories();
        foreach (DirectoryInfo directory in directories)
        {
            AddDirectory(items, directory, directoryId);
        }
    }

    private FileManagerItem ConvertToFileManagerItem(DirectoryInfo directory, string? parentId)
    {
        var item = new FileManagerItem()
        {
            ParentId = parentId,
            Name = directory.Name,
            IsDirectory = true,
            HasDirectories = directory.GetDirectories().Count() > 0,
            DateCreated = directory.CreationTime,
            DateCreatedUtc = directory.CreationTimeUtc,
            DateModified = directory.LastWriteTime,
            DateModifiedUtc = directory.LastWriteTimeUtc,
            // Trim the path to avoid exposing it
            Path = directory.FullName.Substring(directory.FullName.IndexOf(RootPath) + RootPath.Length),
            Extension = directory.Extension,
            // Hard-coded for simplicity, otherwise requires recursion
            Size = 2 * 1024 * directory.GetFiles().LongCount()
        };

        return item;
    }

    private FileManagerItem ConvertToFileManagerItem(FileInfo file, string? parentId)
    {
        var item = new FileManagerItem()
        {
            ParentId = parentId,
            Name = Path.GetFileNameWithoutExtension(file.FullName),
            IsDirectory = false,
            HasDirectories = false,
            DateCreated = file.CreationTime,
            DateCreatedUtc = file.CreationTimeUtc,
            DateModified = file.LastWriteTime,
            DateModifiedUtc = file.LastWriteTimeUtc,
            // Trim the path to avoid exposing it
            Path = file.FullName.Substring(file.FullName.IndexOf(RootPath) + RootPath.Length),
            Extension = file.Extension,
            Size = file.Length
        };

        return item;
    }

    #endregion FileManager Data Generation

    public class FileManagerItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? ParentId { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Extension { get; set; } = string.Empty;
        public long Size { get; set; }
        public string Path { get; set; } = string.Empty;

        public bool IsDirectory { get; set; }
        public bool HasDirectories { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateCreatedUtc { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateModifiedUtc { get; set; }
    }
}
````
````C# FileManagerController.cs
using Microsoft.AspNetCore.Mvc;

namespace TelerikBlazorApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FileManagerController : ControllerBase
    {
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public FileManagerController(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Save(IFormFile files, [FromForm] string fileManagerPath)
        {
            if (files != null)
            {
                try
                {
                    if (fileManagerPath.StartsWith("/"))
                    {
                        // Path.Combine ignores the first argument if the second one is an absolute path
                        fileManagerPath = fileManagerPath.Substring(1);
                    }

                    var saveLocation = Path.Combine(new string[] { HostingEnvironment.WebRootPath, fileManagerPath, files.FileName });

                    using (var fileStream = new FileStream(saveLocation, FileMode.Create))
                    {
                        await files.CopyToAsync(fileStream);
                    }
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"Upload failed: {ex.Message}");
                }
            }

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> Remove([FromForm] string files, [FromForm] string fileManagerPath)
        {
            if (files != null)
            {
                try
                {
                    if (fileManagerPath.StartsWith("/"))
                    {
                        fileManagerPath = fileManagerPath.Substring(1);
                    }

                    var fileLocation = Path.Combine(HostingEnvironment.WebRootPath, fileManagerPath, files);

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);
                    }
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"Delete failed: {ex.Message}");
                }
            }

            return new EmptyResult();
        }
    }
}
````
````C# Program.cs
// ...

var builder = WebApplication.CreateBuilder(args);

// ...

builder.Services.AddControllers();

var app = builder.Build();

// ...

app.MapDefaultControllerRoute();

// ...

app.Run();
````

>tip When uploading multiple files at the same time, you may want to [optimize the logic that reloads the FileManager `Data` in the Upload `OnSuccess` handler, so that it executes just once after all files have been uploaded](slug:upload-kb-count-selected-uploaded-files).

## Next Steps

* [Upload Events](slug:upload-events)
* [Upload Validation](slug:upload-validation)
* [Upload Troubleshooting](slug:upload-troubleshooting)

## See Also

* [FileManager Upload Demo](https://demos.telerik.com/blazor-ui/upload/overview)
