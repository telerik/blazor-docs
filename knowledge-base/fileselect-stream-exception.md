---
title: FileSelect Stream throws NotImplementedException
description: FileSelect Stream (FileInfoStream) methods throw Not Implemented exceptions
type: troubleshooting
page_title: FileSelect Stream throws NotImplementedException
slug: fileselect-kb-stream-exception
position: 
tags: fileselect, exception
ticketid: 1551288, 1552410, 1560275, 1585580
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>FileSelect for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

The `file.Stream` object in the [FileSelect `OnSelect` event handler](slug:fileselect-events#onselect) throws a `NotImplementedException`.

The FileSelect `Stream` (`FileInfoStream`) has exposed methods that are "not implemented".

## Error Message

````C#.skip-repl
System.NotImplementedException: The method or operation is not implemented.
    at Telerik.Blazor.Components.FileSelect.Stream.FileInfoStream.Read()
````

The same exception will occur for the following methods and properties:

* `Position`
* `Flush()`
* `Read()`
* `Seek()`
* `SetLength()`
* `Write()`

## Possible Cause

Due to Blazor framework limitations, [`FileInfoStream` does not support synchronous operations](slug:fileselect-events#fileselectfileinfo) such as `Read`, `Seek`, `Flush` and `Write`. The methods exist, but throw an exception.

## Solution

Copy the `FileInfoStream` **asynchronously** to another `Stream` via `CopyToAsync()`. Apart from the example below, also check the [FileSelect `OnSelect` event documentation](slug:fileselect-events#onselect).

>caption Copy the FileSelect Stream to another one and use sync methods

````RAZOR
@using System.IO

<TelerikFileSelect OnSelect="@ReadSelectedFiles" />

@code {
    private async Task ReadSelectedFiles(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            var ms = new MemoryStream();
            await file.Stream.CopyToAsync(ms);

            var byteArray = new byte[file.Size];

            ms.Seek(0, SeekOrigin.Begin); // not supported by file.Stream
            ms.Read(byteArray); // not supported by file.Stream
        }
    }
}
````

## See Also

* [FileSelect Overview](slug:fileselect-overview)
