---
title: Overview
page_title: Filter Fields
description: Discover the Blazor Filter Fields and explore the examples.
slug: filter-fields
tags: telerik,blazor,filter,fields
published: True
position: 0
---

# Filter Fields
You can define different Fields settings. For example, names, labels, and [filter operators](slug:filter-operators).

## FilterField Parameters

The following parameters enable you to customize the appearance of the Blazor Filter Fields:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `DefaultFilterOperator` | `FilterOperator` | Sets the default filter operator for the Field. Accepts a member of the `FilterOperator` enum. The selected operator must be applicable for the specific data type. Check the supported options in the [Filter Operators](slug:common-features-filter-operators) article.
| `Label` | `string` | Specifies the string displayed for the given field. |
| `Name` | `string` | Specifies the field to be used when filtering. |
| `Operators` | `IEnumerable<FilterListOperator>` | Specifies the [available filter operators](slug:filter-operators#supported-fields-operators). If not defined, the component will use a default list of available operators based on the field type. |
| `Type` | `Type` | Specifies the field type. This will determine the filter value editor. |
| `ValueTemplate` | `RenderFragment<FilterFieldValueTemplateContext>` | Use to override the default rendering of the filter field value. |