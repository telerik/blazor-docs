---
title: Grouping
page_title: MultiSelect - Grouping
description: Grouping in the MultiSelect for Blazor.
slug: components/multiselect/grouping
tags: telerik,blazor,multiselect,group,grouping
published: True
position: 15
components: ["multiselect"]
---

# MultiSelect Grouping

The MultiSelect component allows users to see the dropdown items grouped in categories. This can improve the user experience and make browsing through the items faster.

To enable MultiSelect grouping, set the `GroupField` parameter to a field name from the model. The MultiSelect will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers can stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the MultiSelect

<demo metaUrl="client/multiselect/grouping/example-1/" height="420"></demo>

# Notes

* One level of grouping is supported.
* A grouped MultiSelect will provide a `Groups` property with a single [`GroupDescriptor`](slug:Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](slug:Telerik.DataSource.DataSourceRequest) argument of its [OnRead event](slug:multiselect-events#onread). This will allow the developer to apply grouping with [manual data operations](slug:components/grid/manual-operations).

## See Also

* [Live Demo: MultiSelect Grouping](https://demos.telerik.com/blazor-ui/multiselect/grouping)
