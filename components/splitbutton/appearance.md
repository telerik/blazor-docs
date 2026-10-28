---
title: Appearance
page_title: SplitButton Appearance
description: Apperance settings for the SplitButton for Blazor.
slug: splitbutton-appearance
tags: telerik,blazor,splitbutton,appearance,styling
published: True
position: 10
components: ["splitbutton"]
---

# SplitButton Appearance

This article describes the declarative settings of the SplitButton component, which affect its styling and appearance.

The SplitButton provides the same appearance parameters, as the regular [Button component](slug:button-appearance):

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)


## Setting Parameter Values

The examples in this article use **reflection** to show all possible values of the SplitButton parameters. In a real-world scenario, there are two options to set the desired parameter values:

* Use the static class members in the `ThemeConstants.SplitButton` namespace. This is the easier and recommended approach.
* Set the actual string values directly.

The following two configurations will produce the same result.

>caption Two ways to set SplitButton appearance parameters

<demo metaUrl="client/splitbutton/appearance/example-5/" height="420"></demo>


## FillMode

The `FillMode` parameter controls if the SplitButton will have a background and borders. The setting also affects the component's hover state. To set the parameter value, use the `string` members of the static class `ThemeConstants.SplitButton.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |
| `Link` | `"link"` |

>caption SplitButton FillMode example

<demo metaUrl="client/splitbutton/appearance/example-4/" height="420"></demo>


## Rounded

The `Rounded` parameter affects the SplitButton `border-radius` CSS styles. To set the parameter value, use the `string` members of the static class `ThemeConstants.SplitButton.Rounded`.

| `Rounded` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |
| `Full` | `"full"` |

>caption SplitButton Rounded example

<demo metaUrl="client/splitbutton/appearance/example-3/" height="420"></demo>

## Size

The `Size` parameter can change some SplitButton dimensions, such as height, margins or paddings. Possible values are the `string` members of the static class `ThemeConstants.SplitButton.Size`.

| `Size` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |

>caption SplitButton Size example

<demo metaUrl="client/splitbutton/appearance/example-2/" height="420"></demo>


## ThemeColor

The `ThemeColor` parameter sets the SplitButton's background and text color from a set of predefined options. Use the `string` members of the static class `ThemeConstants.SplitButton.ThemeColor`.

| `ThemeColor` Class Member | String Value |
| --- | --- |
| `Base` (default) | `"base"` |
| `Primary` | `"primary"` |
| `Secondary` | `"secondary"` |
| `Tertiary` | `"tertiary"` |
| `Info` | `"info"` |
| `Success` | `"success"` |
| `Warning` | `"warning"` |
| `Error` | `"error"` |
| `Inverse` | `"inverse"` |

>caption SplitButton ThemeColor example

<demo metaUrl="client/splitbutton/appearance/example-1/" height="550"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle SplitButton Events](slug:splitbutton-events)
* [Add SplitButton Icons](slug:splitbutton-icons)


## See Also

* [Live Demo: SplitButton Appearance](https://demos.telerik.com/blazor-ui/splitbutton/appearance)
* [SplitButton API](slug:Telerik.Blazor.Components.TelerikSplitButton)
