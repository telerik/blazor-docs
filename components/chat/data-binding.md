---
title: Data Binding
page_title: Chat Data Binding
description: Learn how to bind data to the Telerik UI for Blazor Chat component, including message models and dynamic updates.
slug: chat-data-binding
tags: telerik,blazor,chat,data-binding,messages
published: True
position: 2
---

# Data Binding

The Telerik UI for Blazor Chat component supports data binding to collections of messages and provides flexible field mapping to accommodate different data models.

## Bind to Data

To bind the Chat to data, set its `Data` parameter to an `IEnumerable<T>` where `T` represents your message model.

>caption Basic data binding

````Razor
<TelerikChat Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private List<ChatMessage> Messages { get; set; } = new List<ChatMessage>
    {
        new ChatMessage { Id = "1", Text = "Hello!", AuthorId = "user1", Timestamp = DateTime.Now.AddMinutes(-5) },
        new ChatMessage { Id = "2", Text = "Hi there!", AuthorId = "user2", Timestamp = DateTime.Now.AddMinutes(-3) }
    };
    
    private string CurrentUserId { get; set;  } = "user1";

    private void HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = args.Message,
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

        public string Text { get; set; }

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

## Field Mapping

The Chat component provides field mapping parameters to work with different data models. Use these parameters to specify which properties in your data model correspond to Chat features:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `TextField` | Field containing message text content | `"Text"` |
| `AuthorIdField` | Field containing the author/user ID | `"AuthorId"` |
| `AuthorNameField` | Field containing the author display name | `"AuthorName"` |
| `TimestampField` | Field containing the message timestamp | `"Timestamp"` |
| `IdField` | Field containing the unique message ID | `"Id"` |
| `FilesField` | Field containing file attachments | `"Files"` |
| `StatusField` | Field containing message status | `"Status"` |
| `IsDeletedField` | Field indicating if message is deleted | `"IsDeleted"` |
| `IsPinnedField` | Field indicating if message is pinned | `"IsPinned"` |
| `ReplyТоIdField` | Field containing the ID of replied message | `"ReplyТоId"` |
| `SuggestedActionsField` | Field containing suggested actions | `"SuggestedActions"` |

## Dynamic Updates

The Chat component automatically reflects changes to the bound data collection. You can add, modify, or remove messages programmatically:

````razor
<TelerikChat @ref="@Chat1"
             Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

<div style="margin-top: 20px;">
    <TelerikButton OnClick="@AddSystemMessage">Add System Message</TelerikButton>
    <TelerikButton OnClick="@ClearMessages">Clear All Messages</TelerikButton>
</div>

@code {
    private TelerikChat<ChatMessage> Chat1 { get; set; }
    private List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    private string CurrentUserId = "user1";

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

        Chat1?.Refresh();
    }

    private void AddSystemMessage()
    {
        Messages.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = "System notification: New user joined the chat",
            AuthorId = "system",
            Timestamp = DateTime.Now
        });

        ChatRef?.Refresh();
    }

    private void ClearMessages()
    {
        Messages.Clear();
        ChatRef?.Refresh();
    }

    public class ChatMessage
    {
        public string Id { get; set; }

        public string AuthorId { get; set; }

        public string AuthorName { get; set; }

        public string Content { get; set; }

        public DateTime Timestamp { get; set; }
    }
}

````

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat Integrations](slug:chat-integrations)
