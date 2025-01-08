---
title: Custom Cell Formatting of the Exported File with RadSpreadStreamProcessing
description: How to format the cells of the exported file with RadSpreadStreamProcessing?
type: how-to
page_title: Custom Cell Formatting of Exported Excel Files with RadSpreadStreamProcessing
slug: grid-kb-custom-cell-formatting-with-radspreadstreamprocessing
position: 
tags: grid, custom, cell, format, radspreadstreamprocessing
ticketid: 1598580
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

I want to format the cells of the exported Excel file and customize their appearance. For example, to set a background color. How to achieve this without compromising the application performance? When I use RadSpreadProcessing in Blazor WASM applications, customizing the exported file is slow.



## Solution

Handle the [`OnAfterExport`](slug://grid-export-events#onafterexport) event of the Grid. It fires before the actual file is provided to the user. The `Stream` field of its event argument contains the output of the export as a `MemoryStream`.

You can copy the bytes from this stream and import it using RadSpreadStreamProcessing to access and modify the cells.

The customization of the exported Excel files is faster with the [RadSpreadStreamProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) than with [RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing).

The example below demonstrates the export and customization of an Excel file. You can apply the same approach to CSV files.

To customize the cell format of the exported file before it reaches the client:

1. Handle the [`OnAfterExport`](slug://grid-export-events#onafterexport) event of the Grid. The stream it provides is finalized so that the resource does not leak. Its binary data, however, is available so you can copy the stream bytes to a new `MemoryStream` instance.

1. Define the desired cell styles. The example below demonstrates adding cell fill, you can specify different [cell styles](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles) based on the result you want to achieve.

1. [Import the new `MemoryStream` using the `IWorkbookImporter`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/import).

1. [Define a `IWorkbookExporter` to export the modified file](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/export) and save it in a new `MemoryStream` instance.

1. Loop through the sheets, rows and cells to copy their content in the `IWorkbookExporter` instance.

1. [Apply proper formatting](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/cells#set-a-format) depending on the cell value types.

1. Apply the [defined styles](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles) to the desired cells.

1. Pass the new `MemoryStream` to the `args.Stream` of the `GridAfterExcelExportEventArgs`, so that the modifications can be saved to the actual exported file.

>caption Use RadSpreadStreamProcessing to set background to table headers

````RAZOR
@using System.IO
@using Telerik.Documents.SpreadsheetStreaming

<TelerikGrid Data="@GridData"
             Pageable="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label">
            <TelerikCheckBox @bind-Value="@ExportAllPages" />
            Export All Pages
        </label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export"
                         AllPages="@ExportAllPages"
                         OnAfterExport="@OnExcelAfterExport">
        </GridExcelExport>
    </GridExport>

    <GridColumns>
        <GridColumn Field="@nameof(SampleData.ProductId)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(SampleData.ProductName)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(SampleData.UnitsInStock)" Title="In stock" Width="100px" />
        <GridColumn Field="@nameof(SampleData.Price)" Title="Unit Price" Width="200px" />
        <GridColumn Field="@nameof(SampleData.Discontinued)" Title="Discontinued" Width="100px" />
        <GridColumn Field="@nameof(SampleData.FirstReleaseDate)" Title="Release Date" Width="300px" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

    private async Task OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
        var bytes = args.Stream.ToArray();

        var excelStream = new MemoryStream(bytes);

        var export = new MemoryStream();

        //define the desired styling - https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles
        SpreadCellFormat markedCell = new SpreadCellFormat()
            {
                Fill = SpreadPatternFill.CreateSolidFill(new SpreadColor(230, 238, 223)),
                IsBold = true
            };

        //import the stream to modify it and then export it - 
        //see https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/workbook
        using (excelStream)
        {
            using (IWorkbookImporter workBookImporter = SpreadImporter.CreateWorkbookImporter(SpreadDocumentFormat.Xlsx, excelStream))

            using (IWorkbookExporter workbookExporter = SpreadExporter.CreateWorkbookExporter(SpreadDocumentFormat.Xlsx, export))
            {
                //loop through the sheets to copy their content
                foreach (IWorksheetImporter worksheetImporter in workBookImporter.WorksheetImporters)
                {
                    using (var worksheetExporter = workbookExporter.CreateWorksheetExporter(worksheetImporter.Name))
                    {
                        //this sets fixed width to all columns. 
                        //If you need to autofit the content, use the CellContentSizeHelper -
                        //https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/text-measuring
                        for (int i = 0; i < 5; i++)
                        {
                            var column = worksheetExporter.CreateColumnExporter();

                            column.SetWidthInPixels(100);

                            column.Dispose();
                        }

                        int lastRow = 0;

                        //loop through the rows to copy their content
                        foreach (IRowImporter rowImporter in worksheetImporter.Rows)
                        {
                            int rowDifference = rowImporter.RowIndex - lastRow;

                            //this part ensures the proper cells order in case there are any empty rows
                            if (rowDifference > 1)
                            {
                                worksheetExporter.SkipRows(rowDifference - 1);
                            }

                            int lastColumn = 0;

                            using (var rowExporter = worksheetExporter.CreateRowExporter())
                            {
                                //loop through the cells to copy their content
                                foreach (ICellImporter cellImporter in rowImporter.Cells)
                                {
                                    string value = cellImporter.Value;

                                    if (string.IsNullOrEmpty(value))
                                    {
                                        continue;
                                    }

                                    var valueType = cellImporter.ValueType;


                                    var importedFormat = new SpreadCellFormat();

                                    if (cellImporter.Format != null)
                                    {
                                        importedFormat = cellImporter.Format;
                                    }


                                    int cellDifference = cellImporter.ColumnIndex - lastColumn;

                                    //this part ensures the proper cells order in case there are any empty cells
                                    if (cellDifference > 1)
                                    {
                                        rowExporter.SkipCells(cellDifference - 1);
                                    }

                                    //check the cell value to apply proper formatting
                                    using (var cellExporter = rowExporter.CreateCellExporter())
                                    {
                                        switch (valueType)
                                        {
                                            case CellValueType.Boolean:
                                                var boolValue = bool.Parse(value);
                                                cellExporter.SetValue(boolValue);
                                                break;
                                            case CellValueType.Number:
                                                var dateNumberValue = double.Parse(value);
                                                cellExporter.SetFormat(importedFormat);
                                                cellExporter.SetValue(dateNumberValue);
                                                break;
                                            case CellValueType.Error:
                                            case CellValueType.Text:
                                            case CellValueType.SharedString:
                                            case CellValueType.RichText:
                                                cellExporter.SetValue(value);
                                                break;
                                        }

                                        //apply the defined style to the desired cells
                                        if (cellImporter.RowIndex == 0)
                                        {
                                            cellExporter.SetFormat(markedCell);
                                        }
                                    }

                                    lastColumn = cellImporter.ColumnIndex;
                                }
                            }

                            lastRow = rowImporter.RowIndex;
                        }
                    }
                }
            }
        }

        //pass the modified stream to the event arguments
        args.Stream = export;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = "Product " + x,
                UnitsInStock = x * 2,
                Price = 3.14159m * x,
                Discontinued = x % 4 == 0,
                FirstReleaseDate = DateTime.Now.AddDays(-x)
            }).ToList();
    }

    public class SampleData
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public decimal Price { get; set; }
        public bool Discontinued { get; set; }
        public DateTime FirstReleaseDate { get; set; }
    }
}
````

## See Also

* [Custom cell formatting of the exported file with RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Format numbers and dates in the exported CSV file from the Grid](slug://grid-kb-number-formatting-of-the-csv-export)
* [Change the default CSV delimiter (comma) during Grid export](slug://grid-kb-csv-export-change-field-delimiter)
* [Configure Document Processing Libraries](slug://getting-started-vs-integration-dpl)