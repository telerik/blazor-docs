---
title: Appearance
page_title: ColorPicker Appearance
description: Appearance settings of the ColorPicker for Blazor.
slug: colorpicker-appearance
tags: telerik,blazor,colorpicker,appearance
published: True
position: 65
components: ["colorpicker"]
---

# Appearance Settings

You can control the appearance of the ColorPicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the ColorPicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/colorpicker/appearance/size/" height="250"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the ColorPicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/colorpicker/appearance/rounded/" height="250"></demo>

## FillMode

The `FillMode` controls how the TelerikColorPicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ColorPicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/colorpicker/appearance/fill-mode/" height="250"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
