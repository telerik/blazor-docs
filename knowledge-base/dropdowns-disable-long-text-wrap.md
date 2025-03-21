---
title: DropDown Items Wrap or Overlap
description: Learn how to resolve and prevent text wrapping of long items in Telerik Blazor dropdown components, such as AutoComplete, ComboBox, DropDownList, and MultiSelect.
type: troubleshooting
page_title: How to Prevent Dropdown Item Text Wrapping
slug: dropdowns-kb-disable-long-text-wrap
tags: blazor, autocomplete, combobox, dropdownlist, multiselect, css, styling
ticketid: 1663555, 1668373, 1679799, 1682531
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor, <br />
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />
                MultiSelect for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article deals with the following scenarios:

1. The items in a Telerik dropdown component are long and wrap to multiple lines. The items become very high. How to avoid and disable this behavior?
1. A Telerik dropdown component is using virtualization with `ItemHeight`. Long items wrap and overlap. How to fix this UI issue?

## Cause

By default, the dropdown items are as wide as the dropdown. Text wrapping of longer items is expected.

## Solution

One option is to [set a larger `Width` in the component's `PopupSettings`](#see-also). The algorithm below assumes that this is not the preferred approach.

1. Set a custom class in the [component's `PopupSettings`](#see-also).
1. Apply a `white-space: nowrap` style to the custom class.
1. (optional) Allow horizontal scrolling with an `overflow-x: auto` style on `.k-list-content`.
1. If a `PopupSettings` tag was not present before, also set a `Height`, otherwise it will change from `"200px"` to `"auto"`.

>caption Disable text wrapping and overlapping of long dropdown items

````RAZOR
<TelerikDropDownList Data="@ListItems"
                     @bind-Value="@SelectedValue"
                     TextField="@nameof(ListItem.Text)"
                     ValueField="@nameof(ListItem.Id)"
                     Width="160px">
    <DropDownListSettings>
        <DropDownButtonPopupSettings Class="no-wrap" Height="200px" />
    </DropDownListSettings>
</TelerikDropDownList>

<TelerikComboBox Data="@ListItems"
                 @bind-Value="@SelectedValue"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 ScrollMode="@DropDownScrollMode.Virtual"
                 ItemHeight="30"
                 PageSize="12"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Width="160px">
    <ComboBoxSettings>
        <ComboBoxPopupSettings Class="no-wrap" Height="200px" />
    </ComboBoxSettings>
</TelerikComboBox>

<style>
    .no-wrap .k-list-content {
        /* prevent text wrapping */
        white-space: nowrap;
        /* allow horizontal scrolling */
        overflow-x: auto;
    }

    .no-wrap .k-list-content li {
        /* expand items beyond 100% for proper selected and hover styles */
        width: max-content;
    }
</style>

@code {
    private List<ListItem> ListItems { get; set; } = new();

    private int SelectedValue { get; set; } = 3;

    protected override void OnInitialized()
    {
        ListItems = new List<ListItem>();

        for (int i = 1; i <= 64; i++)
        {
            ListItems.Add(new ListItem()
            {
                Id = i,
                Text = $"{i} Item with a lot of text that may wrap {i}"
            });
        }

        base.OnInitialized();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## See Also

* [AutoComplete Popup Setttings](slug:autocomplete-overview#popup-settings)
* [ComboBox Popup Setttings](slug:components/combobox/overview#popup-settings)
* [DropDownList Popup Setttings](slug:components/dropdownlist/overview#popup-settings)
* [DropDownList Popup Setttings](slug:multiselect-overview#popup-settings)
