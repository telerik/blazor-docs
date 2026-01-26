---
title: Selection
page_title: Drawer - Seletion
description: Item selection in the Drawer for Blazor.
slug: drawer-selection
tags: telerik,blazor,drawer,selection,item,selected,items
published: True
position: 10
components: ["drawer"]
---
# Drawer Selection

The Drawer lets the user select an item. You can also pre-select a desired item. You can use this highlighted item to load/generate content, or to denote the current page.

To use the item selection, use set the `SelectedItem` parameter. It allows two-way binding (`@bind-SelectedItem`) and one-way binding + [SelectedItemChanged](slug:drawer-events#selecteditemchanged) event.

The `SelectedItem` is of the same type as the Drawer data model.

If you use the drawer for [page navigation](slug:drawer-navigation), the selected item will remain highlighted as long as the drawer does not get disposed - meaning, it must be outside of the `@Body`.

>caption Use tho way data binding for the SelectedItem.

````RAZOR
@* Use two-way data binding with the SelectedItem to display contents according to the user selection *@

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@selectedItem"
               @ref="@DrawerRef">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
        <div class="text-info">
            Content for the @selectedItem?.Text item
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem selectedItem { get; set; }
    public List<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus },
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout },
             };

    protected override void OnInitialized()
    {
        // pre-select an item. Not required
        selectedItem = Data[Data.Count - 1];
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````


## See Also

* [Drawer Events](slug:drawer-events)
* [Drawer Navigation](slug:drawer-navigation)
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
