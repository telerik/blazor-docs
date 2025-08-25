---
title: Events
page_title: Chat Events
description: Learn about the events exposed by the Telerik UI for Blazor Chat component for message handling, quick actions, uploads, and more.
slug: chat-events
tags: telerik,blazor,chat,events
published: True
position: 5
---

# Chat Events

The Telerik UI for Blazor Chat component exposes various events that allow you to implement custom functionality and handle user interactions. This article lists the available events and provides examples for the most common use cases.

## OnSendMessage

The `OnSendMessage` event fires when a user sends a new message. Use this event to handle message processing, validation, and persistence.

>caption Handle the OnSendMessage event

````Razor
<TelerikChat Data="@Messages"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();

    private string CurrentUserId { get; set;  } = "user1";

    private void HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        };

        Messages.Add(newMessage);
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

## OnSuggestionClick

The `OnSuggestionClick` event fires when a user clicks on a quick reply suggestion. You can use this event to customize suggestion handling.

>caption Handle suggestion clicks

````Razor
<TelerikChat Data="@Messages"
             @ref="@Chat1"
             Suggestions="@QuickReplies"
             OnSuggestionClick="@HandleSuggestionClick">
</TelerikChat>

@code {
    private TelerikChat<ChatMessage> Chat1;

    private List<string> QuickReplies = new List<string>
    {
        "Request project status update"
    };

    private void HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        string responseMessage = string.Empty;

        if (args.Suggestion == "Request project status update")
        {
            responseMessage = "Could you please provide the current status of all ongoing projects?";
        }

        Messages.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "user2",
            AuthorName = "Jane Doe",
            Content = responseMessage,
            Status = "Sent",
            Timestamp = DateTime.Now
        });

        Chat1?.Refresh();
    }
}
````

## OnDownload

The `OnDownload` event fires when a user downloads files from a message. Use this event to handle file access, logging, or custom download logic.

>caption Handle file downloads

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             OnDownload="@HandleDownload">
</TelerikChat>

@code {
    private async Task HandleDownload(ChatDownloadEventArgs args)
    {
        foreach (var file in args.Files)
        {
            // Log download activity
            await LogFileDownload(file.Name, args.MessageId);
            
            // Implement custom download logic
            await ProcessFileDownload(file);
        }
    }
}
````

## OnMessageUnpin

The `OnMessageUnpin` event fires when a user unpins a message. Handle this event to update your data model and persist the change.

>caption Handle message unpinning

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             OnMessageUnpin="@HandleMessageUnpin">
</TelerikChat>

@code {
    private void HandleMessageUnpin(ChatMessageUnpinEventArgs args)
    {
        var message = Messages.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = false;
        }
    }
}
````

## OnInputValueChanged

The `OnInputValueChanged` event fires when the input value changes. Use this for real-time validation, auto-save drafts, or typing indicators.

>caption Handle input value changes

````RAZOR.skip-repl
<TelerikChat Data="@Messages"
             InputValue="@InputValue"
             OnInputValueChanged="@HandleInputChange">
</TelerikChat>

@code {
    private string InputValue { get; set; } = string.Empty;

    private void HandleInputChange(string value)
    {
        InputValue = value;
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
