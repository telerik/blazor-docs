---
title: Use a Custom Image as a Map in the Map Component
description: Learn how to integrate a custom image with the Blazor Map component for displaying markers on static images, such as building layouts.
type: how-to
page_title: How to Use a Custom Image with Blazor Map for Marker Placement
slug: map-kb-custom-image
tags: blazor, map, markers
res_type: kb
ticketid: 1652767
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

This knowledge base article answers the following questions:

- How can I set a background image for the Blazor Map component?
- Is it possible to overlay markers on a static image in Blazor Map?
- Can I use a custom floor plan as a map in Blazor?

## Solution

The solution depends on whether you want to show a static Map or if you want to support panning and zooming functionalities. This knowledge base shows the first option:

* [Static Map](#static-map)
* [Pannable and Zoomable Map](#pannable-and-zoomable-map)

### Static Map

This method is ideal when using the Map in a static context without the need for dynamic panning and zooming. In this case, you may use CSS to target the wrapping element of the component and set your image as a background image.

>caption Use custom image as a map

````RAZOR
<style>
    .custom-map-image {
        background-image: url(https://d585tldpucybw.cloudfront.net/sfimages/default-source/productsimages/telerik-ui-for-blazor/blazor-header-ninja.svg?sfvrsn=41f12bb3_3);
        position: relative;
    }

        .custom-map-image .k-map-controls {
            display: none;
        }
</style>

<TelerikMap Class="custom-map-image" Zoomable="false" Pannable="false" Width="515px" Height="440px">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    public List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] {-15.014573802798589, -36.825833916664131 },
            Title = "Marker 1"
        },
        new MarkerModel()
        {
            LatLng = new double[] {28.85837817460806, 25.92807233333588 },
            Title = "Marker 2"
        }
    };

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; }
    }
}
````

### Pannable and Zoomable Map

If you want to support panning and zooming the custom image in the Map, you will need to mimic the default Map behavior targeting the [Tile layer](slug://components/map/layers/tile). For that purpose, divide your image into small separate pieces that build up the whole map image and serve them to the Map component as tiles compliant to the WGS 84 coordinate system.

## See Also

* [Map Overview](slug://components/map/overview)
* [Markers in Map for Blazor](slug://components/map/layers/marker)
* [Tile Layer in Map for Blazor](slug://components/map/layers/tile)
