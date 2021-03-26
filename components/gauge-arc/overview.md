---
title: Overview
page_title: Arc Gauge Overview
description: Overview of the Arc Gauge for Blazor.
slug: arc-gauge-overview
tags: telerik,blazor,arc,gauge,overview
published: True
position: 0
---

# Arc Gauge Overview

The Telerik Arc Gauge for Blazor represents [numerical values]({%slug arc-gauge-pointers%}) on an arc [scale]({%slug arc-gauge-scale%}).

#### This article is separated in the following sections: 

* [Basics](#basics)

* [Features](#features)

* [Methods](#methods)

## Basics

>caption To add a Telerik Arc Gauge for Blazor to your application:

1. Add the `<TelerikArcGauge>` tag.

1. Add an instance of the `<ArcGaugePointer>` to the `<ArcGaugePointers>` collection.

1. Provide a `Value` for the `<ArcGaugePointer>`.

>caption Basic Telerik Arc Gauge for Blazor.

![Basic Arc Gauge](images/basic-arc-gauge.png)

````CSHTML
@* Setup a basic arc gauge *@

<TelerikArcGauge>
    <ArcGaugePointers>
        <ArcGaugePointer Value="40" />
    </ArcGaugePointers>
</TelerikArcGauge>
````

## Features

The Telerik Arc Gauge for Blazor exposes the following features:

#### Arc Gauge Size

* `Width` - `string` - controls the width of the component. You can read more on how they work in the [Dimensions]({%slug common-features/dimensions%}) article.

* `Height` - `string` - controls the height of the component. You can read more on how they work in the [Dimensions]({%slug common-features/dimensions%}) article.

You can also set the Gauge size in percentage values so it occupies its container when it renderes. If the parent container size changes, you must call the gauge's `Refresh()` C# [method](#methods) after the DOM has been redrawn and the new container dimensions are rendered.

#### Other Feautres

* `Class` - renders a custom CSS class on the topmost wrapping element of the component. You can use that class to reposition the component on the page.

* Scale - The scale of the arc gauge renders the values of the [pointers]({%slug arc-gauge-pointers%}) and [labels]({%slug arc-gauge-labels%}). See the [Scale]({%slug arc-gauge-scale%}) article for more information on how to customize the scale of the component.

* Labels - The labels are rendered on the scale of the component to give information to the users. See the [Labels]({%slug arc-gauge-labels%}) article for more information on how to customize the labels on the scale of the component.

* Pointers - The pointers indicate the values on the scale of the component. See the [Pointers]({%slug arc-gauge-pointers%}) article for more information on how to customize the pointers of the component.

## Methods

The Arc Gauge reference exposes the `Refresh` method which allows you to programatically re-render the component. 

>caption Get a component reference and use the Refresh method

````CSHTML
@* Change the Width of the component *@

<TelerikButton OnClick="@ChangeTheHeight">Change the Height of the component</TelerikButton>

<TelerikButton OnClick="@ChangeTheHeight">Change the Width of the component</TelerikButton>

<TelerikArcGauge @ref="@ArcGaugeRef" Width="@Width">
    <ArcGaugePointers>

        <ArcGaugePointer Value="30" />

    </ArcGaugePointers>
</TelerikArcGauge>

@code {
    Telerik.Blazor.Components.TelerikArcGauge ArcGaugeRef { get; set; }

    public string Width { get; set; } = "300px";

    private void ChangeTheHeight()
    {
        Width = "450px";

        ArcGaugeRef.Refresh();
    }
}
````

## See Also

* [Arc Gauge: Live Demo](https://demos.telerik.com/blazor-ui/arc-gauge)
* [Arc Gauge: Scale]({%slug arc-gauge-scale%})
* [Arc Gauge: Pointers]({%slug arc-gauge-pointers%})