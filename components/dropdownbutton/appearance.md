---
title: Appearance
page_title: DropDownButton - Appearance
description: Explore the appearance settings of the DropDownButton for Blazor. See the supproted built-in options for the primary button - fill mode, roundness, size and color.
slug: dropdownbutton-appearance
tags: telerik,blazor,dropdownbutton,appearance,styling
published: True
position: 10
components: ["dropdownbutton"]
---

# DropDownButton Appearance

This article describes the declarative settings of the DropDownButton component, which affect the styling and appearance of the primary button.

The DropDownButton provides the same appearance parameters as the regular [Button component](slug:button-appearance):

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)


## Setting Parameter Values

The examples in this article use reflection to show all possible values of the DropDownButton parameters. In a real-world scenario, you can use two options to set the desired parameter values:

* Use the static class members in the `ThemeConstants.DropDownButton` namespace. This is the easier and recommended approach.
* Set the actual string values directly.

The following two configurations will produce the same result.

>caption Two ways to set DropDownButton appearance parameters

<demo metaUrl="client/dropdownbutton/appearance/settings/" height="300"></demo>


## FillMode

The `FillMode` parameter controls if the primary button of the DropDownButton component will have a background and borders. The setting also affects the component's hover state. To set the parameter value, use the `string` members of the static class `ThemeConstants.DropDownButton.FillMode`.

| `FillMode` Class Member | String Value |
| --- | --- |
| `Solid` (default) | `"solid"` |
| `Flat` | `"flat"` |
| `Outline` | `"outline"` |
| `Link` | `"link"` |

>caption DropDownButton FillMode example

<demo metaUrl="client/dropdownbutton/appearance/fill-mode/" height="300"></demo>


## Rounded

The `Rounded` parameter affects the `border-radius` CSS styles of the DropDownButton's primary button. To set the parameter value, use the `string` members of the static class `ThemeConstants.DropDownButton.Rounded`.

| `Rounded` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |
| `Full` | `"full"` |

>caption DropDownButton Rounded example

<demo metaUrl="client/dropdownbutton/appearance/rounded/" height="300"></demo>

## Size

The `Size` parameter can change some dimensions of the DropDownButton's primary button, such as height, margins, or paddings. Possible values are the `string` members of the static class `ThemeConstants.DropDownButton.Size`.

| `Size` Class Member | String Value |
| --- | --- |
| `Small` | `"sm"` |
| `Medium` (default) | `"md"` |
| `Large` | `"lg"` |

>caption DropDownButton Size example

<demo metaUrl="client/dropdownbutton/appearance/size/" height="300"></demo>


## ThemeColor

The `ThemeColor` parameter sets the background and text color of the DropDownButton's primary button from a set of predefined options. Use the `string` members of the static class `ThemeConstants.DropDownButton.ThemeColor`.

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

>caption DropDownButton ThemeColor example

<demo metaUrl="client/dropdownbutton/appearance/theme-color/" height="300"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Handle DropDownButton Events](slug:dropdownbutton-events)
* [Add DropDownButton Icons](slug:dropdownbutton-icons)


## See Also

* [Live Demo: DropDownButton Appearance](https://demos.telerik.com/blazor-ui/dropdownbutton/appearance)
* [DropDownButton API](slug:Telerik.Blazor.Components.TelerikDropDownButton)
