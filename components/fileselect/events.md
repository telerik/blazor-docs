---
title: Events
page_title: FileSelect - Events
description: Events in the FileSelect for Blazor.
slug: fileselect-events
tags: telerik,blazor,upload,async,events
published: true
position: 20
components: ["fileselect"]
---

# FileSelect Events

This article describes the events and event arguments of the Telerik FileSelect for Blazor:

* [`OnSelect` event](#onselect)
* [`OnRemove` event](#onremove)
* [`FileSelectFileInfo` class](#fileselectfileinfo)

## FileSelectFileInfo

The FileSelect event handlers provide a [`FileSelectEventArgs` argument](slug:Telerik.Blazor.Components.FileSelectEventArgs). `FileSelectEventArgs` has a `Files` property, which is a `List<FileSelectFileInfo>` type.

The `FileSelectFileInfo` type contains the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

Property | Type | Description
---------|----------|---------
`Id` | `string` | The unique file identifier.
`Name`|`string` | The encoded file name, including the extension. One method to decode it is [`System.Net.WebUtility.HtmlDecode()`](https://learn.microsoft.com/en-us/dotnet/api/system.net.webutility.htmldecode). The file can be renamed in the [`OnSelect` event handler](#onselect).
`Size` |`long` | The file size in bytes.
`Extension` |`string` | The file extension.
`InvalidExtension` | `bool` | A Boolean flag that shows if the file type is invalid.
`InvalidMinFileSize` | `bool` | A Boolean flag that shows if file size is below the minimum.
`InvalidMaxFileSize` | `bool` | A Boolean flag that shows if the file size exceeds the maximum.
`Stream`| `FileInfoStream` | A [`System.IO.Stream`](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream) that can be used to load the file to memory, file system, or other. Used for **asynchronously** getting the file contents as a byte array.

> Due to the Blazor framework limitations, `FileInfoStream` does not support **synchronous** operations such as `Read`, `Seek`, `Flush`, and `Write`. The methods exist, but will [throw an exception](slug:fileselect-kb-stream-exception). A possible workaround is to copy the `FileInfoStream` **asynchronously** to another `Stream` with `CopyToAsync`, as demonstrated by the `OnSelect` event example below.

## OnSelect

The `OnSelect` event fires each time when the user selects file(s) through the **Select Files** button or by drag and drop anywhere in the component.

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo). If you set its `IsCancelled` property to `true`, the component ignores the user action and all newly selected files do not appear in the component file list.

`OnSelect` fires for both valid and invalid files. You can verify if the file is valid by checking the validation-related properties of each [`FileSelectFileInfo`](slug:fileselect-events#fileselectfileinfo) object. If necessary, the application can still handle invalid files, for example, read their content.

See the [example below](#example).

## OnRemove

The `OnRemove` event fires when the user deletes a file from the list by clicking the **x** icon or by pressing the `Del` key.

The event handler receives a [`FileSelectEventArgs` object](#fileselectfileinfo). The `Files` collection in the event argument always contains a single `FileSelectFileInfo` object. This is unlike the `OnSelect` event where `Files` can include one or more files.

`OnRemove` fires for both valid and invalid files.

## Example

>caption Handle the FileSelect `OnSelect` and `OnRemove` events

<demo metaUrl="client/fileselect/events/" height="300"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [Live Demo: Blazor FileSelect Events](https://demos.telerik.com/blazor-ui/fileselect/events)
* [Telerik UI for Blazor FileSelect Overview](slug:fileselect-overview)
* [Blazor FileSelect Validation](slug:fileselect-validation)
