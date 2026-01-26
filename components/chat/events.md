---
title: Events
page_title: Chat Events
description: Learn about the events exposed by the Telerik UI for Blazor Chat component for message handling, quick actions, uploads, and more.
slug: chat-events
tags: telerik,blazor,chat,events
published: True
position: 9
components: ["chat"]
---
# Chat Events

The Telerik UI for Blazor Chat component exposes various events that allow you to implement custom functionality and handle user interactions. This article lists the available events and provides examples for the most common use cases.

## OnSendMessage

The `OnSendMessage` event fires when a user sends a new message. Use this event to handle message processing, validation, and persistence.

After the event handler executes, the Chat automatically scrolls down to the last message.

>caption Handle the Chat OnSendMessage event

````RAZOR
<TelerikChat Data="@ChatData"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh">
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private string CurrentUserId { get; set; } = "user1";

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            AuthorId = CurrentUserId,
            Text = args.Message
            
        };

        ChatData.Add(newMessage);
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## OnSuggestionClick

The `OnSuggestionClick` event fires when a user clicks on a quick reply suggestion. You can use this event to customize suggestion handling.

If the handler adds new messages to the Chat, call the component `Refresh()` method to scroll down to the last message.

>caption Handle Chat suggestion clicks

````RAZOR
<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             AuthorId="@CurrentUserId"
             Suggestions="@ChatSuggestions"
             OnSuggestionClick="@OnChatSuggestionClick"
             Height="90vh">
</TelerikChat>

@code {
    private TelerikChat<Message>? ChatRef { get; set; }
    
    private List<Message> ChatData { get; set; } = new();

    private const string CurrentUserId = "user1";
    
    private List<string> ChatSuggestions { get; set; } = new();
    
    protected override void OnInitialized()
    {
        ChatData = new List<Message>();
        
        ChatSuggestions = new List<string>
        {
            "Request Project Status Update"
        };
    }

    private void OnChatSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        string responseMessage = string.Empty;

        if (args.Suggestion == "Request Project Status Update")
        {
            responseMessage = "Please provide the current status of all ongoing projects.";
        }

        ChatData.Add(new Message
        {
            AuthorId = CurrentUserId,
            AuthorName = "Jane Doe",
            Text = responseMessage,
            Status = "Sent"
        });

        ChatRef?.Refresh();
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## OnDownload

The `OnDownload` event fires when a user downloads files from a message. Use this event to handle file access, logging, or custom download logic.

>caption Handle Chat file downloads

````RAZOR.skip-repl
<TelerikChat Data="@ChatData"
             OnDownload="@OnChatDownload">
</TelerikChat>

@code {  
    private async Task OnChatDownload(ChatDownloadEventArgs args)
    {
        foreach (FileSelectFileInfo file in args.Files)
        {
            // Implement custom download logic
        }
    }
}
````

## OnMessageUnpin

The `OnMessageUnpin` event fires when a user unpins a message. Handle this event to update your data model and persist the change.

>caption Handle Chat message unpinning

````RAZOR.skip-repl
<TelerikChat Data="@ChatData"
             OnMessageUnpin="@OnChatMessageUnpin">
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private void OnChatMessageUnpin(ChatMessageUnpinEventArgs args)
    {
        var message = ChatData.First(m => m.Id == args.MessageId);

        message.IsPinned = false;
    }
}
````

## OnInputValueChanged

The `OnInputValueChanged` event fires when the input value changes. Use this for real-time validation, auto-save drafts, or typing indicators.

>caption Handle Chat input value changes

````RAZOR.skip-repl
<TelerikChat Data="@ChatData"
             InputValue="@ChatInputValue"
             OnInputValueChanged="@OnChatInputValueChanged">
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();

    private string ChatInputValue { get; set; } = string.Empty;

    private void OnChatInputValueChanged(string newValue)
    {
        ChatInputValue = newValue;
    }
}
````

## Event Arguments

The Chat events provide specific argument types with relevant data:

| Event | Arguments Type | Key Properties |
|-------|----------------|----------------|
| `OnSendMessage` | `ChatSendMessageEventArgs` | `Message`, `Files`, `ReplyMessageId` |
| `OnSuggestionClick` | `ChatSuggestionClickEventArgs` | `Suggestion`, `IsCancelled` |
| `OnDownload` | `ChatDownloadEventArgs` | `Files`, `MessageId` |
| `OnMessageUnpin` | `ChatMessageUnpinEventArgs` | `MessageId` |
| `OnInputValueChanged` | `string` | The current input value |

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat File Uploads and Media](slug:chat-file-uploads-and-media)
