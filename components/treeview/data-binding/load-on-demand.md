---
title: Load on Demand
page_title: Treeview - Data Binding on Demand
description: Load on Demand in the Treeview for Blazor.
slug: components/treeview/data-binding/load-on-demand
tags: telerik,blazor,treeview,data,bind,databind,databinding,load,demand
published: True
position: 3
components: ["treeview"]
---

# Treeview Load on Demand

This article explains how to load nodes on demand the TreeView for Blazor. 

>tip @[template](/_contentTemplates/treeview/basic-example.md#data-binding-basics-link)

You don't have to provide all the data the treeview will render at once - the root nodes are sufficient for an initial display. You can then use the `OnExpand` event of the treeview to provide [flat](slug:components/treeview/data-binding/flat-data) or [hierarchical](slug:components/treeview/data-binding/hierarchical-data) data to the node that was just expanded. Loading nodes on demand can improve the performance of your application by requesting less data at any given time.

In this article:

* [Hierarchical Data Load on Demand - One Model](#hierarchical-data-load-on-demand-one-model)

* [Flat Data Load on Demand](#flat-data-load-on-demand)

* [Hierarchical Data Load on Demand - Different Models](#hierarchical-data-load-on-demand-different-models)

## Hierarchical Data Load on Demand - One Model

The **example** below shows how you can handle hierarchical data load on demand in detail. It uses the same model for the two different [levels of data bindings](slug:components/treeview/data-binding/overview#multiple-level-bindings) it showcases.

>caption One Model Hierarchical Data Load on Demand in a TreeView with sample handling of the various cases. Review the code comments for details.

<demo metaUrl="client/treeview/data-binding/load-on-demand/example-1/" height="420"></demo>

## Flat Data Load on Demand

The **example** below shows how you can handle flat data load on demand in detail.

>caption Flat Data Load on Demand in a TreeView. Review the code comments for details.

<demo metaUrl="client/treeview/data-binding/load-on-demand/example-2/" height="420"></demo>

## Hierarchical Data Load on Demand - Different Models

The **example** below shows how you can handle hierarchical data load on demand in detail. It uses two different models for the two different [levels of data bindings](slug:components/treeview/data-binding/overview#multiple-level-bindings) it showcases. You do not have to use different models and/or different bindings ( see [Hierarchical Data Load on Demand - One Model](#hierarchical-data-load-on-demand-one-model) ).

>caption Different Models Hierarchical Data Load on Demand in a TreeView with sample handling of the various cases. Review the code comments for details.

<demo metaUrl="client/treeview/data-binding/load-on-demand/example-3/" height="420"></demo>

## See Also

* [TreeView Data Binding Basics](slug:components/treeview/data-binding/overview)
* [Live Demo: TreeView Load on Demand](https://demos.telerik.com/blazor-ui/treeview/lazy-loading)
* [Binding to Flat Data](slug:components/treeview/data-binding/flat-data)
* [Binding to Hierarchical Data](slug:components/treeview/data-binding/hierarchical-data)
