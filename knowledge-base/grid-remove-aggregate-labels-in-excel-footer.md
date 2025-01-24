---
title: Remove the "Sum" and "Count" Strings from the Exported Excel File by the Grid
description: Learn how to remove the "Sum" and "Count" strings from the exported Excel file by the Telerik Grid for Blazor. See how to add custom content to the footer cells in the generated Excel file.
type: how-to
page_title: How To Remove the "Sum" and "Count" Strings from the Exported Excel File by the Grid
slug: grid-kb-remove-aggregate-labels-in-excel-footer
tags: blazor, grid, treelist, excel, aggregates
ticketid: 1676757, 1619584, 1610795
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to remove the **Sum:** and **Count:** strings in the Grid footer cells when using Excel export with `GridAggregates`?
* How to get the customized text from the Grid `FooterTemplate` into the Excel download, instead of the aggregate function name itself?
* How to make the exported Grid Excel file match the Grid footer template content?
* How to remove the word **Sum** aggregate label in the footer of Grid when exporting data to Excel? I want to only keep the number in the footer of the Excel file.
* How to customize the footer cell content in the exported Excel file?

## Solution

1. Install the required [Telerik Document Processing NuGet packages](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/getting-started). Note the [version compatibility requirements to avoid conflicts with Telerik UI for Blazor](slug://dpl-kb-version-conflict-detected-telerik-zip).
    * `Telerik.Documents.Spreadsheet`
    * `Telerik.Documents.Spreadsheet.FormatProviders.OpenXml`
1. Subscribe to the [Grid `OnAfterExport` event for Excel export](slug://grid-export-events#onafterexport).
1. In the `OnAfterExport` handler, obtain the generated Excel file as a byte array from the `Stream` property of the [`GridAfterExcelExportEventArgs` event argument](/blazor-ui/api/telerik.blazor.components.gridafterexcelexporteventargs).
1. Create a new `MemoryStream` object and populate it with the Excel file byte array.

    The steps below use the [Telerik RadSpreadProcessing API](https://docs.telerik.com/devtools/document-processing/api/) and are outside the scope of Telerik UI for Blazor.

1. Use an [`XlsxFormatProvider` to `Import()` the Excel file `MemoryStream` as a `Workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/import-and-export-to-excel-file-formats/xlsx/xlsxformatprovider).
1. Get the `Worksheet` object from the `Workbook`.
1. [Find the footer cells by their row and column indexes](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/accessing-cells-of-worksheet), which depend on the exported number of rows and [current Grid column state](slug://grid-kb-column-state). Alternatively, [iterate cell ranges](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/iterating-used-cells).
1. Get each footer cell value (`ICellValue` object) and use `ICellValue.RawValue` to obtain the actual cell content.
1. [Set the modified footer cell values](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/get-set-clear-properties), according to your business requirements. You can remove the predefined aggregate labels or add custom content that is similar to the [Grid `FooterTemplate`](slug://grid-templates-column-footer) content.
1. [`Export()` the modified `Workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/import-and-export-to-excel-file-formats/xlsx/xlsxformatprovider) to a new `MemoryStream` and then to a `byte[]`. Assign the byte array to the `Stream` property of the `GridAfterExcelExportEventArgs` event argument.

>caption Remove aggregate labels from footer cells in the exported Excel file by the Grid

````RAZOR.skip-repl
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx
@using Telerik.Windows.Documents.Spreadsheet.Model

@using Telerik.Blazor.Services
@inject ITelerikStringLocalizer TelerikLocalizer

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             Pageable="true"
             @bind-PageSize="@GridPageSize"
             Reorderable="true">
    <GridAggregates>
        <GridAggregate Field="@nameof(SampleModel.Name)" FieldType="@typeof(string)" Aggregate="@GridAggregateType.Count" />
        <GridAggregate Field="@nameof(SampleModel.Price)" FieldType="@typeof(decimal)" Aggregate="@GridAggregateType.Average" />
        <GridAggregate Field="@nameof(SampleModel.Quantity)" FieldType="@typeof(int)" Aggregate="@GridAggregateType.Sum" />
    </GridAggregates>
    <GridExport>
        <GridExcelExport AllPages="@GridExportAllPages" OnAfterExport="@OnGridAfterExport" />
    </GridExport>
    <GridToolBarTemplate>
        <GridCommandButton Command="ExcelExport">Export To Excel</GridCommandButton>
        <span class="k-separator"></span>
        <label><TelerikCheckBox @bind-Value="@GridExportAllPages" /> &nbsp; Export All Pages</label>
        <span class="k-separator"></span>
        <label><TelerikCheckBox @bind-Value="@GridRemoveAggregateLabelsInExcel" /> &nbsp; Remove Aggregate Labels in Excel File</label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)">
            <FooterTemplate>
                Count: @context.Count?.ToString("N0")
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Price)">
            <FooterTemplate>
                Average: @context.Average?.ToString("N2")
            </FooterTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Quantity)">
            <FooterTemplate>
                Sum: @context.Sum?.ToString("N0")
            </FooterTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<SampleModel>? GridRef { get; set; }
    private List<SampleModel> GridData { get; set; } = new();
    private int GridPageSize { get; set; } = 7;
    private bool GridExportAllPages { get; set; }

    private bool GridRemoveAggregateLabelsInExcel { get; set; } = true;

    private void OnGridAfterExport(GridAfterExcelExportEventArgs args)
    {
        if (!GridRemoveAggregateLabelsInExcel)
        {
            return;
        }

        // args.Stream is finalized, while XlsxFormatProvider.Import() requires a readable stream.
        // Copy the args.Stream bytes to a new MemoryStream for the import.
        byte[] originalBytes = args.Stream.ToArray();
        MemoryStream originalStream = new MemoryStream(originalBytes);

        XlsxFormatProvider formatProvider = new XlsxFormatProvider();
        Workbook workbook = formatProvider.Import(originalStream, new TimeSpan(0, 0, 5));
        Worksheet worksheet = workbook.Worksheets[0];

        // The footer row index depends on the number of data items and exported pages.
        int footerRowIndex = GridExportAllPages ? GridData.Count + 1 : GridPageSize + 1;

        // Cell indexes may depend on column reordering.
        ICollection<GridColumnState> gridColumnStates = GridRef!.GetState().ColumnStates;
        int nameColumnIndex = gridColumnStates.First(x => x.Field == nameof(SampleModel.Name)).Index;
        int priceColumnIndex = gridColumnStates.First(x => x.Field == nameof(SampleModel.Price)).Index;
        int quantityColumnIndex = gridColumnStates.First(x => x.Field == nameof(SampleModel.Quantity)).Index;

        CellSelection nameFooterCell = worksheet.Cells[footerRowIndex, nameColumnIndex];
        string nameFooterValue = nameFooterCell.GetValue().Value.RawValue;
        // Aggregate labels may depend on localization
        nameFooterCell.SetValue(nameFooterValue.Replace($"{TelerikLocalizer["Aggregate_Count"]}: ", ""));
        // Optional bold
        nameFooterCell.SetIsBold(true);

        CellSelection priceFooterCell = worksheet.Cells[footerRowIndex, priceColumnIndex];
        string priceFooterValue = priceFooterCell.GetValue().Value.RawValue;
        priceFooterCell.SetValue(priceFooterValue.Replace($"{TelerikLocalizer["Aggregate_Average"]}: ", ""));
        priceFooterCell.SetIsBold(true);

        CellSelection quantityFooterCell = worksheet.Cells[footerRowIndex, quantityColumnIndex];
        string quantityFooterValue = quantityFooterCell.GetValue().Value.RawValue;
        quantityFooterCell.SetValue(quantityFooterValue.Replace($"{TelerikLocalizer["Aggregate_Sum"]}: ", ""));
        quantityFooterCell.SetIsBold(true);

        // Save modified workbook in a MemoryStream.
        MemoryStream modifiedStream = new MemoryStream();
        formatProvider.Export(workbook, modifiedStream, new TimeSpan(0, 0, 5));

        args.Stream = modifiedStream;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000)
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [Grid Export Events](slug://grid-export-events)
* [Grid Excel Export](slug://grid-export-excel)
* [Telerik Document Processing](slug://dpl-in-blazor)
