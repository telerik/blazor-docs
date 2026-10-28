---
title: Appearance
page_title: DatePicker Appearance
description: Appearance settings of the DatePicker for Blazor.
slug: datepicker-appearance
tags: telerik,blazor,datepicker,appearance
published: True
position: 35
components: ["datepicker"]
---

# Appearance Settings

You can control the appearance of the DatePicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the DatePicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.DatePicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/datepicker/appearance/size-3/" height="420"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the DatePicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DatePicker.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/datepicker/appearance/rounded-2/" height="420"></demo>

## FillMode

The `FillMode` controls how the TelerikDatePicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DatePicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/datepicker/appearance/fill-mode-1/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: DatePicker - Appearance](https://demos.telerik.com/blazor-ui/datepicker/appearance)
