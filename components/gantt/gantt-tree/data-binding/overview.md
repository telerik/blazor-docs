---
title: Overview
page_title: Gantt - Data Binding Overview
description: Data Binding basics in the Gantt for Blazor.
slug: gantt-data-binding-overview
tags: telerik,blazor,gantt,data,bind,databind,databinding,basics
published: True
position: 0
---

# Gantt Tree Data Binding Basics

This article explains the different ways to provide data to a Gantt Chart component and the properties related to data binding. Reviewing this article will explain the basics of how you can describe the hierarchy of items in your data source to the Gantt component so they can render.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

First, review:

* The available (bindable) [features of a Gantt Tree item](#gantt-tree-item-features).
* How to match fields in the model with the Gantt Tree item [data bindings](#data-bindings).

There are two modes of providing data to a Gantt Tree, and they all use the items' features. Once you are familiar with the current article, choose the data binding you wish to use more:

* [Flat data]({%slug gantt-data-binding-flat-data%}) - a single collection of items with defined parent-child relationships. See the `Id` and `ParentId` settings.

* [Hierarchical data]({%slug gantt-data-binding-hierarchical-data%}) - separate collections of items and their child items. This is the default mode of the component. See the `Items` setting.

## Gantt Tree Item Features

The Gantt Tree items provide the following features that you can control through the corresponding fields in their data binding:

* `Items` - the collection of child items that will be rendered under the current item. Required only when binding to hierarchical data.

* `Id` - a unique identifier for the item. Required only for binding to flat data.

* `ParentId` - identifies the parent to whom the item belongs. Required only when binding to flat data. All items with the same `ParentId` will be rendered at the same level. For a root level item, `ParentId` must be `null`. There must be at least one node with a `null` value for the `ParentId`.

* `HasChildren` - whether the item has children. Determines whether an expand arrow is rendered next to the item in an Expandable column. Required for loading data on-demand - if you don't set it to `true`, there will be no expand arrow and so there will be no way for the user to expand the item and load its children. With hierarchical data, the Gantt Tree will render the icon based on the existence of child items, but `HasChildren` will take precedence. You do not have to set or use its field unless you want to load data on demand, or override the arrow for some items.

## Data Bindings

The properties of a Gantt Tree item match directly to a field of the model the treelist is bound to. You provide that relationship by providing the name of the field from which the corresponding information is to be taken. To do this, in the main `TelerikGantt` tag, use the parameters described below:

* IdField => Id
* ParentIdField => ParentId
* HasChildrenField => HasChildren
* ItemsField => Items

## Notes

* The Gantt is designed to work with a collection of strongly typed models (e.g., `IENumerable<SomeDataModel>`). If you provide an `IEnumerable<object>` instead, you must set the `FieldType` of the `<GanttColumn>` instances to the data type of the fields they use (e.g., `<GanttColumn Field=@nameof(Employee.Name) FieldType="@(typeof(string))" />`).


## See Also

  * [Binding to Flat Data]({%slug gantt-data-binding-flat-data%})
  * [Binding to Hierarchical Data]({%slug gantt-data-binding-hierarchical-data%})
  
