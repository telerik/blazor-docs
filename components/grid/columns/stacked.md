---
title: Stacked
page_title: Grid - Stacked Columns
description: How to adapt the Grid on small screens and display the values of one data item vertically instead of horizontally.
slug: grid-columns-stacked
tags: telerik,blazor,grid,column,stacked
published: true
position: 37
components: ["grid"]
---

# Stacked Columns

Stacked columns is an adaptive Grid feature that allows the component to display data item values vertically in one or more cards, instead of horizontally in classic table cells. This facilitates browsing the Grid data on narrow screens like mobile phones in portrait orientation.

The Grid stacked columns functionality depends on three configuraton settings:

* The [`DataLayoutMode` parameter](#data-layout-mode) of the Grid.
* The [`ColumnsCount` parameter](#stacked-columns-count) of `<GridStackedLayoutSettings>`.
* The [`Width` parameter](#stacked-columns-width) of each `<GridStackedLayoutColumn>`.

Only the `DataLayoutMode` parameter is required to use stacked Grid columns.

## Data Layout Mode

The show stacked Grid columns, set the `DataLayoutMode` component parameter to `GridDataLayoutMode.Stacked`. The default parameter value is `GridDataLayoutMode.Columns`.

>caption Enable stacked columns in the Grid

````RAZOR.skip-repl
<TelerikGrid DataLayoutMode="@GridDataLayoutMode.Stacked" />
````

## Stacked Columns Count

`ColumnsCount` is a an optional parameter of `<GridStackedLayoutSettings>`, which is a child tag of `<GridSettings>`. The `ColumnsCount` parameter sets how many stacked columns will show. The default value is `1`, which means that all data row values will display one below the other in a single column.

When using multiple stacked columns, the data row values are arranged first horizontally and then vertically. The following code snippet uses 2 stacked columns, so that the odd columns (`Name`, `Quantity` and `IsActive`) display in the first stacked column, while the even columns (`Price`, `StartDate`, and the command buttons) display in the second stacked column.

>caption Display 2 stacked columns in the Grid

````RAZOR.skip-repl
<TelerikGrid DataLayoutMode="@GridDataLayoutMode.Stacked">
    <GridSettings>
        <GridStackedLayoutSettings ColumnsCount="2" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Quantity)" />
        <GridColumn Field="@nameof(Product.StartDate)" />
        <GridColumn Field="@nameof(Product.IsActive)" />
        <GridCommandColumn>
            <GridCommandButton />
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>
````

## Stacked Columns Width

An optional `<GridStackedLayoutColumns>` tag inside `<GridStackedLayoutSettings>` allows you to define custom `Width` for each stacked column (`<GridStackedLayoutColumn>`) when there is more than one. The default width value is `"1fr"`, which means one equal fraction of the available horizontal space. The stacked Grid columns use the [CSS Grid concept](https://css-tricks.com/snippets/css/complete-guide-grid/) for HTML rendering.

> When using `<GridStackedLayoutColumn>` instances, the number of these tags must match the `ColumnsCount` value.

The code snippet below uses 3 stacked columns. The first one is twice as wide as the others.

>caption Set custom widths to the stacked Grid columns

````RAZOR.skip-repl
<GridStackedLayoutSettings ColumnsCount="3">
    <GridStackedLayoutColumns>
        <GridStackedLayoutColumn Width="2fr" />
        <GridStackedLayoutColumn Width="1fr" />
        <GridStackedLayoutColumn Width="1fr" />
    </GridStackedLayoutColumns>
</GridStackedLayoutSettings>

````

## Integration with Other Features

In `Stacked` data layout mode the Grid rendering is different and some features use different UI and UX:

* The Grid does not render column headers. Column features like sorting, filtering, grouping, and locking require [ToolBar command tools](slug:components/grid/features/toolbar#command-tools).
* The Grid does not render a command column. Combine [Grid row selection](slug:grid-selection-row) with [Toolbar command tools for the **Delete**, **Edit**, **Save**, and **Cancel** buttons](slug:components/grid/features/toolbar#command-tools).
* Hierarchy relies on an expand/collapse button, which renders below the stacked table row content.

## Example

The following sample shows how to:

* Enable and disable column stacking, depending on the viewport width.
* Display 1 or 2 stacked columns, depending on the viewport width.
* Render ToolBar tools for column and edit operations only when the Grid is in `Stacked` data layout mode.

>caption Using stacked data layout mode in the Blazor Grid

<demo metaUrl="client/grid/columns-stacked/" height="600"></demo>

## See also

* [Live demo: Adaptive Grid](https://demos.telerik.com/blazor-ui/grid/adaptive)
* [Live demo: Grid and MediaQuery Integration](https://demos.telerik.com/blazor-ui/mediaquery/grid-integration)
