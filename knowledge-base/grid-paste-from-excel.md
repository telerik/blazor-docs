---
title: Import (Paste) from Excel
description: How to Import (Paste) content in the Grid from Excel.
type: how-to
page_title: Import (Paste) from Excel
slug: grid-kb-paste-from-excel
position: 
tags: 
res_type: kb
components: ["grid"]
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

How to import (paste) content in the Grid from Excel instead of using the built-in way for creating new items?

## Solution

The Grid does not provide a built-in paste-from-Excel feature. An example that captures the clipboard content, parses the pasted rows, and adds them to the Grid data source is available in the following project: [Import (Paste) from Excel](https://github.com/telerik/blazor-ui/tree/master/grid/paste-from-excel).

Use this approach when users paste a variable number of spreadsheet rows and you need to save each row as a database record. Adapt the parsing and validation logic to your model, then persist the valid items in your application.

The sample uses a separate input to capture the pasted text. Review the sample's [UX limitations](https://github.com/telerik/blazor-ui/tree/master/grid/paste-from-excel#ux-issues) before applying it to a Grid that also needs editing, keyboard navigation, filtering, or text selection.

If users need an Excel-like editing surface before saving, use the [Spreadsheet](slug:spreadsheet-overview) and read its values after calling `ExportToExcelAsync()` as described in [Iterate Spreadsheet Data and Get Cell Values](slug:spreadsheet-kb-get-cell-values).