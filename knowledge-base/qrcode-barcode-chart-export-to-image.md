---
title: Export QRCode, Barcode, Chart or Diagram to Image
description: Learn how to convert and export a Telerik Blazor QRCode, Barcode, Chart, or Diagram to an image and send it to the .NET runtime.
type: how-to
page_title: How to Export Telerik QRCode, Barcode, Chart, or Diagram to Image
slug: qrcode-barcode-chart-kb-export-to-image
tags: telerik, blazor, qrcode, barcode, chart, diagram
ticketid: 1572189, 1588186, 1667798, 1697494, 1697884
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                QRCode for Blazor, <br />
                Barcode for Blazor, <br />
                Chart for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB answers the following questions:

* How to export a generated QRCode to a PNG or JPG image for saving on the server or download?
* How to create an image from the Telerik QRCode for Blazor?
* How to convert a Barcode, Chart, or QRCode from SVG to an image?
* How to save a Barcode or QRCode as an image?
* How to export a Diagram to a PNG file?

## Solution

Use `JSInterop` and JavaScript APIs to convert the Telerik component to a Base64 string and send it to the server.

When using the `Canvas` `RenderingMode` of the Telerik component (Barcode, Chart, QRCode), use the [`toDataURL`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) method of the `canvas` HTML element to obtain a Base64 data URI for the image.

When using the `SVG` rendering mode:

1. Use an [`XMLSerializer`](https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer) to create an image [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
1. Create a `canvas` element and [get its 2D context](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext).
1. [Draw the image](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) into the `canvas` element.
1. Use the [`toDataURL`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) method of the `canvas` HTML element to obtain a Base64 data URI for the image.

> When using a Blazor app with **Server** render mode, make sure to [increase the SignalR max message size](slug:common-kb-increase-signalr-max-message-size), otherwise the Base64 data URI may not reach the .NET runtime.

> The following examples demonstrates JavaScript APIs, which are not subject to Telerik technical support.

### Export BarCode, Chart and QRCode

>caption Export QRCode, BarCode, or Chart to PNG Image

````RAZOR
@inject IJSRuntime js

<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupToggleButton Selected="@(RenderingMode == RenderingMode.SVG)"
                             OnClick="@( () => ToggleRenderingMode(RenderingMode.SVG) )">
        Use SVG
    </ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@(RenderingMode == RenderingMode.Canvas)"
                             OnClick="@( () => ToggleRenderingMode(RenderingMode.Canvas) )">
        Use Canvas
    </ButtonGroupToggleButton>
</TelerikButtonGroup>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
               OnClick="@OnExportButtonClick">Export to PNG</TelerikButton>

<div style="display: flex; gap: 2em;">
    <div style="flex: 1 33%;">
        <h3>@RenderingMode QR Code</h3>
        <TelerikQRCode RenderAs="@RenderingMode"
                       Size="240px"
                       Value="https://docs.telerik.com/blazor-ui/introduction"
                       Class="exportable-qrcode">
        </TelerikQRCode>

        @if (!string.IsNullOrEmpty(QrImageDataUrl))
        {
            <h3>QR Code PNG</h3>
            <img src="@QrImageDataUrl" style="width: 240px;" alt="PNG from QR Code" />
        }

    </div>
    <div style="flex: 1 66%;">
        <h3>@RenderingMode Chart</h3>
        <TelerikChart RenderAs="@RenderingMode"
                      Height="240px"
                      Class="exportable-chart">
            <ChartSeriesItems>
                <ChartSeries Type="ChartSeriesType.Column"
                             Data="@SeriesData1"
                             Field="@nameof(ChartModel.Revenue)"
                             CategoryField="@nameof(ChartModel.TimePeriod)"
                             Name="Product 1">
                </ChartSeries>
                <ChartSeries Type="ChartSeriesType.Line"
                             Data="@SeriesData2"
                             Field="@nameof(ChartModel.Revenue)"
                             CategoryField="@nameof(ChartModel.TimePeriod)"
                             Name="Product 2">
                </ChartSeries>
            </ChartSeriesItems>

            <ChartCategoryAxes>
                <ChartCategoryAxis Type="@ChartCategoryAxisType.Date"></ChartCategoryAxis>
            </ChartCategoryAxes>

            <ChartValueAxes>
                <ChartValueAxis Max="1000" />
            </ChartValueAxes>

            <ChartTitle Text="Chart"></ChartTitle>

            <ChartLegend Position="ChartLegendPosition.Bottom">
            </ChartLegend>
        </TelerikChart>
        @if (!string.IsNullOrEmpty(ChartImageDataUrl))
        {
            <h3>Chart PNG</h3>
            <img src="@ChartImageDataUrl" style="width: 100%;" alt="PNG from Chart" />
        }
    </div>
</div>

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    function getImageFromCanvas(selector) {
        const canvas = document.querySelector(`${selector} canvas`);
        if (canvas) {
            return canvas.toDataURL("image/png");
        }
    }

    function getImageFromSvg(selector) {
        const dpr = window.devicePixelRatio;

        const svg = document.querySelector(`${selector} svg`);
        if (!svg) {
            return;
        }

        const svgBox = svg.getBBox();
        const svgW = svgBox.width;
        const svgH = svgBox.height;

        const svgData = (new XMLSerializer()).serializeToString(svg);
        const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8"
        });
        const blobUrl = URL.createObjectURL(svgBlob);

        return getBlobImage(blobUrl, svgW, svgH).then((img) => {
            const canvas = document.createElement("canvas");
            canvas.width = svgW * dpr;
            canvas.height = svgH * dpr;

            const context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.drawImage(img, 0, 0, svgW * dpr, svgH * dpr);

            URL.revokeObjectURL(blobUrl);
            img.parentElement.removeChild(img);

            return canvas.toDataURL("image/png");
        });
    }

    function getBlobImage(blobUrl, imageWidth, imageHeight) {
        return new Promise(function(resolve) {
            const img = new Image();

            img.addEventListener("load", () => {
                setTimeout( () => resolve(img) );
            });

            img.style.cssText = "visibility:hidden;position:absolute;top:0;left:0;";
            img.width = imageWidth;
            img.height = imageHeight;
            document.body.appendChild(img);

            img.src = blobUrl;
        });
    }
