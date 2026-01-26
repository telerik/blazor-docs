---
title: Iterate Spreadsheet Data and Get Cell Values
description: Learn how to iterate the Spreadsheet data cells and get their values as objects or strings.
type: how-to
page_title: How to Iterate Spreadsheet Data and Get Cell Values
slug: spreadsheet-kb-get-cell-values
tags: telerik, blazor, spreadsheet
ticketid: 1661533
res_type: kb
components: ["spreadsheet"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Spreadsheet for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to iterate Spreadsheet cells?
* How to get the Spreadsheet cell values?
* How to obtain the data that users entered in the Blazor Spreadsheet?

## Solution

1. Install the required [Telerik Document Processing NuGet packages](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/getting-started):
    * `Telerik.Documents.Spreadsheet`
    * `Telerik.Documents.Spreadsheet.FormatProviders.OpenXml`
1. Set the [`@ref` attribute of the Spreadsheet](slug:spreadsheet-overview#spreadsheet-reference-and-methods), so that you can call component methods.
1. Use the [`ExportToExcelAsync()` Spreadsheet method](slug:spreadsheet-overview#spreadsheet-reference-and-methods) to get the Excel file as a `byte[]`.
1. Create a `MemoryStream` that contains the Excel file byte array.

    The steps below use the [Telerik RadSpreadProcessing API](https://docs.telerik.com/devtools/document-processing/api/) and are outside the scope of Telerik UI for Blazor.

1. Use an [`XlsxFormatProvider` to import the Excel file as a `Workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/import-and-export-to-excel-file-formats/xlsx/xlsxformatprovider).
1. Get the desired `Worksheet` object from the workbook.
1. Get the desired `CellRange` from the worksheet.
1. [Iterate the cell range](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/iterating-used-cells).
1. Get each cell value (`ICellValue` object), cell value type (`CellValueType` object), and cell format (`CellValueFormat` object) to know more about the cell content.
1. Use `ICellValue.RawValue` or `ICellValue.GetResultValueAsString(CellValueFormat cellFormat)` to obtain the actual cell content.
1. [Excel stores dates as numbers](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/cell-value-types). Use [`FormatHelper.ConvertDoubleToDateTime(Convert.ToDouble(ICellValue.RawValue))`](https://docs.telerik.com/devtools/document-processing/api/telerik.windows.documents.spreadsheet.formatting.formathelper) to retrieve any `DateTime` values.

>caption Iterate the Spreadsheet cells and get their values

<div class="skip-repl"></div>

````RAZOR
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx
@using Telerik.Windows.Documents.Spreadsheet.Formatting
@using Telerik.Windows.Documents.Spreadsheet.Formatting.FormatStrings
@using Telerik.Windows.Documents.Spreadsheet.Model

<p>
    <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                   OnClick="@OnButtonClick">Get Cell Values</TelerikButton>
    <TelerikLoader Visible="@LoaderVisible" />
</p>

<TelerikSpreadsheet @ref="@SpreadsheetRef"
                    Data="@SpreadsheetData"
                    Height="300px">
</TelerikSpreadsheet>

@if (SpreadsheetValues.Any())
{
    <h3>Cell Values</h3>
    <table class="spreadsheet-values">
        @foreach (KeyValuePair<int, List<object?>> row in SpreadsheetValues)
        {
            <tr>
                @foreach (var cell in row.Value)
                {
                    <td>@cell</td>
                }
            </tr>
        }
    </table>

    <h3>Cell Strings</h3>
    <table class="spreadsheet-values">
        @foreach (KeyValuePair<int, List<string>> row in SpreadsheetStrings)
        {
            <tr>
                @foreach (var cell in row.Value)
                {
                    <td>@cell</td>
                }
            </tr>
        }
    </table>
}

<style>
    .spreadsheet-values {
        margin: 1em;
    }

        .spreadsheet-values td {
            border: 1px solid #ccc;
            padding: .2em .4em;
        }
</style>

@code {
    private TelerikSpreadsheet? SpreadsheetRef { get; set; }
    private byte[]? SpreadsheetData { get; set; }

    private bool LoaderVisible { get; set; }

    private Dictionary<int, List<object?>> SpreadsheetValues { get; set; } = new();
    private Dictionary<int, List<string>> SpreadsheetStrings { get; set; } = new();

    private async Task OnButtonClick()
    {
        if (SpreadsheetRef == null)
        {
            return;
        }

        SpreadsheetValues = new();
        SpreadsheetStrings = new();

        LoaderVisible = true;

        // Refresh the UI: https://docs.telerik.com/blazor-ui/components/loader/overview#creating-blazor-loader
        await Task.Delay(1);

        byte[] excelFileToRead = await SpreadsheetRef.ExportToExcelAsync();

        using MemoryStream ms = new MemoryStream(excelFileToRead);

        IWorkbookFormatProvider formatProvider = new XlsxFormatProvider();
        Workbook workbook = formatProvider.Import(ms, new TimeSpan(0, 0, 5));
        Worksheet worksheet = workbook.Worksheets.First();

        CellRange cellRange = worksheet.UsedCellRange;

        for (int rowIndex = cellRange.FromIndex.RowIndex; rowIndex <= cellRange.ToIndex.RowIndex; rowIndex++)
        {
            var rowValues = new List<object?>();
            var rowStringValues = new List<string>();

            for (int columnIndex = cellRange.FromIndex.ColumnIndex; columnIndex <= cellRange.ToIndex.ColumnIndex; columnIndex++)
            {
                CellSelection cell = worksheet.Cells[rowIndex, columnIndex];
                ICellValue cellValue = cell.GetValue().Value;
                CellValueType valueType = cellValue.ValueType;
                CellValueFormat cellFormat = cell.GetFormat().Value;

                if (valueType == CellValueType.Number &&
                    cellFormat.FormatStringInfo.FormatType == FormatStringType.DateTime)
                {
                    // Excel stores dates as numbers.
                    // Excel date format strings differ from .NET format strings.
                    DateTime? actualDateTimeValue = FormatHelper.ConvertDoubleToDateTime(Convert.ToDouble(cellValue.RawValue));

                    rowValues.Add(actualDateTimeValue);
                    rowStringValues.Add(cellValue.GetResultValueAsString(cellFormat));
                }
                else if (valueType == CellValueType.Number)
                {
                    double actualNumericValue = Convert.ToDouble(cellValue.RawValue);

                    rowValues.Add(actualNumericValue);
                    rowStringValues.Add(actualNumericValue.ToString(cellFormat.FormatString));
                }
                else if (valueType == CellValueType.Boolean)
                {
                    bool actualBooleanValue = Convert.ToBoolean(cellValue.RawValue);

                    rowValues.Add(actualBooleanValue);
                    rowStringValues.Add(actualBooleanValue.ToString().ToLowerInvariant());
                }
                else if (valueType == CellValueType.Text || valueType == CellValueType.Empty)
                {
                    rowValues.Add(cellValue.RawValue);
                    rowStringValues.Add(cellValue.RawValue);
                }
            }

            SpreadsheetValues.Add(rowIndex, rowValues);
            SpreadsheetStrings.Add(rowIndex, rowStringValues);
        }

        LoaderVisible = false;
    }

    protected override void OnInitialized()
    {
        SpreadsheetData = Convert.FromBase64String(Base64ExcelSource);

        base.OnInitialized();
    }

    private const string Base64ExcelSource = "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";
}
````

## See Also

* [Spreadsheet Overview](slug:spreadsheet-overview)
* [Spreadsheet Tools](slug:spreadsheet-tools)
