---
title: Hierarchical Data
page_title: TreeList - Data Binding to Hierarchical Data
description: Data Binding the treelist for Blazor to hierarchical data.
slug: treelist-data-binding-hierarchical-data
tags: telerik,blazor,treelist,data,bind,databind,databinding,hierarchical
published: True
position: 1
components: ["treelist"]
---

# TreeList Data Binding to Hierarchical Data

This article explains how to bind the treelist for Blazor to hierarchical data. 
@[template](/_contentTemplates/treelist/databinding.md#link-to-basics)


Hierarchical data means that the collection of child items is provided in a field of its parent's model. By default, this is the `Items` field, and hierarchical data binding is the default mode of the treelist. This approach of providing items lets you gather separate collections of data that may even come from different sources.

If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

>caption Example of hierarchical data binding

<demo metaUrl="client/treelist/data-binding/hierarchical-data/example-1/" height="720"></demo>

## See Also

* [TreeList Data Binding Basics](slug:treelist-data-binding-overview)
* [Live Demo: TreeList Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/binding-hierarchical-data)
* [Binding to Flat Data](slug:treelist-data-binding-flat-data)
* [Load on Demand](slug:treelist-data-binding-load-on-demand)

