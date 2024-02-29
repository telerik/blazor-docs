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

>caption Blazor Spreadsheet

````CSHML
<TelerikSpreadsheet />

@code {

}
````

## Data Binding


## Events

The various [Spreadsheet events]({%slug spreadsheet-events%}) allow you to implement custom functionality and handle user interactions with the component.


## Spreadsheet Parameters

The table below lists the Spreadsheet parameters. For a full list of the ListBox API members (parameters, methods, and events), check the [Spreadsheet API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpreadsheet-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |

\* `T` is the Spreadsheet model type.


## Spreadsheet Reference and Methods

The Spreadsheet exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Rebind` | Refreshes the Spreadsheet and ensures it displays the current `Data`. [`Rebind` is necessary when the Blazor framework cannot re-render components automatically]({%slug common-features-data-binding-overview%}#refresh-data). |

>caption Spreadsheet reference and method usage

````CSHTML
<TelerikSpreadsheet @ref="@SpreadsheetRef" />

@code {
    private TelerikSpreadsheet<>? SpreadsheetRef { get; set; }
}
````


## Next Steps

* [Configure the Spreadsheet ...]({%slug spreadsheet-overview%})
* [Handle Spreadsheet events]({%slug spreadsheet-events%})

## See Also

* [Live Demo: Spreadsheet](https://demos.telerik.com/blazor-ui/spreadsheet/overview)
* [Spreadsheet API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpreadsheet-1)
