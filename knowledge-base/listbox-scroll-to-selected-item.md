---
title: Scroll ListBox to Selected Item
description: How to use JavaScript scrollIntoView to scroll the Telerik Blazor ListBox to its first selected item
type: how-to
page_title: How to Scroll ListBox to the First Selected Item
slug: listbox-kb-scroll-to-selected-item
position: 
tags: telerik, blazor, listbox, selection, scrolling
ticketid: 1628516
res_type: kb
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

This knowledge base article answers the following questions:

* How to scroll the ListBox component to the initially selected item?
* How to scroll automatically to the first selected ListBox item on page load?


## Solution

1. [Call a JavaScript function](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet) in `OnAfterRenderAsync` when `firstRender` is true.
1. Use JavaScript code (for example, [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)) to locate the ListBox component(s) on the page. Use the ListBox `Class` parameter to set a unique custom CSS class, or use a selector with a built-in class `.k-listbox`.
1. Execute [`scrollIntoView`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) for one selected item (`li.k-list-item.k-selected`) in the desired ListBox instance(s).
1. (optional) Apply a [`smooth` `scroll-behavior` CSS style](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) to all ListBoxes for better scrolling UX.

>caption Scrolling to the first selected item in each ListBox

````RAZOR
@inject IJSRuntime js

<TelerikListBox Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems1"
                Width="250px"
                Height="200px"
                Class="listbox1">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false">
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikListBox Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems2"
                Width="250px"
                Height="200px"
                Class="listbox2">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false">
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

@* Move JavaScript to an external JS file in production *@
<script suppress-error="BL9992">
    function scrollListBox(selector) {
        var listBox = document.querySelector(selector);
        if (listBox) {
            var selectedItem = listBox.querySelector(".k-list-item.k-selected");
            if (selectedItem) {
                selectedItem.scrollIntoView();
            }
        }
    }
</script>

<style>
    .k-listbox .k-list-content {
        scroll-behavior: smooth;
    }
</style>

@code {
    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems1 { get; set; } = new List<ListBoxModel>();
    private IEnumerable<ListBoxModel> ListBoxSelectedItems2 { get; set; } = new List<ListBoxModel>();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // Trigger browser rendering first.
            // The delay duration doesn't matter.
            await Task.Delay(1);

            await js.InvokeVoidAsync("scrollListBox", ".listbox1");
            await js.InvokeVoidAsync("scrollListBox", ".listbox2");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 100; i++)
        {
            ListBoxData.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"ListBox Item {i}",
            });
        }
        ListBoxSelectedItems1 = ListBoxData.Where(x => x.Id == 17 || x.Id == 19);
        ListBoxSelectedItems2 = ListBoxData.Where(x => x.Id == 33 || x.Id == 38);
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````


## See Also

* [ListBox Selection](slug:listbox-selection)
