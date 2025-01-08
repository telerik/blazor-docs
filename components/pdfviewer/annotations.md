---
title: Annotations
page_title: PdfViewer - Annotations
description: Annotations in the PdfViewer for Blazor. How to add and configure annotations in the PdfViewer for Blazor
slug: pdfviewer-annotations
tags: telerik,blazor,pdf,pdfviewer,annotations
published: True
position: 15
---

# PdfViewer Annotations

The PdfViewer supports a set of annotation types to enhance PDF documents. For example, users can highlight important text areas or add notes as free text.

The PdfViewer creates a dedicated layer for the annotations and includes them when downloading or printing the file. If the user opens a file with annotations, they can edit only the annotations that were added using the PdfViewer `Annotations` tool. The PdfViewer does not support editing annotations added in a different PDF editor.

To add and manage the annotations, the user can click on the dedicated button in the [PdfViewer Toolbar](slug://pdfviewer-toolbar). It opens an annotations bar with the available annotation types.

## Supported Annotations

The PdfViewer provides the following annotation types:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Annotation Type | Description |
| --- | --- |
| **Text Highlight** | Allows highlighting the selected text in the document. Users can choose the desired highlight color. |
| **Free Text** | Allows creating an element with free text anywhere in the document. Provides option to select the desired text color and font size. |

## Working with Annotations

**To manage the annotations the user should:**

1. Click on the `Annotations` tool in the [Toolbar](slug://pdfviewer-toolbar) to open the Annotations bar with the available annotation types.
1. Click the desired annotation type to toggle it. You need to first "turn on" the annotation tool to add or edit annotations of the corresponding type. If none of the annotation tools are enabled, the PdfViewer will not allow interacting with the document to create or edit annotations.

**From this point the user can:**

1. **Create an annotation**&mdash;The user can select a non-annotated text to highlight it or they can click an area that does not have free text element to create an annotation. Once they create the annotation, a popup with the available customization options will appear.
1. **Edit an existing annotation**&mdash;The user can edit one or multiple annotations at a time but they all must be of the same type. To select multiple annotations, the user can hold `Ctrl` and click on all annotations they want to edit.
    * To edit color and font size the user can click the annotation they want to edit to open the customization popup.
    * To edit the text in the `Free Text` annotation element, the user can double-click the element to open the textbox for editing.
    * To move the `Free Text` annotation element the user can click it to enable the drag tool and start dragging. 
1. **Delete an existing annotation**&mdash;The user can click the annotation they want to delete to open the customization popup. Pressing the delete button in the customization popup will open a delete confirmation dialog where the user can confirm or cancel the annotation deletion.

## Disabling Annotations

The Annotations tool is included in the [Toolbar](slug://pdfviewer-toolbar) by default. To prevent users from creating annotations, you can [configure the Toolbar and not include the `PdfViewerToolBarAnnotationsTool`](slug://pdfviewer-toolbar#toolbar-configuration).

## See Also

* [PdfViewer Live Demo](https://demos.telerik.com/blazor-ui/pdfviewer/overview)
* [PdfViewer Toolbar](slug://pdfviewer-toolbar)