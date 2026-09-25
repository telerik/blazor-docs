---
title: Overview
page_title: Filter Fields
description: Discover the Blazor Filter Fields and explore the examples.
slug: filter-fields
tags: telerik,blazor,filter,fields
published: True
position: 0
previous_url: /components/filter/fields/operators
components: ["filter"]
---

# Filter Fields
You can define different field settings, such as field names, labels, available operators, and field selection filtering.

A filter field maps a Filter expression row to a model member. Define a `<FilterField>` for each data field that users can filter. Set `Name` to the model member and `Type` to its .NET type. Use `Label` to show custom text in the field selector.

>caption Define Filter fields

<demo metaUrl="client/filter/overview/example-3/" height="420"></demo>

## Operators

The Filter provides options for defining which filter operators are available in the operators dropdown.

The `Operators` parameter takes a collection of `FilterListOperator`. You can list the desired operators and customize their text.

[Read about the supported Filter field operators...](slug:common-features-filter-operators)

To configure field operators, provide a list of `<FilterListOperator>` for each field.

>caption Configure Filter field operators

<demo metaUrl="client/filter/overview/example-2/" height="420"></demo>

## Filtering

The Filter can show a search box in the field selection dropdown. This behavior helps users find a field faster when the Filter contains many configured fields.

To enable this feature, set `FilterableFields` to `true`.

The Filter applies the field filtering settings only to the field selection dropdown in each expression row. The operator dropdown does not use these settings.

The fields filtering parameters are reactive. If you update them at runtime, the component applies the new values immediately.

>caption Filter field selection with a search box

<demo metaUrl="client/filter/overview/example-1/" height="420"></demo>
