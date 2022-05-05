---
title: Upload
page_title: FileManager - Upload
description: Upload files in the FileManager for Blazor.
slug: filemanager-upload
tags: telerik,blazor,upload,files
published: True
position: 17
---

# FileManager Upload

The FileManager allows uploading of files through an integrated Upload component. It is displayed in a dialog on click of the [`Upload` Toolbar button]({%slug filemanager-toolbar%}).

Before continuing, make sure you are familiar with the specifics of the [Upload component]({%slug upload-overview%}).

The upload can be configured through the `FileManagerUploadSettings` child tag of the `FileManagerSettings`.

The available settings are inherited from the Upload features and events. Here is a list of the supported configurations:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
|----------|----------|
| **General configuration** (also check [Upload - Parameters]({%slug upload-overview%}#upload-parameters)) |
| `SaveUrl` | The upload url
| `SaveField`| Sets the FormData key which contains the files submitted to saveUrl.
| `RemoveUrl`| The URL of the handler which is responsible for the removal of the uploaded files (if any).
| `RemoveField`| Sets the FormData key which contains the list of file names that are submitted to removeUrl.
| `WithCredentials`| Configures whether credentials (cookies, headers) will be sent for cross-site requests.
| **File validation** (also check [Upload - Validation]({%slug upload-validation%}))| |
| `Multiple` | Enables the selection of multiple files. If set to false, only one file can be selected at a time.
| `AllowedExtensions` | The list of the allowed file extensions.
| `MinFileSize` | Defines the minimum file size in bytes.
| `MaxFileSize` | Defines the maximum file size in bytes.
| **Events** (also check [Upload - Events]({%slug upload-events%}))| |
| `OnUpload` | Triggered before a file is uploaded.
| `OnRemove` | Triggered before an Upload file is removed.
| `OnSuccess` | Triggered when a file has been uploaded.
| `OnError` | Triggered when a file upload has failed.
| `OnCancel` | Triggered when a file upload is canceled.
| `OnSelect` | Triggered when a file is selected for upload.
| `OnProgress` | Triggered when the progress of the file upload is changed.


>caption Handle sucessful upload in the FileManager

````CSHTML

````

## Next Steps

* [Upload Events]({%slug upload-events%})
* [Upload Validation]({%slug upload-validation%})

## See Also

* [FileManager Upload Demo](https://demos.telerik.com/blazor-ui/upload/overview)
