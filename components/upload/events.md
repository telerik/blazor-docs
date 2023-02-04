---
title: Events
page_title: Upload - Events
description: Events and event handler examples for the File Upload for Blazor.
slug: upload-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
---

# Upload Events

This article describes the events of the Telerik Upload for Blazor.

First, get familiar with the [**Event Arguments**](#event-arguments) section, as it applies to all events. The [example](#example) at the end also showcases all Upload events.

* [OnCancel](#oncancel)
* [OnClear](#onclear)
* [OnError](#onerror)
* [OnProgress](#onprogress)
* [OnRemove](#onremove)
* [OnSelect](#onselect)
    * [Rename uploaded files](#renaming-a-file)
* [OnSuccess](#onsuccess)
* [OnUpload](#onupload)
    * [Send custom additional data with the uploaded file](#send-custom-data-with-the-file)

>warning Make sure to also check section [Upload Security]({%slug upload-overview%}#security).


## Event Arguments

The different Upload events use different event argument types, but the exposed properties are similar. Depending on the exact event, the properties will be some of these:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
|---|---|---|
| `Files` | `List<UploadFileInfo>` | *All Upload events* expose a `Files` collection of [`UploadFileInfo`](#uploadfileinfo) members. The collection contains one or more files in the `OnClear`, `OnSelect` and `OnUpload` handlers. In the other events, the file is just one. |
| `IsCancelled` | `bool` | Set to `true` to cancel the event and the respective user action. |
| `Operation` | [`UploadOperationType`](blazor-ui/api/Telerik.Blazor.UploadOperationType) enum | Can be `Upload` or `Remove`. |
| `Progress` | `int` | The uploaded percentage of the file in the [`OnProgress` event](#onprogress). |
| `Request` | `UploadHttpRequest` | Information about the server response, such as status code and any custom messages. The object contains the `int` property `Status` and the strings `StatusText`, `ResponseType` and `ResponseText`. |
| `RequestData` | `Dictionary<string, object>` | Add `KeyValuePair`s to [send custom data](#send-custom-data-with-the-file) to the controller in [`OnUpload`](#onupload) and [`OnRemove`](#onremove). |
| `RequestHeaders` | `Dictionary<string, object>` | Add `KeyValuePair`s to [send custom HTTP headers](#send-custom-data-with-the-file) to the controller in [`OnUpload`](#onupload) and [`OnRemove`](#onremove). |

>tip The custom information in `RequestData` and `RequestHeaders` can be related to authentication, CSRF cross-site anti forgery tokens, or any business logic.

### UploadFileInfo 

The `UploadFileInfo` object has the following properties:

| Property | Type | Description |
|---|---|---|
| `Extension` | `string` | The file extension (type), together with the dot. |
| `Id` | `string` | The unique file identifier in GUID format. |
| `InvalidExtension` | `bool` | Defines if the file violates the [`AllowedExtensions` value]({%slug upload-overview%}#upload-parameters). |
| `InvalidMaxFileSize` | `bool` | Defines if the file violates the [`MaxFileSize` value]({%slug upload-overview%}#upload-parameters). |
| `InvalidMinFileSize` | `bool` | Defines if the file violates the [`MinFileSize` value]({%slug upload-overview%}#upload-parameters). |
| `Name` | `string` | The **encoded** file name, including the extension. One method to decode it is [`System.Net.WebUtility.HtmlDecode()`](https://learn.microsoft.com/en-us/dotnet/api/system.net.webutility.htmldecode). The file name received by the controller (endpoint) is **not encoded**. The [file can be renamed](#renaming-a-file) in the [`OnSelect`](#onselect) and [`OnUpload`](#onupload) handlers. |
| `Progress` | `int` | The uploaded percentage of the file in the [`OnProgress` event](#onprogress). |
| `Size` | `long` | The file size in bytes. |
| `Status` | [`UploadFileStatus` enum](/blazor-ui/api/Telerik.Blazor.UploadFileStatus) | The current status of the file in the context of the Upload component (`Selected`, `Uploading`, `Uploaded`, `Failed`). |


## OnCancel

The `OnCancel` event fires when the user clicks the *Cancel* icon of a file that is currently uploading.

The `UploadCancelEventArgs` event argument contains the [properties `Files` and `IsCancelled`](#event-arguments).

If you cancel the event, the upload process will continue. For example, this can depend on some [file information](#uploadfileinfo) such as size and upload progress. 

>caption Using the Upload OnCancel event

<div class="skip-repl"></div>

````CS
private async Task OnUploadCancel(UploadCancelEventArgs args)
{
    var file = args.Files.First();

    if (file.Size < 2 * 1024 * 1024 && file.Progress > 50)
    {
        args.IsCancelled = true;
    }
}
````

See the [full example](#example) below.


## OnClear

The `OnClear` event fires when the user clicks the *Clear* button below the file list. This button is visible when [`AutoUpload="false"`]({%slug upload-overview%}#upload-parameters).

The `UploadClearEventArgs` event argument contains the [properties `Files` and `IsCancelled`](#event-arguments).

If you cancel the event, the current file list will remain visible.

>caption Using the Upload OnClear event

<div class="skip-repl"></div>

````CS
private async Task OnUploadClear(UploadClearEventArgs args)
{
    if (args.Files.Count > 3)
    {
        args.IsCancelled = true;
    }
}
````

See the [full example](#example) below.


## OnError

The `OnError` event fires when an *upload* or *remove* request fails.

The [`UploadErrorEventArgs` event argument](#event-arguments) contains the following properties:

* `Files`
* `Operation`
* `Request`

>caption Using the Upload OnError event

<div class="skip-repl"></div>

````CS
private async Task OnUploadError(UploadErrorEventArgs args)
{
    string fileName = args.Files.First().Name;
    UploadOperationType operation = args.Operation;
    int statusCode = args.Request.Status;
    string statusMessage = args.Request.StatusText;
    string customMessage = args.Request.ResponseText;
}
````

See the [full example](#example) below.

>caption Returning status code and error message from the controller for the OnError handler

<div class="skip-repl"></div>

````CS
[HttpPost]
public async Task<IActionResult> Save(IFormFile files)
{
    // ...
    // Different ways to return a response

    // unhandled exceptions have status code 500
    throw new Exception("error message here");

    // OR

    // custom status code and error messsage
    Response.StatusCode = 400;
    await Response.WriteAsync("error message here");
    return new EmptyResult();

    // OR

    // custom status code and error messsage
    Response.StatusCode = 400;
    return Content("error message here");
}
````


## OnProgress

The `OnProgress` event fires each time a file makes progress in its upload process.

The event is tied directly to the [`progress` event of the `XHR` object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event), which sends the file to the controller. The Upload component cannot control when or how often the event will fire. For small files, the `Progress` value is likely to jump directly to `100`, especially on `localhost`.

The `UploadProgressEventArgs` event argument contains the properties [`Files` and `Progress`](#event-arguments).

>caption Using the Upload OnProgress event

<div class="skip-repl"></div>

````CS
private async Task OnUploadProgress(UploadProgressEventArgs args)
{
    string fileName = args.Files.First().Name;
    int percentComplete = args.Progress;
}
````

See the [full example](#example) below.


## OnRemove

The `OnRemove` event fires when the users clicks the *Remove* (X) button of an uploaded file. The Upload component sends a request to the server so you can delete the file.

The [`UploadEventArgs` event argument](#event-arguments) contains the following properties:

* `Files`
* `IsCancelled`
* `RequestData` (see section [Send Custom Data with the File](#send-custom-data-with-the-file))
* `RequestHeaders`

If you cancel the event, the Upload component will not send the file deletion request.

>caption Using the Upload OnRemove event

<div class="skip-repl"></div>

````CS
private async Task OnUploadRemove(UploadEventArgs args)
{
    var file = args.Files.First();

    if (file.Extension == ".pdf")
    {
        args.IsCancelled = true;
    }
    else
    {
        args.RequestData.Add("dataKey", "dataValue");
        args.RequestHeaders.Add("headerKey", "headerValue");

        // Get the custom data and header values in the controller:
        //string headerValue = Request.Headers["headerKey"];
        //string formData = Request.Form["dataKey"];
    }
}
````

See the [full example](#example) below.


## OnSelect

The `OnSelect` event fires when the user selects new file(s) for upload.

The `UploadSelectEventArgs` event argument contains the [properties `Files` and `IsCancelled`](#event-arguments).

If you cancel the event, the Upload component will neither list, nor upload the selected files.

### Renaming a File

In some cases, you may want to rename a selected file when uploading it, for example:

* A file with the same name already exists on the server.
* The file name does not meet some requirements.

The file rename process requires two separate steps:

1. Use the `OnSelect` event to call a remote endpoint and check for duplicates before the actual upload process starts. If needed, set a new name to the `Name` property of the file. This new name will appear in the Upload component UI. Note that **the controller will always receive the original file name from the file system**, due to browser security restrictions.
1. Send the new file name as [additional request data](#send-custom-data-with-the-file) in the [`OnUpload` event](#onupload). Use the `Save` action in the remote endpoint to set the file name, as it will be saved on the server.

>caption Using the Upload OnSelect event to rename uploaded files

<div class="skip-repl"></div>

````CS
private async Task OnUploadSelect(UploadSelectEventArgs args)
{
    foreach (var file in args.Files)
    {
        string fileName = file.Name;
        long fileSize = file.Size;

        // Change the file name that is displayed in the TelerikUpload component.
        // Delays here will result in rendering and upload delays.
        // The file name in the upload request will remain the original one.
        file.Name = await GetNewFileNameFromServer(file.Name, "currentUserName");
    }
}

private async Task<string> GetNewFileNameFromServer(string fileName, string userName)
{
    await Task.Delay(100); // simulate network delay

    // In a real case this can be a controller action method.
    // Use the same naming logic when actually saving the file on the server.
    string newFileName = $"{userName}-{fileName}";

    return await Task.FromResult(newFileName);
}
````

See the [full example](#example) below.


## OnSuccess

The `OnSuccess` event fires when an upload or remove request is successful. The Upload assumes a [successful request if the `Response.StatusCode` of the controller action is between 200 and 299](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses).

The [`UploadSuccessEventArgs` event argument](#event-arguments) contains the following properties:

* `Files`
* `Operation`
* `Request`

For example, the server can return a URL string for an image thumbnail.

>caption Using the Upload OnSuccess event

<div class="skip-repl"></div>

````CS
private async Task OnUploadSuccess(UploadSuccessEventArgs args)
{
    string fileName = args.Files.First().Name;
    UploadOperationType operation = args.Operation;
    int statusCode = args.Request.Status;
    string statusMessage = args.Request.StatusText;
    string customMessage = args.Request.ResponseText;
}
````

>caption Returning status code and success message from the controller for the OnSuccess handler

<div class="skip-repl"></div>

````CS
[HttpPost]
public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
{
    // ...
    // Different ways to return a response

    // default status code 200, no custom success message
    return new OkResult();

    // OR

    // default statuc code 200 and custom success message
    return new OkObjectResult("success message here");

    // OR

    // custom status code and success messsage
    Response.StatusCode = 201;
    await Response.WriteAsync("success message here");
    return new EmptyResult();

    // OR

    // custom status code and success messsage
    Response.StatusCode = 201;
    return Content("success message here");
}
````

See the [full example](#example) below.


## OnUpload

The `OnUpload` event fires when files will be uploaded. By default, it will fire immediately after [`OnSelect`](#onselect), unless `AutoUpload="false"`.

The [`UploadEventArgs` event argument](#event-arguments) contains the following properties:

* `Files`
* `IsCancelled`
* `RequestData`
* `RequestHeaders`

If you cancel the event, the file upload will not start. If `AutoUpload="false"`, the user will be able to try uploading the same file(s) again.

### Send Custom Data with the File

Use the `OnUpload` and [`OnRemove`](#onremove) event handlers to send additional custom data and request headers to the server, together with the file. For example, the data may be related to:

* Authentication
* CSRF cross-site anti forgery tokens
* Any metadata related to the app business logic

To send **cookies** with the upload request, set the [`WithCredentials` component parameter]({%slug upload-overview%}#upload-parameters) to `true`.

>caption Using the Upload OnUpload event

<div class="skip-repl"></div>

````CS
private async Task OnUploadHandler(UploadEventArgs args)
{
    if (args.Files.Count > 3)
    {
        args.IsCancelled = true;
    }

    args.RequestData.Add("dataKey", "dataValue"); // for example, user name
    args.RequestHeaders.Add("headerKey", "headerValue"); // for example, authentication token

    // Get the custom data and header values in the controller:
    //string headerValue = Request.Headers["headerKey"];
    //string formData = Request.Form["dataKey"];
}
````

See the full example below.


## Example

The controller class below assumes that the project name and namespace is `TelerikBlazorUpload`, and the `UploadController.cs` file is in a `Controllers` folder. Adjust those if necessary.

Make sure to enable controller routing in the app startup file (`Program.cs`). In this case, `app.MapDefaultControllerRoute();` is all that's needed.

Also see:

* Section [Implement Controller Methods]({%slug upload-overview%}#implement-controller-methods)
* Page [Upload Troubleshooting]({%slug upload-troubleshooting%})

>caption Using the Upload events

<div class="skip-repl"></div>

````Razor
@inject NavigationManager NavigationManager

<label>
    <TelerikCheckBox @bind-Value="@AllowRequests" />
    Allow Upload and Remove Requests
</label> (otherwise cancel events)

<TelerikRadioGroup Data="@RadioGroupData"
                   @bind-Value="@ReturnSuccess"
                   TextField="@nameof(RadioGroupModel.Text)"
                   ValueField="@nameof(RadioGroupModel.Value)"
                   Layout="@RadioGroupLayout.Horizontal" />

<TelerikUpload SaveUrl="@UploadSaveUrl"
               RemoveUrl="@UploadRemoveUrl"
               MaxFileSize="@( 16 * 1024 * 1024 )"
               MinFileSize="@( 1 * 1024 )"
               AutoUpload="true"
               OnCancel="@OnUploadCancel"
               OnClear="@OnUploadClear"
               OnError="@OnUploadError"
               OnProgress="@OnUploadProgress"
               OnRemove="@OnUploadRemove"
               OnSelect="@OnUploadSelect"
               OnSuccess="@OnUploadSuccess"
               OnUpload="@OnUploadUpload">
</TelerikUpload>

@code {
    private bool AllowRequests { get; set; } = true;

    private bool ReturnSuccess { get; set; } = true;

    private string UploadSaveUrl => ToAbsoluteUrl("api/upload/save");

    private string UploadRemoveUrl => ToAbsoluteUrl("api/upload/remove");

    private void OnUploadCancel(UploadCancelEventArgs args)
    {
        var file = args.Files.First();

        if (file.Size < 2 * 1024 * 1024 && file.Progress > 50)
        {
            args.IsCancelled = true;
            Console.WriteLine($"OnCancel event cancelled.");
        }
        else
        {
            Console.WriteLine($"OnCancel event for {file.Name}");
        }
    }

    private void OnUploadClear(UploadClearEventArgs args)
    {
        if (args.Files.Count > 3)
        {
            args.IsCancelled = true;
            Console.WriteLine("OnClear event cancelled.");
        }
        else
        {
            Console.WriteLine("OnClear event fired for:");

            foreach (var file in args.Files)
            {
                Console.WriteLine($"  Name: {file.Name}, Size: {file.Size} bytes");
            }
        }
    }

    private void OnUploadError(UploadErrorEventArgs args)
    {
        Console.WriteLine($"OnError event for:");
        Console.WriteLine($"  File: {args.Files.First().Name}");
        Console.WriteLine($"  Operation: {args.Operation}");
        Console.WriteLine($"  Response Status Code: {args.Request.Status}");
        Console.WriteLine($"  Response Status Message: {args.Request.StatusText}");
        Console.WriteLine($"  Response Type: {args.Request.ResponseType}");
        Console.WriteLine($"  Response Text: {args.Request.ResponseText}");
    }

    private void OnUploadProgress(UploadProgressEventArgs args)
    {
        Console.WriteLine($"OnProgress event for:");
        Console.WriteLine($"  File: {args.Files.First().Name}");
        Console.WriteLine($"  Progress: {args.Progress}");
    }

    private async Task OnUploadRemove(UploadEventArgs args)
    {
        var file = args.Files.First();

        if (!AllowRequests)
        {
            args.IsCancelled = true;
            Console.WriteLine($"OnRemove event cancelled for {file.Name}");
        }
        else
        {
            Console.WriteLine($"OnRemove event for {file.Name}");

            args.RequestData.Add("successData", ReturnSuccess);
            args.RequestHeaders.Add("successHeader", ReturnSuccess);
        }
    }

    private async Task OnUploadSelect(UploadSelectEventArgs args)
    {
        Console.WriteLine("OnSelect event for:");

        foreach (var file in args.Files)
        {
            Console.WriteLine($"  File: {file.Name}, Size: {file.Size} bytes");
        }

        if (args.Files.Count > 5)
        {
            args.IsCancelled = true;
            Console.WriteLine("OnSelect event cancelled.");
        }
    }

    private void OnUploadSuccess(UploadSuccessEventArgs args)
    {
        Console.WriteLine($"OnSuccess event for:");
        Console.WriteLine($"  File: {args.Files.First().Name}");
        Console.WriteLine($"  Operation: {args.Operation}");
        Console.WriteLine($"  Response Status Code: {args.Request.Status}");
        Console.WriteLine($"  Response Status Message: {args.Request.StatusText}");
        Console.WriteLine($"  Response Type: {args.Request.ResponseType}");
        Console.WriteLine($"  Response Text: {args.Request.ResponseText}");
    }

    private async Task OnUploadUpload(UploadEventArgs args)
    {
        if (!args.Files.Any())
        {
            return;
        }

        var file = args.Files.First();

        if (!AllowRequests)
        {
            args.IsCancelled = true;
            Console.WriteLine($"OnUpload event cancelled for {file.Name}");
        }
        else
        {
            Console.WriteLine($"OnUpload event for {file.Name}");

            args.RequestData.Add("successData", ReturnSuccess);
            args.RequestHeaders.Add("successHeader", ReturnSuccess);
        }
    }

    private string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }

    private List<RadioGroupModel> RadioGroupData { get; set; } = new List<RadioGroupModel>()
    {
        new RadioGroupModel() { Value = true, Text = "Expect Request Success" },
        new RadioGroupModel() { Value = false, Text = "Expect Request Failure" }
    };

    public class RadioGroupModel
    {
        public bool Value { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

````UploadController.cs
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
        public async Task<IActionResult> Save(IFormFile files) // must match SaveField
        {
            bool shouldSucceed = Convert.ToBoolean(Request.Form["successData"])
                && Convert.ToBoolean(Request.Headers["successHeader"]);

            if (!shouldSucceed)
            {
                Response.StatusCode = 403;
                await Response.WriteAsync("Upload refused.");
            }
            else if (files != null)
            {
                try
                {
                    var rootPath = HostingEnvironment.WebRootPath; // save to wwwroot - Blazor Server only
                    //var rootPath = HostingEnvironment.ContentRootPath; // save to Server project root - Blazor Server or WebAssembly
                    var saveLocation = Path.Combine(rootPath, files.FileName);

                    using (var fileStream = new FileStream(saveLocation, FileMode.Create))
                    {
                        await files.CopyToAsync(fileStream);

                        Response.StatusCode = 201;
                        await Response.WriteAsync("Upload successful.");
                    }
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 500;
                    await Response.WriteAsync($"Upload failed. Exception: {ex.Message}");
                }
            }

            return new EmptyResult();
        }

        [HttpPost]
        public async Task<IActionResult> Remove(string files) // must match RemoveField
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

                        Response.StatusCode = 204;
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

````Program.cs
// ...

var builder = WebApplication.CreateBuilder(args);

// ...

var app = builder.Build();

// ...

app.MapDefaultControllerRoute();

// ...

app.Run();
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Upload Overview]({%slug upload-overview%})
* [Validation]({%slug upload-validation%})
* [Upload Methods]({%slug upload-overview%}#methods)
* [Live Demo: Upload Events](https://demos.telerik.com/blazor-ui/upload/events)
