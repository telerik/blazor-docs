---
title: Custom Value
page_title: MultiColumnComboBox - Custom Value
description: Custom values and user input in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-custom-value
tags: telerik,blazor,multicolumncombobox,combobox,custom,value,input
published: True
position: 20
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Custom Values

The MultiColumnComboBox component allows the user to type in their own value that is not a part of the predefined set of options that the developer provided.

The text entered by the user can still go into the field the combo box is bound to through two-way binding.

To enable custom user input set the `AllowCustom` parameter to `true`.

> When custom values are enabled, the `TextField`, `ValueField` and the `Value` must be of type `string`. Otherwise an exception will be thrown. Strings are required because the user input can take any form and may not be parsable to other types (such as numbers or GUID).

When custom input is allowed, the [ValueChanged event](slug:multicolumncombobox-events) fires on every keystroke, and not when an item is selected, because the MultiColumnComboBox component acts as a text input.

When custom values are typed in, there may be no selected item. See [Value and Selected Item](slug:multicolumncombobox-data-binding#value-and-selected-item) for details on how item selection and `Value` work together.

>caption Allow custom user input in the combo box

<demo metaUrl="client/multicolumncombobox/custom-value/example-1/" height="420"></demo>

>caption How to add custom user values into the data source so they are available as items immediately

<demo metaUrl="client/multicolumncombobox/custom-value/example-2/" height="420"></demo>

## Limitations

* `AllowCustom` is not compatible with [Adaptive rendering](slug:adaptive-rendering).

## See Also

* [Live Demo: MultiColumnComboBox Custom Values](https://demos.telerik.com/blazor-ui/multicolumncombobox/custom-values)
