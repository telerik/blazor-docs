---
title: Overview
page_title: Map Overview
description: Discover the Blazor Map and explore the examples.
slug: components/map/overview
tags: telerik,blazor,map,overview
published: True
position: 0
---

# Map Overview

The Map displays geospatial information organized in layers.

The component provides tile layers, shape (vector) layers, bubble layers, and marker layers.

## Creating Blazor Map

1. Use the `TelerikMap` tag to add the component to your razor page.

2. Add the `MapLayer` tag nested inside `MapLayers`.

3. Set the `Type` property.

4. Set the `Attribution` and `Subdomains` properties.

5. Provide the `UrlTemplate` property.

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

Tha layers are responsible for organizing the Map information. [Read more about the supported Blazor Map layers...]({%slug components/map/layers%})

## Markers

You can add different points with real coordinates on the map as markers. [Read more about the Blazor Map Markers...]({%slug components/map/layers/marker%})

## Pan and Zoom

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the Map. You can set the zoom level through the `Zoom` property. The zoom operation can be performed with a double click on the map or by using the mouse scroll wheel.

The end user can pan the control by simply holding the left mouse button and dragging the map to a desired location.

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

### MapLayers parameters

The following parameters enable you to customize the appearance of the Blazor Map Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Type` | `MapLayersType (enum)` | The type of the layer. |
| `Attribution` | `string` | The attribution for the layer. |
| `Subdomains` | `string[]` | A list of subdomains to use for loading tiles. Alternating between different subdomains allows more requests to be executed in parallel. |
| `UrlTemplate` | `string` | The URL template for tile layers. Template variables: x - X coordinate of the tile; y - Y coordinate of the tile; zoom - zoom level or subdomain - Subdomain for this tile. See subdomains. |
| `Shape` | `MapMarkersShape (enum)` | The marker shape for marker layers. |
| `Symbol` | `MapLayersSymbol (enum)` | The default symbol for bubble layers. |
| `ZIndex` | `double` | The zIndex for this layer. Layers are normally stacked in declaration order (last one is on top). |
| `ValueField` | `string` | The value field for bubble layer symbols. The data item field should be a number. |
| `Extent` | `double[]` | Specifies the extent of the region covered by this layer. The layer will be hidden when the specified area is out of view. Accepts a four-element array that specifies the extent covered by this layer: North-West latitude, longitude, South-East latitude, longitude. |
| `Data` | `object` | The data for the layer. |
| `LocationField` | `string` | The data item field which contains the marker (symbol) location. The field should be an array with two numbers - latitude and longitude in decimal degrees. |
| `TileSize` | `double` | The size of the image tile in pixels. |
| `TitleField` | `string` | The data item field which contains the marker title. |
| `MaxSize` | `double` | The maximum symbol size for bubble layer symbols. |
| `MinSize` | `double` | The minimum symbol size for bubble layer symbols. |
| `MaxZoom` | `double` | The maximum zoom level at which to show this layer. |
| `MinZoom` | `double` | The minimum zoom level at which to show this layer. |
| `Opacity` | `double` | The opacity for the layer. |

### MapLayersMarkerSettings parameters

The following parameters enable you to customize the appearance of the Blazor Map Marker Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Tooltip` | `object` | The configuration of the marker tooltip. |
| `Template` | `RenderFragment` | Specifies the tooltip template. |

### MapLayersBubbleSettingsStyleFill parameters

The following parameters enable you to customize the appearance of the Blazor Map Bubble Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | The default fill color for layer bubbles. Accepts a valid CSS color string, including hex and rgb. |
| `Opacity` | `double` | The default fill opacity (0 to 1) for layer bubbles. |

### MapLayersBubbleSettingsStyleStroke parameters

The following parameters enable you to customize the appearance of the Blazor Map Bubble Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | The default stroke color for layer bubbles. Accepts a valid CSS color string, including hex and rgb. |
| `Opacity` | `double` | The default fill opacity (0 to 1) for layer bubbles. |
| `DashType` | `DashType (enum)` | The default dash type for layer bubbles. |
| `Opacity` | `double` | The default stroke opacity (0 to 1) for layer bubbles. |
| `Width` | `double` | The default stroke width for layer bubbles. |

### MapLayersShapeSettingsStyleFill parameters

The following parameters enable you to customize the appearance of the Blazor Map Shape Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | The default fill color for layer shapes. Accepts a valid CSS color string, including hex and rgb. |
| `Opacity` | `double` | The fill opacity of the shape. |

### MapLayersShapeSettingsStyleStroke parameters

The following parameters enable you to customize the appearance of the Blazor Map Shape Layers:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | The stroke color of the shape. |
| `Opacity` | `double` | The default stroke opacity (0 to 1) for layer shapes. |
| `DashType` | `double` | The default dash type for layer shapes. The following dash types are supported: "dash" - a line consisting of dashes; "dashDot" - a line consisting of a repeating pattern of dash-dot; "dot" - a line consisting of dots; "longDash" - a line consisting of a repeating pattern of long-dash; "longDashDot" - a line consisting of a repeating pattern of long-dash-dot; "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot or "solid" - a solid line. |
| `Opacity` | `double` | The default stroke opacity (0 to 1) for layer bubbles. |
| `Width` | `double` | The default stroke width for layer shapes. |

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