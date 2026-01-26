---
title: Appearance
page_title: Button Appearance
description: Appearance settings of the Button for Blazor.
slug: button-appearance
tags: telerik,blazor,button,appearance
published: True
position: 35
components: ["button"]
---
# Appearance Settings

The Telerik Button component for Blazor provides several ways to control its appearance. This article discusses the following component parameters:

* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)
* [ThemeColor](#themecolor)

You can use all of them together to achieve the desired appearance.

## FillMode

The `FillMode` parameter changes or removes the background and border of the Button. Set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.Button.FillMode`. When setting the `FillMode` parameter value inline, start with an `@` character, otherwise the predefined string constant cannot be resolved.

| FillMode Class Member | Actual String Value |
| --- | --- |
| `Solid` | `solid` (default) |
| `Flat` | `flat` |
| `Outline` | `outline` |
| `Link` | `link` |
| `Clear` | `clear` |

>caption Built-in Button FillMode Values

````RAZOR
<TelerikButton FillMode="@ThemeConstants.Button.FillMode.Clear">Clear</TelerikButton>
<TelerikButton FillMode="@ThemeConstants.Button.FillMode.Flat">Flat</TelerikButton>
<TelerikButton FillMode="@ThemeConstants.Button.FillMode.Link">Link</TelerikButton>
<TelerikButton FillMode="@ThemeConstants.Button.FillMode.Outline">Outline</TelerikButton>
<TelerikButton FillMode="@ThemeConstants.Button.FillMode.Solid">Solid (Default)</TelerikButton>
````

## Rounded

The `Rounded` parameter applies a `border-radius` CSS style to the Button to curve the corners. Set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.Button.Rounded`. When setting the `Rounded` parameter value inline, start with a `@` character, otherwise the predefined string constant cannot be resolved.

| Rounded Class Member | Actual Value |
| --- | --- |
| `Small` | `sm` |
| `Medium` | `md` (default) |
| `Large` | `lg` |
| `Full` | `full` |

>caption Built-in Button Rounded Values

````RAZOR
<TelerikButton Rounded="@ThemeConstants.Button.Rounded.Full">Full</TelerikButton>
<TelerikButton Rounded="@ThemeConstants.Button.Rounded.Large">Large</TelerikButton>
<TelerikButton Rounded="@ThemeConstants.Button.Rounded.Medium">Medium (Default)</TelerikButton>
<TelerikButton Rounded="@ThemeConstants.Button.Rounded.Small">Small</TelerikButton>
````

## Size

The `Size` parameter affects the Button dimensions, paddings, and font size. Set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.Button.Size`. When setting the `Size` parameter value inline, start with a `@` character, otherwise the predefined string constant cannot be resolved.

| Size Class Member | Actual Value |
| --- | --- |
| `Small` | `sm` |
| `Medium` | `md` (default) |
| `Large` | `lg` |

>caption Built-in Button Size Values

````RAZOR
<TelerikButton Size="@ThemeConstants.Button.Size.Large">Large</TelerikButton>
<TelerikButton Size="@ThemeConstants.Button.Size.Medium">Medium (Default)</TelerikButton>
<TelerikButton Size="@ThemeConstants.Button.Size.Small">Small</TelerikButton>
````

## ThemeColor

The `ThemeColor` parameter controls the Button background, text, and border color. Set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.Button.ThemeColor`. When setting the `ThemeColor` parameter value inline, start with a `@` character, otherwise the predefined string constant cannot be resolved.

| ThemeColor Class Member | Actual String Value |
| --- | --- |
| `Base` | `base` (default) |
| `Primary` | `primary` |
| `Secondary` | `secondary` |
| `Tertiary` | `tertiary` |
| `Info` | `info` |
| `Success` | `success` |
| `Warning` | `warning` |
| `Error` | `error` |
| `Dark` | `dark` |
| `Light` | `light` |
| `Inverse` | `inverse` |


>caption Built-in Button ThemeColor Values

````RAZOR
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Base">Base (Default)</TelerikButton>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Primary</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary">Secondary</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Tertiary">Tertiary</TelerikButton>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Info">Info</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success">Success</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Warning">Warning</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Error">Error</TelerikButton>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Dark">Dark</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Light">Light</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Inverse">Inverse</TelerikButton>
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
