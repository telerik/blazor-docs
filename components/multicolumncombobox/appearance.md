---
title: Appearance
page_title: MultiColumnComboBox Appearance
description: Appearance settings of the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-appearance
tags: telerik,blazor,multicolumncombobox,combobox,appearance
published: True
position: 40
components: ["multicolumncombobox"]
---

# Appearance Settings

You can control the appearance of the MultiColumnComboBox by setting the following attributes:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the MultiColumnComboBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/multicolumncombobox/appearance/example-1/" height="500"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the MultiColumnComboBox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/multicolumncombobox/appearance/example-2/" height="520"></demo>

## FillMode

The `FillMode` controls how the TelerikMultiColumnComboBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.ComboBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/multicolumncombobox/appearance/example-3/" height="500"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
