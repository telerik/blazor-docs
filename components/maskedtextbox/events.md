---
title: Events
page_title: MaskedTextbox - Events
description: Events in the Masked Textbox for Blazor.
slug: maskedtextbox-events
tags: telerik,blazor,masked,textbox,events
published: true
position: 50
---

# Events

This article explains the events available in the Telerik MaskedTextbox for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the user presses `Enter` in the input, or when the input loses focus. It does not prevent you from using two-way binding for the `Value`.

>caption Handle OnChange and use two-way binding for the Value

````CSHTML
@TheValue
<br />

<TelerikMaskedTextBox Mask="0000-0000-0000-0000" @bind-Value="@TheValue"
                      OnChange="@OnChangeHandler"
                      Label="Credit Card Number:">
</TelerikMaskedTextBox>

@code{
    string TheValue { get; set; }
    async Task OnChangeHandler(object newVal)
    {
        // the handler receives an object that you may need to cast
        
        Console.WriteLine($"The user confirmed {newVal as string}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.


## ValueChanged

The `ValueChanged` event fires upon every change (for example, keystroke) in the input.

>caption Handle ValueChanged

````CSHTML
@TheValue
<br />

<TelerikMaskedTextBox Mask="0000-0000-0000-0000" Value="@TheValue"
                      ValueChanged="@ValueChangedHandler"
                      Label="Credit Card Number:">
</TelerikMaskedTextBox>

@code{
    string TheValue { get; set; }
    void ValueChangedHandler(string newVal)
    {
        TheValue = newVal;

        Console.WriteLine($"The user just entered {newVal}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)




## OnBlur

The `OnBlur` event fires when the component loses focus. Fires before the [OnChange](#onchange) event.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikMaskedTextBox @bind-Value="@TheValue" Mask="0000-0000-0000-0000"
                     OnBlur="@OnBlurHandler">
</TelerikMaskedTextBox>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheValue}.");
    }

    string TheValue { get; set; }
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
