---
title: Marker
page_title: Map Layers - Marker
description: Learn more about the Marker layer of the Telerik UI for Blazor Map component and explore the available examples.
slug: components/map/layers/marker
tags: telerikui, blazor, map, layers, marker
published: True
position: 5
---

# Marker Layer

The marker functionality allows you to add points to the Map. These points are defined by the geographical position in the map and can show useful information to the user in a tooltip.

Sections in this article:

* [Creating the Marker layer](#creating-the-marker-map-layer)
* [Customizing the Marker appearance](#customizing-the-marker-appearance)
* [Defining the Marker shapes](#defining-the-marker-shapes)
* [Setting the Marker tooltip](#setting-the-marker-tooltip)

## Creating the Marker Map Layer

To configure a Map layer of the Marker type:

1. Add the `TelerikMap` tag to the Map.
2. Set the `Type` parameter of the `MapLayer` to `Marker`.
3. Set the `Data` parameter.
4. Set the `LocationField` and `TitleField` parameters.
5. (Optional) Provide the [tooltip settings](#marker-tooltip-settings) and choose the [Marker shape](#marker-shapes).

The following example demonstrates how to configure the Marker layer of the Map.

>caption The Marker Map layer configuration.

````CSHTML
@* This code snippet showcases an example of a Marker layer configuration. *@

<TelerikMap Center="@Center" Zoom="3">
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

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>()
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
        public string Title { get; set; }
    }
}
````

## Customizing the Marker Appearance

To customize the marker appearance, set the string `Template` parameter in the corresponding `MapLayerMarkerSettings` inner tag of the marker.

The general syntax of the Marker template is based on the [Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview).

>caption Custom markers.

````CSHTML
@* This code snippet showcases an example of customizing the Marker appearance. *@

<TelerikMap Center="@Center"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
                  <MapLayerMarkerSettings Template="<span class='custom-marker-class'>#= dataItem.Title #</span>">
                  </MapLayerMarkerSettings>
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
                  <MapLayerMarkerSettings Template="#= dataItem.LatLng #">
                  </MapLayerMarkerSettings>
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        },
    };

    public List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>()
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
        public string Title { get; set; }
    }
}

<style>
    .custom-marker-class {
        background-image: url(https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png);
        background-color: palegoldenrod;
        color: blue;
        background-size: 9px;
        width: 62px;
        background-repeat: no-repeat;
        display: inline-table;
        font-size: 14px;
        padding-top: 5px;
    }
</style>
````

## Defining the Marker Shapes

The Map supports the `Pin` and `PinTarget` Marker types. To define the Marker type, use the `Shape` parameter of the `MapLayer` tag. By default, the visual appearance of the Marker is `PinTarget`.

>caption Different Marker shapes.

````CSHTML
@* This code snippet showcases an example of the different Marker shapes. *@

<TelerikMap Center="@Center" Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)" Shape="MapMarkersShape.Pin">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData2"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)" Shape="MapMarkersShape.PinTarget">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>()
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
        public string Title { get; set; }
    }
}
````

## Setting the Marker Tooltip

The `MapLayerMarkerSettingsTooltip` tag allows you to fine-tune the content, appearance, and options of the tooltip, as well as fully customize its HTML content.

>caption Marker tooltip template.

````CSHTML
@* This code snippet showcases an example of the Marker tooltip settings. *@

<TelerikMap Center="@Center"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
                  <MapLayerMarkerSettings>
                      <MapLayerMarkerSettingsTooltip>
                          <Template>
                              @{
                                  var dataItem = context.DataItem as MarkerModel;
                              }

                              <div>marker for: @dataItem.Title</div>
                          </Template>
                      </MapLayerMarkerSettingsTooltip>
                  </MapLayerMarkerSettings>
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

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>()
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
        public string Title { get; set; }
    }
}
````
