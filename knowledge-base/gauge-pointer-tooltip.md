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
            <td>
                ArcGauge for Blazor,<br />
                CircularGauge for Blazor,<br />
                LinearGauge for Blazor,<br />
                RadialGauge for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

How can I add a Tooltip to the Blazor Arc or Radial Gauge? I want to show a Tooltip when the user hovers over the pointer of the Radial Gauge or the Arc Gauge.


## Solution

To add a Tooltip for the pointer of the Gauge:

1. Set the [`Color` of the Gauge Pointer](slug://arc-gauge-pointers#color).
1. Declare an instance of `TelerikTooltip` ([Telerik UI for Blazor Tooltip])(slug://tooltip-overview).
1. Set the [`TargetSelector`](slug://tooltip-overview#tooltip-parameters) of the Tooltip to a specific path element within the SVG rendered by the Gauge. Use the specified pointer color in the selector.

The example below demonstrates how to add a Tooltip to the Arc Gauge. The same approach applies to all other Gauge types.

>caption Tooltip in Arc Gauge

````RAZOR
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
