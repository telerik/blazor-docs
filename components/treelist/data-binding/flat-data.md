---
title: Flat Data
page_title: TreeList - Data Binding to Flat Data
description: Data Binding the treelist for Blazor to flat data.
slug: treelist-data-binding-flat-data
tags: telerik,blazor,treelist,data,bind,databind,databinding,flat
published: True
position: 2
components: ["treelist"]
---

# TreeList Data Binding to Flat Data

This article explains how to bind the treelist for Blazor to flat data. 
@[template](/_contentTemplates/treelist/databinding.md#link-to-basics)


Flat data means that the entire collection of treelist items is available at one level, for example `List<MyTreeListItemModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the treelist renders anything.

If there are child items for a certain node (items whose `ParentId` points to the current item's `Id`), it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for flat data binding.

>caption Example of flat data in a treelist - you need to point the TreeList to the Id and ParentId fields in your model

<demo metaUrl="client/treelist/data-binding/flat-data/example-1/" height="720"></demo>

## See Also

* [TreeList Data Binding Basics](slug:treelist-data-binding-overview)
* [Live Demo: TreeList Flat Data](https://demos.telerik.com/blazor-ui/treelist/binding-flat-data)
* [Binding to Hierarchical Data](slug:treelist-data-binding-hierarchical-data)
* [Load on Demand](slug:treelist-data-binding-load-on-demand)

