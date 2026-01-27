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

````RAZOR
<p>Last event: @EventLog</p>

<TelerikSignature Value="@SignatureValue"
                  ValueChanged="@ValueChangedHandler"
                  OnBlur="@OnSignatureBlur"
                  OnChange="@OnSignatureChange"
                  Width="300px"
                  Height="300px">
</TelerikSignature>

@code {
    private string SignatureValue { get; set; }

    private string EventLog { get; set; } = "...";

    private void ValueChangedHandler(string value)
    {
        SignatureValue = value;

        EventLog = $"ValueChanged event fired at {DateTime.Now.ToLongTimeString()}";
    }

    private void OnSignatureBlur()
    {
        EventLog = $"OnBlur event fired";
    }

    private void OnSignatureChange(string value)
    {
        EventLog = $"OnChange event fired";
    }
}
````


## See Also

* [Signature Overview](slug:signature-overview)
