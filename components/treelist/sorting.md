---
title: Sorting
page_title: TreeList - Sorting
description: Enable and configure sorting in TreeList for Blazor.
slug: treelist-sorting
tags: telerik,blazor,treelist,sorting
published: True
position: 21
components: ["treelist"]
---

# TreeList Sorting

The TreeList component offers support for sorting.

To enable sorting, set the `Sortable` parameter to `true`.

When the user clicks the column header, the treelist will sort the data according to the column's data type, and an arrow indicator of the sorting direction will be shown next to the column title. Note that the hierarchical structure is kept, so an item's parent(s) will appear before the item.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

You can sort the Treelist on the different columns and sorting is done according to the rules for the concrete column type. For example, rules for a `string` are different from rules for an `int`.

Sorting keeps the expanded/collapsed state of items. For example, if filtering brings into view a child whose parent is collapsed, you will only see the collapsed parent.

You can let the user sort by more than one field by setting the `SortMode` parameter to `Telerik.Blazor.SortMode.Multiple`.

The sorting criteria are stored in a [collection of `SortDescriptor`](slug:common-features-descriptors#sorting).

>caption Enable Sorting in the Telerik Blazor TreeList

<demo metaUrl="client/treelist/sorting/example-1/" height="720"></demo>

You can sort the TreeList from your own code through its [state](slug:treelist-state).

@[template](/_contentTemplates/treelist/state.md#initial-state)

>caption Set sorting programmatically

````RAZOR
@[template](/_contentTemplates/treelist/state.md#set-sort-from-code)
````

## See Also

* [Live Demo: TreeList Sorting](https://demos.telerik.com/blazor-ui/treelist/sorting)
