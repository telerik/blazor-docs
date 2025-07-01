---
title: Overview
page_title: SpeechToTextButton Overview
description: Learn about the SpeechToTextButton component, its features, and how to use it in Blazor applications.
slug: speechtotextbutton-overview
tags: blazor, speech recognition, button, voice input
published: true
position: 1
---

# Blazor SpeechToTextButton Overview

The `SpeechToTextButton` component enables speech recognition in Blazor applications. It provides a button that users can select to start and stop speech recognition. The component converts spoken words into text and emits events with the recognized results.

Use the `SpeechToTextButton` component to add voice input capabilities to forms, search bars, chat interfaces, and other scenarios that require speech-to-text functionality.

## Basic Usage

The following example demonstrates how to add the `SpeechToTextButton` to a Blazor page and handle the recognition result.

**Example of Using the SpeechToTextButton**

<demo metaUrl="client/speechtotextbutton/overview/" height="200"></demo>

## Appearance

You can customize the appearance of the `SpeechToTextButton` by setting parameters such as `Icon`, and `Class`. For more details and examples, refer to [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance).

## Events

The `SpeechToTextButton` component emits several events that you can handle. For more details, refer to [SpeechToTextButton Events](slug:speechtotextbutton-events).

## SpeechToTextButton Parameters

Configure the `SpeechToTextButton` by setting its parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter           | Type and Default&nbsp;Value                                 | Description                                                                                  |
|---------------------|-------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `Id`                | `string`                                                    | Sets the `id` attribute of the button.                                                       |
| `Icon`              | `object`                                                    | Specifies the icon rendered in the button.                                                   |
| `Title`             | `string`                                                    | Sets the `title` attribute of the button.                                                    |
| `Enabled`           | `bool`<br />(`true`)                                        | Specifies whether the button is enabled.                                                     |
| `TabIndex`          | `int`<br />(`0`)                                            | Sets the `tabindex` attribute of the button.                                                 |
| `Lang`              | `string`<br />(`browser or system language`)                | BCP 47 language tag (for example, `en-US`).                                                  |
| `Continuous`        | `bool`<br />(`false`)                                       | Specify whether to return continuous results.                                                |
| `InterimResults`    | `bool`<br />(`false`)                                       | Specify whether to return interim results.                                                   |
| `MaxAlternatives`   | `int`<br />(`1`)                                            | The maximum number of recognition alternatives.                                              |
| `IntegrationMode`   | `SpeechToTextButtonIntegrationMode`<br />(`WebSpeech`)      | Specify the speech recognition engine or integration mode.                                   |
| `AriaLabel`         | `string`                                                    | Sets the `aria-label` attribute of the button.                                               |
| `AriaLabelledBy`    | `string`                                                    | Sets the `aria-labelledby` attribute of the button.                                          |
| `AriaDescribedBy`   | `string`                                                    | Sets the `aria-describedby` attribute of the button.                                         |
| `AriaControls`      | `string`                                                    | Sets the `aria-controls` attribute of the button.                                            |

## SpeechToTextButtton Reference and Methods

The `SpeechToTextButton` component exposes several public methods that you can call from your code:

| Method         | Description                                                                                   |
|----------------|----------------------------------------------------------------------------------------------|
| `StartAsync` | Start the speech-to-text recognition process.                                                |
| `StopAsync`  | Stop the speech recognition process.                                                         |
| `AbortAsync` | Abort the speech recognition process without returning a result.                             |
| `Refresh`    | Force the component to re-render.                                                            |

**Example of Calling a Method by Reference**

<div class="skip-repl"></div>
````RAZOR
<TelerikSpeechToTextButton @ref="speechToTextButtonRef" />

@code {
    private async Task StartRecognition()
    {
        await speechToTextButtonRef.StartAsync();
    }
}
````

## Supported Browsers

The `SpeechToTextButton` component relies on the Web Speech API. For a list of supported browsers, refer to the [Web Speech API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility).

## Next Steps

* [Handle SpeechToTextButton Events](slug:speechtotextbutton-events)
* [SpeechToTextButton Integration](slug:speechtotextbutton-integration)

## See Also

- [SpeechToTextButton Live Demo](https://demos.telerik.com/blazor-ui/speechtotextbutton/overview)
- [SpeechToTextButton API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikSpeechToTextButton)
- [SpeechToTextButton Events](slug:speechtotextbutton-events)
- [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance)
- [SpeechToTextButton Integration](slug:speechtotextbutton-integration)