---
title: Events
page_title: Drawer for Blazor | Events
description: Events in the Drawer for Blazor
slug: drawer-events
tags: telerik,blazor,drawer,event,events
published: True
position: 5
---

# Drawer Events

This article explains the available event in the Drawer.

## SelectedItemChanged

The `SelectedItemChanged` event is used in one-way data binding to respond to the user selection. It takes an argument of the Drawer data model type. The event is fires every time the user clicks on a new item from the Drawer.

>caption Handle SelectedItemChanged event.

````CSHTML
@* This example shows how to use one-way data binding *@

<TelerikDrawer Expanded="Expanded"
               Data="Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               SelectedItem="@selectedItem"
               SelectedItemChanged="((DrawerItem item) => SelectedItemChangedHandler(item))"
               @ref="DrawerRef">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="rows">Toggle drawer</TelerikButton>
        <div class="text-info">
            Content for the @selectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>

@code {

    private void SelectedItemChangedHandler(DrawerItem item)
    {
        selectedItem = item;
    }

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
>caption The result from the code snippet above

![drawer basic example](images/drawer-selecteditemchanged-example.gif)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)
