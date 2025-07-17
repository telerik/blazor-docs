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

The <a href="https://www.telerik.com/blazor-ui/drawer" target="_blank">Blazor Drawer component</a> is an interactive side panel for [navigating](slug:drawer-navigation) in responsive web applications. It can be always visible, or expanded and collapsed. The Drawer allows switching the content of different sections on the page. You can customize its [templates](slug:drawer-templates), [expand modes](slug:drawer-modes), [minimize behavior](slug:drawer-mini-mode) and also respond to [events](slug:drawer-events).

## Creating Blazor Drawer

1. Add the `TelerikDrawer` tag to a Razor file.

1. Populate its `Data` property with the collection of items (`IEnumerable<T>`) for the user to see.

3. Set the `SelectedItem` parameter to a `T` object. It supports one-way and two-way binding.

4. Place the content of the current page in the `<DrawerContent>` tag.

5. Set the `@ref` parameter to obtain reference to the component instance. Use this instance to toggle the Drawer.

6. Add a button inside the content to toggle the Drawer.

>caption Basic configuration of the Drawer.

<demo metaUrl="client/drawer/overview/" height="420"></demo>

## Data Binding

The Blazor Drawer requires a data source so that it can display items to the user. To provide a data source, use the `Data` property. [Read more about the Blazor Drawer data binding](slug:drawer-data-binding).

## Navigation

A Drawer is often used to list pages, views, or sections in an application so the user can navigate between them. To do that with a Drawer, there are two options:

* Use the built-in `UrlField` in the [bound data](slug:drawer-data-binding) to populate the URLs in the anchors that the Drawer will generate if you provide a URL for the given item.
* Use a [Template](slug:drawer-templates) to generate the desired links (e.g., `NavLink` components) with your own code to enable fine-tuning.

[Read more about the Blazor Drawer navigation](slug:drawer-navigation).

## Modes

The Blazor Drawer provides *Push* and *Overlay* modes of expansion. They determine if the Drawer items push the other content to the side, or cover it temporarily. [Read more about the Blazor Drawer modes](slug:drawer-modes).

## Mini View

By default, the Drawer is not visible when collapsed. To leave a small hint for the user, the Drawer provides a Mini View, so that users can navigate with just a single action, without the need to expand the Drawer items. [Read more about the Blazor Drawer mini view](slug:drawer-mini-mode).

## Selection

The Drawer component has an option to pre-select the desired item, then use the highlighted item to load/generate content, or denote the current page. [Read more about the Blazor Drawer selection](slug:drawer-selection).

## Templates

The Blazor Drawer allows full control of the item rendering and layout. The component has an *ItemTemplate* and *Template*. [Read more about the Blazor Drawer templates](slug:drawer-templates).

## Drawer Icons

To illustrate the purpose of each Drawer item, the Blazor Drawer has the option to add images, icon classes, or font icons. [Read more about the Blazor Drawer icons](slug:drawer-icons).

## Refresh Data

The Drawer can refresh its interface, when the data items change. [Read more about the Blazor Drawer data refresh](slug:drawer-refresh-data).

## Events

The Blazor Drawer fires select and expand events. Handle those events to respond to user actions. [Read more about the Blazor Drawer events](slug:drawer-events).

## Drawer Parameters

The Blazor Drawer provides various parameters to configure the component. Also check the [Drawer public API](slug:Telerik.Blazor.Components.TelerikDrawer-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-drawer-container">` element. |
| `Expanded` | `bool` | Specifies whether the Drawer is expanded or collapsed. If this parameter is used to expand or collapse the component the animations will not be available. To use animations you have to use the Drawer's [Methods](#drawer-reference-and-methods). It is possible, however, to use the value to implement custom layouts in the drawer [templates](slug:drawer-templates) or in your own layout.|
| `Mode` | `DrawerMode` enum <br /> (`Overlay`) | Controls whether the Drawer is in `Push` or `Overlay` mode. [Read more about the supported modes](slug:drawer-modes). |
| `MiniMode` | `bool` | Controls whether there is [mini view](slug:drawer-mini-mode) when the Drawer is collapsed. |
| `Position` | `DrawerPosition` enum <br /> (`Start`) | Determines on which side of the `DrawerContent` the item list will render. |
| `Width` | `string` <br /> (`240px`) | The width of the Drawer when expanded. |

## Drawer Reference and Methods

The Drawer methods are accessible through it's reference. These methods change the value of the `Expanded` parameter.

| Method | Description |
| --- | --- |
| `ExpandAsync` | Expands the Drawer. |
| `CollapseAsync` | Collapses the Drawer. |
| `ToggleAsync` | Expands or collapses the Drawer, depending on the current state. |

>caption Get a reference to the drawer and use its methods

````RAZOR
@* The drawer is a generic components and its reference type depends on the type of the model it is bound to. *@

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())"
               Icon="@SvgIcon.Menu">
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

## Next Steps

* [Bind the Drawer to Data](slug:drawer-data-binding)

* [Define Drawer Templates](slug:drawer-templates)

* [Use the Drawer for Navigation](slug:drawer-navigation)

* [Handle the Drawer Events](slug:drawer-events)

## See Also

* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
* [Drawer API Reference](slug:Telerik.Blazor.Components.TelerikDrawer-1)
