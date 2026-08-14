---
title: Appearance
page_title: DropDownList Appearance
description: Appearance settings of the DropDownList for Blazor.
slug: dropdownlist-appearance
tags: telerik,blazor,dropdownlist,appearance
published: True
position: 65
components: ["dropdownlist"]
---

# Appearance Settings

You can control the appearance of the DropDownList by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the DropDownList by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.DropDownList.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/dropdownlist/appearance/size/" height="300"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the DropDownList to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DropDownList.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/dropdownlist/appearance/rounded/" height="300"></demo>

## FillMode

The `FillMode` controls how the TelerikDropDownList is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DropDownList.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/dropdownlist/appearance/fill-mode/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Blazor DropDownList](slug:components/dropdownlist/overview)