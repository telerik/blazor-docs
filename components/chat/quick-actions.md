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

The Telerik UI for Blazor Chat component supports quick message actions to enhance the user experience and provide convenient interaction options:

* [Suggestions](#suggestions) relate to the Chat component instance. They display above the message input area and are always visible. When the user clicks on a suggestion, its text can [appear in the input area and the user can edit it before sending](#suggestion-clicks-and-inputvalue-behavior).
* [Suggested actions](#suggested-actions) relate to a specific Chat message. They display below that message and disappear when another message appears. The primary purpose of suggested actions is to act like quick replies and spare manual typing.

## Suggestions

Chat suggestions provide users with options that appear above the message input area. You can use suggestions as predefined message templates, conversation starters, or for custom user actions. The Chat suggestions are always visible, unless the app modifies the `Suggestions` parameter value.

### Suggestions Layout Mode

The `SuggestionsLayoutMode` parameter controls how suggestions display in the Chat interface. Choose from the `ChatSuggestionsLayoutMode` enum options to optimize the presentation based on the number and length of your suggestions:

* `Wrap`&mdash;Suggestions wrap to the next line if they exceed the container width (default)
* `Scroll`&mdash;Suggestions are displayed in a single line with horizontal scrolling
* `ScrollButtons`&mdash;Suggestions are displayed in a single line with horizontal scrolling and navigation 

Use `Scroll` or `ScrollButtons` mode when you have many suggestions or longer text that won't fit comfortably in the available width. The `ScrollButtons` mode is particularly helpful for users who prefer button navigation over scrolling gestures.

### Suggestion Clicks and InputValue Behavior

When the user clicks on a Chat suggestion, the suggestion text may or may not appear in the Chat input area. This depends on the Chat configuration and the `OnSuggestionClick` event handler:

* When the `InputValue` parameter is set and the `OnInputValueChanged` event is handled, the suggestion text will appear as message text. The user can modify the text and send it.
* Even if the above point is true, the suggestion text will not render in the Chat input area if the `OnSuggestionClick` event is cancelled by setting `args.IsCancelled` to `true`. In this case, the app can set a different `InputValue` or no `InputValue` at all.

### Example

>caption Using Chat Suggestions and SuggestionsLayoutMode

````RAZOR
<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             AuthorId="@CurrentUserId"
             InputValue="@ChatInputValue"
             OnInputValueChanged="@((string newValue) => ChatInputValue = newValue)"
             OnSendMessage="@OnChatSendMessage"
             OnSuggestionClick="@OnChatSuggestionClick"
             Suggestions="@ChatSuggestions"
             SuggestionsLayoutMode="@ChatSuggestionsLayoutMode.Wrap"
             Height="90vh"
             Width="400px">
</TelerikChat>

@code {
    private TelerikChat<Message>? ChatRef;

    private const string CurrentUserId = "jane";

    private string ChatInputValue { get; set; } = string.Empty;

    private List<string> ChatSuggestions = new List<string>
    {
        "Request quote",
        "Schedule maintenance",
        "Close Chat Session"
    };

    private List<Message> ChatData { get; set; } = new()
    {
       new Message()
       {
           AuthorId = "john",
           AuthorName = "John Smith",
           Text = "Hello and welcome to the Car Company support chat. Please select the desired topic of discussion.",
           Status = "Seen"
       }
    };

    private void OnChatSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        if (args.Suggestion == ChatSuggestions.Last())
        {
            ChatInputValue = string.Empty;

            // Prevent suggestion text from appearing in the Chat TextArea
            args.IsCancelled = true;

            ChatData.Clear();

            return;
        }

        string messageText = string.Empty;

        if (args.Suggestion == ChatSuggestions.First())
        {
            messageText = "To request a new car quote, please specify the model and trim level.";
        }
        else if (args.Suggestion == ChatSuggestions.ElementAt(1))
        {
            messageText = "To schedule maintenance for your car, please specify its model and year.";
        }

        ChatData.Add(new Message
        {
            AuthorId = "john",
            AuthorName = "John Smith",
            Text = messageText,
            Status = "Seen"
        });

        ChatRef?.Refresh();
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Message newMessage = new()
        {
            AuthorId = CurrentUserId,
            AuthorName = "Jane Doe",
            Text = args.Message
        };

        ChatData.Add(newMessage);
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

### Custom Suggestion Templates

Customize the appearance of suggestions using the Chat's `SuggestionTemplate`.

````razor.skip-repl
<TelerikChat @ref="@ChatRef"
             Data="@ChatData"
             AuthorId="@ChatAuthorId"
             InputValue="@ChatInputValue"
             OnSendMessage="@OnChatSendMessage"
             OnSuggestionClick="@OnChatSuggestionClick"
             Suggestions="@ChatSuggestions"
             Height="90vh"
             Width="600px">
    <SuggestionTemplate>
        <div class="custom-suggestion" data-suggestion="@context.Suggestion">
            <span class="suggestion-icon">💬</span>
            <span class="suggestion-text">@context.Suggestion</span>
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

    private TelerikChat<Message>? ChatRef;

    private List<string> ChatSuggestions = new List<string> { "Help with Order", "Just Checking in" };

    private string ChatInputValue { get; set; } = string.Empty;

    private string ChatAuthorId { get; set; } = "user";

    private List<Message> ChatData = new()
    {
       new Message()
       {
           AuthorId = "support",
           AuthorName = "Customer Support",
           Text = "Welcome to Telerik Store! I'm here to help you today.",
           Status = "Seen",
           Timestamp = DateTime.Now.AddSeconds(-10)
       },
       new Message()
       {
           AuthorId = "support",
           AuthorName = "Customer Support",
           Text = "I see you've been browsing our UI components. Is there anything specific you need assistance with?",
           Status = "Seen",
           Timestamp = DateTime.Now.AddSeconds(-5)
       }
    };

    private void OnChatSuggestionClick(ChatSuggestionClickEventArgs args)
    {
        string responseMessage = string.Empty;

        // Initial responses
        if (args.Suggestion == "Help with Order")
        {
            responseMessage = "I'd be happy to help you with your order! Can you please provide your order number or the email address you used for the purchase?";
        }
        else if (args.Suggestion == "Just Checking in")
        {
            responseMessage = "That's great! Feel free to browse around. If you have any questions about our Blazor components or need a demo, just let me know!";
        }
        // Handle order suggestions if needed
        else
        {
            responseMessage = "Thank you for that information. How else can I assist you today?";
        }

        // Add the support agent's response
        ChatData.Add(new Message
        {
            Id = Guid.NewGuid().ToString(),
            AuthorId = "support",
            AuthorName = "Customer Support",
            Text = responseMessage,
            Status = "Sent"
        });

        ChatRef?.Refresh();
    }

    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        Message newMessage = new()
        {
            AuthorId = ChatAuthorId,
            AuthorName = "User",
            Text = args.Message
        };

        ChatData.Add(newMessage);
    }
@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## Suggested Actions

Suggestion actions serve as quick predefined contextual replies to a specific Chat message. They display below the associated Chat message and are visible only while that Chat message is the last one in the conversation. Suggested actions can guide users through conversations or workflows.

### Suggested Actions Layout Mode

The `SuggestedActionsLayoutMode` parameter controls how suggested actions (quick actions attached to specific messages) are displayed. Similar to `SuggestionsLayoutMode`, it offers three layout options that are members of the `ChatSuggestedActionsLayoutMode` enum type:

* `Wrap`&mdash;Suggested actions wrap to the next line (default)
* `Scroll`&mdash;Suggested actions are displayed in a single line with horizontal scrolling
* `ScrollButtons`&mdash;Suggested actions are displayed in a single line with horizontal scrolling and navigation buttons

### Example

>caption Using Chat SuggestedActions and SuggestedActionsLayoutMode

````RAZOR
<TelerikChat Data="@ChatData"
             AuthorId="@CurrentUserId"
             SuggestedActionsLayoutMode="@ChatSuggestedActionsLayoutMode.ScrollButtons"
             OnSendMessage="@OnChatSendMessage"
             Width="80vw">
</TelerikChat>

@code {
    private const string CurrentUserId = "user1";

    private List<Message> ChatData { get; set; } = new()
    {
        new Message
        {
            AuthorId = "bot",
            Text = "How would you like to proceed?",
            SuggestedActions = new List<string>
            {
                "Get detailed review",
                "Schedule later",
                "Request more info"
            }
        }
    };
    
    private void OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        ChatData.Add(new Message()
        {
            AuthorId = CurrentUserId,
            Text = args.Message
        });
    }

@[template](/_contentTemplates/chat/general.md#messagecs)
}
````

## Integration with AI Services

You can use suggestions and suggested actions to guide AI conversations. With the help of the Chat's `OnSuggestionClick` event, you can access the clicked suggestion and pass it to the AI service for processing. 

````RAZOR.skip-repl
private async Task OnSuggestionClick(ChatSuggestionClickEventArgs args)
{
    var userMessage = new ChatMessage()
    {
        AuthorId = "user",
        AuthorName = "John Doe",
        Text = args.Suggestion
        Status = ""
    };

    ChatData.Add(userMessage);

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
