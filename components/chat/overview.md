---
title: Overview
page_title: Chat Overview
description: Discover the Telerik UI for Blazor Chat component. Learn how to add the component to your app and explore its features like messaging, AI integration, customization, and accessibility.
slug: chat-overview
tags: telerik,blazor,chat,messaging,ai,accessibility
published: True
position: 0
---

# Blazor Chat Component Overview

The <a href="https://www.telerik.com/blazor-ui/chat-(conversational-ui)" target="_blank">Telerik UI for Blazor Chat component</a> enables developers to build modern conversational interfaces in Blazor applications. It supports rich messaging, AI integrations, custom templates, file uploads, and accessibility features. The component is designed for extensibility, allowing integration with chatbots, LLMs, and custom business logic.

## Creating Blazor Chat

1. Add the `<TelerikChat>` tag to your page.
1. Set the `Data` parameter to a collection of messages.
1. Set the `AuthorId` parameter to identify the current user.
1. Subscribe to the `OnSendMessage` event to handle new messages.
1. (optional) Configure additional settings like dimensions and speech-to-text support.
1. (optional) [Define the Chat model property names if they don't match the defaults](slug:chat-data-binding#field-mapping).

>caption Basic configuration of the Telerik Chat

````razor
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId"
             EnableSpeechToText="@ChatSpeechToTextEnabled"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh"
             Width="400px">
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();
    private string CurrentUserId { get; set; } = "user1";
    private bool ChatSpeechToTextEnabled { get; set; } = true;
    
    private async Task OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new Message
        {
            AuthorId = CurrentUserId,
            Text = args.Message
        };
        
        ChatData.Add(newMessage);
    }

    protected override void OnInitialized()
    {
        ChatData = new List<Message>();
        
        for (int i = 1; i <= 2; i++)
        {
            ChatData.Add(new Message
            {
                Text = i == 1 ? "Hello! How can I help you today?" : "Hi there! I'm looking for information about the new features.",
                AuthorId = i == 1 ? "assistant" : "user1",
                Timestamp = DateTime.Now.AddMinutes(-5 + i)
            });
        }
    }
 
@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## Data Binding

The Chat component supports binding to collections of messages and user data. The component provides flexible field mapping to accommodate different data models. [Read more about Chat data binding...](slug:chat-data-binding)

## Messages

The Chat component offers rich messaging capabilities including context menus, toolbars, appearance customization, and persistence features. Messages can include text, files, and custom content. [Read more about Chat messages...](slug:chat-messages)

## Templates and Customization

The Chat component provides extensive template support for customizing the appearance and behavior of messages, timestamps, suggestions, message box, and header. [Read more about Chat templates...](slug:chat-templates)

## Integrations

Connect the Chat component with AI services, chatbots, and external APIs to create intelligent conversational experiences. The component supports integration with popular AI services and custom bot frameworks. [Read more about Chat integrations...](slug:chat-integrations)

## File Uploads and Media

Enable file uploads and media sharing in your chat application. The component supports configurable file upload settings and speech-to-text functionality for enhanced user experience. [Read more about file uploads and media...](slug:chat-file-uploads-and-media)

## Events

The Chat component exposes various events that allow you to implement custom functionality and handle user interactions. Key events include message sending, file uploads, suggestion clicks, and message actions. [Read more about Chat events...](slug:chat-events)

## Chat Parameters

The Chat component provides a variety of parameters:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AttachmentsField` | `string` <br /> (`"Attachments"`) | The name of the field containing message file attachments. |
| `AuthorId` | `string` | The ID of the current user sending messages. |
| `AuthorIdField` | `string` <br /> (`"AuthorId"`) | The name of the field containing the author identifier. |
| `AuthorImageUrlField` | `string` <br /> (`"AuthorImageUrl"`) | The name of the field containing the author's avatar image URL. |
| `AuthorNameField` | `string` <br /> (`"AuthorName"`) | The name of the field containing the author display name. |
| `Data` | `IEnumerable<TItem>` | The data source for chat messages. |
| `EnableFileUpload` | `bool` <br /> (`false`) | Enables file upload functionality in the chat input. |
| `EnableScrollToBottom` | `bool` <br /> (`true`) | Enables a scroll to bottom button, which shows when there are messages below the currently visible ones. |
| `EnableSpeechToText` | `bool` <br /> (`true`) | Enables speech-to-text functionality with microphone input. |
| `Height` | `string` | The height of the chat component in CSS units. |
| `IsTypingField` | `string` | The name of the field that indicates whether a message represents a typing indicator. |
| `MessageFilesLayoutMode` | `ChatMessageFilesLayoutMode` enum <br /> (`Vertical`) | Controls how file attachments are displayed (Vertical, Horizontal, or Wrap). |
| `MessageWidthMode` | `MessageWidthMode` enum <br /> (`Standard`) | Controls the width behavior of messages (Standard or Full). |
| `SuggestedActionsLayoutMode` | `ChatSuggestedActionsLayoutMode` enum <br /> (`Wrap`) | Controls how suggested actions are displayed (Wrap, Scroll, or ScrollButtons). |
| `Suggestions` | `IEnumerable<string>` | Collection of quick reply suggestions. |
| `SuggestionsLayoutMode` | `ChatSuggestionsLayoutMode` enum <br /> (`Wrap`) | Controls how message suggestions are displayed (Wrap, Scroll, or ScrollButtons). |
| `TextField` | `string` <br /> (`"Text"`) | The name of the field containing the message content. |
| `TimestampField` | `string` <br /> (`"Timestamp"`) | The name of the field containing the message timestamp. |
| `Width` | `string` | The width of the chat component in CSS units. |

## Chat Reference and Methods

The Chat component exposes a `Refresh()` method that refreshes the  component and scrolls to the latest messages. To execute the method, obtain a reference to the Chat instance via `@ref`.

>caption How to obtain a Chat reference and call methods

````RAZOR.skip-repl
<TelerikChat @ref="@ChatRef" 
             Data="@ChatData"
             OnSendMessage="@OnChatSendMessage">
</TelerikChat>

<TelerikButton OnClick="@OnRefreshChatClick">Refresh Chat</TelerikButton>

@code {
    private TelerikChat<ChatMessage>? ChatRef { get; set; }
    
    private void OnRefreshChatClick()
    {
        ChatRef?.Refresh();
    }
}
````

## Next Steps

* [Get started with Chat data binding](slug:chat-data-binding)
* [Customize Chat templates](slug:chat-templates)
* [Handle Chat events](slug:chat-events)
* [Configure file uploads and media](slug:chat-file-uploads-and-media)

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
* [Live Demo: AI Integration](https://demos.telerik.com/blazor-ui/chat/ai-integration)
