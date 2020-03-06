---
title: Events
page_title: Upload for Blazor | Events
description: Events in the Async Upload for Blazor
slug: upload-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
---

# Upload Events

This article explains the events available in the Telerik Upload for Blazor:


OnSelect="@OnSelect"
OnRemove="@OnRemove"
OnUpload="@OnUpload"
OnProgress="@OnProgress"
OnSuccess="@OnSuccess"
OnError="@OnError"
OnCancel="@OnCancel"

## OnSelect

The `OnSelect` event fires every time the user selects new files for upload. The event arguments provide the list of newly selected files.

You can cancel the event based on a condition (for example, some information about the selected files) so that those files will not be populated in the Upload component.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

>caption Handling the OnSelect event and cancelling it on condition

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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnUpload

The `OnUpload` event fires files will be uploaded. For example, by default it will fire immediately after `OnSelect`, unless you set `AutoUpload="false"`. The event arguments provide the list of the files that will be uploaded.

You can cancel the event based on a condition (for example, some information about the selected files) so that the file upload will not actually happen.

@[template](/_contentTemplates/upload/notes.md#events-files-carry-client-validation-info)

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

>caption Handling the OnUpload event and cancelling it on condition

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

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnProgress

The `OnProgress` event fires each time a particular file makes a progress in its upload process (it is tied to the [`progress` event of the `xhr` object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event) sending the file to the controller). The event arguments provide the file that made progress (the first file in the collection you will see in the event arguments), and the percentage of its upload. For small files it is likely to jump directly to 100%.

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
        Console.WriteLine($"Status code: {e.Request.Status}, Custom message: {e.Request.ResponseText}");
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
                        //await file.CopyToAsync(fileStream);
                    }

                    // you do not have to do this, just an example of how you can
                    //Response.StatusCode = 222; //some custom status code, defaults to 200
                    //Response.WriteAsync("some custom message"); // works with new EmptyResult()
                }
            }

            return new OkObjectResult("some custom message"); // new OkResult() sends an OK message without custom texts
        }
    }
}
````



@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)





## See Also

* [Upload Overview]({%slug upload-overview%})

