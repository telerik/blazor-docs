---
title: Appearance
page_title: AutoComplete Appearance
description: Appearance settings of the AutoComplete for Blazor.
slug: autocomplete-appearance
tags: telerik,blazor,autocomplete,appearance
published: True
position: 65
components: ["autocomplete"]
---

# Appearance Settings

You can control the appearance of the AutoComplete by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the AutoComplete by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/autocomplete/appearance/size/" height="300"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the AutoComplete to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/autocomplete/appearance/rounded/" height="300"></demo>

## FillMode

The `FillMode` controls how the TelerikAutoComplete is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.AutoComplete.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/autocomplete/appearance/fill-mode/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
