---
title: Icons
page_title: PanelBar - Icons
description: Icons and images in the PanelBar for Blazor.
slug: panelbar-icons
tags: telerik,blazor,panelbar,icon,iconclass,image
published: True
position: 15
components: ["panelbar"]
---

# PanelBar Icons

You can add [Telerik Font or SVG icons](slug:common-features-icons) to the PanelBar items. The component also supports custom icons.

To use PanelBar item icons, define a property in the component model class and assign the property name to the `IconField` parameter of the PanelBar.

@[template](/_contentTemplates/common/icons.md#icon-property-supported-types)

If the icon property name in the PanelBar model is `Icon`, there is no need to set the `IconField` parameter.

To select an SVG icon variant for each item, set `IconVariantField` on the PanelBar binding to the model property that holds the variant name. The default field name is `IconVariant`. See [SVG icon variants](slug:common-features-icons#use-svg-icon-variants).

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

>caption How to use icons in the Telerik PanelBar

<demo metaUrl="client/panelbar/icons/" height="500"></demo>

## See Also

* [PanelBar Overview](slug:panelbar-overview)
* [Live Demos: PanelBar](https://demos.telerik.com/blazor-ui/panelbar/overview)
