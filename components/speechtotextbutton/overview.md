---
title: Overview
page_title: SpeechToTextButton Overview
description: Learn about the SpeechToTextButton component, its features, and how to use it in Blazor applications.
slug: speechtotextbutton-overview
tags: blazor, speech recognition, button, voice input
published: true
position: 1
components: ["speechtotextbutton"]
---
# Blazor SpeechToTextButton Overview

The [Blazor SpeechToTextButton component](https://www.telerik.com/blazor-ui/speech-to-text-button) enables speech recognition in Blazor applications. It provides a button that users can select to start and stop speech recognition. The component converts spoken words into text and emits events with the recognized results.

Use the SpeechToTextButton component to add voice input capabilities to forms, search bars, chat interfaces, and other scenarios that require speech-to-text functionality.

## Basic Usage

The following example demonstrates how to add the SpeechToTextButton to a Blazor page and handle the recognition result.

>caption Example of using the SpeechToTextButton

<demo metaUrl="client/speechtotextbutton/overview/" height="200"></demo>

## Appearance

You can customize the appearance of the SpeechToTextButton by setting parameters such as `Icon`, and `Class`. For more details and examples, refer to [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance).

## Events

The SpeechToTextButton component emits several events that you can handle. For more details, refer to [SpeechToTextButton Events](slug:speechtotextbutton-events).

## SpeechToTextButton Parameters

To review all available parameters for the SpeechToTextButton component, see the [SpeechToTextButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSpeechToTextButton#parameters).

## SpeechToTextButton Reference and Methods

The SpeechToTextButton component exposes several public methods that you can call from your code. For a full list and details, see the [SpeechToTextButton API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikSpeechToTextButton#methods).

>caption Example of Calling a Method by Reference


````RAZOR.skip-repl
<TelerikSpeechToTextButton @ref="speechToTextButtonRef" />

@code {
    private async Task StartRecognition()
    {
        await speechToTextButtonRef.StartAsync();
    }
}
````

## Limitations

When you use the SpeechToTextButton in the Edge browser or in a [Blazor MAUI Hybrid](slug:getting-started/hybrid-blazor) App, the spoken language is not detected automatically. To ensure correct behavior, you must set the SpeechToTextButton `Lang` parameter. This is required because these environments do not follow the automatic language resolution described in the [MDN Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang).

````RAZOR.skip-repl
<TelerikSpeechToTextButton Lang="en-US" />
````

## Supported Browsers

The SpeechToTextButton component relies on the Web Speech API. For a list of supported browsers, refer to the [Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility).

## Next Steps

* [Handle SpeechToTextButton Events](slug:speechtotextbutton-events)
* [SpeechToTextButton Integration](slug:speechtotextbutton-integration)

## See Also

* [SpeechToTextButton Live Demo](https://demos.telerik.com/blazor-ui/speechtotextbutton/overview)
* [SpeechToTextButton API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpeechToTextButton)
* [SpeechToTextButton Events](slug:speechtotextbutton-events)
* [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance)
* [SpeechToTextButton Integration](slug:speechtotextbutton-integration)