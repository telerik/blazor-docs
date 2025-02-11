---
title: Validation
page_title: Upload Validation
description: Validate chosen and uploaded files in the File Upload for Blazor.
slug: upload-validation
tags: telerik,blazor,upload,async,validate,validation
published: true
position: 5
---

# Validate Uploaded Files

The Blazor Upload component can perform client-side validation.

To validate uploaded files, implement the validation in two parts:

* client validation - by the Telerik Upload component
* server validation - in the application endpoints

The Telerik Upload component offers parameters to validate selected files on the client:

* `Accept` - `string` - not validation per se, but this parameter can [instruct the browser what file types to allow users to select](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept).
* `AllowedExtensions` - `List<string>` - a list of valid file extensions. Choosing other file types will mark them as invalid in the UI. The default value is `null`, which allows all extensions.
* `MaxFileSize` - the maximum file size in bytes. Larger selected files will be marked as invalid and will not be uploaded.
* `MinFileSize` - the minimum size of a file in bytes. Smaller selected files will be marked as invalid and will not be uploaded.

Removing invalid files with the [x] button in the Upload interface will not call the `RemoveUrl` endpoint.

>caption Client validation by the Telerik Upload

<div class="skip-repl"></div>

````CS
@* Upload Word and Excel files between 100 KB and 2 MB *@

<TelerikUpload AllowedExtensions="@ValidFiles"
               MinFileSize="@MinFileSize"
               MaxFileSize="@MaxFileSize"
               SaveUrl="/api/upload/save"
               RemoveUrl="/api/upload/remove" />

@code{
    List<string> ValidFiles { get; set; }= new List<string>() { ".docx", ".xlsx" };
    int MinFileSize { get; set; } = 100 * 1024; // 100 KB
    int MaxFileSize { get; set; } = 2 * 1024 * 1024; // 2 MB
}
````

>note The [Blazor framework does not support form validation for files](https://github.com/dotnet/aspnetcore/issues/18821). We made [an example that creates similar experience](https://github.com/telerik/blazor-ui/tree/master/upload/form-validation). Use it as base for your implementation.

@[template](/_contentTemplates/upload/notes.md#server-security-note)

## See Also

* [Upload Overview](slug:upload-overview)
* [Upload Events](slug:upload-events)
* [Live Demo: Upload Validation](https://demos.telerik.com/blazor-ui/upload/validation)
