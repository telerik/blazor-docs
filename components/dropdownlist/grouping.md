---
title: Grouping
page_title: DropDownList - Grouping
description: Grouping in the DropDownList for Blazor.
slug: components/dropdownlist/grouping
tags: telerik,blazor,dropdown,dropdownlist,group,grouping
published: True
position: 15
components: ["dropdownlist"]
---

# DropDownList Grouping

The DropDownList component allows users to see the listed items grouped in categories. This can improve the user experience and make browsing through the items faster.

To enable DropDownList grouping, set the `GroupField` parameter to a field name from the model. The DropDownList will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers can stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the DropDownList

<demo metaUrl="client/dropdownlist/grouping/" height="350"></demo>

# Notes

* One level of grouping is supported.
* The `DefaultText` (e.g. "Select item...") is always rendered above the sticky group header in the dropdown.
* A grouped DropDownList will provide a `Groups` property with a single [`GroupDescriptor`](slug:Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](slug:Telerik.DataSource.DataSourceRequest) argument of its [OnRead event](slug:components/dropdownlist/events#onread). This will allow the developer to apply grouping with [manual data operations](slug:components/grid/manual-operations).

## See Also

* [Live Demo: DropDownList Grouping](https://demos.telerik.com/blazor-ui/dropdownlist/grouping)
* [Blazor DropDownList](slug:components/dropdownlist/overview)