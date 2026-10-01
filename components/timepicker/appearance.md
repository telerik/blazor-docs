---
title: Appearance
page_title: TimePicker Appearance
description: Appearance settings of the TimePicker for Blazor.
slug: timepicker-appearance
tags: telerik,blazor,timepicker,appearance
published: True
position: 35
components: ["timepicker"]
---

# Appearance Settings

You can control the appearance of the TimePicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the TimePicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.TimePicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/timepicker/appearance/example-3/" height="420"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the TimePicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TimePicker.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/timepicker/appearance/example-2/" height="420"></demo>

## FillMode

The `FillMode` controls how the TelerikTimePicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.TimePicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/timepicker/appearance/example-1/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: TimePicker - Appearance](https://demos.telerik.com/blazor-ui/timepicker/appearance)
