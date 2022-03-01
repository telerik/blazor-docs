---
title: Overview
page_title: Barcode Overview
description: Overview of the Barcode for Blazor.
slug: barcode-overview
tags: telerik,blazor,barcode,overview
published: True
position: 0
---

# Blazor Barcode Overview

The Barcode represents data in a machine-readable format. You can choose from several supported standards.

All graphics are rendered on the client by using [Scalable Vector Graphics (SVG)](https://www.w3.org/Graphics/SVG/).

## Creating Blazor Barcode

1. Add the `TelerikBarcode` tag to add the component to your razor page.

1. Set the `Value` property.

1. Set the `Height` and `Width` properties.

1. Optionally, choose a `Type` (one of the [encodings we support]({%slug  barcode-encoding%})).
    * Its default encoding is `Code39`.

>caption A basic configuration of the Telerik Barcode

````CSHTML
<TelerikBarcode Width="300px"
                Height="200px"
                Value="123456789">
</TelerikBarcode>
````

## Encoding

Encoding represents the mapping between messages and barcodes. [Read more about the supported Blazor Barcode Encodings...]({%slug barcode-encoding%})

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

## Parameters

The Blazor Barcode provides various parameters that allow you to configure the component:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `RenderAs` | `enum` | Defines the preferred rendering mode - svg/canvas. |
| `Checksum` | `bool` | By setting it to true, the Barcode will display the checksum digit next to the value in the text area. |
| `Type` | `enum` | Defines the symbology (encoding) the Barcode will use - ([full list of supported encodings]({%slug  barcode-encoding%})) |
| `Value` | `string` | Defines the initial value of the Barcode. |
| `Width` | `string` | |
| `Height` | `string` | |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the Barcode component. |
| `Background` | `string` | |
| `Color` | `string` | Defines the color of the bar elements. |

### BarcodeText parameters

The following `BarcodeText` parameters enable you to customize the appearance of the Blazor Barcode text:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | |
| `Font` | `string` | |
| `BarcodeTextMargin` | `object` | |
| `BarcodeTextMargin.Bottom` | `double` | |
| `BarcodeTextMargin.Left` | `double` | |
| `BarcodeTextMargin.Right` | `double` | |
| `BarcodeTextMargin.Top` | `double` | |
| `Visible` | `bool` | By setting it to false, the Barcode will not display the value as a text below the barcode lines. |

### BarcodeBorder parameters

The following `BarcodeBorder` parameters enable you to customize the appearance of the Blazor Barcode border:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Color` | `string` | |
| `DashType` | `enum` | |
| `Width` | `double` | |

### BarcodePadding parameters

The following `BarcodePadding` parameters enable you to customize the appearance of the Blazor Barcode:

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Bottom` | `double` | |
| `Left` | `double` | |
| `Right` | `double` | |
| `Top` | `double` | |

## Next Steps

[Explore the Barcode Encodings]({%slug barcode-encoding%})

## See Also

  * [Live Demo: Barcode](https://demos.telerik.com/blazor-ui/barcode/overview)
  * [Live Demo: Barcode Encoding](https://demos.telerik.com/blazor-ui/barcode/encodings)