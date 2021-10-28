---
title: Overview
page_title: QRCode Overview
description: Overview of the QRCode for Blazor.
slug: qrcode-overview
tags: telerik,blazor,barcode,qrcode,overview
published: True
position: 0
---

# QRCode Overview

The QRCode generates **Canvas** and **SVG** images that represent Quick Response (QR) codes.

The generated image from the component is a machine-readable label that contains information about data for a locator, identifier, or tracker that points to a website or application.

## Basics

To add a Telerik QRCode to your Blazor app:

1. Add the `TelerikQRCode` tag.
1. Provide `Value` property
1. Set its `Size`
1. Optionally, choose a `QRCode Type` (one of the [types we support]({%slug  qrcode-qr-code-types%})).

The following example demonstrates how to set up the QRCode with its default configuration.

>caption A basic configuration of the Telerik QRCode

````CSHTML
@* This code snippet showcases an example of basic a QRCode configuration. *@

<TelerikQRCode Size="200px"
               Value="https://docs.telerik.com/blazor-ui/introduction">
</TelerikQRCode>
````

>caption The result from the above code snippet

![](images/qrcode-basic-configuration.png)

For more information, refer to the [article on types]({%slug  qrcode-qr-code-types%}) regarding the set of QRCode types.

## Features

>caption The QRCode provides the following features:

### General Properties

* `RenderAs` - `enum` - `RenderingMode` - defines the preferred rendering mode:
    * `SVG`
    * `Canvas`

* `Encoding` - `enum` - `QRCodeEncoding` - the encoding mode used to encode the value. The possible members are:
    * `ISO_8859_1` - supports all characters from the ISO/IEC 8859-1 character set.
    * `UTF_8` - supports all Unicode characters. The UTF-8 encoding is not included in the specifications and is not supported by all readers.

* `ErrorCorrection` - `enum` - `QRCodeErrorCorrection` - the error correction level used to encode the value. The possible values are:
    * `L` - approximately 7% of the codewords can be restored.
    * `M` - approximately 15% of the codewords can be restored.
    * `Q` - approximately 25% of the codewords can be restored.
    * `H` - approximately 30% of the codewords can be restored.

* `Value` - `string` - defines the initial value of the QRCode.

* `Size` - `string` - specifies the size (`Width` and `Height`) of a QR code in pixels (i.e. "200px") as the QRCode is a square. You can read more details for the dimension properties in the [Dimensions article](https://docs.telerik.com/blazor-ui/common-features/dimensions#dimensions). Setting both `Size` and `Width` and/or `Height` will throw an error. Setting different values to `Width` and `Height` will also cause an issue.

* `Width` - `string` - sets the width of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Width` should be set to `Height`.

* `Height` - `string` - sets the height of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Height` should be set to `Width`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the QRCode component.

* `Background` - `string` - the background color of the QRCode. Accepts a valid CSS color string, including HEX and RGB.

* `Color` - `string` - defines the color of the QRCode elements. The default color is black.

* `Padding` - `double` - defines the minimum distance in pixels that should be left between the border and the QR modules.

### Properties for the QRCode Overlay

* `QRCodeOverlay` - `object` - the overlay configuration which allows you to choose from predefined layouts or insert a custom image.

* `QRCodeOverlay.Type` - `enum` - `QRCodeOverlayType` - available options are `Image` and `Swiss`. When set to image, you have to specify the url source of the image. If set to swiss, a [Swiss QR Code](https://blog.xsuite.com/en/swiss-qr-code#:~:text=This%20QR%20code%20is%20called,(e.g.%20in%20PDF%20format).) is created.

* `QRCodeOverlay.ImageUrl` - `string` - the URL of the displayed overlay image.

* `QRCodeOverlay.Width` - `double` - the width of the overlay in pixels.

* `QRCodeOverlay.Height` - `double` - the height of the overlay in pixels.

### Properties for the QRCode Border

* `QRCodeBorder` - `object` - the border of the QR code.

* `QRCodeBorder.Color` - `string` - the color of the border. Accepts a valid CSS color string, including HEX and RGB.

* `QRCodeBorder.Width` - `double` - The width of the border in pixels. By default the border width is set to zero which means that the border will not be visible.

## Methods

The QRCode methods are accessible through its reference.

* `Refresh` - redraws the component.

You can see the [example with the Barcode]({%slug barcode-overview%}#methods) and use the `Refresh()` method in the same way with QRCode.

## See Also

  * [Live Demo: QRCode](https://demos.telerik.com/blazor-ui/qrcode/overview)
  * [Live Demo: QRCode Encoding](https://demos.telerik.com/blazor-ui/barcode/qrcode/encoding)