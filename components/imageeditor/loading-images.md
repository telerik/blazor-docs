---
title: Loading Images
page_title: ImageEditor - Loading Images
description: Learn how to load an image in the Telerik Blazor ImageEditor from a byte array, from a URL, or from a file that the user selects, and how to restrict the allowed files.
slug: imageeditor-loading-images
tags: telerik,blazor,imageeditor,image,load,url,data
published: True
position: 5
components: ["imageeditor"]
---

# Loading Images in the Blazor ImageEditor

The [ImageEditor](slug:imageeditor-overview) can display an image from three sources:

* [A `byte[]` in the application](#load-image-from-byte-array)
* [A URL](#load-image-from-url)
* [A file that the user selects on their device](#let-users-open-a-file)

`Data` takes precedence over `ImageUrl`. If both parameters have a value, the component displays `Data`.

The component also allows you to [restrict the files that users can open](#file-restrictions) and shows an [error state](#error-state) when a file fails to load.

## Load Image from Byte Array

Set the `Data` parameter to a `byte[]` that holds the image content. To load another image, assign a new array instance to the parameter. To clear the editor, set `Data` to `null` or to an empty array.

This example runs in a server-side component and reads a file from the server's `wwwroot` folder. In Blazor WebAssembly, fetch the image bytes with a configured `HttpClient` and its `GetByteArrayAsync` method instead.

>caption Load an image from a byte array in a server-side component

````RAZOR.skip-repl
@inject IWebHostEnvironment HostEnvironment

<TelerikImageEditor Data="@ImageEditorData" Width="100%" Height="600px" />

@code {
    private byte[]? ImageEditorData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        string imagePath = Path.Combine(HostEnvironment.WebRootPath, "images", "sample-photo.jpg");

        ImageEditorData = await File.ReadAllBytesAsync(imagePath);
    }
}
````

### Blazor Server Apps and Large Images

In [Blazor Server](slug:getting-started/web-app) apps, the `Data` parameter transfers the image from the .NET runtime to the browser over the SignalR WebSocket. This is an outgoing transfer from the server, so the `MaximumReceiveMessageSize` setting does not limit it, because that setting limits only the messages that the server receives.

After the ImageEditor loads the image, all editing operations run in the browser and do not transfer the image to the server. See [Client-Side Image Processing](slug:imageeditor-overview#client-side-image-processing).

For the browser-to-server transfer that `MaximumReceiveMessageSize` does limit, such as obtaining the edited image with `GetFileAsync`, see [Blazor Server Apps and Large Images](slug:imageeditor-export#blazor-server-apps-and-large-images) in the Export article.

## Load Image from URL

Set the `ImageUrl` parameter to the address of the image. The component uses `ImageUrl` only when `Data` is `null` or empty.

The ImageEditor reads the image pixels on the client. Images from another origin must allow cross-origin requests, otherwise the browser blocks the operation and the component fires [`OnError`](slug:imageeditor-events#onerror).

>caption Load an image from a URL

````RAZOR.skip-repl
<TelerikImageEditor ImageUrl="@ImageEditorUrl" Width="100%" Height="600px" />

@code {
    private string ImageEditorUrl { get; set; } = "images/sample-photo.jpg";
}
````

## Let Users Open a File

When no image is loaded, the ImageEditor displays an empty state with a button that opens a file dialog. Users can also open another image at any time from the Open tool in the [component toolbar](slug:imageeditor-tools#toolbar), or with the `Ctrl` + `O` [keyboard shortcut](slug:imageeditor-keyboard-navigation).

The component processes the selected file in the browser and fires [`OnOpen`](slug:imageeditor-events#onopen) before it displays the image. Use the event to inspect the file name, extension, size, and pixel dimensions, or to cancel the operation.

### File Restrictions

Configure the allowed files through the `<ImageEditorFileSelectSettings>` tag inside the `<ImageEditorSettings>` tag. The ImageEditor builds the supported-formats text in the empty state and in the [error state](#error-state) from the allowed extensions.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AllowedExtensions` | `List<string>` <br /> (`.jpg`, `.jpeg`, `.png`, `.webp`) | The file extensions that users can open. Include the leading dot, for example, `".png"`. |
| `MaxFileSize` | `long?` <br /> (`20971520`) | The maximum file size in bytes. The default value is 20 MB. A much larger value can degrade the component performance, because the editor processes the full image in the browser. |

>caption Restrict the files that users can open

````RAZOR.skip-repl
<TelerikImageEditor Width="100%" Height="600px">
    <ImageEditorSettings>
        <ImageEditorFileSelectSettings AllowedExtensions="@AllowedExtensions"
                                       MaxFileSize="@(5 * 1024 * 1024)" />
    </ImageEditorSettings>
</TelerikImageEditor>

@code {
    private List<string> AllowedExtensions { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png" };
}
````

## Error State

The ImageEditor displays an error state when the file does not match the [file restrictions](#file-restrictions) or when the image fails to load. The error state lists the supported formats and allows the user to select another file.

The component also fires the [`OnError`](slug:imageeditor-events#onerror) event, so that the application can log the reason or show a [Notification](slug:notification-overview).

## Next Steps

* [Explore the ImageEditor tools](slug:imageeditor-tools)
* [Export the edited image](slug:imageeditor-export)
* [Handle the ImageEditor events](slug:imageeditor-events)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
