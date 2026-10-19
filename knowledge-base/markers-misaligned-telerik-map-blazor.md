---
title: Markers Misaligned on Telerik Map in UI for Blazor
description: Resolve the issue of misaligned markers at certain zoom levels in the Telerik Map for UI for Blazor.
type: troubleshooting
page_title: Fix Marker Alignment in Telerik Map for Blazor
meta_title: Fix Marker Alignment in Telerik Map for Blazor
slug: markers-misaligned-telerik-map-blazor
tags: map, ui for blazor, markers, alignment, zoom, css
res_type: kb
ticketid: 1719811
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> 
Map for UI for Blazor 
</td>
</tr>
<tr>
<td> Version </td>
<td> 8.1.1 </td>
</tr>
</tbody>
</table>

## Description

When adding multiple markers to a [Map](https://docs.telerik.com/blazor-ui/components/map/overview) in UI for Blazor, the markers appear misaligned at normal (far) zoom levels. The misalignment makes it difficult to view the correct coordinates of the markers without zooming in very closely. This issue arises because the Map aligns the bottom-center of each marker to its GPS coordinates by default.

## Cause

The default alignment of the Map markers positions their bottom-center at the specified GPS coordinates. At far zoom levels, this alignment can cause markers to appear misaligned due to their size and spacing.

## Solution

To align markers differently, apply a CSS adjustment to shift their position. The following example demonstrates how to center markers vertically by applying a top margin to the default 32x32 pixel marker size.

1. Add a toggle button to control marker alignment.
2. Include a CSS rule that adjusts the marker alignment.
3. Update the `TelerikMap` component with the CSS class and other configurations.

### Example Code

```razor
<TelerikToggleButton @bind-Selected="@CenterMarkers">Center Marker</TelerikToggleButton>

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
    private const string MapAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 4.592299705488907, -74.07203861561868 },
            Title = "Zero zero"
        }
    };

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
```

This code applies a `margin-top` of `16px` to each marker, centering them vertically relative to their GPS coordinates.

## See Also

- [Map Overview Documentation](https://docs.telerik.com/blazor-ui/components/map/overview)
- [Marker Layer Documentation](https://docs.telerik.com/blazor-ui/components/map/layers/marker-layer)
