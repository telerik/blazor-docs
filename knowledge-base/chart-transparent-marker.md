---
title: Transparent Filled Series Markers
description: how to make semi-transparent chart series markers with solid fill
type: how-to
page_title: Transparent Filled Series Markers
slug: chart-kb-transparent-marker
position: 
tags: 
ticketid: 1452809
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Charts for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want semi-transparent solid marks, not fully opaque rings for the chart series markers.


## Solution

Use the `ColorField` so that the markers can inherit a custom color from the data source of the chart, and add an `rgba` color there so it can have opacity.

To remove the blank (white) space at the core of the circle, triangle and square marker, increase the border width of the marker, so it becomes a solid color.

>caption Semi transparent markers in the chart that are solid (entirely filled with color)

````CSHTML
@* Compare the two green markers on the right hand side - one has opacity, the other does not *@

<TelerikChart Transitions="false">
    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Scatter"
                     Data="@Series1Data"
                     Name="APSK modulation"
                     XField="@nameof(ModelData.Strength)"
                     YField="@nameof(ModelData.Errors)"
                     ColorField="@nameof(ModelData.ItemColor)">
            <ChartSeriesMarkers Type="ChartSeriesMarkersType.Square">
                <ChartSeriesMarkersBorder Width="8"></ChartSeriesMarkersBorder> @* increase the size of the border so it hildes the hole *@
            </ChartSeriesMarkers>
        </ChartSeries>
    </ChartSeriesItems>
</TelerikChart>

@code {
    public class ModelData
    {
        public double Strength { get; set; }
        public double Errors { get; set; }
        public string ItemColor { get; set; }
    }

    public List<ModelData> Series1Data = new List<ModelData>()
    {
       new ModelData { Strength = -8, Errors = 5, ItemColor = "rgba(255, 0, 0, 0.3)"  }, //opacity in the color field
       new ModelData { Strength =  7, Errors = 3, ItemColor = "rgba(0, 255, 0, 0.3)"  },
       new ModelData { Strength = -6, Errors = 1, ItemColor = "rgba(0, 0, 255, 0.3)"  },
       new ModelData { Strength =  6, Errors = 3, ItemColor = "#0f0"  } // control item
    };
}
````
