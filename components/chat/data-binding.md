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

<demo metaUrl="client/chat/data-binding/basic/" height="600"></demo>

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
| `IsFailedField` | Indicates if the message has failed | `"IsFailed"` |
| `IsPinnedField` | Indicaties if the message is pinned | `"IsPinned"` |
| `IsTypingField` | Indicaties if the message author is currently typing | `"IsTyping"` |
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

<demo metaUrl="client/chat/data-binding/dynamic/" height="600"></demo>

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat Integrations](slug:chat-integrations)
