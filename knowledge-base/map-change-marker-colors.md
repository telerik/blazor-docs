---
title: How to Change Map Markers Colors
description: Learn how to customize the appearance of map markers by setting and changing their colors in a Blazor application.
type: how-to
page_title: How to Change Map Markers Colors
slug: map-kb-change-marker-colors
tags: map, markers
res_type: kb
ticketid: 1675518
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Map for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When integrating a [Map for Blazor](slug:components/map/layers), you might want to customize the appearance of your map markers to differentiate them or match your application's theme. This knowledge base article also answers the following questions:

- How can I set the color of a map marker in Blazor?
- How to change the color of specific map markers based on their titles?
- How to apply custom styles to map markers in a Blazor application?

## Solution

To customize the color of map markers in a Blazor application, you can [override the default theme styles](slug:themes-override).

### Change the Color to All Map Markers

To change the color for all markers use the following CSS approach:

<div class="skip-repl"></div>
````RAZOR
<TelerikMap Class="my-map">
    <!-- Map configuration -->
</TelerikMap>

<style>
    .my-map.k-map .k-marker {
        color: blue;
    }
</style>
````

### Customize Specific Markers

To change the color of specific markers, target them based on their titles using CSS. Check the runnable example below:

````RAZOR
<TelerikMap Center="@Center" Zoom="3" Class="my-map">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<style>
/* The first line is for the default marker style. The second one is for the hover state. */
@foreach (MarkerModel marker in MarkerData)
{
    <text>
    .my-map .k-marker[title="@marker.Title"],
    .my-map .k-marker[data-title="@marker.Title"] {
        color: @marker.Color;
    }
    </text>
}
</style>

@code {
    private string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    private string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    private double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    private List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX",
            Color = "#008000"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA",
            Color = "#0000FF"
        }
    };

    public class MarkerModel
    {
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = null!;
        public string Color { get; set; } = null!;
    }
}
````

## See Also

- [Override Theme Styles](slug:themes-override)
- [Map - Marker Layer](slug:components/map/layers/marker)
