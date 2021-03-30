---
title: Overview
page_title: Radial Gauge Overview
description: Overview of the Radial Gauge for Blazor.
slug: radial-gauge-overview
tags: telerik,blazor,radial,gauge,overview
published: True
position: 0
---

# Radial Gauge Overview

The Telerik Radial Gauge for Blazor represents numerical values on a [scale]({%slug radial-gauge-scale%}) of ranges in a radial format.

#### This article is separated in the following sections: 

* [Basics](#basics)

* [Features](#features)

* [Methods](#methods)

## Basics

>caption To add a Telerik Radial Gauge for Blazor to your application:

1. Add the `<TelerikRadialGauge>` tag.

1. Add one or more instances of the `<RadialGaugePointer>` to the `<RadialGaugePointers>` collection.

1. Provide a `Value` for each `<RadialGaugePointer>`.

>caption Basic Telerik Radial Gauge for Blazor.

![Basic Radial Gauge](images/basic-radial-gauge.png)

````CSHTML
@* Setup a basic radial gauge *@

<TelerikRadialGauge>
    <RadialGaugePointers>
        <RadialGaugePointer Value="20">            
        </RadialGaugePointer>        
    </RadialGaugePointers>    
</TelerikRadialGauge>
````

## Features

The Telerik Radial Gauge for Blazor exposes the following features:

#### Radial Gauge Size

* `Width` - `string` - controls the width of the component. You can read more on how they work in the [Dimensions]({%slug common-features/dimensions%}) article.

* `Height` - `string` - controls the height of the component. You can read more on how they work in the [Dimensions]({%slug common-features/dimensions%}) article.

You can also set the Gauge size in percentage values so it occupies its container when it renderes. If the parent container size changes, you must call the gauge's `Refresh()` C# [method](#methods) after the DOM has been redrawn and the new container dimensions are rendered.

#### Other Features

* `Class` - renders a custom CSS class on the topmost wrapping element of the component. You can use that class to reposition the component on the page.

* [Scale]({%slug radial-gauge-scale%}) - The scale of the radial gauge renders the values of the [pointers]({%slug radial-gauge-pointers%}), different [ranges]({%slug radial-gauge-ranges%}) and [labels]({%slug radial-gauge-labels%}). 

* [Ranges]({%slug radial-gauge-ranges%}) - The ranges are used to visually distinguish particular values on the scale.

* [Labels]({%slug radial-gauge-labels%}) - The labels are rendered on the scale of the component to give information to the users.

* [Pointers]({%slug radial-gauge-pointers%}) - The pointers indicate the values on the scale of the component. 

## Methods

The Radial Gauge reference exposes the `Refresh` method which allows you to programatically re-render the component. 

>caption Get a component reference and use the Refresh method

````CSHTML
@* Change the Height of the component *@

<TelerikButton OnClick="@ChangeHeight">Change the height</TelerikButton>

<TelerikRadialGauge @ref="@RadialGaugeRef" Height="@Height">
    <RadialGaugePointers>
        <RadialGaugePointer Value="20">
        </RadialGaugePointer>
    </RadialGaugePointers>
</TelerikRadialGauge>

@code{
    Telerik.Blazor.Components.TelerikRadialGauge RadialGaugeRef { get; set; }

    public string Height { get; set; } = "200px";

    async Task ChangeHeight()
    {
        Height = "400px";

        //give time to the framework and browser to resize the actual DOM so the gauge can use the expected size
        await Task.Delay(30);

        RadialGaugeRef.Refresh();
    }
}
````

## See Also

* [Radial Gauge: Live Demo](https://demos.telerik.com/blazor-ui/radial-gauge)
* [Radial Gauge: Scale]({%slug radial-gauge-scale%})
* [Radial Gauge: Pointers]({%slug radial-gauge-pointers%})
* [Radial Gauge: Ranges]({%slug radial-gauge-ranges%})
* [Radial Gauge: Labels]({%slug radial-gauge-labels%})