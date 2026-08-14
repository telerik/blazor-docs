---
title: Filter
page_title: DropDownList - Filter
description: Filtering in the DropDownList for Blazor.
slug: components/dropdownlist/filter
tags: telerik,blazor,drop,down,list,dropdownlist,filter
published: True
position: 10
components: ["dropdownlist"]
---

# DropDownList Filter

The DropDownList filter textbox allows users to filter the available items by their text and find the one they need faster. The filtering input is at the top of the dropdown popup.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive.

You can also use the [`OnRead` event](slug:components/dropdownlist/events#onread) to:
* Get the [applied filtering criteria](slug:common-features-descriptors#through-the-onread-event).
* Implement custom (server) filtering and set data dynamically.

Filtering looks in the `TextField`, and the filter is reset when the dropdown closes.

## Filter Operator

The default filter operator is `starts with`. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150ms. Configure that with the [`FilterDebounceDelay`](slug:components/dropdownlist/overview#dropdownlist-parameters) parameter of the component.

## Placeholder

By default, the filter input in the popup is empty. Set the desired hint in it through the `FilterPlaceholder` parameter.

## Filtering Example

>caption Filtering in the DropDownList

<demo metaUrl="client/dropdownlist/filter/" height="450"></demo>

## See Also

* [Live Demo: DropDownList Filtering](https://demos.telerik.com/blazor-ui/dropdownlist/filtering)
* [Custom Filtering by Multiple Fields](slug:dropdowns-kb-search-in-multiple-fields)
* [Blazor DropDownList](slug:components/dropdownlist/overview)