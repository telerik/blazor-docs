---
title: Toolbar
page_title: PdfViewer - Toolbar
description: Toolbar of the PDF Viewer for Blazor. List of all built-in tools. How to use custom PDF Viewer tools.
slug: pdfviewer-toolbar
tags: telerik,blazor,pdf,pdfviewer
published: True
position: 10
---

# PdfViewer Toolbar

The [Blazor PDF Viewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.


## Built-in Tools

By default, the [Blazor PDF Viewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview) displays all its built-in tools in the order below. Use the *tool tag* if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Pager | `PdfViewerToolBarPagerTool` | A pager to navigate the PDF document via automatic scrolling. Paging requires the [`Height` parameter]({%slug pdfviewer-overview%}#pdfviewer-parameters) to be set, otherwise the component expands and doesn't have its own scrollbar. |
| Zoom | `PdfViewerToolBarZoomTool` | Zoom in and zoom out buttons with an additional dropdown with common options (Fit to page, Fit to width, 100%, etc.) |
| Selection | `PdfViewerToolBarSelectionTool` | Two toggle buttons that enable either text selection or panning. |
| Search | `PdfViewerToolBarSearchTool` | A search button. It opens an additional search bar that contains a textbox and arrow buttons to navigate the search results. |
| Open | `PdfViewerToolBarOpenTool` | An open button. It fires the [`OnOpen` event]({%slug pdfviewer-events%}#onopen). |
| Download | `PdfViewerToolBarDownloadTool` | A download button. It fires the [`OnDownload` event]({%slug pdfviewer-events%}#ondownload). |
| Print | `PdfViewerToolBarPrintTool` | A print button. The component also provides a [`Print` method]({%slug pdfviewer-overview%}#pdfviewer-reference-and-methods). Printing uses an additional browser window with only the PDF document inside. This window may require user confirmation or appropriate browser settings to display. |

By default, the toolbar also includes separators (`<PdfViewerToolBarSeparator />`) and spacers (`<PdfViewerToolBarSpacer />`). Separators render as a vertical line. Spacers consume the available empty space and push the rest of the tools next to one another.


## Custom Tools

In addition to built-in tools, the PDF Viewer also supports custom tools. Use the `<PdfViewerToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.


## Toolbar Configuration

Add a `<PdfViewerToolBar>` tag inside `<TelerikPdfViewer>` to configure a custom toolbar, for example:

* Arrange the PDF Viewer tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the PDF Viewer toolbar

````CSHTML
<TelerikPdfViewer Data="@PdfSource">
    <PdfViewerToolBar>
        <PdfViewerToolBarCustomTool>
            <TelerikButton OnClick="@OnPdfCustomClick">Custom PDF Tool</TelerikButton>
        </PdfViewerToolBarCustomTool>

        <PdfViewerToolBarSeparator />

        <PdfViewerToolBarOpenTool />
        <PdfViewerToolBarDownloadTool />
        <PdfViewerToolBarPrintTool />

        <PdfViewerToolBarSpacer />

        <PdfViewerToolBarPagerTool />

        <PdfViewerToolBarSpacer />

        <PdfViewerToolBarZoomTool />
        <PdfViewerToolBarSelectionTool />
        <PdfViewerToolBarSearchTool />
    </PdfViewerToolBar>
</TelerikPdfViewer>

@code {
    private byte[] PdfSource { get; set; }

    private async Task OnPdfCustomClick()
    {
        Console.WriteLine("Custom PDF tool clicked");
    }
}
````


## Next Steps

* [Handle PDF Viewer events]({%slug pdfviewer-events%})


## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer API](/blazor-ui/api/Telerik.Blazor.Components.TelerikPdfViewer)
