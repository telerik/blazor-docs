---
title: Bind Spreadsheet to IEnumerable or JSON
description: Learn how to bind the Telerik Spreadsheet for Blazor to a collection of objects from a JSON or IEnumerable.
type: how-to
page_title: How to Bind Telerik Blazor Spreadsheet to JSON or IEnumerable
slug: spreadsheet-kb-bind-to-json-ienumerable-list-collection
tags: telerik, blazor, spreadsheet
ticketid: 1671569
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Spreadsheet for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

The [Telerik Spreadsheet component for Blazor](slug:spreadsheet-overview) can display data from a byte array (`byte[]`). This KB demonstrates how to bind the Spreadsheet to object data, for example, `IEnumerable`, `List` or any other collection, including deserialized `JSON`.

## Solution

The approach requires [Telerik Document Processing](slug:dpl-in-blazor) to create an [Excel file in memory](https://docs.telerik.com/devtools/document-processing/knowledge-base/generate-excel-files-from-ienumerable-collections) and convert it to a byte array which is compatible with the Spreadsheet component.

1. Install the required [Telerik Document Processing NuGet packages](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/getting-started):
    * `Telerik.Documents.Spreadsheet`
    * `Telerik.Documents.Spreadsheet.FormatProviders.OpenXml`
1. [Create a `Workbook`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-workbooks/create-open-and-save-workbooks) and [add at least one `Worksheet`](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-worksheets/add-remove-worksheets) to it.
1. [Populate the worksheet `Cells` collection](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/accessing-cells-of-worksheet) by row index and column index.
1. (optional) [Set cell styles](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-cells/get-set-clear-properties).
1. (optional) Set [column widths](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/working-with-rows-and-columns/resizing) or [number formats](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/features/number-formats).
1. Use an [`XlsxFormatProvider` to export the Excel file](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/import-and-export-to-excel-file-formats/xlsx/xlsxformatprovider) to a `MemoryStream` and then to a `byte[]` which the Spreadsheet can consume.

<div class="skip-repl"></div>

````RAZOR
@using System.ComponentModel.DataAnnotations
@using System.Reflection

@using Telerik.Documents.Common.Model
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders
@using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx
@using Telerik.Windows.Documents.Spreadsheet.Model

<h1>Bind Spreadsheet to <code>IEnumerable</code></h1>

<h2>Spreadsheet</h2>

<TelerikSpreadsheet Data="@SpreadsheetData" Height="400px" />

<h2>Grid</h2>

<TelerikGrid Data="@GridData" AutoGenerateColumns="true" />

<style>
    h1 {
        font-size: 1.5rem;
    }

    h2 {
        font-size: 1.2rem;
    }
</style>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    private byte[]? SpreadsheetData { get; set; }

    private void CreateExcelFileFromIEnumerable()
    {
        // Create Workbook and sheet.
        var workbook = new Workbook();
        var worksheet = workbook.Worksheets.Add();
        worksheet.Name = "Product Worksheet";

        // Get DisplayName attributes or property names.
        string[] columnTitles = typeof(SampleModel)
            .GetProperties(BindingFlags.Instance | BindingFlags.Public)
            .Select(x => x.GetCustomAttribute<DisplayAttribute>()?.Name ?? x.Name)
            .ToArray();

        // Populate the header cells.
        // If the data cell order is hard-coded, you can hard-code the header titles too.
        for (int i = 0; i < columnTitles.Length; i++)
        {
            worksheet.Cells[0, i].SetValue(columnTitles[i]);
            worksheet.Cells[0, i].SetIsBold(true);
            worksheet.Cells[0, i].SetFontFamily(new ThemableFontFamily("Arial"));
            worksheet.Cells[0, i].SetFontSize(12);
        }

        // Populate the data cells.
        for (int i = 0; i < GridData.Count; i++)
        {
            worksheet.Cells[1 + i, 0].SetValue(GridData[i].Id);
            worksheet.Cells[1 + i, 1].SetValue(GridData[i].Name);
            worksheet.Cells[1 + i, 2].SetValue(GridData[i].Price.ToString());
            worksheet.Cells[1 + i, 3].SetValue(GridData[i].Quantity);

            // Default formats may use different default styles.
            worksheet.Cells[1 + i, 4].SetValue(GridData[i].ReleaseDate);
            worksheet.Cells[1 + i, 4].SetFontFamily(new ThemableFontFamily("Arial"));
            worksheet.Cells[1 + i, 4].SetFontSize(12);

            worksheet.Cells[1 + i, 5].SetValue(GridData[i].OnSale);
        }

        // Autofit all column widths...
        //worksheet.Columns[worksheet.UsedCellRange].AutoFitWidth();

        // OR
        // autofit specific columns...
        //worksheet.Columns[4].AutoFitWidth();

        // OR
        // hard-code all column widths...
        //worksheet.Columns[worksheet.UsedCellRange].SetWidth(new ColumnWidth(100, true));

        // OR
        // hard-code specific column widths...
        worksheet.Columns[0].SetWidth(new ColumnWidth(40, true));
        worksheet.Columns[1].SetWidth(new ColumnWidth(100, true));
        worksheet.Columns[4].SetWidth(new ColumnWidth(100, true));

        // Export the workbook to a MemoryStream.
        IWorkbookFormatProvider formatProvider = new XlsxFormatProvider();
        using MemoryStream ms = new();
        formatProvider.Export(workbook, ms, new TimeSpan(0, 0, 3));

        SpreadsheetData = ms.ToArray();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000),
                ReleaseDate = DateTime.Now.AddDays(-Random.Shared.Next(60, 1000)),
                OnSale = i % 3 == 0
            });
        }

        CreateExcelFileFromIEnumerable();
    }

    public class SampleModel
    {
        public int Id { get; set; }

        [Display(Name = "Product Name")]
        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        [Display(Name = "Release Date")]
        public DateTime ReleaseDate { get; set; }

        [Display(Name = "On Sale")]
        public bool OnSale { get; set; }
    }
}
````

## See Also

* [Create Excel Documents with SpreadProcessing](https://docs.telerik.com/devtools/document-processing/knowledge-base/generate-excel-files-from-ienumerable-collections)
* [Spreadsheet Overview](slug:spreadsheet-overview)
