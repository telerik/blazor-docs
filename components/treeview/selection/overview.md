---
title: Overview
page_title: TreeView - Selection Overview
description: Node selection in the TreeView for Blazor.
slug: treeview-selection-overview
tags: telerik,blazor,treeview,selection,overview
published: True
position: 1
components: ["treeview"]
---

# TreeView Selection

The TreeView lets the user select one or more nodes. You can also pre-select them with your own code.

You can configure the node selection behavior by setting the `SelectionMode` parameter to a member of the `TreeViewSelectionMode` enum:
* `None` - disable the node selection. This is the default setting.
* [`Single`](slug:treeview-selection-single)
* [`Multiple`](slug:treeview-selection-single)

You get or set the selected items through the `SelectedItems` parameter. It is an `IEnumerable<object>` collection. The selection allows two-way binding (`@bind-SelectedItems`) and one-way binding + [`SelectedItemsChanged`](slug:treeview-events#selecteditemschanged) event.

If you want to extract details for the selection from `SelectedItems`, you need to cast the collection to the correct model type. This is required because you can [bind the treeview](slug:components/treeview/data-binding/overview) to different model types at each level. The example below demonstrates this approach - we cast the selected item to the specific model in order to get its details and display them outside of the TreeView.

>caption Enable node selection

<demo metaUrl="client/treeview/selection/overview/example-1/" height="420"></demo>

## See Also

* [Live Demo: TreeView Selection](https://demos.telerik.com/blazor-ui/treeview/selection)
* [Single Selection](slug:treeview-selection-single)
* [Multiple Selection](slug:treeview-selection-multiple)
* [Apply Selection Styles Only on TreeView Item Text](slug:treeview-kb-node-selection-only-on-item-text)
