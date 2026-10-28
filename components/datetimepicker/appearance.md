---
title: Appearance
page_title: DateTimePicker Appearance
description: Appearance settings of the DateTimePicker for Blazor.
slug: datetimepicker-appearance
tags: telerik,blazor,datetimepicker,appearance
published: True
position: 35
components: ["datetimepicker"]
---

# Appearance Settings

You can control the appearance of the DateTimePicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the DateTimePicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.DateTimePicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/datetimepicker/appearance/size-3/" height="670"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the DateTimePicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateTimePicker.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/datetimepicker/appearance/rounded-2/" height="670"></demo>

## FillMode

The `FillMode` controls how the TelerikDateTimePicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateTimePicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/datetimepicker/appearance/fill-mode-1/" height="670"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: DateTimePicker - Appearance](https://demos.telerik.com/blazor-ui/datetimepicker/appearance)
