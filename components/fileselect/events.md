---
title: Events
page_title: FileSelect - Events
description: Events in the FileSelect for Blazor.
slug: fileselect-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
---

# FileSelect Events

This article describes the events and event arguments of the Telerik FileSelect for Blazor:

* [`OnSelect` event](#onselect)
* [`OnRemove` event](#onremove)
* [`FileSelectFileInfo` class](#fileselectfileinfo)

## FileSelectFileInfo

The FileSelect event handlers provide a [`FileSelectEventArgs` argument](slug://Telerik.Blazor.Components.FileSelectEventArgs). `FileSelectEventArgs` has a `Files` property, which is a `List<FileSelectFileInfo>` type.

The `FileSelectFileInfo` type contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

Property | Type | Description
---------|----------|---------
`Id` | `string` | The unique file identifier.
`Name`|`string` | The file name.
`Size` |`long` | The file size in bytes.
`Extension` |`string` | The file extension.
`InvalidExtension` | `bool` | A Boolean flag that shows if the file type is invalid.
`InvalidMinFileSize` | `bool` | A Boolean flag that shows if file size is below the minimum.
`InvalidMaxFileSize` | `bool` | A Boolean flag that shows if the file size exceeds the maximum.
`Stream`| `FileInfoStream` | A [`System.IO.Stream`](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream) that can be used to load the file to memory, file system, or other. Used for **asynchronously** getting the file contents as a byte array.

> Due to the Blazor framework limitations, `FileInfoStream` does not support **synchronous** operations such as `Read`, `Seek`, `Flush`, and `Write`. The methods exist, but will [throw an exception](slug://fileselect-kb-stream-exception). A possible workaround is to copy the `FileInfoStream` **asynchronously** to another `Stream` with `CopyToAsync`, as demonstrated by the `OnSelect` event example below.

## OnSelect

The `OnSelect` fires when one or more files have been selected. The selection of files is achieved either through the **Select Files** button or by dropping the files anywhere in the component.

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo), which contains a list of `FileInfo` objects that allow the processing of the files.

See the [example below](#example).

## OnRemove

The `OnRemove` fires when a file has been removed from the list of selected files either by clicking the **x** icon or by pressing the `Del` key.

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo). As the FileSelect component allows deleting one item at a time, the collection contains only one `FileSelectFileInfo` object (the deleted one).

## Example

>caption Handling the `OnSelect` and `OnRemove` events of the FileSelect

````RAZOR
@using System.Threading

@*This code works only in Blazor Server apps.*@
@*@using Microsoft.AspNetCore.Hosting*@
@*@inject IWebHostEnvironment HostingEnvironment*@

@* Avoid namespace conflict with SvgIcons.File *@
@using IONS = System.IO


<div class="k-form-hint">
    Expected files: <strong>@string.Join(", ", AllowedExtensions)</strong>
</div>

<TelerikFileSelect AllowedExtensions="@AllowedExtensions"
                   OnRemove="@RemoveFiles"
                   OnSelect="@HandleFiles">
</TelerikFileSelect>

@code {
    private readonly List<string> AllowedExtensions = new() { ".jpg", ".png", ".gif" };

    private Dictionary<string, CancellationTokenSource> Tokens { get; set; } = new();

    private async Task HandleFiles(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            if (!file.InvalidExtension)
            {
                // Read file in-memory.
                await ReadFile(file);

                // OR

                // Save to local file system.
                // This works only in server apps and the Upload component may be a better choice.
                //await UploadFile(file);
            }
        }
    }

    private async Task ReadFile(FileSelectFileInfo file)
    {
        Tokens.Add(file.Id, new CancellationTokenSource());
        byte[] byteArray = new byte[file.Size];
        await using IONS.MemoryStream ms = new(byteArray);
        await file.Stream.CopyToAsync(ms, Tokens[file.Id].Token);
    }

    private async Task UploadFile(FileSelectFileInfo file)
    {
        // This code works only in Blazor Server apps.
        // Saving files on the user device is not allowed in WebAssembly apps.

        //Tokens.Add(file.Id, new CancellationTokenSource());
        //string path = Path.Combine(HostingEnvironment.WebRootPath, file.Name);
        //await using FileStream fs = new FileStream(path, FileMode.Create);
        //await file.Stream.CopyToAsync(fs, Tokens[file.Id].Token);
    }

    private async Task RemoveFiles(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            // If you're still uploading the file, cancel the process first.
            Tokens[file.Id].Cancel();
            Tokens.Remove(file.Id);

            await Task.Delay(1);

            // This code works only in Blazor Server apps.
            // Saving files on the user device is not allowed in WebAssembly apps.

            //string path = Path.Combine(HostingEnvironment.WebRootPath, file.Name);

            //if (IONS.File.Exists(path))
            //{
            //    // Remove the file from the file system
            //    IONS.File.Delete(path);
            //}
        }
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [Live Demo: Blazor FileSelect Events](https://demos.telerik.com/blazor-ui/fileselect/events)
* [Telerik UI for Blazor FileSelect Overview](slug://fileselect-overview)
* [Blazor FileSelect Validation](slug://fileselect-validation)
