---
title: Hierarchical Data
page_title: Treeview - Data Binding to Hierarchical Data
description: Data Binding the Treeview for Blazor to hierarchical data.
slug: components/treeview/data-binding/hierarchical-data
tags: telerik,blazor,treeview,data,bind,databind,databinding,hierarchical
published: True
position: 2
components: ["treeview"]
---

# Treeview Data Binding to Hierarchical Data

This article explains how to bind the TreeView for Blazor to hierarchical data. 

@[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)

Hierarchical data means that the child items are provided in a property of the parent item. By default, the TreeView expects this property to be called `Items`, otherwise set the property name in the `ItemsField` parameter. If a certain node has non-`null` child items collection, it will render an expand icon. The `HasChildren` model property can override this, but it is not required for hierarchical data binding.

The hierarchical data binding approach allows you have separate collections of data or different model types at each TreeView level. Note that the data binding settings are per level, so a certain level will always use the same bindings, regardless of the model they represent and their parent.

Consider the following examples:

* [Hierarchical data with different types at each level](#different-types-at-each-level)
* [Hierarchical data with the same type at all levels](#same-model-type-on-all-levels)

## Different Types at Each Level

The example below uses two levels of hierarchy, but the same idea applies to any number of levels. You will likely need a separate `TreeViewBinding` tag for each level with its own field name configuration.

>caption TreeView with different model type at each all level

<demo metaUrl="client/treeview/data-binding/hierarchical-data/example-1/" height="420"></demo>

## Same Model Type on All Levels

The example below uses the default property names in the model (`Id`, `Text`, `Items`), so there is no need to set field parameters in the TreeView configuration.

Experiment with the `TreeLevels`, `RootItems` and `ItemsPerLevel` values below.

>caption TreeView with random number of levels and same model type on all levels

<demo metaUrl="client/treeview/data-binding/hierarchical-data/example-2/" height="420"></demo>


## See Also

* [TreeView Data Binding Basics](slug:components/treeview/data-binding/overview)
* [Live Demo: TreeView Hierarchical Data](https://demos.telerik.com/blazor-ui/treeview/hierarchical-data)
* [Binding to Flat Data](slug:components/treeview/data-binding/flat-data)
* [Load on Demand](slug:components/treeview/data-binding/load-on-demand)
