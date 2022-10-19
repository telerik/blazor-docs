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

The Blazor Signature component provides an are where users can draw their signatures with the mouse, pen, or with their fingertips. You can use the component as part of any application where the users must sign a document. The Blazor Signature can be easily integrated with the [TelerikForm.]({%slug form-overview%}) The component stores the value of the signature as a <a href="https://learn.microsoft.com/en-us/dotnet/api/system.buffers.text.base64?view=net-6.0">base64 string</a>

## Creating Blazor Signature

1. Use the `TelerikSignature` tag to add the component to your razor page.
1. Set the `Value` (one-way or two-way binding) parameter to a `string` property.

>caption Blazor Signature with basic configuration

````CSHTML
<TelerikSignature @bind-Value="@SignatureValue"></TelerikSignature>

@code {
    private string SignatureValue { get; set; }
}
````

## Appearance

The Signature component provides settings to control its appearance. [Read more about the Blazor Signature appearance settings...]({%slug signature-appearance%})

## Events

The Blazor Signature **blur** and value **change** events to respond to user actions. [Read more about the Blazor Signature events...]({%slug signature-events%})

## Signature Parameters

The following table lists the Signature parameters. Also check the [Signature API Reference](/blazor-ui/api/Telerik.Blazor.Components.Signature).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the `<div class="k-signature">` element. Use it to [override theme styles]({%slug themes-override%}). |
| `Height` | `string` | Defines the height of the component. |
| `Width` | `string` | Defines the width of the component. |
| `DebounceDelay` | `int` <br /> `(150)` | Time in milliseconds between the last typed symbol and the internal `oninput` event firing. |

## Next Steps

* [Explore the Loader Appearance Settings]({%slug loader-appearance%})


## See Also

* [Live Demo: Loader](https://demos.telerik.com/blazor-ui/loader/overview)
* [Loader API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikLoader)
