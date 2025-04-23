---
title: Overview
page_title: FileSelect Overview
description: Overview of the FileSelect for Blazor.
slug: fileselect-overview
tags: telerik,blazor,fileselect,async,overview
published: True
position: 0
---

# Blazor FileSelect Overview

The <a href = "https://www.telerik.com/blazor-ui/fileselect" target="_blank">Telerik UI for Blazor FileSelect component</a> helps users select one or more files from their local file system.

The Blazor FileSelect provides a [Stream](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream?view=net-6.0) for each selected file, so that you can manipulate the file in-memory or save (upload) it to the server file system.

## FileSelect vs. Upload

@[template](/_contentTemplates/upload/notes.md#fileselect-upload-comparison)

## Creating Blazor FileSelect

1. Add the `TelerikFileSelect` tag.
1. Set `AllowedExtensions` to a `List<string>`.
1. Set `MaxFileSize` in bytes.
1. If you are using a Blazor **Server** app and `MaxFileSize` is greater than **32 KB**, [increase the maximum SignalR message size](#large-file-support).
1. Implement an [`OnSelect` event handler](slug:fileselect-events#onselect).

Steps 2 and 3 are optional, but strongly recommended.

>caption Using the FileSelect

````CS
<TelerikFileSelect AllowedExtensions="@AllowedExtensions"
                   MaxFileSize="@MaxFileSize"
                   OnSelect="@OnSelectHandler" />

@code {
    List<string> AllowedExtensions { get; set; } = new List<string>() { ".docx", ".pdf" };
    int MaxFileSize { get; set; } = 1024 * 1024; // 1 MB

    async Task OnSelectHandler(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            var buffer = new byte[file.Stream.Length];
            await file.Stream.ReadAsync(buffer);
        }
    }
}
````


## Large File Support

This section applies only to Blazor **Server** apps. Blazor **WebAssembly** apps do not require additional configuration for the FileSelect to work with large files.

In Blazor **Server** apps, the FileSelect uses the **SignalR WebSocket** to send files from the browser to the server .NET runtime. The default SignalR maximum message size is **32 KB**. To work with larger files, [increase the max WebSocket message size for the Blazor application](slug:common-kb-increase-signalr-max-message-size).

## Drag-and-Drop File Support

The FileSelect provides built-in file drag-and-drop support, which allows users to drag one or multiple files and drop them anywhere in the component. The [`OnSelect` event](slug:fileselect-events#onselect) is raised upon dropping the file. You can handle this event to perform further actions with the selected file.

Additionally, you may define an external drop zone by using the [Telerik UI for Blazor DropZone component](slug:dropzone-overview).

## Validation

The FileSelect includes [built-in client-side validation](slug:fileselect-validation) for the file size and type (extension). Additional custom validation can take place in the [OnSelect event](slug:fileselect-events#onselect).

## Initial Files

The Initial Files feature allows you to display a set of pre-selected files in the FileSelect when the component loads. This functionality is helpful when you want to show files that were previously provided by the user. [Read more about the FileSelect Initial Files feature...](slug:fileselect-initial-files)

## Templates

You can use the functionality of the built-in template and modify the appearance of the **Select files...** button. [Read more about the Telerik FileSelect templates...](slug:fileselect-templates)

## FileSelect Parameters

The following table lists the FileSelect parameters. Also check the [FileSelect API Reference](slug:Telerik.Blazor.Components.TelerikFileSelect) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Accept` | `string` | The [`accept` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) of the file `<input>`. It controls what file types and MIME types the browser will allow users to select. Compare with `AllowedExtensions`. |
| `AllowedExtensions` | `List<string>` | The list of allowed file types. The component will check if the selected files are compliant **after selection**. Compare with `Accept`. Read more at [Validation](slug:fileselect-validation). |
| `Capture` | `string` | The [`capture` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture) of the `<input type="file" />` element. It enables users to provide a file directly from their device camera. |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-upload">` element. (The FileSelect reuses the Upload HTML rendering.) |
| `DropZoneId` | `string` | The id that is used to connect the FileSelect to an external [DropZone](slug:dropzone-overview). Assign a value matching the `Id` of the DropZone you are connecting the component with. |
| `Enabled` | `bool`<br />(`true`) | Enables file selection. |
| `Id` | `string` | Renders an `id` attribute to the `<input type="file" />` element. Can be used together with a `<label>`. |
| `MaxFileSize` | `long?` | Sets the maximum allowed file size in bytes. Read more in the [Large File Support](#large-file-support) section and in the [Validation](slug:fileselect-validation) article. |
| `MinFileSize` | `long?` | Sets the minimum allowed file size in bytes. Read more in the [Validation](slug:fileselect-validation) article. |
| `Multiple` | `bool`<br />(`true`) | Sets if the user can select several files at the same time. |
| `Files` | `IEnumerable<FileSelectFileInfo>` | Collection of files that will be initially displayed in the FileSelect file list. |


## FileSelect Reference and Methods

The File Select exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` attribute (example below). The FileSelect methods are:

| Method | Description |
| --- | --- |
| `ClearFiles` | Clears all files from the list. |
| `OpenSelectFilesDialog` | Shows the browser's file selection dialog. This method [doesn't work in Safari due to browser security restrictions](slug:upload-kb-openselectfilesdialog-safari). |

>caption Get reference to the FileSelect and execute methods

````RAZOR
<p>
    <TelerikButton OnClick="@SelectFiles">Open File Selection Dialog</TelerikButton>
    <TelerikButton OnClick="@Clear">Clear File List</TelerikButton>
</p>

<TelerikFileSelect @ref="@FileSelectRef" />

@code {
    private TelerikFileSelect FileSelectRef { get; set; }

    private void SelectFiles()
    {
        FileSelectRef.OpenSelectFilesDialog();
    }

    private void Clear()
    {
        FileSelectRef.ClearFiles();
    }
}
````


## Next Steps

* [Explore FileSelect Validation](slug:fileselect-validation)
* [Use FileSelect Events](slug:fileselect-events)


## See Also

* [FileSelect API](slug:Telerik.Blazor.Components.TelerikFileSelect)
* [Live Demo: FileSelect](https://demos.telerik.com/blazor-ui/fileselect/overview)
