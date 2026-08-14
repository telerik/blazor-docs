---
title: Grouping
page_title: ComboBox - Grouping
description: Grouping in the ComboBox for Blazor.
slug: components/combobox/grouping
tags: telerik,blazor,combo,combobox,group,grouping
published: True
position: 15
components: ["combobox"]
---

# ComboBox Grouping

The ComboBox component allows users to see the listed items grouped in categories. This can improve the user experience and make browsing through the items faster.

To enable ComboBox grouping, set the `GroupField` parameter to a field name from the model. The ComboBox will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers can stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the ComboBox

<demo metaUrl="client/combobox/grouping/" height="350"></demo>

# Notes

* One level of grouping is supported.
* A grouped ComboBox will provide a `Groups` property with a single [`GroupDescriptor`](slug:Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](slug:Telerik.DataSource.DataSourceRequest) argument of its [OnRead event](slug:components/combobox/events#onread). This will allow the developer to apply grouping with [manual data operations](slug:components/grid/manual-operations).

## See Also

* [Live Demo: ComboBox Grouping](https://demos.telerik.com/blazor-ui/combobox/grouping)
