---
title: Events
page_title: ComboBox - Events
description: Events in the ComboBox for Blazor.
slug: components/combobox/events
tags: telerik,blazor,combobox,combo,events
published: true
position: 40
components: ["combobox"]
---

# ComboBox Events

This article explains the events available in the Telerik ComboBox for Blazor:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnItemRender](#onitemrender)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values](slug:components/combobox/custom-value) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The examples below use binding to string data for simplicity, but you can use [full models](slug:components/combobox/databind) as well. Make sure to review the [Data Binding - Missing Value or Data](slug:components/combobox/databind#missing-value-or-data) section to provide all necessary parameters to the component if you do so. The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle ValueChanged with list values

<demo metaUrl="client/combobox/events/value-changed-list/" height="250"></demo>

>caption Handle ValueChanged with custom values - the event fires on every keystroke

<demo metaUrl="client/combobox/events/value-changed-custom/" height="280"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. It is suitable for handling custom values the user can enter as if the combo box were an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, but it fires when an item is selected from the dropdown. To get the selected item, you can check if the new value is present in the data source.

See the [ComboBox Overview - Selected Item](slug:components/combobox/overview#selected-item) article for details on when the event fires and how item selection and `Value` work.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

<demo metaUrl="client/combobox/events/on-change-list/" height="280"></demo>

>caption Handle OnChange with custom values - the event fires on blur or enter

<demo metaUrl="client/combobox/events/on-change-custom/" height="280"></demo>

## OnRead

You can use the [`OnRead` event](slug:common-features-data-binding-onread) to provide data to the component based on custom logic and the current user input and/or scroll position (when using [virtualization](slug:combobox-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug:components/combobox/filter).
* The user scrolls with [virtualization](slug:combobox-virtualization) enabled.

You can also call remote data through `async` operations.

Find out how to [get the applied filtering and grouping criteria](slug:common-features-descriptors).

When using `OnRead`, make sure to set `TItem` and `TValue`.

>caption Custom Data according to the user input in the ComboBox

>tip You can also [debounce the service calls and implement minimum filter length](slug:combo-kb-debounce-onread).

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)


<demo metaUrl="client/combobox/events/on-read-custom/" height="320"></demo>

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](slug:components/combobox/databind) article for examples. You can also use [custom values](slug:components/combobox/custom-value).


>caption Filter large local data through the Telerik DataSource extensions

<demo metaUrl="client/combobox/events/on-read-local/" height="350"></demo>

## OnOpen

The `OnOpen` event fires before the ComboBox popup renders. 

The event handler receives as an argument an `ComboBoxOpenEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/combobox/events/on-open/" height="280"></demo>

## OnClose

The `OnClose` event fires before the ComboBox popup closes.

The event handler receives as an argument an `ComboBoxCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/combobox/events/on-close/" height="280"></demo>

## OnItemRender

The `OnItemRender` event fires when each item in the ComboBox dropdown renders.

The event handler receives as an argument an `ComboBoxItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item` | The current item that renders in the ComboBox. |
| `Class` | The custom CSS class that will be added to the item. |

<demo metaUrl="client/combobox/events/on-item-render/" height="300"></demo>

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/combobox/events/on-blur/" height="250"></demo>


## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)

