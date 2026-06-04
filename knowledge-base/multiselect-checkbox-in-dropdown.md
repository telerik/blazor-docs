---
title: Checkboxes in MultiSelect Dropdown
description: Learn how to add checkboxes for item selection in the MultiSelect dropdown.
type: how-to
page_title: How to Add Checkboxes in the MultiSelect Dropdown
slug: multiselect-kb-checkbox-in-dropdown
position: 
tags: telerik, blazor, multiselect
ticketid: 1453142, 1606291
res_type: kb
components: ["multiselect"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>MultiSelect for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to add checkboxes for item selection in the Telerik MultiSelect for Blazor? There should also be a "Select All" option at the top of the dropdown.

## Solution

1. Use an [`ItemTemplate`](slug:multiselect-templates#item-template) to add a [Telerik Blazor CheckBox](slug:checkbox-overview) in each item.
1. Use a [`HeaderTemplate`](slug:multiselect-templates#header-template) to add a "Select All" checkbox above the data items. Optionally, use an [indeterminate checkbox state](slug:checkbox-indeterminate-state) if only some MultiSelect items are selected.
1. (optional) Set the MultiSelect `AutoClose` parameter to `false`.
1. (optional) Set the MultiSelect [`TagMode`](slug:multiselect-tag-mode) parameter to `Single` or alternatively, set [`MaxAllowedTags`](slug:multiselect-tag-mode#summarized-tags-based-on-the-number-of-selections) to avoid drastic MultiSelect height changes when users select all items at once.

>caption Using MultiSelect checkboxes in header and item templates

````RAZOR

<TelerikMultiSelect @ref="@MultiSelectRef"
                    Data="@MultiSelectData"
                    @bind-Value="@MultiSelectValues"
                    AutoClose="false"
                    TextField="@nameof(ListItem.Text)"
                    ValueField="@nameof(ListItem.Id)"
                    ShowArrowButton="true"
                    TagMode="@MultiSelectTagMode.Multiple"
                    MaxAllowedTags="3">
    <HeaderTemplate>
        <label class="k-list-item">
            <TelerikCheckBox Value="@(MultiSelectValues.Count == MultiSelectData.Count)"
                             ValueChanged="@SelectAllChanged"
                             TValue="@bool"
                             Indeterminate="@(MultiSelectValues.Count > 0 && MultiSelectValues.Count < MultiSelectData.Count)" />
            <strong>Select All @MultiSelectData.Count Items</strong>
        </label>
    </HeaderTemplate>
    <ItemTemplate>
        <TelerikCheckBox Value="@MultiSelectValues.Contains(context.Id)" />
        @context.Text
    </ItemTemplate>
</TelerikMultiSelect>

@code {
    #nullable enable

    private TelerikMultiSelect<ListItem, int>? MultiSelectRef;
    private List<ListItem> MultiSelectData { get; set; } = new();

    private List<int> MultiSelectValues { get; set; } = new() { 1, 3 };

    private void SelectAllChanged(bool value)
    {
        if (value)
        {
            MultiSelectValues = MultiSelectData.Select(i => i.Id).ToList();
        }
        else
        {
            MultiSelectValues = new();
        }

        MultiSelectRef?.Refresh();
    }

    protected override void OnInitialized()
    {
        MultiSelectData = new List<ListItem>();

        for (int i = 1; i <= 24; i++)
        {
            MultiSelectData.Add(new ListItem()
            {
                Id = i,
                Text = $"Item {i}",
                Category = $"Category {i % 6 + 1}"
            });
        }

        base.OnInitialized();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
````

## See Also

* [MultiSelect Templates](slug:multiselect-templates)
* [MultiSelect TagMode](slug:multiselect-tag-mode)
* [CheckBox Overview](slug:checkbox-overview)
