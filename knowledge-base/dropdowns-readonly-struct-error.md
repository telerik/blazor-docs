---
title: ComboBox does not work when the data is readonly structs
description: Using readonly struct objects for the Data of the dropdowns causes errors
type: troubleshooting
page_title: Readonly Struct data source breaks the dropdowns
slug: dropdowns-kb-readonly-struct-error
position: 
tags: 
ticketid: 1489058
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ComboBox for Blazor, DropDownList for Blazor, Autocomplete for Blazor, MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
When using the combo box component when the desired data is list of readonly structs there is a null reference exception and the combo box does not work.


## Steps to Reproduce

````CSHTML
Selected value: @selectedValue
<br />

<TelerikComboBox Data="@myComboData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                 Placeholder="Select an item..." ClearButton="true" Filterable="true">
</TelerikComboBox>

@code {
    public readonly struct ModelData
    {
        public ModelData(string textField, int valueField)
        {
            MyTextField = textField;
            MyValueField = valueField;
        }
        public readonly string MyTextField;
        public readonly int MyValueField;
    }

    int selectedValue { get; set; } = 3;

    IEnumerable<ModelData> myComboData = Enumerable.Range(1, 20).Select(x => new ModelData("item " + x, x));
}
````

## Error Message
A typical error would be null reference exception like the one below

>warning NullReferenceException: Object reference not set to an instance of an object.
Telerik.Blazor.Components.TelerikComboBox<TItem, TValue>.<OnParametersSetAsync>b__70_0(ListDataItem item)

## Cause\Possible Cause(s)
The components require a model when binding so it can be instantiated with a parameterless constructor. This is a requirement that comes down to the forms validation that they must support and getting the `Default` value and object. Structs do not have a parameterless constructor.

## Solution
There are two approaches to avoiding this error:

* Use a model (class), not a struct, as shown [here]({%slug components/combobox/databind%}#bind-to-a-model), for example

* When setting the `Data` of the dropdown, make it a collection of anonymous objects, for example:

    **Razor**
    
        @* See the Select in the Data parameter *@
        
        <TelerikComboBox Data="@myComboData.Select(x => new {MyTextField = x.MyTextField, MyValueField = x.MyValueField })" 
                        TextField="MyTextField" ValueField="MyValueField" 
                        @bind-Value="selectedValue"
                        Placeholder="Select an item..." ClearButton="true" Filterable="false">
        </TelerikComboBox>

