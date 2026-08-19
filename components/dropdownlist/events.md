---
title: Events
page_title: DropDownList - Events
description: Events in the DropDownList for Blazor.
slug: components/dropdownlist/events
tags: telerik,blazor,dropdown,list,dropdownlist,events
published: true
position: 35
components: ["dropdownlist"]
---

# Events

This article explains the events available in the Telerik DropDownList for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnItemRender](#onitemrender)
* [OnBlur](#onblur)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding](slug:components/dropdownlist/databind) article for more details.

## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

The example below uses [binding](slug:components/dropdownlist/databind) to string data for brevity. You can use full models as well. The type of the argument in the lambda expression must match the `Value` type of the component, and the `ValueField` type (if `ValueField` is set).

>caption Handle DropDownList ValueChanged

<demo metaUrl="client/dropdownlist/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the DropDownList, it fires when the user selects an item as well. See [here](slug:ddl-kb-onchange-fires-twice) for sample logic on executing it only once per value selection.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

<demo metaUrl="client/dropdownlist/events/on-change/" height="280"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## OnRead

You can use the [`OnRead` event](slug:common-features-data-binding-onread) to provide data to the component based on custom logic and the current user input and/or scroll position (when using [virtualization](slug:dropdownlist-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug:components/dropdownlist/filter).
* The user scrolls with [virtualization](slug:dropdownlist-virtualization) enabled.

Find out how to [get the applied filtering and grouping criteria](slug:common-features-descriptors).

You can also call remote data through `async` operations.

>caption Custom Data according to the user input in the DropDownList

>tip You can also debounce the service calls and implement minimum filter length. An example of such approach is available in [this knowledge base article for the ComboBox](slug:combo-kb-debounce-onread). The same approach is applicable for the DropDownList.

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-in-onread)


<demo metaUrl="client/dropdownlist/events/on-read-custom/" height="320"></demo>

>tip This example uses plain strings for brevity, you can use full models - see the [data binding](slug:components/dropdownlist/databind) article for examples.


>caption Filter large local data through the Telerik DataSource extensions

<demo metaUrl="client/dropdownlist/events/on-read-local/" height="350"></demo>

## OnOpen

The `OnOpen` event fires before the DropDownList popup renders. 

The event handler receives as an argument an `DropDownListOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/dropdownlist/events/on-open/" height="280"></demo>

## OnClose

The `OnClose` event fires before the DropDownList popup closes.

The event handler receives as an argument an `DropDownListCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/dropdownlist/events/on-close/" height="280"></demo>

## OnItemRender

The `OnItemRender` event fires when each item in the DropDownList popup renders.

The event handler receives as an argument an `DropDownListItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item` | The current item that renders in the DropDownList. |
| `Class` | The custom CSS class that will be added to the item.     |

<demo metaUrl="client/dropdownlist/events/on-item-render/" height="300"></demo>

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/dropdownlist/events/on-blur/" height="250"></demo>

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
* [Blazor DropDownList](slug:components/dropdownlist/overview)