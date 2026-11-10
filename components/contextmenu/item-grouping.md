---
title: Item Grouping
page_title: Context Menu - Item Grouping
description: Organize Context Menu items under labeled group headers in Blazor.
slug: contextmenu-item-grouping
tags: telerik,blazor,context menu,item grouping,group headers
published: True
position: 7
components: ["contextmenu"]
---

# Context Menu Item Grouping

The Context Menu can organize its items under labeled group headers. To create a group header, set the [`GroupHeader` property](slug:contextmenu-data-binding-overview#context-menu-item-features) of an item to `true`. The group header applies to the items that follow it until the next group header.

Unlike the [Menu](slug:components/menu/templates#groupheadertemplate), the Context Menu supports group headers both at the root level and in child popups.

Group headers have the following behavior:

* They are not interactive. The Context Menu does not focus group headers and skips them during keyboard navigation.
* They are different from [separators](slug:contextmenu-data-binding-overview#context-menu-item-features). You can use both in the same list of items.

By default, the group header displays the item text and icon. To customize this content, use the [Context Menu group header template](slug:contextmenu-group-header-template).

>caption Group Context Menu items under labeled headers

<demo metaUrl="client/contextmenu/item-grouping/" height="400"></demo>

## See Also

* [Context Menu Group Header Template](slug:contextmenu-group-header-template)
* [Data Binding a Context Menu](slug:contextmenu-data-binding-overview)