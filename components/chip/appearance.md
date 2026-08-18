---
title: Appearance
page_title: Chip - Appearance
description: Appearance settings of the Chip for Blazor.
slug: chip-appearance
tags: telerik,blazor,chip,appearance
published: True
position: 10
components: ["chip"]
---

# Chip Appearance

You can control the appearance of the Chip by using the following parameters:

* [`FillMode`](#fillmode)
* [`Rounded`](#rounded)
* [`Size`](#size)
* [`ThemeColor`](#themecolor)

## FillMode

The `FillMode` affects the presence of a background and borders. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/chip/appearance/fill-mode/" height="350"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the Chip to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.Rounded` class:

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/chip/appearance/rounded/" height="350"></demo>

## Size

You can increase or decrease the size of the Chip by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.Chip.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/chip/appearance/size/" height="350"></demo>

## ThemeColor

The `ThemeColor` parameter applies a predefined text color and background color. Use a member of the `Telerik.Blazor.ThemeConstants.Chip.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` <br /> default value |`base`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|

>caption The built-in ThemeColors

<demo metaUrl="client/chip/appearance/theme-color/" height="350"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle Chip events](slug:chip-events)

## See Also

* [Live Demo: Chip Appearance](https://demos.telerik.com/blazor-ui/chip/appearance)
