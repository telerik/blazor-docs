---
title: Supported Components
page_title: WebMCP Supported Components
description: Explore all Telerik UI for Blazor components that support WebMCP tools, their available tool commands, and the conditions under which each tool is registered.
slug: web-mcp-supported-components
tags: webmcp, mcp
published: True
tag: new
position: 5
---

# WebMCP Supported Components

This article lists all Telerik UI for Blazor components that expose WebMCP tools, their tool conditions, and default tool names.

For general information about the WebMCP API and how to configure tool overrides, see the [WebMCP Tools Overview](slug:web-mcp-overview).

## Data Components

### Grid

The Grid exposes up to 21 tools depending on its configuration.

| Condition | Tool | Default Name |
|---|---|---|
| `FilterMode != GridFilterMode.None` | `Filter` | `grid-filter` |
| | `ClearFilter` | `grid-clear-filter` |
| `Sortable == true` | `Sort` | `grid-sort` |
| | `ClearSort` | `grid-clear-sort` |
| `Groupable == true` | `Group` | `grid-group` |
| | `ClearGroup` | `grid-clear-group` |
| `Pageable == true` | `Page` | `grid-page` |
| `Pageable == true` and `PageSizes` has values | `PageSize` | `grid-page-size` |
| `SelectionMode != GridSelectionMode.None` | `Select` | `grid-select` |
| | `ClearSelect` | `grid-clear-select` |
| `Reorderable == true` | `ColumnReorder` | `grid-column-reorder` |
| `Resizable == true` | `ColumnResize` | `grid-column-resize` |
| `<GridExcelExport>` child present | `ExportExcel` | `grid-export-excel` |
| `<GridPdfExport>` child present | `ExportPdf` | `grid-export-pdf` |
| `<GridCsvExport>` child present | `ExportCsv` | `grid-export-csv` |
| Always | `Highlight` | `grid-highlight` |
| | `ClearHighlight` | `grid-clear-highlight` |
| | `ColumnShow` | `grid-column-show` |
| | `ColumnHide` | `grid-column-hide` |
| | `ColumnLock` | `grid-column-lock` |
| | `ColumnUnlock` | `grid-column-unlock` |
| Explicitly enabled via `<GridWebMcpTool>` | `GetData` | `grid-get-data` |

### TreeList

The TreeList exposes up to 18 tools. It includes hierarchy-specific tools such as expand and collapse.

| Condition | Tool | Default Name |
|---|---|---|
| `FilterMode != TreeListFilterMode.None` | `Filter` | `treelist-filter` |
| | `ClearFilter` | `treelist-clear-filter` |
| `Sortable == true` | `Sort` | `treelist-sort` |
| | `ClearSort` | `treelist-clear-sort` |
| `SelectionMode != TreeListSelectionMode.None` | `Select` | `treelist-select` |
| | `ClearSelect` | `treelist-clear-select` |
| `Pageable == true` | `Page` | `treelist-page` |
| `Pageable == true` and `PageSizes` has values | `PageSize` | `treelist-page-size` |
| `Reorderable == true` | `ColumnReorder` | `treelist-column-reorder` |
| `Resizable == true` | `ColumnResize` | `treelist-column-resize` |
| Always | `ColumnShow` | `treelist-column-show` |
| | `ColumnHide` | `treelist-column-hide` |
| | `ColumnLock` | `treelist-column-lock` |
| | `ColumnUnlock` | `treelist-column-unlock` |
| | `Expand` | `treelist-expand` |
| | `Collapse` | `treelist-collapse` |
| | `ExpandAll` | `treelist-expand-all` |
| | `CollapseAll` | `treelist-collapse-all` |
| Explicitly enabled via `<TreeListWebMcpTool>` | `GetData` | `treelist-get-data` |

### Gantt

The Gantt exposes up to 15 tools for task management, hierarchy control, and view switching.

| Condition | Tool | Default Name |
|---|---|---|
| `FilterMode != GanttFilterMode.None` | `Filter` | `gantt-filter` |
| | `ClearFilter` | `gantt-clear-filter` |
| `Sortable == true` | `Sort` | `gantt-sort` |
| | `ClearSort` | `gantt-clear-sort` |
| `ColumnReorderable == true` | `ColumnReorder` | `gantt-column-reorder` |
| `ColumnResizable == true` | `ColumnResize` | `gantt-column-resize` |
| More than one `GanttView` defined | `ChangeView` | `gantt-change-view` |
| `OnCreate` has delegate | `CreateTask` | `gantt-create-task` |
| `OnDelete` has delegate | `DeleteTask` | `gantt-delete-task` |
| Always | `ColumnShow` | `gantt-column-show` |
| | `ColumnHide` | `gantt-column-hide` |
| | `Expand` | `gantt-expand` |
| | `Collapse` | `gantt-collapse` |
| | `ExpandAll` | `gantt-expand-all` |
| | `CollapseAll` | `gantt-collapse-all` |
| Explicitly enabled via `<GanttWebMcpTool>` | `GetData` | `gantt-get-data` |

### Spreadsheet

The Spreadsheet exposes 5 tools that are always registered.

| Tool | Default Name |
|---|---|
| `SetCell` | `spreadsheet-set-cell` |
| `NavigateSheet` | `spreadsheet-navigate-sheet` |
| `AddSheet` | `spreadsheet-add-sheet` |
| `RenameSheet` | `spreadsheet-rename-sheet` |
| `Export` | `spreadsheet-export` |

## Scheduling

### Scheduler

The Scheduler exposes up to 4 tools for event management and view navigation.

| Condition | Tool | Default Name |
|---|---|---|
| `AllowCreate == true` | `Create` | `scheduler-create` |
| `AllowDelete == true` | `Delete` | `scheduler-delete` |
| More than one `SchedulerView` defined | `ChangeView` | `scheduler-view` |
| Always | `Navigate` | `scheduler-navigate` |

