---
title: Chunk Upload
page_title: Chunk Upload
description: Enable and configure chunk upload in Upload for Blazor.
slug: upload-chunk
tags: telerik,blazor,upload,chunk
published: True
position: 3
components: ["upload"]
---

# Chunk Upload

Chunk upload works by splitting a file into smaller parts (chunks) and sending them one by one in several sequential requests. These chunks are then reassembled at the remote endpoint into the final file.

## Enable Chunk Upload

To enable the chunk upload feature, add the `<UploadChunkSettings>` tag inside inside `<UploadSettings>`. See the [`UploadChunkSettings` API reference](slug:telerik.blazor.components.uploadchunksettings) for all avalable parameters.

````RAZOR.skip-repl
<TelerikUpload>
    <UploadSettings>
        <UploadChunkSettings AutoRetryAfter="100"
                             Enabled="true"
                             MaxAutoRetries="1"
                             MetadataField="chunkMetadata"
                             Resumable="true"
                             Size="@(1024 * 1024)" />
    </UploadSettings>
</TelerikUpload>
````

The above snippet shows the default values explicitly. It is equivalent to an empty `<UploadChunkSettings>` tag:

````RAZOR.skip-repl
<TelerikUpload>
    <UploadSettings>
        <UploadChunkSettings />
    </UploadSettings>
</TelerikUpload>
````

## Metadata

When posting files in chunks, the Upload component sends each chunk together with serialized metadata to the controller. To deserialize this metadata, define a class with the following properties. You can name the class, according to your preferences.

````C#.skip-repl
using using System.Runtime.Serialization;

[DataContract]
public class ChunkMetadata
{
    [DataMember(Name = "fileId")]
    public string FileId { get; set; } = string.Empty;

    [DataMember(Name = "fileName")]
    public string FileName { get; set; } = string.Empty;

    [DataMember(Name = "fileSize")]
    public long FileSize { get; set; }

    [DataMember(Name = "contentType")]
    public string ContentType { get; set; } = string.Empty;

    [DataMember(Name = "chunkIndex")]
    public long ChunkIndex { get; set; }

    [DataMember(Name = "totalChunks")]
    public long TotalChunks { get; set; }
}
````

The app can use the metadata in various ways, for example:

* To obtain the uploaded file's name, total size, and content type. Unlike regular uploads, the file properties are not available in the `IFormFile` argument for each chunk.
* To distinguish the first uploaded chunk and create a new file on the server, rather than append to an existing one.
* To distinguish the last uploaded chunk and verify if the saved total file size matches the expected one.

## Controller Implementation

