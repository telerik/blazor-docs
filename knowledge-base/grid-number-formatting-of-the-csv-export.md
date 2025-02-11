---
title: Format numbers and dates in the exported CSV file from the Grid
description: How to format numbers and dates in the exported CSV file?
type: how-to
page_title: Format numbers and dates in the exported CSV file from the Grid
slug: grid-kb-number-formatting-of-the-csv-export
position: 
tags: grid, number, date, format, radspreadprocessing
ticketid: 1563689
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

I want to format numbers and dates in the exported CSV file. For example, set specific currency format. How to achieve this?

## Solution

Handle the [OnAfterExport](slug:grid-export-events#onafterexport) event of the Grid. It fires before the actual file is provided to the user. The `Stream` field of its event argument contains the output of the export as a `MemoryStream`.

You can copy the bytes from this stream and import them in a [`RadSpreadProcessing workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-workbooks/working-with-workbooks-what-is-workbook) to access and modify the cells.

[`RadSpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) is a powerful library that allows you to create spreadsheets from scratch, modify existing documents or convert between the most common spreadsheet formats. In this case, we will focus on the file modification.

To format numeric and date cells of the exported file before it reaches the client, do the following:

1. Install `Telerik.Documents.Spreadsheet.FormatProviders.Xls` package for the `workbook` import, so you can then access the data of the exported CSV file and modify its format.

1. Handle the [OnAfterExport](slug:grid-export-events#onafterexport) event of the Grid. The stream it provides is finalized, so that the resource does not leak. Its binary data, however, is available, so you can copy the stream bytes to a new `MemoryStream` instance.

1. Use a `CsvFormatProvider` instance to [import the new `MemoryStream` in a `workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/csvformatprovider#import).

1. Create an instance of [CellValueFormat](https://docs.telerik.com/devtools/document-processing/api/telerik.windows.documents.spreadsheet.model.cellvalueformat) for each desired format you want to use. [Read more for the available numeric formats...](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/features/number-formats).

1. Select the desired cells - you can create a [CellSelection](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/accessing-cells-of-worksheet) or target whole columns by their index.

1. [Apply the created number formats](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/features/number-formats#applying-a-number-format) to the selected cells/columns

1. [Export the modified `workbook` to a `MemoryStream`](https://docs.telerik.com/devtools/document-processing/knowledge-base/import-export-save-load-workbook#save-workbook-to-filestream-or-memorystream).

1. Pass that `MemoryStream` to the `args.Stream` of the `GridAfterCsvExportEventArgs`, so that the modifications can be saved to the actual exported file.

````RAZOR.skip-repl
@*Use RadSpreadProcessing to format numeric data in the exported CSV file*@

@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.TextBased.Csv
@using Telerik.Windows.Documents.Spreadsheet.Model
@using System.IO

<TelerikGrid Data="@GridData" Pageable="true">

    <GridToolBarTemplate>
        <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
    </GridToolBarTemplate>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export"
                       AllPages="@ExportAllPages"
                       OnAfterExport="@OnCSVAfterExport">
        </GridCsvExport>
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
    private async Task OnCSVAfterExport(GridAfterCsvExportEventArgs args)
    {
        //args.Stream is finalized. The Import() method of the XlsxFormatProvider requires a readable stream, so you should copy the stream bytes to a new MemoryStream instance which will be used for the import.
        var bytes = args.Stream.ToArray();

        var CSVStream = new MemoryStream(bytes);

        //create a format provider instance to call the import
        CsvFormatProvider formatProvider = new CsvFormatProvider();

        //import the stream to a workbook
        Workbook workbook = formatProvider.Import(CSVStream);

        //specify the desired formats

        //currency
        CellValueFormat currencyFormat = new CellValueFormat("$#,##0.00");

        //dates
        CellValueFormat dateFormat = new CellValueFormat("m/d/yyyy");

        //select the columns you want to format
        ColumnSelection PriceColumn = workbook.Worksheets[0].Columns[3];
        ColumnSelection ReleaseDate = workbook.Worksheets[0].Columns[5];

        //set the specified formats to the selected columns
        PriceColumn.SetFormat(currencyFormat);
        ReleaseDate.SetFormat(dateFormat);

        //save the modified workbook in a MemoryStream
        MemoryStream modifiedExport = new MemoryStream();

        //export the modified workbook to a stream
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

  * [Change the default CSV delimiter (comma) during Grid export](slug:grid-kb-csv-export-change-field-delimiter)
  * [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
  * [Configure Document Processing Libraries](slug:getting-started-vs-integration-dpl)
