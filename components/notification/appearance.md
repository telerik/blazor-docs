---
title: Appearance
page_title: Notification Appearance
description: Appearance settings of the Notification component for Blazor.
slug: notification-appearance
tags: telerik,blazor,notification,appearance
published: True
position: 5
components: ["notification"]
---

# Appearance Settings

The Notification component provides parameters and properties that allows you to customize its appearance. For brevity, this article will be divided in the following sections:

* [AnimationType](#animationtype)
* [Size](#size)
* [ThemeColor](#themecolor)
* [Z-Index](#z-index)

You can use all three together to get the desired appearance. This article will explain their effect one by one.

## AnimationType

The `AnimationType` parameter controls the way the Notification will appear on the screen. It takes a member of the `Telerik.Blazor.AnimationType` enum:

* `Fade` - the default animation
* `None`
* `PushUp`
* `PushDown`
* `PushLeft`
* `PushRight`
* `RevealVertical`
* `SlideIn`
* `SlideDown`
* `SlideLeft`
* `SlideRight`
* `ZoomIn`
* `ZoomOut`

You can see them in action in the [Notification Animation](https://demos.telerik.com/blazor-ui/notification/animation) Live Demo.

<demo metaUrl="client/notification/appearance/animation-type/"></demo>

## Size

You can control the Size of the Notification by using CSS. To make the cascading of the styles easier and target a single instance of the component you should use the `Class` parameter exposed in the `<TelerikNotification>` tag.

>caption Change the Notification width and height

<demo metaUrl="client/notification/appearance/size/" height="500"></demo>

## ThemeColor

The color of the notification popup is easily controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeColor` class:

* `Primary`
* `Secondary`
* `Tertiary`
* `Success`
* `Info`
* `Warning`
* `Error`
* `Inverse`

These predefined options match the main [Telerik Theme](slug:themes-overview) and you can see that in action in the [Notification Appearance](https://demos.telerik.com/blazor-ui/notification/appearance) Live Demo.

There are built-in themes for the most common notifications such as Success, Info, Warning, Error, that also come with predefined icons, so you don't have to set them explicitly.

<demo metaUrl="client/notification/appearance/theme-color/" height="420"></demo>

The `ThemeColor` parameter renders as the `k-notification-<ThemeColor>` CSS class on the specific notification HTML element and you can set it to a custom value to cascade through, and set the color to a setting of your own without customizing the entire theme.

>caption Custom Notification color without customizing the Telerik Theme

<demo metaUrl="client/notification/appearance/custom-color/" height="300"></demo>

## Z-Index

By default, the notification does not have a z-index and it shows above most elements because it has `position: fixed` in its CSS rules.

In some layouts you may have elements with a certain z-index and they will hide the notification.

You can use the `Class` of the notification to set a higher z-index for the notification according to your layout so it can show according to the desired stacking order - above some elements, perhaps behind others.

>caption Set z-index to the notification so it is not shown behind other elements

<demo metaUrl="client/notification/appearance/z-index/" height="500"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Notification Overview](https://demos.telerik.com/blazor-ui/notification/overview)
* [Live Demo: Notification Appearance](https://demos.telerik.com/blazor-ui/notification/appearance)
* [Live Demo: Notification Animation](https://demos.telerik.com/blazor-ui/notification/animation)
