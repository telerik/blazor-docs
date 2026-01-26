---
title: Nesting TileLayout Components with Resizing and Reordering
description: Learn how to nest TileLayout components in a Blazor application and enable the resize and reorder features.
type: how-to
page_title: How to Handle Nested Telerik TileLayouts with Resizing and Reordering
slug: tilelayout-kb-nested-instances
tags: tilelayout, blazor, nested, resize, reorder
res_type: kb
ticketid: 1666719
components: ["tilelayout"]
---
## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>TileLayout for Blazor
</tr>
</tbody>
</table>

## Description

I have nested TileLayout components and I want both instances to be resizable and reorderable. The problem is that when I enable these features, the TileLayout does not behave well&mdash;for example, the reorder in the child component will also reorder the parent component with the same order.

This KB article answers the following questions:
- How can I enable resizing for nested TileLayout components without affecting the parent component?
- What is the best practice for managing nested TileLayout components in Blazor?
- How to prevent nested TileLayout components from resizing or reordering their parent in Blazor?

## Solution

When using two nested [TileLayout](https://docs.telerik.com/blazor-ui/components/tilelayout/overview) components in a Blazor application, resizing or reordering the child component expectedly affects the parent component. This behavior occurs because the resize and reorder events propagate through both levels of TileLayout components. 

Nesting TileLayouts is uncommon, but generally possible if the resizing and reordering are enabled only for one level at a time. With such an implementation, you need to clarify to your end users that they can't drag tiles across the different component instances.

To manage nested TileLyouts with resizing and reordering:

1. Bind the `Resizable` and `Reorderable` properties of both TileLayout instances to different variables, so you can toggle them during runtime.
1. Choose your preferred UI to allow the end user to enable the resizing and reordering of the specific level of tiles. The example below uses ToggleButtons.
1. After the end user enables the resizing and reordering for one level, programmatically disable the features for the other level.
1. (optional) Use CSS to manage the overflow of the parent TileLayout. This prevents the parent TileLayout from expanding if the user resizes the tiles in the child TileLayout.

>caption Enable resize and reorder for only one level of nested TileLayouts

````RAZOR
<style>
    .parent-tilelayout .k-tilelayout-item {
        overflow: auto;
    }

    .child-tilelayout-disabled .k-tilelayout-item-header {
        pointer-events: none;
    }
</style>

<TelerikToggleButton @bind-Selected="@ParentOperationsEnabled" Icon="@SvgIcon.Ungroup" OnClick="@EnableParentConfiguration">Enable parent operations</TelerikToggleButton>

<TelerikTileLayout Columns="2"
                   Height="500px"
                   Resizable="@ParentOperationsEnabled"
                   Reorderable="@ParentOperationsEnabled"
                   Class="parent-tilelayout">
    <TileLayoutItems>
        <TileLayoutItem RowSpan="2">
            <HeaderTemplate>
                <div class="k-hbox" style="justify-content: space-between">
                    <h3>
                        Tile 1
                    </h3>                   
                    <span @onclick:stopPropagation="true">
                        <TelerikToggleButton @bind-Selected="ChildLayout1OperationsEnabled" Icon="@SvgIcon.Ungroup" Title="Delete tile"
                                             OnClick="@(()=>EnableChildConfiguration("Tile 1"))">Enable operations for this tile</TelerikToggleButton>
                    </span>
                </div>
            </HeaderTemplate>
            <Content>       
                <TelerikTileLayout Columns="2"
                                   RowHeight="150px"                                   
                                   Resizable="@ChildLayout1OperationsEnabled"
                                   Reorderable="@ChildLayout1OperationsEnabled"
                                   Class="@(ParentOperationsEnabled? "child-tilelayout-disabled" : "")">
                    <TileLayoutItems>
                        <TileLayoutItem HeaderText="Tile 1">
                            <Content>First child tile</Content>
                        </TileLayoutItem>
                        <TileLayoutItem HeaderText="Tile 2">
                            <Content>Second child tile</Content>
                        </TileLayoutItem>
                        <TileLayoutItem HeaderText="Tile 3" ColSpan="2">
                            <Content>Third child tile</Content>
                        </TileLayoutItem>
                    </TileLayoutItems>
                </TelerikTileLayout>
            </Content>
        </TileLayoutItem>
        <TileLayoutItem RowSpan="2">
            <HeaderTemplate>
                <div class="k-hbox" style="justify-content: space-between">
                    <h3>
                        Tile 2
                    </h3>
                    <span @onclick:stopPropagation="true">
                        <TelerikToggleButton @bind-Selected="ChildLayout2OperationsEnabled" Icon="@SvgIcon.Ungroup" Title="Delete tile"
                                             OnClick="@(()=>EnableChildConfiguration("Tile 2"))">Enable operations for this tile</TelerikToggleButton>
                    </span>
                </div>
            </HeaderTemplate>
            <Content>
                <TelerikTileLayout Columns="2"
                                   RowHeight="150px"
                                   Resizable="@ChildLayout2OperationsEnabled"
                                   Reorderable="@ChildLayout2OperationsEnabled"
                                   Class="@(ParentOperationsEnabled? "child-tilelayout-disabled" : "")">
                    <TileLayoutItems>
                        <TileLayoutItem HeaderText="Tile 1">
                            <Content>First child tile</Content>
                        </TileLayoutItem>
                        <TileLayoutItem HeaderText="Tile 2">
                            <Content>Second child tile</Content>
                        </TileLayoutItem>                        
                        <TileLayoutItem HeaderText="Tile 3" ColSpan="2">
                            <Content>Third child tile</Content>
                        </TileLayoutItem>
                    </TileLayoutItems>
                </TelerikTileLayout>
            </Content>
        </TileLayoutItem>        
    </TileLayoutItems>
</TelerikTileLayout>

@code{
    private bool ParentOperationsEnabled { get; set; } = true;
    private bool ChildLayout1OperationsEnabled { get; set; }
    private bool ChildLayout2OperationsEnabled { get; set; }

    private void EnableParentConfiguration()
    {
        ParentOperationsEnabled = true;
        ChildLayout1OperationsEnabled = false;
        ChildLayout2OperationsEnabled = false;
    }

    private void EnableChildConfiguration(string tileName)
    {
        switch (tileName)
        {
            case "Tile 1":
                ChildLayout1OperationsEnabled = true;
                break;
            case "Tile 2":
                ChildLayout2OperationsEnabled = true;
                break;
        }
        
        ParentOperationsEnabled = false;
    }
}
````

## See Also
- [TileLayout Overview](slug:tilelayout-overview)
- [TileLayout Reorderable Documentation](slug:tilelayout-reorder)
- [TileLayout Resizable Documentation](slug:tilelayout-resize)
