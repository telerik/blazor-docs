---
title: Overview
page_title: Map Overview
description: Discover the Blazor Map and explore the examples.
slug: components/map/overview
tags: telerik,blazor,map,overview
published: True
position: 0
---

# Blazor Map Overview

The <a href="https://www.telerik.com/blazor-ui/map" target="_blank">Blazor Map component</a> displays geospatial information organized in layers.

The component provides [tile layers]({%slug components/map/layers/tile%}), [shape (vector) layers]({%slug components/map/layers/shape%}), [bubble layers]({%slug components/map/layers/bubble%}), and [marker layers]({%slug components/map/layers/marker%}).

## Creating Blazor Map

1. Use the `TelerikMap` tag to add the component to your razor page.

2. Add the `MapLayer` tag nested inside `MapLayers`.

3. Set the `Type` property.

4. Set the `Attribution` and `Subdomains` properties.

5. Provide the [`UrlTemplate` property]({%slug components/map/layers%}#maplayers-parameters).

>caption A basic configuration of the Telerik Map.

````CSHTML
@* This code snippet showcases an example of a basic Map configuration. *@

<TelerikMap>
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
}
````

## Layers

The layers are responsible for organizing the Map information. [Read more about the supported Blazor Map layers...]({%slug components/map/layers%})

## Markers

You can add different points with real coordinates on the map as markers. [Read more about the Blazor Map Markers...]({%slug components/map/layers/marker%})

## Pan and Zoom

The zoom operation can be performed with a double click on the map or by using the mouse scroll wheel. You can set the zoom level through the `Zoom` property.

The end user can pan the control by simply holding the left mouse button and dragging the map to a desired location.

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the Map.

Blazor Map also incorporates a navigation tool allowing the end to user to easily zoom, pan and change the current view. You can change the navigation tool position by using the `MapControlsNavigator.Position` enum.

## Events

The Blazor Map generates events that you can handle and further customize its behavior. [Read more about the Blazor Map events...]({%slug components/map/events%}).

## Methods

The Map methods are accessible through its reference.

* `Refresh` - redraws the component.

>caption Get a reference to the Map and use its methods.

````CSHTML
@* This code snippet showcases an example usage of the Refresh() method. *@

<TelerikButton OnClick="@( () => ChangeZoom() )">Change Size!</TelerikButton>
<br />
<br />

<TelerikMap @ref="MapRef" Zoom="@Zoom">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    TelerikMap MapRef { get; set; }

    public double Zoom { get; set; } = 4;

    public void ChangeZoom()
    {
        Zoom = 1;
        MapRef.Refresh();
    }

    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
}
````

## Parameters

The Blazor Map provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Center` | `double[]` | The map center. Coordinates are listed as [Latitude, Longitude]. |
| `MinZoom` | `double` | The minimum zoom level. Typical web maps use zoom levels from 0 (the whole world) to 19 (sub-meter features). |
| `MaxZoom` | `double` | The maximum zoom level. Typical web maps use zoom levels from 0 (the whole world) to 19 (sub-meter features). |
| `MinSize` | `double` | The size of the map in pixels at zoom level 0. |
| `Pannable` | `bool` | Controls whether the user can pan the map. |
| `WrapAround` | `bool` | Specifies whether the map should wrap around the east-west edges. |
| `Zoom` | `double` | The initial zoom level. Typical web maps use zoom levels from 0 (the whole world) to 19 (sub-meter features). The map size is derived from the zoom level and minScale options: size = (2 ^ zoom) * minSize. |
| `Zoomable` | `bool` | Controls whether the map zoom level can be changed by the user. |
| `Class` | `string` | Specifies the class of the main DOM element. |
| `Width` | `string` | Specifies the width of the main DOM element. |
| `Height` | `string` | Specifies the height of the main DOM element. |

### MapControls parameters

The following `MapControlsAttribution` parameters enable you to customize the appearance of the Blazor Map Controls:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Position` | `MapControlsPosition (enum)` | Specifies the position of the attribtion control. |

The following `MapControlsNavigator` parameters enable you to customize the appearance of the Blazor Map Controls:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Position` | `MapControlsPosition (enum)` | Specifies the position of the navigation control. |

The following `MapControlsZoom` parameters enable you to customize the appearance of the Blazor Map Controls:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Position` | `string` | Specifies the position of the zoom control. |

## Next Steps

[Configure the Tile Layer]({%slug components/map/layers/tile%})

[Using the Map Events]({%slug components/map/events%})

## See Also

  * [Live Demo: Map](https://demos.telerik.com/blazor-ui/map/overview)