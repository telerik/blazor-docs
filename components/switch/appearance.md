---
title: Appearance
page_title: Switch Appearance
description: Appearance settings of the Switch for Blazor.
slug: switch-appearance
tags: telerik,blazor,button,switch,appearance
published: True
position: 35
components: ["switch"]
---

# Appearance Settings

You can control the appearance of the Switch button by setting the following attribute:

* [Size](#size)
* [ThumbRounded](#thumbrounded)
* [TrackRounded](#trackrounded)


## Size

You can increase or decrease the size of the Switch by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.Switch.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/switch/appearance/size/" height="250"></demo>

## ThumbRounded

The `ThumbRounded` attribute applies the `border-radius` CSS rule to the thumb of the switch to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Switch.ThumbRounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the ThumbRounded attribute

<demo metaUrl="client/switch/appearance/thumb-rounded/" height="250"></demo>

## TrackRounded

The `TrackRounded` attribute applies the `border-radius` CSS rule to the track of the switch to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Switch.TrackRounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>tip To achieve the best possible layout you should match the values passed to the `ThumbRounded` and `TrackRounded` attributes. 

>caption The built-in values of the TrackRounded attribute

<demo metaUrl="client/switch/appearance/track-rounded/" height="250"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Change the Switch Background Color](slug:switch-kb-change-background-color)
