---
title: Display Loading Indicators during Virtual Scrolling
description: Learn how to display loading skeleton indicators during virtual scrolling in a Telerik Blazor AutoComplete, ComboBox, DropDownList, MultiColumnComboBox, and MultiSelect componenta.
type: how-to
page_title: How to Display Loading Indicators during Virtual Scrolling
slug: dropdowns-kb-show-loading-indicator-skeletons-during-virtual-scrolling
tags: telerik, blazor, virtualization, autocomplete, combobox, dropdownlist, multicolumncombobox, multiselect
ticketid: 1587267, 1699463
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
                MultiColumnComboBox for Blazor, <br />
                MultiSelect for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to show loading indicators in the Telerik select components during virtual scrolling?
* How to display loading skeletons while the user scrolls a Telerik dropdown component with virtual scroll mode?
* How to improve the Telerik dropdown virtualization styling and add gray bars during scrolling?

## Solution

To show loading indicators (skeletons) during virtual scrolling of Telerik dropdown components:

1. Add an image to your app, which looks like one or more lines of skeletons.
1. Set the image as a repeating background to the `.k-list-container .k-virtual-scroller-size` CSS combinator.
1. Apply a background color to `.k-list-container .k-list-ul`, so that users do not see the background image behind the rendered dropdown items.

>caption Display skeleton loading indicators during virtual scrolling of Telerik dropdown components

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikDropDownList @bind-Value="@SelectedValue"
                     OnRead="@OnSelectRead"
                     TItem="@ListItem"
                     TValue="@int"
                     TextField="@nameof(ListItem.Text)"
                     ValueField="@nameof(ListItem.Id)"
                     ScrollMode="@DropDownScrollMode.Virtual"
                     ValueMapper="@GetItemFromValue"
                     ItemHeight="30"
                     PageSize="20"
                     Filterable="true"
                     FilterOperator="@StringFilterOperator.Contains"
                     Width="240px" />

<TelerikComboBox @bind-Value="@SelectedValue"
                 OnRead="@OnSelectRead"
                 TItem="@ListItem"
                 TValue="@int"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 ScrollMode="@DropDownScrollMode.Virtual"
                 ValueMapper="@GetItemFromValue"
                 ItemHeight="30"
                 PageSize="20"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Width="240px" />

<style>
    /* Apply background color to regular items, so that the skeletons are not visible behind them */
    .k-list-container .k-list-ul {
        background: var(--kendo-color-surface);
    }

    /* Show skeletons during virtual scrolling */
    .k-list-container .k-virtual-scroller-size {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9Ijk2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGcgaWQ9IkxheWVyXzEiPgogIDx0aXRsZT5Ta2VsZXRvbnM8L3RpdGxlPgogIDxyZWN0IGlkPSJzdmdfMSIgaGVpZ2h0PSIxNCIgd2lkdGg9IjE4MCIgeT0iMCIgeD0iMCIgZmlsbD0iI2Q5ZDlkOSIvPgogIDxyZWN0IGlkPSJzdmdfMiIgaGVpZ2h0PSIxNCIgd2lkdGg9IjkwIiB5PSIyNCIgeD0iMCIgZmlsbD0iI2Q5ZDlkOSIvPgogIDxyZWN0IGlkPSJzdmdfMyIgaGVpZ2h0PSIxNCIgd2lkdGg9IjE1MCIgeT0iNDgiIHg9IjAiIGZpbGw9IiNkOWQ5ZDkiLz4KICA8cmVjdCBpZD0ic3ZnXzQiIGhlaWdodD0iMTQiIHdpZHRoPSIxMjAiIHk9IjcyIiB4PSIwIiBmaWxsPSIjZDlkOWQ5Ii8+CiA8L2c+Cjwvc3ZnPg==");
        background-repeat: repeat-y;
        background-position: 8px 0;
    }
</style>

@code {
    private List<ListItem> ListItems { get; set; } = new();

    private int SelectedValue { get; set; } = 3;

    // Use the correct event argument type in your app.
    // ReadEventArgs is a base type.
    private async Task OnSelectRead(ReadEventArgs args)
    {
        DataSourceResult result = await ListItems.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    private async Task<ListItem?> GetItemFromValue(int id)
    {
        // Simulate async operation.
        await Task.Delay(100);
        return ListItems.FirstOrDefault(x => x.Id == id);
    }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        ListItems = Enumerable.Range(1, 1000).Select(x =>
        {
            return new ListItem()
            {
                Id = x,
                Text = $"Item {x} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}"
            };

        }).ToList();

        base.OnInitialized();
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

## Notes

The Base64-encoded SVG image above was created from the following markup. You can modify it, according to your preferences, instead of starting from scratch.

````HTML
<svg width="180" height="96" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_1">
        <title>Skeletons</title>
        <rect id="svg_1" height="14" width="180" y="0" x="0" fill="#d9d9d9" />
        <rect id="svg_2" height="14" width="90" y="24" x="0" fill="#d9d9d9" />
        <rect id="svg_3" height="14" width="150" y="48" x="0" fill="#d9d9d9" />
        <rect id="svg_4" height="14" width="120" y="72" x="0" fill="#d9d9d9" />
    </g>
</svg>
````

## See Also

* [AutoComplete Virtualization](slug:autocomplete-virtualization)
* [ComboBox Virtualization](slug:combobox-virtualization)
* [DropDownList Virtualization](slug:dropdownlist-virtualization)
* [MultiColumnComboBox Virtualization](slug:multicolumncombobox-virtualization)
* [MultiSelect Virtualization](slug:multiselect-virtualization)
