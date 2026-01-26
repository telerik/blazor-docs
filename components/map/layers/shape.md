---
title: Shape
page_title: Map Layers - Shape
description: Discover the Blazor Map Shape Layer and explore the examples.
slug: components/map/layers/shape
tags: telerik,blazor,map,layers,shape
published: True
position: 7
components: ["map"]
---
# Shape Layer

The shape layer provides binding to **GeoJSON** data and renders the specified geospatial objects.

Telerik Map supports all **Geometry** and **Feature Objects**, as well as the **Geometry** and **Feature Collections** from the GeoJSON Specification (which could be found at https://geojson.org).

**To configure a Map Layer of type Shape:**

1. Add the `TelerikMap` tag.
2. Set the `Type` parameter of the `MapLayer` to `Shape`.
3. Set the `Data` parameter.
4. Add the `MapLayerShapeSettingsStyle` tag inside `MapLayerShapeSettings`.

The following example demonstrates how to configure the Map Shape Layer.

>caption The Map Shape Layer configuration.

````Component.razor
@* This code snippet showcases an example of a Shape Layer configuration. *@

<TelerikMap Center="@Center"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Shape"
                  Data="@WorldData">
            <MapLayerShapeSettings>
                <MapLayerShapeSettingsStyle>
                    <MapLayerShapeSettingsStyleFill Color="#0000ff" Opacity="0.5"></MapLayerShapeSettingsStyleFill>
                    <MapLayerShapeSettingsStyleStroke Color="#ffffff"></MapLayerShapeSettingsStyleStroke>
                </MapLayerShapeSettingsStyle>
            </MapLayerShapeSettings>
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };

    private string WorldData { get; set; }

    private List<MarkerModel> MarkerData1 { get; set; }

    protected override async Task OnInitializedAsync()
    {
        WorldData = await new HttpClient().GetStringAsync("https://raw.githubusercontent.com/telerik/blazor-ui/master/map/world-data.json");

        MarkerData1 = new List<MarkerModel>(){
            new MarkerModel()
            {
                LatLng = new double[] { 30.268107, -97.744821 },
                Title = "Austin, TX"
            }
        };
    }

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; }
    }
}
````
