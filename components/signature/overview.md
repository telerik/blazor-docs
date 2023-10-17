---
title: Overview
page_title: Signature Overview
description: Overview of the Signature component for Blazor.
slug: signature-overview
tags: telerik,blazor,signature,overview
published: True
position: 0
---

# Blazor Signature Overview

This article provides information about the <a href = "https://www.telerik.com/blazor-ui/signature" target="_blank">Blazor Signature component</a> and its core features.

The Blazor Signature component provides an area where users can draw their signatures with a mouse, pen, or with their fingertips. You can use the component in any application where the users must sign a document. The Blazor Signature integrates easily with the [TelerikForm]({%slug form-overview%}). The component stores the value of the signature as a <a href="https://learn.microsoft.com/en-us/dotnet/api/system.buffers.text.base64?view=net-6.0">base64 string</a>

## Creating Blazor Signature

1. Use the `TelerikSignature` tag to add the component to your razor page.
1. Set the `Value` parameter to a `string` property. It supports one-way and two-way binding.
1. Set the `Width` and `Height` parameters to `px` values.
1. Increase the [SignalR Message Size](#signalr-message-size).

>caption Blazor Signature with basic configuration

````CSHTML
<TelerikSignature @bind-Value="@SignatureValue" Width="300px" Height="300px">
</TelerikSignature>

@code {
    private string SignatureValue { get; set; }
}
````

## Appearance

The Signature component provides settings to control its appearance, for example colors and borders. [Read more about the Blazor Signature appearance settings...]({%slug signature-appearance%})

## Events

Use the Blazor Signature **blur** and value **change** events to respond to user actions. [Read more about the Blazor Signature events...]({%slug signature-events%})

## SignalR Message Size

In **Blazor server-side applications**, the Signature component uses the **SignalR WebSocket**, which has a default maximum message size of **32 KB**. This is rarely enough for the Signature `Value`, which is a Base64 image, so [increase the max WebSocket message size for the Blazor application]({%slug common-kb-increase-signalr-max-message-size%}).

The Signature parameters, which affect the `Value` size are `ExportScale`, `Height`, and `Width`.

## Signature Parameters

The following table lists the Signature parameters. Also check the [Signature API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSignature).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaDescribedBy` | `string` | Maps to the `area-describedby` attribute. Use this parameter to establish a relationship between widgets or groups and the text that describes them. |
| `AriaLabel` | `string` | Maps to the `aria-label` attribute. Use  this parameter if the text that labels the component is not visible. |
| `AriaLabelledBy` | `string` | Maps to the `area-labelledby` attribute. Use this parameter to reference another element to define its accessible name. |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-signature">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `DebounceDelay` | `int` <br /> `(150)` | The time in milliseconds between the last drawn line and the value change event. Increase the debounce delay to optimize the number of client-server requests while the user is drawing, especially when the `Width` and `Height` are larger. |
| `Enabled` | `bool` <br /> `(true)` | Defines if the component is enabled. |
| `ExportScale` | `double` <br /> `(2)` | The `Width` and `Height` of the component will be multiplied by the export scale when converting the signature to an image. If you don't need to save a high-precision signature of the user, or if the `Width` and `Height` are large, reduce the export scale to optimize the [`Value` size](#signalr-message-size). |
| `Height` | `string` | Defines the height of the component. Set it in `px`. |
| `HideLine` | `bool` | Whether the dotted line is rendered. |
| `Maximizable` | `bool` | Whether the Signature can be maximized via a button at the top-right corner. When maximized, the component will show a modal popup dialog. Also see `PopupScale`. |
| `PopupScale` | `double` <br /> `(3)` | The `Width` and `Height` of the component will be multiplied by the `PopupScale` value when maximizing the Blazor Signature. Also see `Maximizable`. |
| `ReadOnly` | `bool` | Maps to the `readonly` attribute. Use this parameter to put the Signature in read-only state. |
| `Smooth` | `bool` | Use this parameter to smoothen the signature line. |
| `StrokeWidth` | `double?` | The drawn lines' thickness in pixels. |
| `TabIndex` | `int?` | Maps to the `tabindex` attribute of the HTML element. You can use it to customize the order in which the inputs in your form focus with the Tab key. |
| `ValidateOn` | `ValidationEvent` enum <br /> (`Input`) | Configures the event that will trigger validation (if validation is enabled). Read more at [Validation Modes for Simple Inputs]({%slug common-features/input-validation%}#validation-modes-for-simple-inputs). |
| `Width` | `string` | Defines the width of the component. Set the it in `px`. |

## Signature Reference and Methods

The Signature exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute. The methods are:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Method | Description |
| --- | --- |
| `Refresh` | Use the method to programmatically re-render the Signature. |

>caption Obtain reference to the Signature instance and execute methods

````CSHTML
@* Get a reference to the Signature component and refresh it on button click *@

<TelerikButton OnClick="@RefreshClickHandler">Refresh the Signature</TelerikButton>

<TelerikSignature @bind-Value="@SignatureValue"
                  Width="300px"
                  Height="300px"
                  @ref="@SignatureReference">
</TelerikSignature>

@code {
    private TelerikSignature SignatureReference { get; set; }

    private string SignatureValue { get; set; }

    private void RefreshClickHandler()
    {
        SignatureReference.Refresh();
    }
}
````

## Next Steps

* [Explore the Signature Appearance Settings]({%slug signature-appearance%})
* [Handle the Signature Events]({%slug signature-events%})
* [Validate the Signature]({%slug common-features/input-validation%})

## See Also

* [Live Demo: Signature](https://demos.telerik.com/blazor-ui/signature/overview)
* [Signature API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSignature)
