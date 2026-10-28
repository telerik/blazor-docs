---
title: Map Markers Are Misaligned
description: Resolve an issue where the markers in the Telerik Map for Blazor do not align with the GPS coordinates in the desired way.
type: troubleshooting
page_title: Fix Misaligned Map Markers in Telerik Map for Blazor
meta_title: Fix Misaligned Map Markers in Telerik Map for Blazor
slug: map-kb-markers-misaligned
tags: blazor, map, markers
res_type: kb
ticketid: 1719811
---

## Environment

<table>
    <tbody>
        <tr>
            <td> Product</td>
            <td>Map for UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When adding markers to a Telerik Map for Blazor, the markers appear misaligned at low (far) zoom levels. The misalignment makes it difficult to view the correct coordinates of the markers without zooming in very closely.

## Cause

The Map markers position and align their bottom-center with the specified GPS coordinates. Depending on the marker shape and the Map zoom level, this alignment can cause markers to appear at the wrong place on the Map.

## Solution

To align markers in a different way, apply CSS styles to shift their position. The following example demonstrates how to align markers vertically at their center by applying a `16px` top margin style to the default 32x32-pixel markers. The Map `center-markers` CSS class is optional and its goal is to limit the effect of the custom CSS code to specific Map instances. You can use `k-map` instead and target all Map instances.

````RAZOR
<TelerikToggleButton @bind-Selected="@CenterMarkers"
                     ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
    Center Marker
</TelerikToggleButton>

@if (CenterMarkers)
{
<style>
    .center-markers .k-marker {
        margin-top: 16px;
    }
</style>
}

<TelerikMap Center="@MapCenter"
            Height="85vh"
            Zoom="18"
            Class="center-markers">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@MapAttribution"
                  Subdomains="@MapSubdomains"
                  UrlTemplate="mapUrlTemplateFunction">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<script suppress-error="BL9992">
    function mapUrlTemplateFunction(context) {
        return `https://${context.subdomain}.tile.openstreetmap.org/${context.zoom}/${context.x}/${context.y}.png`;
    }
</script>

@code {
    private bool CenterMarkers { get; set; }
    private double[] MapCenter { get; set; } = new double[] { 4.592299705488907, -74.07203861561868 };

    private readonly string[] MapSubdomains = new string[] { "a", "b", "c" };
    private const string MapAttribution = "&copy; Map data from <a href='https://osm.org/copyright'>OpenStreetMap</a>";

    private List<MarkerModel> MarkerData { get; set; } = new() {
        new MarkerModel()
        {
            LatLng = new double[] { 4.592299705488907, -74.07203861561868 },
            Title = "Puente Mirador Muisca"
        }
    };

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
````

## See Also

* [Map Marker Layer](slug:components/map/layers/marker)
* [Map Overview](slug:components/map/overview)
