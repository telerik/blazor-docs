---
title: Overview
page_title: Drawer Overview
description: Overview of the Drawer for Blazor.
slug: drawer-overview
tags: telerik,blazor,drawer,overview
published: True
position: 0
---

# Blazor Drawer Overview

The <a href="https://www.telerik.com/blazor-ui/drawer" target="_blank">Blazor Drawer component</a> is a dismissible or permanently visible panel for [navigating]({%slug drawer-navigation%}) in responsive web applications. It allows switching the content of different sections of the page. You can customize its [templates]({%slug drawer-templates%}), [display]({%slug drawer-modes%}), behavior when [minimizing]({%slug drawer-mini-mode%}) and respond to [events]({%slug drawer-events%}).

## Creating Blazor Drawer

1. Add the `TelerikDrawer` tag to add the component to your razor page.

1. Populate its `Data` property with the collection of items you want the user to see.

1. Place the content of the Drawer in the `<DrawerContent>` tag.
    * In this example, we keep it simple by using the selected item. See the [Navigation]({%slug drawer-navigation%}) article for a menu-like experience with links.

>caption Basic configuration of the Drawer.

````CSHTML
@* This example shows the basic configuration of the Drawer and how to expand or collapse a Drawer with a click of a button. *@

<TelerikDrawer Data="@Data"
               MiniMode="true"
               Mode="DrawerMode.Push"
               @ref="@DrawerRef"
               @bind-SelectedItem="@SelectedItem">
    <DrawerContent>
        <TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="menu">Toggle drawer</TelerikButton>

        @* Place your contents here - it can be as simple as text, it can be conditional components or components that
            take the selected item as a parameter, or even the @Body tag for navigation if you place the
            drawer high enough in the project layout hierarchy *@
        <div class="m-5">
            Selected Item: @SelectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    DrawerItem SelectedItem { get; set; }
    IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = "plus"},
            new DrawerItem { Text = "FetchData", Icon = "grid-layout"},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````

## Data Binding

The Blazor Drawer requires a data source so that it can display items to the user. To provide a data source, use the `Data` property. [Read more about the Blazor Drawer data binding]({%slug drawer-data-binding%}).

## Navigation

A Drawer is often used to list pages, views, or sections in an application so the user can navigate through them. To do that with a Drawer, you have two options:

* Use the built-in `UrlField` in the [bound data]({%slug drawer-data-binding%}) to populate the URLs in the anchors that the Drawer will generate if you provide a URL for the given item.
* Use a [Template]({%slug drawer-templates%}) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

[Read more about the Blazor Drawer navigation]({%slug drawer-navigation%}).

## Modes

Drawer provides different modes of expansion. [Read more about the Blazor Drawer modes]({%slug drawer-modes%}).

## Mini View

The Drawer is not visible by default when it is collapsed. To leave a small hint for the user, the Drawer provides a Mini View so they can navigate with just a single action. [Read more about the Blazor Drawer mini view]({%slug drawer-mini-mode%}).

## Selection

You can pre-select the desired Drawer item, then use the highlighted item to load/generate content, or denote the current page. [Read more about the Blazor Drawer selection]({%slug drawer-selection%}).

## Templates

You can use the functionality of the built-in templates and customize what is rendered. [Read more about the Blazor Drawer templates]({%slug drawer-templates%}).

## Drawer Icons

To illustrate the purpose of each Drawer item, the Blazor Drawer allows you to add images, icon classes, or font icons. [Read more about the Blazor Drawer icons]({%slug drawer-icons%}).

## Refresh Data

The Drawer allows you to refresh its data manually so the component can react to changes in the collection. [Read more about the Blazor Drawer data refresh]({%slug drawer-refresh-data%}).

## Events

The Blazor Drawer generates events that you can handle and further customize its behavior. [Read more about the Blazor Drawer events]({%slug drawer-events%}).

## Methods

The Drawer methods are accessible through it's reference. The reference exposes several methods that enable the transition animations. These methods change the value of the `Expanded` parameter.

* `ExpandAsync` - allows you to change the state of the Drawer so it is expanded.

* `CollapseAsync` - allows you to change the state of the Drawer so it is collapsed.

* `ToggleAsync` - allows you to expand or collapse the component depending on the current state of the Drawer.

>caption Get a reference to the drawer and use its methods

````CSHTML
@* The drawer is a generic components and its reference type depends on the type of the model it is bound to. *@

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())"
               Icon="menu">
    Toggle drawer
</TelerikButton>

<TelerikDrawer Data="@Data" Mode="@DrawerMode.Push"
               @ref="@DrawerRef">
    <DrawerContent>lorem ipsum</DrawerContent>
</TelerikDrawer>

@code {
    Telerik.Blazor.Components.TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = "plus"},
            new DrawerItem { Text = "FetchData", Icon = "grid-layout"},
        };

    public class DrawerItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
    }
}
````

## Parameters

The Blazor Drawer provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Position` | `DrawerPosition` enum <br /> `Left` | Determines on which side of the `DrawerContent` the item list will render. |
| `Expanded` | `bool` | Specifies whether the Drawer is expanded or collapsed. If this parameter is used to expand or collapse the component the animations will not be available. To use animations you have to use the Drawer's [Methods](#methods). You can, however, use the value to implement custom layouts in the drawer [templates]({%slug drawer-templates%}) or in your own layout.|
| `Width` | `string` | The width of the Drawer when expanded. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Drawer. You can use it to make it fit your layout (e.g., set a `height: 100%` to it, if needed). |
| `Mode` | `DrawerMode` enum <br /> `Overlay` | Controls whether the Drawer is in `Push` or `Overlay` mode. |
| `MiniMode` | `bool` | Controls whether there is mini view when the Drawer is collapsed. |
| `DrawerContent` | `RenderFragment` | The place where you put a component or custom HTML as the content of the Drawer - this is what the drawer will push or overlay. |

## Next Steps

[Binding the Drawer to Data]({%slug drawer-data-binding%})

[Using Drawer Templates]({%slug drawer-templates%})

[Explore the Drawer Navigation]({%slug drawer-navigation%})

[Explore the Drawer Events]({%slug drawer-events%})

## See Also

  * [Drawer Overview Demo](https://demos.telerik.com/blazor-ui/drawer/overview)
  * [Drawer Data Binding]({%slug drawer-data-binding%})
  * [Drawer Navigation]({%slug drawer-navigation%})
  * [Drawer Modes]({%slug drawer-modes%})
  * [Drawer Events]({%slug drawer-events%})
  * [Drawer Templates]({%slug drawer-templates%})
  * [Drawer Selection]({%slug drawer-selection%})
  * [Sample Project: Drawer as Side Navigation](https://github.com/telerik/blazor-ui/tree/master/drawer/sidenav)
