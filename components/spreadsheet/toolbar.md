---
title: Toolbar
page_title: Spreadsheet - Toolbar
description: Description of the Spreadsheet events and event arguments. Complete runnable example with all Spreadsheet events.
slug: spreadsheet-toolbar
tags: telerik,blazor,spreadsheet
published: True
position: 20
---

# Spreadsheet Toolbar

The Telerik Blazor Spreadsheet organizes all its tools in tool sets. This article describes the object types, which comprise a Spreadsheet tool collection, and shows how to use custom tools.


## Built-in Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Class Name | Command Name | Tool Type | Tool Set |
| --- | --- | --- | --- | --- |
| Open | `SpreadsheetOpenFileTool` | `openFile` | Button | File |
| Download | `SpreadsheetDownloadFileTool` | `downloadFile` | Button | File |
| Undo | `SpreadsheetUndoTool` | `undo` | Button | Home |
| Redo | `SpreadsheetRedoTool` | `redo` | Button | Home |
| Font Family | `SpreadsheetFontFamilyTool` | `fontFamily` | DropDownList | Home |
| Font Size | `SpreadsheetFontSizeTool` | `fontSize` | DropDownList | Home |
| Bold | `SpreadsheetBoldTool` | `bold` | Button | Home |
| Italic | `SpreadsheetItalicTool` | `italic` | Button | Home |
| Underline | `SpreadsheetUnderlineTool` | `underline` | Button | Home |
| Text Color | `SpreadsheetTextColorTool` | `color` | ColorPicker | Home |
| Background Color | `SpreadsheetBackgroundColorTool` | `background` | ColorPicker | Home |
| Horizontal Align | `SpreadsheetHorizontalAlignTool` | `textAlign` | DropDownButton | Home |
| Vertical Align | `SpreadsheetVerticalAlignTool` | `verticalAlign` | DropDownButton | Home |
| Text Wrap | `SpreadsheetTextWrapTool` | `wrap` | ToggleButton | Home |
| Number and Date Format | `SpreadsheetNumberFormatTool` | `format` | DropDownButton | Format |
| Insert Link | `SpreadsheetInsertLinkTool` | `insertLink` | Button | Insert |
| Insert Image | `SpreadsheetInsertImageTool` | `insertImage` | Button | Insert |
| Merge Cells | `SpreadsheetMergeCellsTool` | `mergeCells` | DropDownButton | View |

### Auxiliary Tools

| Tool Name | Class Name |
| --- | --- |
| Separator | `SpreadsheetToolSeparator` |
| Button Group | `SpreadsheetButtonGroup` |
| Custom | `SpreadsheetCustomTool` |

