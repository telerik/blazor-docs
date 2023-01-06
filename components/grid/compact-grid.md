---
title: Grid Size - Compact Grid
page_title: Grid Size | Grid for Blazor
description: Adjust the size and modify the appearance of the Telerik UI for Blazor Grid.
slug: compact-grid
tags: telerik,blazor,grid,size,compact
published: true
position: 20
---

## Grid Size

This feature attempts to address the need for a **Compact Grid**, which renders more items by utilizing the available space, mainly through setting smaller padding in its cells.

To utilize this feature, set the [`Size`](#grid-size) property of the component. It accepts values of type [`ThemeConstants.Grid.Size`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.ThemeConstants.Grid.Size) and the supported values are: 

1. `Small` - Sets the padding of the building blocks of the Grid to **2px 8px**.
1. `Medium` (Default) - Sets the padding of the building blocks of the Grid to **4px 8px**.

Changing the `Size` property affects different building blocks of the component (tables, buttons, inputs, dropdowns, and others). 

> The `Size` option does not affect elements displayed inside a popup (such as [Filter Menu](https://docs.telerik.com/blazor-ui/components/grid/filter/filter-menu), [Column Menu](https://docs.telerik.com/blazor-ui/components/grid/columns/menu)). 


The following example demonstrates how to define the Grid size.

```CSHTML
<TelerikGrid Size="@ThemeConstants.Grid.Size.Small"
             Data="@MyData">
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
	</GridColumns>
</TelerikGrid>

@code {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
```


>Аny components rendered inside templates like elements in [GridToolBar](https://docs.telerik.com/blazor-ui/components/grid/toolbar) and [CommandColumn](https://docs.telerik.com/blazor-ui/components/grid/columns/command).

```CSHTML
<TelerikGrid Size="@ThemeConstants.Grid.Size.Small"
             Data="@MyData">
    <GridToolBar>
        <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Custom Command</GridCommandButton>
    </GridToolBar>
	<GridColumns>
		<GridColumn Field="ID"></GridColumn>
		<GridColumn Field="TheName" Title="Employee Name"></GridColumn>
        <GridCommandColumn>
            <GridCommandButton Size="@ThemeConstants.Button.Size.Small">Custom Command</GridCommandButton>
        </GridCommandColumn>
	</GridColumns>
</TelerikGrid>

@code {
	public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
```