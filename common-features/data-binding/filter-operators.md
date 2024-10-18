---
title: Filter Operators
page_title: Filter Operators
description: Supported Filter Operators in the Telerik UI for Blazor component suite.
slug: common-features-filter-operators
tags: telerik,blazor,filter,operator
published: True
position: 15
---

# Filter Operators

The `FilterOperator` enum contains all filter operators supported in the Telerik UI for Blazor suite.

Each filter operator is compatible with a specific data type. Always use the correct filter operator during filter customizations. Otherwise, an exception will occur about the assigned `DefaultFilterOperator` not applicable for the current data type.

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
