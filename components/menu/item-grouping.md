---
title: Item Grouping
page_title: Menu - Item Grouping
description: Organize Menu child items under labeled group headers in Blazor.
slug: components/menu/item-grouping
tags: telerik,blazor,menu,item grouping,group headers
published: True
position: 7
components: ["menu"]
---

# Menu Item Grouping

The Menu can organize child items in a popup under labeled group headers. To create a group header, set the [`GroupHeader` field](slug:components/menu/data-binding/overview#menu-item-features) of a child item to `true`. The group header applies to the items that follow it until the next group header.

Group headers have the following behavior:

* They are not interactive. The Menu does not focus group headers and skips them during keyboard navigation.
* They are different from [separators](slug:components/menu/data-binding/overview#menu-item-features). You can use both in the same popup.
* They apply only to child items. The root items of the Menu ignore the `GroupHeader` field and render as regular items. The [ContextMenu](slug:contextmenu-item-grouping) supports group headers at the root level too.

By default, the group header displays the item text and icon. To customize this content, use the [Menu group header template](slug:components/menu/templates#groupheadertemplate).

>caption Group Menu child items under labeled headers

<demo metaUrl="client/menu/item-grouping/" height="360"></demo>

## See Also

* [Menu Group Header Template](slug:components/menu/templates#groupheadertemplate)
* [Data Binding a Menu](slug:components/menu/data-binding/overview)