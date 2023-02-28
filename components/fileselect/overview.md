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

The <a href = "https://www.telerik.com/blazor-ui/fileselect" target="_blank">Blazor FileSelect component</a> helps users select one or multiple files from their local file system.

The Telerik FileSelect for Blazor provides a [Stream](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream?view=net-6.0) for each selected file, so that you can manipulate the file in-memory or save (upload) it to the server file system.

## Comparison to the Upload

@[template](/_contentTemplates/upload/notes.md#fileselect-upload-comparison)

## Creating Blazor FileSelect

1. Add the `TelerikFileSelect` tag.
1. Set `AllowedExtensions` to a `List<string>`.
1. Set `MaxFileSize` in bytes.
1. If you are using a Blazor **Server** app and `MaxFileSize` is greater than **32 KB**, [increase the maximum SignalR message size](#large-file-support).
1. Implement an [`OnSelect` event handler]({%slug fileselect-events%}#onselect).

Steps 2 and 3 are optional, but strongly recommended.

>caption Using FileSelect

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

In Blazor **Server** apps, the FileSelect uses the **SignalR WebSocket** to send files from the browser to the server .NET runtime. The default SignalR maximum message size is **32 KB**. To work with larger files, [increase the max WebSocket message size for the Blazor application]({%slug common-kb-increase-signalr-max-message-size%}).

>tip The maximum file size supported by the framework up till .NET 5 was 2 GB and .NET 6 [removed this limit](https://github.com/dotnet/aspnetcore/pull/33900). While [Telerik UI for Blazor supports .NET version 3.1]({%slug system-requirements%}), the FileSelect component will allow maximum file size of 2 GB.


## Validation

The FileSelect includes [built-in client-side validation]({%slug fileselect-validation%}) for the file size and type (extension). Additional custom validation can take place in the [OnSelect event]({%slug fileselect-events%}#onselect).

## Templates

You can use the functionality of the built-in template and modify the appearance of the **Select files...** button. [Read more about the Telerik FileSelect templates...]({%slug fileselect-templates%})

## FileSelect Parameters

The following table lists the FileSelect parameters. Also check the [FileSelect API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikFileSelect) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Accept` | `string` | The [`accept` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) of the file `<input>`. It controls what file types and MIME types the browser will allow users to select. Compare with `AllowedExtensions`. |
| `AllowedExtensions` | `List<string>` | The list of allowed file types. The component will check if the selected files are compliant **after selection**. Compare with `Accept`. Read more at [Validation]({%slug fileselect-validation%}). |
| `Capture` | `string` | The [`capture` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture) of the `<input type="file" />` element. It enables users to provide a file directly from their device camera. |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-upload">` element. (The FileSelect reuses the Upload HTML rendering.) |
| `Enabled` | `bool`<br />(`true`) | Enables file selection. |
| `Id` | `string` | Renders an `id` attribute to the `<input type="file" />` element. Can be used together with a `<label>`. |
| `MinFileSize` | `int?` | Sets the minimum allowed file size in bytes. Read more at [Validation]({%slug fileselect-validation%}). |
| `MaxFileSize`| `int?` | Sets the maximum allowed file size in bytes. Read more at [Validation]({%slug fileselect-validation%}). |
| `Multiple` | `bool`<br />(`true`) | Sets if the user can select several files at the same time. |


## Next Steps

* [Explore FileSelect Validation]({%slug fileselect-validation%})
* [Use FileSelect Events]({%slug fileselect-events%})


## See Also

* [FileSelect API](/blazor-ui/api/Telerik.Blazor.Components.TelerikFileSelect)
* [Live Demo: FileSelect](https://demos.telerik.com/blazor-ui/fileselect/overview)
