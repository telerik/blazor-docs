---
title: Appearance
page_title: DateRangePicker Appearance
description: Appearance settings of the DateRangePicker for Blazor.
slug: daterangepicker-appearance
tags: telerik,blazor,DateRangePicker,appearance
published: True
position: 35
components: ["daterangepicker"]
---

# Appearance Settings

You can control the appearance of the DateRangePicker by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the DateRangePicker by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/daterangepicker/appearance/size-3/" height="420"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the DateRangePicker to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/daterangepicker/appearance/rounded-2/" height="420"></demo>

## FillMode

The `FillMode` controls how the TelerikDateRangePicker is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.DateRangePicker.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/daterangepicker/appearance/fill-mode-1/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: DateRangePicker - Appearance](https://demos.telerik.com/blazor-ui/daterangepicker/appearance)
