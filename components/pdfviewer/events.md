---
title: Events
page_title: Events | PdfViewer for Blazor
description: Events of the PDF Viewer for Blazor.
slug: pdfviewer-events
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 50
---

# PdfViewer Events

This article describes the Blazor PDF Viewer events.

* [`OnDownload`](#ondownload)
* [`OnOpen`](#onopen)


## OnDownload

The `OnDownload` event fires when the user clicks on the Download button in the [PDF Viewer toolbar]({%slug pdfviewer-toolbar%}).

The event handler receives an argument of type [`PdfViewerDownloadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerDownloadEventArgs). The event is cancellable and allows the application to set a name of the downloaded file. See the [example below](#example).


## OnOpen

The `OnOpen` event fires when the user selects a file to open from the [PDF Viewer toolbar]({%slug pdfviewer-toolbar%}).

The event handler receives an argument of type [`PdfViewerOpenEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerOpenEventArgs). The event is cancellable and allows the application to obtain the PDF file name, size and contents as a `Stream`. See the [example below](#example).


## Example

>caption Handle Blazor PDF Viewer Events

````CSHTML
<p> Last opened file by the user: @PdfName, with size @PdfSize.ToString() bytes.</p>

<p> Last event: @EventLog </p>

<TelerikPdfViewer Data="@PdfSource"
                  OnDownload="@OnPdfDownload"
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

            var buffer = new byte[file.Stream.Length];
            await file.Stream.ReadAsync(buffer);
            PdfSource = buffer;

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
