---
title: Overview
page_title: QRCode Overview
description: Overview of the QRCode for Blazor.
slug: components/barcode/qrcode/overview
tags: telerik,blazor,barcode,qrcode,overview
published: True
position: 0
---

# QRCode Overview

The QRCode generates Canvas and [SVG](https://www.w3.org/Graphics/SVG/) images that represent Quick Response (QR) codes.

The component is a machine-readable label that contains information about data for a locator, identifier, or tracker that points to a website or application.

QR codes take a piece of information from a transitory media, place it into the cell phone, and enable the cell phone to quickly read these generated images. All graphics are rendered on the client by using Canvas or SVG.

## Basics

To add a Telerik QRCode to your Blazor app:

1. Add the `TelerikQRCode` tag.
1. Provide `Value` property
1. Set its `Size`
1. Optionally, choose a `QRCode Type` (one of the [types we support]({%slug  components/barcode/qrcode/qr-code-types%})).

The following example demonstrates how to initialize the QRCode with its default configuration.

>caption A basic configuration of the Telerik QRCode

````CSHTML
@* This code snippet showcases an example of basic QRCode configuration. *@

<TelerikQRCode Size="200px"
               Value="https://docs.telerik.com/blazor-ui/introduction">
</TelerikQRCode>
````

>caption The result from the above code snippet

![](images/qrcode-basic-configuration.png)

For more information, refer to the [article on types]({%slug  components/barcode/qrcode/qr-code-types%}) regarding the set of QRCode types.

## Features

>caption The QRCode provides the following features:

### General Properties

* `RenderAs` - `enum` - defines the preferred rendering engine - svg/canvas.

* `Encoding` - `enum` - the encoding mode used to encode the value. The possible values are:
    * `ISO_8859_1` - supports all characters from the ISO/IEC 8859-1 character set.
    * `UTF_8` - supports all Unicode characters. The UTF-8 encoding is not included in the specifications and is not supported by all readers.

* `ErrorCorrection` - `enum` - the error correction level used to encode the value. The possible values are:
    * `L` - approximately 7% of the codewords can be restored.
    * `M` - approximately 15% of the codewords can be restored.
    * `Q` - approximately 25% of the codewords can be restored.
    * `H` - approximately 30% of the codewords can be restored.

* `Value` - `string` - defines the initial value of the QRCode.

* `Size` - `string` - specifies the size of a QR code in pixels (i.e. "200px").

* `Width` - `string` - sets the width of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Width` should be set to `Height`.

* `Height` - `string` - sets the height of the QRCode. If `Height` is set and the `Size` property is not set, the same value as `Height` should be set to `Width`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the Barcode component.

* `Background` - `string` - the background color of the QR code. Accepts a valid CSS color string, including hex and rgb.

* `Color` - `string` - defines the color of the bar elements.

* `Padding` - `double` - defines the minimum distance in pixels that should be left between the border and the QR modules.

### Properties for the QRCode Overlay

* `QRCodeOverlay` - `object` - the overlay configuration which alows you to choose from predefined layouts or insert a custom image.

* `QRCodeOverlay.Type` - `enum` - available options are image and swiss. When set to image, you have to specify the url source of the image. If set to swiss, a [Swiss QR Code](https://blog.xsuite.com/en/swiss-qr-code#:~:text=This%20QR%20code%20is%20called,(e.g.%20in%20PDF%20format).) is created.

* `QRCodeOverlay.ImageUrl` - `string` - the URL of the displayed overlay image.

* `QRCodeOverlay.Width` - `string`.

* `QRCodeOverlay.Height` - `string`.

### Properties for the QRCode Border

* `QRCodeBorder` - `object`.

* `QRCodeBorder.Color` - `string`.

* `QRCodeBorder.Width` - `double`.

## Methods

The QRCode methods are accessible through it's reference.

* `Refresh` - redraws the component.

## See Also

  * [Live Demo: QRCode](https://demos.telerik.com/blazor-ui/qrcode/overview)
  * [Live Demo: QRCode Encoding](https://demos.telerik.com/blazor-ui/barcode/qrcode/encoding)