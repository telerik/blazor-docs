---
title: Events
page_title: Upload | Events
description: Events in the File Upload for Blazor
slug: upload-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
---

# Upload Events

This article explains the events available in the Telerik Upload for Blazor:


* [OnSelect](#onselect)
* [OnUpload](#onupload)
* [OnRemove](#onremove)
* [OnProgress](#onprogress)
* [OnSuccess](#onsuccess)
* [OnError](#onerror)
* [OnCancel](#oncancel)
* [OnClear](#onclear)

>note The file `Name` in the event arguments is HTML encoded. If you want the actual name you may need to decode it (for example, use `System.Net.WebUtility.HtmlDecode(file.Name)`). The file name that the controller (endpoint) receives is *not* encoded.

## OnSelect

The `OnSelect` event fires every time the user selects new files for upload. The event arguments provide the list of newly selected files.

You can cancel the event based on a condition (for example, some information about the selected files) so that those files will not be populated in the Upload component.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnSelect event and cancelling it on condition

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
                RemoveUrl="@RemoveUrl"
                OnSelect="@OnSelectHandler">
</TelerikUpload>

@code {
    async Task OnSelectHandler(UploadSelectEventArgs e)
    {
        // cancel the event on some condition - more than two new files are added
        if (e.Files.Count > 2)
        {
            e.IsCancelled = true;
        }

        foreach (var item in e.Files)
        {
            Console.WriteLine($"OnSelect: {item.Name}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````


>caption Changing the file name and checking for duplicate files on the server

In some cases, you may have duplicate files with the same name on the server and you may need to change the current file name when uploading it. This must happen in the endpoint only, and there are a couple of ways to notify the client for that:

* Use the [OnSuccess event](#onsuccess) to read information the endpoint will send so you can use it in the view (for example, to add a preview of an image). In this case, the file name in the Upload component will not change.

* Use the OnSelect event to call the endpoint and check for duplicates before the actual upload process starts. You can generate a new name, if needed, and set it to the `Name` of the file that will be uploaded. This will update the rendered file name in the UI for the user. Note that this will not change the file name that will be sent to the endpoint - it will still be the original file name from the user's file system and it is up to the endpoint to implement the same logic when saving the file.

Of course, you can combine both approaches.


````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnSelect="@OnSelectHandler">
</TelerikUpload>

@code {
    async Task OnSelectHandler(UploadSelectEventArgs e)
    {
        foreach (var item in e.Files)
        {
            // this will change the file name displayed in the TelerikUpload component
            // delays will result in a delay in rendering the file and starting the upload
            // NOTE: the file name in the XHR request to the server will be the original file name
            // and it is up to the server to handle it with the same logic for naming
            item.Name = await AskServerForFinalFileName(item.Name, "currentUserName");
        }
    }

    async Task<string> AskServerForFinalFileName(string fileName, string userName)
    {
        await Task.Delay(500); // simulate network delay. Remove for a real app

        // in a real case this can be the controller that will save the files on the server
        // make sure that the same name generation logic will be used when actually saving the file
        string finalName = $"{userName}-{fileName}";

        return await Task.FromResult(finalName);
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnUpload

The `OnUpload` event fires when files will be uploaded. For example, by default it will fire immediately after `OnSelect`, unless you set `AutoUpload="false"`. The event arguments provide the list of the files that will be uploaded and access to the request object so you can provide metadata to the server (such as authentication information).

You can cancel the event based on a condition (for example, some information about the selected files) so that the file upload will not actually happen.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnUpload event and cancelling it on condition

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
                RemoveUrl="@RemoveUrl"
                OnUpload="@OnUploadHandler">
</TelerikUpload>

@code {
    async Task OnUploadHandler(UploadEventArgs e)
    {
        // cancel the event on some condition - more than two new files are to be uploaded
        if (e.Files.Count > 2)
        {
            e.IsCancelled = true;
        }

        foreach (var item in e.Files)
        {
            Console.WriteLine($"OnUpload: {item.Name}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

>caption Sending custom metadata with the upload request (such as authentication tokens)

@[template](/_contentTemplates/upload/notes.md#server-security-note)

````Component
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnUpload="@OnUploadHandler">
</TelerikUpload>

@code {
    async Task OnUploadHandler(UploadEventArgs e)
    {
        e.RequestData.Add("SomeFormField", "SomeFormValue"); // for example, user name
        e.RequestHeaders.Add("CustomHeader", "SomeHeaderValue"); // for example, authentication token
        // you can add more than one
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````
````Controller
namespace MyBlazorApp.Controllers
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
        public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
        {
            if (files != null)
            {
                foreach (var file in files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                    var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                    var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);

                    string customHeaderValue = Request.Headers["CustomHeader"]; // the key from the OnUpload event
                    string customFormValue = Request.Form["SomeFormField"]; // the key from the OnUpload event

                    Console.WriteLine($"header: {customHeaderValue} | form: {customFormValue}");

                    // implement security and validation here

                    using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }

            return new OkResult();
        }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)





## OnRemove

The `OnRemove` event fires when the users clicks the [x] button of an uploaded file. It sends a request to the server so you can clean up the file the user changed their mind about. It does not fire when the user removes a file that has not been uploaded yet (for example, when `AutoUpload="false"` and the user has not yet clicked the "Upload" button). The event arguments provide the file that will be deleted and access to the request object so you can provide metadata to the server (such as authentication information).

You can cancel the event based on a condition (for example, some information about the selected files) so that the file deletion request will not actually happen.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnUpload event and cancelling it on condition

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnRemove="@OnRemoveHandler">
</TelerikUpload>

@code {
    async Task OnRemoveHandler(UploadEventArgs e)
    {
        // cancel the event on some condition - the file is a PDF, for example
        if (e.Files[0].Name.ToLowerInvariant().EndsWith(".pdf"))
        {
            e.IsCancelled = true;
        }

        foreach (var item in e.Files)
        {
            Console.WriteLine($"OnRemove: {item.Name}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

>caption Sending custom metadata with the remove request (such as authentication tokens)

@[template](/_contentTemplates/upload/notes.md#server-security-note)

````Component
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnRemove="@OnRemoveHandler">
</TelerikUpload>

@code {
    async Task OnRemoveHandler(UploadEventArgs e)
    {
        e.RequestData.Add("SomeFormField", "SomeFormValue"); // for example, user name
        e.RequestHeaders.Add("CustomHeader", "SomeHeaderValue"); // for example, authentication token
        // you can add more than one
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````
````Controller
namespace MyBlazorApp.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UploadController : Controller
    {
        public IWebHostEnvironment HostingEnvironment { get; set; }

        public UploadController(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        // Save handler omitted for brevity 

        [HttpPost]
        public ActionResult Remove(string[] files)
        {
            if (files != null)
            {
                foreach (var fullName in files)
                {
                    string customHeaderValue = Request.Headers["CustomHeader"]; // the key from the OnUpload event
                    string customFormValue = Request.Form["SomeFormField"]; // the key from the OnUpload event

                    Console.WriteLine($"header: {customHeaderValue} | form: {customFormValue}");

                    // implement security and validation here

                    var fileName = Path.GetFileName(fullName);
                    var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);

                    if (System.IO.File.Exists(physicalPath))
                    {
                        // The file is not actually removed in this example
                        //System.IO.File.Delete(physicalPath);
                    }
                }
            }

            return new OkResult();
        }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnProgress

The `OnProgress` event fires each time a particular file makes a progress in its upload process (it is tied to the [`progress` event of the `xhr` object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) sending the file to the controller). The event arguments provide the file that made progress (the first file in the collection you will see in the event arguments), and the percentage of its upload. For small files it is likely to jump directly to 100%, especially on localhost.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

>caption Handling the OnProgress event to get notifications as files get updated

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnProgress="@OnProgressHandler">
</TelerikUpload>

@code {
    async Task OnProgressHandler(UploadProgressEventArgs e)
    {
        // you actually need only the first file from the collection
        foreach (var file in e.Files)
        {
            Console.WriteLine($"The progress for file {file.Name} is {e.Progress}%.");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnSuccess

The `OnSuccess` event fires each time a particular request is successful - either an upload of a file, or the deletion of a file. The event arguments provide the file that was uploaded or deleted, and the type of the operation. The `Request` object in the event arguments also carries information about the server response - such as a status code and any custom messages the server returned.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnSuccess event to know when a file was uploaded or deleted

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnSuccess="@OnSuccessHandler">
</TelerikUpload>

@code {
    async Task OnSuccessHandler(UploadSuccessEventArgs e)
    {
       var actionText = e.Operation == UploadOperationType.Upload ? "uploaded" : "removed";

        foreach (var file in e.Files)
        {
            Console.WriteLine($"The file {file.Name} has been {actionText} successfully");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

>caption Handling the OnSuccess event and consuming information the controller sent

@[template](/_contentTemplates/upload/notes.md#server-security-note)

````Component
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnSuccess="@OnSuccessHandler">
</TelerikUpload>

@code {
    async Task OnSuccessHandler(UploadSuccessEventArgs e)
    {
        Console.WriteLine($"File {e.Files[0].Name} has Status code: {e.Request.Status}, Custom message: {e.Request.ResponseText}");
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````
````Controller
namespace MyBlazorApp.Controllers
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
        public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
        {
            if (files != null)
            {
                foreach (var file in files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                    var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                    var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);

                    // implement security and validation here

                    using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    // you do not have to do this, just an example of how you can
                    //Response.StatusCode = 222; //some custom status code, defaults to 200
                    //await Response.WriteAsync("some custom message"); // works with new EmptyResult()
                }
            }

            return new OkObjectResult("some custom message"); // new OkResult() sends an OK message without custom texts
            
            //return Content("response message"); // another way to return a custom message
            
        }
        
        // the same applies to the Delete action method, it is omitted here for brevity
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnError

The `OnError` event fires each time a particular request fails - either an upload of a file, or the deletion of a file. The event arguments provide the file that was uploaded or deleted, and the type of the operation. The `Request` object in the event arguments also carries information about the server response - such as a status code and any custom messages the server returned.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnError event to know when a file could not be uploaded or deleted

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnError="@OnErrorHandler">
</TelerikUpload>

@code {
    async Task OnErrorHandler(UploadErrorEventArgs e)
    {
        var actionText = e.Operation == UploadOperationType.Upload ? "uploaded" : "removed";
        foreach (var file in e.Files)
        {
            Console.WriteLine($"The file {file.Name} could NOT be {actionText}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

>caption Handling the OnError event and consuming information the controller sent

@[template](/_contentTemplates/upload/notes.md#server-security-note)

````Component
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnError="@OnErrorHandler">
</TelerikUpload>

@code {
    async Task OnErrorHandler(UploadErrorEventArgs e)
    {
        Console.WriteLine($"File {e.Files[0].Name} has Status code: {e.Request.Status}, Custom message: {e.Request.ResponseText}");
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````
````Controller
namespace MyBlazorApp.Controllers
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
        public async Task<IActionResult> Save(IEnumerable<IFormFile> files)
        {
            if (files != null)
            {
                foreach (var file in files)
                {
                    var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
                    var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                    var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);

                    // always cause an exception to showcase the idea
                    // these are examples of throwing errors and sending response texts and status code
                    // messages that can be read by the OnError handler
                    // you do not have to return custom texts, an erroneous status code is enough
                    // Use your own code and exception handling

                    throw new Exception("something went wrong"); // unhandled exceptions have status code 500 and the main info in the text

                    //Response.StatusCode = 400; // cause status code 400 for some generic error with the request
                    //await Response.WriteAsync("some error message"); // custom error message

                    // implement security and validation here

                    using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                    {
                        //await file.CopyToAsync(fileStream);
                    }
                }
            }

            return Content("response message"); // another way to return a custom message
        }
        
        // the same applies to the Delete action method, it is omitted here for brevity
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnCancel

The `OnCancel` event fires when the user clicks the "cancel" button on a file that is currently uploading, indicating they don't want to upload it anymore.

You can cancel the event based on a condition (for example, some information about the files such as its size and current upload progress) so that the user won't be able to prevent the file from uploading.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnCancel event and cancelling it on condition

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnCancel="@OnCancelHandler">
</TelerikUpload>

@code {
    async Task OnCancelHandler(UploadCancelableEventArgs e)
    {
        // prevent the user from stopping a file upload based on condition
        // in this case - if more than 5% of the file uploaded and it is larger than 1KB
        if (e.Files[0].Progress > 5 && e.Files[0].Size > 1024)
        {
            e.IsCancelled = true;
        }

        foreach (var file in e.Files)
        {
            Console.WriteLine($"The user cancelled the upload of file {file.Name}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnClear

The `OnClear` event fires when the user clicks the Clear button which is available when `AutoUpload="false"`. You can prevent the action on a condition.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

>caption Handling the OnClear event and cancelling it on condition

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@inject NavigationManager NavigationManager

<TelerikUpload SaveUrl="@SaveUrl"
               RemoveUrl="@RemoveUrl"
               OnClear="@OnClearHandler"
               AutoUpload="false">
</TelerikUpload>

@code {
    async Task OnClearHandler(UploadClearEventArgs e)
    {
        // cancel the action if there is exactly 1 file selected
        if(e.Files.Count == 1)
        {
            e.IsCancelled = true;
        }

        foreach (var file in e.Files)
        {
            Console.WriteLine($"The user cleared this file before it was uploaded: {file.Name}");
        }
    }

    // a sample way of generating the URLs to the endpoint
    public string SaveUrl => ToAbsoluteUrl("api/upload/save");
    public string RemoveUrl => ToAbsoluteUrl("api/upload/remove");

    public string ToAbsoluteUrl(string url)
    {
        return $"{NavigationManager.BaseUri}{url}";
    }
}
````


## See Also

* [Upload Overview]({%slug upload-overview%})
* [Validation]({%slug upload-validation%})
* [Live Demo: Upload Events](https://demos.telerik.com/blazor-ui/upload/events)

