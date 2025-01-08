---
title: Importing an Excel Files in the Grid
description: Learn how to enable the Excel import functionality in the Telerik UI for Blazor Data Grid component by using the Telerik Document Processing Library.
type: how-to
page_title: Enabling Excel Import in Grid with Telerik DPL
slug: grid-import-excel
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

How can I import an Excel file data in the Grid component by using the [`Telerik.Documents.SpreadsheetStreaming`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) package?

## Solution

A possible way to import an Excel file in the Grid is by utilizing the `Telerik.Documents.SpreadsheetStreaming` library. This package provides an API for accessing Excel files and enabling straightforward cell-by-cell reading.

To import the data of an Excel file in the Grid:

1. Read the value of each cell.
1. Save the data in a collection of objects.
1. Bind the Grid to the collection.

>caption Import an Excel file in the Grid

<div class="skip-repl"></div>

````RAZOR
@* Import Excel File in the Grid *@

@using System.IO;
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

## See Also

  * [Configuring Document Processing Libraries](slug://getting-started-vs-integration-dpl)
