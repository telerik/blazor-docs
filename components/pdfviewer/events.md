---
title: Events
page_title: Events | PdfViewer for Blazor
description: Events of the PDF Viewer for Blazor.
slug: pdfviewer-events
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 5
---

# PdfViewer Events

This article describes the Blazor PDF Viewer events.

* [`OnDownload`](#ondownload)
* [`OnOpen`](#onopen)


## OnDownload

The `OnDownload` event fires when the user clicks on the Download button in the PDF Viewer toolbar.

The event handler receives an argument of type [`PdfViewerDownloadEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerDownloadEventArgs). The event is cancellable and allows the application to set a name of the downloaded file. See [example below](#example).


## OnOpen

The `OnOpen` event fires when the user selects a file to open, after clicking on the Open button in the PDF Viewer toolbar.

The event handler receives an argument of type [`PdfViewerOpenEventArgs`](/blazor-ui/api/Telerik.Blazor.Components.PdfViewerOpenEventArgs). The event is cancellable and allows the application to obtain the PDF file name, size and contents as a `Stream`. See [example below](#example).


## Example

>caption Handle Blazor PDF Viewer Events

````CSHTML
<p> Opened file @PdfName with size @PdfSize.ToString() bytes. </p>

<TelerikPdfViewer @ref="@PdfViewerRef"
                  FileData="@PdfSource"
                  OnDownload="@OnPdfDownload"
                  OnOpen="@OnPdfOpen">
</TelerikPdfViewer>

@code {
    private TelerikPdfViewer PdfViewerRef { get; set; }

    private byte[] PdfSource { get; set; }

    private string PdfName { get; set; } = "...";

    private long PdfSize { get; set; }

    private async Task OnPdfDownload(PdfViewerDownloadEventArgs args)
    {
        //args.IsCancelled = true;

        args.FileName = "PDF-Viewer-" + DateTime.Now.Millisecond;
    }

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        //args.IsCancelled = true;

        var file = args.Files.FirstOrDefault();

        PdfName = file.Name;
        PdfSize = file.Size;

        var buffer = new byte[file.Stream.Length];
        await file.Stream.ReadAsync(buffer);

        PdfSource = buffer;
        PdfViewerRef.LoadFile(PdfSource);
    }
}
````


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
