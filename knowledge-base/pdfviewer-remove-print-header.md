---
title: Remove Printed Page Header
description: Learn how to remove the header/footer information when printing a PDF document in PDFViewer for Blazor.
type: how-to
page_title: How to Remove Print Page Header and Footer
slug: pdfviewer-kb-remove-print-header
tags: pdfviewer, print, headers, footers
res_type: kb
ticketid: 1681329, 1617601,
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

When printing a PDF file using the [PDFViewer for Blazor](slug:pdfviewer-overview), an "about:blank" title appears at the top and bottom of the printed paper. This article demonstrates how to remove the "about:blank" label and any other header or footer information from the print output.

## Solution

The PDFViewer component utilizes the standard browser printing engine, which includes an option to hide the header and footer. These sections often contain the application's name, printing timestamp, page numbers, and the URL, including "about:blank". To remove this information, perform the following steps upon initiating a print:

1. Click on the **Print** button in PDFViewer to open the print dialog.
2. Select **More settings** in the print dialog.
3. Uncheck the box labeled **Headers and footers**.

By unchecking the **Headers and footers** option, you will remove the "about:blank" label and any other default header or footer information from your printed output.
