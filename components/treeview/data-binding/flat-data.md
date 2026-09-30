---
title: Flat Data
page_title: Treeview - Data Binding to Flat Data
description: Data Binding the Treeview for Blazor to flat data.
slug: components/treeview/data-binding/flat-data
tags: telerik,blazor,treeview,data,bind,databind,databinding,flat
published: True
position: 1
components: ["treeview"]
---

# Treeview Data Binding to Flat Data

This article explains how to bind the TreeView for Blazor to flat data. 
@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)


Flat data means that the entire collection of treeview items is available at one level, for example `List<MyTreeItemModel>`.

The parent-child relationships are created through internal data in the model - the `Parent` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `Parent`. There must be at least one node with a `null` value so that the TreeView renders anything.

You must also provide the correct value for the `HasChildren` field - for items that have children, you must set it to `true` so that the expand arrow is rendered.

>caption Example for flat data in a Treeview, using non-default ParentIdField

<demo metaUrl="client/treeview/data-binding/flat-data/example-1/" height="420"></demo>


## See Also

* [TreeView Data Binding Basics](slug:components/treeview/data-binding/overview)
* [Live Demo: TreeView Flat Data](https://demos.telerik.com/blazor-ui/treeview/flat-data)
* [Binding to Hierarchical Data](slug:components/treeview/data-binding/hierarchical-data)
* [Load on Demand](slug:components/treeview/data-binding/load-on-demand)
