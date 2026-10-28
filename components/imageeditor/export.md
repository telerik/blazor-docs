---
title: Export
page_title: ImageEditor - Export
description: Learn how users download the edited image from the Telerik Blazor ImageEditor and how the application obtains the result as a byte array.
slug: imageeditor-export
tags: telerik,blazor,imageeditor,export,download,save
published: True
position: 20
components: ["imageeditor"]
---

# Blazor ImageEditor Export

The [ImageEditor](slug:imageeditor-overview) produces the edited image in two ways:

* The user downloads the image from the [export dialog](#export-dialog).
* The application obtains the image as a `byte[]` through the [`GetFileAsync` method](#get-the-edited-image-in-the-application).

## Export Dialog

The Export tool in the [component toolbar](slug:imageeditor-tools#toolbar) opens a dialog that allows the user to:

* Set the file name.
* Select the export format.
* Review a preview of the result and the resulting file size.

The dialog detects transparency in the image and selects PNG by default.

The following table lists the supported export formats, which are also the members of the `ImageEditorExportFormat` enum.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Format | Enum Member | Transparency |
| --- | --- | --- |
| PNG | `Png` | Supported |
| JPEG | `Jpeg` | Not supported |
| WebP | `Webp` | Supported |

## Configure the Export from Code

Use the [`ExecuteAsync` method](slug:imageeditor-commands) to set the export format, the export quality, and the file name before the user opens the export dialog.

>caption Configure the export settings programmatically

````RAZOR.skip-repl
<TelerikImageEditor @ref="@ImageEditorRef" ImageUrl="images/sample-photo.jpg" />

@code {
    private TelerikImageEditor? ImageEditorRef { get; set; }

    private async Task SetExportSettings()
    {
        await ImageEditorRef!.ExecuteAsync(ImageEditorCommand.SetExportSettings,
            new ImageEditorExportSettingsArgs()
            {
                Format = ImageEditorExportFormat.Jpeg,
                Quality = 0.9,
                FileName = "product-photo"
            });
    }
}
````

## Rename or Cancel the Download

The [`OnExport` event](slug:imageeditor-events#onexport) fires before the browser downloads the file. Use the event to change the file name or to cancel the download, for example, when the user does not have the required permissions.

>caption Change the name of the downloaded file

````RAZOR.skip-repl
<TelerikImageEditor ImageUrl="images/sample-photo.jpg" OnExport="@OnImageEditorExport" />

@code {
    private void OnImageEditorExport(ImageEditorExportEventArgs args)
    {
        args.FileName = $"edited-{DateTime.Now:yyyy-MM-dd}";
    }
}
````

## Get the Edited Image in the Application

The `GetFileAsync` method returns the edited image as a `Task<byte[]>` in the current export format. Use it to save the result to a database, or to upload it to a remote service. The method returns `null` when no image is loaded.

>caption Obtain the edited image as a byte array

````RAZOR.skip-repl
<TelerikButton OnClick="@OnSaveButtonClick" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Save Image
</TelerikButton>

<TelerikImageEditor @ref="@ImageEditorRef"
                    ImageUrl="images/sample-photo.jpg"
                    Width="100%"
                    Height="600px" />

@code {
    private TelerikImageEditor? ImageEditorRef { get; set; }

    private async Task OnSaveButtonClick()
    {
        byte[]? imageBytes = await ImageEditorRef!.GetFileAsync();

        if (imageBytes != null)
        {
            // Save the image to a database or a file storage.
        }
    }
}
````

### Blazor Server Apps and Large Images

In [Blazor Server](slug:getting-started/web-app) apps, `GetFileAsync` transfers the image from the browser to the .NET runtime over the SignalR WebSocket. The default maximum message size is 32 KB. To work with larger images, [increase the maximum SignalR message size](slug:common-kb-increase-signalr-max-message-size).

All other ImageEditor operations run in the browser and do not transfer the image to the server. See [Client-Side Image Processing](slug:imageeditor-overview#client-side-image-processing).

### Blazor WebAssembly Apps

In [Blazor WebAssembly](slug:getting-started/web-app) apps, `GetFileAsync` returns the image without a network transfer, because the .NET runtime and the browser share the same process.

## Next Steps

* [Handle the ImageEditor events](slug:imageeditor-events)
* [Edit images programmatically](slug:imageeditor-commands)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
