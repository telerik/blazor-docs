---
title: Exporting Grid's Image Column to Excel in Blazor
description: Learn how to export an image column from the Telerik Blazor Grid to an Excel file by utilizing the Document Processing Library.
type: how-to
page_title: How to Export Grid's Image Column to Excel with Blazor
slug: grid-export-image-column-excel
tags: grid, blazor, telerik, export, excel, image, column
res_type: kb
ticketid: 1666986, 1662544, 1645206, 1655440
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to export the Telerik Blazor [Grid](slug://grid-overview)'s column that displays images to an Excel file. The images are rendered in a [Grid column template](slug://grid-templates-column). How can I include the image column in the Excel export?

## Solution

To export an image column from the Grid to Excel, follow these steps:

1. Handle the Grid's [`OnAfterExport` event](slug://grid-export-events#onafterexport) to capture the Excel export output as a memory stream.
2. Use the [SpreadProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) to modify the Excel file. Similar to how the exported file is customized here - [Custom cell formatting of the exported file with RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing). The SpreadProcessing library supports [inserting images in the cells](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/features/shapes-and-images).

If you encounter any questions regarding the usage of the Document Processing libraries, [contact the DocumentPorcessing team](https://docs.telerik.com/devtools/document-processing/knowledge-base/submit-support-tickets).

## See Also

- [Handling Export Events in Grid](slug://grid-export-events)
- [Knowlegde base article about custom cell formatting of the exported file with RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing)
