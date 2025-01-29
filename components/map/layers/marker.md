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

The marker functionality allows you to add points of interest to the Map. These points are defined by the geographical position on the map and can show useful information to the user in a tooltip.

This article describes how to:

* [Create Marker layers](#creating-marker-layers)
* [Customize the Marker appearance](#customizing-marker-appearance)
* [Define Marker shapes](#defining-marker-shapes)
* [Set Marker tooltips](#setting-marker-tooltips)

## Creating Marker Layers

To define a Marker layer in the Map:

1. Add a `<MapLayer>` tag to `<MapLayers>`.
2. Set the `Type` parameter of the `MapLayer` to `MapLayersType.Marker`.
3. Set the `Data` parameter.
4. Set the `LocationField` and `TitleField` parameters to the respective property names of the model class.
5. (optional) Provide the [tooltip settings](#setting-marker-tooltips) or choose the [Marker shape](#defining-marker-shapes).

The following example demonstrates how to configure the Marker layer of the Map.

>caption The Marker Map layer configuration

````RAZOR
<TelerikMap Center="@MapCenter"
            Zoom="3">
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

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA"
        }
    };

    public class MarkerModel
    {
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
````

## Customizing Marker Appearance

To customize the marker appearance, set the `Template` parameter in the `<MapLayerMarkerSettings>` child tag of the corresponding `MapLayer`.

The `Template` parameter must point to the name of a JavaScript function, which is defined in the global scope. This function must return plain text or HTML markup as a string. The template function argument is a JavaScript object with properties that match the Marker layer's model class.

The following example uses two Marker layers with different templates. One renders custom HTML markup. The other one shows how to render the built-in Map marker with custom colors.

>caption Using Map marker template

<!-- REPL skipped due to https://github.com/telerik/blazor-repl/issues/323 -->
<div class="skip-repl"></div>

````RAZOR
<TelerikMap Center="@MapCenter"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="mapLayerUrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
            <MapLayerMarkerSettings Template="mapLayerMarkerTemplate" />
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData2"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
            <MapLayerMarkerSettings Template="mapLayerSvgMarkerTemplate" />
        </MapLayer>

    </MapLayers>
</TelerikMap>

@* Move the JavaScript code to a separate JS file. *@
<script suppress-error="BL9992">
    function mapLayerMarkerTemplate(context) {
        return `<span class="marker-star">${context.State}</span>`;
    }

    function mapLayerSvgMarkerTemplate(context) {
        return `<span style="color:${context.Color};" class="k-svg-icon k-icon-xxl" aria-hidden="true"><svg viewBox="0 0 512 512" focusable="false"><path d="M256 0C158.8 0 80 78.8 80 176s176 336 176 336 176-238.8 176-336S353.2 0 256 0m0 288c-61.9 0-112-50.1-112-112S194.1 64 256 64s112 50.1 112 112-50.1 112-112 112m48-112c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48"></path></svg></span>`;
    }

    function mapLayerUrlTemplate(context) {
        return `https://${context.subdomain}.tile.openstreetmap.org/${context.zoom}/${context.x}/${context.y}.png`;
    }
</script>

<style>
    .marker-star {
        background: palegoldenrod url(https://demos.telerik.com/kendo-ui/content/shared/icons/16/star.png) 0 center no-repeat;
        padding: .2em .2em .2em 20px;
    }
</style>

@code {
    private double[] MapCenter { get; set; } = new double[] { 30.268107, -97.744821 };

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin",
            State = "TX"
        }
    };

    private List<MarkerModel> MarkerData2 { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco",
            State = "CA",
            Color = "orange"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 36.188110, -115.176468 },
            Title = "Las Vegas",
            State = "NV"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 40.7166638, -74.0 },
            Title = "New York",
            State = "NY",
            Color = "blue"
        }
    };

    public class MarkerModel
    {
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Color { get; set; } = "--kendo-color-primary";
    }
}
````

@[template](/_contentTemplates/map/general.md#urltemplate-csp)

## Defining Marker Shapes

The Map supports the `Pin` and `PinTarget` Marker types. To define the Marker type, use the `Shape` parameter of the `MapLayer` tag. By default, the visual appearance of the Marker is `PinTarget`.

>caption Different Marker shapes

````RAZOR
<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupToggleButton Selected="@( MarkerShape == MapMarkersShape.PinTarget )"
                             OnClick="@( () => MarkerShape = MapMarkersShape.PinTarget )">
        Use Pin Target Markers
    </ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@( MarkerShape == MapMarkersShape.Pin )"
                             OnClick="@( () => MarkerShape = MapMarkersShape.Pin )">
        Use Pin Markers
    </ButtonGroupToggleButton>
</TelerikButtonGroup>

<TelerikMap Center="@MapCenter"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)"
                  Shape="@MarkerShape">
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private double[] MapCenter { get; set; } = new double[] { 30.268107, -97.744821 };

    private MapMarkersShape MarkerShape { get; set; } = MapMarkersShape.Pin;

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private const string LayerAttribution = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    public List<MarkerModel> MarkerData { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA"
        }
    };

    public class MarkerModel
    {
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
````

## Setting Marker Tooltips

The `MapLayerMarkerSettingsTooltip` tag allows you to fine-tune the content, appearance, and options of the tooltip, as well as fully customize its HTML content.

>caption Marker tooltip template

````RAZOR
<TelerikMap Center="@MapCenter"
            Zoom="3">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@LayerAttribution"
                  Subdomains="@LayerSubdomains"
                  UrlTemplate="@LayerUrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
            <MapLayerMarkerSettings>
                <MapLayerMarkerSettingsTooltip>
                    <Template>
                        @{ var dataItem = (MarkerModel)context.DataItem; }
                        <div>Marker Tooltip for: @dataItem.Title</div>
                    </Template>
                </MapLayerMarkerSettingsTooltip>
            </MapLayerMarkerSettings>
        </MapLayer>
    </MapLayers>
</TelerikMap>

@code {
    private double[] MapCenter { get; set; } = new double[] { 30.268107, -97.744821 };

    private readonly string[] LayerSubdomains = new string[] { "a", "b", "c" };
    private const string LayerUrlTemplate = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    private string LayerAttribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";

    private List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>() {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        },
        new MarkerModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Title = "San Francisco, CA"
        }
    };

    public class MarkerModel
    {
        public double[]? LatLng { get; set; }
        public string Title { get; set; } = string.Empty;
    }
}
````

## See Also

* [How to Change Map Marker Colors](slug://map-kb-change-marker-colors)
