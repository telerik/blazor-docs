---
title: Overview
page_title: Breadcrumb Overview
description: Overview of the Breadcrumb for Blazor.
slug: breadcrumb-overview
tags: telerik,blazor,breadcrumb,overview
published: True
position: 0
---

# Breadcrumb Overview

The <a href="https://www.telerik.com/blazor-ui/breadcrumb" target="_blank">Blazor Breadcrumb component</a> allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps. In addition to built-in navigation capabilities, you can browse through the items, define [templates]({%slug breadcrumb-templates%}) for the individual nodes, render text and icons/images, and respond to [events]({%slug breadcrumb-events%}).

#### To use a Telerik Breadcrumb for Blazor:

1. add the `TelerikBreadcrumb` tag
1. provide a collection of models to its `Data` property (read more in the [Data Binding article]({%slug breadcrumb-data-binding%}))
1. match the fields in the models with the binding schema for the nodes
    * In this example, we keep it simple by only providing text for the Breadcrumb items. See the Navigation article for more details on how to use the Breadcrumb for navigating through items.

>caption Basic Breadcrumb with data binding. The result from the snippet below.

![Breadcrumb for Blazor](images/breadcrumb-basic-example.png)

````CSHTML
@* This example demonstrates the basic configuration of the Breadcrumb*@

<TelerikBreadcrumb Data="@Items">
</TelerikBreadcrumb>

@code {

    public List<BreadcrumbItem> Items { get; set; }

    protected override void OnInitialized()
    {
        Items = new List<BreadcrumbItem>
        {
            new BreadcrumbItem { Text = "Home", Icon = "home" },
            new BreadcrumbItem { Text = "Products"},
            new BreadcrumbItem { Text = "Computer peripherals"},
            new BreadcrumbItem { Text = "Keyboards"},
            new BreadcrumbItem { Text = "Gaming keyboards"}
        };
    }

    public class BreadcrumbItem
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string Url { get; set; }
    } 
}
````


>caption Component namespace and reference

````CSHTML
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
        public string Icon { get; set; }
        public string Url { get; set; }
    }
}
````


## See Also

  * [Live Demo: Breadcrumb Overview](https://demos.telerik.com/blazor-ui/breadcrumb/overview)
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikBreadcrumb)

