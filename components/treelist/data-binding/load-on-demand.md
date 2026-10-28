---
title: Load on Demand
page_title: TreeList - Data Binding on Demand
description: Load on Demand in the treelist for Blazor.
slug: treelist-data-binding-load-on-demand
tags: telerik,blazor,treelist,data,bind,databind,databinding,load,demand
published: True
position: 3
components: ["treelist"]
---

# TreeList Load on Demand

This article explains how to load nodes on demand the treelist for Blazor so you can improve the performance. 
@[template](/_contentTemplates/treelist/databinding.md#link-to-basics)
Loading nodes on demand can improve the performance of your application by requesting less data at any given time.


You don't have to provide all the data the treelist will render at once - the root nodes are sufficient for an initial display. You can then use the `OnExpand` event of the treelist to provide [hierarchical data](slug:treelist-data-binding-hierarchical-data) to the node that was just expanded or amend [flat data](slug:treelist-data-binding-flat-data) source with new nodes.

In the `OnExpand` event, you will receive the current node that was just expanded so you can check whether you need to load items for it. You can then load those items from your data service and update the corresponding data collection.

You can also use the `HasChildren` field as a flag to know whether you need data for the given node. It is up to the application to populate it - you may choose not to do so, but keep in mind that setting it to `false` will override the presence of child items and will prevent the expand icon from rendering so the user will never be able to expand a node. Thus, you may want to default this field to `true` and only reset it to `false` if the data request does not return child items.



Below you will find two examples - for [hierarchical](#load-hierarchical-data-on-demand) and for [flat](#load-flat-data-on-demand) data.

## Load Hierarchical Data On Demand

>caption Load on Demand in a TreeList with hierarchical data binding. Code comments offer details.

<demo metaUrl="client/treelist/data-binding/load-on-demand/example-1/" height="720"></demo>

>caption The result from the example above when expanding all children of root 2
## Load Flat Data On Demand

>caption Load on Demand in a TreeList with flat data binding. Code comments offer details.

<demo metaUrl="client/treelist/data-binding/load-on-demand/example-2/" height="720"></demo>

>caption The result from the example above when expanding all children of root 2
## See Also

* [TreeList Data Binding Basics](slug:treelist-data-binding-overview)
* [Live Demo: TreeList Load on Demand](https://demos.telerik.com/blazor-ui/treelist/load-on-demand)
* [Binding to Flat Data](slug:treelist-data-binding-flat-data)
* [Binding to Hierarchical Data](slug:treelist-data-binding-hierarchical-data)

