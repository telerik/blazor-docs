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

Chunk upload works by splitting a file into smaller parts (chunks) and sending them in multiple requests. These chunks are then reassembled at the remote endpoint into the final file.

## Basics

To set up the Chunk upload feature, use the `UploadChunkSettings` tag, which is nested inside `UploadSettings`. The tag includes the following parameters:

| Parameter | Type and Default Value | Description |
|----------|----------|----------|
| `AutoRetryAfter` | `double` <br/> (100) | Specifies the amount of time in milliseconds after which a failed chunk upload request will be retried.  
| `Enabled` | `bool` <br/> (`true`) | Specifies if the chunk upload is enabled.  
| `MaxAutoRetries` | `int` <br/> (1) | Specifies the number of attempts to retry uploading a failed chunk.  
| `MetadataField` | `string` <br/> (`chunkMetadata`) | Specifies the name of the variable that will receive the chunk upload metadata in the remote endpoint.  
| `Resumable` | `bool` <br/> (`true`) | Specifies if the file upload process can be paused and later resumed.
| `Size` | `double` <br/> (1024 * 1024) | The size of the chunks in bytes.

## Events

The Upload exposes several relevant events. You can find related examples in the [Events](slug:upload-events) article.

* `OnPause`&mdash;fires when the user clicks on the pause button during chunk upload.
* `OnResume`&mdash;fires when the user clicks on the "resume" button during chunk upload.

## Example

The `UploadController` class below assumes that the project name and namespace is `TelerikBlazorApp`.

Make sure to enable controller routing in the app startup file (`Program.cs`). In this case, `app.MapDefaultControllerRoute();` is all that's needed.

Also see:

* Section [Implement Controller Methods](slug:upload-overview#implement-controller-methods)
* Page [Upload Troubleshooting](slug:upload-troubleshooting)

>caption Enable Chunk Upload

<div class="skip-repl"></div>

````RAZOR
<TelerikUpload SaveUrl="@CustomSaveUrl"
               OnPause="@OnPause"
               OnResume="@OnResume"
               RemoveUrl="@RemoveUrl"
               AutoUpload="true">
    <UploadSettings>
        <UploadChunkSettings Size="16000"
                             AutoRetryAfter="300"
                             MaxAutoRetries="2"
                             MetadataField="customChunkMetadata"
                             Resumable="false">
        </UploadChunkSettings>
    </UploadSettings>
</TelerikUpload>

@code {
    private string SaveUrl => NavigationManager.ToAbsoluteUrl("api/upload/chunksave");
    private string RemoveUrl => NavigationManager.ToAbsoluteUrl("api/upload/remove");
    private string CustomSaveUrl => NavigationManager.ToAbsoluteUrl("api/upload/chunksavecustom");

    private void OnPause(UploadPauseEventArgs args)
    {
        Console.WriteLine("pause event");

        foreach (var file in args.Files)
        {
            Console.WriteLine(file.Name);
        }
    }

    private void OnResume(UploadResumeEventArgs args)
    {
        Console.WriteLine("resume event");

        foreach (var file in args.Files)
        {
            Console.WriteLine(file.Name);
        }
    }
}
````
````C# UploadController.cs
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TelerikBlazorApp.Controllers
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
        public async Task<IActionResult> ChunkSave(IEnumerable<IFormFile> files, string chunkMetadata)
        {
            foreach (var file in files)
            {
                if (file != null)
                {
                    try
                    {
                        var rootPath = HostingEnvironment.WebRootPath; // Save to wwwroot
                                                                       // var rootPath = HostingEnvironment.ContentRootPath; // For saving outside wwwroot

                        var filePath = Path.Combine(rootPath, file.FileName);

                        // If chunkMetadata is provided, append chunks
                        using (var stream = new FileStream(filePath, FileMode.Append))
                        {
                            await file.CopyToAsync(stream);
                        }

                        Response.StatusCode = 201;
                        await Response.WriteAsync("Chunk upload successful.");
                    }
                    catch (Exception ex)
                    {
                        Response.StatusCode = 500;
                        await Response.WriteAsync($"Chunk upload failed. Exception: {ex.Message}");
                        return new EmptyResult();
                    }
                }
            }

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> ChunkSaveCustom(IEnumerable<IFormFile> files, [FromForm(Name = "customChunkMetadata")] string customChunkMetadata)
        {
            foreach (var file in files)
            {
                if (file != null)
                {
                    try
                    {
                        var rootPath = HostingEnvironment.WebRootPath;
                        var filePath = Path.Combine(rootPath, file.FileName);

                        using (var stream = new FileStream(filePath, FileMode.Append))
                        {
                            await file.CopyToAsync(stream);
                        }

                        Response.StatusCode = 201;
                        await Response.WriteAsync("Custom chunk upload successful.");
                    }
                    catch (Exception ex)
                    {
                        Response.StatusCode = 500;
                        await Response.WriteAsync($"Custom chunk upload failed. Exception: {ex.Message}");
                        return new EmptyResult();
                    }
                }
            }

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> Remove([FromForm] string files) // "files" matches the Upload RemoveField value
        {
            bool shouldSucceed = Convert.ToBoolean(Request.Form["successData"])
                && Convert.ToBoolean(Request.Headers["successHeader"]);

            if (!shouldSucceed)
            {
                Response.StatusCode = 403;
                await Response.WriteAsync("Delete refused.");
            }
            else if (files != null)
            {
                try
                {
                    var rootPath = HostingEnvironment.WebRootPath; // delete from wwwroot - Blazor Server only
                    //var rootPath = HostingEnvironment.ContentRootPath; // delete from Server project root - Blazor Server or WebAssembly
                    var fileLocation = Path.Combine(rootPath, files);

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);

                        Response.StatusCode = 200;
                        await Response.WriteAsync($"Delete successful.");
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