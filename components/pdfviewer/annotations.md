---
title: Annotations
page_title: PdfViewer - Annotations
description: Annotations in the PDF Viewer for Blazor. How to add and configure annotations in the PDF Viewer for Blazor
slug: pdfviewer-annotations
tags: telerik,blazor,pdf,pdfviewer,annotations
published: True
position: 15
---

# PdfViewer Annotations

The PdfViewer supports a set of annotation types that the user can add to enhance the PDF document - highlight important text areas or add notes as free text. The PDFViewer creates a dedicated layer for the annotations and includes them when downloading or printing the file.

To add and manage the annotations, the user can click on the dedicated button in the [Toolbar]({%slug pdfviewer-toolbar%}). It opens an annotations bar with the available annotation types.

## Supported Annotations

The PDFViewer provides the following annotation types:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Annotation Type | Description |
| --- | --- |
| **Text Highlight** | Allows highlighting the selected text in the document. Provides an option to select the desired highlight color. |
| **Free Text** | Allows creating an element with free text anywhere in the document. Provides option to select the desired text color and font size. |

## Working with Annotations

>caption To manage the annotations the user should:

1. Click on the `Annotations` tool in the [Toolbar]({%slug pdfviewer-toolbar%}) to open the Annotations bar with the available annotation types.
1. Click the desired annotation type to toggle it. You need to first "turn on" the annotation tool to add or edit annotations of the corresponding type. If none of the annotation tools are enabled, the PDFViewer will not allow interacting with the document to create or edit annotations.

>caption From this point the user can:

1. **Create an annotation** - for that purpose the user can select a non-annotated text to highlight it or click on an area that does not have free text element to create one. Once they create the annotation, a popup with the available customization options will appear.
1. **Edit an existing annotation** - for that purpose the user can click on the annotation they want to edit to open the customization popup. The `Free Text` annotation element can also be moved around the document. The user can edit one or multiple annotations at a time but they all must be of the same type.

## Disabling annotations

The Annotations tool is included in the [Toolbar]({%slug pdfviewer-toolbar%}) by default. To prevent the users from creating annotations, you can [configure the Toolbar and not include the `PdfViewerToolBarAnnotationsTool`]({%slug pdfviewer-toolbar%}#toolbar-configuration).

## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer Toolbar]({%slug pdfviewer-toolbar%})