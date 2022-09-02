---
title: Events
page_title: PdfViewer - Events
description: Events of the PDF Viewer for Blazor.
slug: pdfviewer-events
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 20
---

# PdfViewer Events

This article describes the Blazor PDF Viewer events and provides a runnable example with sample event handler implementations.

* [`OnDownload`](#ondownload)
* [`OnError`](#onerror)
* [`OnOpen`](#onopen)


## OnDownload

The `OnDownload` event fires when the user clicks on the Download button in the [PDF Viewer toolbar]({%slug pdfviewer-toolbar%}).

The event handler receives an argument of type [`PdfViewerDownloadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerDownloadEventArgs). The event is cancellable and allows the application to set a name of the downloaded file. Do not add the `.pdf` file extension - the component will do that. The default name of the downloaded file is `Document.pdf`. See the [example below](#example).


## OnError

The `OnError` event fires when a file error occurs. For example, the user tries to open a corrupt file or a file that is not in the correct format.

The event handler receives an argument of type [`PdfViewerErrorEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerErrorEventArgs), which exposes a `Message` property. See the [example below](#example).


## OnOpen

The `OnOpen` event fires when the user selects a file to open from the [PDF Viewer toolbar]({%slug pdfviewer-toolbar%}).

The event handler receives an argument of type [`PdfViewerOpenEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerOpenEventArgs). The event is cancellable and allows the application to obtain the PDF file name, size and contents as a `Stream`. See the [example below](#example).


## Example

>caption Handle or cancel Blazor PDF Viewer Events

````CSHTML
<p> Last opened file by the user: @PdfName, with size @PdfSize.ToString() bytes.</p>

<p> Last event: @EventLog </p>

<TelerikPdfViewer Data="@PdfSource"
                  OnDownload="@OnPdfDownload"
                  OnError="@OnPdfError"
                  OnOpen="@OnPdfOpen"
                  Height="600px">
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }

    private string PdfName { get; set; } = "...";

    private long PdfSize { get; set; }

    private string EventLog { get; set; } = "...";

    private async Task OnPdfDownload(PdfViewerDownloadEventArgs args)
    {
        //args.IsCancelled = true;
        args.FileName = "PDF-Viewer-Download";
        EventLog = "Download successful.";
    }

    private async Task OnPdfError(PdfViewerErrorEventArgs args)
    {
        // Rename a random non-PDF file to error.pdf and try to open it.
        EventLog = "Open failed. The Error message was: " + args.Message;
    }

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        var file = args.Files.FirstOrDefault();

        if (file.Size > 1_000_000)
        {
            args.IsCancelled = true;
            EventLog = "Open rejected. File too large.";
        }
        else
        {
            PdfName = file.Name;
            PdfSize = file.Size;

            // Get the PDF file contents if necessary.
            // It is not necessary to set the Data parameter value here.
            var buffer = new byte[file.Stream.Length];
            await file.Stream.ReadAsync(buffer);

            EventLog = "Open successful.";
        }
    }
}
````


## Next Steps

* [Customize the PDF Viewer toolbar]({%slug pdfviewer-toolbar%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
