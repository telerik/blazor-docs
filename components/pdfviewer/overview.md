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

The <a href = "https://demos.telerik.com/blazor-ui/pdfviewer/overview" target="_blank">Pdf Viewer for Blazor</a> allows users to open PDF files directly in the browser. The component provides features such as paging, zooming, printing, text selection and search. In addition, users can upload and display a PDF file from their local device, or download the currently open file.


## Creating Blazor PdfViewer

To use a Telerik [Blazor PDF Viewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview):

1. Add the `TelerikPdfViewer` tag.
2. Set the `Data` parameter to a byte array (`byte[]`) that holds the PDF file contents.
3. If you are developing a Blazor **Server** app, [increase the maximum SignalR message size](#large-file-support).
4. (optional) Subscribe to the [PDF Viewer's events](slug:pdfviewer-events). For example, use the `OnDownload` event to set the name of the downloaded file.
5. (optional) Set [`Width` or `Height`](#pdfviewer-parameters) for the component.

>caption Basic Blazor PDF Viewer

````RAZOR
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

    private const string PdfBase64 = "JVBERi0xLjEKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDEvTWVkaWFCb3ggWy00MCAtNjQgMjYwIDgwXSA+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjE8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9BcmlhbD4+ID4+ID4+L0NvbnRlbnRzIDQgMCBSPj5lbmRvYmoKNCAwIG9iajw8L0xlbmd0aCA1OT4+CnN0cmVhbQpCVAovRjEgMTggVGYKMCAwIFRkCihUZWxlcmlrIFBkZlZpZXdlciBmb3IgQmxhem9yKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZgowMDAwMDAwMDIxIDAwMDAwIG4KMDAwMDAwMDA4NiAwMDAwMCBuCjAwMDAwMDAxOTUgMDAwMDAgbgowMDAwMDAwNDkwIDAwMDAwIG4KdHJhaWxlciA8PCAgL1Jvb3QgMSAwIFIgL1NpemUgNSA+PgpzdGFydHhyZWYKNjA5CiUlRU9G";
}
````


## Toolbar

The [PdfViewer toolbar can render built-in and custom tools](slug:pdfviewer-toolbar). The default tools enable built-in features such as:

* Page, zoom and pan documents
* Search and select text
* Print, download and open local PDF files

## Annotations

The PdfViewer provides a built-in option for creating and editing annotations. Explore the [available annotation types and how to work with them](slug:pdfviewer-annotations).

## Large File Support

In Blazor **Server** apps, the PDF Viewer uses the **SignalR WebSocket** to:

* Open PDF files from the server and send them to the browser.
* Read the PDF file `Stream` from the user device in the [`OnOpen` event handler](slug:pdfviewer-events#onopen). The PDF Viewer uses internally a [FileSelect component](slug:fileselect-overview) to get the user file.

The SignalR WebSocket has a default maximum message size of **32 KB**. To work with larger files in the above two scenarios, [increase the max WebSocket message size for the Blazor application](slug:common-kb-increase-signalr-max-message-size).


## PdfViewer Parameters

The table below lists the PDF Viewer parameters. Also check the [PDF Viewer API Reference](slug:Telerik.Blazor.Components.TelerikPdfViewer) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AnnotationMode` | `PdfViewerAnnotationMode` <br /> (`Disable`) | Specifies how the PDFViewer handles [form fields](slug:pdfviewer-form-filling) in the loaded document. |
| `Class` | `string` | An additional CSS class for the `<div class="k-pdf-viewer">` element. Use it to [customize the component styles and override the theme](slug:themes-override). |
| `Data` | `byte[]` | The source of the currently displayed PDF file. |
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Determines if the PDF Viewer will show a loading animation during opening, downloading or zooming a PDF file. |
| `Height` | `string` | The PdfViewer height as a [CSS length value](slug:common-features/dimensions). If not set, the component will expand vertically, based on the loaded file. `Height` is required for the component paging and scrolling to work. |
| `MaxZoom` | `decimal` <br /> (`4m`) | The largest possible zoom level. The default value allows zooming in 4 times (400%). |
| `MinZoom` | `decimal` <br /> (`0.5m`) | The smallest possible zoom level. The default value allows zooming out to 50%. |
| `Width` | `string` | The PdfViewer width as a [CSS length value](slug:common-features/dimensions). If not set, the component will expand horizontally to fill its parent. |
| `Zoom` | `decimal` <br /> (`1.25m`) | The current zoom level. Use the parameter with two-way binding or with a [`ZoomChanged` event handler](slug:pdfviewer-events#zoomchanged). |
| `ZoomRate` | `decimal` <br /> (`0.25m`) | The zoom level change that is used by the zoom in and zoom out buttons. |


## PdfViewer Reference and Methods

The PdfViewer exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Print` | Prints the loaded PDF document as an alternative to the [built-in Print button in the PDF Viewer toolbar](slug:pdfviewer-toolbar#built-in-tools). |
| `Rebind` | Refreshes the PDF Viewer and ensures it is displaying the latest file `Data`. [`Rebind` is necessary when the Blazor framework cannot re-render components automatically](slug:common-features-data-binding-overview#refresh-data). |
| `GetFileAsync` | Asynchronously retrieves the current PDF file data as a byte array, including any annotations or form filling changes. Returns a `Task<byte[]>`. Returns `null` if no document is loaded. |

>caption PDF Viewer reference and method usage

````RAZOR
<TelerikPdfViewer @ref="@PdfViewerRef"
                  Data="@PdfSource">
    <PdfViewerToolBar>
        <PdfViewerToolBarCustomTool>
            <TelerikButton OnClick="@OnButtonClick" Icon="@SvgIcon.ArrowRotateCw">Rebind PDF Viewer</TelerikButton>
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
        PdfSourceRaw = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(PdfBase64));

        await Task.Delay(1000);

        // PdfUpdateFlag is used in the PdfSource getter to make the document change more obvious
        PdfUpdateFlag = true;

        PdfViewerRef.Rebind();

        await base.OnInitializedAsync();
    }

    private bool PdfUpdateFlag { get; set; }

    private string PdfSourceRaw { get; set; }

    private const string PdfBase64 = "JVBERi0xLjEKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDEvTWVkaWFCb3ggWy0zMCAtNjQgMjcwIDgwXSA+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjE8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9BcmlhbD4+ID4+ID4+L0NvbnRlbnRzIDQgMCBSPj5lbmRvYmoKNCAwIG9iajw8L0xlbmd0aCA1OT4+CnN0cmVhbQpCVAovRjEgMTggVGYKMCAwIFRkCihQREYgRmlsZSAuLi4pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDUKMDAwMDAwMDAwMCA2NTUzNSBmCjAwMDAwMDAwMjEgMDAwMDAgbgowMDAwMDAwMDg2IDAwMDAwIG4KMDAwMDAwMDE5NSAwMDAwMCBuCjAwMDAwMDA0OTAgMDAwMDAgbgp0cmFpbGVyIDw8ICAvUm9vdCAxIDAgUiAvU2l6ZSA1ID4+CnN0YXJ0eHJlZgo2MDkKJSVFT0Y=";
}
````


## Next Steps

* [Customize the PDF Viewer toolbar](slug:pdfviewer-toolbar)
* [Handle PDF Viewer events](slug:pdfviewer-events)


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](slug:Telerik.Blazor.Components.TelerikPdfViewer)
