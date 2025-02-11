---
title: Events
page_title: PdfViewer - Events
description: Events of the PDF Viewer for Blazor. How to handle events when users download, open or zoom PDF documents.
slug: pdfviewer-events
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 20
---

# PdfViewer Events

This article describes the [Blazor PDF Viewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview) events and provides a runnable example with sample event handler implementations.

* [`OnDownload`](#ondownload)
* [`OnError`](#onerror)
* [`OnOpen`](#onopen)
* [`ZoomChanged`](#zoomchanged)


## OnDownload

The `OnDownload` event fires when the user clicks on the Download button in the [PDF Viewer toolbar](slug:pdfviewer-toolbar).

The event handler receives an argument of type [`PdfViewerDownloadEventArgs`](slug:Telerik.Blazor.Components.PdfViewerDownloadEventArgs). The event is cancellable and allows the application to set a name of the downloaded file. Do not add the `.pdf` file extension - the component will do that. The default name of the downloaded file is `Document.pdf`. See the [example below](#example).


## OnError

The `OnError` event fires when a file error occurs. For example, the user tries to open a corrupt file or a file that is not in the correct format.

The event handler receives an argument of type [`PdfViewerErrorEventArgs`](slug:Telerik.Blazor.Components.PdfViewerErrorEventArgs), which exposes a `Message` property. See the [example below](#example).


## OnOpen

The `OnOpen` event fires when the user selects a file to open from the [PDF Viewer toolbar](slug:pdfviewer-toolbar).

The event handler receives an argument of type [`PdfViewerOpenEventArgs`](slug:Telerik.Blazor.Components.PdfViewerOpenEventArgs). The event is cancellable and allows the application to obtain the PDF file name, size and contents as a `Stream`. To read the `Stream`, you may need to [increase the maximum SignalR message size](slug:pdfviewer-overview#large-file-support).

Using `OnOpen` is *not* required. Users can open local files from their devices without this handler. See the [example below](#example).


## ZoomChanged

The `ZoomChanged` event fires when the user clicks on the zoom in/out buttons, or selects a new zoom level from the ComboBox.

The event handler receives the new zoom level as an argument of type `decimal`. To apply the new zoom level, set it as a new `Zoom` parameter value. Not setting it will effectively cancel the event.


## Example

>caption Handle or cancel Blazor PDF Viewer Events

````RAZOR
<p> Last event: @EventLog </p>

<p><label> <TelerikCheckBox @bind-Value="@AllowDownloads" /> Allow Downloads </label></p>

<TelerikPdfViewer Data="@PdfSource"
                  Height="600px"
                  OnDownload="@OnPdfDownload"
                  OnError="@OnPdfError"
                  OnOpen="@OnPdfOpen"
                  Zoom="@PdfZoom"
                  ZoomChanged="@OnPdfZoomChanged">
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }

    private decimal PdfZoom { get; set; } = 1.25m;

    private bool AllowDownloads { get; set; } = true;

    private string EventLog { get; set; } = "...";

    private async Task OnPdfDownload(PdfViewerDownloadEventArgs args)
    {
        if (AllowDownloads)
        {
            args.FileName = "PDF-Viewer-Download";
            EventLog = $"Download {args.FileName}.pdf";
        }
        else
        {
            args.IsCancelled = true;
            EventLog = $"Download cancelled";
        }
    }

    private async Task OnPdfError(PdfViewerErrorEventArgs args)
    {
        // To trigger the event, rename a random file to error.pdf and try to open it.
        EventLog = "Error: " + args.Message;
    }

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        var file = args.Files.FirstOrDefault();

        if (file.Size > 1024 * 1024)
        {
            args.IsCancelled = true;
            EventLog = $"Open cancelled conditionally. File {file.Name} ({file.Size} bytes) is larger than 1 MB.";
        }
        else
        {
            // Get the PDF file contents if necessary.
            var buffer = new byte[file.Stream.Length];
            await file.Stream.ReadAsync(buffer);

            EventLog = $"Open {file.Name}, {file.Size} bytes";
        }
    }

    private async Task OnPdfZoomChanged(decimal newZoom)
    {
        PdfZoom = newZoom;

        EventLog = "Zoom level changed.";
    }
}
````


## Next Steps

* [Customize the PDF Viewer toolbar](slug:pdfviewer-toolbar)


## See Also

* [PdfViewer Events Demo](https://demos.telerik.com/blazor-ui/pdfviewer/events)
* [PdfViewer API](slug:Telerik.Blazor.Components.TelerikPdfViewer)
