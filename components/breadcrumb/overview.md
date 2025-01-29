---
title: Overview
page_title: Breadcrumb Overview
description: Overview of the Breadcrumb for Blazor.
slug: breadcrumb-overview
tags: telerik,blazor,breadcrumb,overview
published: True
position: 0
---

# Blazor Breadcrumb Overview

The <a href="https://www.telerik.com/blazor-ui/breadcrumb" target="_blank">Blazor Breadcrumb component</a> allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps. In addition to built-in [navigation capabilities](slug://breadcrumb-navigation), you can browse through the items, define [templates](slug://breadcrumb-templates) for the individual nodes, render text and [icons](slug://breadcrumb-icons), and respond to [events](slug://breadcrumb-events).

>caption In this article:

* [Basics](#basics)
* [Features](#features)


## Basics

To use a Telerik Breadcrumb for Blazor:

1. add the `TelerikBreadcrumb` tag
1. provide a collection of objects to its `Data` property (read more in the [Data Binding article](slug://breadcrumb-data-binding))
1. match the fields in the model with the binding schema for the nodes
    * In this example, we keep it simple by only providing text for the Breadcrumb items. See the [Navigation article](slug://breadcrumb-navigation) for more details on how to use the Breadcrumb for navigating through items.

>caption Basic Breadcrumb with data binding. The result from the snippet below.

![Breadcrumb for Blazor](images/breadcrumb-basic-example.png)

````RAZOR
@* This example demonstrates the basic configuration of the Breadcrumb*@

<TelerikBreadcrumb Data="@Items">
</TelerikBreadcrumb>

@code {

    public List<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Text = "Home", Icon = SvgIcon.Home },
            new BreadcrumbItem { Text = "Products"},
            new BreadcrumbItem { Text = "Computer peripherals"},
            new BreadcrumbItem { Text = "Keyboards"},
            new BreadcrumbItem { Text = "Gaming keyboards"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Url { get; set; }
    } 
}
````


>caption Component namespace and reference

````RAZOR
<TelerikBreadcrumb @ref="theBreadcrumbRef" Data="@Items">
</TelerikBreadcrumb>

@code{
    Telerik.Blazor.Components.TelerikBreadcrumb<BreadcrumbItem> theBreadcrumbRef { get; set; }

    public IEnumerable<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
        new BreadcrumbItem { Text = "Item1"},
        new BreadcrumbItem { Text = "Item2"},
        new BreadcrumbItem { Text = "Item3"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Url { get; set; }
    }
}
````

## Features

The Breadcrumb provides the following features:

* `Data`&mdash;a collection of flat data for all items in the Breadcrumb. See the [Data Binding](slug://breadcrumb-data-binding) article for details.

* `CollapseMode`&mdash;specifies how the Breadcrumb items are displayed if they cannot fit on a single line. Read more in the [Collapse Modes](slug://breadcrumb-collapse-modes) article.

* `Width`&mdash;the width of the Breadcrumb component.

* `Height`&mdash;the height of the Breadcrumb component.

* `Size`&mdash;the size of the Breadcrumb component. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Breadcrumb.Size` class. The default value is `Medium`.

* `Class`&mdash;the CSS class that will be rendered on the main wrapping element of the Breadcrumb.

* `ItemTemplate`&mdash;define a custom template for the Items of the Breadcrumb. Read more in the [Templates](slug://breadcrumb-templates) article.

* `SeparatorTemplate`&mdash;define a custom template for the [Breadcrumb Separator](slug://breadcrumb-separator). Read more in the [Templates](slug://breadcrumb-templates) article.

* Events&mdash;you can respond to user actions to implement your business logic. For more details see the [Events](slug://breadcrumb-events) article.

## See Also

* [Live Demo: Breadcrumb Overview](https://demos.telerik.com/blazor-ui/breadcrumb/overview)
* [BreadCrumb API Reference](slug://Telerik.Blazor.Components.TelerikBreadcrumb-1)
