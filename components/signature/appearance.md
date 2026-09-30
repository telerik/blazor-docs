---
title: Appearance
page_title: Signature Appearance
description: Appearance settings of the Signature for Blazor.
slug: signature-appearance
tags: telerik,blazor,signature,appearance
published: True
position: 5
components: ["signature"]
---

# Signature Settings

You can control the appearance of the Signature component by using the following parameters:

* [BackgroundColor](#backgroundcolor)
* [Color](#color)
* [FillMode](#fillmode)
* [Rounded](#rounded)
* [Size](#size)

You can use all of them together to achieve the desired appearance. This article will explain their effect one by one.

## BackgroundColor

Use the `BackgroundColor` parameter to change the background color of the Blazor Signature. 

>caption Change the background color of the Signature

<demo metaUrl="client/signature/appearance/example-1/" height="520"></demo>

## Color

Use the `Color` parameter to change the color of the Signature's stroke. 

>caption Change the color of the stroke

<demo metaUrl="client/signature/appearance/example-2/" height="520"></demo>

## FillMode

The `FillMode` parameter controls how the TelerikSignature is filled. It takes a member of the `Telerik.Blazor.ThemeConstants.Signature.FillMode` static class:

| Class members | Manual declarations |
|------------|--------|
| `Solid` <br /> (`default value`) | `solid` |
| `Flat` | `flat` |
| `Outline` | `outline` |

<demo metaUrl="client/signature/appearance/example-3/" height="520"></demo>

## Rounded

The Rounded parameter applies the `border-radius` CSS style to the button to achieve curving of the edges. It takes a member of the `Telerik.Blazor.ThemeConstants.Signature.FillMode` static class:

| Class members | Manual declarations |
|------------|--------|
| `Small`  | `sm` |
| `Medium` <br /> (`default value`) | `md` |
| `Large` | `lg` |

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/signature/appearance/example-4/" height="520"></demo>


## Size

Use the `Size` parameter to apply the `min-height` CSS style to the `<div class="k-signature">` element. Set the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Signature.Size` static class:

| Class members | Manual declarations |
|------------|--------|
| `Small`  | `sm` |
| `Medium` <br /> (`default value`) | `md` |
| `Large` | `lg` |

>caption Set the Size parameter

<demo metaUrl="client/signature/appearance/example-5/" height="520"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Signature Overview](slug:signature-overview)
* [Live Demo: Signature Overview](https://demos.telerik.com/blazor-ui/signature/overview)
