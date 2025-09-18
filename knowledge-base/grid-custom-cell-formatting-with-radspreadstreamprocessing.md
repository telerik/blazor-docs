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

Handle the [`OnAfterExport`](slug:grid-export-events#onafterexport) event of the Grid. It fires before the actual file is provided to the user. The `Stream` field of its event argument contains the output of the export as a `MemoryStream`.

You can copy the bytes from this stream and import it using RadSpreadStreamProcessing to access and modify the cells.

The customization of the exported Excel files is faster with the [RadSpreadStreamProcessing library](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/overview) than with [RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing).

The example below demonstrates the export and customization of an Excel file. You can apply the same approach to CSV files.

To customize the cell format of the exported file before it reaches the client:

1. Handle the [`OnAfterExport`](slug:grid-export-events#onafterexport) event of the Grid. The stream it provides is finalized so that the resource does not leak. Its binary data, however, is available so you can copy the stream bytes to a new `MemoryStream` instance.

1. Define the desired cell styles. The example below demonstrates adding cell fill, you can specify different [cell styles](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles) based on the result you want to achieve.

1. [Import the new `MemoryStream` using the `IWorkbookImporter`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/import).

1. [Define a `IWorkbookExporter` to export the modified file](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/export) and save it in a new `MemoryStream` instance.

1. Loop through the sheets, rows and cells to copy their content in the `IWorkbookExporter` instance.

1. [Apply proper formatting](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/cells#set-a-format) depending on the cell value types.

1. Apply the [defined styles](https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles) to the desired cells.

1. Pass the new `MemoryStream` to the `args.Stream` of the `GridAfterExcelExportEventArgs`, so that the modifications can be saved to the actual exported file.

>caption Use RadSpreadStreamProcessing to set background to table headers

````RAZOR.skip-repl
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
        <GridColumn Field="@nameof(Product.Id)" Title="ID" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="180px" />
        <GridColumn Field="@nameof(Product.Price)" Width="160px" />
        <GridColumn Field="@nameof(Product.Quantity)" Width="120px" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" DisplayFormat="{0:d}" Width="240px" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="160px" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private bool ExportAllPages { get; set; }

    private void OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
        byte[] bytes = args.Stream.ToArray();

        using MemoryStream importStream = new MemoryStream(bytes);

        using MemoryStream exportStream = new MemoryStream();

        // Define the desired styling.
        // https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/cell-styles
        SpreadCellFormat customCellFormat = new SpreadCellFormat()
        {
            Fill = SpreadPatternFill.CreateSolidFill(new SpreadColor(230, 238, 223)),
            IsBold = true
        };

        // Import the stream to modify it and then export it.
        // https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/model/workbook
        using IWorkbookImporter workBookImporter = SpreadImporter.CreateWorkbookImporter(SpreadDocumentFormat.Xlsx, importStream);

        using IWorkbookExporter workbookExporter = SpreadExporter.CreateWorkbookExporter(SpreadDocumentFormat.Xlsx, exportStream);

        // Loop through the sheets to copy their content.
        foreach (IWorksheetImporter worksheetImporter in workBookImporter.WorksheetImporters)
        {
            using IWorksheetExporter worksheetExporter = workbookExporter.CreateWorksheetExporter(worksheetImporter.Name);

            // Set fixed width to all columns.
            // If you need to autofit the content, use the CellContentSizeHelper:
            //https://docs.telerik.com/devtools/document-processing/libraries/radspreadstreamprocessing/features/text-measuring
            for (int i = 0; i < 6; i++)
            {
                IColumnExporter column = worksheetExporter.CreateColumnExporter();

                column.SetWidthInPixels(160);

                column.Dispose();
            }

            int lastRow = 0;

            // Loop through the rows to copy their content.
            foreach (IRowImporter rowImporter in worksheetImporter.Rows)
            {
                int rowDifference = rowImporter.RowIndex - lastRow;

                // Ensure proper row order in case there are any empty rows.
                if (rowDifference > 1)
                {
                    worksheetExporter.SkipRows(rowDifference - 1);
                }

                int lastColumn = 0;

                using IRowExporter rowExporter = worksheetExporter.CreateRowExporter();

                // Loop through the cells to copy their content.
                foreach (ICellImporter cellImporter in rowImporter.Cells)
                {
                    string value = cellImporter.Value;

                    if (string.IsNullOrEmpty(value))
                    {
                        continue;
                    }

                    CellValueType valueType = cellImporter.ValueType;

                    SpreadCellFormat importedFormat = new SpreadCellFormat();

                    if (cellImporter.Format != null)
                    {
                        importedFormat = cellImporter.Format;
                    }

                    int cellDifference = cellImporter.ColumnIndex - lastColumn;

                    // Ensure proper cell order in case there are any empty cells.
                    if (cellDifference > 1)
                    {
                        rowExporter.SkipCells(cellDifference - 1);
                    }

                    // Check the cell value to apply proper formatting.
                    using ICellExporter cellExporter = rowExporter.CreateCellExporter();

                    switch (valueType)
                    {
                        case CellValueType.Boolean:
                            bool boolValue = bool.Parse(value);
                            cellExporter.SetValue(boolValue);
                            break;
                        case CellValueType.Number:
                            double dateNumberValue = double.Parse(value);
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

                    // Apply the defined style to the desired cells.
                    if (cellImporter.RowIndex == 0)
                    {
                        cellExporter.SetFormat(customCellFormat);
                    }

                    lastColumn = cellImporter.ColumnIndex;
                }

                lastRow = rowImporter.RowIndex;
            }
        }

        // Pass the modified stream to the GridAfterExcelExportEventArgs event argument.
        args.Stream = exportStream;
    }

    protected override void OnInitialized()
    {
        Random rnd = Random.Shared;
        GridData = Enumerable.Range(1, 100).Select(x => new Product
        {
            Id = x,
            Name = $"Product {x}",
            Price = rnd.Next(1, 100) * 1.23m,
            Quantity = rnd.Next(0, 100),
            ReleaseDate = DateTime.Now.AddDays(-rnd.Next(1, 1000)),
            Discontinued = x % 4 == 0
        }).ToList();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Format numbers and dates in the exported CSV file from the Grid](slug:grid-kb-number-formatting-of-the-csv-export)
* [Change the default CSV delimiter (comma) during Grid export](slug:grid-kb-csv-export-change-field-delimiter)
* [Configure Document Processing Libraries](slug:getting-started-vs-integration-dpl)
