---
title: Data Binding
page_title: MultiColumnComboBox - Data Binding
description: Data Binding the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-data-binding
tags: telerik,blazor,multicolumncombobox,combo,data,bind,binding,databind
published: True
position: 5
---

# MultiColumnComboBox Data Binding

This article explains how to provide data to the MultiColumnComboBox component, the properties related to data binding and their results.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)


## Bind to a Model

Bind the MultiColumnComboBox to a model in your application. Unlike other drop down components such as ComboBox or DropDownList, binding to a collection of strings, primitives, or value types is not supported.

Consult the [MultiColumnComboBox basic usage example]({%slug multicolumncombobox-overview%}#creating-multiColumnComboBox).

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)


## Value and Selected Item

By default, if no `Value` is provided, the MultiColumnComboBox will appear empty, or will display the `Placeholder` string. If a `Value` is provided and `AllowCustom` is `false`, the `Value` should match an item in the data source (see the [Value Out of Range]({%slug multicolumncombobox-data-binding%}#value-out-of-range) section.

The MultiColumnComboBox acts as an input, so it will not always have a selected item. There will be no selected item in the following cases:

* The user clears the value through the Clear button.
* The user clears the value with the `Backspace` or `Del` keys.
* `AllowCustom="false"` - when a custom value is typed, the MultiColumnComboBox input value will be automatically cleared on the change event (`blur` of the input or `Enter` keypress). See the table below.
* `AllowCustom="true"` - when the user starts typing a custom value.

Missing selection is most common when:

* The initial value is `null` as data sources rarely have items with a `null` value.
* You want to let your users type in values that are not in your predefined set of options.

>caption If the user types text in the input, selection behaves according to the following table:

| User input matches | `AllowCustom="true"` | `AllowCustom="false"` |
| --- | --- | --- |
| The `TextField` of an item | Matched item is selected. The `Value` is taken from the item. | Matched item is selected. The `Value` is taken from the item. |
| The `ValueField` of an item | No item is selected. `Value` is updated to the custom input. | No item is selected. `Value` is updated to `default(typeof(Value))`. The `OnChange` event does not fire for the value clearing. |
| No match | No item is selected. `Value` is updated to the custom one. | No item is selected. `Value` is updated to `default(typeof(Value))`. The `OnChange` event does not fire for the value clearing. |

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)


## Missing Value or Data

The MultiColumnCombobox component attempts to infer the type of its model and value based on the provided `Data` and initial `Value`. This affects its [object reference]({%slug multicolumncombobox-overview%}#component-reference-and-methods).

In case you cannot provide either the `Value` or `Data` initially, you need to [set the corresponding types to the `TItem` and `TValue` parameters]({%slug common-features-data-binding-overview%}#component-type).


## See Also

* [MultiColumnComboBox Overview]({%slug multicolumncombobox-overview%})
* [Live Demo: MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/overview)
