---
title: Filter
page_title: MultiColumnComboBox - Filter
description: Filtering in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-filter
tags: telerik,blazor,multicolumncombobox.combo,combobox,filter
published: True
position: 10
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Filter

The MultiColumnComboBox component allows users to filter items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug:multicolumncombobox-events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug:multicolumncombobox-overview#multicolumncombobox-parameters) parameter of the component.

## Filtering Example

>caption Filtering in the MultiColumnComboBox

<demo metaUrl="client/multicolumncombobox/filter/example-1/" height="550"></demo>


## See Also

* [Live Demo: MultiColumnComboBox Filtering](https://demos.telerik.com/blazor-ui/multicolumncombobox/filtering)

* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)
