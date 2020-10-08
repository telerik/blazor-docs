---
title: Events
page_title: TextArea - Events
description: Events in the TextArea for Blazor.
slug: textarea-events
tags: telerik,blazor,textarea,events
published: true
position: 10
---

# Events

The events exposed for the Telerik TextArea for Blazor lets you react to user actions, input. This article explains the events available in the Telerik TextArea.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus. The `OnChange` event does not prevent from using two-way data binding.

>caption Handle OnChange event

````CSHTML
<TelerikTextArea @bind-Value="@TextAreaValue"
                 OnChange="@OnChangeHandler">
</TelerikTextArea>

<br />

@TextAreaValue

@code {
    public string TextAreaValue { get; set; }

    public void OnChangeHandler(object input)
    {
        Console.WriteLine($"The OnChange event fired with {input as string}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input. When using the `ValueChanged` event you can not use two-way data binding, because the @bind-Value internally fires this event.

>caption Handle ValueChanged event

````CSHTML
<TelerikTextArea Value="@TextAreaValue"
                 ValueChanged="@((string input) => ValueChangedHandler(input))">
</TelerikTextArea>

<br />

@TextAreaValue

@code {
    public string TextAreaValue { get; set; }

    public void ValueChangedHandler(string input)
    {
        Console.WriteLine($"The ValueChange event fired with {input}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## See Also

* [TextArea Overview]({%slug textarea-overview%})
