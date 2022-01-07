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

* `Id`- `string` - the unique identifier of the file.
* `Name`- `string` - the file name.
* `Size` - `long` - the file size in bytes.
* `Extension` - `string` - the file extension.
* `InvalidExtension` - `bool` - a boolean flag indicating whether the file has an extension that is * `within the specified ones.
* `InvalidMinFileSize` - `bool` - a boolean flag indicating whether the file has a size below the * `minimum.
* `InvalidMaxFileSize` - `bool` - a boolean flag indicating whether the file exceeds the max file size.
* `Stream`- `FileInfoStream` - a stream that can be used to upload the file to memory, file system or * `other. It's used to asynchronously get the byte array data of the file.

>caption Handle the OnSelect event of the FileSelect

````CSHTML
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## OnRemove

The `OnRemove` fires when a file has been removed from the list of selected files (by clicking the `x` icon or pressing `Del` key). Contains the removed fileInfo object.

The event handler receives a `FileSelectEventArgs` object which has a collection of `FileSelectFileInfo` objects. As the FileSelect component allows deleting one item at a time, the collection contains only one `FileSelectFileInfo` object (the deleted one) and it has the following fields:

* `Id`- `string` - the unique identifier of the file.
* `Name`- `string` - the file name.
* `Size` - `long` - the file size in bytes.
* `Extension` - `string` - the file extension.
* `InvalidExtension` - `bool` - a boolean flag indicating whether the file has an extension that is * `within the specified ones.
* `InvalidMinFileSize` - `bool` - a boolean flag indicating whether the file has a size below the * `minimum.
* `InvalidMaxFileSize` - `bool` - a boolean flag indicating whether the file exceeds the max file size.
* `Stream`- `FileInfoStream` - a stream that can be used to upload the file to memory, file system or * `other. It's used to asynchronously get the byte array data of the file.

>caption Handle the OnRemove event of the FileSelect

````CSHTML
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

* [Live Demo: FileSelect Events](https://demos.telerik.com/blazor-ui/upload/events)
* [FileSelect Overview]({%slug fileselect-overview%})
* [FileSelect Validation]({%slug fileselect-validation%})
