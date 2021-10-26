---
title: Change the Item Background Color of the ComboBox and DropDownList
description: How to change the background color of the items in the ComboBox dropdown?
type: how-to
page_title: Use Custom Background Color for the ComboBox and DropDownList Items
slug: dropdowns-custom-item-background
position: 
tags: item, custom, background, color, combobox, dropdown, dropdownlist
ticketid: 1540151
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>AutoComplete, ComboBox, DropDownList, MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How to change the background color of individual items in the ComboBox or DropDownList dropdown? I would also like to display the item's color in the component itself when that item is selected.

## Solution

It is possible to apply a custom background color to each item inside the ComboBox/DropDownList dropdown. To achieve that, use an [**ItemTemplate**]({%slug components/dropdownlist/templates%}). The same customization is possible for the AutoComplete and MultiSelect.

On the other hand, to apply a custom background color to the value inside the component, use a [**ValueTemplate**]({%slug components/dropdownlist/templates%}). This customization is supported for the DropDownList only.

Here are some additional notes to keep in mind, and an example.

* Use a wrapper element inside the `ItemTemplate` that will apply the background. Use custom CSS classes or inline styles for the custom backgrounds.
* The dropdown items use flexbox. To make the wrapper element expand, set an explicit 100% width style for it.
* The dropdown items have paddings that will create visible gaps between the items with custom backgrounds. Similar gaps will appear between the dropdown borders and the item template content. To remove these gaps, remove the built-in paddings and add them inside the `ItemTemplate`.
* The custom background styles will override the default hover and selected styles of the items. Use additional custom CSS rules to re-apply those styles. If you will use inline styles for the custom background, you will need `!important` in the external CSS rules for the hover/selected styles.

>caption Apply custom background colors to dropdown items and the DropDownList component.

````CSHTML
@* The same approach with PopupClass is possible with AutoComplete and MultiSelect *@

<TelerikComboBox Data="@ItemsToSelect"
                 @bind-Value="@SelectedValue"
                 TextField="@nameof(ModelWithColor.Text)"
                 ValueField="@nameof(ModelWithColor.ID)"
                 PopupClass="colored-dropdown">
    <ItemTemplate>
        <div class="item-wrapper" style="background: @context.Color;">
            @context.Text
        </div>
    </ItemTemplate>
</TelerikComboBox>

<TelerikDropDownList Data="@ItemsToSelect"
                     @bind-Value="@SelectedValue"
                     Filterable="false"
                     FilterOperator="StringFilterOperator.Contains"
                     TextField="@nameof(ModelWithColor.Text)"
                     ValueField="@nameof(ModelWithColor.ID)"
                     PopupClass="colored-dropdown"
                     Class="colored-input">
    <ItemTemplate>
        <div class="item-wrapper" style="background: @context.Color;">
            @context.Text
        </div>
    </ItemTemplate>
    <ValueTemplate>
        <span class="value-wrapper" style="background: @context.Color;">
            @context.Text
        </span>
    </ValueTemplate>
</TelerikDropDownList>

<style>

    /* START: Dropdowns for all components */

    /* remove default padding to avoid gaps between the backgrounds */
    .colored-dropdown .k-list .k-item {
        padding: 0;
    }

    /* expand custom background area and apply paddings inside */
    .colored-dropdown .item-wrapper {
        width: 100%;
        padding: .3em .6em;
    }

    /* (re)apply hover state background  */
    .colored-dropdown .k-item:hover .item-wrapper {
        background: #ccc !important;
    }

    /* (re)apply selected state background  */
    .colored-dropdown .k-item.k-state-selected .item-wrapper {
        background: #666 !important;
    }

    /* END: Dropdowns for all components */

    /* START: DropDownList */

    .colored-input .k-input {
        padding: 0;
    }

    .colored-input .value-wrapper {
        display: block;
        width: 100%;
        padding: 4px 8px;
    }

    /* END: DropDownList */
</style>

@code {
    int SelectedValue { get; set; } = 2;
    string SelectedString { get; set; } = "Text 2";

    List<ModelWithColor> ItemsToSelect { get; set; } = new()
    {
        new ModelWithColor() { ID = 1, Text = "Text 1", Color = "#ffc" },
        new ModelWithColor() { ID = 2, Text = "Text 2", Color = "#cfc" },
        new ModelWithColor() { ID = 3, Text = "Text 3", Color = "#ccf" },
    };

    public class ModelWithColor
    {
        public int ID { get; set; }
        public string Text { get; set; }
        public string Color { get; set; }
    }
}
````
