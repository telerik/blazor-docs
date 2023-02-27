---
title: Overview
page_title: Map Layers
description: Discover the Blazor Map Layers and explore the examples.
slug: components/map/layers
tags: telerik,blazor,map,layers
published: True
position: 0
---

# Map Layers

The information that the Map renders is organized into layers. These layers are stacked from bottom to top in the order of definition and are oblivious to each other.

## Supported Layer Types

The layers in the Map are:

* [Tile]({%slug components/map/layers/tile%})
* [Marker]({%slug components/map/layers/marker%})
* [Shape]({%slug components/map/layers/shape%})
* [Bubble]({%slug components/map/layers/bubble%})

## MapLayers Parameters

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