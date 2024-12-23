---
title: Modes
page_title: Drawer - Modes
description: Modes in the Drawer for Blazor.
slug: drawer-modes
tags: telerik,blazor,drawer,mode,modes,overlay,push
published: True
position: 5
---

# Drawer Modes

The expanded Drawer component can **Push** the content (decrease its width) or **Overlay** it (be on top of it and show a modal background).

You can choose which mode you want to use though the `Mode` parameter which takes a member of the `DrawerMode` enum:

* [`Push`](#push-mode)

* [`Overlay`](#overlay-mode)

If the `Mode` is not set, by default the Drawer will be in `Overlay` mode.

You can control how large the drawer is by setting its `Width` parameter to a [CSS value]({%slug common-features/dimensions%}). We recommend using pixel values for better control over its size - there are many ways a drawer can be placed in the layout and percentage values depend highly on the DOM hierarchy and CSS rules applied to the elements.

## Push Mode

When `Mode` is set to `Push`, the Drawer's default width is `240px` when expanded, and `50px` when collapsed in [MiniMode]({%slug drawer-mini-mode%}). When it's state is changed (expanded/collapsed) the content is resized - the width is increased or decreased based on the state.

The drawer's height is dynamic based on the height of the content (you can change it with CSS).

>caption The Drawer in Push mode.

![drawer push mode example](images/drawer-modes-push-example.gif)

````RAZOR
@* This example shows how the drawer behaves in Push mode. It uses item selection to toggle the content for brevity. *@

<div>
    <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@("menu")">Toggle drawer</TelerikButton>
    <TelerikDrawer @bind-Expanded="@Expanded"
                   Data="@Data"
                   MiniMode="true"
                   Mode="@DrawerMode.Push"
                   @bind-SelectedItem="@selectedItem"
                   @ref="@DrawerRef">
        <DrawerContent>
            <div class="m-5">
                Select an item. The drawer is expaned: @Expanded
                <div class="text-info">
                    Content for the @selectedItem?.Text
                </div>
            </div>
        </DrawerContent>
    </TelerikDrawer>
</div>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem selectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus},
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## Overlay Mode

When `Mode` is set to `Overlay`, the Drawer's navigation is on top of the content and its height takes all available vertical space (100%). The drawer also adds blurred background on top of the content until the user clicks on an item of the Drawer or outside.

ComboBoxes, DropDownLists, DateTimePickers and similar popup-based components are not supported inside the `Template` or `ItemTemplate` of a Drawer in `Overlay` mode. This is because the popup is rendered outside the Drawer and clicking on the popup will close the Drawer.

>caption Drawer in Overlay mode

![drawer overlay mode example](images/drawer-modes-overlay-example.gif)

````RAZOR
@* This example shows how the drawer behaves in Overlay mode. It uses item selection to toggle the content for brevity.
You may want to add padding to the left of the content so that it is not overlapped by the Drawer in its MiniMode. *@

<div class="pl-4">
    <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
</div>
<TelerikDrawer @bind-Expanded="@Expanded"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Overlay"
               @bind-SelectedItem="@selectedItem"
               @ref="@DrawerRef">
    <DrawerContent>
        <div class="text-info pl-4">
            The drawer is expanded: @Expanded
            <br />
            Content for the @selectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem selectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus },
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout },
            };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## See Also

* [Drawer MiniMode]({%slug drawer-mini-mode%})
* [Drawer Navigation]({%slug drawer-navigation%})
* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
