---
title: How to Hide Upload Component in TelerikPdfViewer
description: Learn how to hide the Upload component in TelerikPdfViewer when loading a PDF file.
type: how-to
page_title: How to Hide Upload Component in TelerikPdfViewer
slug: pdfviewer-kb-hide-upload
tags: pdfviewer, blazor, upload, visibility, enableloadercontainer, hide, dropzone
res_type: kb
ticketid: 1675214
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>PdfViewer for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

When using the [TelerikPdfViewer](https://docs.telerik.com/blazor-ui/components/pdfviewer/overview) for Blazor, upload controls may still be visible while a PDF file is loading, even if the `EnableLoaderContainer` parameter is set to `false`. 

This knowledge base article also answers the following questions:

- How to prevent interaction with Upload component while a PDF is loading in TelerikPdfViewer?
- How to hide Upload and DropZone components in TelerikPdfViewer until the PDF file is fully loaded?
- How to use custom CSS with TelerikPdfViewer to hide Upload component?

## Solution

To control the visibility of Upload component and its dropzone in the `TelerikPdfViewer` while a PDF is loading, apply custom CSS to hide the upload controls. To achieve that, use the [`OnOpen`](slug://components/pdfviewer/events#onopen) event to apply a CSS class with the required styles that hide the controls until the PDF file is loaded successfully.

````RAZOR
<TelerikPdfViewer Data="@PdfSource"
                  Height="600px"
                  EnableLoaderContainer="false"
                  OnOpen="@OnPdfOpen"
                  Class="@PdfClass">
</TelerikPdfViewer>
<style>
    .hide-pdf-upload .k-external-dropzone {
        display: none;
    }

    .hide-pdf-upload .k-upload {
        display: none;
    }
</style>
@code {
    private byte[] PdfSource { get; set; }
    private string PdfClass { get; set; } = "";

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        //hide Upload component
        PdfClass = "hide-pdf-upload";
    }
}
````

## See Also

- [TelerikPdfViewer Overview](slug://components/pdfviewer/overview)
- [TelerikPdfViewer Events](slug://components/pdfviewer/events)
