---
title: Events
page_title: ButtonGroup - Events
description: Events of the ButtonGroup for Blazor.
slug: buttongroup-events
tags: telerik,blazor,Toggle,button,group
published: True
position: 20
components: ["buttongroup"]
---

# ButtonGroup Events

This article describes the events of the Telerik ButtonGroup component for Blazor.

* [OnClick](#onclick)
* [SelectedChanged](#selectedchanged)

## OnClick 

The `OnClick` event fires when the user clicks or taps a button. You can use it to invoke async logic such as fetching data or calling a service.

The `OnClick` event argument is of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).

`OnClick` always fires *before* the `Selected` values of related buttons change.

>caption Handle the Button OnClick event in a ButtonGroup

<demo metaUrl="client/buttongroup/events/on-click/" height="300"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## SelectedChanged

The `SelectedChanged` fires when the user changes the selected state of a button via click, tap, Space key or Enter key. You can use it to call local view-model logic. To fetch data or perform async operations, use the [OnClick](#onclick) event.

This event is available only for `ButtonGroupToggleButton` instances.

When the `SelectionMode` is `Single`, then `SelectedChanged` fires *first* for the previously selected button, and *then* for the newly selected button.

Normally, the `SelectedChanged` handler should update the `Selected` value of the respective button. If you choose not to do that, this will effectively cancel the event.

>caption Handle the SelectedChanged event

<demo metaUrl="client/buttongroup/events/selected-changed/" height="250"></demo>

## See Also

* [ButtonGroup Overview](slug:buttongroup-overview)
* [ButtonGroup Selection](slug:buttongroup-selection)
