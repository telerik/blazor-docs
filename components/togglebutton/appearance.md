---
title: Appearance
page_title: ToggleButton Appearance
description: Appearance settings of the ToggleButton for Blazor.
slug: togglebutton-appearance
tags: telerik,blazor,button,toggle,togglebutton,appearance
published: True
position: 35
components: ["togglebutton"]
---

# Appearance Settings

You can control the appearance of the toggle button by setting the following attributes:

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## FillMode

The `FillMode` toggles the background and border of the TelerikToggleButton. You can set the parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|
|`Link`|`link`|
|`Clear`|`clear`|

>caption The built-in Fill modes

<demo metaUrl="client/togglebutton/appearance/example-1/" height="420"></demo>

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the button to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/togglebutton/appearance/example-2/" height="420"></demo>

## Size

You can increase or decrease the size of the button by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`   |`md`|
| `Large`   |`lg`|

>caption The built-in button sizes

<demo metaUrl="client/togglebutton/appearance/example-3/" height="420"></demo>

## ThemeColor

The color of the button is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.ThemeColor` class:

| Class members | Manual declarations |
|------------|--------|
|`Base` <br /> default value |`base`|
|`Primary`|`primary`|
|`Secondary`|`secondary`|
|`Tertiary`|`tertiary`|
|`Info`|`info`|
|`Success`|`success`|
|`Warning`|`warning`|
|`Error`|`error`|
|`Dark`|`dark`|
|`Light`|`light`|
|`Inverse`|`inverse`|


>caption The built-in ThemeColors

<demo metaUrl="client/togglebutton/appearance/example-4/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
