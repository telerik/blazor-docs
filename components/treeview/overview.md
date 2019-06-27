---
title: Overview
page_title: Treeview for Blazor Overview
description: Overview of the Treeview for Blazor
slug: components/treeview/overview
tags: telerik,blazor,treeview,overview
published: True
position: 0
---

# Treeview Overview

The Treeview component displays data (flat or hierarchical) in a traditional tree-like structure. You can navigate through the items and their children, define [templates]({%slug components/treeview/templates%}) for the individual nodes, render text and icons/images, and respond to events.

To use a Telerik TreeView for Blazor:

1. add the `TelerikTreeView` tag
1. provide a collection of models to its `Data` property (read more in the [Data Binding article]({%slug components/treeview/data-binding/overview%}))
1. match the fields in the models with the binding schema for the nodes

>caption Basic treeview with flat data binding and built-in icons 

@[template](/_contentTemplates/treeview/basic-example.md#basic-example)

>caption The result from the snippet above

![](images/treeview-overview.png)

>caption Component namespace and reference

````CSHTML
@using Telerik.Blazor.Components.TreeView

<TelerikTreeView @ref="theTreeView">
</TelerikTreeView>

@code {
    Telerik.Blazor.Components.TreeView.TelerikTreeView theTreeView;
}
````


## Navigate Views

A treeview is often used to list pages, views or sections in an application so the user can navigate through them. In Blazor, navigation is accomplished through a `NavLink` element, and to use it in a treeview, you must use its `ItemTemplate`:

>caption Navigation with treeview

@[template](/_contentTemplates/treeview/basic-example.md#navigation-templates)

## See Also

  * [Data Binding a TreeView]({%slug components/treeview/data-binding/overview%})
  * [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/index)

