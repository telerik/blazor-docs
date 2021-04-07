---
title: ComboBox popup not closing on selection
description: ComboBox popup not closing on selection
type: troubleshooting
page_title: ComboBox popup not closing on selection
slug: combobox-kb-not-closing
position:
tags:
res_type: kb
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

## Cause\Possible Cause(s)

In order for the ComboBox to function properly, the `Value` parameter should be bound to a field of the same type as the `ValueField` is bound to. Mismatch in the data types of `Value` and `ValueField` could cause odd behavior of the ComboBox such as proper selection cannot be made and the popup not being closed.

### Problematic Setup

The following example demonstrates the described problematic behavior caused by different data types provided to `Value` and `ValueField` parameters - the `ValueField`is of type `int` and the `Value` is bound to an instance of the model (`MyDdlModel`).

* Note: This behavior is observed when dealing with data where the difference is of type primitive data - model. If you try working just with different primitive types ( for example `int` - `string`) the application will not run.

````CSHTML
@* Try selecting an item - selection is not done and the popup is not closed until it loses focus *@

Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ClearButton="true" >
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

@[template](/_contentTemplates/common/get-model-from-dropdowns.md#get-model-from-dropdowns)

### Correct setup

The example below demonstrates the correct setup of the ComboBox - `Value` and `ValueField` data types are matching.

````CSHTML
@* Try selecting an item to verify the correct ComboBox behavior on selection - selection is done correctly and the popup is closed afterwards*@

Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ClearButton="true" >
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

