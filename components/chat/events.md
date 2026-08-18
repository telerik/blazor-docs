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

<demo metaUrl="client/chat/events/on-send-message/" height="600"></demo>

## OnResendMessage

The `OnResendMessage` event fires when a user clicks the resend button of a failed message. Use this event to handle error message retry.

>caption Handle the Chat OnResendMessage event

<demo metaUrl="client/chat/events/on-resend-message/" height="600"></demo>

## OnSuggestionClick

The `OnSuggestionClick` event fires when a user clicks on a quick reply suggestion. You can use this event to customize suggestion handling.

If the handler adds new messages to the Chat, call the component `Refresh()` method to scroll down to the last message.

>caption Handle Chat suggestion clicks

<demo metaUrl="client/chat/events/suggestion-click/" height="600"></demo>

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
| `OnResendMessage` | `ChatResendMessageEventArgs` | `MessageId` |
| `OnSuggestionClick` | `ChatSuggestionClickEventArgs` | `Suggestion`, `IsCancelled` |
| `OnDownload` | `ChatDownloadEventArgs` | `Files`, `MessageId` |
| `OnMessageUnpin` | `ChatMessageUnpinEventArgs` | `MessageId` |
| `OnInputValueChanged` | `string` | The current input value |
| `OnLoadMoreMessages` | `ChatLoadMoreMessagesEventArgs` | `StartIndex`, `EndIndex` |
| `OnReferencedMessageClick` | `ChatReferencedMessageClickEventArgs` | `Id` |

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat File Uploads and Media](slug:chat-file-uploads-and-media)
