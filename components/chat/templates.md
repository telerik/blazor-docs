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

## NoDataTemplate

The `NoDataTemplate` lets you to define custom content displayed when the Chat has no messages. This is useful for showing welcome messages, instructions, or branding when the conversation is empty.

````RAZOR.skip-repl
<NoDataTemplate>
    <p><strong style="color: var(--kendo-color-primary);">No Messages Available.</strong></p>
    <p>Start a conversation by typing a message below!</p>
</NoDataTemplate>
````

## MessageContentTemplate

The `MessageContentTemplate` provides the option to customize how individual message content is rendered within the Chat.

````RAZOR.skip-repl
<MessageContentTemplate>
    <div style="color:red;">
        @context.Message.Content
    </div>
</MessageContentTemplate>
````

## AuthorMessageContentTemplate

The `AuthorMessageContentTemplate` allows you to customize the appearance of message content for messages sent by the current user (author). This template takes precedence over `MessageContentTemplate` when defined, enabling different styling for sent versus received messages.

````RAZOR.skip-repl
<AuthorMessageContentTemplate>
    <div style="color: blue; font-weight: bold;">
        @context.Message.Content
    </div>
</AuthorMessageContentTemplate>
````

## ReceiverMessageContentTemplate

The `ReceiverMessageContentTemplate` allows you to customize the appearance of message content for messages received from other users. This template takes precedence over `MessageContentTemplate` when defined, providing flexibility to style incoming messages differently.

````RAZOR.skip-repl
<ReceiverMessageContentTemplate>
    <div style="color: green; font-style: italic;">
        @context.Message.Content
    </div>
</ReceiverMessageContentTemplate>
````

## MessageTemplate

The `MessageTemplate` allows you to customize the entire message bubble rendering, including the wrapper and structure around the message content. This provides complete control over the message appearance.

````RAZOR.skip-repl
<MessageTemplate>
    <div class="custom-message-bubble">
        <div class="message-header">@context.Message.AuthorName</div>
        <div class="message-body">@context.Message.Content</div>
    </div>
</MessageTemplate>
````

## AuthorMessageTemplate

The `AuthorMessageTemplate` allows you to customize the entire message bubble for messages sent by the current user (author). This template takes precedence over `MessageTemplate` when defined, enabling control over the author's message structure and appearance.

````RAZOR.skip-repl
<AuthorMessageTemplate>
    <div class="author-message-bubble" style="background: #e3f2fd;">
        <div class="message-content">@context.Message.Content</div>
        <div class="message-time">@context.Message.Timestamp.ToString("hh:mm tt")</div>
    </div>
</AuthorMessageTemplate>
````

## ReceiverMessageTemplate

The `ReceiverMessageTemplate` allows you to customize the entire message bubble for messages received from other users. This template takes precedence over `MessageTemplate` when defined, providing the option to specify how incoming messages are structured and displayed.

````RAZOR.skip-repl
<ReceiverMessageTemplate>
    <div class="receiver-message-bubble" style="background: #f5f5f5;">
        <div class="sender-name">@context.Message.AuthorName</div>
        <div class="message-content">@context.Message.Content</div>
        <div class="message-time">@context.Message.Timestamp.ToString("hh:mm tt")</div>
    </div>
</ReceiverMessageTemplate>
````

## UserStatusTemplate

The `UserStatusTemplate` allows you to render custom content next to the user avatar, such as status badges, indicators, or icons. This is useful for showing user availability (online, away, busy) or other contextual information.

````RAZOR.skip-repl
<UserStatusTemplate>
    @if (context.Message.AuthorStatus == "online")
    {
        <span class="status-badge" style="background: green; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
    }
    else if (context.Message.AuthorStatus == "away")
    {
        <span class="status-badge" style="background: orange; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
    }
</UserStatusTemplate>
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
    <input type="text" class="k-textbox" placeholder="Type your message here..." @bind-value="@ChatInputValue" @bind-value:event="oninput" />
    <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" @onclick="@( () => OnChatSendMessage(new ChatSendMessageEventArgs { Message = ChatInputValue }) )">Send</button>
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

