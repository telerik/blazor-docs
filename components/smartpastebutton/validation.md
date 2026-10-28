---
title: Validation
page_title: SmartPasteButton Validation
description: The Blazor SmartPasteButton is an AI-powered utility that parses unstructured text data and uses the result to populate form fields automatically. It also allows you to handle cancellation scenarios.
slug: smartpastebutton-Validation
tags: telerik, blazor, smartpastebutton, ai, forms, validation
published: True
position: 10
components: ["smartpastebutton"]
---

## SmartPasteButton Validation

While the SmartPasteButton handles most AI service errors internally, you can use the [`OnRequestStart`](slug:smartpastebutton-events#onrequeststart) event to validate the input content and the [`OnRequestStop`](slug:smartpastebutton-events#onrequeststop) event to handle cancellation scenarios.

>caption Example demonstrating form validation within the OnRequestStart event

<demo metaUrl="client/smartpastebutton/validation/example-1/" height="520"></demo>

## See Also

* [SmartPasteButton Live Validation Demo](https://demos.telerik.com/blazor-ui/smartpastebutton/validation)
* [SmartPasteButton Overview](slug:smartpastebutton-overview)
* [SmartPasteButton Events](slug:smartpastebutton-events)
