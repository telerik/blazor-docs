---
title: Overview
page_title: TreeList - Data Binding Overview
description: Data Binding basics in the treelist for Blazor.
slug: treelist-data-binding-overview
tags: telerik,blazor,treelist,data,bind,databind,databinding,basics
published: True
position: 0
---

# TreeList Data Binding Basics

This article explains the different ways to provide data to a treelist component and the properties related to data binding. Reviewing this article will explain the basics of how you can describe the hierarchy of items in your data source to the treelist component so they can render.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

First, review:

* The available (bindable) [features of a treelist item](#treelist-item-features).
* How to match fields in the model with the treelist item [data bindings](#data-bindings).

There are two modes of providing data to a treelist, and they all use the items' features. Once you are familiar with the current article, choose the data binding more you wish to use:

@[template](/_contentTemplates/treelist/databinding.md#data-binding-modes)

## TreeList Item Features

The treelist items provide the following features that you control through the corresponding fields in their data binding:

* `Items` - the collection of child items that will be rendered under the current item. Required only when binding to hierarchical data.

* `Id` - a unique identifier for the item. Required only for binding to flat data.

* `ParentId` - identifies the parent to whom the item belongs. Required only when binding to flat data. All items with the same `ParentId` will be rendered at the same level. For a root level item, this must be `null`. There must be at least one node with a `null` parent id.

* `HasChildren` - whether the item has children. Determines whether an expand arrow is rendered next to the item in an Expandable column. Required for loading data on-demand - if you don't set it to `true`, there will be no expand arrow and so there will be no way for the user to expand the item and load its children. With hierarchical data, the treelist will render the icon based on the existence of child items, but `HasChildren` will take precedence. You do not have to set or use its field unless you want to load data on demand, or override the arrow for some items.

## Data Bindings

The properties of a treelist item match directly to a field of the model the treelist is bound to. You provide that relationship by providing the name of the field from which the corresponding information is to be taken. To do this, in the main `TelerikTreeList` tag, use the parameters described below:

* IdField => Id
* ParentIdField => ParentId
* HasChildrenField => HasChildren
* ItemsField => Items


## Examples

For samples of using each data binding approach listed above, see its corresponding article:

@[template](/_contentTemplates/treelist/databinding.md#data-binding-modes)

## Notes

* If you provide an `List<object>` to the `Data` parameter of the component, you should set the `FieldType` of the TreeList columns to the corresponding data types of the properties. If you pass a collection of models the component will iterate over the properties and set the `FieldType` internally. 


## See Also

  * [Binding to Flat Data]({%slug treelist-data-binding-flat-data%})
  * [Binding to Hierarchical Data]({%slug treelist-data-binding-hierarchical-data%})
  * [Load on Demand]({%slug treelist-data-binding-load-on-demand%})
  * [Live Demo: TreeList Flat Data](https://demos.telerik.com/blazor-ui/treelist/flat-data)
  * [Live Demo: TreeList Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/hierarchical-data)
  * [Live Demo: TreeList Load on Demand](https://demos.telerik.com/blazor-ui/treelist/lazy-loading)
