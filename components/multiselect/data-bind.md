---
title: Data Binding
page_title: MultiSelect - Data Binding
description: Data Binding the MultiSelect for Blazor.
slug: multiselect-databind
tags: telerik,blazor,multiselect,data,bind,binding,databind
published: True
position: 5
components: ["multiselect"]
---

# MultiSelect Data Binding

This article explains the different ways to provide data to a MultiSelect component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

There are two key ways to bind data:

* [Strings and Value Types](#strings-and-value-types)
* [Model](#bind-to-a-model)

There are also some [considerations](#considerations) to keep in mind.

## Strings and Value Types

You can data bind the MultiSelect to a collection of `string` or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data (such as `int`, `decimal`, `bool`, `Guid`, and `Enum`). When you have a concrete list of options for the user to choose from, their string representation is often suitable for display and you do not need special models.

To bind the MultiSelect, you need to:

1. provide an `IEnumerable<string>` to its `Data` property,
1. point the `Value` parameter to a `List<string>` field.

>caption Data binding an MultiSelect to a simple string data source

<demo metaUrl="client/multiselect/data-bind/example-1/" height="420"></demo>


>caption Data binding an MultiSelect to a simple number data source

<demo metaUrl="client/multiselect/data-bind/example-2/" height="420"></demo>



## Bind to a Model

You can bind the MultiSelect to a model in your application. This is useful when you have the data in some form already and you don't need to prepare a separate collection of suggestions.

To bind the MultiSelect to a model:

1. populate its `Data` property with the collection of items you want in the dropdown
1. set the `ValueField` and the `TextField` to point to the corresponding fields of the model that contain, sespectively, the value of the options and the string data for them.
1. point the `Value` parameter to a `List<TValue>` field in the view-model.

>caption Data binding an MultiSelect to a model

<demo metaUrl="client/multiselect/data-bind/example-3/" height="420"></demo>

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

## Considerations

The MultiSelect component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects the way its [reference is obtained](slug:common-features-data-binding-overview#component-type) and what happens [if you can't provide data or a value](#missing-value-or-data).

### Missing Value Or Data

In case you cannot provide either of a `Value`, or `Data`, or both when the component initializes, you need to set the corresponding type properties to the `TItem` and `TValue` properties as shown below.

>caption MultiSelect configuration if you cannot provide Value or Data

<demo metaUrl="client/multiselect/data-bind/example-4/" height="420"></demo>


## See Also

* [Live Demo: MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/overview)
* [MultiSelect CheckBoxes](slug:multiselect-kb-checkbox-in-dropdown)
