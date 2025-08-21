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
<TelerikChat Data="@Messages"
             Suggestions="@QuickReplies"
             OnSuggestionClick="@HandleSuggestionClick">
</TelerikChat>

@code {
    private List<string> QuickReplies = new List<string> 
    { 
        "Hello", 
        "How are you?", 
        "Thank you", 
        "Yes", 
        "No", 
        "Maybe later" 
    };

    private async Task HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        // The suggestion will be automatically placed in the input
        // You can modify this behavior by setting args.IsCancelled = true
        
        if (args.Suggestion == "Thank you")
        {
            // Custom handling for specific suggestions
            await HandleThankYouAction();
        }
    }
}
````

## Dynamic Suggestions

Update suggestions based on conversation context or user actions:

````razor
<TelerikChat Data="@Messages"
             Suggestions="@CurrentSuggestions"
             OnSuggestionClick="@HandleSuggestionClick"
             OnSendMessage="@HandleSendMessage">
</TelerikChat>

@code {
    private List<string> CurrentSuggestions = new List<string> { "Hi there!", "Good morning" };
    
    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        // Add the message
        Messages.Add(new ChatMessage 
        { 
            Text = args.Message, 
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        });
        
        // Update suggestions based on message content
        await UpdateSuggestionsForContext(args.Message);
    }
    
    private async Task UpdateSuggestionsForContext(string lastMessage)
    {
        if (lastMessage.Contains("help"))
        {
            CurrentSuggestions = new List<string> 
            { 
                "I need technical support",
                "I have a billing question", 
                "I want to report a bug" 
            };
        }
        else if (lastMessage.Contains("thank"))
        {
            CurrentSuggestions = new List<string> 
            { 
                "You're welcome!", 
                "Happy to help", 
                "Anything else?" 
            };
        }
        
        StateHasChanged();
    }
}
````

## Custom Suggestion Templates

Customize the appearance of suggestions using the `SuggestionTemplate`:

````razor
<TelerikChat Data="@Messages"
             Suggestions="@ActionSuggestions"
             OnSuggestionClick="@HandleSuggestionClick">
    <SuggestionTemplate Context="context">
        <div class="custom-suggestion">
            <TelerikSvgIcon Icon="@GetSuggestionIcon(context.Suggestion)" />
            <span>@context.Suggestion</span>
        </div>
    </SuggestionTemplate>
</TelerikChat>

