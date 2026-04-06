---
title: Selection Recipes
description: "Find knowledge base articles about item and row selection in Blazor components."
tags: selection, checkbox, multiselect, row selection, item selection
slug: pillar-selection
page_title: Selection Knowledge Base Articles
---

Explore the [how-to](#selection-how-tos) and [troubleshooting](#selection-troubleshooting) guides below for solutions to common selection scenarios.

Telerik UI for Blazor supports item and row selection in many components, including the Grid, TreeList, TreeView, ListBox, ListView, MultiSelect, and ButtonGroup. Selection can be driven by clicks, checkboxes, or programmatic state changes, and can be combined with other features such as editing, filtering, exporting, and virtualization.

* The Grid and TreeList support both row and cell selection. You can control which rows or cells are selectable, enable checkbox columns, and persist the selection across pages or re-binds by using the `SelectedItems` parameter together with the `SelectedItemsChanged` event.

* The TreeView, ListBox, and ListView expose election APIs that let you get and set the currently selected items. The ListBox additionally supports transferring items between two lists.

* Dropdown components like MultiSelect allow you to limit the number of selected items, keep certain items always selected, and control how selected items are ordered and displayed.

## Selection How Tos

The knowledge base articles below originate from support tickets and community questions about selection, and typically cover custom scenarios that aren't covered in the [main documentation](slug:grid-selection-overview).

* [How to create a mixed selection mode in the ButtonGroup?](slug:buttongroup-kb-mixed-selection-mode)
* [How to disable dropdown items from being selected?](slug:dropdown-kb-disabled-items)
* [How to allow or prevent selection of specific Grid rows conditionally?](slug:grid-kb-prevent-row-selection)
* [How to prevent accidental clicks in the Grid checkbox column?](slug:grid-kb-checkbox-column-prevent-click)
* [How to export selected Grid rows to Excel or CSV?](slug:grid-kb-export-selected-rows)
* [How to filter the Grid by the currently selected items?](slug:grid-kb-filter-by-selected-items)
* [How to persist Grid row selection across pages?](slug:common-kb-persist-selection-across-pages)
* [How to select a Grid row when using a column template?](slug:grid-kb-row-selection-in-column-template)
* [How to scroll the Grid to its selected row?](slug:grid-kb-scroll-to-selected-row)
* [How to select all Grid rows with a checkbox when using OnRead?](slug:grid-kb-select-all-onread)
* [How to select a row that is being edited in InCell edit mode?](slug:grid-kb-row-select-incell-edit)
* [How to select or deselect Grid items on row click?](slug:grid-kb-select-or-deselect-item-on-row-click)
* [How to implement checkbox selection in the ListBox?](slug:listbox-kb-checkbox-selection)
* [How to scroll the ListBox to its selected item?](slug:listbox-kb-scroll-to-selected-item)
* [How to implement item selection in the ListView?](slug:listview-kb-selection)
* [How to keep an item always selected and limit the total number of selections in the MultiSelect?](slug:multiselect-kb-always-select-limit)
* [How to restrict the number of selected items in the MultiSelect?](slug:multiselect-kb-limit-selection)
* [How to enable TreeList checkbox selection only in edit mode?](slug:treelist-kb-enable-checkbox-selection-only-edit-mode)
* [How to disable checkboxes for specific TreeView items conditionally?](slug:treeview-kb-disable-checkboxes)

## Selection Troubleshooting

The troubleshooting articles below will help you solve selection problems when implementing custom scenarios.

* [MultiSelect automatically reorders and sorts the selected items](slug:multiselect-kb-selected-items-order)
