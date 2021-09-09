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
1. Provide `Value` property
1. Set its `Height` and `Width`
1. Optionally, choose a `Type` (one of the [encodings we support]({%slug  components/barcode/encoding%})).
    * Its default encoding is `Code39`.

The following example demonstrates how to initialize the Barcode with its default configuration.

>caption A basic configuration of the Telerik Barcode

````CSHTML
<TelerikBarcode Width="300px"
                Height="200px"
                Value="123456789">
</TelerikBarcode>
````

>caption The result from the above code snippet

![](images/barcode-basic-configuration.png)

For more information, refer to the [article on encoding]({%slug  components/barcode/encoding%}) regarding the set of types supported by the Barcode.

## Features

>caption The Barcode provides the following features:

### General Properties

* `RenderAs` - `enum` - defines the preferred rendering engine - svg/canvas.

* `Checksum` - `bool` - by setting it to true, the Barcode will display the checksum digit next to the value in the text area.

* `Type` - `enum` - defines the symbology (encoding) the Barcode will use - ([full list of supported encodings]({%slug  components/barcode/encoding%}))

* `Value` - `string` - defines the initial value of the Barcode.

* `Width` - `string`.

* `Height` - `string`.

* `Class` - `string` - the CSS class that will be rendered on the main wrapping element of the Barcode component.

* `Background` - `string`.

* `Color` - `string` - defines the color of the bar elements.

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

## Methods

The Barcode methods are accessible through it's reference.

* `Refresh` - redraws the component.

>caption Get a reference to the Barcode and use its methods

````CSHTML
@* This code snippet showcases an example usage of the Refresh() method. *@

<TelerikButton OnClick="@ChangeSize">Change Size!</TelerikButton>
<br />
<br />
<TelerikButton OnClick="@(() => TelerikBarcodeRef.Refresh())">Refresh component after changes!</TelerikButton>
<br />
<br />

<TelerikBarcode @ref="TelerikBarcodeRef" Width="@Width"
                Height="@Height"
                Value="123456789">
</TelerikBarcode>

@code{
    Telerik.Blazor.Components.TelerikBarcode TelerikBarcodeRef { get; set; }

    string Height { get; set; } = "200px";
    string Width { get; set; } = "300px";

    public void ChangeSize()
    {
        Height = "400px";
        Width = "500px";
    }
}
````

## See Also

  * [Live Demo: Barcode](https://demos.telerik.com/blazor-ui/barcode/overview)
  * [Live Demo: Barcode Encoding](https://demos.telerik.com/blazor-ui/barcode/encodings)