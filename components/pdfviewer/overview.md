---
title: Overview
page_title: PdfViewer - Overview
description: Overview of the PDF Viewer for Blazor.
slug: pdfviewer-overview
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 0
---

# Blazor PdfViewer Overview

The <a href = "https://www.telerik.com/blazor-ui/pdfviewer" target="_blank">Pdf Viewer for Blazor</a> allows users to open PDF files directly in the browser. The component provides features such as paging, zooming, printing, text selection and search. In addition, users can upload and display a PDF file from their local device, or download the currently open file.


## Creating Blazor PdfViewer

To use a Telerik PDF Viewer for Blazor:

1. Add the `TelerikPdfViewer` tag.
1. Set the `Data` parameter to a byte array `byte[]` that will hold the PDF file contents.
1. If you are developing a Blazor **Server** app, [increase the maximum SignalR message size](#large-file-support).
1. (optional) Subscribe to the [PDF Viewer's events]({%slug pdfviewer-events%}). For example, use the `OnDownload` event to set the name of the downloaded file.
1. (optional) Set [`Width` or `Height`](#pdfviewer-parameters) for the component.

>caption Basic Blazor PDF Viewer

````CSHTML
<TelerikPdfViewer Data="@PdfSource"
                  OnDownload="@OnPdfDownload"
                  Height="600px">
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }

    private async Task OnPdfDownload(PdfViewerDownloadEventArgs args)
    {
        args.FileName = "PDF-Viewer-Download";
    }

    protected override void OnInitialized()
    {
        PdfSource = Convert.FromBase64String(PdfBase64);

        base.OnInitialized();
    }

    private string PdfBase64 { get; set; } = @"JVBERi0xLjEKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDEvTWVkaWFCb3ggWy00MCAtNjQgMjYwIDgwXSA+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjE8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9BcmlhbD4+ID4+ID4+L0NvbnRlbnRzIDQgMCBSPj5lbmRvYmoKNCAwIG9iajw8L0xlbmd0aCA1OT4+CnN0cmVhbQpCVAovRjEgMTggVGYKMCAwIFRkCihUZWxlcmlrIFBkZlZpZXdlciBmb3IgQmxhem9yKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZgowMDAwMDAwMDIxIDAwMDAwIG4KMDAwMDAwMDA4NiAwMDAwMCBuCjAwMDAwMDAxOTUgMDAwMDAgbgowMDAwMDAwNDkwIDAwMDAwIG4KdHJhaWxlciA8PCAgL1Jvb3QgMSAwIFIgL1NpemUgNSA+PgpzdGFydHhyZWYKNjA5CiUlRU9G";
}
````


## Toolbar

The [PdfViewer toolbar can render built-in and custom tools]({%slug pdfviewer-toolbar%}). The default tools are related to the built-in features such as:

* Paging
* Zoom
* Text selection
* Pan
* Search
* Open and download
* Print


## Large File Support

The PDF Viewer uses a [FileSelect component]({%slug fileselect-overview%}) to open files from the user device. In Blazor **Server** apps, the FileSelect uses the **SignalR WebSocket**, which has a default maximum message size of **32 KB**. To work with larger files, [increase the max WebSocket message size for the Blazor application]({%slug fileselect-overview%}#large-file-support).


## PdfViewer Parameters

The table below lists the PDF Viewer parameters. Also check the [PDF Viewer API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | An additional CSS class for the `<div class="k-pdf-viewer">` element. Use it to [customize the component styles and override the theme]({%slug themes-override%}). |
| `Data` | `byte[]` | The source of the currently displayed PDF file. |
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Determines if the PDF Viewer will show a loading animation during opening or downloading a PDF file. |
| `Height` | `string` | The PdfViewer height as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand vertically, based on the loaded file. `Height` is required for the component paging and scrolling to work. |
| `MaxZoom` | `double` <br /> (`4`) | The largest possible zoom level. The default value is 400%. |
| `MinZoom` | `double` <br /> (`0.5`) | The smallest possible zoom level. The default value is 50%. |
| `Width` | `string` | The PdfViewer width as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand horizontally to fill its parent. |
| `Zoom` | `double` <br /> (`1.25`) | The current zoom level. Use the parameter with two-way binding or with a [`ZoomChanged` event handler]({%slug pdfviewer-events%}#zoomchanged). |
| `ZoomRate` | `double` <br /> (`0.25`) | The zoom level change that is used by the zoom in and zoom out buttons. |


## PdfViewer Reference and Methods

The PdfViewer exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. The PdfViewer methods are:

* `Rebind` - Refreshes the PDF Viewer and ensures it is displaying the latest file `Data`. Use `Rebind()` when changes to the PDF file source can occur behind the scenes and the Blazor framework does not re-render the PDF Viewer automatically.

>caption PDF Viewer reference and Rebind method usage

````CSHTML
<TelerikPdfViewer @ref="@PdfViewerRef"
                  Data="@PdfSource">
    <PdfViewerToolBar>
        <PdfViewerToolBarCustomTool>
            <TelerikButton OnClick="@OnButtonClick" Icon="refresh">Rebind PDF Viewer</TelerikButton>
        </PdfViewerToolBarCustomTool>
    </PdfViewerToolBar>
</TelerikPdfViewer>

@code {
    private TelerikPdfViewer PdfViewerRef { get; set; }

    private async Task OnButtonClick()
    {
        PdfViewerRef.Rebind();
    }

    private byte[] PdfSource
    {
        get
        {
            return System.Text.Encoding.UTF8.GetBytes(
                PdfSourceRaw.Replace("...",
                    PdfUpdateFlag ? "updated at " + DateTime.Now.ToLongTimeString() : "")
            );
        }
    }

    protected override async Task OnInitializedAsync()
    {
        await Task.Delay(1000);

        // PdfUpdateFlag is used in the PdfSource getter to make the document change more obvious
        PdfUpdateFlag = true;

        PdfViewerRef.Rebind();

        await base.OnInitializedAsync();
    }

    private bool PdfUpdateFlag { get; set; }

    private string PdfSourceRaw = @"%PDF-1.1
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1/MediaBox [-30 -64 270 80] >>endobj
3 0 obj<</Type/Page/Parent 2 0 R/Resources<</Font<</F1<</Type/Font/Subtype/Type1/BaseFont/Arial>> >> >>/Contents 4 0 R>>endobj
4 0 obj<</Length 59>>
stream
BT
/F1 18 Tf
0 0 Td
(PDF File ...) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000021 00000 n
0000000086 00000 n
0000000195 00000 n
0000000490 00000 n
trailer <<  /Root 1 0 R /Size 5 >>
startxref
609
%%EOF";
}
````


## Next Steps

* [Customize the PDF Viewer toolbar]({%slug pdfviewer-toolbar%})
* [Handle PDF Viewer events]({%slug pdfviewer-events%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
