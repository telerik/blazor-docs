---
title: Keep Form Items Rendering Order after Show/Hide
description: How to keep the form item rendering order when changing the form item visibility.
type: how-to
page_title: Keep Form Items Rendering Order after Show/Hide
slug: form-kb-keep-fields-order
position: 
tags: 
ticketid: 1647539
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Form for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This knowledge base article answers the following questions:

* How do I keep the rendering order of Form items?
* Is it possible to toggle the visibility of a Form item and keep its rendering order instead of showing it as last?

## Solution

The `<FormItems>` tag doesn't render Form items directly. This tag is used only to register `<FormItem>` instances. The Form considers conditional field items, whose visibility may change, as the last items to be processed.

To preserve the rendering place of each form item, you need to use the `TelerikFormItemRenderer`.

````RAZOR
<TelerikForm Model="@model">
    <FormItems>

        <FormItem Field="@nameof(FormModel.Field1)">
            <Template>
                <label>Field1</label>
                <TelerikRadioGroup Data="@Items" TextField="@nameof(RadioButtonItem.TextField)" ValueField="@nameof(RadioButtonItem.ValueField)" @bind-Value="@model.Field1"
                                   Layout="RadioGroupLayout.Horizontal">
                </TelerikRadioGroup>
            </Template>
        </FormItem>

        <FormItem Field="@nameof(FormModel.Field2)">
            <Template>
                <label>Field2</label>
                <TelerikNumericTextBox @bind-Value="@model.Field2"></TelerikNumericTextBox>
            </Template>
        </FormItem>

        <FormItem Field="@nameof(FormModel.Field3)">
            <Template>
                <label>Field3</label>
                <TelerikNumericTextBox @bind-Value="@model.Field3"></TelerikNumericTextBox>
            </Template>
        </FormItem>

    </FormItems>

    <FormItemsTemplate Context="formContext">
        @{
            var formItems = formContext.Items.Cast<IFormItem>();
        }
        <TelerikFormItemRenderer Item="@formItems.First(x => x.Field == nameof(FormModel.Field1))" />
        @if (model.Field1 == 2)
        {
            <TelerikFormItemRenderer Item="@formItems.First(x => x.Field == nameof(FormModel.Field2))" />
        }
        <TelerikFormItemRenderer Item="@formItems.First(x => x.Field == nameof(FormModel.Field3))" />
    </FormItemsTemplate>
</TelerikForm>

@code {
    private FormModel model { get; set; } = new FormModel();

    private List<RadioButtonItem> Items = new List<RadioButtonItem>()
    {
        new RadioButtonItem { ValueField = 1, TextField = "Item 1" },
        new RadioButtonItem { ValueField = 2, TextField = "Item 2" },
        new RadioButtonItem { ValueField = 3, TextField = "Item 3" },
    };

    public class FormModel
    {
        public int Field1 { get; set; }
        public int Field2 { get; set; }
        public int Field3 { get; set; }
    }

    public class RadioButtonItem
    {
        public string TextField { get; set; }
        public int ValueField { get; set; }
    }
}
````

## See Also

* [Form Template for All Items](slug://form-formitems-formitemstemplate)