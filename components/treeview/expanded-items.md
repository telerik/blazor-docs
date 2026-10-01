---
title: Expanded Items
page_title: TreeView - Expanded Items
description: Expand Items in the Telerik TreeView.
slug: treeview-expand-items
tags: telerik,blazor,treeview,expand,items
published: True
position: 4
components: ["treeview"]
---

# TreeView Expanded Items

TreeView lets the user expand multiple items. It also gives the option to pre-expand a specific item.

To use the item expansion, set the `ExpandedItems` parameter. It allows two-way binding (`@bind-ExpandedItems`) and one-way binding + [ExpandedItemsChanged](slug:treeview-events#expandeditemschanged) event.

The `ExpandedItems` collection is of type `IEnumerable<object>`.

## Programmatically Expand and Collapse Items

>caption Programmatically expand and collapse items on button click.

<demo metaUrl="client/treeview/expanded-items/example-1/" height="420"></demo>

## See Also

* [TreeView Overview](slug:treeview-overview)
* [TreeView Data Binding](slug:components/treeview/data-binding/overview)
* [TreeView Events](slug:treeview-events)
* [Expand and collapse TreeView items on click](slug:treeview-kb-expand-collapse-on-item-click)
