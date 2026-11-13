---
title: Events
page_title: PanelBar - Events
description: Events of the PanelBar for Blazor.
slug: panelbar-events
tags: telerik,blazor,panelbar,events
published: True
position: 25
components: ["panelbar"]
---

# PanelBar Events

This article explains the events available in the Telerik TreeView for Blazor:

* [OnItemClick](#onitemclick)
* [ExpandedItemsChanged](#expandeditemschanged)
* [OnItemRender](#onitemrender)
* [OnExpand and OnCollapse](#onexpand-and-oncollapse)

## OnItemClick

The `OnItemClick` event fires when the user clicks (or presses `Enter`) on a node (item) of the PanelBar. Use this event to react to a user clicking an item.

The event handler receives a `PanelBarItemClickEventArgs` object. Its `Item` property contains the model of the clicked item, which you can cast to your model type and store in application state when you need to track the current item. The PanelBar does not provide a `SelectedItems` or `SelectedItem` parameter for selection binding.

If that item has children the `OnItemClick` event will fire before the `ExpandedItemsChanged` event.

>caption Handle OnItemClick to react to user click action.

<demo metaUrl="client/panelbar/events/on-item-click/" height="420"></demo>

## ExpandedItemsChanged

The `ExpandedItemsChanged` event fires when the user expands or collapses a node (item) in the PanelBar.

>caption Handle the ExpandedItemsChanged events

<demo metaUrl="client/panelbar/events/expanded-items-changed/" height="420"></demo>

## OnItemRender

The `OnItemRender` event fires upon rendering the nodes of the PanelBar. It receives an argument of type `PanelBarItemRenderEventArgs` which exposes the following fields:

* `Item` - an object you can cast to your model class to obtain the current data item.

* `Class` - the CSS class that will be applied to the item's main element. The CSS rules that are set for that class will be visibly rendered on the PanelBar node.

If the item that is customized has children, they will also inherit the styles applied in the CSS class passed to the `Class` parameter.

<demo metaUrl="client/panelbar/events/on-item-render/" height="420"></demo>

## OnExpand and OnCollapse

The `OnExpand` and `OnCollapse` events fire when the user tries to expand/collapse an item, but *before* the actual action takes place.

The `OnExpand` handler receives an argument of type `PanelBarExpandEventArgs`.

The `OnCollapse` handler receives an argument of type `PanelBarCollapseEventArgs`.

Both event arguments expose an `Item` and `IsCancelled` properties. To cancel each event, set `args.IsCancelled` to `true`. In this case, the item will gain focus and selection, but its state will remain unchanged.

>caption PanelBar OnExpand and OnCollapse Events

<demo metaUrl="client/panelbar/events/on-expand-collapse/" height="420"></demo>

## See Also

* [PanelBar Overview](slug:panelbar-overview)
