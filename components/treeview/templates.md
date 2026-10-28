---
title: Templates
page_title: Treeview - Templates
description: Templates in the Treeview for Blazor.
slug: components/treeview/templates
tags: telerik,blazor,treeview,templates
published: True
position: 10
components: ["treeview"]
---

# Treeview Templates

The Treeview component allows you to define a custom template for its nodes. This article explains how you can use it.

In this article:
* [Basics](#basics)
* [Examples](#examples)
	* [Handle DOM events in a template - e.g., click on a node](#handle-dom-events-in-a-template-e-g-click-on-a-node)
	* [Use templates to implement navigation between views without the usage of the UrlField feature](#use-templates-to-implement-navigation-between-views-without-the-usage-of-the-urlfield-feature)
	* [Different templates for different node levels](#different-templates-for-different-node-levels)

## Basics

The `ItemTemplate` of a node is defined under the `TreeViewBinding` tag.

The template receives the model to which the item is bound as its `context`. You can use it to render the desired content.

You can also define different templates for the different levels in each `TreeViewBinding` tag.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, double click, mouseover if you need to respond to them.

## Examples

### Handle DOM events in a template - e.g., click on a node

>tip You can respond to the user click on a node by using the [`OnItemClick`](slug:treeview-events#onitemclick) event.

<demo metaUrl="client/treeview/templates/example-1/" height="420"></demo>

### Use templates to implement navigation between views without the usage of the UrlField feature

>tip You can read more information on how to use the Treeview to switch between pages from the [Navigation](slug:treeview-navigation) article

<demo metaUrl="client/treeview/templates/example-2/" height="420"></demo>

### Different templates for different node levels

<demo metaUrl="client/treeview/templates/example-3/" height="420"></demo>


## See Also

* [Data Binding a TreeView](slug:components/treeview/data-binding/overview)
* [Live Demo: TreeView](https://demos.telerik.com/blazor-ui/treeview/overview)
