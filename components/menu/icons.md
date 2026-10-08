---
title: Icons
page_title: Menu - Icon
description: Icons and images in the Menu for Blazor.
slug: menu-icons
tags: telerik,blazor,menu,icon,iconclass,image
published: True
position: 15
components: ["menu"]
---

# Menu Icons

You can add [Telerik Font or SVG icons](slug:common-features-icons) to the Menu items. The component also supports custom icons.

To use Menu item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the Menu.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the Menu model is `Icon`, there is no need to set the `IconField` parameter.

To select an SVG icon variant for each item, set `IconVariantField` to the model property that holds the variant name. The default field name is `IconVariant`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik Menu

<demo metaUrl="client/menu/icons/example-1/" height="420"></demo>

## See Also

* [Online Demo: Menu Icons](https://demos.telerik.com/blazor-ui/menu/images)
* [Menu Overview](slug:components/menu/overview)
