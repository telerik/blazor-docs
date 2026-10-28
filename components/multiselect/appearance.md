---
title: Appearance
page_title: MultiSelect Appearance
description: Appearance settings of the MultiSelect for Blazor.
slug: multiselect-appearance
tags: telerik,blazor,multiselect,appearance
published: True
position: 65
components: ["multiselect"]
---

# Appearance Settings

You can control the appearance of the MultiSelect by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the MultiSelect by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/multiselect/appearance/example-1/" height="420"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the MultiSelect to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/multiselect/appearance/example-2/" height="620"></demo>

## FillMode

The `FillMode` controls how the TelerikMultiSelect is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MultiSelect.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/multiselect/appearance/example-3/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
