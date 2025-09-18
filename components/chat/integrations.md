---
title: Integrations
page_title: Chat Integrations
description: Learn how to integrate the Telerik UI for Blazor Chat component with AI services, LLMs, and chatbot frameworks.
slug: chat-integrations
tags: telerik,blazor,chat,integrations,ai,llm,chatbot
published: True
position: 7
---

# Chat Integrations

The Chat component can be integrated with various AI services, Large Language Models (LLMs), and chatbot frameworks, and other messaging platforms to create intelligent conversational experiences.

This article explains:

* [AI and LLM Integration](#ai-and-llm-integration) - Connect to AI services and language models
* [Chatbot Integration](#chatbot-integration) - Integrate with chatbot frameworks
* [Message Processing](#message-processing) - Handle AI responses and user interactions

## AI and LLM Integration

The Chat component works seamlessly with AI services and Large Language Models. You can integrate with various providers like OpenAI, Azure OpenAI, or custom AI services. 

### Microsoft.Extensions.AI Integration Example

The following example demonstrates using the `OnSendMessage` event to communicate with an AI service. The event handler passes user messages to the AI service, retrieves the response, and displays it in the Chat:

````RAZOR.skip-repl
@using Microsoft.Extensions.AI
@using System.Threading
@using Microsoft.AspNetCore.Hosting
@inject AIPromptService AIPromptService
@inject IWebHostEnvironment Environment

<TelerikChat @ref="@AIChat"
             Data="@AIChatConversation"
             OnSendMessage="@(async (args) => await AskAI(args))" />

@code {
    private TelerikChat<ChatMessage>? AIChat;
    private List<ChatMessage> AIChatConversation { get; set; } = new List<ChatMessage>();
    private CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();

    private async Task AskAI(ChatSendMessageEventArgs args)
    {
        cancellationTokenSource = new CancellationTokenSource();
        
        var prompt = new ChatMessage()
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "user",
            AuthorName = "John Doe",
            Content = args.Message,
            Timestamp = DateTime.Now,
            Status = "Sent"
        };

        var response = new ChatMessage()
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "ai",
            AuthorName = "AI Assistant",
            AuthorImageUrl = "https://demos.telerik.com/blazor-ui/images/devcraft-ninja-small.svg",
            Timestamp = DateTime.Now,
            Status = "Sent"
        };

        AIChatConversation.Add(prompt);
        AIChatConversation.Add(response);
        AIChat?.Refresh();

        var chatMessage = new Microsoft.Extensions.AI.ChatMessage(ChatRole.User, args.Message);
        var fullResponse = string.Empty;
        await foreach (var answer in AIPromptService.GetStreamingResponseAsync(chatMessage, cancellationToken: cancellationTokenSource.Token))
        {
            fullResponse += answer.Text;
            response.Content = fullResponse;
            AIChat?.Refresh();
        }
    }

    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageUrl { get; set; }
        public string Content { get; set; }
        public string MessageToReplyId { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPinned { get; set; }
        public DateTime Timestamp { get; set; }
        public List<string> SuggestedActions { get; set; }
        public IEnumerable<FileSelectFileInfo> Attachments { get; set; } = new List<FileSelectFileInfo>();
    }
}
````

## Chatbot Integration

Chatbots are intelligent software solutions that replicate human-like conversations and can manage various tasks autonomously without requiring manual intervention.

You can connect the Chat component to various chatbot platforms including Microsoft Bot Framework, custom REST APIs, or third-party chatbot services. The component handles the user interface while your bot service processes messages and generates appropriate responses.

>tip The [Person to Bot demo](https://demos.telerik.com/blazor-ui/chat/person-to-bot) showcases chatbot functionality. This demo utilizes a Telerik-hosted AI service solely for illustration purposes. In production environments, you should develop your own AI service tailored to your specific business domain, requirements, and organizational needs.

### Suggested Actions

The Chat component supports suggested actions through the `SuggestedActions` parameter. This feature allows chatbots to provide quick reply options that users can click instead of typing responses manually. You can bind the `SuggestedActions` parameter to a field in your chatbot service response to display these interactive buttons.

````RAZOR.skip-repl
<TelerikChat @ref="@AIChat"
             Data="@AIChatConversation"
             SuggestedActions="SuggestedActionsField"
 />

````

## See Also

* [Live Demo: Chat AI Integration](https://demos.telerik.com/blazor-ui/chat/ai-integration)
* [Microsoft.Extensions.AI Documentation](https://learn.microsoft.com/en-us/dotnet/ai/)
