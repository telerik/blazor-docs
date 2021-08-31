---
title: Overview
page_title: Breadcrumb Overview
description: Overview of the Breadcrumb for Blazor.
slug: breadcrumb-overview
tags: telerik,blazor,breadcrumb,overview
published: True
position: 0
---s

# Breadcrumb Overview

The <a href="https://www.telerik.com/blazor-ui/menu" target="_blank">Blazor Menu component</a> displays data (flat or hierarchical) in a traditional menu-like structure. In addition to built-in navigation capabilities, you can browse through the items and their children, define [templates]({%slug components/menu/templates%}) for the individual nodes, render text and icons/images, and respond to [events]({%slug components/menu/events%}).

#### To use a Telerik Breadcrumb for Blazor:

1. add the `TelerikBreadcrumb` tag
1. provide a collection of models to its `Data` property (read more in the [Data Binding article]({%slug breadcrumb-data-binding%}))
1. match the fields in the models with the binding schema for the nodes

>caption Basic menu with data binding. The result from the snippet below.

![Breadcrumb for Blazor](images/ )

````CSHTML

````




>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components

<TelerikMenu @ref="theMenu" Data="@menuData" TextField="Page" UrlField="Page">
</TelerikMenu>

@code {
    // the menu is a generic component and its type depends on the model it binds to
    Telerik.Blazor.Components.TelerikMenu<MenuItem> theMenu;

    List<MenuItem> menuData = Enumerable.Range(1, 3).Select(x => new MenuItem { Page = $"page{x}" }).ToList();

    public class MenuItem
    {
        public string Page { get; set; }
    }
}
````


## See Also

  * [Live Demo: Breadcrumb Overview](https://demos.telerik.com/blazor-ui/breadcrumb/overview)
  * [API Reference]()

