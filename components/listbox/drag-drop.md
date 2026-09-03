---
title: Drag and Drop
page_title: ListBox - Drag and Drop
description: How to enable ListBox drag and drop to move items between component instances. Example on how to configure the ListBox and handle the OnDrop event.
slug: listbox-dragdrop
tags: telerik,blazor,listbox
published: True
position: 40
components: ["listbox"]
---

# ListBox Item Drag and Drop

The Telerik Blazor ListBox allows users to drag and drop items within the same component instance or across different instances. This is a more flexible alternative to [reordering](slug:listbox-overview#creating-blazor-listbox) or [moving ListBox items](slug:listbox-connect) with toolbar buttons. As a result, dragging and dropping can be a lot faster and convenient to users when the number of related ListBoxes is three or more.


## Configuration

To enable drag and drop between ListBox components:

1. Set `Draggable="true"` to all of them.
1. Set [`DropSources` to the `Id` values](slug:listbox-overview#listbox-parameters) of the permitted source ListBoxes.
1. Subscribe to the [`OnDrop` event](slug:listbox-events#ondrop) of each ListBox that users can drag items from. The `OnDrop` event always fires from the source (origin) ListBox instance.
1. Decide if you want to drag and drop the single item from the `args.Items` event argument or the full current selection.
1. [`Rebind()`](slug:listbox-overview#listbox-reference-and-methods) each ListBox after making programmatic changes to its `Data`.


## Example

>caption Using ListBox drag and drop

<demo metaUrl="client/listbox/drag-drop/" height="450px"></demo>


## Next Steps

* [Implement ListBox templates](slug:listbox-templates)
* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox Drag and Drop](https://demos.telerik.com/blazor-ui/listbox/drag-drop)
