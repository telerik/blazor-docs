---
title: Overview
page_title: Overview | PdfViewer for Blazor
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
1. Set its `FileData` parameter to a byte array that will hold the PDF file contents.
1. Define the component reference via the `@ref` directive. You will need it to call the `LoadFile` method to actually display the PDF file in the component.
1. (optional) Subscribe to the PDF Viewer's `OnOpen` event, if users will be opening files from their local devices. The event argument is a `PdfViewerOpenEventArgs` object with a `Files` property. Use `Files` in the same way as with the [`OnSelect` event of the FileSelect component]({%slug fileselect-events%}#onselect).
1. (optional) Set `Width` and `Height` in any [supported CSS unit]({%slug common-features/dimensions%}).

>caption Basic Blazor PDF Viewer

````CSHTML
<TelerikPdfViewer @ref="@PdfViewerRef"
                  FileData="@PdfSource"
                  OnOpen="@OnPdfOpen"
                  Height="600px">
</TelerikPdfViewer>

@code {
    private TelerikPdfViewer PdfViewerRef { get; set; }

    private byte[] PdfSource { get; set; }

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        var file = args.Files.FirstOrDefault();
        var buffer = new byte[file.Stream.Length];
        await file.Stream.ReadAsync(buffer);

        PdfSource = buffer;
        PdfViewerRef.LoadFile(PdfSource);
    }

    // automatically display the sample PDF
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(100);
            PdfSource = Convert.FromBase64String(SamplePdf);
            PdfViewerRef.LoadFile(PdfSource);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    private string SamplePdf { get; set; } = @"JVBERi0xLjENCiXCpcKxw6sNCg0KMSAwIG9iag0KICA8PCAvVHlwZSAvQ2F0YWxvZw0KICAgICAvUGFnZXMgMiAwIFINCiAgPj4NCmVuZG9iag0KDQoyIDAgb2JqDQogIDw8IC9UeXBlIC9QYWdlcw0KICAgICAvS2lkcyBbMyAwIFJdDQogICAgIC9Db3VudCAxDQogICAgIC9NZWRpYUJveCBbMCAwIDMwMCAxNDRdDQogID4+DQplbmRvYmoNCg0KMyAwIG9iag0KICA8PCAgL1R5cGUgL1BhZ2UNCiAgICAgIC9QYXJlbnQgMiAwIFINCiAgICAgIC9SZXNvdXJjZXMNCiAgICAgICA8PCAvRm9udA0KICAgICAgICAgICA8PCAvRjENCiAgICAgICAgICAgICAgIDw8IC9UeXBlIC9Gb250DQogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTENCiAgICAgICAgICAgICAgICAgIC9CYXNlRm9udCAvVGltZXMtUm9tYW4NCiAgICAgICAgICAgICAgID4+DQogICAgICAgICAgID4+DQogICAgICAgPj4NCiAgICAgIC9Db250ZW50cyA0IDAgUg0KICA+Pg0KZW5kb2JqDQoNCjQgMCBvYmoNCiAgPDwgL0xlbmd0aCA1OSA+Pg0Kc3RyZWFtDQogIEJUDQogICAgL0YxIDE4IFRmDQogICAgMCAwIFRkDQogICAgKFRlbGVyaWsgUGRmVmlld2VyIGZvciBCbGF6b3IpIFRqDQogIEVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQp4cmVmDQowIDUNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMDAyMSAwMDAwMCBuDQowMDAwMDAwMDg2IDAwMDAwIG4NCjAwMDAwMDAxOTUgMDAwMDAgbg0KMDAwMDAwMDQ5MCAwMDAwMCBuDQp0cmFpbGVyDQogIDw8ICAvUm9vdCAxIDAgUg0KICAgICAgL1NpemUgNQ0KICA+Pg0Kc3RhcnR4cmVmDQo2MDkNCiUlRU9GDQo=";
}
````

## PdfViewer Parameters

The table below lists the PDF Viewer parameters. Also check the [PDF Viewer API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer) for all parameters, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | An additional CSS class for the `<div class="k-pdfviewer">` element. Use it to [customize the component styles and override the theme]({%slug themes-override%}). |
| `FileData` | `byte[]` | The source of the currently displayed PDF file. |
| `Height` | `string` | The PdfViewer height as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand vertically, according to its content. |
| `Page` | `int` <br /> (`1`) | The current page of the visible PDF document. |
| `Width` | `string` | The PdfViewer width as a [CSS length value]({%slug common-features/dimensions%}). If not set, the component will expand horizontally to fill its parent. |


## PdfViewer Reference and Methods

The PdfViewer exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` attribute (see the [basic example above](#creating-blazor-pdfviewer)). The PdfViewer methods are:

* `LoadFile` - renders the document that is passed as a `byte[]` argument.
* `Refresh` - ???


## Next Steps

* [Handle PDF Viewer events]({%slug pdfviewer-events%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
