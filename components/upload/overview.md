---
title: Overview
page_title: Upload for Blazor Overview
description: Overview of the Async Upload for Blazor
slug: upload-overview
tags: telerik,blazor,upload,async,overview
published: True
position: 0
---

# Async Upload Overview

The Upload component lets the user upload files to a server asynchronously. They can select one or multiple files, and you can control whether the upload starts immediately or upon a button click. You can also customize the selected file templates and let users delete their uploaded files. There is also validation for the selected files extensions and size.

To use a Telerik Upload for Blazor

1. Add the `TelerikUpload` tag and set its `SaveUrl` and `DeleteUrl` (optional) to controller methods that will handle the files.

    **CSHTML**

        @* Most of this code is for defining the URLs, the Upload is just one tag *@
        @using Microsoft.AspNetCore.Http;
        @inject IHttpContextAccessor HttpContextAccessor
        
        @{
            // sample way of defining the URLs. You can hardcode them, or use a NavigationManager instance
            var request = HttpContextAccessor.HttpContext.Request;
            string uploadHandler = "/api/upload/save";
            string removeHandler = "/api/upload/remove";
            var saveUrl = $"{request.Scheme}://{request.Host}{request.PathBase}{uploadHandler}";
            var removeUrl = $"{request.Scheme}://{request.Host}{request.PathBase}{removeHandler}";
        }
        
        <TelerikUpload SaveUrl="@url" RemoveUrl="@removeUrl" Multiple="true" AutoUpload="true" />

1. Create a suitable controller (endpoint) that can receive files from a POST request. For example:

    **C#**
    
        using Microsoft.AspNetCore.Mvc;
        using System.Collections.Generic;
        using System.IO;
        using Microsoft.AspNetCore.Http;
        using Microsoft.AspNetCore.Hosting;
        using System.Net.Http.Headers;
        using System.Threading.Tasks;
        
        namespace MyBlazorApp.Controllers
        {
            [Route("api/[controller]/[action]")]
            public class UploadController : Controller
            {
                public IHostingEnvironment HostingEnvironment { get; set; }
        
                public UploadController(IHostingEnvironment hostingEnvironment)
                {
                    HostingEnvironment = hostingEnvironment;
                }
        
                [HttpPost]
                public async Task<IActionResult> Save(IEnumerable<IFormFile> files) // the default field name. See SaveField
                {
                    if (files != null)
                    {
                        try
                        {
                            foreach (var file in files)
                            {
                                var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
        
                                // Some browsers send file names with full path.
                                // We are only interested in the file name.
                                // You can use HtmlEncoder.Default.Encode to encode the filename
                                var fileName = Path.GetFileName(fileContent.FileName.ToString().Trim('"'));
                                var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);
        
                                // Implement security mechanisms here - prevent path traversals,
                                // check for allowed extensions, types, size, content, viruses, etc.
                                // this sample always saves the file to the root and is not sufficient for a real application
                                using (var fileStream = new FileStream(physicalPath, FileMode.Create))
                                {
                                    // The files are not actually saved in this demo
                                    await file.CopyToAsync(fileStream);
                                }
                            }
                        }
                        catch
                        {
                            // implement error handling here, this merely indicates a failure to the upload
                            Response.StatusCode = 400;
                        }
                    }
        
                    // Return an empty string to signify success
                    return new EmptyResult();
                }
        
        
                [HttpPost]
                public ActionResult Remove(string[] files) // the default field name. See RemoveField
                {
                    if (files != null)
                    {
                        try
                        {
                            foreach (var fullName in files)
                            {
                                var fileName = Path.GetFileName(fullName);
                                var physicalPath = Path.Combine(HostingEnvironment.WebRootPath, fileName);
        
                                if (System.IO.File.Exists(physicalPath))
                                {
                                    // Implement security mechanisms here - prevent path traversals,
                                    // check for allowed extensions, types, permissions, etc.
                                    // this sample always deletes the file from the root and is not sufficient for a real application
        
                                    System.IO.File.Delete(physicalPath);
                                }
                            }
                        }
                        catch
                        {
                            // implement error handling here, this merely indicates a failure to the upload
                            Response.StatusCode = 400;
                        }
                    }
        
                    // Return an empty string to signify success
                    return new EmptyResult();
                }
            }
        }


>caption The result from the code snippet above

![](images/scheduler-basic-screenshot.png)

>caption Component namespace and reference

````CSHTML
<TelerikUpload @ref="@UploadRef" />

@code{
    Telerik.Blazor.Components.TelerikUpload UploadRef { get; set; }
}
````

>caption The Upload provides the following key features:

* `AutoUpload` - Specifies whether the upload of a file should start immediately upon its selection, or the user must click the "Upload" button.
* `Enabled` - Whether the component is enabled for the end user.
* `Multiple` - Enables the selection of multiple files. If set to `false` (the default value for a boolean field), only one file can be selected at a time.
* `RemoveField` - Sets the `FormData` key which contains the file names submitted to the `RemoveUrl` endpoint when the user clicks the individual [x] button on the chosen files. Defaults to `files`.
* `RemoveUrl`- Sets the URL of the endpoint for the remove request. The `FormData` request key is named after the `RemoveField` parameter. It contains the list of file names which should be removed from the server. The handler must accept POST requests which contain one or more fields with the same name as the `RemoveField`.
* `SaveField` - Sets the `FormData` key which contains the files submitted to the `SaveUrl` endpoint. Defaults to `files`.
* `SaveUrl`- The URL of the handler (endpoint, controller) that will receive the uploaded files. The handler must accept POST requests which contain one or more fields with the same name as the `SaveField`.
* `Template` - Lets you customize the rendering of the selected files in the file list (for example, add your own images depending on the file extension, additional text, etc.).
* `WithCredentials` - Controls whether to send credentials (cookies, headers) for cross-site requests.
* Validation 

>important Validation and security must be implemented in the endpoint handlers (controllers). Requests for them can be forged or manipulated and it is up to the application to ensure its security.


## See Also

  * [Events]({%slug upload-events%})