````RAZOR
<TelerikChat Data="@ChatData"
             @ref="@ChatRef"
             Width="600px"
             Height="700px"
             TextField="@nameof(ChatMessage.Content)"
             Suggestions="@ChatSuggestions"
             ReplyToIdField="@nameof(ChatMessage.MessageToReplyId)"
             InputValue="@ChatInputValue"
             EnableSpeechToText="@ChatSpeechToTextEnabled"
             AuthorId="@CurrentUserId">
    <HeaderTemplate>
        <span style="padding: 1rem; font-weight: 500;">
            Chat with John Smith
        </span>
    </HeaderTemplate>
    <NoDataTemplate>
        <p><strong style="color: var(--kendo-color-primary);">No Messages Available.</strong></p>
    </NoDataTemplate>
    <MessageStatusTemplate>
        <div style="color:red;">
            @context.Message.Status
        </div>
    </MessageStatusTemplate>
    <AuthorMessageContentTemplate>
        <div style="color:blue;">
            @context.Message.Content
        </div>
    </AuthorMessageContentTemplate>
    <ReceiverMessageContentTemplate>
        <div style="color:green;">
            @context.Message.Content
        </div>
    </ReceiverMessageContentTemplate>
    <UserStatusTemplate>
        @if (context.Message.AuthorStatus == "online")
        {
            <span style="background: green; width: 10px; height: 10px; border-radius: 50%; display: inline-block;"></span>
        }
    </UserStatusTemplate>
    <SuggestionTemplate>
        <div style="color:blue;">
            @context.Suggestion
        </div>
    </SuggestionTemplate>
    <MessageBoxTemplate>
        <input type="text" class="k-textbox" placeholder="Type your message here..." @bind-value="@ChatInputValue" @bind-value:event="oninput" />
        <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" @onclick="@( () => OnChatSendMessage(new ChatSendMessageEventArgs { Message = ChatInputValue }, CurrentUserId) )">Send</button>
    </MessageBoxTemplate>
    <TimestampTemplate>
        <span style="font-size: 12px; color: #888;">
            @context.Timestamp.ToString("dddd, MMMM d, yyyy")
        </span>
    </TimestampTemplate>
    <ChatMessageContextMenuActions>
        <ChatMessageContextMenuAction Name="Reply" />
        <ChatMessageContextMenuAction Name="Copy" />
        <ChatMessageContextMenuAction Icon="@SvgIcon.Pin" OnClick="@OnPinMessageClick" Text="Pin" />
    </ChatMessageContextMenuActions>
</TelerikChat>

@code {
    #region Component References
    
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    
    #endregion
    
    #region Component Parameters
    
    private const string FirstUserImage = "images/user.webp";
    private const string SecondUserImage = "images/user.webp";
    private List<ChatMessage> ChatData { get; set; } = new();
    private List<string> ChatSuggestions { get; set; }
    private string ChatInputValue { get; set; }
    private string CurrentUserId { get; set; } = "1";
    private bool ChatSpeechToTextEnabled { get; set; } = true;
    
    #endregion
    
    #region Lifecycle Methods
    
    protected override void OnInitialized()
    {
        GenerateChatData();
        
        ChatSuggestions = new List<string> { "Suggestion 1", "Suggestion 2" };
    }
    
    #endregion
    
    #region Methods

    private void OnChatMessageUnpin(ChatMessageUnpinEventArgs args)
    {
        var message = ChatData.FirstOrDefault(x => x.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = false;
        }
        else
        {
            Console.WriteLine($"Message with ID {args.MessageId} not found.");
        }
    }

    private void OnChatInputValueChanged(string newValue)
    {
        ChatInputValue = newValue;
    }

    private void OnPinMessageClick(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            ChatData.ForEach(m => m.IsPinned = false);
            message.IsPinned = true;
        }
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args, string authorId)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorName = authorId == "1" ? "John Smith" : "Jane Doe",
            AuthorId = authorId,
            Content = args.Message,
            MessageToReplyId = args.ReplyMessageId,
            Status = "Sent",
            Timestamp = DateTime.Now
        };

        ChatData.Add(newMessage);
        RefreshChat();
    }

    private void RefreshChat()
    {
        ChatRef?.Refresh();
    }
    
    #endregion
    
    #region Data Generation

    private void GenerateChatData()
    {
        ChatData = new List<ChatMessage>();
        
        var messageTexts = new[]
        {
            "Hello, I wanted to confirm the details of the project update.",
            "Hi John, the project update has been finalized and shared with the team.",
            "Thank you, Jane. I will review it and provide feedback shortly.",
            "Sounds good, John. Let me know if you need any additional information."
        };
        
        for (int i = 1; i <= 4; i++)
        {
            ChatData.Add(new ChatMessage
            {
                Id = $"message{i}",
                AuthorId = (i % 2 == 1) ? "1" : "2",
                AuthorName = (i % 2 == 1) ? "John Smith" : "Jane Doe",
                Content = messageTexts[i - 1],
                Status = "Seen",
                Timestamp = new DateTime(2023, 10, 1, 12, 0, 0).AddMinutes(i * 5)
            });
        }
    }
    
    #endregion
    
    #region Class Declarations

    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImageUrl { get; set; }
        public string AuthorStatus { get; set; }
        public string Content { get; set; }
        public string MessageToReplyId { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPinned { get; set; }
        public bool IsTyping { get; set; }
        public DateTime Timestamp { get; set; }
        public List<string> SuggestedActions { get; set; }
        public IEnumerable<FileSelectFileInfo> Attachments { get; set; } = new List<FileSelectFileInfo>();
    }
    
    #endregion
}
````

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
