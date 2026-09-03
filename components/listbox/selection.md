---
title: Selection
page_title: ListBox - Selection
description: Description of the Blazor ListBox selection feature with an example. Selection modes and specifics of the SelectedItems parameter.
slug: listbox-selection
tags: telerik,blazor,listbox
published: True
position: 20
components: ["listbox"]
---

# ListBox Selection

This article describes the ListBox selection feature, including the available selection modes, and how to use the `SelectedItems` parameter.


## Selection Modes

The ListBox component provides users two ways to select items. This depends on the value of the [`SelectionMode` parameter](slug:listbox-overview#listbox-parameters), which expects a member of the `ListBoxSelectionMode` enum.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Selection&nbsp;Mode | Description |
| --- | --- |
| `Single` | Users can select only one ListBox item. They can change the selected item, but cannot deselect the selected one. You can [use a custom toolbar button](slug:listbox-toolbar#custom-tools) to clear the selection. See the [example below](#example). |
| `Multiple` | Users can select any number of items. The ListBox supports selection of adjacent items with `Shift` or non-adjacent items with `Ctrl` (`Cmd` on a Mac). Use mouse clicks or the arrow keys, as described on the [ListBox Keyboard Navigation demo](https://demos.telerik.com/blazor-ui/listbox/keyboard-navigation). |


## SelectedItems Parameter

The `SelectedItems` parameter of the ListBox supports two-way binding. In this case, the component will update the `SelectedItems` parameter value automatically when the user changes the current selection. If you use `SelectedItems` with one-way binding, you must subscribe to the [`SelectedItemsChanged` event](slug:listbox-events#selecteditemschanged) to update the `SelectedItems` parameter value manually on each user selection.

> The ListBox `SelectedItems` parameter must be defined as `IEnumerable<T>` in the application. Unlike the `Data` parameter, it cannot be a `List<T>`, because the built-in `SelectedItemsChanged` handler that is used with two-way binding is defined in the ListBox source code as `EventCallback<IEnumerable<T>>`.


## Example

>caption Using ListBox SelectionMode and Custom Deselect Tool

<demo metaUrl="client/listbox/selection/" height="550px"></demo>


## Next Steps

* [Connect Multiple ListBoxes](slug:listbox-connect)
* [Enable ListBox drag-and-drop](slug:listbox-dragdrop)
* [Implement ListBox templates](slug:listbox-templates)
* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox Selection](https://demos.telerik.com/blazor-ui/listbox/selection)
* [Live Demo: ListBox Keyboard Navigation](https://demos.telerik.com/blazor-ui/listbox/keyboard-navigation)
* [KB: ListBox CheckBox Selection](slug:listbox-kb-checkbox-selection)
* [KB: Scroll to Selected ListBox Item](slug:listbox-kb-scroll-to-selected-item)
