---
title: Overview
page_title: Spreadsheet - Overview
description: The Blazor Spreadsheet component allows users to view and edit tabular data with an Excel-like user experience.
slug: spreadsheet-overview
tags: telerik,blazor,spreadsheet
published: True
position: 0
---

# Blazor Spreadsheet Overview

The Spreadsheet for Blazor enables users to view and edit tabular data with an Excel-like user experience. The component supports cell styling, value formatting, links, images, formulas, and a rich collection of mathematical functions.


## Creating Blazor Spreadsheet

To use the Telerik Spreadsheet for Blazor:

1. Add the `TelerikSpreadsheet` tag.
1. (optional) Set the `Data` parameter to a byte array to load an existing Excel file in Open XML (XLSX) format. [Using other formats is also possible](#spreadsheet-file-format).

>caption Basic Blazor Spreadsheet

````RAZOR
<TelerikSpreadsheet Data="@SpreadsheetData">
</TelerikSpreadsheet>

@code {
    private byte[]? SpreadsheetData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        SpreadsheetData = Convert.FromBase64String(SampleExcelFile);

        // Or, load a file from your file system.
        // Specify the full File namespace or use namespace aliases
        // to avoid ambiguous reference with the Telerik SVG icon File.
        // FileData = System.IO.File.ReadAllBytes("C:\\Documents\\MyWorkbook.xlsx");

        await base.OnInitializedAsync();
    }

    private const string SampleExcelFile = @[template](/_contentTemplates/spreadsheet/sample-files.md#default);
}
````


## Spreadsheet File Format

The Telerik Spreadsheet component loads and exports files in the Open XML SpreadsheetML (XLSX) format. If you want to work with other formats, consider [Telerik Document Processing](slug:dpl-in-blazor). The library includes [different `FormatProvider`s](https://docs.telerik.com/devtools/document-processing/libraries/radspreadprocessing/formats-and-conversion/general-information), which allow you to convert from one format to another. Here are a few possible use cases:

* Convert a CSV or XLS file to XLSX. Then, use the XLSX byte array to set the Spreadsheet `Data` parameter.
* Convert an [exported XLSX file](#spreadsheet-reference-and-methods) to another office document format before saving.
* [Create an XLSX file from `IEnumerable` and pass it to the Spreadsheet](slug:spreadsheet-kb-bind-to-json-ienumerable-list-collection).
* [Read an exported XLSX file and obtain all cell values](slug:spreadsheet-kb-get-cell-values).


## Tools

The Spreadsheet provides built-in tools that perform various actions such as:

* Style the cells
* Format the cell values
* Insert images and links
* Merge cells or toggle the visibility of the cell borders.

You can also add custom tools. Learn how to [configure and customize the Blazor Spreadsheet tools](slug:spreadsheet-tools).


## Functions and Formulas

The Blazor Spreadsheet component supports formulas and a large variety of Excel functions. See the complete list of available [Spreadsheet functions](slug:spreadsheet-functions-formulas).


## Events

The [Spreadsheet events](slug:spreadsheet-events) allow you to implement custom functionality and handle user interactions with the component.


## Spreadsheet Parameters

The table below lists the Spreadsheet parameters. For a full list of the ListBox API members (parameters, methods, and events), check the [Spreadsheet API Reference](slug:Telerik.Blazor.Components.TelerikSpreadsheet).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS classes to render for the `<div class="k-spreadsheet">` element. Use the parameter to [override the theme styles](slug:themes-override) of some or all Spreadsheet instances. |
| `ColumnHeaderHeight` | `double` <br /> (`20`) | The pixel height of the column headers that display the letters A, B, C, and so on. |
| `ColumnsCount` | `int`  <br /> (`50`) | The initial number of columns to render. Users can add and delete columns at runtime. |
| `ColumnWidth` | `double` <br /> (`64`) | The initial pixel width of the columns. |
| `Data` | `byte[]` | The Excel file to display in the Spreadsheet component. |
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Defines if the component will show a built-in [LoaderContainer](slug:loadercontainer-overview) while loading Excel files. |
| `Height` | `string` | The `height` style of the `<div class="k-spreadsheet">` element. The [built-in themes](slug:themes-overview) apply `"600px"` by default. |
| `RowHeaderWidth` | `double` <br /> (`32`) | The pixel width of the row headers that display the row numbers. The default width fits up to 3 digits comfortably. |
| `RowHeight` | `double` <br /> (`20`) | The initial pixel height of the rows. |
| `RowsCount` | `int` <br /> (`200`) | The initial number of rows to render. Users can add and delete rows at runtime. |
| `Tools` | `SpreadsheetToolSet` <br /> (`SpreadsheetToolSets.All`) | The available tabs and tools that users can use to manipulate the Excel file content. The Spreadsheet renders all its tools by default, so the resulting Spreadsheet UI will change in the future. |
| `Width` | `string` | The `width` style of the `<div class="k-spreadsheet">` element. The [built-in CSS themes](slug:themes-overview) apply `"100%"` by default. |


## Spreadsheet Reference and Methods

The Blazor Spreadsheet component exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `ExportToExcelAsync` | Returns the current Spreadsheet Excel file content as `byte[]`. The application can save the file or pass it to [Telerik Document Processing](slug:dpl-in-blazor) for further manipulation. You can also [get the Spreadsheet cell values](slug:spreadsheet-kb-get-cell-values) programmatically. |
| `Rebind` | Refreshes the Spreadsheet and ensures it displays the current `Data`. [`Rebind` is necessary when the Blazor framework cannot re-render components automatically](slug:common-features-data-binding-overview#refresh-data). |
| `Refresh` | Calls `StateHasChanged()` for the Spreadsheet component. |

>caption Using the Spreadsheet reference and methods

````RAZOR
<TelerikSpreadsheet @ref="@SpreadsheetRef">
</TelerikSpreadsheet>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@OnSaveButtonClick">Save Excel File</TelerikButton>

@code {
    private TelerikSpreadsheet? SpreadsheetRef { get; set; }

    private async Task OnSaveButtonClick()
    {
        if (SpreadsheetRef !=null)
        {
            byte[] excelFileToSave = await SpreadsheetRef.ExportToExcelAsync();

            Console.WriteLine($"The Excel file size is {excelFileToSave.Length} bytes.");
        }
    }
}
````


## Next Steps

* [Customize the Spreadsheet tools](slug:spreadsheet-tools)
* [Learn about the supported Spreadsheet functions and formulas](slug:spreadsheet-functions-formulas)
* [Handle Spreadsheet events](slug:spreadsheet-events)


## See Also

* [Live Demo: Spreadsheet](https://demos.telerik.com/blazor-ui/spreadsheet/overview)
* [Spreadsheet API Reference](slug:Telerik.Blazor.Components.TelerikSpreadsheet)
* [Bind Spreadsheet to IEnumerable](slug:spreadsheet-kb-bind-to-json-ienumerable-list-collection)
