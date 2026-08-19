---
title: Events
page_title: AutoComplete - Events
description: Events in the AutoComplete for Blazor.
slug: autocomplete-events
tags: telerik,blazor,autocomplete,events
published: true
position: 35
components: ["autocomplete"]
---

# AutoComplete Events

This article explains the events available in the Telerik AutoComplete for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)
* [OnRead](#onread)
* [OnOpen](#onopen)
* [OnClose](#onclose)
* [OnItemRender](#onitemrender)
* [OnBlur](#onblur)

## ValueChanged

The `ValueChanged` event fires on every user keystroke that changes the textbox value.

>caption Handle AutoComplete ValueChanged

<demo metaUrl="client/autocomplete/events/value-changed/" height="250"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

<demo metaUrl="client/autocomplete/events/value-changed-initial/" height="280"></demo>

## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the input or dropdown). It does not fire on every keystroke, but it fires when an item is selected from the dropdown.

>caption Handle OnChange

<demo metaUrl="client/autocomplete/events/on-change/" height="280"></demo>

## OnRead

You can use the [`OnRead` event](slug:common-features-data-binding-onread) to provide data to the component based on custom logic and the current user input and/or scroll position (when using [virtualization](slug:autocomplete-virtualization)). The event fires when:

* The component initializes.
* The user [filters](slug:autocomplete-filter).
* The user scrolls with [virtualization](slug:autocomplete-virtualization) enabled.

You can also call remote data through async operations.

Find out how to [get the applied filtering and grouping criteria](slug:common-features-descriptors).

When using `OnRead`, make sure to set `TItem` and `TValue`.

>caption Custom Data according to the user input in the AutoComplete

<demo metaUrl="client/autocomplete/events/on-read-custom/" height="300"></demo>

>caption Filter large local data through the Telerik DataSource extensions

<demo metaUrl="client/autocomplete/events/on-read-local/" height="350"></demo>

## OnOpen

The `OnOpen` event fires before the AutoComplete popup renders. 

The event handler receives as an argument an `AutoCompleteOpenEventArgs` object that contains:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the opening of the popup. |

<demo metaUrl="client/autocomplete/events/on-open/" height="250"></demo>

## OnClose

The `OnClose` event fires before the AutoComplete popup closes.

The event handler receives as an argument an `AutoCompleteCloseEventArgs` object that contains:

| Property | Description |
| --- | --- |
| `IsCancelled` | Set the `IsCancelled` property to `true` to cancel the closing of the popup. |

<demo metaUrl="client/autocomplete/events/on-close/" height="250"></demo>

## OnItemRender

The `OnItemRender` event fires when each item in the AutoComplete dropdown renders.

The event handler receives as an argument an `AutoCompleteItemRenderEventArgs<TItem>` object that contains:

| Property | Description |
| --- | --- |
| `Item` | The current item that renders in the AutoComplete. |
| `Class` | The custom CSS class that will be added to the item. |

<demo metaUrl="client/autocomplete/events/on-item-render/" height="300"></demo>

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

<demo metaUrl="client/autocomplete/events/on-blur/" height="250"></demo>

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
* [Filter AutoComplete Items](slug:autocomplete-filter)
* [Refresh AutoComplete Data](slug:autocomplete-refresh-data)
