---
title: Toolbar
page_title: Toolbar | PdfViewer for Blazor
description: Toolbar of the PDF Viewer for Blazor.
slug: pdfviewer-toolbar
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 5
---

# PdfViewer Toolbar

The PDF Viewer toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to customize the toolbar.


## Built-in Tools

By default, the PDF Viewer displays the following tools:

* Pager to navigate the PDF document via automatic scrolling. Paging requires the `Height` parameter to be set, otherwise the component expands and doesn't have its own scrollbar.
* Zoom in and zoom out buttons;
* Zooming dropdown with common options (Fit to page, Fit to width, 100%, etc.);
* Text selection button
* Pan button
* Search button that opens an additional search bar. It contains a textbox and arrow buttons to navigate the search results.
* Open button. Requires the [`OnOpen` handler]({%slug pdfviewer-events%}#onopen) to be implemented.
* Download button. Requires the [`OnDownload` handler]({%slug pdfviewer-events%}#ondownload) to be implemented.
* Print button;

>caption Customize the built-in PDF Viewer tools

````CSHTML
<TelerikPdfViewer Data="@PdfSource">
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }
}
````


## Custom Tools

>caption Configure a custom PDF Viewer tool

````CSHTML
<TelerikPdfViewer Data="@PdfSource">
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }
}
````


## Next Steps

* [Handle PDF Viewer events]({%slug pdfviewer-events%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
