---
title: How to bind DropDown to an Enum
description: how to bind a dropdown to an enum (combo, dropdownlist).
type: how-to
page_title: Bind DropDownList or ComboBox to Enum
slug: dropdown-kb-bind-to-enum
position: 
tags: 
ticketid: 1450139
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor, ComboBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to bind the Data source for a Blazor UI DropDownList or ComboBox to an Enum?

## Solution
You need to prepare an `IEnumerable` collection of items that correspond to the enum values and can be shown to the user. At the minimum, that is a collection of `string` versions of the enum. If you want to get the `Value` to actually be an enum, you will need a model that holds this value and a srting representation for the user.

Here are examples of both.

>caption Enum as string

````CSHTML
@CurrValue
<br />
@* note that in this case the value is a string, not an enum *@
@CurrValue?.GetType()
<br />
<TelerikDropDownList Data="@DdlData" @bind-Value="@CurrValue"></TelerikDropDownList>

@* for a combo box, make sure that custom values and clearing are not available unless you are explicitly OK with that *@
<TelerikComboBox Data="@DdlData" @bind-Value="@CurrValue" ClearButton="false" AllowCustom="false" Filterable="true"></TelerikComboBox>

@code{
    string CurrValue { get; set; }
    List<string> DdlData { get; set; } = Enum.GetNames(typeof(Telerik.Blazor.AnimationType)).ToList();
}
````

>caption Enum as Value

````CSHTML
@selectedValue
<br />
@* in this case the value is the enum type *@
@selectedValue.GetType()
<br />
<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
</TelerikDropDownList>

@* for a combo box, make sure that custom values and clearing are not available unless you are explicitly OK with that *@
<TelerikComboBox Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue"
                 ClearButton="false" AllowCustom="false" Filterable="true">
</TelerikComboBox>

@code {
    public class EnumDdlModel
    {
        public Telerik.Blazor.AnimationType MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    Telerik.Blazor.AnimationType selectedValue { get; set; }
    List<EnumDdlModel> myDdlData { get; set; } = new List<EnumDdlModel>();

    protected override void OnInitialized()
    {
        //prepare instances of the model from the list of enum values and a desired string representation for the user
        foreach (Telerik.Blazor.AnimationType item in Enum.GetValues(typeof(Telerik.Blazor.AnimationType)))
        {
            myDdlData.Add(new EnumDdlModel { MyTextField = item.ToString(), MyValueField = item });
        }

        base.OnInitialized();
    }
}
````
