---
title: Encoding
page_title: Barcode Encoding
description: Types of Encoding supported by the Barcode for Blazor.
slug: barcode-encoding
tags: telerik,blazor,barcode,encoding
published: True
position: 3
---

# Barcode Encoding

Encoding (symbology) represents the mapping between messages and barcodes.

You can choose which supported encoding to use by setting the `Type` paramater of the component. The following table lists the available symbologies and their specifications supported by the Barcode.

>important If the value of a particular encoding does not meet the expected length or character set, the barcode will **not** be shown.

>caption Explore the Barcode Type options

````CSHTML
@*Choose a type from the dropdown*@

<div style="display: flex">
    <div style="display: inline">
        <select @bind="BarcodeType">
            @foreach (var possibleType in Enum.GetValues(typeof(BarcodeType)))
            {
                <option value="@possibleType">@possibleType</option>
            }
        </select>
    </div>

    <TelerikBarcode @ref="myBarcode" Width="300px"
                    Height="200px"
                    Type="@BarcodeType"
                    Value="123456789">
    </TelerikBarcode>
</div>

@code {
    TelerikBarcode myBarcode;
    BarcodeType BarcodeType { get; set; } = BarcodeType.Code39;
}
````

| SYMBOLOGY | CHARACTER SET | LENGTH | CHECK DIGITS |
| --------- | ------------- | ------ | ------------ |
| **Code 39** (default) | [A-Z]; [0-9]; [ - . $ / + % ] | variable (avg. up to 20 chars) | optional (Mod. 43) |
| **Code39Extended** | ASCII (128 characters) | variable | optional (Mod. 43) |
| **Code 93** | [0-9];[A-Z];[SPACE . + - / % $] | variable | 2 check digits |
| **Code93Extended** | ASCII(128 characters) | variable | 2 check digits |
| **EAN-13** | numeric [0..9] | 12 usable digits | 1 check digit |
| **EAN-8** | numeric [0..9] | 7 usable digits | 1 check digit |
| **UPC-A** | numeric [0..9] | 11 usable digits (first is always 0) | 1 check digit |
| **UPC-E** | numeric [0..9] | 6 usable digits (first is always 0) | 1 check digit |
| **POSTNET** | numeric [0..9] | variable | 1 check digit |
| **Code 11** | [0-9]; [-] | variable | 1 or 2 based on length |
| **Code128** | LATIN-1 (ISO-8859-1) | variable | 1 check digit |
| **Code128A** | ASCII 00 to 95 (0-9, A-Z and control codes), special characters | variable | 1 check digit |
| **Code128B** | ASCII 32 to 127 (0-9, A-Z, a-z), special characters | variable | 1 check digit |
| **Code128C** | ASCII 00-99 (encodes each two digits with one code) | variable | 1 check digit |
| **GS1-128** | depending on Application Identifier | variable | 1 check digit |
| **MSImod10** | numeric [0..9] | variable | 1 check digit |
| **MSImod11** | numeric [0..9] | variable | 1 check digit |
| **MSImod1010** | numeric [0..9] | variable | 1 check digit |
| **MSImod1110** | numeric [0..9] | variable | 1 check digit |

## See Also

  * [Live Demo: Barcode](https://demos.telerik.com/blazor-ui/barcode/overview)
  * [Live Demo: Barcode Encoding](https://demos.telerik.com/blazor-ui/barcode/encodings)