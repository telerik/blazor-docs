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
* [OnChange](#onchange)


## ValueChanged

The `ValueChanged` event fires upon every change of the user selection. When [custom values]({%slug components/combobox/custom-value%}) are enabled, it fires upon every keystroke, like in a regular `<input>` element.

The examples below use binding to primitive types for brevity, you can use [full models]({%slug components/combobox/databind%}) as well. Make sure to review the [Data Binding - Missing Value or Data]({%slug components/combobox/databind%}#missing-value-or-data) section to provide all necessary parameters to the component if you do so.

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


## OnChange

The `OnChange` event is suitable for handling custom values the user can enter as if the combo box were an input. The key differences with `ValueChanged` are:

* `OnChange` does not prevent two-way binding (the `@bind-Value` syntax)
* `OnChange` fires only when the user presses `Enter`, or blurs the input (for example, clicks outside of the combo box). It does not fire on every keystroke, even when `AllowCustom="true"`, and it does not fire when an item is selected from the dropdown.

See the [ComboBox Overview - Selected Item]({%slug components/combobox/overview%}#selected-item) article for details on when the event fires and how item selection and `Value` work.

>caption Handle OnChange without custom values - to get a value from the list, you must write text that will match the text of an item (e.g, "item 5").

````CSHTML
@result
<br />
@selectedValue
<br /><br />
<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField"
                 @bind-Value="@selectedValue" OnChange="@MyOnChangeHandler">
</TelerikComboBox>

@code {
    string result;
    int selectedValue { get; set; } = 3;

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (int)theUserInput);
    }

    public class MyComboModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyComboModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyComboModel { MyTextField = "item " + x, MyValueField = x });
}
````

>caption Handle OnChange with custom values - the event fires on blur or enter

````CSHTML
@result
<br />
@selectedValue
<br /><br />
<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField"
                 @bind-Value="@selectedValue" OnChange="@MyOnChangeHandler" AllowCustom="true">
</TelerikComboBox>

@code {
    string result;
    string selectedValue { get; set; } = "3";

    private void MyOnChangeHandler(object theUserInput)
    {
        // the handler receives an object that you may need to cast to the type of the component
        // if you do not provide a Value, you must provide the Type parameter to the component
        result = string.Format("The user entered: {0}", (string)theUserInput);
    }

    public class MyComboModel
    {
        public string MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyComboModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyComboModel { MyTextField = "item " + x, MyValueField = x.ToString() });
}
````


## See Also

* [ValueChanged and Validation]({%slug value-changed-validation-model%})
