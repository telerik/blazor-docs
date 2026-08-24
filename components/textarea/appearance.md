---
title: Appearance
page_title: TextArea Appearance
description: Appearance settings of the TextArea for Blazor.
slug: TextArea-appearance
tags: telerik,blazor,button,TextArea,appearance
published: True
position: 35
components: ["textarea"]
---

# Appearance Settings

You can control the appearance of the TextArea button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the TextArea by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.TextArea.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/textarea/appearance/size/" height="300"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the TextArea to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextArea.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/textarea/appearance/rounded/" height="300"></demo>

## FillMode

The `FillMode` controls how the TelerikTextArea is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TextArea.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/textarea/appearance/fill-mode/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
