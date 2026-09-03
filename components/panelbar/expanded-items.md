---
title: Expanded Items
page_title: PanelBar - Expanded Items
description: Expand Items in the Telerik PanelBar.
slug: panelbar-expand-items
tags: telerik,blazor,panelbar,expand,items
published: True
position: 5
components: ["panelbar"]
---

# Expanded Items

You can expand a single or multiple items in the Telerik PanelBar.

In this article:

* [ExpandMode](#expandmode)

* [ExpandedItems](#expandeditems)

* [Programmatically Expand and Collapse Items](#programmatically-expand-and-collapse-items)

## ExpandMode

You can use the ExpandMode to allow the user to expand one or more items at a time. To control that set the `ExpandMode` parameter of the `<TelerikPanelBar>` to a member of the `PanelBarExpandMode` enum:

* `Single` - Expands only one item at a time. If you expand a new item the previously expanded item will be collapsed.

* `Multiple` - the default value - Lets you expand more than one item simultaneously. To collapse an expanded item, click it again.

>caption Change the Expand mode of the PanelBar

<demo metaUrl="client/panelbar/expanded-items/expand-mode/" height="420"></demo>

## ExpandedItems

The PanelBar lets the user expand an item. You can also pre-expand a desired item.

To use the item expansion, use the `ExpandedItems` parameter. It allows two-way binding (@bind-ExpandedItems) and one-way binding + [ExpandedItemsChanged](slug:panelbar-events#expandeditemschanged) event.

The ExpandedItems collection is of type `IEnumerable<object>`.

If the [ExpandMode](#expandmode) is set to `Single` the ExpandedItems collection will contain one item, otherwise it will have a collection of the expanded items.

<demo metaUrl="client/panelbar/expanded-items/expanded-items/" height="500"></demo>

## Programmatically Expand and Collapse Items

>caption Programmatically expand and collapse items on button click

<demo metaUrl="client/panelbar/expanded-items/programmatic/" height="420"></demo>

## See Also

* [PanelBar Overview](slug:panelbar-overview)
* [PanelBar Data Binding](slug:panelbar-data-binding-overview)
* [PanelBar Events](slug:panelbar-events)
