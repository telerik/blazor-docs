---
title: Endless Scrolling
page_title: Chat Endless Scrolling
description: Learn how to enable and configure endless scrolling in the Telerik UI for Blazor Chat component. Covers client-side and server-side (on-demand) loading modes.
slug: chat-endless-scrolling
tags: telerik,blazor,chat,endless,scrolling,paging,virtual,load-more
published: True
position: 6
tag: new
components: ["chat"]
---

# Chat Endless Scrolling

The Telerik UI for Blazor Chat component supports endless scrolling, which loads messages in pages as the user scrolls. The component renders a window of messages instead of the full dataset. Endless scrolling supports two modes: client-side, where the component pages the `Data` collection automatically, and server-side, where the application supplies pages through the `OnLoadMoreMessages` event.

## Enabling Endless Scrolling

To enable endless scrolling:

1. Set `ScrollMode` to `ChatScrollMode.Endless`.
1. Set `PageSize` to the number of messages to load per page.

The component starts scrolled to the bottom (latest messages) and loads older pages as the user scrolls up.

## Client-Side Endless Scrolling

In client-side mode, the component pages the `Data` collection automatically. No additional parameters or event handlers are required.

>caption Chat with client-side endless scrolling

````RAZOR
<TelerikChat Data="@ChatMessages"
             ScrollMode="@ChatScrollMode.Endless"
             PageSize="20"
             OnSendMessage="@OnChatSendMessage"
             AuthorId="1" />

@code {
    private List<ChatMessage> ChatMessages { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 100; i++)
        {
            ChatMessages.Add(new ChatMessage
            {
                Id = i.ToString(),
                AuthorId = i % 2 == 0 ? "1" : "2",
                Content = $"Message {i}",
                Timestamp = DateTime.Now.AddMinutes(-100 + i)
            });
        }
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        ChatMessages.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "1",
            Content = args.Message,
            Timestamp = DateTime.Now
        });
    }

    public class ChatMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AuthorId { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
````

## Server-Side Endless Scrolling

In server-side mode, the application controls which page of messages is loaded. This mode is required when the full dataset is large and must not be loaded into memory at once, for example, when loading messages from a database.

To use server-side endless scrolling, in addition to `ScrollMode` and `PageSize`:

1. Set `Total` to the total number of messages in the full dataset.
1. Set `StartIndex` to the index of the first message currently in `Data`.
1. Set `EndIndex` to the index past the last message currently in `Data`.
1. Subscribe to `OnLoadMoreMessages` and update `Data`, `StartIndex`, and `EndIndex` in the handler.

>note The `StartIndex` and `EndIndex` parameters reflect the slice of the full dataset that is currently in `Data`. The component uses them to determine whether more pages exist and in which direction to load.

>caption Chat with server-side endless scrolling

````RAZOR
<TelerikChat @ref="@ChatRef"
                Data="@ChatMessages"
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
                AuthorId="1"
                Height="600px"
                Width="400px" />

@code {
    private TelerikChat<ChatMessage> ChatRef { get; set; }

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
                Id = i.ToString(),
                AuthorId = i % 2 == 0 ? "1" : "2",
                Content = $"Message {i}",
                Timestamp = DateTime.Now.AddMinutes(-200 + i)
            });
        }
    }

    private async Task OnChatLoadMoreMessages(ChatLoadMoreMessagesEventArgs args)
    {
        await Task.Delay(100); // simulate async data fetch

        if (ChatMessages.Count > 0 && args.EndIndex == ChatStartIndex)
        {
            // Prepend: user scrolled up
            var page = GetRange(args.StartIndex, args.EndIndex);
            ChatMessages.InsertRange(0, page);
            ChatStartIndex = args.StartIndex;
        }
        else if (ChatMessages.Count > 0 && args.StartIndex == ChatEndIndex)
        {
            // Append: user scrolled down
            var page = GetRange(args.StartIndex, args.EndIndex);
            ChatMessages.AddRange(page);
            ChatEndIndex = args.EndIndex;
        }
        else
        {
            // Replace: initial load, scroll-to-bottom, send while not on last batch
            ChatMessages = GetRange(args.StartIndex, args.EndIndex);
            ChatStartIndex = args.StartIndex;
            ChatEndIndex = args.EndIndex;
        }

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
            Id = Guid.NewGuid().ToString(),
            AuthorId = "1",
            Content = args.Message,
            Timestamp = DateTime.Now
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
        public string Content { get; set; } = string.Empty;
        public string ReplyToId { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
````

### Loading More Messages

The `OnLoadMoreMessages` event fires when the component needs a new page of messages. The event args expose `StartIndex` and `EndIndex`, which define the requested range in the full dataset.

The handler determines the merge action by comparing the event args to the current `StartIndex` and `EndIndex` values:

* If `args.EndIndex == StartIndex` — the user scrolled up and older messages must be added to the top.
* If `args.StartIndex == EndIndex` — the user scrolled down and newer messages must be added to the bottom.
* In any other case — replace `Data` with the new page and reset both `StartIndex` and `EndIndex`. This covers the initial load, a scroll-to-bottom action, or sending a message while a non-last page is displayed.

After updating `Data`, `StartIndex`, and `EndIndex`, also update `RepliedToMessages` to include any reply-to source messages that are not in the current page.

### Navigating to Referenced Messages

The `OnReferencedMessageClick` event fires when the user clicks a pinned message banner or a reply-to reference. Use the `Id` property of the event args to locate the target message in the full dataset, then replace `Data`, `StartIndex`, and `EndIndex` to load the page that contains the target.

The component scrolls to the target message after `Data` is updated.

### Sending and Receiving Messages

When the user sends a message or the application receives one externally, add the message to both the full dataset and the current `Data` collection. Update `EndIndex` to reflect the new count.

The component skips `OnLoadMoreMessages` when the last page is already displayed and scrolls to the new message automatically.

To trigger the same behavior for an externally received message, call `ChatRef.Refresh()` after updating `Data`.

>caption Receiving an external message during server-side endless scrolling

````RAZOR.skip-repl
private void ReceiveExternalMessage(ChatMessage newMessage)
{
    AllMessages.Add(newMessage);
    ChatMessages.Add(newMessage);
    ChatEndIndex = ChatStartIndex + ChatMessages.Count;

    ChatRef?.Refresh();
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
