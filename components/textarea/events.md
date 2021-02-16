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

The events exposed for the Telerik TextArea for Blazor let you react to user actions and input. This article explains the events available in the Telerik TextArea.

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

## OnChange

The `OnChange` event represents a user action - confirmation of the current value. It fires when the input loses focus.

The `OnChange` event does not prevent you from using two-way data binding.

>caption Handle OnChange event

````CSHTML
@TextAreaValue
<br />
<TelerikTextArea @bind-Value="@TextAreaValue"
                 OnChange="@OnChangeHandler">
</TelerikTextArea>

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
@TextAreaValue
<br />
<TelerikTextArea Value="@TextAreaValue"
                 ValueChanged="@ValueChangedHandler">
</TelerikTextArea>

@code {
    public string TextAreaValue { get; set; }

    public void ValueChangedHandler(string input)
    {
        // you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        TextAreaValue = input;
        Console.WriteLine($"The ValueChange event fired with {input}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)



## OnBlur

The `OnBlur` event fires when the component loses focus.

>caption Handle the OnBlur event

````CSHTML
@* You do not have to use OnChange to react to loss of focus *@

<TelerikTextArea @bind-Value="@TheValue"
                 OnBlur="OnBlurHandler">

</TelerikTextArea>
@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, current value is {TheValue}.");
    }

    string TheValue { get; set; }
}
````


## See Also

* [TextArea Overview]({%slug textarea-overview%})
* [ValueChanged and Validation]({%slug value-changed-validation-model%})
* [Fire OnChange Only Once]({%slug ddl-kb-onchange-fires-twice%})
