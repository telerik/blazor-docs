---
title: Events
page_title: InlineAIPrompt - Events
description: Events in the InlineAIPrompt for Blazor.
slug: inlineaiprompt-events
tags: telerik,blazor,inlineaiprompt,events
published: true
position: 10
components: ["inlineaiprompt"]
---

# InlineAIPrompt Events

This article describes the events of the Telerik InlineAIPrompt for Blazor:

* [`OnOutputActionClick`](#onoutputactionclick)
* [`OnPromptRequest`](#onpromptrequest)
* [`OnPromptRequestStop`](#onpromptrequeststop)
* [`OnCommandExecute`](#oncommandexecute)
* [`PromptChanged`](#promptchanged)

## OnOutputActionClick

The `OnOutputActionClick` event fires when the user clicks an output action button in the output view of the InlineAIPrompt component. Use this event to handle custom actions such as copying, retrying, or providing feedback on the generated output.

To define the available output actions, set the `OutputActions` parameter to a list of [`InlineAIPromptOutputActionDescriptor`](slug:Telerik.Blazor.Components.InlineAIPromptOutputActionDescriptor) objects. Each action descriptor configures the appearance and behavior of an action button.

The event handler receives an argument of type [`InlineAIPromptOutputActionClickEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptOutputActionClickEventArgs), which provides details about the clicked action, the prompt, the output, and the related command (if any).

## OnPromptRequest

The `OnPromptRequest` event fires when the user clicks on the **Generate** button within the Prompt view or retries a prompt from the Output view.

The event handler receives an argument of type [`InlineAIPromptPromptRequestEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptPromptRequestEventArgs). See the [example below](#example).

> Do not use the `OnPromptRequest` event when [integrating the InlineAIPrompt component with `Microsoft.Extensions.AI`](slug:common-features-microsoft-extensions-ai-integration). The `OnPromptRequest` event disables such integration.

## OnPromptRequestStop

The `OnPromptRequestStop` event fires when the user stops a prompt request by clicking the stop floating action button in the output view. This event allows you to handle the cancellation of an ongoing prompt request.

The event handler receives no arguments.

## OnCommandExecute

The `OnCommandExecute` event fires when the user clicks on a command within the Commands view.

The event handler receives an argument of type [`InlineAIPromptCommandExecuteEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptCommandExecuteEventArgs). See the [example below](#example).

## PromptChanged

The `PromptChanged` event fires when the user changes the prompt text. Use the event to update the InlineAIPrompt's prompt when the `Prompt` parameter is set with one-way binding, otherwise, the user action will be ignored.

## Example

>caption Using InlineAIPrompt events

<demo metaUrl="client/inlineaiprompt/events/example-1/" height="370"></demo>
