---
title: Item Template
page_title: Menu - Item Template
description: Item Template in the Menu for Blazor.
slug: contextmenu-item-template
tags: telerik,blazor,context menu,templates
published: True
position: 10
components: ["contextmenu"]
---

# Context Menu Item Template

The Context Menu component allows you to define a custom template for its items. This article explains how you can use it.

The Item Template  is defined under the `<ItemTemplate>` tag of the menu.

The template receives the model to which the item is bound as its `context`. You can use it to render the desired content. The menu is a generic component, so you can use a named context variable that will be of the model type without additional casting.

You can use the template to render arbitrary content according to your application's data and logic. You can use components in it and thus provide rich content instead of plain text. You can also use it to add DOM event handlers like click, doubleclick, mouseover if you need to respond to them.

>caption Use templates to implement custom navigation between views without the UrlField feature

<demo metaUrl="client/contextmenu/templates/item/" height="300"></demo>


## See Also

* [Data Binding a Context Menu](slug:contextmenu-data-binding-overview)
* [Live Demo: Context Menu Templates](https://demos.telerik.com/blazor-ui/contextmenu/templates)

