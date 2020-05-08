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

>caption Basic scenario

````CSHTML

````

>caption The result from the code snippet above

![drawer basic example](images/drawer-basic-example.jpg)

>caption The Drawer provides the following features:

* `Data` - a collection of flat data for all items in the Drawer.
* `Position` - you can control the position of the Drawer, through the `DrawerPosition` enum.
The members of the enum are:
 * `Left` - the default position
 * `Right`
* `Width` - the width of the Drawer.
* `Class` - the CSS class that will be rendered on the main wrapping element of the Drawer.
* `Mode` - read the [Modes]({%slug drawer-modes%}) article for more information.
* `MiniMode` - read the [Modes]({%slug drawer-modes%}) article for more information.
* `Expanded` - specify if the Drawer is expanded or collapsed.
* `Content` - acces the `<Content>` child tag of `<TelerikDrawer>` to render a component or custom HTML as the content of the Drawer.
* `SelectedItem` - read the [Selection]({%slug drawer-selection%}) article for more information.
* `SelectedItemChanged` - read the [Events]({%slug drawer-events%}) article for more information.
* `Template` - read the [Templates]({%slug drawer-templates%}) article for more information.
* `ItemTemplate` - read the [Templates]({%slug drawer-templates%}) article for more information.
* `Icon` / `IconClass` / `ImageUrl` - the [Telerik icon]({%slug general-information/font-icons%}), a class for a custom font icon, or the URL to a raster image that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `Icon` will have the highest importance).


## See Also

  * Add links here
