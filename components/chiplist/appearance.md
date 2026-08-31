---
title: Appearance
page_title: ChipList - Appearance
description: Appearance settings of the ChipList for Blazor.
slug: chiplist-appearance
tags: telerik,blazor,chiplist,appearance
published: True
position: 35
components: ["chiplist"]
---

# ChipList Appearance Settings

You can control the appearance of the chips in the ChipList by setting the following parameters:

* [`FillMode`](#fillmode)
* [`Rounded`](#rounded)
* [`Size`](#size)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

Also see how to set [`ThemeColor`](slug:chip-appearance#themecolor) and [`FillMode`](slug:chip-appearance#fillmode) separately for each [chip in the ChipList](slug:chiplist-bound).

## FillMode

The `FillMode` controls how all the chips are filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.FillMode` class:

| Class members | Manual declarations |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Outline`|`outline`|

You can also set `FillMode` separately for each chip in the ChipList through a [property of the data item](slug:chiplist-bound).

>caption Using ChipList FillMode

<demo metaUrl="client/chiplist/appearance/fill-mode/" height="350"></demo>

## Rounded

The `Rounded` parameter applies the `border-radius` CSS rule to the chip to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Chip.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium` <br /> default value |`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption Using ChipList Rounded

<demo metaUrl="client/chiplist/appearance/rounded/" height="350"></demo>

## Size

You can increase or decrease the size of the chips by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Chip.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium` <br /> default value  |`md`|
| `Large`   |`lg`|

>caption Using ChipList Size

<demo metaUrl="client/chiplist/appearance/size/" height="350"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Set ThemeColor for each chip in the ChipList](slug:chiplist-bound)
