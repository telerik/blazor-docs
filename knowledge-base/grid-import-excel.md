---
title: How to Import Excel File in the Grid
description: How to Import Excel file in the Grid
type: how-to
page_title: How to Import an Excel File in the Grid utilizing the Telerik Document Processing Library
slug: grid-import-excel
position: 
tags: grid, import, excel, file
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

How do I import excel file data in the Grid component using the [Telerik.Documents.SpreadsheetStreaming](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) package?

## Solution

One way to bring an excel file into the Grid is by utilizing the Telerik.Documents.SpreadsheetStreaming library. This package provides an API for accessing excel files, enabling straightforward cell-by-cell reading. 

To import the data of an excel file in the Grid: 

1. Read the value of each cell.
1. Save the data in a collection of objects.
1. Bind the Grid to the collection.

>caption Import Excel File in the Grid

````CSHTML
@* Import Excel File in the Grid *@

@using System.Data;
@using Telerik.Documents.SpreadsheetStreaming;

<TelerikFileSelect AllowedExtensions="@AllowedExtensions"
                   Multiple="false"
                   OnSelect="@OnSelectHandler" />

<TelerikGrid Data=@GridData.AsEnumerable() 
             TItem="DataRow"
             Height="400px">
    <GridColumns>
        @foreach (DataColumn col in GridData.Columns)
        {
            <GridColumn Field="@col.ColumnName" Title="@col.ColumnName">
                <Template>
                    @((context as DataRow).ItemArray[col.Ordinal].ToString())
                </Template>
            </GridColumn>
        }
    </GridColumns>
</TelerikGrid>

@code {
    DataTable GridData = new DataTable();
    List<string> AllowedExtensions { get; set; } = new List<string>() { ".xlsx" };

    async Task OnSelectHandler(FileSelectEventArgs args)
    {
        foreach (var file in args.Files)
        {
            var fileData = new byte[file.Stream.Length];
            await file.Stream.ReadAsync(fileData);
            var ms = new MemoryStream(fileData);

            using (IWorkbookImporter workBookImporter = SpreadImporter.CreateWorkbookImporter(SpreadDocumentFormat.Xlsx, ms))
            {
                foreach (IWorksheetImporter worksheetImporter in workBookImporter.WorksheetImporters)
                {
                    foreach (IRowImporter rowImporter in worksheetImporter.Rows)
                    {
                        if (rowImporter.RowIndex == 0)
                        {
                            foreach (ICellImporter cell in rowImporter.Cells)
                            {
                                GridData.Columns.Add(cell.Value);
                            }
                        }
                        else
                        {
                            var newRow = GridData.NewRow();
                            var cellIndex = 0;
                            foreach (ICellImporter cell in rowImporter.Cells)
                            {
                                newRow[cellIndex] = cell.Value;
                                cellIndex++;
                            }
                            GridData.Rows.Add(newRow);
                        }
                    }
                }
            }
        }
    }
}

````