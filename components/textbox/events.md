---
title: Events
page_title: Textbox - Events
description: Events in the Textbox for Blazor.
slug: components/textbox/events
tags: telerik,blazor,textbox,events
published: true
position: 20
components: ["textbox"]
---
# Events

This article explains the events available in the <a href = "https://www.telerik.com/blazor-ui/textbox" target="_blank">Telerik Textbox for Blazor</a>:

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the TextBox OnBlur event

````RAZOR
<TelerikTextBox @bind-Value="@TextBoxValue"
                OnBlur="@OnTextBoxBlur" />

<p>TextBoxValue: @TextBoxValue</p>

<p>OnBlur log: @OnBlurLog</p>

@code {
    private string OnBlurLog { get; set; } = string.Empty;

    private string TextBoxValue { get; set; } = "lorem ipsum";

    private void OnTextBoxBlur()
    {
        OnBlurLog = $"OnBlur fired at {DateTime.Now.ToString("HH:mm:ss.fff")}.";
    }
}
````

## OnChange

The `OnChange` event represents a user action that confirms the current value. It fires when the user presses `Enter` or `Tab` in the input, or when the input loses focus. If you need to monitor the component `Value` while the user is typing, then use the [`ValueChanged` event](#valuechanged) instead.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the TextBox OnChange event and use two-way Value binding

````RAZOR
<TelerikTextBox @bind-Value="TextBoxValue"
                OnChange="@OnTextBoxChange" />

<p>TextBoxValue: @TextBoxValue</p>

<p>OnChange log: @OnChangeLog</p>

@code {
    private string OnChangeLog { get; set; } = string.Empty;

    private string TextBoxValue { get; set; } = "lorem ipsum";

    private void OnTextBoxChange(object currentValue)
    {
        OnChangeLog = $"OnChange fired at {DateTime.Now.ToString("HH:mm:ss.fff")} with current value '{currentValue}'.";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle the TextBox ValueChanged event

````RAZOR
<TelerikTextBox Value="@TextBoxValue"
                ValueChanged="@TextBoxValueChanged" />

<p>TextBoxValue: @TextBoxValue</p>

<p>ValueChanged log: @ValueChangedLog</p>

@code {

    private string TextBoxValue { get; set; } = "lorem ipsum";
    private string ValueChangedLog { get; set; } = string.Empty;

    private void TextBoxValueChanged(string newValue)
    {
        TextBoxValue = newValue;
        ValueChangedLog = $"ValueChanged fired at {DateTime.Now.ToString("HH:mm:ss.fff")} with a new value '{newValue}'.";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## See Also

* [ValueChanged and Validation](slug:value-changed-validation-model)
* [Fire OnChange Only Once](slug:ddl-kb-onchange-fires-twice)
