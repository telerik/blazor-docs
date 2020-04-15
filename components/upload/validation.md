---
title: Validation
page_title: Upload for Blazor | Validation
description: Validate chosen and uploaded files in the File Upload for Blazor
slug: upload-validation
tags: telerik,blazor,upload,async,validate,validation
published: true
position: 2
---

# Validate Uploaded Files

Files must be validated when uploading, and the process has two parts:

* client validation - performed by the Telerik Upload component
* server validation - must be implemented in the application endpoints

The Telerik Upload component offers parameters to validate the file selection on the client:

* `AllowedExtensions` - a list of extensions that the user can select. Choosing different files will mark them as invalid in the UI and will not upload them.
* `MaxFileSize` - the maximum size of a file in bytes. Files with a larger size will be marked as invalid in the UI and will not upload.
* `MinFileSize` - the minimum size of a file in bytes. Files with a smaller size will be marked as invalid in the UI and will not upload.

Removing invalid files from the [x] button in the UI will not call the `RemoveUrl` handler.


>caption Client validation in the Telerik Upload component

@[template](/_contentTemplates/upload/notes.md#see-controller-sample-in-overview)

````CSHTML
@* Some images are only allowed, min size 1KB, max size 2MB
    This sample does not showcase a controller that consumes these files for brevity
    For such an example see https://docs.telerik.com/blazor-ui/components/upload/overview
*@

<TelerikUpload AllowedExtensions="@( new List<string>() { ".jpg", ".png", ".jpeg" } )"
               MaxFileSize="2048000"
               MinFileSize="1024"
               SaveUrl="@uploadHandler" RemoveUrl="@removeHandler" />

@code{
    string uploadHandler = "/api/upload/save";
    string removeHandler = "/api/upload/remove";
}
````

>caption Valid and Invalid files

![Valid and Invalid files uploaded](images/upload-overview-validation.png)

>note Form validation for files is not supported in the framework at this point, see the following issue: https://github.com/dotnet/aspnetcore/issues/18821. We made an example that creates similar experience in the following repo, so you can use it as base for your implementation: [https://github.com/telerik/blazor-ui/tree/master/upload/form-validation](https://github.com/telerik/blazor-ui/tree/master/upload/form-validation)

@[template](/_contentTemplates/upload/notes.md#server-security-note)

## See Also

* [Upload Overview]({%slug upload-overview%})
* [Upload Events]({%slug upload-events%})
* [Live Demo: Upload Validation](https://demos.telerik.com/blazor-ui/upload/validation)

