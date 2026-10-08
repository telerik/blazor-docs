---
title: Icons
page_title: Context Menu - Icon
description: Icons and images in the Menu for Blazor.
slug: contextmenu-icons
tags: telerik,blazor,context menu,icon,iconclass,image
published: True
position: 15
components: ["contextmenu"]
---

# Context Menu Icons

You can add [Telerik Font or SVG icons](slug:common-features-icons) to the ContextMenu items. The component also supports custom icons.

To use ContextMenu item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the ContextMenu.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the ContextMenu model is `Icon`, there is no need to set the `IconField` parameter.

To select an SVG icon variant for each item, set `IconVariantField` to the model property that holds the variant name. The default field name is `IconVariant`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in Telerik Context Menu

<demo metaUrl="client/contextmenu/icons/" height="350"></demo>

## See Also

* [Online Demo: Context Menu Icons](https://demos.telerik.com/blazor-ui/contextmenu/icons)
* [Context Menu Overview](slug:contextmenu-overview)
