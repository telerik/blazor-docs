---
title: Events
page_title: RadioGroup - Events
description: Events in the Radio Button Group for Blazor.
slug: radiogroup-events
tags: telerik,blazor,radio button group,list,dropdownlist,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik RadioGroup for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnBlur](#onblur)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding]({%slug radiogroup-databind%}) article for more details.


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the RadioGroup, it fires when the user selects an item because there is no other action.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

````CSHTML
@SelectedValue
<br />
<TelerikRadioGroup Data="@Data" @bind-Value="@SelectedValue" OnChange="@OnChangeHandler"></TelerikRadioGroup>
@code{
    string SelectedValue { get; set; }
    IEnumerable<string> Data { get; set; } = new List<string> { "first", "second", "third" };

    async Task OnChangeHandler(object  newValue)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        Console.WriteLine($"ValueChanged fired with value: {newValue as string}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

The example below uses [binding]({%slug radiogroup-databind%}) to primitive types for brevity, you can use full models as well.

>caption Handle ValueChanged

````CSHTML
@SelectedValue
<br />
<TelerikRadioGroup Data="@Data" Value="@SelectedValue" ValueChanged="@( (string v) => ValueChangedHandler(v) )"></TelerikRadioGroup>
@code{
    string SelectedValue { get; set; }
    IEnumerable<string> Data { get; set; } = new List<string> { "first", "second", "third" };

    void ValueChangedHandler(string newValue)
    {
        SelectedValue = newValue;
        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        Console.WriteLine($"ValueChanged fired with value: {newValue}");
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)



## OnBlur

The `OnBlur` event fires when an element inside the component loses focus (radio button or the entire component).

>caption Handle the OnBlur event

````CSHTML
@* You may not have to use OnChange to react to loss of focus *@

<TelerikRadioGroup Data="@Data" @bind-Value="@SelectedValue"
                   OnBlur="@OnBlurHandler">
</TelerikRadioGroup>

@code{
    async Task OnBlurHandler()
    {
        Console.WriteLine($"BLUR fired, the last value WAS {SelectedValue}.");
    }

    string SelectedValue { get; set; }
    IEnumerable<string> Data { get; set; } = new List<string> { "first", "second", "third" };
}
````




## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
