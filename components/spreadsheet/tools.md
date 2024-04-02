---
title: Tools
page_title: Spreadsheet - Tools
description: Learn about the built-in Spreadsheet tool sets and tools. Customize the built-in tools and implement custom tools.
slug: spreadsheet-tools
tags: telerik,blazor,spreadsheet
published: True
position: 20
---

# Spreadsheet Tools

The Telerik Blazor Spreadsheet organizes all its tools in a tool set with one or more tool set items. This article describes the built-in Spreadsheet tools and how to define custom tools.

>caption In this article:

* [What are the building blocks of the Spreadsheet tool set](#tool-set)
* [What are the built-in Spreadsheet tools](#built-in-tools)
* [How to customize a built-in tool set](#customize-built-in-tool-sets)
* [How to define a custom tool set](#create-a-custom-tool-set)
* [How to create a custom tool](#define-custom-tools)


## Tool Set

The top of the Spreadsheet component displays a Menu and a ToolBar:

* The Menu and the ToolBar make up the Spreadsheet **tool set** (`SpreadsheetToolSet`).
* The **tool set** has an `Items` property and includes one or more **tool set items** (`SpreadsheetToolSetItem`).
* Each **tool set item** includes one or more **tools** (`SpreadsheetTool`).

The `SpreadsheetToolSetItem` class has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Type | Description |
| --- | --- | --- |
| `Title` | `string` | The tool set name. Regard this as a single Menu item. |
| `Tools` | `List<SpreadsheetTool>` | The collection of tools in the tool set item. Regard this collection as one TooBar instance. |

The Spreadsheet provides ready-to-use `SpreadsheetToolSet` objects, for example, `SpreadsheetToolSets.All`. A tool set provides a specific distribution and order of tools across tool set items. However, each tool can exist in any tool set item.


## Built-in Tools

The following table lists all Spreadsheet tools, sorted by their default tool set and order index.

| Tool Name | Class Name | Default Tool Set |
| --- | --- | --- |
| Open | `SpreadsheetOpenFileTool` | File |
| Download | `SpreadsheetDownloadFileTool` | File |
| Undo | `SpreadsheetUndoTool` Home |
| Redo | `SpreadsheetRedoTool` | Home |
| Font Family | `SpreadsheetFontFamilyTool` | Home |
| Font Size | `SpreadsheetFontSizeTool` | Home |
| Bold | `SpreadsheetBoldTool` | Home |
| Italic | `SpreadsheetItalicTool` | Home |
| Underline | `SpreadsheetUnderlineTool` | Home |
| Text Color | `SpreadsheetTextColorTool` | Home |
| Background Color | `SpreadsheetBackgroundColorTool` | Home |
| Horizontal Align | `SpreadsheetHorizontalAlignTool` | Home |
| Vertical Align | `SpreadsheetVerticalAlignTool` | Home |
| Text Wrap | `SpreadsheetTextWrapTool` | Home |
| Number and Date Format | `SpreadsheetNumberFormatTool` | Format |
| Insert Link | `SpreadsheetInsertLinkTool` | Insert |
| Insert Image | `SpreadsheetInsertImageTool` | Insert |
| Merge Cells | `SpreadsheetMergeCellsTool` | View |

### Additional Tools

The Spreadsheet component provides a few tools that have no specific action:

| Tool Name | Class Name | Description |
| --- | --- | --- |
| Separator | `SpreadsheetToolSeparator` | The Separator tool inserts a visible border between other tools in the same tool set.  |
| Custom | `SpreadsheetCustomTool` | The Custom tool allows you to add custom content to a Spreadsheet tool set. |


## Customize Built-in Tool Sets

The example below shows how to:

* Get the **Home** tool set item. The built-in tool set items are distinguishable by their `Title`. The title can change in localized applications, so you may need to use the [`ITelerikStringLocalizer` service]({%slug globalization-localization%}) to search for the localized `Title` string.
* Obtain reference to a few built-in tools inside the **Home** tool set item. You can find tools by their type or order index. Using order index is not future-proof, as the built-in tool sets can change.
* Set the `Data` property of the **Font Family** and **Font Size** tools to change the available drop down options.
* Set the `Colors` property of the **Text Color** and **Background Color** tools to change the available color palettes.
* Disable or remove the **Text Wrap** tool.

>caption Customizing tools from the default Spreadsheet tool set

````CSHTML
@inject ITelerikStringLocalizer Localizer

@using Telerik.Blazor.Components.Spreadsheet
@using Telerik.Blazor.Components.Spreadsheet.ToolBar.ToolTypes
@using Telerik.Blazor.Resources
@using Telerik.Blazor.Services

<TelerikSpreadsheet ToolSet="@DefaultToolSetWithCustomizations"
                    Width="100%">
</TelerikSpreadsheet>

@code {
    private SpreadsheetToolSet DefaultToolSetWithCustomizations { get; set; } = SpreadsheetToolSets.All;

    protected override void OnInitialized()
    {
        // This code finds the built-in Home tab by its localized title.
        // You can hard-code the title string (for example, "Home"), if the application is using just one language.
        SpreadsheetToolSetItem? homeToolSet = DefaultToolSetWithCustomizations.Items
            .FirstOrDefault(x => x.Title == Localizer[nameof(Messages.Spreadsheet_ToolBar_HomeMenu)]);

        var fontFamilyTool = homeToolSet?.Tools.FirstOrDefault(x => x is SpreadsheetFontFamilyTool) as SpreadsheetFontFamilyTool;

        if (fontFamilyTool != null)
        {
            // Change the Font Family tool data.
            fontFamilyTool.Data = new List<SpreadsheetDropDownListToolItem>()
            {
                new SpreadsheetDropDownListToolItem { Text = "Arial", Value = "Arial" },
                new SpreadsheetDropDownListToolItem { Text = "Helvetica", Value = "Helvetica" },
                new SpreadsheetDropDownListToolItem { Text = "Tahoma", Value = "Tahoma" },
                new SpreadsheetDropDownListToolItem { Text = "Verdana", Value = "Verdana" }
            };
        }

        var fontSizeTool = homeToolSet?.Tools.FirstOrDefault(x => x is SpreadsheetFontSizeTool) as SpreadsheetFontSizeTool;

        if (fontSizeTool != null)
        {
            // Change the Font Size tool data.
            fontSizeTool.Data = new List<SpreadsheetDropDownListToolItem>()
            {
                new SpreadsheetDropDownListToolItem { Text = "12px", Value = "12px" },
                new SpreadsheetDropDownListToolItem { Text = "16px", Value = "16px" },
                new SpreadsheetDropDownListToolItem { Text = "24px", Value = "24px" },
                new SpreadsheetDropDownListToolItem { Text = "36px", Value = "36px" }
            };
        }

        var textColorTool = homeToolSet?.Tools.FirstOrDefault(x => x is SpreadsheetTextColorTool) as SpreadsheetTextColorTool;

        if (textColorTool != null)
        {
            // Change the Text Color tool palette.
            textColorTool.Colors = ColorPalettePresets.Basic;
        }

        var backgroundColorTool = homeToolSet?.Tools.FirstOrDefault(x => x is SpreadsheetTextColorTool) as SpreadsheetTextColorTool;

        if (backgroundColorTool != null)
        {
            // Change the Background Color tool palette.
            backgroundColorTool.Colors = ColorPalettePresets.Office;
        }

        var wrapTool = homeToolSet?.Tools.FirstOrDefault(x => x is SpreadsheetTextWrapTool) as SpreadsheetTextWrapTool;

        if (wrapTool != null)
        {
            // Disable the Wrap tool.
            //wrapTool.Enabled = false;

            // Or remove the Wrap tool.
            homeToolSet?.Tools.Remove(wrapTool);
        }

        base.OnInitialized();
    }
}
````

## Create a Custom Tool Set

The example below shows how to define a custom tool set from scratch. You can also [set the available properties of each tool](#customize-built-in-tool-sets), such as `Class`, `Enabled`, `Icon`, and `Title`.

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
        SpreadsheetCustomToolSet.Items = new List<SpreadsheetToolSetItem>()
        {
            new SpreadsheetToolSetItem()
            {
                Title = "Custom Tool Set",
                Tools = new List<SpreadsheetTool>()
                {
                    new SpreadsheetOpenFileTool(),
                    new SpreadsheetDownloadFileTool(),

                    new SpreadsheetToolSeparator(),

                    new SpreadsheetUndoTool(),
                    new SpreadsheetRedoTool(),

                    new SpreadsheetToolSeparator(),

                    new SpreadsheetHorizontalAlignTool(),
                    new SpreadsheetTextWrapTool(),
                    new SpreadsheetNumberFormatTool(),
                    new SpreadsheetInsertLinkTool()
                }
            }
        };

        base.OnInitialized();
    }
}
````


## Define Custom Tools

The `SpreadsheetCustomTool` type has a `Template` property that is a RenderFragment. Generally, custom tools can perform do one of the following:

* Perform actions that relate to the Spreadsheet component, loaded Excel document, or app business logic.
* Modify the Excel document programmatically with the help of [RadSpreadProcessing]({%slug spreadprocessing-overview%}).

>caption Creating custom Spreadsheet tools

````CSHTML
@using Telerik.Blazor.Components.Spreadsheet

<TelerikSpreadsheet Data="@SpreadsheetData"
                    ToolSet="@SpreadsheetToolSetWithCustomTool"
                    Width="100%">
</TelerikSpreadsheet>

@code {
    private byte[]? SpreadsheetData { get; set; }

    private SpreadsheetToolSet SpreadsheetToolSetWithCustomTool { get; set; } = SpreadsheetToolSets.All;

    protected override void OnInitialized()
    {
        SpreadsheetToolSetItem fileToolSetItem = SpreadsheetToolSetWithCustomTool.Items.First();

        // Add a custom tool to the first tool set item
        fileToolSetItem.Tools.Add(new SpreadsheetCustomTool()
        {
            Template = CustomToolFragment
        });

        base.OnInitialized();
    }

    private RenderFragment CustomToolFragment =>
        @<TelerikButton Icon="@SvgIcon.FileExcel"
                        ButtonType="@ButtonType.Button"
                        ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                        Title="Load Excel Template"
                        FillMode="@ThemeConstants.Button.FillMode.Flat"
                        OnClick="@OnCustomToolClick">
        </TelerikButton>;

    private void OnCustomToolClick()
    {
        SpreadsheetData = Convert.FromBase64String(SampleExcelFile);
    }

    private string SampleExcelFile = @[template](/_contentTemplates/spreadsheet/sample-files.md#default);
}
````


## See Also

* [Live Demo: Spreadsheet Events](https://demos.telerik.com/blazor-ui/spreadsheet/events)
