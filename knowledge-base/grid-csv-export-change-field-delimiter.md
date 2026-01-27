---
title: Grid CSV export - change the comma field delimiter
description: How to export the Grid to CSV with a different/custom field delimiter?
type: how-to
page_title: Grid export to CSV - change the default field delimiter (comma)
slug: grid-kb-csv-export-change-field-delimiter
position: 
tags: grid, export, csv, field, delimiter, change, semicolon, comma, custom
ticketid: 1576816, 1699366
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

I want to change the default field delimiter when exporting the Grid to CSV file. How to set a different list separator?

I want to use a semicolon field delimiter for the exported CSV Grid instead of comma. How to achieve this?

>tip The Blazor Grid [does not expose a built-in option for setting the CSV delimiter](https://feedback.telerik.com/blazor/1577167-option-to-configure-the-field-delimiter-when-exporting-to-csv). You can vote for the enhancement and follow it to receive status updates. It depends on a [feature of RadSpreadProcessing](https://feedback.telerik.com/document-processing/1356286-spreadstreamprocessing-implement-settings-for-changing-the-delimiter-and-quote-when-exporting-to-csv).

## Solution

Modify the exported CSV file before it reaches the user to change the field delimiter.

Use the [`RadSpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) library. It allows you to create spreadsheets from scratch, modify existing documents or convert between the most common spreadsheet formats. In this case, we will focus on the [`CsvFormatProvider` which exposes setting to configure the field delimiter](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/settings).

To change the CSV value delimiter:

1. Install the `Telerik.Documents.Spreadsheet.FormatProviders.Xls` NuGet package, so you can use the `CsvFormatProvider`.
1. Handle the [Grid `OnAfterExport` event](slug:grid-export-events#onafterexport). The `Stream` it provides is finalized, so that the resource does not leak. Its binary data, however, is available, so you can copy the stream bytes to a new `MemoryStream` instance.
1. Create a `CsvFormatProvider` and [set its `Delimiter` setting to a comma `','`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/settings). This is necessary because the delimiter in the exported CSV file is always a comma, while the `CsvFormatProvider` assumes it based on the culture.
1. [Import the new `MemoryStream` to a `Workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/csvformatprovider#import).
1. Set the desired new `Delimiter` through the [settings of the `CsvFormatProvider` instance](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/settings).
1. [Export the modified `Workbook` to a new `MemoryStream`](https://docs.telerik.com/devtools/document-processing/knowledge-base/import-export-save-load-workbook#save-workbook-to-filestream-or-memorystream).
1. Pass that `MemoryStream` to the `Stream` property of the `GridAfterCsvExportEventArgs`, so that the modifications can be saved to the actual exported file.

````RAZOR.skip-repl
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.TextBased.Csv
@using Telerik.Windows.Documents.Spreadsheet.Model
@using System.IO

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true">

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
        <GridColumn Field="@nameof(Product.Id)" Title="ID" Width="100px" />
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" Width="300px" />
        <GridColumn Field="@nameof(Product.Price)" Width="200px" />
        <GridColumn Field="@nameof(Product.Quantity)" Width="100px" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" Width="300px" />
        <GridColumn Field="@nameof(Product.Discontinued)" Title="Discontinued" Width="100px" />
    </GridColumns>

</TelerikGrid>

@code {
    private void OnCSVAfterExport(GridAfterCsvExportEventArgs args)
    {
        //args.Stream is finalized. The Import() method of the CSVFormatProvider requires a readable stream,
        //so you should copy the stream bytes to a new MemoryStream for the import.
        using MemoryStream importCsvStream = new MemoryStream(args.Stream.ToArray());

        //Create a CSV format provider that imports and exports the CSV file.
        CsvFormatProvider formatProvider = new CsvFormatProvider();

        //The delimiter in the exported CSV file is always a comma,
        //while the CsvFormatProvider assumes it based on the culture.
        //Set the delimiter explicitly to avoid mismatch.
        formatProvider.Settings.Delimiter = ',';

        //Import the stream to a Telerik Workbook
        Workbook workbook = formatProvider.Import(importCsvStream, new TimeSpan(0, 0, 5));

        //Create a new MemoryStream to export the modified Workbook.
        using MemoryStream exportCsvStream = new MemoryStream();

        //Set the desired new CSV delimiter.
        formatProvider.Settings.Delimiter = ';';

        //Export the modified Workbook.
        formatProvider.Export(workbook, exportCsvStream, new TimeSpan(0, 0, 5));

        //Pass the modified Stream to the OnAfterExport event argument.
        args.Stream = exportCsvStream;
    }

    private List<Product>? GridData { get; set; }

    private bool ExportAllPages { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 100).Select(x => new Product
        {
            Id = x,
            Name = $"Product {x}",
            Quantity = x * 2,
            Price = 3.14159m * x,
            Discontinued = x % 4 == 0,
            ReleaseDate = DateTime.Now.AddDays(-x)
        }).ToList();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        public bool Discontinued { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
````

## See Also

* [Format numbers and dates in the exported CSV file from the Grid](slug:grid-kb-number-formatting-of-the-csv-export)
* [Custom cell formatting of the exported file with RadSpreadProcessing](slug:grid-kb-custom-cell-formatting-with-radspreadprocessing)
* [Configure Document Processing Libraries](slug:getting-started-vs-integration-dpl)
