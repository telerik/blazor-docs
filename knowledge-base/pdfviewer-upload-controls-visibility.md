---
title: Handle Upload Controls Visibility in TelerikPdfViewer
description: Learn how to manage the visibility of upload controls in TelerikPdfViewer when loading a PDF file.
type: how-to
page_title: How to Control Upload Component Visibility in TelerikPdfViewer
slug: pdfviewer-kb-upload-controls-visibility
tags: pdfviewer, blazor, upload controls, visibility, enableloadercontainer
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

- How to prevent interaction with Upload controls while a PDF is loading in TelerikPdfViewer?
- How to hide Upload component in TelerikPdfViewer until the PDF file is fully loaded?
- How to use custom CSS with TelerikPdfViewer to manage control visibility?

## Solution

To control the visibility of upload controls in the `TelerikPdfViewer` while a PDF is loading, apply custom CSS to hide the upload controls. This can be achieved by leveraging the [`OnOpen`](slug://components/pdfviewer/events#onopen) event to apply a CSS class with the required styles that hide the controls until the PDF file is loaded successfully.

````RAZOR
<TelerikPdfViewer Data="@PdfSource"
                  Height="600px"
                  EnableLoaderContainer="false"
                  OnOpen="@OnPdfOpen"
                  Class="@PdfClass">
</TelerikPdfViewer>
<style>
    .my-pdf .k-external-dropzone {
        display: none;
    }

    .my-pdf .k-upload {
        display: none;
    }
</style>
@code {
    private byte[] PdfSource { get; set; }
    private string PdfClass { get; set; } = "";

    private async Task OnPdfOpen(PdfViewerOpenEventArgs args)
    {
        //hide upload controls
        PdfClass = "my-pdf";
    }

    protected override void OnInitialized()
    {
        base.OnInitialized();
    }
}
````

## See Also

- [TelerikPdfViewer Overview](slug://components/pdfviewer/overview)
- [TelerikPdfViewer Events](slug://components/pdfviewer/events)
