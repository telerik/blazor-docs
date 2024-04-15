---
title: SpreadStreamProcessing
page_title: Telerik SpreadStreamProcessing Overview
description: Telerik SpreadStreamProcessing Overview
slug: spreadstreamprocessing-overview
tags: overview
published: True
position: 1
---

# Telerik SpreadStreamProcessing

This article briefly explains the specifics of <a href = "https://www.telerik.com/blazor-ui/spreadstreamprocessing" target="_blank">RadSpreadStreamProcessing</a> - what is spread streaming, how it works compared to the RadSpreadProcessing library and when to use it.

>note <a href = "https://www.telerik.com/blazor-ui/spreadstreamprocessing" target="_blank">RadSpreadStreamProcessing</a> is part of the **Telerik Document Processing** libraries. The full documentation for this component is available at [https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview).


![SpreadStreamProcessing Fast Export image](images/SpreadStreamProcessing-Overview_01.png)


## What is Spread Streaming?

Spread streaming is a document processing paradigm that allows you to create or read big spreadsheet documents with great performance and minimal memory footprint. 

The key for the memory efficiency is that the spread streaming library writes the spreadsheet content directly to a stream without creating and preserving the spreadsheet document model in memory. Each time an exporter object is disposed, the set values are written into the stream. This allows you to create large documents with an excellent performance.

While reading, RadSpreadStreamProcessing parses only the required chunk of information. This ensures minimal use of application resources.

## Key Features


Some of the features you can take advantage of are:

* [Export](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/export) to XLSX or CSV files

* [Import from XLSX or CSV files](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/import)

* Write directly into a stream; or parse only required data

* **Append** new worksheets to existing workbook

* **Grouping**: Helps you organize data in sections, to be able to show and hide the currently relevant chunks.

* **Hidden [rows](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/row) and [columns](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/column)**: The API allows you to set the hidden state of each row or column.

* [**Cell formatting**](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/cells#set-a-format): A number of properties enabling you to apply the desired look to a cell.

* [**Cell styles**](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles): Using cell styles allows you to apply multiple format options in one step and also offers an easy approach to achieve consistency in cell formatting.

* [**Merge cells**](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/cells#merge-cells): You have the ability to merge two or more adjacent cells into a single cell that spans over multiple rows and columns.

* **Controlling the view state of a sheet:**
	* [Setting scale factor](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#scale-a-document)
	* [Control over the selection and the active cell](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#add-selection-to-a-document)
	* [Show/hide gridlines](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#hide-grid-lines-and-row-or-column-headers)
	* [Show/hide row and column headers](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#ide-grid-lines-and-row-or-column-headers)
	* [Freezing panes](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#freeze-panes): Keep part of the worksheet always visible while scrolling.
	* [Changing the first visible cell](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/worksheet-view-exporter#change-the-first-visible-cell): when you would like to show a particular part of the sheet to the user on opening the document in a viewer.

## RadSpreadStreamProcessing vs. RadSpreadProcessing

The main differences between the two spreadsheet processing libraries include:

* __RadSpreadStreamProcessing__ writes directly into a stream, while [RadSpreadProcessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) creates models for the elements in the document. This is why the spread streaming library uses significantly less memory than __RadSpreadProcessing__.
* __RadSpreadStreamProcessing__ does not perform any formula or other layout-related calculations, which makes its file generation performance much better compared to __RadSpreadProcessing__.


## When to Use RadSpreadStreamProcessing

You can use the __RadSpreadStreamProcessing__ library to create or read __large amount of data__ with a low memory footprint and great performance. You can also append data to an already existing document stream. The generated document can be exported directly to a file on the file system or to a stream (for example, to send it to the client).

## When to Use RadSpreadProcessing

The [RadSpreadProcessing](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) library supports multiple features of the spreadsheet documents and enables you to perform different calculations on the data. To do that, the library keeps the whole document in its model in the memory of the application. If you are not dealing with huge files and the resources are not critical for the specific case, you can consider using RadSpreadProcessing as it doesn't have the limitations of the streaming model. 
