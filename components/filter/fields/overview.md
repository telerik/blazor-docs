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
You can set the fields settings of the component. Filter provides field names, labels, and [filter operators]({%slug filter-operators%}).

## FilterField Parameters

The following parameters enable you to customize the appearance of the Blazor Filter Fields:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Name` | `string` | Specifies the name of the field which will be used when filtering. |
| `Type` | `Type` | Specifies the type of the field for the filtering, based on which an editor will be created.|
| `Label` | `string` | Specifies the string displayed for the given field. |
| `Operators` | `IEnumerable<FilterListOperator>` | Specifies the [available filter operators]({%slug filter-operators%}#supported-fields-operators). If not defined, a default list of available operators given the field type will be used. |