---
title: Get model from dropodwn
description: how to get a model from a dropdown instead of a primitive value.
type: how-to
page_title: Get model from dropdown
slug: dropdowns-get-model
position: 
tags: 
ticketid: 1452556
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>MultiSelect for Blazor, DropDownList for Blazor, ComboBox for Blazor, AutoCopmlete for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to get an instance of my model when I select an item from a dropdown (such as a DropDownList, ComboBox, AutoComplete, MultiSelect). I can get only a primitive type that is the type of the `Value` and `ValueField`.

The dropdowns provide a primitive `Value` so that [validation]({%slug common-features/input-validation%}) can work, and so that other data source operations (such as filtering) can work. The Value and Text cannot be classes (models) because that would prevent validation from working and filtering/comparing entire classes is an operation that is not defined.

## Solution

The solution is to use the unique identifier you get from the component (the `Value`) and to get the entire model from its data source (the `Data` collection) by filtering it (e.g., by using the `Where()` operator).

The example below uses the DropDownList component, and the same approach is applicable for the others as well. For the MultiSelect you will have to loop over the selected values collection, of course, and for the AutoComplete you may want to ensure unique Text values (the autocomplete is a free text input with suggestions, not a dropdown with mandatory choices).

>caption Get model from dropdown

````CSHTML
@result
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField"
                     Value="@DdlValue" ValueChanged="@( (int v) => ValueChangedHandler(v) )" DefaultText="Select something">
</TelerikDropDownList>

<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField"
                     @bind-Value="@DdlValue" DefaultText="Select something">
</TelerikDropDownList>

<TelerikButton OnClick="@GetSelectedItem">Get Selected Item</TelerikButton>

@code {
    string result;
    int DdlValue { get; set; } = 5;
    
    void GetSelectedItem()
    {
        GetItemFromModelData();
    }

    void ValueChangedHandler(int v)
    {
        DdlValue = v;

        GetItemFromModelData();
    }

    void GetItemFromModelData()
    {
        // extract the data item from the data source by using the value
        MyDdlModel selectedItem = myDdlData.Where(d => d.MyValueField == DdlValue).FirstOrDefault();
        if (selectedItem != null) // e.g., custom text in a combo, or no match for an autocomplete
        {
            result = selectedItem.MyTextField;
        }
        else
        {
            result = "no item selected";
        }

        StateHasChanged();
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````

