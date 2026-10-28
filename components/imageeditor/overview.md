---
title: Overview
page_title: ImageEditor - Overview
description: The Blazor ImageEditor component lets users open an image, crop, resize, rotate, retouch, annotate it in the browser, and download the result.
slug: imageeditor-overview
tags: telerik,blazor,imageeditor,image,editor
published: True
position: 0
components: ["imageeditor"]
---

# Blazor ImageEditor Overview

The [Blazor ImageEditor component](https://www.telerik.com/blazor-ui/imageeditor) allows users to open an image, edit it directly in the browser, and download the result. The component covers geometry edits such as crop, resize, rotate, and flip, color edits such as filters and adjustments, privacy edits such as blur and pixelate, and decoration such as text, shapes, frames, and shadows. Every edit supports undo and redo.

## Creating Blazor ImageEditor

To use the Telerik ImageEditor for Blazor:

1. Add the `TelerikImageEditor` tag.
1. Set the `Data` parameter to a `byte[]` that holds the image, or set the `ImageUrl` parameter to the image address. If you set neither parameter, the component displays an empty state where users can [open a file from their device](slug:imageeditor-loading-images#let-users-open-a-file).
1. Set the `Width` and `Height` parameters to size the component on the page. The default height is `600px`.
1. (optional) Restrict the files that users can open through the `<ImageEditorFileSelectSettings>` tag inside `<ImageEditorSettings>`.
1. (optional) Handle the [ImageEditor events](slug:imageeditor-events) to track what the user opens, edits, and exports.

>caption Basic Blazor ImageEditor

````RAZOR
<TelerikImageEditor Width="100%"
                    Height="600px"
                    OnOpen="@OnImageEditorOpen"
                    OnExecute="@OnImageEditorExecute">
    <ImageEditorSettings>
        <ImageEditorFileSelectSettings AllowedExtensions="@AllowedExtensions"
                                       MaxFileSize="10485760" />
    </ImageEditorSettings>
</TelerikImageEditor>

<p>Last edit: @LastEdit</p>

@code {
    private List<string> AllowedExtensions { get; set; } = new List<string>() { ".jpg", ".jpeg", ".png" };

    private string LastEdit { get; set; } = "None";

    private void OnImageEditorOpen(ImageEditorOpenEventArgs args)
    {
        LastEdit = $"Opened {args.FileName} ({args.Width} x {args.Height} px)";
    }

    private void OnImageEditorExecute(ImageEditorExecuteEventArgs args)
    {
        LastEdit = $"{args.Reason}: {args.Command}";
    }
}
````

## Client-Side Image Processing

The ImageEditor performs all image processing in the browser. The image data does not travel to the .NET runtime, so Blazor Server and Blazor WebAssembly apps behave in the same way, and large images do not load the SignalR connection.

The component moves the heavy pixel passes&mdash;filters, color adjustments, blur, and pixelate&mdash;to a pool of Web Workers, so that sliders and canvas gestures stay responsive. The worker script is part of `telerik-blazor.js` and starts from a Blob URL, so there is no additional file to deploy. If the app uses a Content Security Policy, allow `worker-src 'self' blob:`. When workers are not available, the ImageEditor runs the same passes on the main thread and produces identical results without an error.

## Loading Images

The ImageEditor can load an image from a `byte[]`, from a URL, or from a file that the user selects on their device. You can also restrict the allowed file extensions and the maximum file size. Learn more about [loading images in the ImageEditor](slug:imageeditor-loading-images).

## Editing Tools

The component sidebar provides tools for resizing, cropping, rotating, adding text and shapes, blurring areas, adjusting colors, applying filters, and adding a frame or a shadow. Each tool opens its own pane with the related options. See the full list of [ImageEditor tools and their options](slug:imageeditor-tools).

## Objects

Text boxes, shapes, and blur areas are objects on the canvas. Users can select, move, resize, duplicate, flip, align, reorder, and delete them. Read more about [working with ImageEditor objects](slug:imageeditor-tools#objects).

## Programmatic Editing

The `ExecuteAsync` method runs any editor command from the application code and adds the result to the undo history. Use it to apply presets, to build a custom toolbar, or to automate repeated edits. See the complete list of [ImageEditor commands and their arguments](slug:imageeditor-commands).

## Export

Users can download the edited image as JPEG, PNG, or WebP from an export dialog that shows a preview and the resulting file size. The application can also obtain the edited image as a `byte[]` and store it on the server. Learn more about [exporting from the ImageEditor](slug:imageeditor-export).

## Events

The ImageEditor fires a single `OnExecute` event for every applied, undone, or redone edit, together with `OnOpen`, `OnExport`, and `OnError`. Find out more about the [ImageEditor events and event arguments](slug:imageeditor-events).

## More ImageEditor Features

* [Keyboard navigation](slug:imageeditor-keyboard-navigation)&mdash;the toolbar, the sidebar, the tool panes, and the canvas objects are operable with the keyboard.
* [Adaptive rendering](slug:adaptive-rendering)&mdash;set `AdaptiveMode` to `Auto` to dock the tool pane and the sidebar at the bottom on small screens.
* [Localization](slug:globalization-localization)&mdash;all component texts come from the localization resources.
* [Dimensions](slug:common-features/dimensions)&mdash;the `Width` and `Height` parameters accept any valid CSS unit.

## ImageEditor API

Get familiar with all ImageEditor parameters, methods, and events in the [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor).

## ImageEditor Reference and Methods

The Blazor ImageEditor component exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. Blazor populates component references in `OnAfterRenderAsync`, so they are not available earlier.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `ExecuteAsync` | Runs an [editor command](slug:imageeditor-commands) and adds the edit to the undo history. The method has an overload that accepts a command without arguments. |
| `GetFileAsync` | Returns the edited image as a `Task<byte[]>` in the current export format. Returns `null` when no image is loaded. |

>caption Obtain a reference to the ImageEditor instance and execute methods

````RAZOR.skip-repl
<TelerikButton OnClick="@OnSepiaButtonClick">Apply Sepia</TelerikButton>

<TelerikImageEditor @ref="@ImageEditorRef" ImageUrl="images/sample-photo.jpg" />

@code {
    private TelerikImageEditor? ImageEditorRef { get; set; }

    private async Task OnSepiaButtonClick()
    {
        await ImageEditorRef!.ExecuteAsync(ImageEditorCommand.ApplyFilter,
            new ImageEditorFilterArgs() { Filter = ImageEditorFilter.Sepia });
    }
}
````

## Next Steps

* [Load images in the ImageEditor](slug:imageeditor-loading-images)
* [Explore the ImageEditor tools](slug:imageeditor-tools)
* [Edit images programmatically](slug:imageeditor-commands)
* [Export the edited image](slug:imageeditor-export)
* [Handle the ImageEditor events](slug:imageeditor-events)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
