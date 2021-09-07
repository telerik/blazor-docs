---
title: Overview
page_title: Barcode Overview
description: Overview of the Barcode for Blazor.
slug: components/barcode/overview
tags: telerik,blazor,barcode,overview
published: True
position: 0
---

# Barcode Overview

The Barcode represents data in a machine-readable format. You can choose from several supported standards.

All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://www.w3.org/Graphics/SVG/).

## Basics

To add a Telerik Barcode to your Blazor app:

1. Add the `TelerikBarcode` tag.
1. Inside it, add `BarcodeText` tag that styles the barcode text.
1. Provide `Value` (one-way data binding) or `bind-Value` (two-way data binding) property
1. Set its `Height` and `Width`
1. Optionally, choose a `Type` (one of the [encodings we support]({%slug  components/barcode/encoding%})).
    * Its default encoding is `Code39`.

The following example demonstrates how to initialize the Barcode with its default configuration.

>caption A basic configuration of the Telerik Barcode

````CSHTML
<TelerikBarcode Width="300px"
                Height="200px"
                Type="@BarcodeType.Code39"
                Value="123456789">
    <BarcodeText Color="blue">
        <BarcodeTextMargin Left="0"></BarcodeTextMargin>
    </BarcodeText>
</TelerikBarcode>
````

>caption The result from the above code snippet

![](images/barcode-basic-configuration.png)

For more information, refer to the [article on encoding]({%slug  components/barcode/encoding%}) regarding the set of types supported by the Barcode.

## Features

>caption The Barcode provides the following features:

### Properties for the Barcode Border

* `BarcodeBorder` - `object`.

* `BarcodeBorder.Color` - `string`.

* `BarcodeBorder.DashType` - `enum`.

* `BarcodeBorder.Width` - `double`.

### Properties for the Barcode Padding

* `BarcodePadding` - `object`.

* `BarcodePadding.Bottom` - `double`.

* `BarcodePadding.Left` - `double`.

* `BarcodePadding.Right` - `double`.

* `BarcodePadding.Top` - `double`.

### Properties for the Barcode Text

* `BarcodeText` - `object`.

* `BarcodeText.Color` - `string`.

* `BarcodeText.Font` - `string`.

* `BarcodeText.BarcodeTextMargin` - `object`.

* `BarcodeText.BarcodeTextMargin.Bottom` - `double`.

* `BarcodeText.BarcodeTextMargin.Left` - `double`.

* `BarcodeText.BarcodeTextMargin.Right` - `double`.

* `BarcodeText.BarcodeTextMargin.Top` - `double`.

* `BarcodeText.Visible` - `bool` - by setting it to false, the Barcode will not display the value as a text below the barcode lines.

### Other Properties

* `RenderAs` - `enum` - defines the preferred rendering engine - svg/canvas.

* `Background` - `string`.

* `Checksum` - `bool` - by setting it to true, the Barcode will display the checksum digit next to the value in the text area.

* `Color` - `string` - defines the color of the bar elements.

* `Type` - `enum` - defines the symbology (encoding) the Barcode will use - ([full list of supported encodings]({%slug  components/barcode/encoding%}))

* `Value` - `string` - defines the initial value of the Barcode.

* `Width` - `string`.

* `Height` - `string`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the Barcode component. 

## Methods

The Barcode methods are accessible through it's reference.

* `Refresh` - redraws the component.

>caption Get a reference to the Barcode and use its methods

````CSHTML
@* This example shows an example of getting reference to the Barcode. *@

<TelerikBarcode @ref="TelerikBarcodeRef" Width="300px"
                Height="200px"
                Type="@BarcodeType.Code39"
                Value="123456789">
    <BarcodeText Color="blue">
        <BarcodeTextMargin Left="0"></BarcodeTextMargin>
    </BarcodeText>
</TelerikBarcode>

@code{
    Telerik.Blazor.Components.TelerikBarcode TelerikBarcodeRef { get; set; }
}
````

## See Also

  * [Live Demo: Barcode](https://demos.telerik.com/blazor-ui/barcode/overview)
  * [Live Demo: Barcode Encoding](https://demos.telerik.com/blazor-ui/barcode/encodings)