---
title: Toolbar
page_title: Grid - Toolbar
description: Use toolbar and custom actions in Grid for Blazor.
slug: components/grid/features/toolbar
tags: telerik,blazor,grid,toolbar
published: True
position: 45
components: ["grid"]
---

# Grid Toolbar

The [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add [custom tools](#custom-tools) or create a [custom toolbar](#custom-toolbar-configuration).

## Built-In Tools

The [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) provides several built-in tools that can be added to the component toolbar. To include a specific tool in the [toolbar configuration](#toolbar-tools-configuration), use the respective tool tags below.

### Command Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Add | `GridToolBarAddTool` | An `Add` command button that fires the [`OnAdd` event](slug:grid-editing-overview#events). |
| AI Assistant | `GridToolBarAIAssistantTool` | A tool that shows an [AI Prompt component](slug:aiprompt-overview) for AI-enabled data operations on the Grid data. See [Grid AI Features](slug:grid-ai-overview) for details and examples. |
| Cancel | `GridToolBarCancelEditTool` | A `Cancel` command button that applies to the row in edit mode and fires [`OnCancel`](slug:grid-editing-overview#events). [`Inline`](slug:grid-editing-inline) or [`Popup`](slug:grid-editing-popup) editing mode is required. |
| CsvExport | `GridToolBarCsvExportTool` | A `CsvExport` command for CSV files that fires the [`OnBeforeExport` event](slug:grid-export-events#onbeforeexport). |
| Delete | `GridToolBarDeleteTool` | A `Delete` command for the selected row that fires [`OnDelete`](slug:grid-editing-overview#events). Row selection and editing are required. |
| Edit | `GridToolBarEditTool` | An `Edit` command button for the selected row that fires [`OnEdit`](slug:grid-editing-overview#events). Row selection and `Inline` or `Popup` editing mode are required. |
| ExcelExport | `GridToolBarExcelExportTool` | An `ExcelExport` command for Excel files that fires the [`OnBeforeExport` event](slug:grid-export-events#onbeforeexport). |
| Filter | `GridToolBarFilterTool` | A toggle button that opens UI for filtering. On desktop screens, it displays a popup with a filter menu; on mobile devices, it renders an `ActionSheet`. The filter component has two views: one for selecting the column to filter, and another for applying the filter to the selected column. The tool also exposes an `Icon` parameter that allows you to override the default icon.  |
| Group | `GridToolBarGroupTool` | A toggle button that opens a list of the groupable columns. Click a column to group by it. On mobile devices, the popup renders as an `ActionSheet`. The tool also exposes an `Icon` parameter that allows you to override the default icon. |
| Save | `GridToolBarSaveEditTool` | A `Save` command button for the row in edit mode that fires [`OnUpdate` or `OnCreate`](slug:grid-editing-overview#events). [`Inline`](slug:grid-editing-inline) or [`Popup`](slug:grid-editing-popup) editing mode is required. |
| Select All | `GridToolBarSelectAllTool` | A checkbox that selects all rows, according to the [Grid Checkbox column](slug:components/grid/columns/checkbox) configuration. |
| Sort | `GridToolBarSortTool` | A toggle button that opens a list of the sortable columns. Click a column to sort by it. On mobile devices, the popup renders as an `ActionSheet`. The tool also exposes an `Icon` parameter that allows you to override the default icon. |
| SearchBox | `GridToolBarSearchBoxTool` | A [searchbox that filters multiple string columns](slug:grid-searchbox) simultaneously. |

The **Edit** command button is disabled if there is no [selected Grid row](slug:grid-selection-row). The **Save** and **Cancel** buttons are disabled when there is no row in edit mode.

### Layout Tools

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Spacer | `GridToolBarSpacerTool` | Consumes the available empty space and pushes the rest of the tools next to one another. When using a [`GridToolBarTemplate`](#custom-toolbar-configuration), you can mimic this tool with `<span class="k-toolbar-spacer"></span>`. |

## Custom Tools

In addition to the built-in tools, the Grid also supports custom tools. Use the `<GridToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Tools Configuration

Add a `<GridToolBar>` tag inside `<TelerikGrid>` to configure a toolbar, for example:

* Arrange the Grid tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>important `<GridToolBar>` and `<GridToolBarTemplate>` cannot be used together in the same Grid instance.

>caption Grid Toolbar Tools

<demo metaUrl="client/grid/toolbar-tools/" height="650"></demo>

## Adaptive Behavior

The Grid Toolbar can show its tools in a dropdown if the available horizontal space is limited. The following requirements apply:

* The Grid must use a `<GridToolBar>` tag. [Custom toolbar configurations](#custom-toolbar-configuration) with `<GridToolBarTemplate>` do not support built-in adaptive behaviors.
* The Grid must use [built-in](#built-in-tools) ToolBar tools. [Custom tools](#custom-tools) do not support built-in adaptive behaviors and may disappear if there is not enough space.

See [ToolBar Tools Configuration](#toolbar-tools-configuration) for an example.

## Custom Toolbar Configuration

Add a `<GridToolBarTemplate>` tag inside `<TelerikGrid>` to configure a custom toolbar. You can add your own HTML and components to create a more complex layout in the Grid header to match your business needs and also `GridCommandButton` instances (read more about the features available in those buttons in the [Command Column](slug:components/grid/columns/command) article).

When using a `<GridToolBarTemplate>`, you need to use the `Tab` key to navigate between the focusable items. This is because the `<GridToolBarTemplate>` allows rendering of custom elements. On the other hand, the `<GridToolBar>` uses the [built-in keyboard navigation](slug:accessibility-overview#keyboard-navigation) through arrow keys.

>caption Custom Grid Toolbar

<demo metaUrl="client/grid/toolbar-custom/" height="650"></demo>

## Next Steps

* [Handle Grid events](slug:grid-events)

## See Also

* [Grid Live Demo](https://demos.telerik.com/blazor-ui/grid/overview)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
