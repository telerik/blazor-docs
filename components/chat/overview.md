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

The <a href="https://www.telerik.com/blazor-ui/chat" target="_blank">Telerik UI for Blazor Chat component</a> enables developers to build modern conversational interfaces in Blazor applications. It supports rich messaging, AI integrations, custom templates, file uploads, and accessibility features. The component is designed for extensibility, allowing integration with chatbots, LLMs, and custom business logic.

## Creating Blazor Chat

1. Add the `<TelerikChat>` tag to your page.
2. Set the `Data` parameter to a collection of messages.
3. Set the `AuthorId` parameter to identify the current user.
4. Subscribe to the `OnSendMessage` event to handle new messages.
5. (optional) Configure additional features like file uploads, speech-to-text, and quick actions.

>caption Basic configuration of the Telerik Chat

````razor
<TelerikChat Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage"
             TextField="Content"
             AuthorIdField="UserId"
             TimestampField="SentAt"
             Height="600px"
             Width="400px">
</TelerikChat>

@code {
    private List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    private string CurrentUserId = "user1";

    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            UserId = CurrentUserId,
            SentAt = DateTime.Now
        };
        
        Messages.Add(newMessage);
        await InvokeAsync(StateHasChanged);
    }

    public class ChatMessage
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public DateTime SentAt { get; set; }
        public List<FileSelectFileInfo> Attachments { get; set; }
    }
}
````

## Data Binding

The Chat component supports binding to collections of messages and user data. You can bind messages from a local source, a database, or a remote service. The component provides flexible field mapping to accommodate different data models. [Read more about Chat data binding...](slug:chat-data-binding)

## Messages

The Chat component offers rich messaging capabilities including context menus, toolbars, appearance customization, and persistence features. Messages can include text, files, and custom content. [Read more about Chat messages...](slug:chat-messages-overview)

## Templates and Customization

The Chat component provides extensive template support for customizing the appearance and behavior of messages, timestamps, suggestions, status indicators, message box, and header. [Read more about Chat customization...](slug:chat-customisation-overview)

## Integrations

Connect the Chat component with AI services, chatbots, and external APIs to create intelligent conversational experiences. The component supports integration with popular AI services and custom bot frameworks. [Read more about Chat integrations...](slug:chat-integrations-overview)

## File Uploads and Media

Enable file uploads and media sharing in your chat application. The component supports configurable file upload settings and speech-to-text functionality for enhanced user experience. [Read more about file uploads and media...](slug:chat-file-uploads-and-media)

## Events

The Chat component exposes various events that allow you to implement custom functionality and handle user interactions. Key events include message sending, file uploads, suggestion clicks, and message actions. [Read more about Chat events...](slug:chat-events)

## Accessibility

The Chat component is designed with accessibility in mind, supporting keyboard navigation, screen readers, and ARIA attributes. It follows WCAG 2.1 AA guidelines to ensure inclusive user experiences. [Read more about Chat accessibility...](slug:chat-accessibility-wai-aria-support)

## Chat Parameters

The Chat component provides a comprehensive set of parameters for customization:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<TItem>` | The data source for chat messages. |
| `AuthorId` | `string` | The ID of the current user sending messages. |
| `Height` | `string` | The height of the chat component in CSS units. |
| `Width` | `string` | The width of the chat component in CSS units. |
| `EnableFileUpload` | `bool` <br /> (`false`) | Enables file upload functionality in the chat input. |
| `EnableSpeechToText` | `bool` <br /> (`true`) | Enables speech-to-text functionality with microphone input. |
| `MessageWidthMode` | `MessageWidthMode` enum <br /> (`Standard`) | Controls the width behavior of messages (Standard or Full). |
| `Suggestions` | `IEnumerable<string>` | Collection of quick reply suggestions. |

## Chat Reference and Methods

The Chat component exposes methods for programmatic control:

* `Refresh()` - Refreshes the chat component and scrolls to the latest messages
* Keyboard navigation methods for accessible message navigation

To execute these methods, obtain reference to the Chat instance via `@ref`.

>caption How to obtain a Chat reference and call methods

````razor
<TelerikChat @ref="@ChatRef" 
             Data="@Messages"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

<TelerikButton OnClick="@RefreshChat">Refresh Chat</TelerikButton>

@code {
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    
    private void RefreshChat()
    {
        ChatRef?.Refresh();
    }
}
````

## Next Steps

* [Get started with Chat data binding](slug:chat-data-binding)
* [Configure Chat messages and tools](slug:chat-messages-overview)  
* [Customize Chat templates](slug:chat-customisation-overview)
* [Integrate Chat with AI services](slug:chat-integrations-overview)
* [Handle Chat events](slug:chat-events)
* [Configure file uploads and media](slug:chat-file-uploads-and-media)

## See Also

* [Live Demo: Chat](https://demos.telerik.com/blazor-ui/chat/overview)
* [Chat API Reference](slug:Telerik.Blazor.Components.TelerikChat-1)
