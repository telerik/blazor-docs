---
title: Appearance
page_title: Calendar Appearance
description: Appearance settings of the Calendar for Blazor.
slug: calendar-appearance
tags: telerik,blazor,calendar,appearance
published: True
position: 30
components: ["calendar"]
---

# Appearance Settings

This article outlines the available Calendar parameters, which control its appearance.

## Size

You can increase or decrease the size of the Calendar by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.Calendar.Size` class:

| Class member | Manual declaration |
|---|---|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

This configuration affects the size of the whole Calendar and its inner elements - header, navigation buttons, cells. The elements' size, padding and font-size vary depending on the selected Calendar size.

>caption The built-in Calendar sizes

<demo metaUrl="client/calendar/appearance/" height="500"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Calendar - Appearance](https://demos.telerik.com/blazor-ui/calendar/appearance)
