---
title: ComboBox popup not closing on selection
description: ComboBox popup not closing on selection
type: troubleshooting
page_title: ComboBox popup not closing on selection
slug: combobox-kb-not-closing
position:
tags:
res_type: kb
components: ["combobox"]
---
## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ComboBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

ComboBox is not closing when trying to select item - selection is not done and the popup remains opened until it loses focus.

## Possible Cause

In order for the ComboBox to function properly, the `Value` parameter should be bound to a field of the same type as the `ValueField` is bound to. Mismatch in the data types of `Value` and `ValueField` could cause odd behavior of the ComboBox such as proper selection cannot be made and the popup not being closed.

### Problematic Setup

The following example demonstrates the described problematic behavior caused by different data types provided to the `Value` and `ValueField` parameters. The `ValueField` property is of type `int` and the `Value` is bound to an instance of `MyDdlModel`.

````RAZOR
@* Try selecting an item - selection is not done and the popup is not closed until it loses focus *@

Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ShowClearButton="true" >
</TelerikComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    //data mistmatch - selectedValue field that is bound to the Value parameter is an instance of the MyDdlModel model, while MyValueField is of type int
    MyDdlModel selectedValue { get; set; }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

## Solution

To avoid the above described behavior you need to bind the `Value` parameter to a field of the same type as the `ValueField` is bound to.

>tip If you are looking for more fields from the view-model that describes the dropdown items, not just the `Value`, see the [Get model from dropdown](slug:dropdowns-get-model) KB article and the [OnChange](slug:components/combobox/events#onchange) event.
>
> You may also want to review/join the discussion and Vote for this request: <a href="https://www.telerik.com/forums/binding-dropdownlist-value-to-complex-model" target="_blank">Binding DropDownList Value to complex model</a>

### Correct setup

The example below demonstrates the correct setup of the ComboBox - `Value` and `ValueField` data types are matching.

````RAZOR
@* Try selecting an item to verify the correct ComboBox behavior on selection - selection is done correctly and the popup is closed afterwards*@

Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ShowClearButton="true" >
</TelerikComboBox>

@code {
    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    //selectedValue field that is bound to the Value parameter matches MyValueField type ( int )
    int selectedValue { get; set; }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

