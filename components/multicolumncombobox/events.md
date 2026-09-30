---
title: Events
page_title: MultiColumnComboBox - Events
description: Events in the ComboBox for Blazor.
slug: multicolumncombobox-events
tags: telerik,blazor,multicolumncombobox,combobox,combo,events
published: true
position: 50
components: ["multicolumncombobox"]
---

# MultiColumnComboBox Events

This article describes the events of the Telerik MultiColumnComboBox for Blazor.

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnBlur](#onblur)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values](slug:multicolumncombobox-custom-value) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle ValueChanged

<demo metaUrl="client/multicolumncombobox/events/example-1/" height="420"></demo>

>caption Handle ValueChanged with custom values - the event fires on every keystroke

<demo metaUrl="client/multicolumncombobox/events/example-2/" height="420"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. It is suitable for handling custom values the user can enter as if the MultiColumnComboBox was an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, but it fires when an item is selected from the dropdown. To get the selected item, you can check if the new value is present in the data source.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

<demo metaUrl="client/multicolumncombobox/events/example-3/" height="420"></demo>

>caption Handle OnChange with custom values - the event fires on blur or enter

<demo metaUrl="client/multicolumncombobox/events/example-4/" height="420"></demo>


## OnRead

>tip Get familiar with the [common `OnRead` event documentation](slug:common-features-data-binding-onread) first.

You can use the `OnRead` event to provide data to the component according to some custom logic, the user input, or the current [virtual scroll](slug:multicolumncombobox-virtualization) position. The event fires when:

* The component initializes.
* The user [filters](slug:multicolumncombobox-filter).
* The user scrolls with [virtualization](slug:multicolumncombobox-virtualization) enabled.

You can also call remote data through `async` operations.

Find out how to [get the applied by filtering and grouping criteria](slug:common-features-descriptors).

When using `OnRead`, make sure to set `TItem` and `TValue`.

>tip You can also [debounce the service calls and implement minimum filter length](slug:combo-kb-debounce-onread).

>caption Custom Data according to the user input in the ComboBox

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)

<demo metaUrl="client/multicolumncombobox/events/example-5/" height="420"></demo>


>caption Custom sort of grouped data with OnRead

<demo metaUrl="client/multicolumncombobox/events/example-6/" height="420"></demo>

## OnOpen

The `OnOpen` event fires before the MultiColumnComboBox popup renders. 

The event handler receives as an argument an `MultiColumnComboBoxOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/multicolumncombobox/events/example-7/" height="420"></demo>

## OnClose

The `OnClose` event fires before the MultiColumnComboBox popup closes.

The event handler receives as an argument an `MultiColumnComboBoxCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/multicolumncombobox/events/example-8/" height="420"></demo>

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/multicolumncombobox/events/example-9/" height="420"></demo>


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)

