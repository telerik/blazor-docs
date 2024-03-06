---
title: Overview
page_title: Badge Overview
description: Discover the Badge component for Blazor. Learn how to add the component to your app and explore its configuration options, such as positioning and alignment.
slug: badge-overview
tags: telerik,blazor,badge,navbar
published: True
position: 0
---

# Blazor Badge Overview

The <a href = "https://www.telerik.com/blazor-ui/badge" target="_blank">Blazor Badge component</a> is a visual element that displays additional information, such as status indicators, notification icons, short text, and others.

The Badge comes with built-in customization features that allow the developer to change the [background color]({%slug badge-appearance%}#themecolor) and the [fill mode]({%slug badge-appearance%}#fillmode), to enable or disable the cutout border, and fine-tune the [positioning and alignment]({%slug badge-position-alignment%}) of the component.

## Creating Blazor Badge

1. Add the `<TelerikBadge>` tag to a container that the Badge will attach to.
1. Use the `ChildContent` to add content.
1. (optional) Customize the [appearance]({%slug badge-appearance%}) and fine-tune the [positioning and alignment]({%slug badge-position-alignment%}) of the Telerik Blazor Badge.

>caption Basic configuration of the Blazor Badge

````CSHTML
<TelerikButton>
    <TelerikBadge>12</TelerikBadge>
    <span>Notifications</span>
</TelerikButton>
````

## Positioning and Alignment

You can control how the Badge is positioned relative to its associated container. [Read more about the Blazor Badge positioning...]({%slug badge-position-alignment%})

## Badge Parameters

The Blazor Badge provides various parameters that allow you to configure the component. Also check the [Badge API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikBadge) for a full list of properties.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `ShowCutoutBorder` | `bool` | Controls whether there is a margin between the Badge and the container when they overlap. |
| `Position` | `BadgePosition ` <br /> (`Edge`) | Specifies the position of the Badge relative to the container. [Read more about Badge positioning.]({%slug badge-position-alignment%}) |
| `HorizontalAlign` | `BadgeHorizontalAlign ` <br /> (`End`) | Determines if the left or the right side of the Badge will touch its parent container. [Read more about Badge positioning.]({%slug badge-position-alignment%}) |
| `VerticalAlign` | `BadgeVerticalAlign  ` <br /> (`Top`) | Determines if the Badge will touch the parent container with its top or bottom side. [Read more about Badge positioning.]({%slug badge-position-alignment%}) |

### Styling and Appearance

The following parameters enable you to customize the appearance of the Blazor Badge:

| Parameter | Type | Description |
| --- | --- | --- |
| `Class` | `string` | The CSS class to be rendered on the main wrapping element of the AppBar component, which is `<div class="k-badge">`. Use for [styling customizations]({%slug themes-override%}). |
| `FillMode` | `Telerik.Blazor.ThemeConstants.Badge.FillMode.Solid` | Controls how the Badge is filled. |
| `Rounded` | `Telerik.Blazor.ThemeConstants.Badge.Rounded.Full` | Defines how rounded the borders of the Badge are. |
| `Size` | `Telerik.Blazor.ThemeConstants.Badge.Size.Medium` | Sets the size of the Badge. |
| `ThemeColor` | `Telerik.Blazor.ThemeConstants.Badge.ThemeColor.Primary` | Adjust the background color of the Badge. |

You can find more information for customizing the Badge appearance in the [Appearance article]({%slug badge-appearance%}).

## Next Steps

* [Explore the Badge Positioning and Alignment Settings]({%slug badge-position-alignment%})
* [Customize the Badge Appearance]({%slug badge-appearance%})
* [Knowledge-Base article: Add a Badge to a container that cannot have children]({slug kb-badge-container-no-children})

## See Also

* [Live Badge Demos](https://demos.telerik.com/blazor-ui/badge/overview)
* [Badge API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikBadge)
