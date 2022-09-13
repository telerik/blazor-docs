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

* [OnSelect event](#onselect)
* [OnRemove event](#onremove)
* [FileSelectFileInfo class](#fileselectfileinfo)

## FileSelectFileInfo

The FileSelect event handlers provide a [`FileSelectEventArgs` argument](/blazor-ui/api/Telerik.Blazor.Components.FileSelectEventArgs). It has a `Files` property, which is a `List<FileSelectFileInfo>`.

The `FileSelectFileInfo` type contains these properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

Property | Type | Description
---------|----------|---------
`Id` | `string` | the unique file identifier
`Name`|`string` | the file name
`Size` |`long` | the file size in bytes
`Extension` |`string` | the file extension
`InvalidExtension` | `bool` | a boolean flag that shows if the file type is invalid
`InvalidMinFileSize` | `bool` | a boolean flag that shows if file size is below the minimum
`InvalidMaxFileSize` | `bool` | a boolean flag that shows if the file size exceeds the maximum
`Stream`| `FileInfoStream` | a [System.IO.Stream](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream) that can be used to load the file to memory, file system or other. Use it to asynchronously get the file contents as byte array.


## OnSelect

The `OnSelect` fires when one or multiple files have been selected through the `Select files` button. Contains a list of fileInfo objects, allowing processing of the files.

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo).

>caption Handle the OnSelect event of the FileSelect

````CSHTML
@*Handle the OnSelect event of the FileSelect to access the selected files and upload them*@

@using System.IO
@using Microsoft.AspNetCore.Hosting
@using System.Threading
@using Telerik.Blazor.Components.FileSelect

@inject IWebHostEnvironment HostingEnvironment

<div style="width:300px">
    <TelerikFileSelect OnSelect=@HandleFiles
                       AllowedExtensions="@AllowedExtensions">
    </TelerikFileSelect>
    <div class="k-form-hint">
        Expected files: <strong>JPG, PNG, GIF</strong>
    </div>
</div>

@code {
    public List<string> AllowedExtensions { get; set; } = new List<string>() { ".jpg", ".png", ".gif" };
    public Dictionary<string, CancellationTokenSource> Tokens { get; set; } = new Dictionary<string, CancellationTokenSource>();

    private async Task HandleFiles(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            if (!file.InvalidExtension)
            {
	        // save to local file system
                await UploadFile(file);
		// or read file in-memory
		//await ReadFile(file);
            }
        }
    }

    private async Task UploadFile(FileSelectFileInfo file)
    {
        Tokens.Add(file.Id, new CancellationTokenSource());
        var path = Path.Combine(HostingEnvironment?.WebRootPath, file.Name);
        await using FileStream fs = new FileStream(path, FileMode.Create);
        await file.Stream.CopyToAsync(fs, Tokens[file.Id].Token);
    }
    
    private async Task ReadFile(FileSelectFileInfo file)
    {
        Tokens.Add(file.Id, new CancellationTokenSource());
        var byteArray = new byte[file.Size];
        await using MemoryStream ms = new MemoryStream(byteArray);
        await file.Stream.CopyToAsync(ms, Tokens[file.Id].Token);
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnRemove

The `OnRemove` fires when a file has been removed from the list of selected files (by clicking the `x` icon or pressing `Del` key).

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo). As the FileSelect component allows deleting one item at a time, the collection contains only one `FileSelectFileInfo` object (the deleted one).

>caption Handle the OnRemove event of the FileSelect

````CSHTML
@*Handle the OnRemove event of the FileSelect to access and delete the uploaded files*@

@using System.IO
@using Microsoft.AspNetCore.Hosting
@using System.Threading
@using Telerik.Blazor.Components.FileSelect

@inject IWebHostEnvironment HostingEnvironment

<div style="width:300px">
	<TelerikFileSelect OnRemove=@HandleRemoveFiles
					   AllowedExtensions="@AllowedExtensions">
	</TelerikFileSelect>
	<div class="k-form-hint">
		Expected files: <strong>JPG, PNG, GIF</strong>		
	</div>
</div>

@code {
	public List<string> AllowedExtensions { get; set; } = new List<string>() { ".jpg", ".png", ".gif" };
	public Dictionary<string, CancellationTokenSource> Tokens { get; set; } = new Dictionary<string, CancellationTokenSource>();

	private async Task HandleRemoveFiles(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            // If you're still uploading the file, cancel the process first.
            Tokens[file.Id].Cancel();
            Tokens.Remove(file.Id);

            await Task.Delay(1);

            var path = Path.Combine(HostingEnvironment?.WebRootPath, file.Name);
            
            // Remove the file from the file system
            File.Delete(path);
        }

    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Live Demo: FileSelect Events](https://demos.telerik.com/blazor-ui/fileselect/events)
* [FileSelect Overview]({%slug fileselect-overview%})
* [FileSelect Validation]({%slug fileselect-validation%})
