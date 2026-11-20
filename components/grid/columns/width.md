---
title: Width
page_title: Grid - Column Width
description: Understand how the Telerik UI for Blazor Grid calculates and applies column widths when columns have different width configurations.
slug: grid-columns-width
tags: telerik,blazor,grid,column,width
published: True
position: 30
components: ["grid"]
---

# Grid Column Width

This article explains how to set Grid column widths and how the component behaves, depending on its column width configuration.

## Understanding Grid Column Width

The Grid renders separate HTML `<table>` elements for its header, data, and footer areas. This allows users to scroll the data area vertically, while the header and footer areas remain visible at all times. The Grid tables apply `table-layout: fixed` and `width: 100%` CSS styles to ensure column alignment between the three areas.

You can set the Grid column `Width` parameter in any CSS unit, such as `px`, `%`, `vw`, `em`, `rem`. Unit-less `Width` values are not supported. You can read more on how to set sizes in Telerik components in the [Dimensions](slug:common-features/dimensions) article.

## Column Width Behavior

The Grid column width settings can vary and result in the following behaviors:

@[template](/_contentTemplates/common/parameters-table-styles.md#multidimensional-table)

<table class="multi-dimensional-table">
    <colgroup><col style="width: 112px" /><col style="width: 70px" /><col /><col /></colgroup>
    <tr>
        <th colspan="2">Column width settings</th>
        <th colspan="2">The sum of all set column widths is:</th>
    </tr>
    <tr>
        <th>Columns with width</th>
        <th>Column width coverage</th>
        <th>Greater than the Grid width</th>
        <th>Less than the Grid width</th>
    </tr>
    <tr>
        <th>All</th>
        <td>All columns</td>
        <td><ul><li>All columns respect their <code>Width</code> setting.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns expand beyond their <code>Width</code> setting to fill the available space in the Grid.</li><li>No horizontal scrollbar appears.</li></ul></td>
    </tr>
    <tr>
        <th>Some</th>
        <td>Some columns</td>
        <td><ul><li>All columns respect their <code>Width</code> setting when it is set.</li><li>All columns without a <code>Width</code> shrink and disappear.</li><li>A horizontal scrollbar appears.</li></ul></td>
        <td><ul><li>All columns respect their <code>Width</code> setting when it is set.</li><li>All columns without a <code>Width</code> shrink or expand, depending on the remaining space in the Grid.</li><li>No horizontal scrollbar appears.</li></ul></td>
    </tr>
    <tr>
        <th>None</th>
        <td>No columns</td>
        <td colspan="2"><ul style="margin: .5em auto; width: max-content;"><li>All columns have the same width, which depends on the Grid width.</li><li>No horizontal scrollbar appears.</li></ul></td>
    </tr>
</table>

To allow the users to adjust or auto-fit the column widths to the content, enable [Grid column resizing](slug:components/grid/columns/resize). You can also [resize columns through the Grid state](slug:grid-state#methods) or [auto-fit columns programmatically](slug:components/grid/columns/resize#autofit-columns).

>note Single-table rendering and automatic table layout are not supported.

## Configuring Predictable Column Widths

For predictable and user-friendly behavior, consider the following Grid configuration:

* If the Grid has a fixed width and you need horizontal scrolling, set widths to all columns. Use absolute units that do not depend on the browser viewport size.
* If the Grid does not need horizontal scrolling and is not likely to shrink too much, then leave at least one column without a width. This ensures that all set column widths are respected and the width-less columns take up the remaining space.
* If the Grid width is unpredictable and the width-less columns may shrink too much, then apply a `min-width` style to the Grid tables, according to the example below.

>caption Apply a minimum width to the Grid table in a responsive layout

<demo metaUrl="client/grid/columns-width/" height="550"></demo>

## See Also

* [Column Resizing](slug:components/grid/columns/resize)
* [Blazor Grid](slug:grid-overview)
