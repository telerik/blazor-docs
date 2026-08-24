---
title: Appearance
page_title: ComboBox Appearance
description: Appearance settings of the ComboBox for Blazor.
slug: combobox-appearance
tags: telerik,blazor,combobox,appearance
published: True
position: 65
components: ["combobox"]
---

# Appearance Settings

You can control the appearance of the ComboBox by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the ComboBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/combobox/appearance/size/" height="350"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the ComboBox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/combobox/appearance/rounded/" height="350"></demo>

## FillMode

The `FillMode` controls how the TelerikComboBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/combobox/appearance/fill-mode/" height="350"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