### Calendar

The Calendar exposes 2 tools that are always registered.

| Tool | Default Name |
|---|---|
| `Navigate` | `calendar-navigate` |
| `SelectDate` | `calendar-select-date` |

## Editors

### Editor

The Editor exposes up to 2 tools for reading and writing HTML content.

| Condition | Tool | Default Name |
|---|---|---|
| Always | `GetValue` | `editor-get-value` |
| `ReadOnly == false` | `SetValue` | `editor-set-value` |

## Navigation and Layout

### TreeView

The TreeView exposes up to 5 tools for node interaction.

| Condition | Tool | Default Name |
|---|---|---|
| `SelectionMode != TreeViewSelectionMode.None` | `Select` | `treeview-select` |
| `CheckBoxMode != TreeViewCheckBoxMode.None` | `Check` | `treeview-check` |
| Always | `Expand` | `treeview-expand` |
| | `Collapse` | `treeview-collapse` |
| | `Filter` | `treeview-filter` |

### PanelBar

The PanelBar exposes 2 tools that are always registered.

| Tool | Default Name |
|---|---|
| `Expand` | `panelbar-expand` |
| `Collapse` | `panelbar-collapse` |

### TabStrip

The TabStrip exposes 1 tool that is always registered.

| Tool | Default Name |
|---|---|
| `SelectTab` | `tabstrip-select-tab` |

The `SelectTab` tool accepts either `index` (0-based tab index) or `title` (case-insensitive tab title). When `title` is provided, it takes precedence over `index`.

### Stepper

The Stepper exposes 1 tool that is always registered.

| Tool | Default Name |
|---|---|
| `Step` | `stepper-step` |

### Window

The Window exposes 4 tools that are always registered.

| Tool | Default Name |
|---|---|
| `Open` | `window-open` |
| `Close` | `window-close` |
| `Minimize` | `window-minimize` |
| `Maximize` | `window-maximize` |

## Lists

### ListBox

The ListBox exposes up to 2 tools depending on its configuration.

| Condition | Tool | Default Name |
|---|---|---|
| `ConnectedListBoxId` is set | `Transfer` | `listbox-transfer` |
| `OnReorder` has delegate | `Reorder` | `listbox-reorder` |

### ListView

The ListView exposes up to 2 tools depending on its configuration.

| Condition | Tool | Default Name |
|---|---|---|
| `Pageable == true` | `Page` | `listview-page` |
| Always | `Select` | `listview-select` |

## Maps

### Map

The Map exposes 4 tools that are always registered. Map tools execute directly on the Kendo Map widget in JavaScript - no C# round-trip is needed.

`AddMarker` creates markers in a dedicated MCP marker layer, separate from user-defined marker layers. `ClearMarkers` removes only markers from the MCP layer.

| Tool | Default Name |
|---|---|
| `SetCenter` | `map-set-center` |
| `SetZoom` | `map-set-zoom` |
| `AddMarker` | `map-add-marker` |
| `ClearMarkers` | `map-clear-markers` |

## Button

The Button exposes 1 tool that is always registered.

| Tool | Default Name |
|---|---|
| `Click` | `button-click` |

## Input Components

Input components use a simplified API. Only the `EnableWebMcpTools` parameter is needed - no `<Settings>` or `<Tool>` child components are required. All tools are always registered when `EnableWebMcpTools="true"`.

Every tool name follows the `{component}-{action}` pattern.

### Text and Value Inputs

| Component | Tools |
|---|---|
| TextBox | `textbox-set-value`, `textbox-clear` |
| TextArea | `textarea-set-value`, `textarea-clear` |
| MaskedTextBox | `maskedtextbox-set-value`, `maskedtextbox-clear` |
| AutoComplete | `autocomplete-set-value`, `autocomplete-clear` |
| DatePicker | `datepicker-set-value`, `datepicker-clear` |
| TimePicker | `timepicker-set-value`, `timepicker-clear` |
| DateTimePicker | `datetimepicker-set-value`, `datetimepicker-clear` |
| DateRangePicker | `daterangepicker-set-value`, `daterangepicker-clear` |
| Rating | `rating-set-value`, `rating-clear` |
| ColorPicker | `colorpicker-set-value`, `colorpicker-clear` |

### Dropdowns

| Component | Tools |
|---|---|
| ComboBox | `combobox-set-value`, `combobox-clear`, `combobox-open`, `combobox-close` |
| MultiColumnComboBox | `multicolumncombobox-set-value`, `multicolumncombobox-clear`, `multicolumncombobox-open`, `multicolumncombobox-close` |
| DropDownList | `dropdownlist-set-value`, `dropdownlist-open`, `dropdownlist-close` |
| DropDownTree | `dropdowntree-set-value`, `dropdowntree-clear`, `dropdowntree-open`, `dropdowntree-close` |
| MultiSelect | `multiselect-add-value`, `multiselect-remove-value`, `multiselect-clear`, `multiselect-open`, `multiselect-close` |

### NumericTextBox

| Component | Tools |
|---|---|
| NumericTextBox | `numerictextbox-set-value`, `numerictextbox-clear`, `numerictextbox-increment`, `numerictextbox-decrement` |

### Toggle Inputs

| Component | Tools |
|---|---|
| Switch | `switch-toggle`, `switch-set-value` |
| CheckBox | `checkbox-toggle`, `checkbox-set-value` |

### Range Inputs

| Component | Tools |
|---|---|
| Slider | `slider-set-value` |
| RangeSlider | `rangeslider-set-value` |

## See Also

* [WebMCP Tools Overview](slug:web-mcp-overview)
