---
title: How to Customize Map Marker Colors in Blazor Applications
description: Learn how to customize the appearance of map markers by setting and changing their colors in a Blazor application.
type: how-to
page_title: How to Customize Map Marker Colors in Blazor Applications
slug: map-kb-customize-marker-colors
tags: map, markers
res_type: kb
ticketid: 1675518
---

## Description

When integrating a [Map for Blazor](slug://components/map/layers), you might want to customize the appearance of your map markers to differentiate them or match your application's theme. This knowledge base article also answers the following questions:

- How can I set the color of a map marker in Blazor?
- How to change the color of specific map markers based on their titles?
- How to apply custom styles to map markers in a Blazor application?

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Map for Blazor</td>
        </tr>
    </tbody>
</table>

## Solution

To customize the color of map markers in a Blazor application, you can [override the default theme styles](slug://themes-override).

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

### Customizing Specific Markers

To change the color of specific markers, target them based on their titles using CSS. Check the runnable example below:

````RAZOR
<TelerikMap Center="@Center" Zoom="3" Class="my-map">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData2"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<style>
    .my-map .k-marker[title="San Francisco, CA"] {
        color: blue;
    }

    .my-map .k-marker[title="Austin, TX"] {
        color: green;
    }
</style>

@code {
    private string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    private string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    private double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    private List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    private List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA"
        }
    };

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; } = null!;
    }
}
````

## See Also

- [Override Theme Styles](slug://themes-override)
- [Map - Marker Layer](slug://components/map/layers/marker)
