---
title: Supported Components
page_title: WebMCP Supported Components
description: Explore all Telerik UI for Blazor components that support WebMCP tools, their available tool commands, and the conditions under which each tool is registered.
slug: web-mcp-supported-components
tags: webmcp, mcp
published: True
position: 5
---

# WebMCP Supported Components

This article lists all Telerik UI for Blazor components that expose WebMCP tools, their default tool names, and the conditions under which each tool is registered.

For general information about the WebMCP API and how to configure tool overrides, see the [WebMCP Tools Overview](slug:web-mcp-overview).

>tip In the tables below, a condition "Always" indicates a tool that is [enabled by default](slug:web-mcp-overview#settings-and-tool-overrides), no matter the component configuration. You can disable such tools by [setting `Enabled="false"`](slug:web-mcp-overview#componentwebmcptool-parameters) for the respective `<ComponentWebMcpTool>` tag and `Command` parameter.

## AutoComplete

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `autocomplete-set-value` | Always |
| `Clear` | `autocomplete-clear` | Always |

## Button

| Tool | Default Name | Condition |
|---|---|---|
| `Click` | `button-click` | Always |

## Calendar

| Tool | Default Name | Condition |
|---|---|---|
| `Navigate` | `calendar-navigate` | Always |
| `SelectDate` | `calendar-select-date` | Always |

## CheckBox

| Tool | Default Name | Condition |
|---|---|---|
| `Toggle` | `checkbox-toggle` | Always |
| `SetValue` | `checkbox-set-value` | Always |

## ColorPicker

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `colorpicker-set-value` | Always |
| `Clear` | `colorpicker-clear` | Always |

## ComboBox

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `combobox-set-value` | Always |
| `Clear` | `combobox-clear` | Always |
| `Open` | `combobox-open` | Always |
| `Close` | `combobox-close` | Always |

## DatePicker

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `datepicker-set-value` | Always |
| `Clear` | `datepicker-clear` | Always |

## DateRangePicker

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `daterangepicker-set-value` | Always |
| `Clear` | `daterangepicker-clear` | Always |

## DateTimePicker

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `datetimepicker-set-value` | Always |
| `Clear` | `datetimepicker-clear` | Always |

## DropDownList

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `dropdownlist-set-value` | Always |
| `Open` | `dropdownlist-open` | Always |
| `Close` | `dropdownlist-close` | Always |

## DropDownTree

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `dropdowntree-set-value` | Always |
| `Clear` | `dropdowntree-clear` | Always |
| `Open` | `dropdowntree-open` | Always |
| `Close` | `dropdowntree-close` | Always |

## Editor

| Tool | Default Name | Condition |
|---|---|---|
| `GetValue` | `editor-get-value` | Always |
| `SetValue` | `editor-set-value` | `ReadOnly == false` |

## Gantt

| Tool | Default Name | Condition |
|---|---|---|
| `Filter` | `gantt-filter` | `FilterMode != GanttFilterMode.None` |
| `ClearFilter` | `gantt-clear-filter` | `FilterMode != GanttFilterMode.None` |
| `Sort` | `gantt-sort` | `Sortable == true` |
| `ClearSort` | `gantt-clear-sort` | `Sortable == true` |
| `ColumnReorder` | `gantt-column-reorder` | `ColumnReorderable == true` |
| `ColumnResize` | `gantt-column-resize` | `ColumnResizable == true` |
| `ChangeView` | `gantt-change-view` | More than one `GanttView` defined |
| `CreateTask` | `gantt-create-task` | `OnCreate` has delegate |
| `DeleteTask` | `gantt-delete-task` | `OnDelete` has delegate |
| `ColumnShow` | `gantt-column-show` | Always |
| `ColumnHide` | `gantt-column-hide` | Always |
| `Expand` | `gantt-expand` | Always |
| `Collapse` | `gantt-collapse` | Always |
| `ExpandAll` | `gantt-expand-all` | Always |
| `CollapseAll` | `gantt-collapse-all` | Always |
| `GetData` | `gantt-get-data` | Disabled by default. Enable explicitly via `<GanttWebMcpTool Command="@GanttWebMcpToolCommand.GetData" Enabled="true" />`. |

## Grid

| Tool | Default Name | Condition |
|---|---|---|
| `Filter` | `grid-filter` | `FilterMode != GridFilterMode.None` |
| `ClearFilter` | `grid-clear-filter` | `FilterMode != GridFilterMode.None` |
| `Sort` | `grid-sort` | `Sortable == true` |
| `ClearSort` | `grid-clear-sort` | `Sortable == true` |
| `Group` | `grid-group` | `Groupable == true` |
| `ClearGroup` | `grid-clear-group` | `Groupable == true` |
| `Page` | `grid-page` | `Pageable == true` |
| `PageSize` | `grid-page-size` | `Pageable == true` and `PageSizes` has values |
| `Select` | `grid-select` | `SelectionMode != GridSelectionMode.None` |
| `ClearSelect` | `grid-clear-select` | `SelectionMode != GridSelectionMode.None` |
| `ColumnReorder` | `grid-column-reorder` | `Reorderable == true` |
| `ColumnResize` | `grid-column-resize` | `Resizable == true` |
| `ExportExcel` | `grid-export-excel` | `<GridExcelExport>` child present |
| `ExportPdf` | `grid-export-pdf` | `<GridPdfExport>` child present |
| `ExportCsv` | `grid-export-csv` | `<GridCsvExport>` child present |
| `Highlight` | `grid-highlight` | Always |
| `ClearHighlight` | `grid-clear-highlight` | Always |
| `ColumnShow` | `grid-column-show` | Always |
| `ColumnHide` | `grid-column-hide` | Always |
| `ColumnLock` | `grid-column-lock` | Always |
| `ColumnUnlock` | `grid-column-unlock` | Always |
| `GetData` | `grid-get-data` | Disabled by default. Enable explicitly via `<GridWebMcpTool Command="@GridWebMcpToolCommand.GetData" Enabled="true" />`. |

## ListBox

| Tool | Default Name | Condition |
|---|---|---|
| `Transfer` | `listbox-transfer` | `ConnectedListBoxId` is set |
| `Reorder` | `listbox-reorder` | `OnReorder` has delegate |

## ListView

| Tool | Default Name | Condition |
|---|---|---|
| `Page` | `listview-page` | `Pageable == true` |
| `Select` | `listview-select` | Always |

## Map

| Tool | Default Name | Condition |
|---|---|---|
| `SetCenter` | `map-set-center` | Always |
| `SetZoom` | `map-set-zoom` | Always |
| `AddMarker` | `map-add-marker` | Always |
| `ClearMarkers` | `map-clear-markers` | Always |

## MaskedTextBox

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `maskedtextbox-set-value` | Always |
| `Clear` | `maskedtextbox-clear` | Always |

## MultiColumnComboBox

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `multicolumncombobox-set-value` | Always |
| `Clear` | `multicolumncombobox-clear` | Always |
| `Open` | `multicolumncombobox-open` | Always |
| `Close` | `multicolumncombobox-close` | Always |

## MultiSelect

| Tool | Default Name | Condition |
|---|---|---|
| `AddValue` | `multiselect-add-value` | Always |
| `RemoveValue` | `multiselect-remove-value` | Always |
| `Clear` | `multiselect-clear` | Always |
| `Open` | `multiselect-open` | Always |
| `Close` | `multiselect-close` | Always |

## NumericTextBox

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `numerictextbox-set-value` | Always |
| `Clear` | `numerictextbox-clear` | Always |
| `Increment` | `numerictextbox-increment` | Always |
| `Decrement` | `numerictextbox-decrement` | Always |

## PanelBar

| Tool | Default Name | Condition |
|---|---|---|
| `Expand` | `panelbar-expand` | Always |
| `Collapse` | `panelbar-collapse` | Always |

## RangeSlider

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `rangeslider-set-value` | Always |

## Rating

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `rating-set-value` | Always |
| `Clear` | `rating-clear` | Always |

## Scheduler

| Tool | Default Name | Condition |
|---|---|---|
| `Create` | `scheduler-create` | `AllowCreate == true` |
| `Delete` | `scheduler-delete` | `AllowDelete == true` |
| `ChangeView` | `scheduler-view` | More than one `SchedulerView` defined |
| `Navigate` | `scheduler-navigate` | Always |

## Slider

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `slider-set-value` | Always |

## Spreadsheet

| Tool | Default Name | Condition |
|---|---|---|
| `SetCell` | `spreadsheet-set-cell` | Always |
| `NavigateSheet` | `spreadsheet-navigate-sheet` | Always |
| `AddSheet` | `spreadsheet-add-sheet` | Always |
| `RenameSheet` | `spreadsheet-rename-sheet` | Always |
| `Export` | `spreadsheet-export` | Always |

## Stepper

| Tool | Default Name | Condition |
|---|---|---|
| `Step` | `stepper-step` | Always |

## Switch

| Tool | Default Name | Condition |
|---|---|---|
| `Toggle` | `switch-toggle` | Always |
| `SetValue` | `switch-set-value` | Always |

## TabStrip

| Tool | Default Name | Condition |
|---|---|---|
| `SelectTab` | `tabstrip-select-tab` | Always |

## TextArea

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `textarea-set-value` | Always |
| `Clear` | `textarea-clear` | Always |

## TextBox

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `textbox-set-value` | Always |
| `Clear` | `textbox-clear` | Always |

## TimePicker

| Tool | Default Name | Condition |
|---|---|---|
| `SetValue` | `timepicker-set-value` | Always |
| `Clear` | `timepicker-clear` | Always |

## TreeList

| Tool | Default Name | Condition |
|---|---|---|
| `Filter` | `treelist-filter` | `FilterMode != TreeListFilterMode.None` |
| `ClearFilter` | `treelist-clear-filter` | `FilterMode != TreeListFilterMode.None` |
| `Sort` | `treelist-sort` | `Sortable == true` |
| `ClearSort` | `treelist-clear-sort` | `Sortable == true` |
| `Select` | `treelist-select` | `SelectionMode != TreeListSelectionMode.None` |
| `ClearSelect` | `treelist-clear-select` | `SelectionMode != TreeListSelectionMode.None` |
| `Page` | `treelist-page` | `Pageable == true` |
| `PageSize` | `treelist-page-size` | `Pageable == true` and `PageSizes` has values |
| `ColumnReorder` | `treelist-column-reorder` | `Reorderable == true` |
| `ColumnResize` | `treelist-column-resize` | `Resizable == true` |
| `ColumnShow` | `treelist-column-show` | Always |
| `ColumnHide` | `treelist-column-hide` | Always |
| `ColumnLock` | `treelist-column-lock` | Always |
| `ColumnUnlock` | `treelist-column-unlock` | Always |
| `Expand` | `treelist-expand` | Always |
| `Collapse` | `treelist-collapse` | Always |
| `ExpandAll` | `treelist-expand-all` | Always |
| `CollapseAll` | `treelist-collapse-all` | Always |
| `GetData` | `treelist-get-data` | Disabled by default. Enable explicitly via `<TreeListWebMcpTool Command="@TreeListWebMcpToolCommand.GetData" Enabled="true" />`. |

## TreeView

| Tool | Default Name | Condition |
|---|---|---|
| `Select` | `treeview-select` | `SelectionMode != TreeViewSelectionMode.None` |
| `Check` | `treeview-check` | `CheckBoxMode != TreeViewCheckBoxMode.None` |
| `Expand` | `treeview-expand` | Always |
| `Collapse` | `treeview-collapse` | Always |
| `Filter` | `treeview-filter` | Always |

## Window

| Tool | Default Name | Condition |
|---|---|---|
| `Open` | `window-open` | Always |
| `Close` | `window-close` | Always |
| `Minimize` | `window-minimize` | Always |
| `Maximize` | `window-maximize` | Always |

## See Also

* [WebMCP Tools Overview](slug:web-mcp-overview)
