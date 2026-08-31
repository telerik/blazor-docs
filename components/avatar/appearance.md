---
title: Appearance
page_title: Avatar Appearance
description: Appearance settings of the Avatar for Blazor.
slug: avatar-appearance
tags: telerik,blazor,avatar,appearance
published: True
position: 10
components: ["avatar"]
---

# Appearance Settings

You can control the appearance of the Avatar by setting the following parameters:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)
* [ThemeColor](#themecolor)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## Size

You can increase or decrease the size of the Avatar by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Avatar.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium` (default value)  |`md`|
| `Large`   |`lg`|

> The default value of the `Size` will take precedence over the values of the `Width` and `Height` parameters. Set the `Size` to an empty `string` to apply your custom `Width` and `Height`.

>caption The built-in Avatar sizes

<demo metaUrl="client/avatar/appearance/size/" height="250"></demo>

## Rounded

The `Rounded` parameter applies the `border-radius` CSS style to the Avatar to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full` (default value) |`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/avatar/appearance/rounded/" height="250"></demo>

## FillMode

The `FillMode` controls whether the TelerikAvatar has background or is just outlined. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` (default value) |`solid`|
|`Outline`|`outline`|

>tip This setting is applicable when the `AvatarType` is set to `Text` or `Icon`. With the `Image` type, the provided image takes all the available space in the Avatar.

>caption The built-in Fill modes

<demo metaUrl="client/avatar/appearance/fill-mode/" height="250"></demo>

## ThemeColor

The color of the Avatar is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Avatar.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` (default value) |`base`|
|`Primary`|`primary`|
|`Secondary`|`secondary`|
|`Tertiary`|`tertiary`|

>caption Built-in Avatar ThemeColors

<demo metaUrl="client/avatar/appearance/theme-color/" height="250"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Explore the Avatar types](slug:avatar-types)

## See Also

* [Live Demo: Avatar Appearance](https://demos.telerik.com/blazor-ui/avatar/appearance)