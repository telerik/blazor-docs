---
title: Tile
page_title: Map Layers - Tile
description: Discover the Blazor Map Tile Layer and explore the examples.
slug: components/map/layers/tile
tags: telerik,blazor,map,layers,tile
published: True
position: 3
components: ["map"]
---
# Tile Layer

The tile layer works by rendering images that display the actual map. These images are requested from third-party services that conform to the [Tile Map Service standard](https://en.wikipedia.org/wiki/Tile_Map_Service) and support the [WGS 84 projection standards](https://en.wikipedia.org/wiki/World_Geodetic_System). 

The built-in configuration options of the `MapLayer` allow you to set an URL template via the `UrlTemplate` property that will access the service and provide the needed images.

>tip Licenses and Official Author rights to the Tile Layer Images are determined by the used Web Map Service. The **Telerik Map** only provides an UI control that allows you to setup and place a map in an application, built via Blazor techniques. You need to provide proper attribution with the correct copyright notice and, if needed, establish an account with the map owner to ensure unlimited/fast access.

**To configure a Map Layer of type Tile:**

1. Add the `TelerikMap` tag.
2. Set the `Type` parameter of the `MapLayer` to `Tile`.
3. Set the `Attribution` and `Subdomains` parameters.
4. Provide the `UrlTemplate` property.

The following example demonstrates how to configure the Map Tile Layer.

>caption The Map Tile Layer configuration.

````RAZOR
<TelerikMap Center="@MapCenter"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private double[] MapCenter { get; set; } = new double[] { 30.268107, -97.744821 };

    public readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    public const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

}
````

@[template](/_contentTemplates/map/general.md#urltemplate-csp)
