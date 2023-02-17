---
title: Overview
page_title: Upload Overview
description: Overview of the Blazor File Upload. See how to use the component and discover all features.
slug: upload-overview
tags: telerik,blazor,upload,async,overview
published: True
position: 0
---

# Blazor Upload Overview

The <a href="https://www.telerik.com/blazor-ui/upload" target="_blank">Blazor Upload component</a> lets users upload files to a server endpoint asynchronously. Users can select one or multiple files. The upload process can start immediately after selection or after a button click. Users can also delete their uploaded files. The component can validate the selected files' extensions and size.

## Comparison with the FileSelect

@[template](/_contentTemplates/upload/notes.md#fileselect-upload-comparison)

## Creating Blazor Upload

There are two main steps to use the Upload component:

* [Configure the component](#configure-the-component)
* [Implement controller methods](#implement-controller-methods)

Afterwards, take care of [application security](#security) and check our tips for [large file uploads](#large-file-uploads) and [CORS](#cross-origin-requests).

### Configure the Component

1. Add the `TelerikUpload` tag.
1. Set `SaveUrl` to the endpoint URL that will receive the uploaded files.
1. (optional) Set `RemoveUrl` to the endpoint URL that will receive the file names to delete.
1. Configure the allowed file types via `AllowedExtensions`. Use a `List<string>`.
1. Set `MaxFileSize` in bytes (`int`). Note that [web servers have their own request size restrictions](#large-file-uploads).

Steps 4 and 5 are optional, but strongly recommended.

>caption Sample Upload configuration

<div class="skip-repl"></div>

````CS
<TelerikUpload SaveUrl="/api/upload/save"
               RemoveUrl="/api/upload/remove"
               AllowedExtensions="@AllowedFileTypes"
               MaxFileSize="@MaxFileSize" />

@code {
    private List<string> AllowedFileTypes { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png", ".gif" };
    private int MaxFileSize { get; set; } = 10 * 1024 * 1024; // 10 MB
}
````

### Implement Controller Methods

* **Save** action method
    * Its argument should be `IFormFile` or `IEnumerable<IFormFile>`.
    * The Upload always sends files one by one, but both argument types can work.
    * The argument name (`FormData` request key) must match the Upload [`SaveField` parameter](#upload-parameters) value. By default, that is `files`.
    * The method name should match the last part of the `SaveUrl` value.
* **Remove** action method
    * Its argument should be `string` or `IEnumerable<string>`.
    * The argument name (`FormData` request key) must match the Upload [`RemoveField` parameter](#upload-parameters) value. By default, that is `files`.
    * The method name should match the last part of the `RemoveUrl` value.

Both action methods should accept `POST` requests. Correct request routing depends on the application.

The `UploadController` class below assumes that the project name and namespace is `TelerikBlazorUpload`.

Make sure to enable controller routing in the app startup file (`Program.cs`). In this case, `app.MapDefaultControllerRoute();` is all that's needed.

Also check the [Upload Troubleshooting]({%slug upload-troubleshooting%}) page.

>caption Sample Upload Controller

<div class="skip-repl"></div>

````CS
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TelerikBlazorUpload.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UploadController : Controller
    {
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Save(IFormFile files) // "files" matches the Upload SaveField value
        {
            if (files != null)
            {
                try
                {
                    // save to wwwroot - Blazor Server only
                    var rootPath = HostingEnvironment.WebRootPath;
                    // save to Server project root - Blazor Server or WebAssembly
                    //var rootPath = HostingEnvironment.ContentRootPath;
                    var saveLocation = Path.Combine(rootPath, files.FileName);

                    using (var fileStream = new FileStream(saveLocation, FileMode.Create))
                    {
                        await files.CopyToAsync(fileStream);
                    }
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"Upload failed.");
                }
            }

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> Remove(string files) // "files" matches the Upload RemoveField value
        {
            if (files != null)
            {
                try
                {
                    // delete from wwwroot - Blazor Server only
                    var rootPath = HostingEnvironment.WebRootPath;
                    // delete from Server project root - Blazor Server or WebAssembly
                    //var rootPath = HostingEnvironment.ContentRootPath;
                    var fileLocation = Path.Combine(rootPath, files);

                    if (System.IO.File.Exists(fileLocation))
                    {
                        System.IO.File.Delete(fileLocation);
                    }
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"Delete failed.");
                }
            }

            return new EmptyResult();
        }
    }
}
````

### Security

The Telerik Upload component makes XHR requests from the browser to the designated endpoints. If needed, use the [`OnUpload` and `OnRemove` events]({%slug upload-events%}) to add headers, authentication tokens and custom data to the request.

Authentication and authorization depends on the application.

@[template](/_contentTemplates/upload/notes.md#server-security-note)

### Cross-Origin Requests

[Cross-origin (CORS) requests](https://www.w3.org/TR/cors/) depend on the application and endpoint setup. The Upload [`WithCredentials` parameter](#upload-parameters) sets the corresponding [parameter of the XHR request](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). Cookies, headers and other parameters of the Blazor app and CORS endpoint should be implemented by the respective applications (for example, set the `Access-Control-Allow-Origin` header with an appropriate value and the `Access-Control-Allow-Credentials` header with a `true` value). Read more in this [CORS Tutorial](https://www.html5rocks.com/en/tutorials/cors/). Also check [this forum thread](https://www.telerik.com/forums/upload-component-reports-'file-failed-to-upload'#-6QPJn3obkm3D1kR1ysukA), which shows one way to setup the CORS requests, headers and responses on the receiving server.


## Validation

The Upload includes [built-in client-side validation]({%slug upload-validation%}) for the file size and type (extension). Additional custom validation can take place in the [OnSelect event]({%slug upload-events%}#onselect).


## Large File Uploads

The Upload `MaxFileSize` parameter is used only for [client-side validation]({%slug upload-validation%}). The component sends files in one piece and the server needs a separate configuration to support large file uploads. Here are some examples for common server settings:

* [IIS `maxAllowedContentLength`](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#iis) (also check the [`requestLimits` article](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/security/requestfiltering/requestlimits/) and this [StackOverflow thread](https://stackoverflow.com/questions/10871881/iis7-the-request-filtering-module-is-configured-to-deny-a-request-that-exceeds))
* [ASP.NET Core `MultipartBodyLengthLimit`](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#multipart-body-length-limit)
* [Kestrel](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel/options) web server [`MaxRequestBodySize`](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads#kestrel-maximum-request-body-size)


## Upload Parameters

The following table lists the Upload parameters. Also check the [Upload API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikUpload) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Accept` | `string` | The [`accept` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) of the file `<input>`. It controls what file types and MIME types the browser will allow users to select. Compare with `AllowedExtensions`. |
| `AllowedExtensions` | `List<string>` | The list of allowed file types. The component will check if the selected files are compliant **after selection**. Compare with `Accept`. Read more at [Validation]({%slug upload-validation%}). |
| `AutoUpload` | `bool`<br />(`true`) | When `true`, the upload process starts automatically after file selection. When `false`, the component renders an upload button. |
| `Capture` | `string` | The [`capture` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture) of the `<input type="file" />` element. It enables users to provide a file directly from their device camera. |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-upload">` element. |
| `Enabled` | `bool`<br />(`true`) | Enables file selection and upload. |
| `Id` | `string` | Renders an `id` attribute to the `<input type="file" />` element. Can be used together with a `<label>`. |
| `Multiple` | `bool`<br />(`true`) | Sets if the user can select several files at the same time. The component always uploads files one by one, and the controller method receives them separately. |
| `RemoveField` | `string`<br />(`"files"`) | Sets the `FormData` key, which contains the file name submitted for deletion to the [`RemoveUrl` endpoint](#implement-controller-methods). The `RemoveField` value must match the delete controller method's argument name. The user triggers remove requests when clicking on the [x] buttons in the uploaded file list. |
| `RemoveUrl` | `string` | The URL which receives the file names for deletion. |
| `SaveField` | `string`<br />(`"files"`) | Sets the `FormData` key, which contains the file submitted to the [`SaveUrl` endpoint](#implement-controller-methods). The `SaveField` value must match the save controller method's argument name. |
| `SaveUrl` | `string` | The URL which receives the uploaded files. `SaveUrl` and `RemoveUrl` **cannot change** between file selection and file upload, because the component will be recreated and the selected files will be lost. |
| `WithCredentials` | `bool` | Controls if the Upload will send credentials such as cookies or HTTP headers for [**cross-site** requests](#cross-origin-requests). See [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). On the other hand, use the [`OnUpload` and `OnRemove` events]({%slug upload-events%}) to add authentication tokens and other metadata to the component requests. |
| `SelectFilesButtonTemplate` | `RenderFragment` | The SelectFilesButtonTemplate allows you to control the content of the "Select Files..." button. |


## Upload Reference and Methods

The Upload exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` attribute (example below). The Upload methods are:

* `ClearFiles` - Clears all files from the list, both uploaded and in queue.
* `UploadFiles` - Uploads all valid selected files. Fires the [OnUpload]({%slug upload-events%}#onupload) event.
* `OpenFileSelectAsync` - Triggers the browser's file select dialog.

>caption Get a reference to the Upload and execute methods.

<div class="skip-repl"></div>

````HTML
<p>
    <TelerikButton OnClick="@SelectFiles">Open File Selection Dialog</TelerikButton>
    <TelerikButton OnClick="@Clear">Clear File List</TelerikButton>
    <TelerikButton OnClick="@Upload">Start Upload</TelerikButton>
</p>

<TelerikUpload @ref="@UploadRef"
               SaveUrl="/api/upload/save"
               RemoveUrl="/api/upload/remove"
               AutoUpload="false" />

@code {
    private TelerikUpload UploadRef { get; set; }

    private async Task SelectFiles()
    {
        await UploadRef.OpenFileSelectAsync();
    }

    private void Clear()
    {
        UploadRef.ClearFiles();
    }

    private void Upload()
    {
        UploadRef.UploadFiles();
    }
}
````


## Troubleshooting

The Upload component requires integration with remote endpoints and controller methods to work. See how to [detect and troubleshoot issues with the endpoint implementation, and how to fix them]({%slug upload-troubleshooting%}).


## Next Steps

* [Use Upload Validation]({%slug upload-validation%})
* [Subscribe to Upload Events]({%slug upload-events%})


## See Also

* [Live Upload Demos](https://demos.telerik.com/blazor-ui/upload/overview)
* [Upload API](/blazor-ui/api/Telerik.Blazor.Components.TelerikUpload)
