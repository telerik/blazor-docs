---
title: Selection
page_title: Drawer for Blazor | Seletion
description: Item selection in the Drawer for Blazor
slug: drawer-selection
tags: telerik,blazor,drawer,selection,item,selected,items
published: True
position: 10
---

# Drawer Selection

The Drawer can allow the user to select an item.

This article is separated in the following sections:

* [Basics](#basics)

## Basics

To allow item selection set the `SelectedItem` parameter and [SelectedItemChanged]({%slug drawer-events%}#selecteditemchanged) event, for one-way data binding, or the `@bind-SelectedItem` for two-way data binding.

The `SelectedItem` is of the same type as the Drawer data model.

>caption Use tho way data binding for the SelectedItem.

````CSHTML
@* Use two-way data binding with the SelectedItem to display contents according to the user selection *@

<TelerikDrawer @bind-Expanded="Expanded"
               Data="Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @bind-SelectedItem="@selectedItem"
               @ref="DrawerRef">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu">Toggle drawer</TelerikButton>
        <div class="text-info">
            Content for the @selectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem selectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = IconName.Plus},
            new DrawerItem { Text = "FetchData", Icon = IconName.GridLayout},
            };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````
