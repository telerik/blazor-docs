---
title: Streaming
page_title: InlineAIPrompt Streaming
description: Streaming in the InlineAIPrompt for Blazor.
slug: inlineaiprompt-streaming
tags: telerik,blazor,inlineaiprompt,streaming
published: True
position: 5
components: ["inlineaiprompt"]
---

# Streaming AI Responses with InlineAIPrompt

The Blazor InlineAIPrompt component supports streaming responses, allowing users to see AI-generated content as it is being produced. This feature improves the user experience by providing immediate feedback and a more interactive interface.

Streaming is particularly useful when:

* Working with long-form AI responses that take more time to generate.
* Creating inline editing interfaces where users expect real-time feedback.
* Integrating with AI services that support chunked responses.
* Enhancing user engagement in contextual AI assistance scenarios.

## Configuration

To enable streaming in the InlineAIPrompt component, follow these steps:

1. Handle the [`OnPromptRequest`](slug:inlineaiprompt-events#onpromptrequest) event to start streaming output. When the user sends a prompt, the `OnPromptRequest` event is triggered. In the event handler, set up your AI model streaming logic and call the `AppendOutput` method on the TelerikInlineAIPrompt reference to update the output as new data arrives.
2. Handle the [`OnPromptRequestStop`](slug:inlineaiprompt-events#onpromptrequeststop) event to stop streaming.
This event is fired when the user clicks the Stop Generation button. You can use it to cancel the AI request.

When implementing real AI model streaming logic:

* Replace the sample `OutputChunks` loop with your actual AI model streaming code.
* Each time a new piece of response arrives from the AI model, call `AppendOutput` to update the InlineAIPrompt output area.
* If the user clicks the Stop Generation button, cancel the AI request in `OnPromptRequestStop`.

## Example

>caption Using InlineAIPrompt streaming

<demo metaUrl="client/inlineaiprompt/streaming/example-1/" height="320"></demo>
