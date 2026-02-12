---
title: Read-Only ListBox
description: Learn how to achieve a read-only effect for the ListBox component in UI for Blazor using event handlers and toolbar visibility settings.
type: how-to
page_title: How to Achieve Read-Only Mode for ListBox in Blazor
meta_title: How to Achieve Read-Only Mode for ListBox in Blazor
slug: listbox-kb-readonly
tags: listbox, blazor, readonly
res_type: kb
ticketid: 1708525
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to make the [ListBox](listbox-overview) read-only. I am looking for a solution that doesn't allow users to modify the selected items or interact with the toolbar.

## Solution

To achieve a read-only effect in the TelerikListBox, follow these steps:

1. Use one-way binding for the `SelectedItems` parameter of the component.
2. Define a [`SelectedItemsChanged` event](slug:listbox-events#selecteditemschanged) handler, but avoid updating the `SelectedItems` parameter in the handler.
3. Hide the ListBox toolbar by setting the `Visible` property of the `ListBoxToolBar` to `false`.

Here is an example:

````Razor
<TelerikListBox Data="@ListBoxStrings"
                SelectedItems="@ListBoxSelectedStrings"
                SelectedItemsChanged="@((IEnumerable<string> list) => ListBoxSelectedStringsHandler(list))"
                Height="auto">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

@code {
    private List<string> ListBoxStrings { get; set; } = new List<string>();
    private IEnumerable<string> ListBoxSelectedStrings { get; set; } = new List<string>();

    private void ListBoxSelectedStringsHandler(IEnumerable<string> list)
    {
        //keep it empty
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxStrings.Add($"String {i}");
        }
    }
}
````

## See Also

* [TelerikListBox Overview](slug:listbox-overview)
* [TelerikListBox Events](slug:listbox-events)
* [TelerikListBox Toolbar](slug:listbox-toolbar)
