---
title: Preview Selected or Uploaded Image
description: Learn how to display or preview the images that the user selected in the Telerik Blazor Upload or FileSelect component.
type: how-to
page_title: How to Preview Selected or Uploaded Image
slug: upload-kb-preview-image
position: 
tags: telerik, blazor, fileselect, upload
ticketid: 1468224, 1476179, 1481266, 1567963, 1621741
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>FileSelect for Blazor, <br /> Upload for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to immediately display the uploaded image files in the Blazor app?
* How to render an image preview when using the Blazor FileSelect?
* How to show the uploaded file as a preview when using the Upload control? I prefer to show a Base64 image without saving the file to the server.
* How to preview the selected image in the Upload `OnSelect` event?
* How to get the raw file content from the Upload component and add it to a memory stream?

## Solution

Users can preview images that are uploaded through the [Upload component](slug://upload-overview) or selected through the [FileSelect component](slug://fileselect-overview).

In Blazor, [previewing images is easier when using the FileSelect](#using-the-fileselect), but based on your requirements you might [choose the Upload over the FileSelect](slug://upload-overview#upload-vs-fileselect) or vice versa.

### Using the Upload

1. Set the [`Accept`, `AllowedExtensions`, and `MaxFileSize`](slug://upload-overview#upload-parameters) parameters of the Upload.
1. [Ensure the Blazor app can handle large uploaded files](slug://upload-overview#large-file-uploads) with a size that matches or exceeds `MaxFileSize`.
1. [Implement a controller action method to receive the uploaded files](slug://upload-overview#implement-controller-methods). Also see the [example on the Upload Events page](slug://upload-events#example).
1. Read the uploaded image(s) in the controller and return an image URL or [Base64 data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) for the `<img>` tag(s) to render. You can choose to provide the original image to the UI or a smaller version for greater efficiency.
1. Subscribe to the [Upload `OnSuccess` event](slug://upload-events#onsuccess) to detect completed file uploads and obtain the `<img>` tag's `src` value. You can also use `OnSuccess` to detect file removals in the Upload component and remove the respective `<img>` tags.

You cannot preview the image in the Upload `OnSelect` event, because this event handler has no access to the file contents.

>caption Preview uploaded images when using the Upload component

<div class="skip-repl"></div>

````RAZOR
@inject NavigationManager NavigationManager

<h2>Upload</h2>

<TelerikUpload Accept="@string.Join(",", ImageFileExtensions)"
               AllowedExtensions="@ImageFileExtensions"
               MaxFileSize="@MaxImageSize"
               SaveUrl="@ToAbsoluteUrl("api/upload/saveimage")"
               RemoveUrl="@ToAbsoluteUrl("api/upload/removeimage")"
               OnSuccess="@OnUploadSuccess">
</TelerikUpload>

<div class="image-preview">
    @foreach (var image in UploadImages)
    {
        <img src="@image.ImageSource" class="k-border-2 k-border-solid k-border-primary" />
    }
</div>

<style>
    .image-preview {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        align-items: center;
    }

        .image-preview img {
            max-width: 200px;
            max-height: 200px;
        }
</style>

@code {
    private List<string> ImageFileExtensions { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png", ".gif" };

    private int? MaxImageSize { get; set; } = 8 * 1024 * 1024;

    private List<ImageModel> UploadImages { get; set; } = new();

    private void OnUploadSuccess(UploadSuccessEventArgs args)
    {
        var fileInfo = args.Files.First();
    
        if (args.Operation == UploadOperationType.Upload)
        {
            UploadImages.Add(new ImageModel()
            {
                ImageId = fileInfo.Id,
                ImageSource = args.Request.ResponseText
            });
        }
        else
        {
            UploadImages.RemoveAll(x => x.ImageId == fileInfo.Id);
        }
    }

    private string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }

    public class ImageModel
    {
        public string ImageId { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
    }
}
````
````C# Controller
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TelerikBlazorUpload.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UploadController : ControllerBase
    {
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<string> SaveImage(IFormFile files)
        {
            string response = "";

            if (files != null)
            {
                try
                {
                    // OPTION 1. Return a Base64 string and display the image source as a data URI.
                    // Not efficient for large files.

                    //var imageBytes = new byte[files.Length];
                    //await files.OpenReadStream().ReadAsync(imageBytes);
                    //response = $"data:image/{Path.GetExtension(files.FileName)};base64,{Convert.ToBase64String(imageBytes.ToArray())}";

                    // ===============

                    // OPTION 2. Save the image as a file and return the image URL.
                    // May not be efficient for large files. You can save another smaller version of the file.

                    var imageSaveLocation = Path.Combine(HostingEnvironment.WebRootPath, files.FileName);

                    using var imageStream = new FileStream(imageSaveLocation, FileMode.Create);
                    await files.CopyToAsync(imageStream);

                    response = files.FileName;
                }
                catch (Exception e)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"File processing failed: {e.Message}");
                }
            }

            return response;
        }

        [HttpPost]
        public async Task<IActionResult> RemoveImage([FromForm] string files)
        {
            if (files != null)
            {
                try
                {
                    var imageLocation = Path.Combine(HostingEnvironment.WebRootPath, files);

                    if (System.IO.File.Exists(imageLocation))
                    {
                        System.IO.File.Delete(imageLocation);
                    }
                }
                catch
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync("File deletion failed.");
                }
            }

            return new EmptyResult();
        }
    }
}
````

### Using the FileSelect

1. Set the [`Accept`, `AllowedExtensions`, and `MaxFileSize`](slug://fileselect-overview#fileselect-parameters) parameters of the FileSelect.
1. [Increase the SignalR message size](slug://common-kb-increase-signalr-max-message-size) to match or exceed `MaxFileSize`.
1. Subscribe to the [FileSelect `OnSelect` event](slug://fileselect-events#onselect).
1. Read the selected image(s) and create a [Base64 data URI](https://en.wikipedia.org/wiki/Data_URI_scheme) for the `<img>` tag(s) to render.
1. (optional) Subscribe to the [FileSelect `OnRemove` event](slug://fileselect-events#onremove) to remove the image preview.

>caption Preview selected images when using the FileSelect component

````RAZOR
@using System.IO;

<h2>FileSelect</h2>

<TelerikFileSelect Accept="@string.Join(",", ImageFileExtensions)"
                   AllowedExtensions="@ImageFileExtensions"
                   MaxFileSize="@MaxImageSize"
                   OnSelect="@OnFileSelectSelect"
                   OnRemove="@OnFileSelectRemove">
</TelerikFileSelect>

@if (FileSelectImages.Any())
{
    <h2>Image Preview</h2>

    <div class="image-preview">
        @foreach (var image in FileSelectImages)
        {
            <img src="@image.ImageSource" class="k-border-2 k-border-solid k-border-primary" />
        }
    </div>
}

<style>
    .image-preview {
        display: flex;
        gap: 2em;
        flex-wrap: wrap;
        align-items: center;
    }

        .image-preview img {
            max-width: 200px;
            max-height: 200px;
        }
</style>

@code {
    private List<string> ImageFileExtensions { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png", ".gif" };

    private int? MaxImageSize { get; set; } = 8 * 1024 * 1024;

    private List<ImageModel> FileSelectImages { get; set; } = new();

    private async Task OnFileSelectSelect(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            if (!file.InvalidExtension && !file.InvalidMaxFileSize)
            {
                var imageBytes = new byte[file.Size];
                await using MemoryStream ms = new MemoryStream(imageBytes);
                await file.Stream.CopyToAsync(ms);

                FileSelectImages.Add(new ImageModel()
                {
                    ImageId = file.Id,
                    ImageSource = $"data:image/{file.Extension};base64,{Convert.ToBase64String(ms.ToArray())}"
                });
            }
        }
    }

    private void OnFileSelectRemove(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            FileSelectImages.RemoveAll(x => x.ImageId == file.Id);
        }
    }

    public class ImageModel
    {
        public string ImageId { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
    }
}
````

## See Also

* [Upload Overview](slug://upload-overview)
* [Handle Upload Events](slug://upload-events)
* [FileSelect Overview](slug://fileselect-overview)
* [Handle FileSelect Events](slug://fileselect-events)
