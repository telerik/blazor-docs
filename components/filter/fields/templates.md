---
title: Templates
page_title: Filter Field Templates
description: Learn how to configure and use Templates for the Filter component FilterField. The ValueTemplate allows users to input a filtering value in custom UI.
slug: filter-filterfield-templates
tags: telerik,blazor,filter,filterfields,templates
published: True
position: 10
components: ["filter"]
---

# Filter Field Templates

You can customize the `FilterFiled` appearance and behavior through its templates.

The `FilterField` provides the following templates:

* [Value Template](#value-template)

## Value Template

The `ValueTemplate` allows you to customize the default value editor of a single Filter Field. You can replace the default editor component or change the component settings.

The `context` of the`ValueTemplate` is of type [`FilterFieldValueTemplateContext`](slug:telerik.blazor.components.filterfieldvaluetemplatecontext). You can get and set its `FilterDescriptor` property, which is of type [`FilterDescriptor`](slug:telerik.datasource.filterdescriptor).

> The `FilterDescriptor` `Value` property is of type `object` and is `null` by default. As a result, the `Value` of the component inside the `ValueTemplate` must be `nullable` for all types, except `string`.


To use the Filter Field value template, add a `<ValueTemplate>` tag inside the [FilterField](slug:filter-fields).

>caption Using FilterField ValueTemplate

<demo metaUrl="client/filter/templates/example-1/" height="420"></demo>

## See Also

* [Live Demo: Filter](https://demos.telerik.com/blazor-ui/filter/templates)
* [FilterField: Overview](slug:filter-fields)
