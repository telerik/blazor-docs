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

First, review:

* The available (bindable) [features of a treelist item](#treelist-item-features).
* How to match fields in the model with the treelist item [data bindings](#data-bindings).

There are three modes of providing data to a treelist, and they all use the items' features. Once you are familiar with the current article, choose the data binding more you wish to use:

@[template](/_contentTemplates/treelist/databinding.md#data-binding-modes)

## TreeList Item Features

The treelist items provide the following features that you control through the corresponding fields in their data binding:

* `Id` - a unique identifier for the item. Required for binding to flat data.

* `ParentId` - identifies the parent to whom the item belongs. Required only when binding to flat data. All items with the same `ParentId` will be rendered at the same level. For a root level item, this must be `null`.

* `HasChildren` - whether the item has children. Determines whether an expand arrow is rendered next to the item in an Expandable column. Required for binding to flat data and for load-on-demand. With hierarchical data, the treelist will render the icon based on the existence of child items, but `HasChildren` will take precedence.

* `Items` - the collection of child items that will be rendered under the current item. Required only when binding to hierarchical data.

## Data Bindings

The properties of a treelist item match directly to a field of the model the treelist is bound to. You provide that relationship by providing the name of the field from which the corresponding information is to be taken. To do this, in the main `TelerikTreeList` tag, use the parameters described below:

* IdField => Id
* ParentIdField => ParentId
* HasChildrenField => HasChildren
* ItemsField => Items


>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

>caption Default field names for treelist item bindings. If you use these, you don't have to specify them in the treelist tag explicitly.

````CSHTML
public class TreeListItem
{
	public int Id { get; set; }
	public int? ParentId { get; set; }
	public bool HasChildren { get; set; }
	public List<TreeListItem> Items { get; set; }
}
````

## Examples

For samples of using each data binding approach listed above, see its corresponding article:

@[template](/_contentTemplates/treelist/databinding.md#data-binding-modes)


## See Also

  * [Binding to Flat Data]({%slug treelist-data-binding-flat-data%})
  * [Binding to Hierarchical Data]({%slug treelist-data-binding-hierarchical-data%})
  * [Load on Demand]({%slug treelist-data-binding-load-on-demand%})
  * [Live Demo: TreeList Flat Data](https://demos.telerik.com/blazor-ui/treelist/flat-data)
  * [Live Demo: TreeList Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/hierarchical-data)
  * [Live Demo: TreeList Load on Demand](https://demos.telerik.com/blazor-ui/treelist/lazy-loading)
