---
title: Adding a Center Label in the RadialGauge
description: This article demonstrates how to add and center a label on the RadialGauge component in a Blazor application.
type: how-to
page_title: How to Center a Label on a RadialGauge in Blazor Applications
slug: radialgauge-center-label
tags: radialgauge, blazor, label, center, css, positioning
res_type: kb
ticketid: 1669777
components: ["radialgauge"]
---
## Environment

<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>RadialGauge for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description

How to add a centered label to the RadialGauge component?

## Solution

To add and center a label on the RadialGauge, wrap the RadialGauge inside a `div` element and use a `span` element for the label. Afterward, apply CSS styles to these elements for appropriate positioning.

````RAZOR
<div style="position: relative; width: 500px; height: 300px;">
    <TelerikRadialGauge>
        <RadialGaugeScales>
            <RadialGaugeScale>
                <RadialGaugeScaleRanges>
                    <RadialGaugeScaleRange From="10" To="20" Color="red"></RadialGaugeScaleRange>
                </RadialGaugeScaleRanges>
            </RadialGaugeScale>
        </RadialGaugeScales>
        <RadialGaugePointers>
            <RadialGaugePointer Value="20"></RadialGaugePointer>
        </RadialGaugePointers>
    </TelerikRadialGauge>

    <!-- Label centered under the Radial Gauge -->
    <div style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); text-align: center;">
        <span style="font-size: 16px; color: #333;">100 HRS</span>
    </div>
</div>
````

## See Also

- [Radial Gauge Overview](https://docs.telerik.com/blazor-ui/components/gauges/radial/overview)
