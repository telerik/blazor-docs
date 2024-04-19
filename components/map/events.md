---
title: Events
page_title: Map - Events
description: Discover the Blazor Map events and explore the examples.
slug: components/map/events
tags: telerik,blazor,map,events,event
published: true
position: 11
---

# Map Events

This article explains the available events for the Telerik Map for Blazor:

* [OnClick](#onclick)
* [OnMarkerClick](#onmarkerclick)
* [OnShapeClick](#onshapeclick)
* [OnZoomEnd](#onzoomend)
* [OnPanEnd](#onpanend)

## OnClick

The `OnClick` event fires when the user clicks on the map. Its `EventCallback<MapClickEventArgs>` gives:
* `MapClickEventArgs.EventArgs` - provides the native DOM event (browser event).
* `MapClickEventArgs.Location` - provides the location of the click on the map (`MapLocation` has `Latitude` and `Longitude` props).

>caption Handle OnClick.

````CSHTML
@* This code snippet showcases an example of how to handle the OnClick event. *@

<TelerikMap Center="@Center"
            Zoom="3"
            OnClick="@OnMapClick">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Bubble"
                  Data="@BubbleData"
                  LocationField="@nameof(BubbleModel.LatLng)"
                  ValueField="@nameof(BubbleModel.Revenue)">
            <MapLayerBubbleSettings>
                <MapLayerBubbleSettingsStyle>
                    <MapLayerBubbleSettingsStyleFill Color="#0000ff"></MapLayerBubbleSettingsStyleFill>
                    <MapLayerBubbleSettingsStyleStroke Color="#000000"></MapLayerBubbleSettingsStyleStroke>
                </MapLayerBubbleSettingsStyle>
            </MapLayerBubbleSettings>
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<strong>@EventResult</strong>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };
    public string EventResult { get; set; }

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<BubbleModel> BubbleData { get; set; } = new List<BubbleModel>()
    {
        new BubbleModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Revenue = 1000
        },
        new BubbleModel()
        {
            LatLng = new double[] { 41.8781, -87.6298 },
            Revenue = 200
        }
    };

    public void OnMapClick(MapClickEventArgs args)
    {
        var location = args.Location;
        var eventArgs = args.EventArgs as MouseEventArgs;

        LogToConsole(
            $"map click: location = [{location.Latitude}, {location.Longitude}]," +
            $"clientX = {eventArgs.ClientX}, clientY = {eventArgs.ClientY}");
    }

    public void LogToConsole(string text)
    {
        EventResult = text;
    }

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; }
    }

    public class BubbleModel
    {
        public double[] LatLng { get; set; }
        public int Revenue { get; set; }
    }
}
````

## OnMarkerClick

The `OnMarkerClick` event fires when the user clicks on a marker. Its `EventCallback<MapMarkerClickEventArgs>` gives:
* `MapMarkerClickEventArgs.DataItem` - provides the data item (object) of the bound marker.
* `MapMarkerClickEventArgs.EventArgs` - provides the native DOM event (browser event).

>caption Handle OnMarkerClick.

````CSHTML
@* This code snippet showcases an example of how to handle the OnMarkerClick event. *@

<TelerikMap Center="@Center"
            Zoom="3"
            OnMarkerClick="@OnMarkerClick">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Bubble"
                  Data="@BubbleData"
                  LocationField="@nameof(BubbleModel.LatLng)"
                  ValueField="@nameof(BubbleModel.Revenue)">
            <MapLayerBubbleSettings>
                <MapLayerBubbleSettingsStyle>
                    <MapLayerBubbleSettingsStyleFill Color="#0000ff"></MapLayerBubbleSettingsStyleFill>
                    <MapLayerBubbleSettingsStyleStroke Color="#000000"></MapLayerBubbleSettingsStyleStroke>
                </MapLayerBubbleSettingsStyle>
            </MapLayerBubbleSettings>
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<strong>@EventResult</strong>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };
    public string EventResult { get; set; }

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<BubbleModel> BubbleData { get; set; } = new List<BubbleModel>()
    {
        new BubbleModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Revenue = 1000
        },
        new BubbleModel()
        {
            LatLng = new double[] { 41.8781, -87.6298 },
            Revenue = 200
        }
    };

    public void OnMarkerClick(MapMarkerClickEventArgs args)
    {
        var dataItem = args.DataItem as MarkerModel;
        var eventArgs = args.EventArgs as MouseEventArgs;

        LogToConsole(
            $"marker click: title = {dataItem.Title}, location = [{string.Join(",", dataItem.LatLng)}]," +
            $"clientX = {eventArgs.ClientX}, clientY = {eventArgs.ClientY}");
    }

    public void LogToConsole(string text)
    {
        EventResult = text;
    }

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; }
    }

    public class BubbleModel
    {
        public double[] LatLng { get; set; }
        public int Revenue { get; set; }
    }
}
````

