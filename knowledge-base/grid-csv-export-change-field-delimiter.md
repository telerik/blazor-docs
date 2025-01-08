---
title: Grid CSV export - change the comma field delimiter
description: How to export the Grid to CSV with a different/custom field delimiter?
type: how-to
page_title: Grid export to CSV - change the default field delimiter (comma)
slug: grid-kb-csv-export-change-field-delimiter
position: 
tags: grid, export, csv, field, delimiter, change, semicolon, comma, custom
ticketid: 1576816
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
I want to change the default field delimiter when exporting the Grid to CSV file. How to set a different list separator?

I want to use a semicolon field delimiter for the exported CSV Grid instead of comma. How to achieve this?

>tip At the time of writing (**UI for Blazor 3.5.0**), the Blazor Grid [does not expose a built-in option for configuring the field delimiter](https://feedback.telerik.com/blazor/1577167-option-to-configure-the-field-delimiter-when-exporting-to-csv). You may vote for the enhancement and follow it to receive status updates.

## Solution

A possible option is to manually modify the exported CSV file before it reaches the client to change the field delimiter.

For that purpose use the [`RadSpreadProcessing`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/overview) library - it allows you to create spreadsheets from scratch, modify existing documents or convert between the most common spreadsheet formats. In this case, we will focus on the [`CsvFormatProvider` which exposes setting to configure the field delimiter](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/settings).

To change the field delimiter, do the following:

1. Install `Telerik.Documents.Spreadsheet.FormatProviders.Xls` package, so you can use the `CsvFormatProvider`

1. Handle the [OnAfterExport](slug://grid-export-events#onafterexport) event of the Grid. The stream it provides is finalized, so that the resource does not leak. Its binary data, however, is available, so you can copy the stream bytes to a new `MemoryStream` instance.

1. Create a `CsvFormatProvider` instance and use it to [import the new `MemoryStream` in a `workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/csvformatprovider#import).

1. Set the desired `Delimiter` through the [settings of the `CsvFormatProvider` instance](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/csv/settings)

1. [Export the modified `workbook` to a `MemoryStream`](https://docs.telerik.com/devtools/document-processing/knowledge-base/import-export-save-load-workbook#save-workbook-to-filestream-or-memorystream).

1. Pass that `MemoryStream` to the `args.Stream` of the `GridAfterCsvExportEventArgs`, so that the modifications can be saved to the actual exported file.

````RAZOR
@*Customize the field delimiter of the exported CSV file*@

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
        //args.Stream is finalized. The Import() method of the CSVFormatProvider requires a readable stream, so you should copy the stream bytes to a new MemoryStream instance which will be used for the import.
        var bytes = args.Stream.ToArray();

        var CSVStream = new MemoryStream(bytes);

        //create a format provider instance to call the import
        CsvFormatProvider formatProvider = new CsvFormatProvider();

        //import the stream to a workbook
        Workbook workbook = formatProvider.Import(CSVStream);

        //create a new MemoryStream to export the modified workbook in
        MemoryStream modifiedExport = new MemoryStream();

        //set the desired delimiter
        formatProvider.Settings.Delimiter = ';';

        //export the modified workbook to a stream
        formatProvider.Export(workbook, modifiedExport);

        //pass the modified stream to the event arguments
        args.Stream = modifiedExport;
    }

    private List<SampleData> GridData { get; set; }

    private bool ExportAllPages { get; set; }

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
  * [Custom cell formatting of the exported file with RadSpreadProcessing](slug://grid-kb-custom-cell-formatting-with-radspreadprocessing)
  * [Configure Document Processing Libraries](slug://getting-started-vs-integration-dpl)

