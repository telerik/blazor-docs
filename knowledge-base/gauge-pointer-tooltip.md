---
title: Tooltip for the Gauge Pointer
description: How to show a Tooltip on hover of the Gauge Pointer?
type: how-to
page_title: Tooltip for the Gauge Pointer
slug: gauge-kb-pointer-tooltip
position: 
tags: gauge,tooltip,pointer,arc,circular,linear,radial
ticketid: 1535827
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Arc Gauge for Blazor,<br />
                Circular Gauge for Blazor,<br />
                Linear Gauge for Blazor,<br />
                Radial Gauge for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want to show a Tooltip when hovering the pointer of the Radial Gauge. How to achieve it? 

How to add a Tooltip to the Arc Gauge?

## Solution

To add a Tooltip for the pointer of the Gauge, do the following:

* Set the [`Color` of the Gauge Pointer]({%slug arc-gauge-pointers%}#color).
* Declare an instance of [`TelerikTooltip`]({%slug tooltip-overview%}).
* Set the [`TargetSelector`]({%slug tooltip-overview%}#tooltip-parameters) of the Tooltip to a specific path element within the SVG rendered by the Gauge. Use the specified pointer color in the selector.

The sample below demonstrates Tooltip in Arc Gauge but the approach applies to the other Gauge types as well.

````CSHTML
@*Tooltip in Arc Gauge*@

<TelerikArcGauge>
    <ArcGaugePointers>
        <ArcGaugePointer Color="#FFE162"
                         Value="@GaugeValue">
        </ArcGaugePointer>
    </ArcGaugePointers>
</TelerikArcGauge>

<TelerikTooltip TargetSelector="path[stroke='#FFE162']"
                Position="TooltipPosition.Top"
                ShowOn="@TooltipShowEvent.Hover"
                Id="first-pointer">
    <Template>
        <p>Value is: @GaugeValue</p>
    </Template>
</TelerikTooltip>

@code {
    private double GaugeValue { get; set; } = 40;
}
````
