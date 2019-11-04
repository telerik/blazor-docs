---
title: Events
page_title: ComboBox for Blazor | Events
description: Events in the ComboBox for Blazor
slug: components/combobox/events
tags: telerik,blazor,combobox,combo,events
published: true
position: 20
---

# ComboBox Events

This article explains the events available in the Telerik ComboBox for Blazor:

* [ValueChanged](#valuechanged)
* `OnChange` - inherited event that you should not use, but you may see in the intellisense


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values]({%slug components/combobox/custom-value%}) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The examples below use [binding]({%slug components/combobox/databind%}) to primitive types for brevity, you can use full models as well.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikComboBox Data="@MyList" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

>caption Handle ValueChanged with custom values - the event fires on every keystroke

````CSHTML
@result
<br />
<TelerikComboBox Data="@MyList" AllowCustom="true" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

>caption Handle ValueChanged and provide initial value (it is *not* required to enable custom values)

````CSHTML
@result
<br />
from model: @MyItem
<br />
<br />
<TelerikComboBox Data="@MyList" Value="@MyItem" AllowCustom="true" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikComboBox>

@code {
    string result;

    private void MyValueChangeHandler(string theUserChoice)
    {
        result = string.Format("The user chose: {0}", theUserChoice);

        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        MyItem = theUserChoice;
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };

    protected string MyItem { get; set; } = "second";
}
````

## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
