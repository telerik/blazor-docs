---
title: Quick Actions
page_title: Chat Quick Actions
description: Learn how to configure and use quick actions and message suggestions in the Telerik UI for Blazor Chat component.
slug: chat-quick-actions
tags: telerik,blazor,chat,quick-actions,suggestions
published: True
position: 3
---

# Quick Actions

The Telerik UI for Blazor Chat component supports quick actions and message suggestions to enhance user experience and provide convenient interaction options.

## Message Suggestions

Message suggestions provide users with quick reply options that appear below the message input area.

>caption Basic message suggestions

````razor
<TelerikChat Data="@ChatConversation"
             @ref="@Chat1"
             Width="600px"
             Height="700px"
             TextField="Content"
             Suggestions="@QuickReplies"
             ReplyToIdField="ReplyToMessageId"
             InputValue="@ChatInputValue"
             AuthorId="@(2.ToString())"
             OnSuggestionClick="@HandleSuggestionClick">
</TelerikChat>

@code {
    private string ChatInputValue { get; set; } = "";
    
    private TelerikChat<ChatMessage> Chat1;

    private List<string> QuickReplies = new List<string>
    {
        "Request project status update",
        "Schedule a follow-up meeting"
    };

    private List<ChatMessage> ChatConversation = new List<ChatMessage>()
    {
       new ChatMessage()
       {
           Id="first",
           AuthorId="1",
           AuthorName="John Smith",
           Content="Hello, I wanted to confirm the details of the project update.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 0, 0)
       },
       new ChatMessage()
       {
           Id="second",
           AuthorId="2",
           AuthorName="Jane Doe",
           Content="Hi John, the project update has been finalized and shared with the team.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 12, 5, 0)
       }
    };

    private void HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        string responseMessage = string.Empty;

        if (args.Suggestion == "Request project status update")
        {
            responseMessage = "Could you please provide the current status of all ongoing projects?";
        }
        else if (args.Suggestion == "Schedule a follow-up meeting")
        {
            responseMessage = "Let's schedule a follow-up meeting to discuss the next steps.";
        }

        ChatConversation.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "2",
            AuthorName = "Jane Doe",
            Content = responseMessage,
            Status = "Sent",
            Timestamp = DateTime.Now
        });

        Chat1?.Refresh();
    }

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
}
````

## Custom Suggestion Templates

Customize the appearance of suggestions using the Chat's `SuggestionTemplate`.

````razor.skip-repl
<TelerikChat Data="@ChatConversation"
             @ref="@Chat1"
             Width="600px"
             Height="700px"
             TextField="Content"
             Suggestions="@CurrentSuggestions"
             InputValue="@ChatInputValue"
             AuthorId="@(2.ToString())"
             OnSuggestionClick="@HandleSuggestionClick">
    <SuggestionTemplate Context="suggestionContext">
        <div class="custom-suggestion" data-suggestion="@suggestionContext.Suggestion">
            <span class="suggestion-icon">💬</span>
            <span class="suggestion-text">@suggestionContext.Suggestion</span>
        </div>
    </SuggestionTemplate>
</TelerikChat>

<style>
    .custom-suggestion {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 20px;
        margin: 2px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .custom-suggestion:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }

    .suggestion-icon {
        margin-right: 6px;
        font-size: 14px;
    }

    .suggestion-text {
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
    }
</style>

@code {
    private string ChatInputValue { get; set; } = "";

    private TelerikChat<ChatMessage> Chat1;

    private List<string> CurrentSuggestions = new List<string> { "Yes, I need help with my order", "No, I was just checking in" };

    private List<ChatMessage> ChatConversation = new List<ChatMessage>()
    {
       new ChatMessage()
       {
           Id="first",
           AuthorId="1",
           AuthorName="Customer Support",
           Content="Welcome to TelerikStore! I'm here to help you today.",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 14, 30, 0)
       },
       new ChatMessage()
       {
           Id="second",
           AuthorId="1",
           AuthorName="Customer Support",
           Content="I see you've been browsing our UI components. Is there anything specific you need assistance with?",
           Status="Seen",
           Timestamp=new System.DateTime(2023, 10, 1, 14, 31, 0)
       }
    };

    private void HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        string responseMessage = string.Empty;

        // Initial responses
        if (args.Suggestion == "Yes, I need help with my order")
        {
            responseMessage = "I'd be happy to help you with your order! Can you please provide your order number or the email address you used for the purchase?";
        }
        else if (args.Suggestion == "No, I was just checking in")
        {
            responseMessage = "That's great! Feel free to browse around. If you have any questions about our Blazor components or need a demo, just let me know!";
        }
        // Handle order suggestions if needed
        else
        {
            responseMessage = "Thank you for that information. How else can I assist you today?";
        }

        // Add the support agent's response
        ChatConversation.Add(new ChatMessage
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "1",
            AuthorName = "Customer Support",
            Content = responseMessage,
            Status = "Sent",
            Timestamp = DateTime.Now
        });

        Chat1?.Refresh();
    }

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
}
````

## Integration with AI Services

Use suggestions to guide AI conversations. With the help of the Chat's `OnSuggestionClick` event, you can access the clicked suggestion and you can pass it to the AI service for processing. 

````RAZOR.skip-repl
private async Task OnSuggestionClick(ChatSuggestionClickEventArgs args)
{
    var userMessage = new ChatMessage()
    {
        Id = Guid.NewGuid().ToString(),
        AuthorId = "user",
        AuthorName = "John Doe",
        Content = args.Suggestion,
        Timestamp = DateTime.Now,
        Status = ""
    };

    AIChatConversation.Add(userMessage);

    //pass the clicked suggestion to the AI service as a message
    await AskAI(new ChatSendMessageEventArgs()
    {
        Message = args.Suggestion
    });
    
    return; 
}
````

## See Also

* [Chat Events](slug:chat-events)
* [Chat Templates](slug:chat-templates)
