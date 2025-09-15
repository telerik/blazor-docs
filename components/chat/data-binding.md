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
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage">
</TelerikChat>

@code {
    #region Component Parameters
    
    private List<ChatMessage> ChatData { get; set; }
    private string CurrentUserId { get; set; } = "user1";
    
    #endregion
    
    #region Lifecycle Methods
    
    protected override void OnInitialized()
    {
        ChatData = new List<ChatMessage>();
        
        for (int i = 1; i <= 2; i++)
        {
            ChatData.Add(new ChatMessage 
            { 
                Id = i.ToString(), 
                Text = i == 1 ? "Hello!" : "Hi there!", 
                AuthorId = i == 1 ? "user1" : "user2", 
                Timestamp = DateTime.Now.AddMinutes(-5 + (i * 2))
            });
        }
    }
    
    #endregion
    
    #region Methods
    
    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        };
        
        ChatData.Add(newMessage);
    }
    
    #endregion
    
    #region Class Declarations

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
    
    #endregion
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
| `ReplyToIdField` | Field containing the ID of replied message | `"ReplyToId"` |
| `SuggestedActionsField` | Field containing suggested actions | `"SuggestedActions"` |

## Dynamic Updates

The Chat component automatically reflects changes to the bound data collection. You can add, modify, or remove messages programmatically:

````Razor
<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             TextField="@nameof(ChatMessage.Content)"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage">
</TelerikChat>

<div style="margin-top: 20px;">
    <TelerikButton OnClick="@OnAddSystemMessageClick">Add System Message</TelerikButton>
    <TelerikButton OnClick="@OnClearMessagesClick">Clear All Messages</TelerikButton>
</div>

@code {
    #region Component References
    
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    
    #endregion
    
    #region Component Parameters
    
    private List<ChatMessage> ChatData { get; set; }
    private string CurrentUserId { get; set; } = "user1";
    
    #endregion
    
    #region Lifecycle Methods
    
    protected override void OnInitialized()
    {
        ChatData = new List<ChatMessage>();
    }
    
    #endregion
    
    #region Methods

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            AuthorId = CurrentUserId,
            AuthorName = "User",
            Timestamp = DateTime.Now
        };

        ChatData.Add(newMessage);

        ChatRef?.Refresh();
    }

    private void OnAddSystemMessageClick()
    {
        ChatData.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = "System notification: New user joined the chat",
            AuthorId = "system",
            AuthorName = "System",
            Timestamp = DateTime.Now
        });

        ChatRef?.Refresh();
    }

    private void OnClearMessagesClick()
    {
        ChatData.Clear();
        ChatRef?.Refresh();
    }
    
    #endregion
    
    #region Class Declarations

    public class ChatMessage
    {
        public string Id { get; set; }
        
        public string AuthorId { get; set; }
        
        public string AuthorName { get; set; }
        
        public string Content { get; set; }
        
        public DateTime Timestamp { get; set; }
        
        public string Status { get; set; }
        
        public IEnumerable<FileSelectFileInfo> Attachments { get; set; } = new List<FileSelectFileInfo>();
    }
    
    #endregion
}
````

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat Integrations](slug:chat-integrations)
