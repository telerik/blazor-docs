---
title: Events
page_title: ImageEditor Events
description: The article describes the Telerik Blazor ImageEditor component events and event arguments.
slug: imageeditor-events
tags: telerik,blazor,imageeditor,events
components: ["imageeditor"]
published: True
position: 100
---

# ImageEditor Events

This article describes the available events in the Telerik [ImageEditor for Blazor](slug:imageeditor-overview):

* [`OnError`](#onerror)
* [`OnExecute`](#onexecute)
* [`OnExport`](#onexport)
* [`OnOpen`](#onopen)

## OnError

The ImageEditor `OnError` event fires when the component fails to load, edit, render, or export the image. The event handler receives an argument of type `ImageEditorError` that exposes the following property:

* `Message` (`string`)&mdash;the reason the operation failed.

The component displays an [error state](slug:imageeditor-loading-images#error-state) when a file fails to load, so handling `OnError` is not required.

Also see the [runnable example below](#example).

>caption Using the ImageEditor OnError event

````RAZOR.skip-repl
<TelerikImageEditor OnError="@OnImageEditorError" />

@code {
    private void OnImageEditorError(ImageEditorError args)
    {
        Console.WriteLine(args.Message);
    }
}
````

## OnExecute

The ImageEditor `OnExecute` event fires after the component applies, undoes, or redoes an edit. The edit can come from a [built-in tool](slug:imageeditor-tools) or from the [`ExecuteAsync` method](slug:imageeditor-commands). The event is not cancellable.

Zoom, pan, and live previews do not fire the event. For example, a slider that the user is still dragging does not fire `OnExecute`, and the component raises the event once when the drag completes.

The event handler receives an argument of type `ImageEditorExecuteEventArgs` that exposes the following properties:

* `Command` (`ImageEditorCommand`)&mdash;the executed command.
* `Reason` (`ImageEditorExecuteReason`)&mdash;`Execute`, `Undo`, or `Redo`. On undo and redo, the event describes the edit that the component reverted or reapplied.
* `Args` (`ImageEditorCommandArgs`)&mdash;the command arguments. Cast them to the class that the [command reference](slug:imageeditor-commands#command-reference) lists for the command. The value is `null` for commands without arguments.

Also see the [runnable example below](#example).

>caption Using the ImageEditor OnExecute event

````RAZOR.skip-repl
<TelerikImageEditor OnExecute="@OnImageEditorExecute" />

@code {
    private void OnImageEditorExecute(ImageEditorExecuteEventArgs args)
    {
        if (args.Command == ImageEditorCommand.ApplyFilter && args.Args is ImageEditorFilterArgs filterArgs)
        {
            Console.WriteLine($"{args.Reason}: {filterArgs.Filter}");
        }
    }
}
````

## OnExport

The ImageEditor `OnExport` event fires before the edited image downloads. The event is cancellable and in this case the browser does not download the file.

The event handler receives an argument of type `ImageEditorExportEventArgs` that exposes the following properties:

* `FileName` (`string`)&mdash;the name of the downloaded file. Set the property to rename the file.
* `Format` (`string`)&mdash;the MIME type of the export.
* `IsCancelled` (`bool`)&mdash;set the property to `true` to prevent the download.

Also see the [runnable example below](#example).

>caption Using the ImageEditor OnExport event

````RAZOR.skip-repl
<TelerikImageEditor OnExport="@OnImageEditorExport" />

@code {
    private void OnImageEditorExport(ImageEditorExportEventArgs args)
    {
        args.FileName = $"edited-{DateTime.Now:yyyy-MM-dd}";

        //args.IsCancelled = true;
    }
}
````

## OnOpen

The ImageEditor `OnOpen` event fires before the component opens an image from a selected file, from the `Data` parameter, or from the `ImageUrl` parameter. The event is cancellable and in this case the currently open image, if any, stays in the editor.

`OnOpen` always fires before any `OnExecute` event for the same image.

The event handler receives an argument of type `ImageEditorOpenEventArgs` that exposes the following properties:

* `FileName` (`string`)&mdash;the name of the file, for example, `"photo.png"`. The value is `"image"` when the image comes from `Data`, and the last segment of the URL when the image comes from `ImageUrl`.
* `Extension` (`string`)&mdash;the lowercase file extension, including the dot, for example, `".png"`. The value is `null` when the file name has no extension.
* `FileSize` (`long?`)&mdash;the file size in bytes. The value is `null` when the image loads from `ImageUrl`.
* `Width` (`int`)&mdash;the width of the image in pixels.
* `Height` (`int`)&mdash;the height of the image in pixels.
* `IsCancelled` (`bool`)&mdash;set the property to `true` to prevent the component from opening the image.

Also see the [runnable example below](#example).

>caption Using the ImageEditor OnOpen event

````RAZOR.skip-repl
<TelerikImageEditor OnOpen="@OnImageEditorOpen" />

@code {
    private void OnImageEditorOpen(ImageEditorOpenEventArgs args)
    {
        if (args.Width > 8000 || args.Height > 8000)
        {
            args.IsCancelled = true;
        }
    }
}
````

## Example

The following example handles all ImageEditor events. Open an image from your device to see the event log.

>caption Using the ImageEditor events

<demo metaUrl="client/imageeditor/events/" height="800"></demo>

## Next Steps

* [Explore the ImageEditor tools](slug:imageeditor-tools)
* [Edit images programmatically](slug:imageeditor-commands)

## See Also

* [Live Demo: ImageEditor](https://demos.telerik.com/blazor-ui/imageeditor/overview)
* [ImageEditor API Reference](slug:Telerik.Blazor.Components.TelerikImageEditor)
