---
title: Filtering
page_title: DropDownList - Filtering
description: Enable user searching (filtering) in the Telerik DropDownTree for Blazor.
slug: dropdowntree-filtering
tags: telerik,blazor,drop,down,list,dropdownlist,filter
published: True
components: ["dropdowntree"]
position: 10
---

# DropDownTree Filtering

The DropDownTree can render a filter textbox in its popup. The textbox allows users to filter the available TreeView items by the [`TextField` value](slug:dropdowntree-data-binding-overview#dropdowntree-bindings) and find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`. The filtering is case insensitive and resets when the dropdown closes.

## Filter Operator

The default filter operator is "starts with". You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

## Performance

By default, the filtering is debounced with 150 ms. To balance between performance and efficiency, set the `FilterDebounceDelay` parameter of the component to an `int` value.

## Placeholder

By default, the filter input in the popup is empty. Set the desired hint in it through the `FilterPlaceholder` parameter.

## Example

>caption DropDownTree Filtering

<demo metaUrl="client/dropdowntree/filtering/" height="350"></demo>

## See Also

* [Live Demos: DropDownTree](https://demos.telerik.com/blazor-ui/dropdowntree/overview)
