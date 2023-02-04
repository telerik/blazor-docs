---
title: Events
page_title: Upload - Events
description: Events in the File Upload for Blazor.
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
| `Name` | `string` | The **encoded** file name, including the extension. One method to decode it is [`System.Net.WebUtility.HtmlDecode()`](https://learn.microsoft.com/en-us/dotnet/api/system.net.webutility.htmldecode). The file name received by the controller (endpoint) is **not encoded**. The file can be renamed in the [`OnSelect`](#onselect) and [`OnUpload`](#onupload) handlers, but **[the change applies only to the client-side UI](#renaming-a-file)**. |
| `Progress` | `int` | The uploaded percentage of the file in the [`OnProgress` event](#onprogress). |
| `Size` | `long` | The file size in bytes. |
| `Status` | [`UploadFileStatus` enum](/blazor-ui/api/Telerik.Blazor.UploadFileStatus) | The current status of the file in the context of the Upload component. |


## OnCancel

The `OnCancel` event fires when the user clicks the *Cancel* icon of a file that is currently uploading.

The `UploadCancelEventArgs` event argument contains the [properties `Files` and `IsCancelled`](#event-arguments).

If you cancel the event, the upload process will continue. For example, this can depend on some [file information](#uploadfileinfo) such as size and upload progress. 

>caption Using the Upload OnCancel event

<div class="skip-repl"></div>

````CS
private async Task OnUploadCancel(UploadCancelEventArgs args)
{
    var file = args.Files.FirstOrDefault();

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
    string fileName = args.Files.FirstOrDefault().Name;
    UploadOperationType operation = args.Operation;
    int statusCode = args.Request.Status;
    string statusMessage = args.Request.StatusText;
}
````

See the [full example](#example) below.

>caption Returning status code and error message from the controller for the OnError handler

<div class="skip-repl"></div>

````CS
[HttpPost]
public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
{
    // ...
    // The exact implementation depends on the business requirements.

    Response.StatusCode = 400; // Set status code 400 for some generic error for the request
    await Response.WriteAsync("error message here"); // optional

    // OR

    // Unhandled exceptions have status code 500.
    throw new Exception("error message here");

    // OR

    // This is another way to return a custom message.
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
    string fileName = args.Files.FirstOrDefault().Name;
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
    var file = args.Files.FirstOrDefault();

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
1. Send the new file name as [additional request data in the `OnUpload` event](#onupload). Use the `Save` action in the remote endpoint to set the file name, as it will be saved on the server.

>caption Rename uploaded files

<div class="skip-repl"></div>

````CS
async Task OnUploadSelect(UploadSelectEventArgs args)
{
    foreach (var file in args.Files)
    {
        // Change the file name that is displayed in the TelerikUpload component.
        // Delays here will result in rendering and upload delays.
        // The file name in the upload request will remain the original one.
        file.Name = await GetNewFileNameFromServer(file.Name, "currentUserName");
    }
}

async Task<string> GetNewFileNameFromServer(string fileName, string userName)
{
    await Task.Delay(500); // simulate network delay

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
    string fileName = args.Files.FirstOrDefault().Name;
    UploadOperationType operation = args.Operation;
    int statusCode = args.Request.Status;
    string successMessage = args.Request.ResponseText;
}
````

>caption Returning status code and success message from the controller for the OnSuccess handler

<div class="skip-repl"></div>

````CS
[HttpPost]
public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
{
    // ...
    // The exact implementation depends on the business requirements.

    // default status code 200, no custom success message
    return new OkResult();

    // OR

    // custom status code and success messsage
    Response.StatusCode = 201;
    await Response.WriteAsync("success message here");
    return new EmptyResult();

    // OR

    // default statuc code 200 and custom success message
    return new OkObjectResult("success message here");

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
async Task OnUploadHandler(UploadEventArgs args)
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

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

>caption Using the Upload events

<div class="skip-repl"></div>

````Razor
<label>
    <TelerikCheckBox @bind-Value="@ShouldCancelUpload" />
    Cancel Uploading
</label>

<TelerikUpload SaveUrl="api/upload/save"
               RemoveUrl="api/upload/remove"
               MaxFileSize="@( 16 * 1024 * 1024 )"
               MinFileSize="@( 1 * 1024 )"
               AutoUpload="false"
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
    private bool ShouldCancelUpload { get; set; }

    private async Task OnUploadCancel(UploadCancelEventArgs args)
    {
        var file = args.Files.FirstOrDefault();

        if (file.Size < 2 * 1024 * 1024 && file.Progress > 50)
        {
            args.IsCancelled = true;
        }
        else
        {
            Console.WriteLine($"OnCancel event for {file.Name}");
        }
    }

    private async Task OnUploadClear(UploadClearEventArgs args)
    {
        if (args.Files.Count > 3)
        {
            args.IsCancelled = true;
            Console.WriteLine("OnClear event cancelled conditionally.");
        }
        else
        {
            Console.WriteLine("OnClear event fired.");
        }
    }

    private async Task OnUploadError(UploadErrorEventArgs args)
    {
        Console.WriteLine($"OnError event for:");
        Console.WriteLine($"  File: {args.Files.FirstOrDefault().Name}");
        Console.WriteLine($"  Operation: {args.Operation}");
        Console.WriteLine($"  Response Status Code: {args.Request.Status}");
        Console.WriteLine($"  Response Message: {args.Request.StatusText}");
    }

    private async Task OnUploadProgress(UploadProgressEventArgs args)
    {
        Console.WriteLine($"OnProgress event for {args.Files.FirstOrDefault().Name}");
        Console.WriteLine($"  File: {args.Files.FirstOrDefault().Name}");
        Console.WriteLine($"  Progress: {args.Progress}");
    }

    private async Task OnUploadRemove(UploadEventArgs args)
    {
        var file = args.Files.FirstOrDefault();

        if (file.Extension == ".pdf")
        {
            args.IsCancelled = true;
        }
        else
        {
            Console.WriteLine($"OnRemove event for {file.Name}");

            args.RequestData.Add("dataKey", "dataValue");
            args.RequestHeaders.Add("headerKey", "headerValue");

            // Get these in the controller:
            //string headerValue = Request.Headers["headerKey"];
            //string formData = Request.Form["dataKey"];
        }
    }

    private async Task OnUploadSelect(UploadSelectEventArgs args)
    {
        Console.WriteLine("OnSelect event for:");

        foreach (var file in args.Files)
        {
            Console.WriteLine($"  Name: {file.Name}, Size: {file.Size}");
        }

        if (args.Files.Count > 5)
        {
            args.IsCancelled = true;
            Console.WriteLine("OnSelect event cancelled conditionally.");
        }
    }

    private async Task OnUploadSuccess(UploadSuccessEventArgs args)
    {
        Console.WriteLine($"OnSuccess event for:");
        Console.WriteLine($"  File: {args.Files.FirstOrDefault().Name}");
        Console.WriteLine($"  Operation: {args.Operation}");
        Console.WriteLine($"  Response Status Code: {args.Request.Status}");
    }

    private async Task OnUploadUpload(UploadEventArgs args)
    {
        if (ShouldCancelUpload)
        {
            args.IsCancelled = true;
            Console.WriteLine("OnUpload event cancelled conditionally.");
        }
        else if (args.Files.Any())
        {
            Console.WriteLine($"OnUpload event for {args.Files.FirstOrDefault().Name}.");

            args.RequestData.Add("dataKey", "dataValue");
            args.RequestHeaders.Add("headerKey", "headerValue");

            // Get the custom data and header values in the controller:
            //string headerValue = Request.Headers["headerKey"];
            //string formData = Request.Form["dataKey"];
        }
    }
}
````

````Controller
foo
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Upload Overview]({%slug upload-overview%})
* [Validation]({%slug upload-validation%})
* [Upload Methods]({%slug upload-overview%}#methods)
* [Live Demo: Upload Events](https://demos.telerik.com/blazor-ui/upload/events)
