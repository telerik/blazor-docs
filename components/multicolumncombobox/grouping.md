---
title: Grouping
page_title: MultiColumnComboBox - Grouping
description: Grouping in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-grouping
tags: telerik,blazor,multicolumncombobox,combobox,group,grouping
published: True
position: 15
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Grouping

The MultiColumnComboBox component can display the listed items in groups. This can improve the user experience and make browsing the items faster.

To enable MultiColumnComboBox grouping, set the `GroupField` parameter to a field name from the model. The MultiColumnComboBox will display the corresponding field values as group headers in the dropdown. Nested values of complex object properties are supported (see the example below).

The group headers stick to the top of the dropdown during scrolling. In other words, users will always know which is the group of the current topmost items in the scrollable list.

>caption Grouping in the MultiColumnComboBox

<demo metaUrl="client/multicolumncombobox/grouping/example-1/" height="420"></demo>

# Notes

* One level of grouping is supported.
* The `Placeholder` (e.g. "Select item...") is always rendered above the sticky group header in the dropdown.
* A grouped MultiColumnComboBox will provide a `Groups` property with a single [`GroupDescriptor`](slug:Telerik.DataSource.GroupDescriptor) in the [`DataSourceRequest`](slug:Telerik.DataSource.DataSourceRequest) argument of its [OnRead event](slug:multicolumncombobox-events#onread). This will allow the developer to apply grouping with [manual data operations](slug:common-features-data-binding-onread).

## See Also

* [Live Demo: ComboBox Grouping](https://demos.telerik.com/blazor-ui/multicolumncombobox/grouping)
