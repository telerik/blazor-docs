---
title: Pointers
page_title: Radial Gauge - Pointers
description: Radial Gauge for Blazor - Pointers.
slug: radial-gauge-pointers
tags: telerik,blazor,radial,gauge,pointers
published: True
position: 10
components: ["radialgauge"]
---

# Radial Gauge Pointers

The Pointers mark the values on the scale. They consist of pointer arrow (called just "pointer" for brevity) and a pointer cap - the circle that marks the pointer center. You can customize pointers and pointer caps through the parameters they expose:

* Pointer

    * [Pointer Color](#pointer-color)

    * [Pointer Length](#pointer-length)

* Pointer Cap

    * [Pointer Cap Color](#pointer-cap-color)

    * [Pointer Cap Size](#pointer-cap-size)

* [Notes](#notes)


## Pointer Color

The `Color` (`string`) parameter controls the color of the pointers. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the pointer.

<demo metaUrl="client/radialgauge/pointers/color-pointer-result-code-5/" height="420"></demo>

## Pointer Length

The `Length` (`string`) parameter controls the pointers length (in percent) that is based on the distance to the scale. The default length of 1 indicates that the pointer exactly reaches the scale. Accepts values between 0.1 and 1.5.

>caption Change the length of the pointers.

<demo metaUrl="client/radialgauge/pointers/length-pointers-result-code-4/" height="420"></demo>

## Pointer Cap Color

The `Color` (`string`) parameter controls the color of the pointer cap. It accepts **CSS**, **HEX** and **RGB** colors.

>caption Change the color of the pointer cap.

<demo metaUrl="client/radialgauge/pointers/color-pointer-cap-result-3/" height="420"></demo>

## Pointer Cap Size

The `Size` (`double`) parameter controls the size of the pointer cap in percentage according to the scale radius. (from 0 to 1). The default size is 0.05.

>caption Change the size of the pointer cap.

<demo metaUrl="client/radialgauge/pointers/size-pointer-cap-result-2/" height="420"></demo>


## Notes


### Pointer Order

The pointer caps are rendered as per the order they are declared in the markup - the last pointer will be rendered on top of the others regardless of its value. Therefore, you should consider that when operating with the pointer cap parameters in order for their values to be visible (for example if the first pointer cap has the same size as the last pointer cap, it will not be visible.)

>caption Change the sizes and colors of the pointer caps.

<demo metaUrl="client/radialgauge/pointers/sizes-colors-pointer-caps-1/" height="420"></demo>

## See Also

* [Live Demo: Radial Gauge](https://demos.telerik.com/blazor-ui/radialgauge/overview)
* [Live Demo: Radial Gauge - Multiple pointers](https://demos.telerik.com/blazor-ui/radialgauge/multiple-pointers)
* [Radial Gauge: Overview](slug:radial-gauge-overview)
* [Radial Gauge: Scale](slug:radial-gauge-scale)
* [Radial Gauge: Labels](slug:radial-gauge-labels)
* [Radial Gauge: Ranges](slug:radial-gauge-ranges)
