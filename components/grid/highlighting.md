---
title: Highlighting
page_title: Grid Highlighting
slug: grid-highlighting
description: Highlight rows and cells in the Telerik Blazor Grid to draw attention to important data.
tags: telerik,blazor,grid,highlight,highlighting
published: true
position: 40
components: ["grid"]
---

# Blazor Grid Highlighting

The Telerik [Blazor Grid](slug:grid-overview) enables you to highlight rows and cells programmatically. Use highlighting to draw attention to important data, indicate status, or visually group related records. Highlighting does not require user interaction and is fully controlled by the application logic.

## Key Features

* Highlight entire rows by providing a list of data items.
* Highlight individual cells by specifying the data item and column.
* Combine row and cell highlighting.
* Highlighting uses a visual style similar to selection, but does not affect selection state or user interaction.

To see the Grid highlighting in action, check the below [example](#example).

## API Reference

The Grid highlighting feature exposes the following parameters:

* `HighlightedItems`—Highlight entire rows by providing the data items to highlight. The list must contain references to items from the grid's data source, not new instances.
* `HighlightedCells`—Highlight individual cells by specifying both the data item and the column field. Both values must match the Grid data and column definitions.

See [Grid Highlighting API Reference](slug:telerik.blazor.components.HighlightedCellDescriptor) for details about these parameters and the `GridHighlightedCellDescriptor` type.

## Example

>caption Example of highlighting rows and cells in the Blazor Grid

<demo metaUrl="client/grid/highlighting/" height="600"></demo>

## See Also

* [Grid Selection](slug:grid-selection-overview)
* [Highlighting API Reference](slug:telerik.blazor.components.HighlightedCellDescriptor)