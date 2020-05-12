---
title: Data Binding
page_title: Drawer for Blazor | Data Binding
description: Data Binding in the Drawer for Blazor
slug: drawer-data-binding
tags: telerik,blazor,drawer,data,binding
published: True
position: 2
---

# Drawer Data Binding

This article explains the how to provide data to a Drawer component so it renders items for you, the properties related to data binding and their results.

This article has the following sections:

* The available (bindable) [features of a drawer item](#drawer-item-features).
* How to match fields in the model with the drawer item [data bindings](#data-bindings).


## Drawer Item Features

The drawer items provide the following features that you control through the corresponding fields in their data binding:


* `Text` - the text that will be shown on the item.
* `Icon` / `IconClass` / `ImageUrl` - the [Telerik icon]({%slug general-information/font-icons%}), a class for a custom font icon, or the URL to a raster image that will be rendered in the item. They have the listed order of precedence in case more than one is present in the data (that is, an `Icon` will have the highest importance).
* `Url` - the view the item will navigate to by generating a link.
* `IsSeparator` - whether the item will be a separator line instead of a clickable item.

## Data Bindings

The properties of a drawer item match directly to a field of the model the drawer is bound to. You provide that relationship by providing the name of the field from which the corresponding information is present. To do this, use the properties in the main `TelerikDrawer` tag:


* TextField => Text
* IconClassField => IconClass
* IconField => Icon
* ImageUrlField => ImageUrl
* UrlField => Url
* IsSeparatorField => IsSeparator


>tip There are default values for the field names. If your model names match the defaults, you don't have to define them in the bindings settings.

>caption Default field names for drawer item bindings. If you use these, you don't have to specify them in the `TelerikDrawer` tag explicitly.

````CSHTML
public class DrawerItem
{
	public string Text { get; set; }
	public string Icon { get; set; }
	public string Url { get; set; }
	public bool IsSeparator { get;set; }
}
````




## See Also

* [Drawer Overview]({% slug drawer-overview%})
* [Drawer Navigation]({% slug drawer-navigation%})

