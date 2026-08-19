---
title: Load on Demand
page_title: DropDownTree - Data Binding on Demand
description: Lazy load child items on demand with the Telerik DropDownTree for Blazor.
slug: dropdowntree-data-binding-load-on-demand
tags: telerik,blazor,dropdowntree,databinding
components: ["dropdowntree"]
published: True
position: 15
---

# DropDownTree Load on Demand

This article explains how to load flat and hierarchical data on demand in the DropDownTree for Blazor.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

You can bind the DropDownTree to just one or two levels on initial display for efficiency. To show an expand icon for parent items and enable loading of children on demand, set the `HasChildren` property of the parent item to `true`. Then, use the [`OnExpand` event](slug:dropdowntree-events#onexpand) to load the child items of the expanded node. Loading data on demand can improve the performance of your application by requesting less data at any given time.

## Flat Data

>caption Load DropDownTree items on demand with flat data

<demo metaUrl="client/dropdowntree/data-binding/load-on-demand-flat/" height="350"></demo>

## Hierarchical Data

>caption Load DropDownTree items on demand with hierarchical data

<demo metaUrl="client/dropdowntree/data-binding/load-on-demand-hierarchical/" height="350"></demo>

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [DropDownTree Binding to Flat Data](slug:dropdowntree-data-binding-flat-data)
* [DropDownTree Binding to Hierarchical Data](slug:dropdowntree-data-binding-hierarchical-data)
* [Live Demo: DropDownTree Demos](https://demos.telerik.com/blazor-ui/dropdowntree)
