---
title: Overview
page_title: Menu | Data Binding Overview
description: Data Binding basics in the Menu for Blazor
slug: components/menu/data-binding/overview
tags: telerik,blazor,menu,data,bind,databind,databinding,basics
published: True
position: 0
---

# Menu Data Binding Basics

This article explains the different ways to provide data to a Menu component, the properties related to data binding and their results.

First, review:

* The available (bindable) [features of a menu item](#menu-item-features).
* How to match fields in the model with the menu item [data bindings](#data-bindings).

There are two modes of providing data to a menu, and they all use the items' features. Once you are familiar with the current article, choose the data binding more you wish to use:

* [Hierarchical data]({%slug components/menu/data-binding/hierarchical-data%}) - separate collections of items and their child items.
* [Flat data]({%slug components/menu/data-binding/flat-data%}) - a single collection of items with defined parent-child relationships.

## Menu Item Features

The menu items provide the following features that you control through the corresponding fields in their data binding:

* `Id` - a unique identifier for the item. Required for binding to flat data.
* `ParentId` - identifies the parent to whom the item belongs. Required only when binding to flat data. All items with the same `ParentId` will be rendered at the same level. For a root level item, this must be `null`.
* `HasChildren` - can hide child items. The menu will fetch its children from the data source based on the `Id`-`ParentId` relationships (for flat data) or on the presence of the `Items` collection (for hierarchical data). @[template](/_contentTemplates/menu/basic-example.md#has-children-behavior)
* `Items` - the collection of child items that will be rendered under the current item. Required only when binding to hierarchical data.
* `Text` - the text that will be shown on the item.
* `ImageUrl` / `Icon` / `ImageClass` - the URL to a raster image, the [Telerik icon]({%slug general-information/font-icons%}), or a class for a custom font icon that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `ImageUrl` will have the highest importance).
* `Url` - the view the item will navigate to by generating a link.

## Data Bindings

The properties of a menu item match directly to a field of the model the menu is bound to. You provide that relationship by providing the name of the field from which the corresponding information is present. To do this, use the properties in the main `TelerikMenu` tag:

* IdField => Id
* ParentIdField => ParentId
* TextField => Text
* IconClassField => IconClass
* IconField => Icon
* ImageUrlField => ImageUrl
* UrlField => Url
* HasChildrenField => HasChildren
* ItemsField => Items

>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

>caption Default field names for menu item bindings. If you use these, you don't have to specify them in the `TelerikMenu` tag explicitly.

````CSHTML
public class MenuItem
{
	public int Id { get; set; }
	public string Text { get; set; }
	public int? ParentId { get; set; }
	public bool HasChildren { get; set; }
	public string Icon { get; set; }
	public string Url { get; set; }
}
````

## See Also

  * [Binding to Flat Data]({%slug components/menu/data-binding/flat-data%})
  * [Binding to Hierarchical Data]({%slug components/menu/data-binding/hierarchical-data%})
  * [Live Demo: Menu Flat Data](https://demos.telerik.com/blazor-ui/menu/flat-data)
  * [Live Demo: Menu Hierarchical Data](https://demos.telerik.com/blazor-ui/menu/hierarchical-data)
