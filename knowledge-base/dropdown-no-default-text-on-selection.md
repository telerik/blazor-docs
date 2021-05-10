---
title: Show Default Text only before an item is selected
description: How to modify the Default Text to be shown only before an item is selected
type: how-to
page_title: Show Default Text only before an item is selected
slug: dropdown-kb-no-default-text-on-selection
position: 
tags: telerik,blazor,dropdownlist,default,text
ticketid: 1518898
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want the DropDownList to show the default text only when no option is selected. E.g. once the user selects a value, they are not allowed to select 'null' again.

## Solution

You can modify the default text to be shown only before an item is selected by toggling the DefaultText parameter value depending on your business logic. The example below demonstrates how to achieve that.

````CSHTML
@* Show the default text only when no option is selected *@

Selected value: @selectedValue
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue"
                     DefaultText="@( selectedValue == 0 ? "Please Select" : null )">
</TelerikDropDownList>

@code {

    int selectedValue { get; set; }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````