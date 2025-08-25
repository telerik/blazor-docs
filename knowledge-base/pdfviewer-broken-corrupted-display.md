---
title: PDF Document Displays Visually Corrupted
description: How to fix broken and visually corrupted PDF document in the Blazor PDFViewer component.
type: troubleshooting
page_title: How to fix broken PDF document in the PDFViewer component
slug: pdfviewer-kb-broken-corrupted-display
position: 
tags: pdf
ticketid: 1582940, 1585944, 1586513
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>PDFViewer for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

The PDF document in the PDFViewer control is visually corrupted on initial display.

Zooming in and out sometimes corrects this visualization problem but the initial rendering of the document is almost always broken.

The PDF file content is visually corrupted with Edge and Chrome. The PDF file is displayed correctly in Firefox.

The PDF Viewer has display issues and some of the words in the PDF document are cut. The rendering error may disappear if I change the zoom.

## Possible Cause

The problem is related to:

* Google Chrome, Microsoft Edge and possibly other WebKit browsers;
* Specific graphics cards with outdated drivers;
* Webkit implementation of hardware acceleration when rendering 2D canvases.

## Suggested Workarounds

* Update to the latest browser version;
* Update the graphics card driver;
* Disable GPU hardware acceleration for 2D canvas rendering in the browser. To access the setting in Chrome, go to `chrome://flags` and search for `"Accelerated 2D Canvas"`. In Edge, go to `edge://settings` and search for `"Use hardware acceleration"`. You may need to restart the browser after turning off the setting.

## Notes

Unfortunately, the PDF Viewer cannot detect, report or fix this visualization problem automatically.

## See Also

* [Character display issue in PDF documents on Chrome and Edge](https://pdfjs.community/t/character-display-issue-on-chrome-edge-but-not-firefox/1753/9)
* [PDF rendering issues in Google Chrome](https://web.archive.org/web/20250513040055/https://support.papersapp.com/support/solutions/articles/30000046026-pdf-rendering-issues-in-google-chrome-on-windows-10)
