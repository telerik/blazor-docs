---
title: AI / LLM Integration
page_title: Chat AI / LLM Integration
description: Learn how to integrate the Telerik UI for Blazor Chat component with popular AI services and large language models.
slug: chat-integrations-ai
tags: telerik,blazor,chat,integrations,ai,llm
published: True
position: 20
---

# AI / LLM Integration

Integrate the Chat component with popular AI services (OpenAI, Azure AI, etc.) to provide intelligent responses.

## Example Guidance
- Set up an API endpoint for your AI service.
- Use Chat events to send user input and display AI responses.
- Handle errors and security for service calls.

Example:
```csharp
private async Task HandleSendMessage(ChatSendMessageEventArgs args)
{
    var aiResponse = await MyAIService.GetResponseAsync(args.Message);
    Messages.Add(new ChatMessage { Text = aiResponse, AuthorId = "AI" });
}
```