<style>
    .custom-suggestion {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 16px;
        background: linear-gradient(135deg, #f5f5f5, #ffffff);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .custom-suggestion:hover {
        background: linear-gradient(135deg, #e8e8e8, #f5f5f5);
        transform: translateY(-1px);
    }
</style>

@code {
    private List<string> ActionSuggestions = new List<string> 
    { 
        "Schedule Meeting", 
        "Send Document", 
        "Call Now",
        "Set Reminder"
    };
    
    private SvgIcon GetSuggestionIcon(string suggestion)
    {
        return suggestion switch
        {
            "Schedule Meeting" => SvgIcon.Calendar,
            "Send Document" => SvgIcon.FileAdd,
            "Call Now" => SvgIcon.Phone,
            "Set Reminder" => SvgIcon.Clock,
            _ => SvgIcon.CommentPositive
        };
    }
}
````

## Contextual Suggestions

Provide context-aware suggestions based on message content or user behavior:

````razor
@code {
    private async Task HandleSendMessage(ChatSendMessageEventArgs args)
    {
        // Add user message
        Messages.Add(new ChatMessage 
        { 
            Text = args.Message, 
            AuthorId = CurrentUserId,
            Timestamp = DateTime.Now
        });
        
        // Generate AI or rule-based response
        var response = await GenerateResponse(args.Message);
        Messages.Add(new ChatMessage 
        { 
            Text = response.Text, 
            AuthorId = "bot",
            Timestamp = DateTime.Now
        });
        
        // Update suggestions based on response
        CurrentSuggestions = response.Suggestions;
        StateHasChanged();
    }
    
    private async Task<BotResponse> GenerateResponse(string userMessage)
    {
        var response = new BotResponse();
        
        if (userMessage.ToLower().Contains("appointment"))
        {
            response.Text = "I can help you schedule an appointment. What works best for you?";
            response.Suggestions = new List<string> 
            { 
                "Tomorrow morning", 
                "This afternoon", 
                "Next week",
                "Show available times"
            };
        }
        else if (userMessage.ToLower().Contains("order"))
        {
            response.Text = "Let me help you with your order. What would you like to do?";
            response.Suggestions = new List<string> 
            { 
                "Track my order", 
                "Cancel order", 
                "Modify order",
                "Return item"
            };
        }
        
        return response;
    }
    
    public class BotResponse
    {
        public string Text { get; set; }
        public List<string> Suggestions { get; set; } = new List<string>();
    }
}
````

## Suggestion Categories

Organize suggestions into categories for complex scenarios:

````razor
<TelerikChat Data="@Messages"
             Suggestions="@GetCurrentCategorySuggestions()"
             OnSuggestionClick="@HandleCategorizedSuggestion">
</TelerikChat>

<div class="suggestion-categories">
    @foreach (var category in SuggestionCategories.Keys)
    {
        <TelerikButton OnClick="@(() => SetActiveCategory(category))"
                       Class="@(ActiveCategory == category ? "active" : "")">
            @category
        </TelerikButton>
    }
</div>

@code {
    private string ActiveCategory = "General";
    
    private Dictionary<string, List<string>> SuggestionCategories = new Dictionary<string, List<string>>
    {
        ["General"] = new List<string> { "Hello", "Thank you", "Goodbye" },
        ["Support"] = new List<string> { "I need help", "Technical issue", "Billing question" },
        ["Sales"] = new List<string> { "Product info", "Get quote", "Schedule demo" },
        ["Account"] = new List<string> { "Update profile", "Change password", "View history" }
    };
    
    private List<string> GetCurrentCategorySuggestions()
    {
        return SuggestionCategories.ContainsKey(ActiveCategory) 
            ? SuggestionCategories[ActiveCategory] 
            : new List<string>();
    }
    
    private void SetActiveCategory(string category)
    {
        ActiveCategory = category;
        StateHasChanged();
    }
}
````

## Integration with AI Services

Use suggestions to guide AI conversations:

````razor
@code {
    private async Task HandleSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        // Send suggestion to AI service with context
        var aiResponse = await GetAIResponse(args.Suggestion, GetConversationContext());
        
        // Add AI response
        Messages.Add(new ChatMessage 
        { 
            Text = aiResponse.Text, 
            AuthorId = "ai",
            Timestamp = DateTime.Now
        });
        
        // Update suggestions based on AI response
        CurrentSuggestions = aiResponse.SuggestedFollowUps;
        StateHasChanged();
    }
    
    private string GetConversationContext()
    {
        return string.Join("\n", Messages.TakeLast(5).Select(m => $"{m.AuthorId}: {m.Text}"));
    }
}
````

## Best Practices

When implementing quick actions and suggestions:

1. **Keep suggestions relevant** to the current conversation context
2. **Limit the number** of suggestions (3-6 is optimal)
3. **Update suggestions dynamically** based on user interactions
4. **Use clear, concise text** for suggestion labels
5. **Provide visual feedback** when suggestions are selected
6. **Test with real users** to ensure suggestions are helpful

## Next Steps

* [Handle Chat events](slug:chat-events)
* [Set up AI integrations](slug:chat-integrations-overview)
* [Customize suggestion templates](slug:chat-customisation-suggestion-template)

## See Also

* [Chat Overview](slug:chat-overview)
* [Chat Events](slug:chat-events)
* [Live Demo: Chat](https://demos.telerik.com/blazor-ui/chat/overview)
