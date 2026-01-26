---
title: Integration
page_title: Integration
description: Learn how to integrate the SpeechToTextButton component with forms and other components in Blazor applications.
slug: speechtotextbutton-integration
tags: blazor, speech recognition, integration
published: true
position: 4
components: ["speechtotextbutton"]
---
# SpeechToTextButton Integration

Integrate the SpeechToTextButton component with forms, input fields, and other UI elements to provide voice input capabilities.

## Binding Recognized Text to an Input Field

Use the `OnResult` event to update an input field with the recognized text. For example, you can enable users to fill out a feedback form by speaking instead of typing. When the user clicks the SpeechToTextButton, the component captures their speech. It then updates the value of a [TelerikTextArea](slug:textarea-overview) with the recognized text.

>caption Example of binding the recognized text to an TelerikTextArea

<demo metaUrl="client/speechtotextbutton/integration/" height="250"></demo>

## See Also

- [AI Model Voice Transcription Intergration](https://github.com/telerik/blazor-ui/tree/master/common/microsoft-extensions-ai-integration/SpeechToTextIntegration)
- [SpeechToTextButton Overview](slug:speechtotextbutton-overview)
- [SpeechToTextButton Events](slug:speechtotextbutton-events)
- [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance)