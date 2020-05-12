---
title: Events
page_title: Drawer for Blazor | Events
description: Events in the Drawer for Blazor
slug: drawer-events
tags: telerik,blazor,drawer,event,events
published: True
position: 25
---

# Drawer Events

This article explains the available events in the Drawer.

## SelectedItemChanged

The `SelectedItemChanged` event is used in one-way data binding to respond to the user selection. It takes an argument of the Drawer data model type. The event is fires every time the user clicks on a new item from the Drawer.

>caption Handle SelectedItemChanged event.

````CSHTML
@* This example shows how to use one-way data binding for the SelectedItem parameter *@

<TelerikDrawer @bind-Expanded="Expanded"
               Data="Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               SelectedItem="@selectedItem"
               SelectedItemChanged="((DrawerItem item) => SelectedItemChangedHandler(item))"
               @ref="DrawerRef">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@IconName.Menu">Toggle drawer</TelerikButton>
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

![drawer selecteditemchanged example](images/drawer-selecteditemchanged-example.gif)

## ExpandedChanged

The `ExpandedChanged` event is used in one-way data binding for the `Expanded` parameter. It takes an argument of the `bool` type. The event fires every time the component's state is changed.

>caption Handle ExpandedChanged event.

````CSHTML
@* This example shows how to use one-way data binding for the Expanded parameter and show/hide the Expand Drawer button based on the value of Expanded *@

@{
    if (!Expanded)
    {
        <TelerikButton OnClick="@(() => DrawerRef.ExpandAsync())" Icon="@IconName.Menu">Expand Drawer</TelerikButton>
    }
}

<TelerikDrawer Expanded="Expanded"
               ExpandedChanged="((bool newValue) => ExpandedChangedHandler(newValue))"
               Data="Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @bind-SelectedItem="@selectedItem"
               @ref="DrawerRef">
    <Content>
        <div class="text-info">
            Content for the @selectedItem?.Text
        </div>
    </Content>
</TelerikDrawer>

@code {
    private void ExpandedChangedHandler(bool value)
    {
        Expanded = value;
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

![drawer expandedchanged example](images/drawer-expandedchanged-example.gif)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)