### Button Tools

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` |  |
| `CommandName` | `string` |  |
| `Enabled` | `bool` <br /> (`true`) |  |
| `Icon` | `object` |  |
| `OnClick` | `EventCallback<MouseEventArgs>` |  |
| `Title` | `string` |  |

### Button Group Tools

| Property | Type | Description |
| --- | --- | --- |
| `Class` | `string` |  |
| `Enabled` | `bool` <br /> (`true`) |  |
| `SelectionMode` | `ButtonGroupSelectionMode` <br /> (`Multiple`) |  |
| `Tools` | `List<SpreadsheetButtonTool>` |  |
| `Width` | `string` |  |

### ColorPicker Tools

| Property | Type | Description |
| --- | --- | --- |
| `Colors`| `IEnumerable<string>` |  |
| `CommandName` | `string` |  |
| `Enabled` | `bool` <br /> (`true`) |  |
| `Icon` | `object` |  |
| `Title` | `string` |  |
| `Value` | `string` |  |
| `ValueChanged` | `EventCallback<string>` |  |
| `ValueFormat` | `ColorFormat` |  |

### DropDownButton Tools

| Property | Type | Description |
| --- | --- | --- |
| `CommandName` | `string` |  |
| `Data` | `List<SpreadsheetDropDownButtonToolItem>` |  |
| `Enabled` | `bool` <br /> (`true`) |  |
| `Icon` | `object` |  |
| `PopupWidth` | `string` |  |
| `PopupHeight` | `string` |  |
| `Title` | `string` |  |
| `Value` | `string` |  |
| `ValueChanged` | `EventCallback<string>` |  |

### DropDownList Tools

| Property | Type | Description |
| --- | --- | --- |
| `CommandName` | `string` |  |
| `Data` | `List<SpreadsheetDropDownListToolItem>` |  |
| `DefaultText` | `string` |  |
| `Enabled` | `bool` <br /> (`true`) |  |
| `FooterTemplate` | `RenderFragment` | |
| `HeaderTemplate` | `RenderFragment` | |
| `Id` | `string` |  |
| `ItemTemplate` | `RenderFragment<SpreadsheetDropDownListToolItem>` |  |
| `OnChange` | `EventCallback<object>` |  |
| `PopupWidth` | `string` |  |
| `PopupHeight` | `string` |  |
| `Title` | `string` |  |
| `Value` | `string` |  |
| `ValueChanged` | `EventCallback<string>` |  |
| `ValueTemplate` | `RenderFragment<SpreadsheetDropDownListToolItem>` |  |
| `Width` | `string` |  |

### Custom Tools

| Property | Type | Description |
| --- | --- | --- |
| `Template` | `RenderFragment` |  |


## Custom Tools

## Modify the Default Tool Set

>caption Adding custom tools to the default Spreadsheet tool set

````CSHTML
@using Telerik.Blazor.Components.Spreadsheet
@using Telerik.Blazor.Components.Spreadsheet.ToolBar.ToolTypes

<TelerikSpreadsheet ToolSet="@DefaultToolSetWithCustomizations"
                    Width="100%">
</TelerikSpreadsheet>

@code {
    private SpreadsheetToolSet DefaultToolSetWithCustomizations { get; set; } = SpreadsheetToolSets.All;

    private RenderFragment CustomButtonFragment =>
        @<span>
            <TelerikButton Icon="@SvgIcon.Gear"
                            FillMode="@ThemeConstants.Button.FillMode.Flat"
                            OnClick="@OnCustomToolClick" />
        </span>;

    private void OnCustomToolClick()
    {
        Console.WriteLine("Custom Spreadsheet tool clicked.");
    }

    protected override void OnInitialized()
    {
        SpreadsheetToolSetItem? homeToolSet = DefaultToolSetWithCustomizations.Items.FirstOrDefault(x => x.Title == "Home");

        var fontFamily = homeToolSet?.Tools.FirstOrDefault(x => (x as SpreadsheetDropDownListTool)?.CommandName == "fontFamily") as SpreadsheetDropDownListTool;

        if (fontFamily != null)
        {
            // Change the Font Family tool data.
            fontFamily.Data = new List<SpreadsheetDropDownListToolItem>() { new SpreadsheetDropDownListToolItem { Text = "Arial", Value = "Arial" } };
        }

        var wrapTool = homeToolSet?.Tools.FirstOrDefault(x => (x as SpreadsheetButtonTool)?.CommandName == "wrap");

        if (wrapTool != null)
        {
            // Disable the Wrap tool.
            //((SpreadsheetButtonTool)wrapTool).Enabled = false;

            // Or remove it.
            homeToolSet?.Tools.Remove(wrapTool);
        }

        // Add a custom tool.
        homeToolSet?.Tools.Add(new SpreadsheetCustomTool() { Template = CustomButtonFragment });

        base.OnInitialized();
    }
}
````

## Create a Custom Tool Set

>caption Creating a custom tool set collection from scratch

````CSHTML
@using Telerik.Blazor.Components.Spreadsheet

<TelerikSpreadsheet ToolSet="@SpreadsheetCustomToolSet"
                    Width="100%">
</TelerikSpreadsheet>

@code {
    private SpreadsheetToolSet SpreadsheetCustomToolSet { get; set; } = new SpreadsheetToolSet();

    protected override void OnInitialized()
    {
        SpreadsheetCustomToolSet.Items = new List<SpreadsheetToolSetItem>() {
            new SpreadsheetToolSetItem()
            {
                Title = "Custom Tool Set",
                Tools = new List<SpreadsheetTool>() {
                    new SpreadsheetOpenFileTool(),
                    new SpreadsheetDownloadFileTool(),
                    
                    new SpreadsheetToolSeparator(),
                    
                    new SpreadsheetUndoTool(),
                    new SpreadsheetRedoTool(),
                    
                    new SpreadsheetToolSeparator(),
                    
                    new SpreadsheetHorizontalAlignTool(),
                    new SpreadsheetTextWrapTool(),
                    new SpreadsheetNumberFormatTool(),
                    new SpreadsheetInsertLinkTool(),
                    
                    new SpreadsheetToolSeparator(),
                    
                    new SpreadsheetCustomTool() { Template = CustomButtonFragment }
                }
            }
        };

        base.OnInitialized();
    }

    private RenderFragment CustomButtonFragment =>
        @<span>
            <TelerikButton Icon="@SvgIcon.Gear"
                           FillMode="@ThemeConstants.Button.FillMode.Flat"
                           OnClick="@OnCustomToolClick" />
        </span>;

    private void OnCustomToolClick()
    {
        Console.WriteLine("Custom Spreadsheet tool clicked.");
    }
}
````


## See Also

* [Live Demo: Spreadsheet Events](https://demos.telerik.com/blazor-ui/spreadsheet/events)
