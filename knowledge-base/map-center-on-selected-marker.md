---
title: Center Map on Selected Marker
description: Learn how to programmatically center a Telerik Map for Blazor component on a marker selected from a list.
type: how-to
page_title: How to Center a Map on Marker in Blazor Applications
slug: map-kb-center-on-selected-marker
tags: blazor, map, marker
res_type: kb
ticketid: 1671734
components: ["map"]
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

There's a list of markers. I need to center the map on a marker when it's selected from the list. 

How can I dynamically update the center of a map based on a marker's coordinates?

## Solution

To center the map on a specific marker's coordinates, use a variable to bind the `Center` parameter of the `TelerikMap` component. Update this variable whenever a selection is made from the list. Here's how you can implement this:

1. Use a component like the `TelerikDropDownList` to display the list of markers. Handle the `OnChange` event to update the map's center.

2. In the `OnChange` event handler, update the map's `Center` property value to the coordinates of the selected marker.

>caption Centering the Map on a Selected Marker

````RAZOR
<TelerikDropDownList Data="@MarkerData"
                     @bind-Value="@SelectedValue"
                     TextField="@nameof(MarkerModel.Title)"
                     ValueField="@nameof(MarkerModel.Id)"
                     OnChange="@MyOnChangeHandler">
</TelerikDropDownList>

<TelerikMap Center="@MapCenter"
            Zoom="@MapZoom">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private double[] MapCenter { get; set; } = new double[] { 30.268107, -97.744821 };
    private int SelectedValue { get; set; }
    private int MapZoom { get; set; } = 3;

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private void MyOnChangeHandler(object theUserInput)
    {
        int selectedId = (int)theUserInput;
        MapCenter = MarkerData.First(i => i.Id == selectedId).LatLng;
    }

    private List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            Id = 0,
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        },
        new MarkerModel()
        {
            Id = 1,
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA"
        }
    };

    public class MarkerModel
    {
        public int Id { get; set; }
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
```

## See Also

- [Map Overview](https://docs.telerik.com/blazor-ui/components/map/overview)
- [Map Markers](https://docs.telerik.com/blazor-ui/components/map/layers/marker)
- [DropDownList Overview](https://docs.telerik.com/blazor-ui/components/dropdownlist/overview)
