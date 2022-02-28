---
title: Filter Operators
page_title: Filter Operators
description: Supported Filter Operators in the Telerik UI for Blazor component suite.
slug: common-features-filter-operators
tags: telerik,blazor,filter,operator
published: True
position: 10
---

# Filter Operators

The `FilterOperator` enum contains all filter operators supported in the Telerik UI for Blazor suite.

When customizing the filtering behavior of the components, it is important to use the correct filter operators depending on the specific data type. Otherwise, you will receive an exception - the assigned `DefaultFilterOperator` not applicable for the current data type.

>important ArgumentException: The assigned DefaultFilterOperator ... for the Start column is not applicable for ... type.

Below you can find a complete list of the supported filter operators under the corresponding data type.

| **String** | **Numeric** | **Bool** | **Enum** | **Date** |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| `IsEqualTo` | `IsLessThan` | `IsEqualTo` | `IsEqualTo` | `IsEqualTo` |
| `IsNotEqualTo` | `IsLessThanOrEqualTo` | | `IsNotEqualTo` | `IsNotEqualTo` |
| `StartsWith` | `IsEqualTo` | | `IsNull` | `IsGreaterThanOrEqualTo` |
| `Contains` | `IsNotEqualTo` | | `IsNotNull ` | `IsGreaterThan` |
| `DoesNotContain` | `IsGreaterThanOrEqualTo` | | | `IsLessThanOrEqualTo` |
| `EndsWith` | `IsGreaterThan` | | | `IsLessThan` |
| `IsNull` | `IsNull` | | | `IsNull` |
| `IsNotNull` | `IsNotNull` | | | `IsNotNull` |
| `IsEmpty` | | | |
| `IsNotEmpty` | | | |
| `IsNullOrEmpty` | | | |
| `IsNotNullOrEmpty` | | | |
