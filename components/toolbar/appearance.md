---
title: Appearance
page_title: ToolBar Appearance
description: Appearance settings of the ToolBar for Blazor.
slug: toolbar-appearance
tags: telerik,blazor,toolbar,appearance
published: True
position: 35
components: ["toolbar"]
---

# Appearance Settings

This article outlines the available ToolBar parameters, which control its appearance.

## FillMode

The `FillMode` parameter controls if the ToolBar will have a background and borders. To set the parameter value, use the `string` members of the static class `ThemeConstants.ToolBar.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |

>caption The built-in fill modes

<demo metaUrl="client/toolbar/appearance/example-1/" height="520"></demo>

## Size

You can increase or decrease the size of the ToolBar by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.ToolBar.Size` class:

| Class members | Manual declarations |
|---------------|--------|
| `Small`   |`sm`|
| `Medium`<br /> default value   |`md`|
| `Large`   |`lg`| 

>caption The built-in sizes

<demo metaUrl="client/toolbar/appearance/example-2/" height="520"></demo>

## See Also

* [Live Demo: ToolBar Appearance](https://demos.telerik.com/blazor-ui/toolbar/appearance)
* [Vertical ToolBar](slug:toolbar-kb-vertical-orientation-display)
