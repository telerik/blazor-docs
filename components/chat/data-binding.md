---
title: Data Binding
page_title: Chat Data Binding
description: Learn how to bind data to the Telerik UI for Blazor Chat component, including message models and dynamic updates.
slug: chat-data-binding
tags: telerik,blazor,chat,data-binding,messages
published: True
position: 2
components: ["chat"]
---
# Data Binding

The Telerik UI for Blazor Chat component supports data binding to collections of messages and provides flexible field mapping to accommodate different data models.

## Bind to Data

To bind the Chat to data, set its `Data` parameter to an `IEnumerable<T>` where `T` represents your message model. The Chat items have features that map to properties in the model. The following example uses property model names that work automatically, with no [additional field mapping](#field-mapping).

>caption Chat basic data binding

````RAZOR
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh">
</TelerikChat>

@code {
    private List<Message> ChatData { get; set; } = new();
    private string CurrentUserId { get; set; } = "user1";
    
    protected override void OnInitialized()
    {
        ChatData = new List<Message>();
        
        for (int i = 1; i <= 2; i++)
        {
            ChatData.Add(new Message 
            { 
                Text = i == 1 ? "Hello!" : "Hi there!", 
                AuthorId = i == 1 ? CurrentUserId : "user2", 
                Timestamp = DateTime.Now.AddMinutes(-5 + i)
            });
        }
    }
    
    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new Message
        {
            Text = args.Message,
            AuthorId = CurrentUserId
        };
        
        ChatData.Add(newMessage);
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## Field Mapping

The Chat component provides field mapping parameters to work with different data models. Use these parameters to specify which properties in your data model correspond to Chat features:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property Name | Description | Default Value |
|-----------|-------------|---------------|
| `TextField` | The message text content | `"Text"` |
| `AuthorIdField` | The author/user ID | `"AuthorId"` |
| `AuthorImageUrlField` | The author/user avatar image | `"AuthorImageUrl"` |
| `AuthorNameField` | The author display name | `"AuthorName"` |
| `TimestampField` | The message timestamp | `"Timestamp"` |
| `IdField` | the unique message ID | `"Id"` |
| `FilesField` | File attachments | `"Files"` |
| `StatusField` | Message status | `"Status"` |
| `IsDeletedField` | Indicates if the message is deleted | `"IsDeleted"` |
| `IsPinnedField` | Iindicaties if the message is pinned | `"IsPinned"` |
| `ReplyToIdField` | The ID of replied message | `"ReplyToId"` |
| `SuggestedActionsField` | Predefined quick replies | `"SuggestedActions"` |

>caption Using custom Chat model property names

````RAZOR.skip-repl
<TelerikChat AuthorIdField="@nameof(Message.UserId)"
             AuthorNameField="@nameof(Message.UserName)"
             TextField="@nameof(Message.Content)">
</TelerikChat>

@code {
    public class Message
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Sent";
    }
}
````

## Dynamic Updates

The Chat component automatically reflects changes to the bound data collection. You can add, modify, or remove messages programmatically.

````RAZOR
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@OnAddSystemMessageClick">Add System Message</TelerikButton>
<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@OnClearMessagesClick">Clear All Messages</TelerikButton>

<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage">
</TelerikChat>

@code {
    private TelerikChat<Message>? ChatRef { get; set; }
    
    private List<Message> ChatData { get; set; } = new();
    private string CurrentUserId { get; set; } = "user1";

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new Message
        {
            AuthorId = CurrentUserId,
            AuthorName = "User 1",
            Text = args.Message
        };

        ChatData.Add(newMessage);
    }

    private void OnAddSystemMessageClick()
    {
        ChatData.Add(new Message
        {
            AuthorId = "system",
            AuthorName = "System",
            Text = "System notification: New user joined the chat"
        });

        ChatRef?.Refresh();
    }

    private void OnClearMessagesClick()
    {
        ChatData.Clear();
        ChatRef?.Refresh();
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat Integrations](slug:chat-integrations)
