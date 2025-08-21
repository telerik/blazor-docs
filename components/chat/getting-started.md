---
title: Getting Started
page_title: Chat Getting Started
description: Learn how to set up and configure the Telerik UI for Blazor Chat component in your application.
slug: chat-getting-started
tags: telerik,blazor,chat,setup,configuration
published: True
position: 1
---

# Getting Started with Telerik UI for Blazor Chat

This article explains how to get started with the Telerik Chat for Blazor. You will learn the steps to add the component to your application and configure its basic functionality.

After completing this guide, you will be able to use a basic Chat component as the one in the following example:

>caption Basic Chat configuration

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

## Prerequisites

Before adding the Chat component to your app, you must:

1. [Set up a Blazor project to use Telerik UI for Blazor](slug:getting-started/what-you-need).

## Add the TelerikChat to a Page

Follow these steps to add the Chat component to your Blazor application:

1. Add the `<TelerikChat>` tag to your `.razor` page.
2. Set the `Data` parameter to a collection that implements `IEnumerable<T>` where `T` is your message model.
3. Set the `AuthorId` parameter to identify the current user.
4. Handle the `OnSendMessage` event to process new messages.
5. (Optional) Configure field mappings using parameters like `TextField`, `AuthorIdField`, and `TimestampField`.
6. (Optional) Set the `Height` and `Width` parameters to control the component's size.

## Configure Data Fields

The Chat component supports flexible data field mapping through parameters:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `TextField` | Field containing message text | `"Text"` |
| `AuthorIdField` | Field containing author/user ID | `"AuthorId"` |
| `TimestampField` | Field containing message timestamp | `"Timestamp"` |
| `FilesField` | Field containing file attachments | `"Files"` |
| `IdField` | Field containing message ID | `"Id"` |
| `AuthorNameField` | Field containing author name | `"AuthorName"` |
| `StatusField` | Field containing message status | `"Status"` |

## Enable Additional Features

You can enable optional Chat features:

````razor
<TelerikChat Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage"
             EnableFileUpload="true"
             EnableSpeechToText="true"
             Suggestions="@QuickReplies"
             OnSuggestionClick="@HandleSuggestionClick">
</TelerikChat>

@code {
    private List<string> QuickReplies = new List<string> { "Hello", "How are you?", "Thank you" };
    
    private async Task HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        // Handle suggestion selection
    }
}
````

## Next Steps

* [Explore Chat data binding options](slug:chat-data-binding)
* [Configure Chat messages and tools](slug:chat-messages-overview)
* [Learn about Chat events](slug:chat-events)

## See Also

* [Chat Overview](slug:chat-overview)
* [Live Demo: Chat](https://demos.telerik.com/blazor-ui/chat/overview)
