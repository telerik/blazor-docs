---
title: Change Tabindex in Reordered Tiles
description: Learn how to dynamically calculate and change the textbox tabindex in reordered Telerik TileLayout tiles in a Blazor app.
type: how-to
page_title: How to Change Tabindex in Reordered TileLayout Tiles
slug: tilelayout-kb-tabindex
tags: blazor, tilelayout
ticketid: 1706633
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TileLayout for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB shows how to change the TextBox `tabindex` in Telerik TileLayout tiles when they are reordered by the user. The goal is for the `tabindex` to always match the visible tile order.

## Solution

1. Use the [TileLayout state](slug:tilelayout-state) to obtain the current tile order. You can use the [TileLayout `OnReorder` event](slug:tilelayout-reorder#onreorder) or the [TileLayout instance](slug:tilelayout-overview#tilelayout-reference) `GetState()` method at any time.
1. Set the `tabindex` attribute of all input elements accordingly.

>caption Set textbox tabindex dynamically in Telerik TileLayout for Blazor

````RAZOR
<TelerikTileLayout @ref="@TileLayoutRef"
                   Columns="3"
                   ColumnWidth="200px"
                   OnReorder="@OnTileLayoutReorder"
                   Reorderable="true"
                   Resizable="true"
                   RowHeight="150px"
                   Width="700px">
    <TileLayoutItems>
        <TileLayoutItem HeaderText="Tile 1" Id="tile1">
            <Content>
                <TelerikTextBox @bind-Value="@TextBoxValue" Width="120px" TabIndex="@GetTabIndex("tile1")" />
                <br />
                <code>TabIndex</code>: <strong>@GetTabIndex("tile1")</strong>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 2" Id="tile2">
            <Content>
                <TelerikTextBox @bind-Value="@TextBoxValue" Width="120px" TabIndex="@GetTabIndex("tile2")" />
                <br />
                <code>TabIndex</code>: <strong>@GetTabIndex("tile2")</strong>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 3" RowSpan="2" Id="tile3">
            <Content>
                <TelerikTextBox @bind-Value="@TextBoxValue" Width="120px" TabIndex="@GetTabIndex("tile3")" />
                <br />
                <code>TabIndex</code>: <strong>@GetTabIndex("tile3")</strong>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem HeaderText="Tile 4" RowSpan="2" ColSpan="2"  Id="tile4">
            <Content>
                <TelerikTextBox @bind-Value="@TextBoxValue" Width="120px" TabIndex="@GetTabIndex("tile4")" />
                <br />
                <code>TabIndex</code>: <strong>@GetTabIndex("tile4")</strong>
            </Content>
        </TileLayoutItem>
    </TileLayoutItems>
</TelerikTileLayout>

@if (TileTabIndexes.Count > 0)
{
    <p>Tile Order in the <code>OnReoder</code> handler:</p>

    <ul>
        @foreach(KeyValuePair<string, int> pair in TileTabIndexes)
        {
            <li><code>@pair.Key</code> <strong>@pair.Value</strong></li>
        }
    </ul>
}

@code {
    private TelerikTileLayout? TileLayoutRef { get; set; }
    private string TextBoxValue { get; set; } = string.Empty;
    private Dictionary<string, int> TileTabIndexes { get; set; } = new();

    private int GetTabIndex(string tileId)
    {
        if (TileTabIndexes.ContainsKey("tileId"))
        {
            // After reordering
            return TileTabIndexes[tileId];
        }
        else
        {
            // On initial load
            TileLayoutState tileLayoutState = TileLayoutRef!.GetState();

            return tileLayoutState.ItemStates.First(x => x.Id == tileId).Order;
        }
    }

    private void OnTileLayoutReorder(TileLayoutReorderEventArgs args)
    {
        TileLayoutState tileLayoutState = TileLayoutRef!.GetState();

        TileTabIndexes = tileLayoutState.ItemStates
            .Select(x => new KeyValuePair<string, int>(x.Id, x.Order))
            .ToDictionary();
    }
}
````

## See Also

* [TileLayout State](slug:tilelayout-state)
* [TileLayout Events](slug:tilelayout-events)
