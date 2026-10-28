---
title: Events
page_title: MultiSelect - Events
description: Events in the MultiSelect for Blazor.
slug: multiselect-events
tags: telerik,blazor,multiselect,events
published: true
position: 35
components: ["multiselect"]
---

# MultiSelect Events

This article explains the events available in the Telerik MultiSelect for Blazor:

* [`OnBlur`](#onblur)
* [`OnChange`](#onchange)
* [`OnClose`](#onclose)
* [`OnItemRender`](#onitemrender)
* [`OnOpen`](#onopen)
* [`OnRead`](#onread)
* [`OnSelectAll`](#onselectall)
* [`ValueChanged`](#valuechanged)

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/multiselect/events/example-1/" height="420"></demo>

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the input or dropdown).

`OnChange` fires when an item is selected from the dropdown, an item is removed from the selected list, or all items are removed from the selected list, just like `ValueChanged`.

>caption Handle OnChange

<demo metaUrl="client/multiselect/events/example-2/" height="420"></demo>

## OnClose

The `OnClose` event fires before the MultiSelect popup closes.

The event handler receives as an argument an `MultiSelectCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/multiselect/events/example-3/" height="420"></demo>

## OnItemRender

The `OnItemRender` event fires when each item in the MultiSelect dropdown renders. 

The event handler receives as an argument an `MultiSelectItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item`   | The current item that renders in the MultiSelect. |
| `Class`  | The custom CSS class that will be added to the item.     |

<demo metaUrl="client/multiselect/events/example-4/" height="420"></demo>

## OnOpen

The `OnOpen` event fires before the MultiSelect popup renders. 

The event handler receives as an argument an `MultiSelectOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/multiselect/events/example-5/" height="420"></demo>

## OnRead

You can use the he [`OnRead` event](slug:common-features-data-binding-onread) to provide data to the component according to some custom logic and according to the current user input and/or scroll position (for [virtualization](slug:multiselect-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug:multiselect-filter).
* The user scrolls with [virtualization](slug:dropdownlist-virtualization) enabled.

You can also call remote data through async operations.

Find out how to [get the applied filtering and grouping criteria](slug:common-features-descriptors).

>caption Custom Data according to the user input in the MultiSelect

<demo metaUrl="client/multiselect/events/example-6/" height="420"></demo>

>caption Filter large local data through the Telerik DataSource extensions

<demo metaUrl="client/multiselect/events/example-7/" height="420"></demo>

## OnSelectAll

The MultiSelect `OnSelectAll` event fires when the user clicks on the [**Select All** toggle button](slug:multiselect-item-selection#select-all-items) in the dropdown. The event handler receives a generic [`MultiSelectSelectAllEventArgs<TItem>`](slug:Telerik.Blazor.Components.MultiSelectSelectAllEventArgs-1) argument with an `Items` property that exposes the currently rendered items in the dropdown. These items may be subject to selection or deselection, depending on the current MultiSelect `Value` and the **Select All** toggle button state. `OnSelectAll` fires before [`ValueChanged`](#valuechanged).

Using `OnSelectAll` requires the [MultiSelect `EnableSelectAll` parameter value to be `true`](slug:multiselect-item-selection#select-all-items).

>caption Using the MultiSelect OnSelectAll event

<demo metaUrl="client/multiselect/events/example-8/" height="420"></demo>

## ValueChanged

The `ValueChanged` event fires when the user selection changes (the user adds or removes items). The type of the argument in the lambda expression must match the `Value` type of the component.

`ValueChanged` fires after [`OnSelectAll`](#onselectall).

@[template](/_contentTemplates/dropdowns/adaptive-rendering.md#value-changed)

>caption Handle MultiSelect ValueChanged

<demo metaUrl="client/multiselect/events/example-9/" height="420"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
