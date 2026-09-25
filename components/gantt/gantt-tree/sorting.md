---
title: Sorting
page_title: Gantt - Sorting
description: Enable and configure sorting in Gantt for Blazor.
slug: gantt-sorting
tags: telerik,blazor,gantt,sorting
published: True
position: 21
components: ["gantt"]
---

# Gantt Sorting

The Gantt component offers support for sorting.

To enable sorting, set the `Sortable` parameter to `true`.

When the user clicks the column header, the Gantt Tree will sort the data according to the column's data type, and an arrow indicator of the sorting direction will be shown next to the column title. Note that the hierarchical structure is kept, so an item's parent(s) will appear before the item.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

You can sort the Gantt on the different columns and sorting is done according to the rules for the concrete column type (for example, rules for a `string` are different from rules for an `int`).

Sorting keeps the expanded/collapsed state of items. For example, if filtering brings into view a child whose parent is collapsed, you will only see the collapsed parent.

You can let the user sort by more than one field by setting the `SortMode` parameter to `Telerik.Blazor.SortMode.Multiple`.

The sorting criteria are stored in a [collection of `SortDescriptor`](slug:common-features-descriptors#sorting).

>caption Enable Sorting in Telerik TreeList

<demo metaUrl="client/gantt/sorting/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Sorting](https://demos.telerik.com/blazor-ui/gantt/sorting)
   
