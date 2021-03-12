---
title: Linear Gauge Overview
page_title: Linear Gauge Overview
description: Overview of the Linear Gauge for Blazor.
slug: linear-gauge-overview
tags: telerik,blazor,linear,gauge,overview
published: True
position: 0
---

# Linear Gauge Overview



This article is separated in the following sections: 

* [Basics](#basics)

* [Features](#features)

* [Linear Gauge Scale](#linear-gauge-scale)

* [Linear Gauge Pointer](#linear-gauce-pointer)

* [Methods](#methods)

## Basics

>caption To add a Telerik Linear Gauge for Blazor to your application:

1. Add the `<TelerikLinearGauge>` tag.
1. Add one or more instance of the `<LinearGaugePointer>` to the `<LinearGaugePointers>` collection.
1. Provide a `Value` for each `<LinearGaugePointer>`.

>caption Basic Telerik Linear Gauge for Blazor.

![Basic Linear Gauge](images/basic-linear-gauge.png)

````CSHTML
@* Setup a basic linear gauge *@

<TelerikLinearGauge>
    <LinearGaugePointers>
        <LinearGaugePointer Value="10" />

        <LinearGaugePointer Value="20" />

        <LinearGaugePointer Value="30" />
    </LinearGaugePointers>
</TelerikLinearGauge>
````

## Features

The Telerik Linear Gauge for Blazor exposes the following features:

* `Width` - `string` - controls the width of the component.

* `Height` - `string` - controls the height of the component.

* `Class` - renders a custom CSS class on the topmost wrapping element of the component. You can use that class to reposition the component on the page.

* Scale - See the [Scale]({%slug linear-gauge-scale%}) for more information on how to customize the scale of the component.

* Pointers - See the [Pointers]({%slug linear-gauge-pointers%}) for more information on how to customize the pointers of the component.

## Linear Gauge Scale

You can customize the scale of the component by using the `<LinearGaugeScale>` child tag of the `<TelerikLinearGauge>` and the parameters it exposes:

* `Max` - `double` - the maximum value rendered in the gauge scale.

* `Min` - `double` - the minimum value rendered in the gauge scale.

* `MajorUnit` - `double` - the interval between the major unit divisions.

* `MinorUnit` - `double` - the interval between the minor unit divisions.

* `Mirror` - `bool` - renders the labels and the unit divisions to the right of the scale. By default the labels and unit divisions are rendered to the left side of the scale.

* `Reverse` - `bool` - renders the scale so that the values increase from top to bottom.

## Linear Gauge Pointer

The linear gauge pointers are the main building blocks of the component. They represent the value points in the [scale](#linear-gauge-scale) of the component. 


## See Also

* [Linear Gauge: Scale]({%slug linear-gauge-scale%})
* [Linear Gauge: Pointers]({%slug linear-gauge-pointers%})