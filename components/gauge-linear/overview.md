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

The Telerik Linear Gauge for Blazor represents numerical values on a [scale]({%slug linear-gauge-scale%}) of ranges in a linear format.

This article is separated in the following sections: 

* [Basics](#basics)

* [Features](#features)

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

## Methods

The Linear Gauge reference exposes the `Refresh` method which allows you to programatically re-render the component. 

>caption Get a component reference and use the Refresh method

````CSHTML
@* Change the Height of the component *@

<TelerikButton OnClick="@ChangeTheHeight">Change the Height of the component</TelerikButton>

<TelerikLinearGauge @ref="@LinearGaugeRef" Height="@Height">
    <LinearGaugePointers>
        <LinearGaugePointer Value="10"/>

        <LinearGaugePointer Value="20" />

        <LinearGaugePointer Value="30" />
        
    </LinearGaugePointers>
</TelerikLinearGauge>

@code {
    Telerik.Blazor.Components.TelerikLinearGauge LinearGaugeRef { get; set; }

    public string Height { get; set; } = "300px";

    private void ChangeTheHeight()
    {
        Height = "450px";

        LinearGaugeRef.Refresh();
    }
}
````

## See Also

* [Linear Gauge: Live Demo](https://demos.telerik.com/blazor-ui/linear-gauge)
* [Linear Gauge: Scale]({%slug linear-gauge-scale%})
* [Linear Gauge: Pointers]({%slug linear-gauge-pointers%})