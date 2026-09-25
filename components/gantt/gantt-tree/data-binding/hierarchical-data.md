---
title: Hierarchical Data
page_title: Gantt Tree - Data Binding to Hierarchical Data
description: Data Binding the Gatt Chart for Blazor to hierarchical data.
slug: gantt-data-binding-hierarchical-data
tags: telerik,blazor,gantt,data,bind,databind,databinding,hierarchical
published: True
position: 5
components: ["gantt"]
---

# Gantt Data Binding to Hierarchical Data

This article explains how to bind the Gantt Chart for Blazor to hierarchical data. 


Hierarchical data means that the collection of child items is provided in a field of its parent's model. By default, this is the `Items` field, and hierarchical data binding is the default mode of the Gantt Tree. This approach of providing items lets you gather separate collections of data that may even come from different sources.

If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

>caption Example of hierarchical data binding

<demo metaUrl="client/gantt/hierarchical-data/example-1/" height="740"></demo>

## See Also

* [Gantt Data Binding Basics](slug:gantt-data-binding-overview)
* [Binding to Flat Data](slug:gantt-data-binding-flat-data)

