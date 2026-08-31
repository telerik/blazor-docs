---
title: Flat Data
page_title: Context Menu - Data Binding to Flat Data
description: Data Binding the Context Menu for Blazor to flat data.
slug: contextmenu-data-binding-flat-data
tags: telerik,blazor,context menu,data,bind,databind,databinding,flat
published: True
position: 2
components: ["contextmenu"]
---

# Context Menu Data Binding to Flat Data

This article explains how to bind the Context Menu for Blazor to flat data. 
@[template](/_contentTemplates/menu/basic-example.md#context-menudata-binding-basics-link)


Flat data means that the entire collection of menu items is available at one level, for example `List<MyMenuModel>`.

The parent-child relationships are created through internal data in the model - the `ParentId` field which points to the `Id` of the item that will contain the current item. The root level has `null` for `ParentId`.

You are *not* required to provide a value for the `HasChildren` field. @[template](/_contentTemplates/menu/basic-example.md#has-children-behavior)

>caption Example of flat data in a context menu

<demo metaUrl="client/contextmenu/data-binding/flat-data/" height="300"></demo>

## See Also

* [Menu Data Binding Basics](slug:components/menu/data-binding/overview)
* [Live Demo: Context Menu](https://demos.telerik.com/blazor-ui/contextmenu/overview)
* [Binding to Hierarchical Data](slug:components/menu/data-binding/hierarchical-data)

