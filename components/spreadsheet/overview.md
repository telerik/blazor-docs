---
title: Overview
page_title: Spreadsheet - Overview
description: Overview of the Spreadsheet for Blazor and its features and parameters.
slug: spreadsheet-overview
tags: telerik,blazor,spreadsheet
published: True
position: 0
---

# Blazor Spreasheet Overview

The <a href = "https://www.telerik.com/blazor-ui/spreadsheet" target="_blank">Spreadsheet for Blazor</a> is ...


## Creating Blazor Spreadsheet

To use a Telerik Spreadsheet for Blazor:

1. Add the `TelerikSpreadsheet` tag.
1. (optional) Set the `Data` parameter to a byte array to load an existing Excel file.
1. (optional) Set the `Width` parameter to a [valid CSS unit]({%slug common-features/dimensions%}). The default component width is `"800px"`.

>caption Basic Blazor Spreadsheet

````CSHML
<TelerikSpreadsheet @ref="@SpreadsheetRef"
                    Data="@SpreadsheetData"
                    Width="100%">
</TelerikSpreadsheet>

@code {
    private byte[]? SpreadsheetData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        SpreadsheetData = Convert.FromBase64String(SampleExcelFile);

        await base.OnInitializedAsync();
    }

    private const string SampleExcelFile = @[template](/_contentTemplates/spreadsheet/sample-files.md#default);
}
````


## Tools

The Spreadsheet provides built-in tools that style the cells, format the cell values, insert images and links, and merge cells. You can also add custom tools. Learn how to [configure and customize the Blazor Spreadsheet tools]({%slug spreadsheet-tools%}).


## Functions and Formulas

The Spreadsheet support formulas and a large variety of functions. See the complete list of available [Spreadsheet function names and descriptions]({%slug spreadsheet-functions-formulas%}).


## Events

The various [Spreadsheet events]({%slug spreadsheet-events%}) allow you to implement custom functionality and handle user interactions with the component.


## Spreadsheet Parameters

The table below lists the Spreadsheet parameters. For a full list of the ListBox API members (parameters, methods, and events), check the [Spreadsheet API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpreadsheet).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | The custom CSS classes to render in the `<div class="k-spreadsheet">` element. |
| `ColumnHeaderHeight` | `double` <br /> (`20`) | The pixel height of the column headers that display the letters A, B, C, etc. |
| `ColumnsCount` | `int`  <br /> (`50`) | The initial number of columns to render. Users can add and delete columns at runtime. |
| `ColumnWidth` | `double` <br /> (`64`) | The initial pixel width of the columns. |
| `Data` | `byte[]` | The Excel file to display in the Spreadsheet component. |
| `EnableLoaderContainer` | `bool` <br /> (`true`) | Defines if the component will show a built-in [LoaderContainer]({%slug loadercontainer-overview%}) while loading Excel files. |
| `Height` | `string` | The `height` style of the `<div class="k-spreadsheet">` element. The [built-in themes]({%slug general-information/themes%}) apply `"600px"` by default. |
| `RowHeaderWidth` | `double` <br /> (`32`) | The pixel width of the row headers that display the row numbers. The default width fits up to 3 digits comfortably. |
| `RowHeight` | `double` <br /> (`20`) | The initial pixel height of the rows. |
| `RowsCount` | `int` <br /> (`200`) | The initial number of rows to render. Users can add and delete rows at runtime. |
| `ToolSet` | `SpreadsheetToolSet` <br /> (`SpreadsheetToolSets.All`) | The available tabs and tools that users can use to manipulate the Excel file content. The Spreadsheet renders all its tools by default, so the resulting Spreadsheet UI will change in the future. |
| `Width` | `string` | The `width` style of the `<div class="k-spreadsheet">` element. The [built-in themes]({%slug general-information/themes%}) apply `"800px"` by default. |


## Spreadsheet Reference and Methods

The Spreadsheet exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `ExportToExcelAsync` | Returns the current Spreadsheet Excel file content as `byte[]`. | 
| `Rebind` | Refreshes the Spreadsheet and ensures it displays the current `Data`. [`Rebind` is necessary when the Blazor framework cannot re-render components automatically]({%slug common-features-data-binding-overview%}#refresh-data). |
| `Refresh` | Calls `StateHasChanged()` for the Spreadsheet component. |

>caption Using the Spreadsheet reference and methods

````CSHTML
<TelerikSpreadsheet @ref="@SpreadsheetRef"
                    Width="100%">
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

            Console.WriteLine($"The Excel file size is {newExcelFile.Length} bytes.");
        }
    }
}
````


## Next Steps

* [Customize the Spreadsheet tools]({%slug spreadsheet-tools%})
* [Learn about the supported Spreadsheet functions and formulas]({%slug spreadsheet-functions-formulas%})
* [Handle Spreadsheet events]({%slug spreadsheet-events%})


## See Also

* [Live Demo: Spreadsheet](https://demos.telerik.com/blazor-ui/spreadsheet/overview)
* [Spreadsheet API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpreadsheet)
