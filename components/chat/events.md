---
title: Events
page_title: Chat Events
description: Learn about the events exposed by the Telerik UI for Blazor Chat component for message handling, quick actions, uploads, and more.
slug: chat-events
tags: telerik,blazor,chat,events
published: True
position: 5
---

# Chat Events

The Telerik UI for Blazor Chat component exposes various events that allow you to implement custom functionality and handle user interactions. This article lists the available events and provides examples for the most common use cases.

## OnSendMessage

The `OnSendMessage` event fires when a user sends a new message. Use this event to handle message processing, validation, and persistence.

>caption Handle the OnSendMessage event

````razor
<TelerikChat Data="@Messages"
             AuthorId="@CurrentUserId"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        // Validate message
        if (string.IsNullOrWhiteSpace(args.Message))
            return;

        var newMessage = new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            Text = args.Message,
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now,
            Files = args.Files?.ToList() ?? new List<FileSelectFileInfo>()
        };

        // Add to collection
        Messages.Add(newMessage);

        // Optionally save to database
        await SaveMessageAsync(newMessage);
    }
}
````

## OnSuggestionClick

The `OnSuggestionClick` event fires when a user clicks on a quick reply suggestion. You can use this event to customize suggestion handling.

>caption Handle suggestion clicks

````razor
<TelerikChat Data="@Messages"
             Suggestions="@QuickReplies"
             OnSuggestionClick="@HandleSuggestionClick">
</TelerikChat>

@code {
    private List<string> QuickReplies = new List<string> { "Hello", "How are you?", "Thank you" };

    private async Task HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        // You can modify the suggestion before it's used
        args.IsCancelled = false; // Allow the suggestion to be used
        
        // Or handle it completely custom
        if (args.Suggestion == "Thank you")
        {
            args.IsCancelled = true; // Prevent default behavior
            await HandleCustomThankYouAction();
        }
    }
}
````

## OnDownload

The `OnDownload` event fires when a user downloads files from a message. Use this event to handle file access, logging, or custom download logic.

>caption Handle file downloads

````razor
<TelerikChat Data="@Messages"
             OnDownload="@HandleDownload">
</TelerikChat>

@code {
    private async Task HandleDownload(ChatDownloadEventArgs args)
    {
        foreach (var file in args.Files)
        {
            // Log download activity
            await LogFileDownload(file.Name, args.MessageId);
            
            // Implement custom download logic
            await ProcessFileDownload(file);
        }
    }
}
````

## OnMessageUnpin

The `OnMessageUnpin` event fires when a user unpins a message. Handle this event to update your data model and persist the change.

>caption Handle message unpinning

````razor
<TelerikChat Data="@Messages"
             OnMessageUnpin="@HandleMessageUnpin">
</TelerikChat>

@code {
    private async Task HandleMessageUnpin(ChatMessageUnpinEventArgs args)
    {
        var message = Messages.FirstOrDefault(m => m.Id == args.MessageId);
        if (message != null)
        {
            message.IsPinned = false;
            await UpdateMessageInDatabase(message);
        }
    }
}
````

## OnInputValueChanged

The `OnInputValueChanged` event fires when the input value changes. Use this for real-time validation, auto-save drafts, or typing indicators.

>caption Handle input value changes

````razor
<TelerikChat Data="@Messages"
             InputValue="@InputValue"
             OnInputValueChanged="@HandleInputChange">
</TelerikChat>

@code {
    private string InputValue { get; set; } = string.Empty;

    private async Task HandleInputChange(string newValue)
    {
        InputValue = newValue;
        
        // Show typing indicator
        if (!string.IsNullOrEmpty(newValue))
        {
            await ShowTypingIndicator();
        }
        else
        {
            await HideTypingIndicator();
        }
        
        // Auto-save draft
        await SaveDraft(newValue);
    }
}
````

## Event Arguments

The Chat events provide specific argument types with relevant data:

| Event | Arguments Type | Key Properties |
|-------|----------------|----------------|
| `OnSendMessage` | `ChatSendMessageEventArgs` | `Message`, `Files`, `ReplyMessageId` |
| `OnSuggestionClick` | `ChatSuggestionClickEventArgs` | `Suggestion`, `IsCancelled` |
| `OnDownload` | `ChatDownloadEventArgs` | `Files`, `MessageId` |
| `OnMessageUnpin` | `ChatMessageUnpinEventArgs` | `MessageId` |
| `OnInputValueChanged` | `string` | The current input value |

## Common Event Patterns

### AI Integration

Use `OnSendMessage` to send user messages to AI services:

````razor
private async Task HandleSendMessage(ChatSendMessageEventArgs args)
{
    // Add user message
    Messages.Add(new ChatMessage 
    { 
        Text = args.Message, 
        AuthorId = CurrentUserId,
        Timestamp = DateTime.Now
    });

    // Get AI response
    var aiResponse = await GetAIResponse(args.Message);
    
    // Add AI message
    Messages.Add(new ChatMessage 
    { 
        Text = aiResponse, 
        AuthorId = "ai",
        Timestamp = DateTime.Now
    });
}
````

### File Upload Processing

Handle file uploads with validation and processing:

````razor
private async Task HandleSendMessage(ChatSendMessageEventArgs args)
{
    if (args.Files?.Any() == true)
    {
        // Process uploaded files
        foreach (var file in args.Files)
        {
            if (await ValidateFile(file))
            {
                await ProcessUploadedFile(file);
            }
        }
    }
    
    // Handle the message as usual
    Messages.Add(new ChatMessage 
    { 
        Text = args.Message,
        Files = args.Files?.ToList(),
        AuthorId = CurrentUserId,
        Timestamp = DateTime.Now
    });
}
````

## Next Steps

* [Configure Chat messages and tools](slug:chat-messages-overview)
* [Set up AI integrations](slug:chat-integrations-overview)
* [Handle file uploads](slug:chat-file-uploads-and-media)

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat API Reference](slug:Telerik.Blazor.Components.TelerikChat-1)
