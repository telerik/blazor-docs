---
title: Clear the value (selection) of a combobox, dropdown, input
description: How to clear the selection of a combo box, dropdown or other input
type: how-to
page_title: Clear the selection (Value) of a combobox, dropdown, input
slug: inputs-kb-clear-selection-value
position: 
tags: combobox, dropdownlist, input, textbox
ticketid: 1531727
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ComboBox for Blazor, DropDownList for Blazor, Textbox for Blazor, DatePicker for Blazor, all other inputs and date/time pickers for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
There is no Clear() method equivalent for combo boxes. How do I clear the selection or value of the input without changing it to the placeholder text value?

## Solution
In Blazor, you clear the value of an input (such as a combobox, textbox, doropdownlist, date picker and so on) by changing its `Value` parameter to the `default` value for its type (or to a desired other value).

With the MVVM patter used by the framework, you do not need methods like `Clear()` to remove selection - when the `Value` matches the default value for its type, the Telerik component will show the placeholder automatically (if one is set).

>tip This approach applies to all inputs

Here are a few examples in their corresponding tabs per component:

>caption Clear an input (or selected item in a dropdown/combobox)

````ComboBox
@selectedValue

<br />
<TelerikButton OnClick="@Clear">Clear</TelerikButton>

<TelerikComboBox @bind-Value="selectedValue" Placeholder="Select something"
                 Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField">
</TelerikComboBox>

@code {
    int selectedValue { get; set; }
    void Clear()
    {
        // clear the combo box value (selection)
        selectedValue = default;
    }

    //data binding below
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    //Define a preselected value when the component initializes
    protected override void OnInitialized()
    {
        selectedValue = 3;
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````
````Textbox
@selectedValue

<br />
<TelerikButton OnClick="@Clear">Clear</TelerikButton>

<TelerikTextBox @bind-Value="@selectedValue" PlaceHolder="type something"></TelerikTextBox>
@code{
    string selectedValue { get; set; } = "lorem ipsum";
    void Clear()
    {
        selectedValue = null;
    }
}
````
````DropDownList
@selectedValue

<br />
<TelerikButton OnClick="@Clear">Clear</TelerikButton>

<TelerikDropDownList @bind-Value="selectedValue" DefaultText="Select something"
                 Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField">
</TelerikDropDownList>

@code {
    int selectedValue { get; set; }
    void Clear()
    {
        selectedValue = default;
    }

    //data binding below
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    //Define a preselected value when the component initializes
    protected override void OnInitialized()
    {
        selectedValue = 3;
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````
````DatePicker
@selectedValue

<br />
<TelerikButton OnClick="@Clear">Clear</TelerikButton>

<TelerikDatePicker @bind-Value="@selectedValue"></TelerikDatePicker>

@code {
    DateTime? selectedValue { get; set; } = DateTime.Now.Date;
    void Clear()
    {
        selectedValue = default;
    }
}
````
````NumericTextbox
@selectedValue

<br />
<TelerikButton OnClick="@Clear">Clear</TelerikButton>

<TelerikNumericTextBox @bind-Value="@selectedValue"></TelerikNumericTextBox>

@code {
    int? selectedValue { get; set; } = 123;
    void Clear()
    {
        selectedValue = default;
    }
}
````


## See Also

* [The basics of value binding and data binding]({%slug get-started-value-vs-data-binding%})
