---
title: Overview
page_title: Drawer for Blazor Overview
description: Overview of the Drawer for Blazor
slug: drawer-overview
tags: telerik,blazor,drawer,overview
published: True
position: 0
---

# Drawer Overview

The Drawer component is a dismissible or permanently visible panel for navigating in responsive web applications. It allows switching the content of different sections of the page.

To use a Telerik Drawer for Blazor

1. add the `TelerikDrawer` tag
1. populate its `Data` property with the collection of items you want the user to see
1. place the content of the Drawer in the `<Content>` tag

>caption Basic configuration of the Drawer.

![drawer basic example](images/drawer-basic-example.gif)

````CSHTML
@* This example shows the basic configuration of the Drawer and how to expand or collapse a Drawer with a click of a button. *@

<TelerikDrawer @bind-Expanded="Expanded"
               Data="Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @ref="DrawerRef">
    <Content>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="rows">Toggle drawer</TelerikButton>

        @*Place your contents here*@
    </Content>
</TelerikDrawer>

@code {
    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
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

>caption The Drawer provides the following features:

* `Data` - a collection of flat data for all items in the Drawer.

* `Position` - you can control the position of the Drawer, through the `DrawerPosition` enum.
The members of the enum are:
 * `Left` - the default position
 * `Right`

* `Expanded` - bindable property that specifies whether the Drawer is expanded or collapsed. If this parameter is used to expand or collapse the component the animations will not be available. To use anymations you have to use the Drawer's [Methods](#methods).

* `ExpandedChanged` - event that fires every time the `Expanded` parameter is changed. For more information read the the [Events]({%slug drawer-events%}) article.

* `Width` - the width of the Drawer when expanded.

* `Class` - the CSS class that will be rendered on the main wrapping element of the Drawer.

* `Mode` - control whether the Drawer is in `Push` or `Overlay` mode. For more information read the [Modes]({%slug drawer-modes%}) article.

* `MiniMode` - when the Drawer is collapsed control whether there is mini menu. For more information read the [Modes]({%slug drawer-modes%}) article.

* `Content` - acces the `<Content>` child tag of `<TelerikDrawer>` to render a component or custom HTML as the content of the Drawer.

* `SelectedItem` - bindable property that contains the currently selected item in the Drawer. For more information read the [Selection]({%slug drawer-selection%}) article.

* `SelectedItemChanged` - event that is fired when a new item is selected. For more information read the [Events]({%slug drawer-events%}) article.

* `Template` - define a custom template for the entire Drawer. For more information read the [Templates]({%slug drawer-templates%}) article.

* `ItemTemplate` - define a custom template for the Items of the Drawer. For more information read the [Templates]({%slug drawer-templates%}) article.

* `Icon` / `IconClass` / `ImageUrl` - the [Telerik icon]({%slug general-information/font-icons%}), a class for a custom font icon, or the URL to a raster image that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `Icon` will have the highest importance).

## Methods

The Drawer methods are accessible through it's reference. They will enable the transition animations. These methods change the value of the `Expanded` parameter.

### ExpandAsync

The `ExpandAsync` method allows you to change the state of the Drawer so it is expanded.

### CollapseAsync

The `CollapseAsync` method allows you to change the state of the Drawer so it is in [MiniMode]({%slug drawer-mini-mode%}) (collapsed).

### ToggleAsync

The `ToggleAsync` method allows you to expand or collapse the component depending on the current state of the Drawer.


## Example




## See Also

  * [Drawer Overview Demo]()
  * [Drawer Modes]({%slug drawer-modes%})
  * [Drawer Events]({%slug drawer-events%})
  * [Drawer Templates]({%slug drawer-templates%})
  * [Drawer Selection]({%slug drawer-selection%})
  * [Drawer Data Binding]({%slug drawer-data-binding%})
