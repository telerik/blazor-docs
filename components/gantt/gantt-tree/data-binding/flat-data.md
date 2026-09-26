---
title: Flat Data
page_title: Gantt Tree - Data Binding to Flat Data
description: Data Binding the Gantt Tree for Blazor to flat data.
slug: gantt-data-binding-flat-data
tags: telerik,blazor,gantt,data,bind,databind,databinding,flat
published: True
position: 2
components: ["gantt"]
---

# Gantt Tree Data Binding to Flat Data

This article explains how to bind the Gantt Tree for Blazor to flat data.
@[template](/_contentTemplates/treelist/databinding.md#link-to-basics)


Flat data means that the entire collection of Gantt items is available at one level, for example `List<MyGanttItemModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the Gantt Tree renders anything.

If there are child items for a certain node (items whose `ParentId` points to the current item's `Id`), it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for flat data binding.

>caption Example of flat data in a Gantt Tree - you need to point the TreeList to the Id and ParentId fields in your model

<demo metaUrl="client/gantt/flat-data/example-1/" height="740"></demo>


## See Also

* [TreeList Data Binding Basics](slug:gantt-data-binding-overview)
* [Binding to Hierarchical Data](slug:gantt-data-binding-hierarchical-data)

