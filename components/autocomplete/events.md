---
title: Events
page_title: AutoComplete for Blazor | Events
description: Events in the AutoComplete for Blazor
slug: autocomplete-events
tags: telerik,blazor,autocomplete,events
published: true
position: 20
---

# AutoComplete Events

This article explains the events available in the Telerik AutoComplete for Blazor:

* [ValueChanged](#valuechanged)
* [OnChange](#onchange)


## ValueChanged

The `ValueChanged` event fires upon every keystroke the user input.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikAutoComplete Data="@Suggestions" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikAutoComplete>

@code{
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user wrote: {0}", theUserChoice);
    }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value

````CSHTML
@result
<br />
from model: @Role
<br />
<TelerikAutoComplete Data="@Suggestions" Value="@Role" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikAutoComplete>

@code{
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user wrote: {0}", theUserChoice);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        Role = theUserChoice;
    }

    string Role { get; set; } = "Intern";

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


## OnChange

The `OnChange` event represents a user action - confirmation of the current value/item. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires when the user presses `Enter` in the input, or blurs the input (for example, clicks outside of the input or dropdown). It does not fire on every keystroke, but it fires when an item is selected from the dropdown.

>caption Handle OnChange

````CSHTML
@result
<br />
from model: @Role
<br />
<TelerikAutoComplete Data="@Suggestions" @bind-Value="@Role" OnChange="@MyOnChangeHandler" >
</TelerikAutoComplete>

@code{
    string result;

    private void MyOnChangeHandler(object theUserChoice)
    {
        result = string.Format("The user confirmed: {0}", (string)theUserChoice);
    }

    string Role { get; set; }

    List<string> Suggestions { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };
}
````


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
