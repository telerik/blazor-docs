---
title: Overview
page_title: FileSelect Overview
description: Overview of the FileSelect for Blazor.
slug: fileselect-overview
tags: telerik,blazor,fileselect,async,overview
published: True
position: 0
---

# FileSelect Overview

FileSelect component helps users select single or multiple files from their local file systems. The component is especially useful when you want full control over the process of creating the server requests and sent forms.

The Telerik FileSelect for Blazor provides a [Stream](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream?view=net-6.0) for each selected file, so that you can save it to memory, a file system or other destination.

>tip The maximum file size supported by the framework up till .NET 5 is 2 GB and as of .NET 6 [this limit is removed](https://github.com/dotnet/aspnetcore/pull/33900). At the time of introducing the component, Telerik UI for Blazor supports .NET versions 3.1.x - 6 and for multi-targeting purposes the FileSelect component allows maximum file size of 2 GB.

#### To use a Telerik FileSelect for Blazor

>caption Component namespace and reference

````CSHTML
<TelerikFileSelect @ref="@FileSelectRef" />

@code{
    Telerik.Blazor.Components.TelerikFileSelect FileSelectRef { get; set; }
}
````

## Features

The FileSelect component provides the following key features:

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the FileSelect component
* `Enabled` - `bool` - enables or disables the component.
* `Multiple` - `bool` - controls whether selection of multiple files at once is allowed. Default value is true`.
* `AllowedExtensions` - `List<string>` - a list of allowed file extensions. Read more in [Validation article]({%slug fileselect-validation%}).
* `MinFileSize` - `int?` - the minimum file size in bytes allowed for upload. Default is null. Read more in [Validation article]({%slug fileselect-validation%}).
* `MaxFileSize`- `int?` - the maximum file size in bytes. Default is null. Read more in [Validation article]({%slug fileselect-validation%}).

## See Also

* [Live Demo: FileSelect Overview](https://demos.telerik.com/blazor-ui/fileselect/overview)
* [FileSelect Validation]({%slug fileselect-validation%})
* [FileSelect Events]({%slug fileselect-events%})