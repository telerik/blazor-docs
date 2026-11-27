---
title: Icons
page_title: Badge - Icon
description: Icons in the Telerik Badge for Blazor.
slug: badge-icons
tags: telerik, blazor, badge, icon
published: True
tag: new
position: 20
components: ["badge"]
---

# Badge Icons

You can add a [Telerik Font or SVG icon](slug:common-features-icons) in the Badge next to the text content or instead of the text content.

## Icon Parameters

The Badge component provides two parameters to define an icon:

* The `Icon` parameter renders a leading icon, before the Badge text. 
* The `EndIcon` parameter renders a trailing icon, after the Badge text.

Both parameters are of type `object` and they accept:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

For SVG icons, you can use `IconVariant` and `EndIconVariant` to select an available variant. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

If you add a single icon and no text to the Badge, the component centers the icon on all sides. Using both `Icon` and `EndIcon` at the same time is possible, but rarely a good UX pattern.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption Using icons in the Telerik Blazor Badge

<demo metaUrl="client/badge/icons/" height="250"></demo>

## See Also

* [Badge Appearance](slug:badge-appearance)