The controller method that receives file chunks should be similar to the regular [controller method that receives complete files](slug:upload-overview#implement-controller-methods). The major differences are:

* The Save action method must expect an additional `string` argument with a name that matches the value of the `UploadChunkSettings` `MetadataField` parameter. By default, that is `"chunkMetadata"`.
* The action method must obtain the uploaded file name from the `FileName` property of the metadata object, instead of the `FileName` property of the `IFormFile` argument.
* The `FileStream` `FileMode` must be `Append` instead of `Create` for all chunks, except the first one. Check the `ChunkIndex` property of the metadata object.

The Upload sends the next chunk only after the previous one has been uploaded successfully.

As always, make sure that the Save action method name is consistent with the Upload `SaveUrl` parameter value.

>caption Chunk upload controller action method

````C#.skip-repl
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

public async Task<IActionResult> SaveChunk(IFormFile files, [FromForm] string chunkMetadata)
{
    DataContractJsonSerializer dcSerializer = new(typeof(ChunkMetadata));
    MemoryStream ms = new(Encoding.UTF8.GetBytes(chunkMetadata));

    string saveLocation = Path.Combine(HostingEnvironment.WebRootPath, metadata.FileName);

    using FileStream fs = new(saveLocation, metadata.ChunkIndex == 0 ? FileMode.Create : FileMode.Append);
    await files.CopyToAsync(fs);

    if (metadata.ChunkIndex == metadata.TotalChunks - 1)
    {
        FileInfo fileInfo = new(saveLocation);
        if (fileInfo.Length != metadata.FileSize)
        {
            throw new InvalidOperationException($"Uploaded file size mismatch. Expected: {metadata.FileSize}, Actual: {fileInfo.Length}");
        }
    }

    // ...
}
````

## Events

The Upload exposes events related to chunk uploading. See the examples in the [Upload Events](slug:upload-events) article.

* [`OnPause`](slug:upload-events#onpause)&mdash;fires when the user clicks on the Pause button during chunk upload.
* [`OnResume`](slug:upload-events#onresume)&mdash;fires when the user clicks on the Resume button during chunk upload.

The Upload renders Pause and Resume buttons only when `Resumable` is `true` in the `UploadChunkSettings`, which is by default.

## Example

The `UploadController` class below assumes that the project name and namespace is `TelerikBlazorApp`.

Make sure to enable controller routing in the app startup file (`Program.cs`). In this case, the file includes the following lines:

* `builder.Services.AddControllers();`
* `app.MapDefaultControllerRoute();`.

Also see:

* Section [Implement Controller Methods](slug:upload-overview#implement-controller-methods)
* Page [Upload Troubleshooting](slug:upload-troubleshooting)

>caption Using Chunk Upload

<div class="skip-repl"></div>

````RAZOR Home.razor
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveChunkUrl"
               RemoveUrl="@RemoveUrl">
    <UploadSettings>
        <UploadChunkSettings Size="@(512 * 1024)"
                             AutoRetryAfter="300"
                             MaxAutoRetries="2"
                             MetadataField="chunkMetadata">
        </UploadChunkSettings>
    </UploadSettings>
</TelerikUpload>

@code {
    private string SaveChunkUrl => NavigationManager.ToAbsoluteUri("api/upload/savechunk").ToString();
    private string RemoveUrl => NavigationManager.ToAbsoluteUri("api/upload/remove").ToString();
}
````
````C# UploadController.cs
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization.Json;
using System.Text;
using TelerikBlazorApp.Data;

namespace TelerikBlazorApp.Controllers;

[Route("api/[controller]/[action]")]
public class UploadController : ControllerBase
{
    public IWebHostEnvironment HostingEnvironment { get; set; }

    public UploadController(IWebHostEnvironment hostingEnvironment)
    {
        HostingEnvironment = hostingEnvironment;
    }

    [HttpPost]
    public async Task<IActionResult> SaveChunk(IFormFile files, [FromForm] string chunkMetadata)
    {
        if (files != null)
        {
            try
            {
                DataContractJsonSerializer dcSerializer = new(typeof(ChunkMetadata));
                using MemoryStream ms = new(Encoding.UTF8.GetBytes(chunkMetadata));

                if (dcSerializer.ReadObject(ms) is not ChunkMetadata metadata)
                {
                    throw new NullReferenceException("Chunk metadata serialization failed.");
                }

                var rootPath = HostingEnvironment.WebRootPath; // save to wwwroot
                string saveLocation = Path.Combine(rootPath, metadata.FileName);

                using FileStream fs = new(saveLocation, metadata.ChunkIndex == 0 ? FileMode.Create : FileMode.Append);
                await files.CopyToAsync(fs);

                if (metadata.ChunkIndex == metadata.TotalChunks - 1)
                {
                    FileInfo fileInfo = new(saveLocation);
                    if (fileInfo.Length != metadata.FileSize)
                    {
                        throw new InvalidOperationException($"File size mismatch. Expected: {metadata.FileSize}, Actual: {fileInfo.Length}");
                    }
                }

                Response.StatusCode = 201;
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                await Response.WriteAsync($"Chunk upload failed. Exception: {ex.Message}");
                return new EmptyResult();
            }
        }

        return new EmptyResult();
    }

    [HttpPost]
    public async Task<IActionResult> Remove([FromForm] string files) // "files" matches the Upload RemoveField value
    {
        if (!string.IsNullOrEmpty(files))
        {
            try
            {
                var rootPath = HostingEnvironment.WebRootPath; // delete from wwwroot
                var fileLocation = Path.Combine(rootPath, files);

                if (System.IO.File.Exists(fileLocation))
                {
                    System.IO.File.Delete(fileLocation);
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                await Response.WriteAsync($"Delete failed. Exception: {ex.Message}");
            }
        }

        return new EmptyResult();
    }
}
````
````C# ChunkMetadata.cs
using System.Runtime.Serialization;

namespace TelerikBlazorApp.Data;

[DataContract]
public class ChunkMetadata
{
    [DataMember(Name = "fileId")]
    public string FileId { get; set; } = string.Empty;

    [DataMember(Name = "fileName")]
    public string FileName { get; set; } = string.Empty;

    [DataMember(Name = "fileSize")]
    public long FileSize { get; set; }

    [DataMember(Name = "contentType")]
    public string ContentType { get; set; } = string.Empty;

    [DataMember(Name = "chunkIndex")]
    public long ChunkIndex { get; set; }

    [DataMember(Name = "totalChunks")]
    public long TotalChunks { get; set; }
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

## See Also

* [Blazor Upload](slug:upload-overview)
