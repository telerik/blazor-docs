---
title: Appearance
page_title: CheckBox Appearance
description: Appearance settings of the CheckBox for Blazor.
slug: checkbox-appearance
tags: telerik,blazor,button,checkbox,appearance
published: True
position: 35
---

# Appearance Settings

You can control the appearance of the CheckBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)


## Size

You can increase or decrease the size of the CheckBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.CheckBox.Size` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/checkbox/size/" height="420"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the checkbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.CheckBox.Rounded` class:

| Class member | Manual declaration |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/checkbox/rounded/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
