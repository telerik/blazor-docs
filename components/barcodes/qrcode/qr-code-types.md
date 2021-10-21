---
title: QR Code Types
page_title: QR Code Types
description: Overview of the QR Code Types for Blazor.
slug: qrcode-qr-code-types
tags: telerik,blazor,barcode,qrcode,types,overview
published: True
position: 5
---

# QRCode Types

The component exposes the following QRCode types:

* [Swiss Type](#swiss-qrcode-type)
* [Image Type](#qrcode-of-type-image)

## Swiss QRCode Type
The QRCode component supports the [Swiss QR Code format](https://blog.xsuite.com/en/swiss-qr-code). Enabling the `Swiss` type of the overlay will add a Swiss cross in the QR Code.

The following implementation demonstrates the code needed for the Swiss Type:

>caption An example of a Swiss QR Type implementation

````CSHTML
@* This code snippet showcases an example of Swiss type QR code. *@

<TelerikQRCode Size="200px"
               Value="@value">
    <QRCodeOverlay Type="@QRCodeOverlayType.Swiss" />
</TelerikQRCode>

@code {
    string value = "SPC  0200  1  CH4431999123000889012  S  " +
            "Robert Schneider AG  Rue du Lac  1268  2501  Biel  CH  1949.75  CHF  " +
            "S  Pia-Maria Rutschmann-Schnyder  Grosse Marktgasse  28  9400  Rorschach  CH  " +
            "QRR  210000000003139471430009017 Order of 15 June 2020  EPD  " +
            "//S1/10/10201409/11/200701/20/140.000-53/30/102673831/31/200615/32/7.7/33/7.7:139.40/40/0:30" +
            "  Name AV1: UV;UltraPay005;12345  Name AV2: XY;XYService;54321";
}
````

>caption The result from the above code snippet

![](images/qrcode-swiss-type.png)

## QRCode of Type Image
The image type of the overlay is adding an image in the QR Code.

The following implementation demonstrates the code needed for the Image Type:

>caption An example of a QRCode Image Type implementation

````CSHTML
@* This code snippet showcases an example of image type QR code. *@

<TelerikQRCode Size="200px"
               Value="https://demos.telerik.com/blazor-ui">
    <QRCodeOverlay Type="@QRCodeOverlayType.Image" ImageUrl="https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg" />
</TelerikQRCode>
````

>caption The result from the above code snippet

![](images/qrcode-image-type.png)

## See Also

  * [Live Demo: QRCode](https://demos.telerik.com/blazor-ui/qrcode/overview)
  * [Live Demo: QRCode Encoding](https://demos.telerik.com/blazor-ui/barcode/qrcode/encoding)