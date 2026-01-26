---
title: Hide Toolbar, Formula Bar, or Sheet Bar in Spreadsheet
description: Learn how to hide the toolbar, formula bar, and sheet bar in theTelerik Spreadsheet component for Blazor.
type: how-to
page_title: How to Change the Visibility of Spreadsheet Parts in Blazor
slug: spreadsheet-kb-hide-toolbar-formula-sheet-bar
tags: spreadsheet, blazor, toolbar, formula bar, sheet bar, css, visibility
res_type: kb
ticketid: 1676073
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

I want to display only the spreadsheet portion and hide the toolbar, formula bar, and sheet bars in the Spreadsheet component.

## Solution

To change the visibility of the toolbar, formula bar, and sheet bar in the Spreadsheet for Blazor, apply conditional CSS classes to hide the respective components.

>caption This approach is applicable only if the app can trust its users not to show back the tools through the browser console.

````RAZOR
<style>
    .hide-header .k-spreadsheet-header {
        display: none;
    }

    .hide-action-bar .k-spreadsheet-action-bar {
        display: none;
    }

    .hide-sheets-bar .k-spreadsheet-sheets-bar {
        display: none;
    }
</style>

<label for="showHeader"><TelerikCheckBox Id="showHeader" @bind-Value="@ShowHeader" />Show Header</label>
<label for="showActionBar"><TelerikCheckBox Id="showActionBar" @bind-Value="@ShowActionBar" />Show Action Bar</label>
<label for="showSheetsBar"><TelerikCheckBox Id="showSheetsBar" @bind-Value="@ShowSheetsBar" />Show Sheets Bar</label>

<TelerikSpreadsheet Data="@SpreadsheetData"
                    Class="@SpreadsheetClass">
</TelerikSpreadsheet>

@code {
    private byte[]? SpreadsheetData { get; set; }
    private bool ShowHeader { get; set; }
    private bool ShowActionBar { get; set; }
    private bool ShowSheetsBar { get; set; }

    // Dynamically generate the class based on the checkbox states
    private string SpreadsheetClass => $"{(ShowHeader ? "" : "hide-header")} " +
                                       $"{(ShowActionBar ? "" : "hide-action-bar")} " +
                                       $"{(ShowSheetsBar ? "" : "hide-sheets-bar")}";

    protected override async Task OnInitializedAsync()
    {
        SpreadsheetData = Convert.FromBase64String(SampleExcelFile);

        // Or, load a file from your file system.
        // Specify the full File namespace or use namespace aliases
        // to avoid ambiguous reference with the Telerik SVG icon File.
        // FileData = System.IO.File.ReadAllBytes("C:\\Documents\\MyWorkbook.xlsx");

        await base.OnInitializedAsync();
    }

    private const string SampleExcelFile = "";
}
````

## See Also

* [Spreadsheet Overview](slug:spreadsheet-overview)
