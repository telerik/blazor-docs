---
title: Templates
page_title: Chat Templates
description: A comprehensive guide to the customizable templates available in the Telerik Chat component for Blazor.
slug: chat-templates
keywords: blazor, telerik, chat, templates, customization
published: True
position: 8
---

# Chat Templates

The Telerik Chat component in Blazor allows for a high degree of customization through various templates. Each template provides a way to customize the UI rendering of the Chat interface, making it more suitable for your application’s needs. 

Below are the available templates along with examplary usage.

## HeaderTemplate

This template allows you to customize the Chat header, where you can display titles, logos, or buttons.


````RAZOR.skip-repl
<HeaderTemplate>
    <span style="padding: 1rem; font-weight: 500;">
        Chat with John Smith
    </span>
</HeaderTemplate>
````

## MessageTemplate

Customize how individual messages are rendered within the Chat.

````RAZOR.skip-repl
<MessageTemplate>
    <div style="color:red;">
        @context.Message.Content
    </div>
</MessageTemplate>
````

## MessageStatusTemplate

You can use this template to display the status of a message (e.g., Sent, Seen).

````RAZOR.skip-repl
<MessageStatusTemplate>
    <div style="color:red;">
        @context.Message.Status
    </div>
</MessageStatusTemplate>
````

## SuggestionTemplate

This template allows you to customize how suggestion buttons are displayed in the Chat interface. Suggestions provide quick reply options for users.

````RAZOR.skip-repl
<SuggestionTemplate>
    <div style="color:blue;">
        @context.Suggestion
    </div>
</SuggestionTemplate>
````

## MessageBoxTemplate

This template allows you to customize the input area where users type their messages.

````RAZOR.skip-repl
<MessageBoxTemplate>
    <input type="text" class="k-textbox" placeholder="Type your message here..." @bind-value="@FirstChatInputValue" @bind-value:event="oninput" />
    <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" @onclick="@(() => OnSendMessage(new ChatSendMessageEventArgs { Message = FirstChatInputValue }, "1"))">Send</button>
</MessageBoxTemplate>
````

## TimestampTemplate

This template allows you to customize how timestamps are displayed for messages.

````RAZOR.skip-repl
<TimestampTemplate>
    <span style="font-size: 12px; color: #888;">
        @context.Timestamp.ToString("dddd, MMMM d, yyyy")
    </span>
</TimestampTemplate>
````

## ChatMessageContextMenuActions

This allows you to define context menu actions that can be performed on Chat messages.

````RAZOR.skip-repl
<ChatMessageContextMenuActions>
    <ChatMessageContextMenuAction Name="Reply" />
    <ChatMessageContextMenuAction Name="Copy" />
    <ChatMessageContextMenuAction Icon="@SvgIcon.Pin" OnClick="PinMessage" Text="Pin" />
</ChatMessageContextMenuActions>
````

## Complete Example

>caption A complete example that integrates all templates into a Chat component

````RAZOR.skip-repl
<TelerikChat Data="@ChatConversation"
            @ref="@Chat1"
            Width="600px"
            Height="700px"
            TextField="Content"
            Suggestions="@(new List<string>() { "Suggestion 1", "Suggestion 2" })"
            ReplyToIdField="ReplyToMessageId"
            InputValue="@FirstChatInputValue"
            EnableSpeechToText="true"
            AuthorId="@(1.ToString())">
    <HeaderTemplate>
        <span style="padding: 1rem; font-weight: 500;">
            Chat with John Smith
        </span>
    </HeaderTemplate>
    <MessageStatusTemplate>
        <div style="color:red;">
            @context.Message.Status
        </div>
    </MessageStatusTemplate>
    <MessageTemplate>
        <div style="color:red;">
            @context.Message.Content
        </div>
    </MessageTemplate>
    <SuggestionTemplate>
        <div style="color:blue;">
            @context.Suggestion
        </div>
    </SuggestionTemplate>
    <MessageBoxTemplate>
        <input type="text" class="k-textbox" placeholder="Type your message here..." @bind-value="@FirstChatInputValue" @bind-value:event="oninput" />
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" @onclick="@(() => OnSendMessage(new ChatSendMessageEventArgs { Message = FirstChatInputValue }, "1"))">Send</button>
    </MessageBoxTemplate>
    <TimestampTemplate>
        <span style="font-size: 12px; color: #888;">
            @context.Timestamp.ToString("dddd, MMMM d, yyyy")
        </span>
    </TimestampTemplate>
    <ChatMessageContextMenuActions>
        <ChatMessageContextMenuAction Name="Reply" />
        <ChatMessageContextMenuAction Name="Copy" />
        <ChatMessageContextMenuAction Icon="@SvgIcon.Pin" OnClick="PinMessage" Text="Pin" />
    </ChatMessageContextMenuActions>
</TelerikChat>

@code {

    private void OnUnpin(ChatMessageUnpinEventArgs args)
    {
        var message = ChatConversation.FirstOrDefault(x => x.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = false;
        }
        else
        {
            Console.WriteLine($"Message with ID {args.MessageId} not found.");
        }
    }

    private string FirstChatInputValue { get; set; }

    private void OnFirstInputValueChange(string value)
    {
        FirstChatInputValue = value;
    }

    private void PinMessage(ChatMessageActionClickEventArgs args)
    {
        var message = ChatConversation.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            ChatConversation.ForEach(m => m.IsPinned = false);
            message.IsPinned = true;
        }
    }

    private void OnSendMessage(ChatSendMessageEventArgs args, string authorId)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorName = authorId == "1" ? "John Smith" : "Jane Doe",
            AuthorId = authorId,
            AuthorImageUrl = authorId == "1" ? FirstUserImage : SecondUserImage,
            Content = args.Message,
            MessageToReplyId = args.ReplyMessageId,
            Status = "Sent",
            Timestamp = DateTime.Now
        };

        ChatConversation.Add(newMessage);
        RefreshChats();
    }

    private void RefreshChats()
    {
        Chat1?.Refresh();
    }

    private TelerikChat<ChatMessage> Chat1;

    private List<ChatMessage> ChatConversation = new List<ChatMessage>()
    {
       new ChatMessage()
       {
           Id="first",
           AuthorId="1",
           AuthorName="John Smith",
           AuthorImageUrl=FirstUserImage,
           Content="Hello, I wanted to confirm the details of the project update.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 0, 0)
       },
       new ChatMessage()
       {
           Id="second",
           AuthorId="2",
           AuthorName="Jane Doe",
           AuthorImageUrl=SecondUserImage,
           Content="Hi John, the project update has been finalized and shared with the team.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 5, 0)
       },
       new ChatMessage()
       {
           Id="third",
           AuthorId="1",
           AuthorName="John Smith",
           AuthorImageUrl=FirstUserImage,
           Content="Thank you, Jane. I will review it and provide feedback shortly.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 10, 0)
       },
       new ChatMessage()
       {
           Id="fourth",
           AuthorId="2",
           AuthorName="Jane Doe",
           AuthorImageUrl=SecondUserImage,
           Content="Sounds good, John. Let me know if you need any additional information.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 15, 0)
       }
    };

    private const string FirstUserImage = "images/user.webp";

    private const string SecondUserImage = "images/user.webp";

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

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