</script>

@code {
    private RenderingMode RenderingMode { get; set; } = RenderingMode.SVG;

    private string QrImageDataUrl { get; set; } = string.Empty;
    private string ChartImageDataUrl { get; set; } = string.Empty;

    private List<ChartModel> SeriesData1 { get; set; } = new();
    private List<ChartModel> SeriesData2 { get; set; } = new();

    private async Task OnExportButtonClick()
    {
        string jsFunctionName = RenderingMode == RenderingMode.SVG ? "getImageFromSvg" : "getImageFromCanvas";

        QrImageDataUrl = await js.InvokeAsync<string>(jsFunctionName, ".exportable-qrcode");
        ChartImageDataUrl = await js.InvokeAsync<string>(jsFunctionName, ".exportable-chart");
    }

    private void ToggleRenderingMode(RenderingMode newMode)
    {
        RenderingMode = newMode;

        QrImageDataUrl = ChartImageDataUrl = string.Empty;
    }

    #region Data Generation

    protected override async Task OnInitializedAsync()
    {
        var now = DateTime.Today;
        var monthsBack = 6;

        for (int i = 1; i <= monthsBack; i++)
        {
            var dateTimeValue = now.AddMonths(-monthsBack + i);

            SeriesData1.Add(new ChartModel()
            {
                Id = i,
                Product = "Product 1",
                Revenue = Random.Shared.Next(1, 900),
                TimePeriod = dateTimeValue
            });

            SeriesData2.Add(new ChartModel()
            {
                Id = i,
                Product = "Product 2",
                Revenue = Random.Shared.Next(1, 900),
                TimePeriod = dateTimeValue
            });
        }

        await base.OnInitializedAsync();
    }

    public class ChartModel
    {
        public int Id { get; set; }
        public string Product { get; set; } = string.Empty;
        public DateTime TimePeriod { get; set; }
        public decimal Revenue { get; set; }
    }

    #endregion Data Generation
}
````

### Export Diagram

The required approach with a Telerik Blazor Diagram is the same as described above, with one exception. The `getBlobImage` JavaScript function must receive the exact Diagram width and height, instead of `svgBox.width` and `svgBox.height`. This is because the Diagram supports panning and the `svgBox` is larger than the visible component dimensions. Using `svgBox.width` and `svgBox.height` may result in a clipped PNG image.

>caption Export Diagram to PNG Image

