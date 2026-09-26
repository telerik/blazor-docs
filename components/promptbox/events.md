---
title: Events
page_title: PromptBox - Events
description: Events in the PromptBox for Blazor - handle user interactions, value changes, and action button clicks in AI communication scenarios.
slug: promptbox-events
tags: telerik,blazor,promptbox,events,action,speech,files
published: true
position: 20
components: ["promptbox"]
---

# Events

The Blazor PromptBox component provides comprehensive event handling for user interactions and state changes. This article explains the events available in the PromptBox component and how to use them effectively.

The PromptBox fires events for text input changes, action button interactions, speech-to-text results, and file selection activities.

### OnPromptAction

The `OnPromptAction` event represents the primary user action for submitting content or stopping ongoing operations. This event fires when:

* The user clicks the action button
* The user presses **Enter** (when content is available and not loading)
* The button state changes between Send and Stop modes

The event provides [`PromptBoxActionButtonEventArgs`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PromptBoxActionButtonEventArgs) containing the current text and action type.

>caption Handle action button interactions

<demo metaUrl="client/promptbox/events/example-5/" height="320"></demo>

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

### ValueChanged

The `ValueChanged` event fires upon every change in the text input (such as each keystroke). When using the `ValueChanged` event, you cannot use two-way data binding because the `@bind-Value` directive internally uses this event.

>caption Handle ValueChanged event

<demo metaUrl="client/promptbox/events/example-4/" height="420"></demo>

### OnChange

The `OnChange` event represents a user confirmation of the current value. It is triggered when the input loses focus after the value has been changed during that focus session.

>caption Handle OnChange event

<demo metaUrl="client/promptbox/events/example-3/" height="320"></demo>

### OnBlur

The `OnBlur` event fires when the PromptBox loses focus, regardless of whether the value has changed.

>caption Handle OnBlur event

<demo metaUrl="client/promptbox/events/example-2/" height="320"></demo>

## Speech-to-Text Events

When speech-to-text functionality is enabled, the PromptBox provides events through the [`PromptBoxSpeechToTextButtonSettings`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PromptBoxSpeechToTextButtonSettings):

* OnStart: Fires when speech recognition begins.

* OnResult: Fires when speech recognition returns results. Provides `SpeechToTextButtonResultEventArgs` with recognition data.

* OnEnd: Fires when speech recognition ends or disconnects.

* OnError: Fires when a speech recognition error occurs.

>caption Speech-to-text event handling

<demo metaUrl="client/promptbox/events/example-1/" height="320"></demo>

## File Selection Events

File selection events are handled through the [`PromptBoxFileSelectButtonSettings`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.PromptBoxFileSelectButtonSettings).

### OnSelect

Fires when users [select files](slug:promptbox-attachments). Provides `FileSelectEventArgs` with information about the selected files.

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Modes](slug:promptbox-modes)
* [PromptBox Adornments](slug:promptbox-adornments)
* [PromptBox File Attachments](slug:promptbox-attachments)