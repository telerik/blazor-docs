---
title: Hierarchical Data
page_title: DropDownTree - Data Binding to Hierarchical Data
description: Learn how to bind the Telerik DropDownTree for Blazor to hierarchical data of nested collections.
slug: dropdowntree-data-binding-hierarchical-data
tags: telerik,blazor,dropdowntree,databinding
components: ["dropdowntree"]
published: True
position: 10
---

# DropDownTree Binding to Hierarchical Data

This article explains how to bind the DropDownTree for Blazor to hierarchical data.
@[template](/_contentTemplates/dropdowntree/general.md#data-binding-basics-link)

Hierarchical data means that the child items exist in a property of the parent item. By default, the DropDownTree expects this property to be called `Items`, otherwise set the property name in the `ItemsField` parameter.

The DropDownTree renders an expand icon for all items that:

* Have a non-`null` child items collection.
* Have a `HasChildren` model property and its value is `true`. If a `HasChildren` property exists, it takes precedence over the child items collection.

Hierarchical data binding allows you to have [different model types at each DropDownTree level](#different-type-at-each-level). Note that the [data binding settings are per level](slug:dropdowntree-data-binding-overview#dropdowntree-bindings), so a certain level always uses the same bindings, regardless of the model they represent and their parent.

## Same Model Type on All Levels

The following example uses [default property names in the model](slug:dropdowntree-data-binding-overview#default-property-names), so there is no need to set field parameters in the DropDownTree configuration.

>caption Bind DropDownTree to hierarchical data with the same model type on all levels

<demo metaUrl="client/dropdowntree/data-binding/hierarchical-data/" height="350"></demo>

## Different Type at Each Level

The example below uses two levels of hierarchy, but the same idea applies to any number of levels. You will likely need a separate `TreeViewBinding` tag for each level with its own field name configuration.

>caption Bind DropDownTree to hierarchical data with a different model type at each level

<demo metaUrl="client/dropdowntree/data-binding/different-models/" height="400"></demo>

## See Also

* [DropDownTree Data Binding Basics](slug:dropdowntree-data-binding-overview)
* [Live Demo: DropDownTree Hierarchical Data](https://demos.telerik.com/blazor-ui/dropdowntree/hierarchical-data)
* [DropDownTree Binding to Flat Data](slug:dropdowntree-data-binding-flat-data)
* [Loading DropDownTree Items on Demand](slug:dropdowntree-data-binding-load-on-demand)
