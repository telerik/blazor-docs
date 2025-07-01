---
title: Events
page_title: SpeechToTextButton Events
description: Learn about the events that the SpeechToTextButton component emits and how to handle them in Blazor applications.
slug: speechtotextbutton-events
tags: blazor, speech recognition, events
published: true
position: 3
---

# SpeechToTextButton Events

The `SpeechToTextButton` component emits events that notify you about speech recognition results, errors, and state changes. Use these events to update the UI, display messages, or process the recognized speech.

## OnResult

The `OnResult` event fires when the component recognizes speech and produces a result. Use this event to access the recognized phrases, alternatives, and confidence scores.

**Event arguments**

The following table lists the properties of the `SpeechToTextButtonResultEventArgs` class:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property         | Type                                         | Description                                 |
|------------------|----------------------------------------------|---------------------------------------------|
| `Alternatives`   | `IEnumerable<SpeechRecognitionAlternative>`  | The recognized alternatives.                |
| `IsFinal`        | `bool`                                       | Indicates whether the speech recognition result is final (true) or interim (false).|

Each `SpeechRecognitionAlternative` contains:

| Property   | Type     | Description                  |
|------------|----------|-----------------------------|
| `Transcript` | `string` | The recognized text.      |
| `Confidence` | `double` | The confidence score level of recognition engine. A floating point value (0.0-1.0). |

**Example: Displaying Recognized Alternatives and Confidence**

<demo metaUrl="client/speechtotextbutton/onresult/" height="300"></demo>

## OnStart and OnEnd

The `OnStart` event fires when speech recognition starts. The `OnEnd` event fires when speech recognition ends. Use these events to update the UI or track the recognition state.

**Example: Indicating Listening State**

<demo metaUrl="client/speechtotextbutton/onstartend/" height="300"></demo>

## OnError

The `OnError` event fires when an error occurs during speech recognition. Use this event to display error messages to the user.

## OnClick

The `OnClick` event fires when the user clicks or taps the button. It receives argument of type `MouseEventArgs`.

## See Also

- [SpeechToTextButton Overview](slug:speechtotextbutton-overview)
- [SpeechToTextButton Appearance](slug:speechtotextbutton-appearance)
- [SpeechToTextButton Integration](slug:speechtotextbutton-integration)