````RAZOR
@inject IJSRuntime js

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Success"
               OnClick="@OnDiagramExportButtonClick">Export Diagram to PNG</TelerikButton>

<TelerikDiagram Width="@( $"{DiagramWidth}px" )" Height="@( $"{DiagramHeight}px" )" Zoom="0.8" Class="exportable-diagram">
    <DiagramConnectionDefaults Type="@DiagramConnectionType.Cascading" />
    <DiagramLayout Type="@DiagramLayoutType.Tree" />
    <DiagramShapeDefaults Type="@DiagramShapeType.Rectangle" />

    <DiagramShapes>
        <DiagramShape Id="shape1">
            <DiagramShapeContent Text="Shape 1" />
        </DiagramShape>
        <DiagramShape Id="shape2">
            <DiagramShapeContent Text="Shape 2" />
        </DiagramShape>
        <DiagramShape Id="shape3">
            <DiagramShapeContent Text="Shape 3" />
        </DiagramShape>
        <DiagramShape Id="shape4">
            <DiagramShapeContent Text="Shape 4" />
        </DiagramShape>
        <DiagramShape Id="shape5">
            <DiagramShapeContent Text="Shape 5" />
        </DiagramShape>
        <DiagramShape Id="shape6">
            <DiagramShapeContent Text="Shape 6" />
        </DiagramShape>
    </DiagramShapes>

    <DiagramConnections>
        <DiagramConnection FromId="shape1" ToId="shape2" />
        <DiagramConnection FromId="shape1" ToId="shape3" />
        <DiagramConnection FromId="shape2" ToId="shape4" />
        <DiagramConnection FromId="shape2" ToId="shape5" />
        <DiagramConnection FromId="shape3" ToId="shape6" />
    </DiagramConnections>
</TelerikDiagram>

@if (!string.IsNullOrEmpty(DiagramImageDataUrl))
{
    <h3>Diagram PNG</h3>
    <img src="@DiagramImageDataUrl" style="width: @(DiagramWidth)px; height: @(DiagramHeight)px;" alt="PNG from Diagram" />
}

@* Move JavaScript code to a separate JS file *@
<script suppress-error="BL9992">
    function getDiagramFromSvg(selector, diagramWidth, diagramHeight) {
        const dpr = window.devicePixelRatio;

        const svg = document.querySelector(`${selector} svg`);
        if (!svg) {
            return;
        }

        const svgBox = svg.getBBox();
        const svgW = diagramWidth; // svgBox.width
        const svgH = diagramHeight; // svgBox.height
        // Using svgBox.width and svgBox.height may result in a clipped image,
        // because the Diagram shapes can overflow their container.

        const svgData = (new XMLSerializer()).serializeToString(svg);
        const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8"
        });
        const blobUrl = URL.createObjectURL(svgBlob);

        return getBlobImage(blobUrl, svgW, svgH).then((img) => {
            const canvas = document.createElement("canvas");
            canvas.width = svgW * dpr;
            canvas.height = svgH * dpr;

            const context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
            context.drawImage(img, 0, 0, svgW * dpr, svgH * dpr);

            URL.revokeObjectURL(blobUrl);
            img.parentElement.removeChild(img);

            return canvas.toDataURL("image/png");
        });
    }

    function getBlobImage(blobUrl, imageWidth, imageHeight) {
        return new Promise(function(resolve) {
            const img = new Image();

            img.addEventListener("load", () => {
                setTimeout( () => resolve(img) );
            });

            img.style.cssText = "visibility:hidden;position:absolute;top:0;left:0;";
            img.width = imageWidth;
            img.height = imageHeight;
            document.body.appendChild(img);

            img.src = blobUrl;
        });
    }
//</script>

@code {
    private string DiagramImageDataUrl { get; set; } = string.Empty;

    private const int DiagramWidth = 480;
    private const int DiagramHeight = 400;

    private async Task OnDiagramExportButtonClick()
    {
        string jsFunctionName = "getDiagramFromSvg";

        DiagramImageDataUrl = await js.InvokeAsync<string>(jsFunctionName, ".exportable-diagram", DiagramWidth, DiagramHeight);
    }
}
````

## See Also

* [Barcode Overview](slug:barcode-overview)
* [Chart Overview](slug:components/chart/overview)
* [Diagram Overview](slug:diagram-overview)
* [QRCore Overview](slug:qrcode-overview)
