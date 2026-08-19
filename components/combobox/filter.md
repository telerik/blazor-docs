---
title: Filter
page_title: ComboBox - Filter
description: Filtering in the ComboBox for Blazor.
slug: components/combobox/filter
tags: telerik,blazor,combo,combobox,filter
published: True
position: 10
components: ["combobox"]
---

# ComboBox Filter

The ComboBox component allows the user to filter the available items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive. 

You can also use the [`OnRead` event](slug:components/combobox/events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`DebounceDelay`](slug:components/combobox/overview#parameters) parameter of the component.

## Filtering Example

>caption Filtering in the ComboBox

<demo metaUrl="client/combobox/filter/" height="400"></demo>

## See Also

* [Live Demo: ComboBox Filtering](https://demos.telerik.com/blazor-ui/combobox/filtering)

* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)

