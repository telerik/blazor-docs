---
title: Flat Data
page_title: DropDownTree - Data Binding to Flat Data
description: Learn how to bind the Telerik DropDownTree for Blazor to flat self-referencing data collections.
slug: dropdowntree-data-binding-flat-data
tags: telerik,blazor,dropdowntree,databinding
components: ["dropdowntree"]
published: True
position: 5
---

# DropDownTree Binding to Flat Data

This article explains how to bind the DropDownTree for Blazor to flat self-referencing data.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

Flat data means that all DropDownTree items are available at one level in a single collection, for example, `List<MyTreeItem>`. The parent-child relationships are defined through properties in the model. For example, the `ParentId` property value of one item points to the `Id` property value of another parent item. The root level items have `null` values for `ParentId`. There must be at least one node with a `null` value so that the TreeView in the DropDownTree popup renders.

You must also provide the correct value for the `HasChildren` property of each item, so that expand arrows display where needed.

When using [multiple level bindings](slug:dropdowntree-data-binding-overview#multiple-level-bindings), define the same `ParentIdField` for all levels for better performance.

>caption Bind DropDownTree to flat data

<demo metaUrl="client/dropdowntree/data-binding/flat-data/" height="350"></demo>

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [Live Demo: DropDownTree Flat Data](https://demos.telerik.com/blazor-ui/dropdowntree/flat-data)
* [DropDownTree Binding to Hierarchical Data](slug:dropdowntree-data-binding-hierarchical-data)
* [Loading DropDownTree Items on Demand](slug:dropdowntree-data-binding-load-on-demand)
