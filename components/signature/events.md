---
title: Events
page_title: Signature - Events
description: Events in the Signature for Blazor.
slug: signature-events
tags: telerik,blazor,signature,events
published: true
position: 20
components: ["signature"]
---

# Events

This article describes the Blazor Signature events and provides a runnable example with sample event handler implementations.

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnBlur

The `OnBlur` event fires when the Signature loses focus. 

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter`, or when the component loses focus.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

## ValueChanged

The `ValueChanged` event fires when signature is fully drawn.

## Example

>caption Handle the Blazor Signature Events

<demo metaUrl="client/signature/events/example-1/" height="550"></demo>


## See Also

* [Signature Overview](slug:signature-overview)
