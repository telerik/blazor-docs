---
title: Events
page_title: DropDownList for Blazor | Events
description: Events in the DropDownList for Blazor
slug: components/dropdownlist/events
tags: telerik,blazor,dropdown,list,dropdownlist,events
published: true
position: 20
---

# Events

This article explains the events available in the Telerik DropDownList for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)

The examples in this article use `string` values and simple data sources for brevity. You can use full models, see the [data binding]({%slug components/dropdownlist/databind%}) article for more details.


## OnChange

The `OnChange` event represents a user action - confirmation of the current value. In inputs, it fires when the user presses `Enter` in the input, or when the input loses focus. In the DropDownList, it fires when the user selects an item.

>tip The `OnChange` event is a custom event and does not interfere with bindings, so you can use it together with models and forms.

>caption Handle the OnChange event and use two-way binding

````CSHTML
@result
<br />
from the model: @MySelectedItem
<br />
<TelerikDropDownList Data="@MyList" OnChange="@MyOnChangeHandler" @bind-Value="@MySelectedItem">
</TelerikDropDownList>

@code {
    string result;
    string MySelectedItem { get; set; } = "second";

    void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user selected: {0}", (theUserInput as string));
    }

    protected List<string> MyList = new List<string>() { "first", "second", "third" };
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection.

>note If the initial `Value` is not present in the data source, the component will select the first item of the data source and this will fire the event as well. If you do not update the field from which the `Value` is taken, you may end in an infinite loop. This scenario is most common when the initial value is `null` as data sources rarely have items with a `null` value.

The examples below use [binding]({%slug components/dropdownlist/databind%}) to primitive types for brevity, you can use full models as well.

>caption Handle ValueChanged

````CSHTML
@result
<br />
<TelerikDropDownList Data="@MyList" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikDropDownList>

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

>caption Handle ValueChanged and provide initial value

````CSHTML
from the handler: @result
<br />
from model: @MyItem
<br />
<br />
<TelerikDropDownList Data="@MyList" Value="@MyItem" ValueChanged="@( (string v) => MyValueChangeHandler(v) )">
</TelerikDropDownList>

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
