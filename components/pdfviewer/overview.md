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

The <a href = "https://www.telerik.com/blazor-ui/pdfviewer" target="_blank">Pdf Viewer for Blazor</a> allows users to open PDF files directly in the browser. The component provides all major features, such as paging, zooming and printing. In addition, users can upload and display a PDF file from their local device, or download the currently open file.


## Creating Blazor PdfViewer

To use a Telerik PDF Viewer for Blazor:

1. Add the `TelerikPdfViewer` tag.
1. Set the `Data` parameter to a byte array that will hold the PDF file contents.
1. If you are developing a Blazor **Server** app, [increase the maximum SignalR message size](#large-file-support).
1. (optional) Subscribe to the [PDF Viewer's events]({%slug pdfviewer-events%}) to enhance the user experience.
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
        PdfSource = Convert.FromBase64String(SamplePdf);

        base.OnInitialized();
    }

    private string SamplePdf { get; set; } = @"JVBERi0xLjENCiXCpcKxw6sNCg0KMSAwIG9iag0KICA8PCAvVHlwZSAvQ2F0YWxvZw0KICAgICAvUGFnZXMgMiAwIFINCiAgPj4NCmVuZG9iag0KDQoyIDAgb2JqDQogIDw8IC9UeXBlIC9QYWdlcw0KICAgICAvS2lkcyBbMyAwIFJdDQogICAgIC9Db3VudCAxDQogICAgIC9NZWRpYUJveCBbMCAwIDMwMCAxNDRdDQogID4+DQplbmRvYmoNCg0KMyAwIG9iag0KICA8PCAgL1R5cGUgL1BhZ2UNCiAgICAgIC9QYXJlbnQgMiAwIFINCiAgICAgIC9SZXNvdXJjZXMNCiAgICAgICA8PCAvRm9udA0KICAgICAgICAgICA8PCAvRjENCiAgICAgICAgICAgICAgIDw8IC9UeXBlIC9Gb250DQogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTENCiAgICAgICAgICAgICAgICAgIC9CYXNlRm9udCAvVGltZXMtUm9tYW4NCiAgICAgICAgICAgICAgID4+DQogICAgICAgICAgID4+DQogICAgICAgPj4NCiAgICAgIC9Db250ZW50cyA0IDAgUg0KICA+Pg0KZW5kb2JqDQoNCjQgMCBvYmoNCiAgPDwgL0xlbmd0aCA1OSA+Pg0Kc3RyZWFtDQogIEJUDQogICAgL0YxIDE4IFRmDQogICAgMCAwIFRkDQogICAgKFRlbGVyaWsgUGRmVmlld2VyIGZvciBCbGF6b3IpIFRqDQogIEVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQp4cmVmDQowIDUNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMDAyMSAwMDAwMCBuDQowMDAwMDAwMDg2IDAwMDAwIG4NCjAwMDAwMDAxOTUgMDAwMDAgbg0KMDAwMDAwMDQ5MCAwMDAwMCBuDQp0cmFpbGVyDQogIDw8ICAvUm9vdCAxIDAgUg0KICAgICAgL1NpemUgNQ0KICA+Pg0Kc3RhcnR4cmVmDQo2MDkNCiUlRU9GDQo=";
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
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Determines if the PDF Viewer will show a loading animation for operations that take more than 600 ms. |
| `Height` | `string` | The PdfViewer height as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand vertically, based on the loaded file. `Height` is required for the component paging and scrolling to work. |
| `MaxZoom` | `double` <br /> (`4`) | The largest possible zoom in. The default value is 400%. |
| `MinZoom` | `double` <br /> (`0.5`) | The largest possible zoom out. The default value is 50%. |
| `Page` | `int` <br /> (`1`) | The current page of the loaded PDF document. |
| `Width` | `string` | The PdfViewer width as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand horizontally to fill its parent. |
| `ZoomRate` | `double` <br /> (`0.25`) | The zoom level change that is used by the zoom in and zoom out buttons. |


## PdfViewer Reference and Methods

The PdfViewer exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. The PdfViewer methods are:

* `Rebind` - Refreshes the PDF Viewer and ensures it is displaying the current file `Data`.

>caption PDF Viewer reference and method usage

````CSHTML
<TelerikButton OnClick="@OnButtonClick">Rebind PDF Viewer</TelerikButton>

<TelerikPdfViewer @ref="@PdfViewerRef"
                  Data="@PdfSource">
</TelerikPdfViewer>

@code {
    private TelerikPdfViewer PdfViewerRef { get; set; }

    private byte[] PdfSource { get; set; }

    private async Task OnButtonClick()
    {
        PdfViewerRef.Rebind();
    }
}
````


## Next Steps

* [Customize the PDF Viewer toolbar]({%slug pdfviewer-toolbar%})
* [Handle PDF Viewer events]({%slug pdfviewer-events%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
