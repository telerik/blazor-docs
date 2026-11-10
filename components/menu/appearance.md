---
title: Appearance
page_title: Menu Appearance
description: Appearance settings of the Menu for Blazor. Learn how to change the size of the Menu items.
slug: components/menu/appearance
tags: telerik,blazor,menu,appearance,size
published: True
position: 7
components: ["menu"]
---

# Menu Appearance Settings

You can control the appearance of the Menu by setting the [Size](#size) parameter.

## Size

You can increase or decrease the size of the Menu items by setting the `Size` parameter to a member of the [`Telerik.Blazor.ThemeConstants.Menu.Size`](slug:telerik.blazor.themeconstants.menu.size) class. The `Size` parameter determines styles like `padding`, `font-size`, and `line-height` of the Menu links.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium` <br /> default value|`md`|
|`Large`|`lg`|

The `Size` parameter affects:

* The root items in both [horizontal and vertical orientation](slug:components/menu/orientation).
* The child items in the Menu popups.
* The items of the [ContextMenu](slug:contextmenu-overview), which also exposes a `Size` parameter.

When you set `Size` to `null`, the Menu does not render a size CSS class. In this case, the Menu items rely only on your custom CSS styles.

>caption Built-in Menu sizes

<demo metaUrl="client/menu/appearance/example-1/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Menu Appearance](https://demos.telerik.com/blazor-ui/menu/appearance)
* [Menu Orientation](slug:components/menu/orientation)
* [Menu API Reference](slug:Telerik.Blazor.Components.TelerikMenu-1)
