---
title: Endless Scrolling
page_title: Chat Endless Scrolling
description: Learn how to enable and configure endless scrolling in the Telerik Chat component for Blazor to load messages on demand.
slug: chat-endless-scrolling
tags: telerik,blazor,chat,endless,scrolling,paging,virtual,load-more
published: True
position: 6
tag: new
components: ["chat"]
---

# Chat Endless Scrolling

The Telerik UI for Blazor Chat component supports endless scrolling, which loads messages in pages as the user scrolls. The component renders a chunk of messages instead of the full dataset and then uses load on demand during scrolling. Endless scrolling supports two modes: client-side, where the component pages the `Data` collection automatically, and server-side, where the application supplies pages through the `OnLoadMoreMessages` event.

To enable endless scrolling:

1. Set `ScrollMode` to `ChatScrollMode.Endless`.
1. Optionally, set `PageSize` to the desired number of messages to load on demand. The default value is `20`.

On initialization, the Chat scrolls to the bottom and shows the latest messages. If the user scrolls up, the component loads older messages.

## Client-Side Endless Scrolling

In client-side mode, the component pages the `Data` collection automatically. No additional parameters or event handlers are required. Subscribe to [`OnLoadMoreMessages`](#loading-more-messages), if you want to detect changes in rendered message range.

>caption Chat with client-side endless scrolling

````RAZOR
<TelerikChat Data="@ChatMessages"
             AuthorId="1"
             ScrollMode="@ChatScrollMode.Endless"
             PageSize="20"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh"
             Width="400px" />

@code {
    private List<ChatMessage> ChatMessages { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 100; i++)
        {
            ChatMessages.Add(new ChatMessage
            {
                AuthorId = i % 2 == 0 ? "1" : "2",
                Text = $"Message {i}",
                Timestamp = DateTime.Now.AddMinutes(-100 + i)
            });
        }
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        ChatMessages.Add(new ChatMessage
        {
            AuthorId = "1",
            Text = args.Message
        });
    }

    public class ChatMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AuthorId { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
````

## Server-Side Endless Scrolling

In server-side mode, the Chat requests messages page by page. Use this mode when the full dataset is too large to be loaded into memory at once.

To use server-side endless scrolling, set the following parameters in addition to `ScrollMode`:

1. Set `Total` to the total number of messages in the full dataset. Update this value when users send new messages.
1. Set `StartIndex` to the index of the first message in the current `Data` collection.
1. Set `EndIndex` to the index of the last message in the current `Data`.
1. Subscribe to [`OnLoadMoreMessages`](#loading-more-messages) and update `Data`, `StartIndex`, and `EndIndex` in the handler.

>note The `StartIndex` and `EndIndex` parameters reflect the slice of the full dataset that is currently in `Data`. The component uses them to determine whether more pages exist and in which direction to load.

### Loading More Messages

The `OnLoadMoreMessages` event fires whenever the rendered message range changes.

The event arguments expose `StartIndex` and `EndIndex`, which define the full message range that should be rendered. Replace `Data` with the slice of the full dataset indicated by the args and update `StartIndex` and `EndIndex` to match.

After updating `Data`, `StartIndex`, and `EndIndex`, also update `RepliedToMessages` to include any reply-to source messages that are not in the current page.

### Navigating to Referenced Messages

The `OnReferencedMessageClick` event fires when the user clicks a pinned message banner or a reply-to reference. Use the `Id` property of the event args to locate the target message in the full dataset, then replace `Data`, `StartIndex`, and `EndIndex` to load the page that contains the target.

The component scrolls to the target message after `Data` is updated.

### Sending and Receiving Messages

When the user sends a message or the application receives one externally, add the message to both the full dataset and the current `Data` collection. Update `EndIndex` and `Total` to reflect the new count.

The component skips `OnLoadMoreMessages` when the last page is already displayed and scrolls to the new message automatically.

To trigger the same behavior for an externally received message, call `ChatRef.Refresh()` after updating `Data`.

>caption Receiving an external message during server-side endless scrolling

````RAZOR.skip-repl
private void ReceiveExternalMessage(ChatMessage newMessage)
{
    AllMessages.Add(newMessage);
    ChatMessages.Add(newMessage);
    ChatEndIndex = ChatStartIndex + ChatMessages.Count;
    TotalCount++; // if not a calculated property

    ChatRef?.Refresh();
}
````

### Example

>caption Chat with server-side endless scrolling

````RAZOR
<TelerikChat Data="@ChatMessages"
             AuthorId="1"
             ScrollMode="@ChatScrollMode.Endless"
             PageSize="@ChatPageSize"
             Total="@TotalCount"
             StartIndex="@ChatStartIndex"
             EndIndex="@ChatEndIndex"
             PinnedMessages="@ChatPinnedMessages"
             RepliedToMessages="@ChatRepliedToMessages"
             OnLoadMoreMessages="@OnChatLoadMoreMessages"
             OnReferencedMessageClick="@OnChatReferencedMessageClick"
             OnSendMessage="@OnChatSendMessage"
             Height="90vh"
             Width="400px" />

@code {
    private List<ChatMessage> AllMessages { get; set; } = new();
    private List<ChatMessage> ChatMessages { get; set; } = new();
    private List<ChatMessage> ChatPinnedMessages { get; set; } = new();
    private List<ChatMessage> ChatRepliedToMessages { get; set; } = new();

    private int TotalCount => AllMessages.Count;
    private int ChatPageSize { get; set; } = 20;
    private int ChatStartIndex { get; set; }
    private int ChatEndIndex { get; set; }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 200; i++)
        {
            AllMessages.Add(new ChatMessage
            {
                AuthorId = i % 2 == 0 ? "1" : "2",
                Text = $"Message {i}",
                Timestamp = DateTime.Now.AddMinutes(-200 + i)
            });
        }
    }

    private async Task OnChatLoadMoreMessages(ChatLoadMoreMessagesEventArgs args)
    {
        await Task.Delay(100); // simulate async data fetch

        ChatMessages = GetRange(args.StartIndex, args.EndIndex);
        ChatStartIndex = args.StartIndex;
        ChatEndIndex = args.EndIndex;

        UpdateRepliedToMessages();
    }

    private void OnChatReferencedMessageClick(ChatReferencedMessageClickEventArgs args)
    {
        var targetIndex = AllMessages.FindIndex(m => m.Id == args.Id);

        if (targetIndex < 0)
        {
            return;
        }

        var start = Math.Max(0, targetIndex - ChatPageSize / 2);
        var end = Math.Min(AllMessages.Count, start + ChatPageSize);

        ChatMessages = GetRange(start, end);
        ChatStartIndex = start;
        ChatEndIndex = end;

        UpdateRepliedToMessages();
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            AuthorId = "1",
            Text = args.Message
        };

        AllMessages.Add(newMessage);
        ChatMessages.Add(newMessage);
        ChatEndIndex = ChatStartIndex + ChatMessages.Count;
    }

    private List<ChatMessage> GetRange(int startIndex, int endIndex)
    {
        startIndex = Math.Max(0, Math.Min(startIndex, AllMessages.Count));
        endIndex = Math.Max(startIndex, Math.Min(endIndex, AllMessages.Count));

        return AllMessages.Skip(startIndex).Take(endIndex - startIndex).ToList();
    }

    private void UpdateRepliedToMessages()
    {
        // Populate RepliedToMessages with the messages referenced by reply-to
        // that may not be in the current Data page.
        ChatRepliedToMessages = AllMessages
            .Where(m => ChatMessages.Any(cm => cm.ReplyToId == m.Id) && !ChatMessages.Contains(m))
            .ToList();
    }

    public class ChatMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AuthorId { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string ReplyToId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
````

## Endless Scrolling Parameters

The parameters below are specific to endless scrolling. For the full list of Chat parameters, see the [Chat Overview](slug:chat-overview#chat-parameters).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `ScrollMode` | `ChatScrollMode` enum <br /> (`Scrollable`) | Sets the scroll behavior. `Scrollable` renders all messages. `Endless` enables paged loading. |
| `PageSize` | `int` <br /> (`20`) | The number of messages per page. Required when `ScrollMode` is `Endless`. |
| `EndlessScrollDebounceDelay` | `int` <br /> (`150`) | The debounce delay in milliseconds for the scroll handler. Controls how long the component waits after the user stops scrolling before checking whether a new page must be loaded. |
| `Total` | `int` | The total number of messages in the full dataset. Required when `OnLoadMoreMessages` is set. Ignored in client-side mode. |
| `StartIndex` | `int` | The index, in the full dataset, of the first message in `Data`. Update this value in the `OnLoadMoreMessages` handler as data changes. Required when `OnLoadMoreMessages` is set. |
| `EndIndex` | `int` | The index, in the full dataset, past the last message in `Data`. Update this value in the `OnLoadMoreMessages` handler as data changes. Required when `OnLoadMoreMessages` is set. |
| `PinnedMessages` | `IEnumerable<TItem>` | Pinned messages that may not be in the current `Data` page. The component displays the last item in the collection as the active pinned message banner. |
| `RepliedToMessages` | `IEnumerable<TItem>` | Messages referenced by reply-to that may not be in the current `Data` page. The component uses these to render reply previews. |
| `OnLoadMoreMessages` | `EventCallback<ChatLoadMoreMessagesEventArgs>` | Fires when the component needs a new page. Update `Data`, `StartIndex`, and `EndIndex` inside the handler. |
| `OnReferencedMessageClick` | `EventCallback<ChatReferencedMessageClickEventArgs>` | Fires when the user clicks a pinned message banner or a reply-to reference. Resolve the target message position and replace `Data`, `StartIndex`, and `EndIndex` to navigate to it. |

## See Also

* [Live Demo: Chat Endless Scrolling](https://demos.telerik.com/blazor-ui/chat/endless-scrolling)
* [Chat Data Binding](slug:chat-data-binding)
* [Chat Events](slug:chat-events)
