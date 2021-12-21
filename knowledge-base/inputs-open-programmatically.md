---
title: Open Dropdown on Focus
description: 
type: how-to
page_title: Open Dropdown Programmatically on Focus
slug: inputs-kb-open-programmatically
position: 
tags: autocomplete,combobox,dropdown,dropdownlist,multiselect,focus,open
ticketid: 1526273, 1539587, 1547004
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>**2.25** and later</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>
                AutoComplete <br />
                ComboBox <br />
                DropDownList <br />
                MultiSelect <br />
            </td>
		</tr>
	</tbody>
</table>

## Description


## Solution

To begin with, [all Telerik inputs and dropdowns have a `FocusAsync` method]({%slug inputs-kb-focus%}) to focus them with code.

The **DropDownList** and **MultiSelect** open automatically on click. They need JavaScript code only to open on tab and `FocusAsync`.

The **AutoComplete** and **ComboBox** do not open automatically and need JavaScript for all three use cases - tab, click and `FocusAsync`.

Review the `attachFocusHandler` JavaScript function below. It is called in `OnAfterRenderAsync` and attaches a focus handler to each component textbox. The handler simulates aN *Alt + Down* keyboard shortcut, which opens the dropdowns as a standard accessibility and usability feature.

>caption Focus Component and Open Dropdown Programmatically

````CSHTML
@inject IJSRuntime js
@* Open dropdown on click, tab and FocusAsync *@

<!-- allow the script tag to be in the Razor file -->
<script suppress-error="BL9992">//
    // for DropDownList and MultiSelect this is enough to open their dropdowns after FocusAsync
    function openDropdown(id) {
        var element = document.getElementById(id);
        if (element) {
            element.dispatchEvent(new Event("click"));
        }
    }

    function attachFocusHandler(id, componentClass) {
        var element = document.getElementById(id);
        if (element) {
            element.addEventListener("focus", (event) => {
                var keyEvent = new KeyboardEvent("keydown", {
                    "altKey": true,
                    "code": "ArrowDown",
                    "key": "ArrowDown",
                    "keyCode": 40
                });
                if ((componentClass == ".k-multiselect" && (!event.relatedTarget || event.relatedTarget != element.parentNode.parentNode))
                    || (componentClass != undefined && componentClass != ".k-multiselect")) {
                    // AutoComplete and ComboBox - tab, click, FocusAsync
                    // MultiSelect - tab, FocusAsync
                    // element is an input, so we go up the DOM tree to find the component root
                    element.closest(componentClass).dispatchEvent(keyEvent);
                } else {
                    // DropDownList - tab, FocusAsync
                    // element is a span and this is the component root
                    element.dispatchEvent(keyEvent);
                }
            });
        }
    }
//</script>

<div>
    <TelerikButton OnClick="@OpenAutoComplete">Open AutoComplete</TelerikButton>
    <TelerikButton OnClick="@OpenComboBox">Open ComboBox</TelerikButton>
    <TelerikButton OnClick="@OpenDropDownList">Open DropDownList</TelerikButton>
    <TelerikButton OnClick="@OpenMultiSelect">Open MultiSelect</TelerikButton>
</div>

<br />
<br />
AutoComplete:
<TelerikAutoComplete @ref="@AutoCompleteRef"
                     Id="AC1"
                     Data="@ValueCollection"
                     ValueField="@nameof(Product.Name)"
                     @bind-Value="@StringValue" />
<br />
<br />
ComboBox:
<TelerikComboBox @ref="@ComboBoxRef"
                 Id="CB1"
                 Data="@ValueCollection"
                 TextField="@nameof(Product.Name)"
                 ValueField="@nameof(Product.ID)"
                 @bind-Value="@IntValue" />

<br />
<br />
DropDownList:
<TelerikDropDownList @ref="@DropDownListRef"
                     Id="DDL1"
                     Data="@ValueCollection"
                     TextField="@nameof(Product.Name)"
                     ValueField="@nameof(Product.ID)"
                     @bind-Value="@IntValue" />

<br />
<br />
MultiSelect:
<TelerikMultiSelect @ref="@MultiSelectRef"
                    Id="MS1"
                    Data="@ValueCollection"
                    TextField="@nameof(Product.Name)"
                    ValueField="@nameof(Product.ID)"
                    @bind-Value="@MultiValues"
                    Width="350px" AutoClose="false">
</TelerikMultiSelect>

@code {
    List<Product> ValueCollection { get; set; } = new();
    List<int> MultiValues { get; set; } = new();
    int IntValue { get; set; }
    string StringValue { get; set; }

    TelerikMultiSelect<Product, int> MultiSelectRef { get; set; }
    TelerikAutoComplete<Product> AutoCompleteRef { get; set; }
    TelerikComboBox<Product, int> ComboBoxRef { get; set; }
    TelerikDropDownList<Product, int> DropDownListRef { get; set; }

    async Task OpenAutoComplete()
    {
        await AutoCompleteRef.FocusAsync();
    }

    async Task OpenComboBox()
    {
        await ComboBoxRef.FocusAsync();
    }

    async Task OpenDropDownList()
    {
        await DropDownListRef.FocusAsync();
    }

    async Task OpenMultiSelect()
    {
        await MultiSelectRef.FocusAsync();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);

        if (firstRender)
        {
            // open on tab, click, FocusAsync:
            await js.InvokeVoidAsync("attachFocusHandler", AutoCompleteRef.Id, ".k-autocomplete");
            await js.InvokeVoidAsync("attachFocusHandler", ComboBoxRef.Id, ".k-combobox");

            // open on tab, FocusAsync:
            await js.InvokeVoidAsync("attachFocusHandler", DropDownListRef.Id);
            await js.InvokeVoidAsync("attachFocusHandler", MultiSelectRef.Id, ".k-multiselect");

            await OpenMultiSelect();
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 10; i++)
        {
            ValueCollection.Add(new Product()
            {
                ID = i,
                Name = "Product Name " + i.ToString()
            });
        }

        base.OnInitialized();
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````
