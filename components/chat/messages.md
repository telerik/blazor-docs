---
title: Messages
page_title: Chat Messages
description: Learn how to configure message actions, styling, and behavior in the Telerik UI for Blazor Chat component.
slug: chat-messages
tags: telerik,blazor,chat,messages,actions,styling
published: True
position: 5
---

# Chat Messages

The Telerik UI for Blazor Chat component provides comprehensive control over message display, interactions, and styling to create rich conversational experiences.

## Typing Indicator

The Chat component supports displaying a typing indicator to show when another user is composing a message. Set the `IsTypingField` parameter to specify which field in your data model indicates typing status, and set that field to `true` on a message to display the typing indicator instead of message content.

````Razor
<TelerikButton OnClick="@AddTypingMessage">Show Typing Indicator</TelerikButton>

<TelerikChat Data="@ChatData"
             @ref="@ChatRef"
             AuthorId="@CurrentUserId"
             IsTypingField="@nameof(ChatMessage.IsTyping)"
             OnSendMessage="@OnChatSendMessage">
</TelerikChat>

@code {
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    private List<ChatMessage> ChatData { get; set; } = new();
    private string CurrentUserId { get; set; } = "user1";

    private void AddTypingMessage()
    {
        var typingMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = null,
            AuthorId = "support",
            AuthorName = "Support Agent",
            Timestamp = DateTime.Now,
            IsTyping = true
        };

        ChatData.Add(typingMessage);
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        ChatData.RemoveAll(m => m.IsTyping);
        
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        };

        ChatData.Add(newMessage);
        ChatRef?.Refresh();
    }

    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
        public bool IsTyping { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
````

When a message has `IsTyping` set to `true`, the Chat will display an animated typing indicator (typically three dots) instead of the message content. This provides visual feedback that enhances the conversational experience, especially in real-time chat scenarios.

## Context Menu Message Actions

Configure context menu actions that appear when users right-click on messages. These actions provide quick access to common message operations.

````Razor
<TelerikChat Data="@ChatData"
             @ref="@ChatRef"
             Width="600px"
             Height="700px"
             TextField="@nameof(ChatMessage.Content)"
             AuthorId="@CurrentUserId">
    <ChatMessageContextMenuActions>
        <ChatMessageContextMenuAction Name="Reply" Text="Reply" Icon="@SvgIcon.Undo" OnClick="@OnReplyClick" />
        <ChatMessageContextMenuAction Name="Copy" Text="Copy" Icon="@SvgIcon.Copy" OnClick="@OnCopyClick" />
        <ChatMessageContextMenuAction Name="Pin" Text="Pin" Icon="@SvgIcon.Pin" OnClick="@OnPinClick" />
        <ChatMessageContextMenuAction Name="Delete" Text="Delete" Icon="@SvgIcon.Trash" OnClick="@OnDeleteClick" />
    </ChatMessageContextMenuActions>
</TelerikChat>

@code {
    #region Component References
    
    private TelerikChat<ChatMessage>? ChatRef { get; set; }
    
    #endregion
    
    #region Component Parameters
    
    private List<ChatMessage> ChatData { get; set; } = new();
    private string CurrentUserId { get; set; } = "1";
    
    #endregion
    
    #region Lifecycle Methods
    
    protected override void OnInitialized()
    {
        GenerateChatData();
    }
    
    #endregion
    
    #region Methods

    private void OnReplyClick(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            // Set up reply context
            Console.WriteLine($"Replying to message: {message.Content}");
        }
    }

    private void OnCopyClick(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            // Copy message content to clipboard
            Console.WriteLine($"Copying message: {message.Content}");
        }
    }

    private void OnPinClick(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = !message.IsPinned;
            ChatRef?.Refresh();
        }
    }

    private void OnDeleteClick(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            message.IsDeleted = true;
            ChatRef?.Refresh();
        }
    }
    
    #endregion
    
    #region Data Generation

    private void GenerateChatData()
    {
        ChatData = new List<ChatMessage>();
        
        var messageTexts = new[]
        {
            "Hello, how are you today?",
            "Hi John! I'm doing great, thanks for asking."
        };
        
        for (int i = 1; i <= 2; i++)
        {
            ChatData.Add(new ChatMessage
            {
                Id = i.ToString(),
                AuthorId = i.ToString(),
                AuthorName = i == 1 ? "John Smith" : "Jane Doe",
                Content = messageTexts[i - 1],
                Status = "Seen",
                Timestamp = DateTime.Now.AddMinutes(-10 + (i * 2))
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
        public string Content { get; set; }        
        public string ReplyToMessageId { get; set; }        
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

## Toolbar Message Actions

Configure toolbar actions that appear when messages are selected or hovered. These provide quick access to frequently used operations.

````RAZOR.skip-repl
<TelerikChat>
    <ChatMessageToolbarActions>
        <ChatMessageToolbarAction Name="React" Text="React" Icon="@SvgIcon.Heart" OnClick="@OnReactClick" />
        <ChatMessageToolbarAction Name="Forward" Text="Forward" Icon="@SvgIcon.Forward" OnClick="@OnForwardClick" />
        <ChatMessageToolbarAction Name="Quote" Text="Quote" Icon="@SvgIcon.Quote" OnClick="@OnQuoteClick" />
    </ChatMessageToolbarActions>
</TelerikChat>
````

## Messages Styling

The Chat component provides several styling options for messages, allowing you to customize their appearance, behavior, and layout to match your application's design.

### Expanding and Collapsing Messages

Control message collapsing behavior using the `EnableMessageCollapse` parameter. When enabled, long messages can be collapsed to save space and expanded when needed for better readability.

Set `EnableMessageCollapse="true"` to allow users to collapse and expand messages in the chat interface.

### Messages Width

Control the width behavior of chat messages using the `MessageWidthMode` parameter:

* `MessageWidthMode.Standard` - Messages take up a portion of the available space for better readability (default behavior)
* `MessageWidthMode.Full` - Messages span the full width of the chat container

## Author and Receiver Message Settings

The Chat component allows you to configure settings specifically for author messages (sent by the current user) and receiver messages (received from other users) using `ChatAuthorMessageSettings` and `ChatReceiverMessageSettings` components. These settings take precedence over global Chat settings, enabling different configurations for sent and received messages.

Use these settings to customize message behavior, appearance, and available actions based on whether the message was sent or received. For example, you might want different context menu actions, toolbar actions, or file actions for your own messages versus messages from others.

````Razor
<TelerikChat Data="@ChatData"
             @ref="@ChatRef"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage">
    <ChatSettings>
        <ChatAuthorMessageSettings EnableMessageCollapse="true"
                                   MessageWidthMode="@MessageWidthMode.Full">
            <ChatMessageContextMenuActions>
                <ChatMessageContextMenuAction Name="Edit" Text="Edit" Icon="@SvgIcon.Pencil" />
                <ChatMessageContextMenuAction Name="Delete" Text="Delete" Icon="@SvgIcon.Trash" />
            </ChatMessageContextMenuActions>
            <ChatMessageToolbarActions>
                <ChatMessageToolbarAction Icon="@SvgIcon.Pin" OnClick="@PinMessage" Text="Pin My Message" />
            </ChatMessageToolbarActions>
            <ChatFileActions>
                <ChatFileAction Name="Download" Text="Download My File" />
            </ChatFileActions>
        </ChatAuthorMessageSettings>

        <ChatReceiverMessageSettings EnableMessageCollapse="false"
                                     MessageWidthMode="@MessageWidthMode.Standard">
            <ChatMessageContextMenuActions>
                <ChatMessageContextMenuAction Name="Reply" Text="Reply" Icon="@SvgIcon.Undo" />
                <ChatMessageContextMenuAction Name="Forward" Text="Forward" Icon="@SvgIcon.Forward" />
            </ChatMessageContextMenuActions>
            <ChatMessageToolbarActions>
                <ChatMessageToolbarAction Icon="@SvgIcon.Heart" OnClick="@ReactToMessage" Text="Like" />
            </ChatMessageToolbarActions>
            <ChatFileActions>
                <ChatFileAction Name="Download" Text="Download Shared File" />
            </ChatFileActions>
        </ChatReceiverMessageSettings>
    </ChatSettings>
</TelerikChat>

@code {
    private TelerikChat<ChatMessage> ChatRef { get; set; }
    private List<ChatMessage> ChatData { get; set; } = new()
    {
        new ChatMessage()
        {
            Id = "1",
            AuthorId = "support",
            Content = "Hello! How can I assist you today?",
            Timestamp = DateTime.Now.AddMinutes(-10)
        },
        new ChatMessage()
        {
            Id = "2",
            AuthorId = "user1",
            Content = "Hi, I have a question about the new features.",
            Timestamp = DateTime.Now.AddMinutes(-5)
        }
    };
    private string CurrentUserId { get; set; } = "user1";

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        };

        ChatData.Add(newMessage);
    }

    private void PinMessage(ChatMessageActionClickEventArgs args)
    {
        var message = ChatData.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = true;
            ChatRef?.Refresh();
        }
    }

    private void ReactToMessage(ChatMessageActionClickEventArgs args)
    {
        Console.WriteLine($"Liked message: {args.MessageId}");
    }

    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string Content { get; set; }
        public bool IsPinned { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
````

Available settings for both `ChatAuthorMessageSettings` and `ChatReceiverMessageSettings`:

* `EnableMessageCollapse` - Enables the collapse functionality for long messages
* `MessageWidthMode` - Controls message width (`Standard` or `Full`)
* `ChatMessageContextMenuActions` - Define context menu actions for right-click interactions
* `ChatMessageToolbarActions` - Define toolbar actions that appear on hover or selection
* `ChatFileActions` - Define actions available for file attachments

If no author or receiver-specific setting is provided, the component falls back to the global Chat settings.

## Send Message Button Customization

Customize the appearance of the send message button using the `ChatSendMessageButtonSettings` component. The `Class` parameter allows you to apply custom CSS classes for styling.

````Razor
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId"
             OnSendMessage="@OnChatSendMessage">
    <ChatSettings>
        <ChatSendMessageButtonSettings Class="custom-send-button" />
    </ChatSettings>
</TelerikChat>

<style>
    .custom-send-button {
        background-color: #4CAF50;
        color: white;
        border-radius: 50%;
        padding: 10px;
    }

    .custom-send-button:hover {
        background-color: #45a049;
    }
</style>
````

## Message Box Value Persistence

The message box value represents the text that users have typed but haven't sent yet.

The Chat component offers complete control over the message input using the `InputValue` property and `OnInputValueChange` event.

Set the `InputValue` property to define the message box content and handle the `OnInputValueChange` event to track user typing in real-time. This enables implementing features such as draft auto-saving, input validation, or contextually pre-populating the message box.

````Razor
<TelerikChat Data="@ChatConversation"
             @ref="@Chat1"
             Width="600px"
             Height="700px"
             TextField="Content"
             AuthorId="@(1.ToString())"
             InputValue="@CurrentInputValue"
             OnInputValueChanged="@OnInputValueChanged"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private List<ChatMessage> ChatConversation = new List<ChatMessage>()
    {
        new ChatMessage()
        {
            Id = "1",
            AuthorId = "1",
            AuthorName = "John Smith",
            Content = "Hi there!",
            Status = "Seen",
            Timestamp = new System.DateTime(2025, 10, 1, 12, 0, 0)
        }
    };

    private TelerikChat<ChatMessage>? Chat1;

    private string CurrentInputValue { get; set; } = "";

    private void OnInputValueChanged(string newValue)
    {
        CurrentInputValue = newValue;
        // Implement real-time tracking, validation, or draft saving here
        Console.WriteLine($"Input changed to: {newValue}");
    }

    private void HandleSendMessage(ChatSendMessageEventArgs args)
    {
        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Content = args.Message,
            AuthorId = "1",
            AuthorName = "John Smith",
            Status = "Sent",
            Timestamp = DateTime.Now
        };

        ChatConversation.Add(newMessage);

        CurrentInputValue = "";

        Chat1?.Refresh();
    }

    public class ChatMessage
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string Content { get; set; }
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
````

## See Also

* [Live Demo: Chat Overview](https://demos.telerik.com/blazor-ui/chat/overview)
* [Chat Overview]({%slug chat-overview%})
