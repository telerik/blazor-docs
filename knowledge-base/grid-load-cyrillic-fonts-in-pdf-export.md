---
title: Loading Cyrillic Fonts When Exporting the Grid to PDF
description: How to lLoad Cyrillic fonts when exporting the Blazor Grid to PDF?
type: how-to
page_title: Loading Cyrillic Fonts When Exporting the Grid to PDF
slug: grid-kb-load-cyrillic-fonts-in-pdf-export
position: 
tags: 
res_type: kb
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

My Grid uses a Cyrillic font but when I export it to PDF the text is missing. How to ensure the text will be properly included in the exported PDF file when using a Cyrillic font? 
How to load data on demand when you have Hierarchy Grid?

## Solution

Some PDF fonts do not have Cyrillic (or other alphabets) characters. In such cases, you can load the fonts explicitly.