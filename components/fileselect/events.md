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

This article explains the events available in the Telerik FileSelect for Blazor:

* [OnSelect](#onselect)
* [OnRemove](#onremove)

## OnSelect

The `OnSelect` fires when one or multiple files have been selected through the `Select files` button. Contains a list of fileInfo objects, allowing processing of the files.

The event handler receives a `FileSelectEventArgs` object. Its `Files` field is a collection of `FileSelectFileInfo` objects. They describe each selected file and allow its processing.

The `FileSelectFileInfo` object contains the following properties:

Property | Type | Description
---------|----------|---------
`Id` | `string` | the unique identifier of the file.
`Name`|`string` | the file name.
`Size` |`long` | the file size in bytes.
`Extension` |`string` | the file extension.
`InvalidExtension` | `bool` | a boolean flag indicating whether the file has an extension that is not within the specified ones.
`InvalidMinFileSize` | `bool` | a boolean flag indicating whether the file has a size below the minimum.
`InvalidMaxFileSize` | `bool` | a boolean flag indicating whether the file exceeds the max file size.
`Stream`| `FileInfoStream` | a stream that can be used to upload the file to memory, file system or other. It's used to asynchronously get the byte array data of the file.

>caption Handle the OnSelect event of the FileSelect

````CSHTML
*Handle the OnSelect event of the FileSelect to access the selected files and upload them*@

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

	private void HandleFiles(FileSelectEventArgs args)
	{
		foreach (var file in args.Files)
		{
			if (!file.InvalidExtension)
			{
				_ = UploadFile(file);
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
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnRemove

The `OnRemove` fires when a file has been removed from the list of selected files (by clicking the `x` icon or pressing `Del` key). Contains the removed fileInfo object.

The event handler receives a `FileSelectEventArgs` object. Its `Files` field is a collection of `FileSelectFileInfo` objects. As the FileSelect component allows deleting one item at a time, the collection contains only one `FileSelectFileInfo` object (the deleted one) and it has the following fields:

Property | Type | Description
---------|----------|---------
`Id`| `string` | the unique identifier of the file.
`Name` | `string` | the file name.
`Size` | `long`  | the file size in bytes.
`Extension` | `string` | the file extension.
`InvalidExtension` | `bool` | a boolean flag indicating whether the file has an extension that is not within the specified ones.
`InvalidMinFileSize` | `bool` | a boolean flag indicating whether the file has a size below the minimum.
`InvalidMaxFileSize` | `bool` | a boolean flag indicating whether the file exceeds the max file size.
`Stream` | `FileInfoStream` | a stream that can be used to upload the file to memory, file system or other. It's used to asynchronously get the byte array data of the file.

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
