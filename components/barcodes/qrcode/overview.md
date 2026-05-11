---
title: Overview
page_title: QRCode Overview
description: Overview of the QRCode for Blazor.
slug: qrcode-overview
tags: telerik,blazor,barcode,qrcode,overview
published: True
position: 0
components: ["qrcode"]
---
# Blazor QRCode Overview

The <a href="https://www.telerik.com/blazor-ui/qr-code" target="_blank">Blazor QRCode component</a> generates **Canvas** and **SVG** images that represent Quick Response (QR) codes.

The generated image from the component is a machine-readable label that contains information about data for a locator, identifier, or tracker that points to a website or application.

## Creating Blazor QRCode

1. Use the `TelerikQRCode` tag to add the component to your Razor page.
1. Set the `Value` parameter, according to the [encoding recommendations](slug:qrcode-encoding).
1. (optional) Set the `Size` parameter, depending on the expected scanning distance and the required data capacity.
1. (optional) Set `Color`, `Background`, and define [`QRCodeBorder` settings](#qrcodeborder-parameters).
1. (optional) Define a center image in the [`QRCodeOverlay` settings](slug:qrcode-qr-code-types).

>caption Basic QRCode

````RAZOR
<TelerikQRCode Value="https://www.telerik.com/blazor-ui"
               Size="200px" />
````

>caption QRCode with additional settings

````RAZOR
<TelerikQRCode Background="white"
               Color="black"
               ErrorCorrection="@QRCodeErrorCorrectionLevel.M"
               Padding="10"
               RenderAs="@RenderingMode.SVG"
               Size="264px"
               Value="https://www.telerik.com/blazor-ui">
    <QRCodeOverlay Type="@QRCodeOverlayType.Swiss" Width="60" Height="60" />
    <QRCodeBorder Color="black" Width="2" />
</TelerikQRCode>
````

## Encoding

Encoding represents the mapping between messages and qr codes. [Read more about the supported Blazor QRCode Encodings](slug:qrcode-encoding).

## Types

The component exposes Swiss and Image QRCode types. [Read more about the supported Blazor QRCode Types...](slug:qrcode-qr-code-types)

## Methods

The QRCode methods are accessible through its reference.

* `Refresh` - redraws the component.

You can see the [example with the Barcode](slug:barcode-overview#methods) and use the `Refresh()` method in the same way with QRCode.

## QRCode Parameters

The Blazor Barcode provides various parameters that allow you to configure the component. Also see the [Telerik QRCode API reference](slug:telerik.blazor.components.telerikqrcode).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Background` | `string` | The background color of the QRCode. Accepts a valid CSS color string, including HEX and RGB. |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the QRCode component. |
| `Color` | `string` | Defines the color of the QRCode elements. The default color is black. |
| `Height` | `string` | Sets the height of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Height` should be set to `Width`. |
| `Padding` | `double` | Defines the minimum distance in pixels that should be left between the border and the QR modules. |
| `Encoding` | `QRCodeEncoding` `enum` | The encoding mode used to encode the value. |
| `ErrorCorrection` | `QRCodeErrorCorrectionLevel` `enum` | The error correction level used to encode the value. |
| `RenderAs` | `RenderingMode` enum <br /> `Svg` | Defines the preferred rendering mode&mdash;SVG or canvas. |
| `Size` | `string` | Specifies the size (`Width` and `Height`) of a QR code in pixels (i.e. "200px") as the QRCode is a square. You can read more about the dimension properties in the [Dimensions article](slug:common-features/dimensions). Setting both `Size` and `Width` or `Height` will throw an error. Setting different values to `Width` and `Height` will also cause an issue. To set an optimal `Size`, consider the expected scanning distance and data capacity. |
| `Value` | `string` | Defines the initial value of the QRCode. |
| `Width` | `string` | Sets the width of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Width` should be set to `Height`. |

### QRCodeOverlay parameters

The nested `QRCodeOverlay` tag exposes parameters that allow you to choose from predefined layouts or insert a custom image in the Blazor QRCode:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Type` | `QRCodeOverlayType` `enum` | The available options are `Image` and `Swiss`. When set to image, you have to specify the URL source of the image. |
| `ImageUrl` | `string` | The URL of the displayed overlay image. |
| `Width` | `double` | The width of the overlay in pixels. |
| `Height` | `double` | The height of the overlay in pixels. |

### QRCodeBorder parameters

The nested `QRCodeBorder` tag exposes parameters that enable you to customize the appearance of the Blazor QRCode border:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | The color of the border. Accepts a valid CSS color string, including HEX and RGB. |
| `Width` | `double` | The width of the border in pixels. The default value is `0` and the border is not visible. The QR Code border is part of the component `Size`. Thus, a wider border may require a larger `Size`. |

## Next Steps

* [Explore the QRCode Encodings](slug:qrcode-encoding)
* [Explore the QRCode Types](slug:qrcode-qr-code-types)

## See Also

* [Live Demo: QRCode](https://demos.telerik.com/blazor-ui/qrcode/overview)
* [Export QRCode to Image](slug:qrcode-barcode-chart-kb-export-to-image)
