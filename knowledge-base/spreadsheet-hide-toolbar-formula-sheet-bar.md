---
title: Hide Toolbar, Formula Bar, or Sheet Bar in Spreadsheet
description: Learn how to hide the toolbar, formula bar, and sheet bar in the Blazor Spreadsheet component.
type: how-to
page_title: How to Change the Visibility of Spreadsheet Parts in Blazor
slug: spreadsheet-kb-hide-toolbar-formula-sheet-bar
tags: spreadsheet, blazor, toolbar, formula bar, sheet bar, customization, css, visibility
res_type: kb
ticketid: 1676073
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

<TelerikCheckBox Id="showHeader" @bind-Value="@ShowHeader" />
<label for="showHeader">Show Header</label>
<TelerikCheckBox Id="showActionBar" @bind-Value="@ShowActionBar" />
<label for="showActionBar">Show Action Bar</label>
<TelerikCheckBox Id="showSheetsBar" @bind-Value="@ShowSheetsBar" />
<label for="showSheetsBar">Show Sheets Bar</label>

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

    private const string SampleExcelFile = "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";
}
````

## See Also

* [Spreadsheet Overview](slug://spreadsheet-overview)
