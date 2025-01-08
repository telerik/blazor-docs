---
title: Custom cell formatting of the exported file with RadSpreadProcessing
description: How to format the cells of the exported file with RadSpreadProcessing?
type: how-to
page_title: Custom cell formatting of exported Excel files with RadSpreadProcessing
slug: grid-kb-custom-cell-formatting-with-radspreadprocessing
position: 
tags: grid, custom, cell, format, radspreadprocessing
ticketid: 1559794
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

I want to format the cells of the exported Excel file. For example, set background color. How to achieve this?

## Solution

Handle the [OnAfterExport](slug://grid-export-events#onafterexport) event of the Grid. It fires before the actual file is provided to the user. The `Stream` field of its event argument contains the output of the export as a `MemoryStream`.

You can copy the bytes from this stream and import them in a [`RadSpreadProcessing workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-workbooks/working-with-workbooks-what-is-workbook) to access and modify the cells.

[`RadSpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) is a powerful library that allows you to create spreadsheets from scratch, modify existing documents or convert between the most common spreadsheet formats. In this case, we will focus on the file modification.

>tip In WebAssembly applications, the customization of the exported Excel files is faster with the [RadSpreadStreamProcessing library](slug://grid-kb-custom-cell-formatting-with-radspreadstreamprocessing) than with RadSpreadProcessing.

The example below targets Excel file export and customization. Same approach can be applied for [CSV files](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/csvformatprovider).

To customize the cell format of the exported file before it reaches the client, do the following:

1. Install `Telerik.Documents.Spreadsheet.FormatProviders.Xls` package for the `workbook` import.

2. Handle the [`OnAfterExport`](slug://grid-export-events#onafterexport) event of the Grid. The stream it provides is finalized, so that the resource does not leak. Its binary data, however, is available, so you can copy the stream bytes to a new `MemoryStream` instance.

3. [Import the new `MemoryStream` in a `workbook`](https://docs.telerik.com/devtools/document-processing/knowledge-base/import-export-save-load-workbook#load-workbook-from-file-as-filestream-or-memorystream).

4. Select the desired cells—create a [`CellSelection`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/accessing-cells-of-worksheet).

5. Add your desired cell modifications to the selected cells. The example below demonstrates adding cell fill, you can modify different [cell properties](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/get-set-clear-properties#cell-properties) based on the result you want to achieve.

6. [Export the modified `workbook` to a `MemoryStream`](https://docs.telerik.com/devtools/document-processing/knowledge-base/import-export-save-load-workbook#save-workbook-to-filestream-or-memorystream).

7. Pass that `MemoryStream` to the `args.Stream` of the `GridAfterExcelExportEventArgs`, so that the modifications can be saved to the actual exported file.

<div class="skip-repl"></div>

````RAZOR
@*Use RadSpreadProcessing to set background to table headers*@

@using Telerik.Documents.Media
@using Telerik.Documents.Common.Model
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.TextBased.Csv
@using Telerik.Windows.Documents.Spreadsheet.Model

<TelerikGrid Data="@GridData" Pageable="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export"
                         AllPages="@ExportAllPages"
                         OnAfterExport="@OnExcelAfterExport" />
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
    private async Task OnExcelAfterExport(GridAfterExcelExportEventArgs args)
    {
        //args.Stream is finalized. The Import() method of the XlsxFormatProvider requires a readable stream, so you should copy the stream bytes to a new MemoryStream instance which will be used for the import.
        var bytes = args.Stream.ToArray();

        var excelStream = new MemoryStream(bytes);

        //create a format provider instance to call the import
        XlsxFormatProvider formatProvider = new XlsxFormatProvider();

        //import the stream to a workbook
        Workbook workbook = formatProvider.Import(excelStream);

        //select a range of cells
        CellSelection selection = workbook.Worksheets[0].Cells[0, 0, 0, 5];

        //add the desired modifications to the selection. Here we are creatin a solid fill pattern to add some background to the selected cells
        PatternFill solidPatternFill = new PatternFill(PatternType.Solid, Color.FromArgb(255, 254, 109, 88), Colors.Transparent);

        selection.SetFill(solidPatternFill);

        //save the modified workbook in a MemoryStream
        MemoryStream modifiedExport = new MemoryStream();

        formatProvider.Export(workbook, modifiedExport);        

        //pass the modified stream to the event arguments
        args.Stream = modifiedExport;
    }

    List<SampleData> GridData { get; set; }

    bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new SampleData
            {
                ProductId = x,
                ProductName = $"Product {x}",
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

  * [Format numbers and dates in the exported CSV file from the Grid](slug://grid-kb-number-formatting-of-the-csv-export)
  * [Change the default CSV delimiter (comma) during Grid export](slug://grid-kb-csv-export-change-field-delimiter)
  * [Configuring Document Processing Libraries](slug://getting-started-vs-integration-dpl)