## OnShapeClick

The `OnShapeClick` event fires when the user clicks on a shape. Its `EventCallback<MapShapeClickEventArgs>` gives:
* `MapShapeClickEventArgs.DataItem` - provides the data item when the shape is coming from a bubble layer (null for shape layer).
* `MapShapeClickEventArgs.GeoJsonDataItem` - provides the data item in the form of GeoJSON (dictionary) when the layer is a shape layer (null for bubble layer).
* `MapShapeClickEventArgs.EventArgs` - provides the native DOM event (browser event).

>caption Handle OnShapeClick.

````CSHTML
@* This code snippet showcases an example of how to handle the OnShapeClick event. *@

<TelerikMap Center="@Center"
            Zoom="3"
            OnShapeClick="@OnShapeClick">
    <MapLayers>
        <MapLayer Type="@MapLayersType.Tile"
                  Attribution="@Attribution"
                  Subdomains="@Subdomains"
                  UrlTemplate="@UrlTemplate">
        </MapLayer>

        <MapLayer Type="@MapLayersType.Bubble"
                  Data="@BubbleData"
                  LocationField="@nameof(BubbleModel.LatLng)"
                  ValueField="@nameof(BubbleModel.Revenue)">
            <MapLayerBubbleSettings>
                <MapLayerBubbleSettingsStyle>
                    <MapLayerBubbleSettingsStyleFill Color="#0000ff"></MapLayerBubbleSettingsStyleFill>
                    <MapLayerBubbleSettingsStyleStroke Color="#000000"></MapLayerBubbleSettingsStyleStroke>
                </MapLayerBubbleSettingsStyle>
            </MapLayerBubbleSettings>
        </MapLayer>

        <MapLayer Type="@MapLayersType.Marker"
                  Data="@MarkerData1"
                  LocationField="@nameof(MarkerModel.LatLng)"
                  TitleField="@nameof(MarkerModel.Title)">
        </MapLayer>
    </MapLayers>
</TelerikMap>

<strong>@EventResult</strong>

@code {
    public string[] Subdomains { get; set; } = new string[] { "a", "b", "c" };
    public string UrlTemplate { get; set; } = "https://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png";
    public string Attribution { get; set; } = "&copy; <a href='https://osm.org/copyright'>OpenStreetMap contributors</a>";
    public double[] Center { get; set; } = new double[] { 30.268107, -97.744821 };
    public string EventResult { get; set; }

    public List<MarkerModel> MarkerData1 { get; set; } = new List<MarkerModel>()
    {
        new MarkerModel()
        {
            LatLng = new double[] { 30.268107, -97.744821 },
            Title = "Austin, TX"
        }
    };

    public List<BubbleModel> BubbleData { get; set; } = new List<BubbleModel>()
    {
        new BubbleModel()
        {
            LatLng = new double[] { 37.7749, -122.4194 },
            Revenue = 1000
        },
        new BubbleModel()
        {
            LatLng = new double[] { 41.8781, -87.6298 },
            Revenue = 200
        }
    };

    public void OnShapeClick(MapShapeClickEventArgs args)
    {
        var dataItem = args.DataItem as BubbleModel;
        var eventArgs = args.EventArgs as MouseEventArgs;

        LogToConsole(
            $"shape click: revenue = {dataItem.Revenue}, location = [{string.Join(",", dataItem.LatLng)}]," +
            $"clientX = {eventArgs.ClientX}, clientY = {eventArgs.ClientY}");
    }

    public void LogToConsole(string text)
    {
        EventResult = text;
    }

    public class MarkerModel
    {
        public double[] LatLng { get; set; }
        public string Title { get; set; }
    }

    public class BubbleModel
    {
        public double[] LatLng { get; set; }
        public int Revenue { get; set; }
    }
}
````

## OnZoomEnd 

The `OnZoomEnd` is an `EventCallback` that fires when the user clicks on a shape. The `OnZoomEnd` event handler receives a `MapZoomEndEventArgs` argument, which has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Zoom` | `double` | The new zoom level of the Map. |
| `Center` | `double[]` | The lat / lang of the Map's center. |
| `Extent` | `double[]` | The NW and SE lat / lang of the Map. |

>caption Handle OnZoomEnd.

````CSHTML

````

## OnPanEnd

The `OnPanEnd` event fires when the user clicks on a shape. The `OnPanEnd` event handler receives a `MapPanEndEventArgs` argument, which has the following properties:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
| ---------| ---- | ----------- |
| `Center` | `double[]` | The lat / lang of the Map's center. |
| `Extent` | `double[]` | The NW and SE lat / lang of the Map. |

>caption Handle OnPanEnd.

````CSHTML

````