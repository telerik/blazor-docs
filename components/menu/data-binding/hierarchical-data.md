---
title: Hierarchical Data
page_title: Menu - Data Binding to Hierarchical Data
description: Data Binding the Menu for Blazor to hierarchical data.
slug: components/menu/data-binding/hierarchical-data
tags: telerik,blazor,menu,data,bind,databind,databinding,hierarchical
published: True
position: 2
components: ["menu"]
---

# Menu Data Binding to Hierarchical Data

This article explains how to bind the Menu for Blazor to hierarchical data. 
@[template](/_contentTemplates/menu/basic-example.md#data-binding-basics-link)


Hierarchical data means that the collection of child items is provided in a field of its parent's model. By default, this is the `Items` field. If there are items for a certain node, it will have an expand icon. The `HasChildren` field can override this, however, but it is not required for hierarchical data binding.

This approach of providing nodes lets you gather separate collections of data for certain sections or areas. Note that all menu item models must be of the same type.

>caption Example of using hierarchical data in a menu (for brevity, URLs are omitted)

<demo metaUrl="client/menu/hierarchical-data/example-1/" height="320"></demo>

>caption The result from the code snippet above, after hovering the "Company" item

![Blazor Menu Hierarchical Data Overview](images/menu-hierarchical-data-overview.png)


## See Also

* [Menu Data Binding Basics](slug:components/menu/data-binding/overview)
* [Live Demo: Menu Hierarchical Data](https://demos.telerik.com/blazor-ui/menu/hierarchical-data)
* [Binding to Flat Data](slug:components/menu/data-binding/flat-data)

