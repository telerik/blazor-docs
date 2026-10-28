---
title: Overview
page_title: InlineAIPrompt Overview
description: Overview of the InlineAIPrompt for Blazor.
slug: inlineaiprompt-overview
tags: telerik,blazor,inlineaiprompt,overview
published: True
position: 0
components: ["inlineaiprompt"]
---

# Blazor InlineAIPrompt Overview

The Telerik InlineAIPrompt for Blazor is a popup-based component that lets you interact with AI language models right inside your content.

The InlineAIPrompt provides a simple and focused way to send prompts and get responses from AI without interrupting the user’s flow. The InlineAIPrompt is great for adding contextual AI help exactly where users need it.

## Creating Blazor InlineAIPrompt

1. Add the `<TelerikInlineAIPrompt>` tag.
2. Subscribe to the `OnPromptRequest` event that will fire whenever the user sends a prompt request. The handler expects an argument of type `InlineAIPromptPromptRequestEventArgs`.
3. Set the `Prompt` parameter

>caption Telerik Blazor InlineAIPrompt

<demo metaUrl="client/inlineaiprompt/overview/example-1/" height="320"></demo>

## Streaming

The InlineAIPrompt component supports streaming responses, which lets users view AI-generated content in real time as it’s created. [Read more about the Blazor InlineAIPrompt streaming...](slug:inlineaiprompt-streaming)

## Events

The InlineAIPrompt component offers several events that allow developers to handle user interactions effectively. [Read more about the Blazor InlineAIPrompt events...](slug:inlineaiprompt-events)

## InlineAIPrompt API

Get familiar with all InlineAIPrompt parameters, methods, events, and nested tags in the [InlineAIPrompt API Reference](slug:Telerik.Blazor.Components.TelerikInlineAIPrompt).

### Settings and Commands

The InlineAIPrompt exposes settings for its popup and its embedded [Speech to Text Button](slug:speechtotextbutton-overview). To configure the options, declare a `<InlineAIPromptPopupSettings>` or `<InlineAIPromptSpeechToTextButtonSettings>` tag inside `<InlineAIPromptSettings>`.

The InlineAIPrompt component also exposes an option to set predefined commands, which is a predefined prompt that is processed immediately. To configure the actions, use the `Commands` parameter and subscribe to the `OnCommandExecute` event that will fire whenever the user executes a command. The handler expects an argument of type `InlineAIPromptCommandExecuteEventArgs`.

<demo metaUrl="client/inlineaiprompt/overview/example-2/" height="420"></demo>

## InlineAIPrompt Reference

Use the component reference to execute the following methods.

| Method      | Description |
|-------------|-------------|
| `Refresh`   | Re-renders the component. |
| `ShowAsync` | Shows the inline prompt at defined coordinates. Accepts two parameters: X and Y coordinates to position the popup. |
| `HideAsync` | Hides the Inline AI Prompt. |

## See Also

* [Live Demo: InlineAIPrompt](https://demos.telerik.com/blazor-ui/inlineaiprompt/overview)
