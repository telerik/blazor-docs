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

````razor
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
    
    private string CurrentUserId = "user1";

    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
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
        public string Text { get; set; }
        public string AuthorId { get; set; }
        public DateTime Timestamp { get; set; }
        public List<FileSelectFileInfo> Files { get; set; } = new List<FileSelectFileInfo>();
        public string Status { get; set; } = "Sent";
        public bool IsDeleted { get; set; }
        public bool IsPinned { get; set; }
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

>caption Custom field mapping

````razor
<TelerikChat Data="@Messages"
             TextField="Content"
             AuthorIdField="UserId"
             AuthorNameField="UserName"
             TimestampField="CreatedAt"
             FilesField="Attachments"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private List<CustomMessage> Messages { get; set; } = new List<CustomMessage>();
    private string CurrentUserId = "user1";

    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new CustomMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            UserId = CurrentUserId,
            UserName = "Current User",
            CreatedAt = DateTime.Now,
            Attachments = args.Files?.ToList() ?? new List<FileSelectFileInfo>()
        };
        
        Messages.Add(newMessage);
    }

    public class CustomMessage
    {
        public string Id { get; set; }
        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<FileSelectFileInfo> Attachments { get; set; }
    }
}
````

## Dynamic Updates

The Chat component automatically reflects changes to the bound data collection. You can add, modify, or remove messages programmatically:

````razor
<TelerikChat @ref="@ChatRef"
             Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

<div style="margin-top: 20px;">
    <TelerikButton OnClick="@AddSystemMessage">Add System Message</TelerikButton>
    <TelerikButton OnClick="@ClearMessages">Clear All Messages</TelerikButton>
</div>

@code {
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    private List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
    private string CurrentUserId = "user1";

    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        };
        
        Messages.Add(newMessage);
        ChatRef?.Refresh();
    }

    private void AddSystemMessage()
    {
        Messages.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = "System notification: New user joined the chat",
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
}
````

## Performance Considerations

For optimal performance with large datasets:

* Use observable collections like `ObservableCollection<T>` for automatic UI updates
* Consider implementing virtual scrolling for very large message histories
* Use efficient data structures for message lookup operations
* Implement paging or lazy loading for historical messages

## Next Steps

* [Learn about Chat events](slug:chat-events)
* [Configure message templates](slug:chat-customisation-overview)
* [Set up AI integrations](slug:chat-integrations-overview)

## See Also

* [Chat Overview](slug:chat-overview)
* [Live Demo: Chat Data Binding](https://demos.telerik.com/blazor-ui/chat/overview)
