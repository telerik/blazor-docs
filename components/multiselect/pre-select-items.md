---
title: Item Selection
page_title: MultiSelect - Item Selection
description: Learn how to pre-select items for the user or enable Select All with practical examples.
slug: multiselect-item-selection
tags: telerik,blazor,multiselect,select
tag: updated
published: True
position: 8
components: ["multiselect"]
---

# MultiSelect Item Selection

This article discusses how to pre-select existing MultiSelect items and how to enable users to select all items with a single action.

## Pre-Select Items

On page load, the MultiSelect will render the selected items in the order in which these items appear in the `Data` collection. To preserve the order of the initially selected items, [sort the data to match the selected items order](slug:multiselect-kb-selected-items-order).

>caption Pre-select MultiSelect items for the user

<demo metaUrl="client/multiselect/pre-select-items/example-1/" height="420"></demo>

## Select All Items

Telerik UI for Blazor 14.1.0 and newer versions allow users to select or deselect all rendered items. To enable the feature, set the `EnableSelectAll` parameter to `true`:

````RAZOR.skip-repl
<TelerikMultiSelect EnableSelectAll="true" />
````

When `EnableSelectAll` is `true`, the MultiSelect appearance and behavior also depend on the [`TagMode`](slug:multiselect-tag-mode), [`MaxAllowedTags`](slug:multiselect-tag-mode#summarized-tags-based-on-the-number-of-selections), and [`EnableCheckBoxes`](slug:multiselect-overview#checkboxes) settings.

Clicking the **Select All** toggle fires the [`OnSelectAll` event](slug:multiselect-events#onselectall).

The Select All functionality applies only to the currently rendered items, which means:

* The state of the **Select All** toggle button or tri-state checkbox depends on whether all, some, or none of the currently rendered items are selected.
* If [MultiSelect filtering](slug:multiselect-filter) is active, users select or deselect only the filtered items. The selection state of all other items remains unchanged.
* If [MultiSelect virtual scrolling](slug:multiselect-virtualization) is enabled, users select or deselect the currently rendered chunk of items. Their number depends on the `PageSize`. Scrolling does not affect the selected items. To select all items in the data source in virtual scenarios, use the [`OnSelectAll` event and set `args.Items` to all data items](slug:multiselect-virtualization#remote-data-example).

>caption Using MultiSelect SelectAll parameter and OnSelectAll event

<demo metaUrl="client/multiselect/pre-select-items/example-2/" height="420"></demo>

## See Also

* [MultiSelect Tag Mode](slug:multiselect-tag-mode)
* [MultiSelect CheckBoxes](slug:multiselect-kb-checkbox-in-dropdown)
