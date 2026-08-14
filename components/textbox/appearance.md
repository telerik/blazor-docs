---
title: Appearance
page_title: TextBox Appearance
description: Appearance settings of the TextBox for Blazor.
slug: textbox-appearance
tags: telerik,blazor,button,textbox,appearance
published: True
position: 35
components: ["textbox"]
---

# Appearance Settings

You can control the appearance of the TextBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the TextBox by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.TextBox.Size` class. The `Size` parameter determines styles like `padding` and `font-size`, but is not related to the separate `Width` parameter.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption Built-in TextBox sizes

<demo metaUrl="client/textbox/appearance/size/" height="300"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the textbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextBox.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption Built-in values of the TextBox Rounded parameter

<demo metaUrl="client/textbox/appearance/rounded/" height="300"></demo>

## FillMode

The `FillMode` controls how the TelerikTextBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption Built-in TextBox fill modes

<demo metaUrl="client/textbox/appearance/fill-mode/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
