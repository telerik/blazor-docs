---
title: Overview
page_title: Map Overview
description: The Blazor maps are interactive web maps using the Blazor framework, which seamlessly integrate C# and NET.
slug: components/map/overview
tags: telerik,blazor,map,overview
published: True
position: 0
---

# Blazor Map Overview

The <a href="https://www.telerik.com/blazor-ui/map" target="_blank">Blazor Map component</a> displays geospatial information organized in layers. The component provides [tile layers](slug:components/map/layers/tile), [vector shape layers](slug:components/map/layers/shape), [bubble layers](slug:components/map/layers/bubble), and [marker layers](slug:components/map/layers/marker).

## Creating Blazor Map

1. Use the `TelerikMap` tag to add the component to a Razor file.
1. Add a `<MapLayer>` tag nested inside `<MapLayers>`. Set its `Type` to `MapLayersType.Tile`.
1. Set the [`UrlTemplate` parameter](slug:components/map/layers#maplayer-parameters) of the tile layer. Check the [required syntax that complies with Content Security Policy](#content-security-policy).
1. (optional) Set the Map `Attribution` and `Subdomains` parameters, depending on the specific tile provider.

>caption Basic Telerik Map for Blazor

````RAZOR
<TelerikMap>
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private string LayerUrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
}
````

## Layers

The layers are responsible for organizing the Map information. [Read more about the supported Blazor Map layers...](slug:components/map/layers)

## Markers

You can add different points with real coordinates on the map as markers. [Read more about the Blazor Map Markers...](slug:components/map/layers/marker)

## Pan and Zoom

The zoom operation can be performed with a double click on the map or by using the mouse scroll wheel. You can set the zoom level through the `Zoom` property.

The end user can pan the control by simply holding the left mouse button and dragging the map to a desired location.

Raster maps are divided into images (tiles) for serving over the web. Tiles are typically 256px squares. The top level (zoom level 0) displays the whole world as a single tile. Each progressive zoom level doubles the size of the Map.

Blazor Map also incorporates a navigation tool allowing the end user to easily zoom, pan and change the current view. You can change the navigation tool position by using the `MapControlsNavigator.Position` enum.

## Events

The Blazor Map generates events that you can handle and further customize its behavior. [Read more about the Blazor Map events...](slug:components/map/events).

## Content Security Policy

The Map renders with the help of a JavaScript-based rendering engine. This engine uses a templating mechanism that supports two kinds of syntax:

* [Legacy inline syntax](#creating-blazor-map). In this case, the template parameter is a string that consumes dynamic values <a href="https://docs.telerik.com/kendo-ui/framework/templates/essentials" target="_blank">through `#= ... #` expressions</a>, for example, `UrlTemplate="https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png"`;
* JavaScript functions that obtain dynamic values from the function arguments, for example, `UrlTemplate="jsFunctionName"`. This feature was introduced in version **4.5.0** of Telerik UI for Blazor.

Both syntax options provide the same capabilities. The legacy inline syntax depends on JavaScript code evaluation, which is not [compliant with strict Content Security Policy (CSP)](slug:troubleshooting-csp). The function-based approach is CSP-compliant and can be more readable and convenient in complex scenarios.

>caption CSP-compliant Map

````RAZOR
<TelerikMap>
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="urlTemplateFunction">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@* Move the JavaScript to a separate JS file. *@
<script suppress-error="BL9992" nonce="BL9992">//
    function urlTemplateFunction(context) {
        return `https://${context.subdomain}.tile.openstreetmap.org/${context.zoom}/${context.x}/${context.y}.png`;
    }
//</script>

@code {
    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
}
````

## Map Parameters

The Blazor Map provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
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
| --- | --- | --- |
| `Position` | `MapControlsPosition (enum)` | Specifies the position of the attribtion control. |

The following `MapControlsNavigator` parameters enable you to customize the appearance of the Blazor Map Controls:

| Parameter | Type | Description |
| --- | --- | --- |
| `Position` | `MapControlsPosition (enum)` | Specifies the position of the navigation control. |

The following `MapControlsZoom` parameters enable you to customize the appearance of the Blazor Map Controls:

| Parameter | Type | Description |
| --- | --- | --- |
| `Position` | `string` | Specifies the position of the zoom control. |

## Map Reference and Methods

The Map exposes a `Refresh` method. Use it to redraw the component after making programmatic changes that do not apply automatically.

>caption Get the Map reference and use its methods

````RAZOR
<TelerikButton OnClick="@ChangeMapZoom">Change Map Zoom</TelerikButton>

<TelerikMap @ref="MapRef"
            Zoom="@MapZoom">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private TelerikMap? MapRef { get; set; }

    private double MapZoom { get; set; } = 4;

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private void ChangeMapZoom()
    {
        MapZoom = 1;

        MapRef?.Refresh();
    }
}
````

## Next Steps

* [Configure Map Layers](slug:components/map/layers)
* [Handle Map Events](slug:components/map/events)

## See Also

* [Live Demo: Map](https://demos.telerik.com/blazor-ui/map/overview)
