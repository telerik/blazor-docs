---
title: Flat Data
page_title: PanelBar - Data Binding to Flat Data
description: Data Binding the PanelBar for Blazor to flat data.
slug: panelbar-data-binding-flat
tags: telerik,blazor,panelbar,data,bind,databind,databinding,flat
published: True
position: 1
components: ["panelbar"]
---

# PanelBar Data Binding to Flat Data

This article explains how to bind the PanelBar for Blazor to flat data.

Flat data means that the entire collection of PanelBar items is available at one level, for example `List<MyPanelBarModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`. There must be at least one node with a `null` value so that the PanelBar renders anything.

You must also provide the correct value for the `HasChildren` field - for items that have children, you must set it to `true` so that the expand arrow is rendered.

>caption Example of flat data in a PanelBar

<demo metaUrl="client/panelbar/data-binding/flat-data/" height="450"></demo>


## See Also
  
* [PanelBar Data Binding Overview](slug:panelbar-data-binding-overview)
* [Binding to Hierarchical Data](slug:panelbar-data-binding-hierarchical)
* [Live Demo: PanelBar Flat Data](https://demos.telerik.com/blazor-ui/panelbar/flat-data)

