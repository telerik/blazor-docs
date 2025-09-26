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
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgMTgwIDk2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMCA0QzAgMS43OTA4NiAxLjc5MDg2IDAgNCAwSDE3NkMxNzguMjA5IDAgMTgwIDEuNzkwODYgMTgwIDRWMTBDMTgwIDEyLjIwOTEgMTc4LjIwOSAxNCAxNzYgMTRINEMxLjc5MDg2IDE0IDAgMTIuMjA5MSAwIDEwVjRaIiBmaWxsPSIjRDlEOUQ5IiAvPgo8cGF0aCBkPSJNMCAyOEMwIDI1Ljc5MDkgMS43OTA4NiAyNCA0IDI0SDg2Qzg4LjIwOTEgMjQgOTAgMjUuNzkwOSA5MCAyOFYzNEM5MCAzNi4yMDkxIDg4LjIwOTEgMzggODYgMzhINEMxLjc5MDg2IDM4IDAgMzYuMjA5MSAwIDM0VjI4WiIgZmlsbD0iI0Q5RDlEOSIgLz4KPHBhdGggZD0iTTAgNTJDMCA0OS43OTA5IDEuNzkwODYgNDggNCA0OEgxNDZDMTQ4LjIwOSA0OCAxNTAgNDkuNzkwOSAxNTAgNTJWNThDMTUwIDYwLjIwOTEgMTQ4LjIwOSA2MiAxNDYgNjJINEMxLjc5MDg2IDYyIDAgNjAuMjA5MSAwIDU4VjUyWiIgZmlsbD0iI0Q5RDlEOSIgLz4KPHBhdGggZD0iTTAgNzZDMCA3My43OTA5IDEuNzkwODYgNzIgNCA3MkgxMTZDMTE4LjIwOSA3MiAxMjAgNzMuNzkwOSAxMjAgNzZWODJDMTIwIDg0LjIwOTEgMTE4LjIwOSA4NiAxMTYgODZINEMxLjc5MDg2IDg2IDAgODQuMjA5MSAwIDgyVjc2WiIgZmlsbD0iI0Q5RDlEOSIgLz4KPC9zdmc+");
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
<svg width="180" height="96" viewBox="0 0 180 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 4C0 1.79086 1.79086 0 4 0H176C178.209 0 180 1.79086 180 4V10C180 12.2091 178.209 14 176 14H4C1.79086 14 0 12.2091 0 10V4Z" fill="#d9d9d9" />
    <path d="M0 28C0 25.7909 1.79086 24 4 24H86C88.2091 24 90 25.7909 90 28V34C90 36.2091 88.2091 38 86 38H4C1.79086 38 0 36.2091 0 34V28Z" fill="#d9d9d9" />
    <path d="M0 52C0 49.7909 1.79086 48 4 48H146C148.209 48 150 49.7909 150 52V58C150 60.2091 148.209 62 146 62H4C1.79086 62 0 60.2091 0 58V52Z" fill="#d9d9d9" />
    <path d="M0 76C0 73.7909 1.79086 72 4 72H116C118.209 72 120 73.7909 120 76V82C120 84.2091 118.209 86 116 86H4C1.79086 86 0 84.2091 0 82V76Z" fill="#d9d9d9" />
</svg>
````

## See Also

* [AutoComplete Virtualization](slug:autocomplete-virtualization)
* [ComboBox Virtualization](slug:combobox-virtualization)
* [DropDownList Virtualization](slug:dropdownlist-virtualization)
* [MultiColumnComboBox Virtualization](slug:multicolumncombobox-virtualization)
* [MultiSelect Virtualization](slug:multiselect-virtualization)
