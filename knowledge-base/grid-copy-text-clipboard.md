---
title: Copy Text from Grid Row to Clipboard
description: Learn how to add a right-click context menu option to copy text from a Grid to the clipboard and paste it into the Editor.
type: how-to
page_title: How to Copy Text from Grid to Clipboard and Paste into UI for Blazor Editor
meta_title: How to Copy Text from Grid to Clipboard and Paste into UI for Blazor Editor
slug: grid-kb-copy-text-clipboard
tags: blazor, clipboard, context-menu, copy-text, grid
res_type: kb
ticketid: 1695036
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to add a right-click context menu to a Grid, which allows copying text from the Grid to the clipboard. The copied text can then be pasted into an Editor or anywhere else.

## Solution

To achieve this, implement a context menu for the Grid and include a "Copy to Clipboard" option. Follow these steps:

1. Define the context menu and its items.
2. Handle the right-click event to show the context menu.
3. Implement the logic to copy the selected row's text to the clipboard by using the [navigator clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard).

````Razor
@using System.Collections.Generic
@using System.Collections.ObjectModel
@inject IJSRuntime JS

<TelerikEditor @bind-Value="@TheEditorValue" Width="650px" Height="400px"></TelerikEditor>

<TelerikContextMenu @ref="@ContextMenuRef" Data="@MenuItems"
                    OnClick="@((MenuItem item) => ContextMenuClickHandler(item))">
</TelerikContextMenu>

<TelerikGrid Data="@GridData" @ref="@GridRef"
             Pageable="true"
             OnRowContextMenu="@OnContextMenu">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) />
        <GridColumn Field=@nameof(SampleData.Name) />
    </GridColumns>
</TelerikGrid>

@code {
    private string TheEditorValue { get; set; }
    private ObservableCollection<SampleData> GridData { get; set; }
    private List<MenuItem> MenuItems { get; set; }
    private SampleData SelectedPerson { get; set; }
    private TelerikContextMenu<MenuItem> ContextMenuRef { get; set; }
    private TelerikGrid<SampleData> GridRef { get; set; }

    public class MenuItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public Action Action { get; set; }
        public string CommandName { get; set; }
    }

    private async Task OnContextMenu(GridRowClickEventArgs args)
    {
        SelectedPerson = args.Item as SampleData;

        if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            await ContextMenuRef.ShowAsync(mouseEventArgs.ClientX, mouseEventArgs.ClientY);
        }
    }

    private async Task ContextMenuClickHandler(MenuItem item)
    {
        if (item.Action != null)
        {
            item.Action.Invoke();
        }
        else if (item.CommandName == "CopyRow" && SelectedPerson != null)
        {
            string rowText = $"ID: {SelectedPerson.ID}, Name: {SelectedPerson.Name}";
            await CopyToClipboard(rowText);
        }

        SelectedPerson = null;
    }

    private async Task CopyToClipboard(string text)
    {
        await JS.InvokeVoidAsync("navigator.clipboard.writeText", text);
    }

    protected override void OnInitialized()
    {
        MenuItems = new List<MenuItem>()
        {
            new MenuItem(){ Text = "Copy Row Text", Icon = SvgIcon.Copy, CommandName="CopyRow" },
            new MenuItem(){ Text = "Delete", Icon = SvgIcon.Trash, Action = DeleteItem }
        };

        GridData = new ObservableCollection<SampleData>();
        for (int i = 1; i <= 20; i++)
        {
            GridData.Add(new SampleData()
            {
                ID = i,
                Name = $"Employee {i}"
            });
        }
    }

    private void DeleteItem()
    {
        if (SelectedPerson != null)
        {
            GridData.Remove(SelectedPerson);
        }
    }

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [Grid Overview](slug:grid-overview)
* [Context Menu Overview](slug:contextmenu-overview)
