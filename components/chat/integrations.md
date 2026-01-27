---
title: Integrations
page_title: Chat Integrations
description: Learn how to integrate the Telerik UI for Blazor Chat component with AI services, LLMs, and chatbot frameworks.
slug: chat-integrations
tags: telerik,blazor,chat,integrations,ai,llm,chatbot
published: True
position: 7
tag: updated
components: ["chat"]
---
# Chat Integrations

The Chat integrates seamlessly with various AI services, Large Language Models (LLMs), chatbot frameworks, and other messaging platforms to create intelligent conversational experiences. You can use it with popular providers like OpenAI, Azure OpenAI, or custom AI services. 

This article describes the following integration scenarios:

* [Microsoft.Extensions.AI](#microsoftextensionsai)
* [`IChatClient`](#ichatclient)
* [Chatbot](#chatbot) with [suggested actions](#suggested-actions)

## Microsoft.Extensions.AI

The following example demonstrates using the `OnSendMessage` event to communicate with an AI service. The event handler passes user messages to the AI service, retrieves the response, and displays it in the Chat:

>caption Use Chat with Microsoft.Extensions.AI

<div class="skip-repl"></div>

````RAZOR Home.razor
@using Microsoft.Extensions.AI
@using System.Threading

@inject AIPromptService AIPromptService

<TelerikChat @ref="@ChatRef"
             AuthorId="user-id"
             Data="@ChatData"
             OnSendMessage="@OnChatSendMessage" />

@code {
    private TelerikChat<Message>? ChatRef;
    private List<Message> ChatData { get; set; } = new();
    private CancellationTokenSource CancellationToken { get; set; } = new();

    private async Task OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        CancellationToken = new();
        
        Message prompt = new() { AuthorId = "user-id", Text = args.Message };

        Message response = new() { AuthorId = "ai-id", IsTyping = true };

        ChatData.Add(prompt);
        ChatData.Add(response);
        ChatRef?.Refresh();

        var chatMessage = new Microsoft.Extensions.AI.ChatMessage(ChatRole.User, args.Message);

        await foreach (var answer in AIPromptService.GetStreamingResponseAsync(chatMessage, cancellationToken: CancellationToken.Token))
        {
            response.Text += answer.Text;
            ChatRef?.Refresh();
        }

        response.IsTyping = false;
    }
}
````
````C# Message.cs
@[template](/_contentTemplates/chat/general.md#messagecs)
````

## IChatClient

The Telerik Chat for Blazor can integrate with an `IChatClient` instance that is registered in `Program.cs`. In such cases, the Chat component automatically calls the `IChatClient` service methods and renders the responses.

To enable the `IChatClient` integration:

1. Set `EnableAIChatClient` to `true` in the Chat component.
1. Set other optional settings related to:
    * Name and image url for the `IChatClient` responses
    * [Manual AI response handling](#onairesponse-event)
    * [Response streaming](#stream-responses)
    * Message history
    * System prompt

See the [`ChatAIClientSettings` API reference](slug:Telerik.Blazor.Components.ChatAIClientSettings) for more information.

>caption Use Chat with a single registered IChatClient

<div class="skip-repl"></div>

````RAZOR Home.razor
<TelerikChat @ref="@ChatRef"
             EnableAIChatClient="true"
             AuthorId="user-id"
             Data="@ChatData"
             OnSendMessage="@OnChatSendMessage">
    <ChatSettings>
        <ChatAIClientSettings AIName="AI Assistant"
                              HistoryMessageCount="10" />
    </ChatSettings>
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Messages.Add(new() { AuthorId = "user-id", Text = args.Message });
    }
}
````
````C# Program.cs
IChatClient gpt5Client = new OpenAI.OpenAIClient()
    .GetChatClient("gpt-5.0")
    .AsIChatClient();

builder.Services.AddChatClient(gpt5Client);
````
````C# Message.cs
@[template](/_contentTemplates/chat/general.md#messagecs)
````

### OnAIResponse Event

You can have flexible control over the `IChatClient` replies and their rendering in the Chat. Subscribe to the `OnAIResponse` event in the `<ChatAIClientSettings>` tag inside `<ChatSettings>`. Use the event to receive, manupulate and add the AI response to the Chat component `Data`, similar to the [`OnSendMessage` event](slug:chat-events#onsendmessage). The `OnAIResponse` event argument is of type [`ChatAIResponseEventArgs`](slug:Telerik.Blazor.Components.ChatAIResponseEventArgs).

When using `OnAIResponse`, the Chat ignores the `AIName` and `AIImageUrl` parameters in `ChatAIClientSettings`.

````RAZOR.skip-repl
<TelerikChat @ref="@ChatRef"
             EnableAIChatClient="true"
             AuthorId="user-id"
             Data="@ChatData"
             OnSendMessage="@OnChatSendMessage">
    <ChatSettings>
        <ChatAIClientSettings OnAIResponse="@OnChatAIResponse" />
    </ChatSettings>
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Messages.Add(new() { AuthorId = "user-id", Text = args.Message });
    }

    private async Task OnChatAIResponse(ChatAIResponseEventArgs args)
    {
        Message newMessage = new() { AuthorId = "ai-id", AuthorName = "AI Assistant", IsTyping = true };

        Messages.Add(newMessage);

        if (args.Response is not null)
        {
            newMessage.Text = (await args.Response).Text;
            newMessage.IsTyping = false;
            ChatRef?.Refresh();
        }
    }
}
````

### Stream Responses

To stream the `IChatClient` responses, set `EnableStreaming` to `true` in `ChatAIClientSettings`.

>caption Use Chat with streamed IChatClient responses

````RAZOR.skip-repl
<TelerikChat EnableAIChatClient="true">
    <ChatSettings>
        <ChatAIClientSettings AIName="AI Assistant"
                              EnableStreaming="true" />
    </ChatSettings>
</TelerikChat>
````

When using the `OnAIResponse` event, iterate the `IAsyncEnumerable` `ResponseStream` event argument in the handler.

>caption Use Chat with streamed IChatClient responses and OnAIResponse event

````RAZOR.skip-repl
<TelerikChat EnableAIChatClient="true">
    <ChatSettings>
        <ChatAIClientSettings EnableStreaming="true"
                              OnAIResponse="@OnChatAIResponse" />
    </ChatSettings>
</TelerikChat>

@code {
    private async Task OnChatAIResponse(ChatAIResponseEventArgs args)
    {
        var newMessage = new() { AuthorId = "ai-id", AuthorName = "AI Assistant", IsTyping = true };

        Messages.Add(newMessage);

        if (args.ResponseStream is not null)
        {
            await foreach (ChatAIResponse chunk in args.ResponseStream)
            {
                newMessage.Text += chunk.Text;
                ChatRef?.Refresh();
            }
        }

        newMessage.IsTyping = false;
    }
}
````

### Multiple Instances

When the app has registered several `IChatClient` instances, then the `ChatClientKey` parameter of `ChatAIClientSettings` must point to the service key that matches the respective `AddKeyedChatClient("serviceKey")` method call in `Program.cs`.

>caption Use Chat with one of multiple registered IChatClient instances

<div class="skip-repl"></div>

````C# Program.cs
IChatClient gpt4Client = new OpenAI.OpenAIClient()
    .GetChatClient("gpt-4.1")
    .AsIChatClient();

IChatClient gpt5Client = new OpenAI.OpenAIClient()
    .GetChatClient("gpt-5.0")
    .AsIChatClient();

builder.Services.AddKeyedChatClient("gpt4.1", gptChat4Client);
builder.Services.AddKeyedChatClient("gpt5.0", gptChat5Client);
````
````RAZOR Home.razor
<TelerikChat @ref="@ChatRef"
             EnableAIChatClient="true"
             AuthorId="user-id"
             Data="@ChatData"
             OnSendMessage="@OnChatSendMessage">
    <ChatSettings>
        <ChatAIClientSettings AIName="AI Assistant"
                              ChatClientKey="@ChatServiceKey" />
    </ChatSettings>
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private string ChatServiceKey { get; set; } = "gpt5.0";

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Messages.Add(new Message() { AuthorId = "user-id", Text = args.Message });
    }
}
````
````C# Message.cs
@[template](/_contentTemplates/chat/general.md#messagecs)
````

## Chatbot

Chatbots are intelligent software solutions that replicate human-like conversations and can manage various tasks autonomously without requiring manual intervention.

You can connect the Chat component to various chatbot platforms including Microsoft Bot Framework, custom REST APIs, or third-party chatbot services. The component handles the user interface while your bot service processes messages and generates appropriate responses.

>tip The [Person to Bot demo](https://demos.telerik.com/blazor-ui/chat/person-to-bot) showcases chatbot functionality. This demo utilizes a Telerik-hosted AI service solely for illustration purposes. In production environments, you should develop your own AI service tailored to your specific business domain, requirements, and organizational needs.

### Suggested Actions

The Chat component supports suggested actions per message. This feature allows chatbots to provide quick reply options that users can click instead of typing responses manually. You can [bind the `SuggestedActionsField` parameter](slug:chat-data-binding#field-mapping) to a property of your Chat model class to display these interactive buttons. The default assumed value for the property name is `SuggestedActions`.

````RAZOR.skip-repl
<TelerikChat SuggestedActionsField="@nameof(MessageModel.MySuggestedActionsProperty)" />
````

## See Also

* [Live Demo: Chat AI Integration](https://demos.telerik.com/blazor-ui/chat/ai-integration)
* [Microsoft.Extensions.AI Documentation](https://learn.microsoft.com/en-us/dotnet/ai/)
