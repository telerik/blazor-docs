---
title: AI Chat Assistant
page_title: Grid - AI Chat Assistant
description: Learn how to implement an AI Chat Assistant for the Telerik UI for Blazor Grid that enables natural language interactions to perform data operations through conversational commands.
slug: grid-ai-chat-assistant
tags: telerik,blazor,grid,ai,chat,assistant,conversational
published: True
position: 18
components: ["grid", "chat"]
---

# Grid AI Chat Assistant

The Blazor Grid can be enhanced with an AI-powered chat assistant that allows users to interact with Grid data using natural language commands. By integrating the [Chat component](slug:chat-overview) with the Grid's built-in AI helper methods, you can create an intuitive conversational interface where users can perform [Smart Grid operations](slug:grid-ai-overview) through simple text commands instead of navigating through multiple UI controls.

## Overview

The AI Chat Assistant provides a conversational interface for Grid operations. Users can:

* Apply data operations (sort, filter, group, page) through natural language
* Manage columns (show, hide, resize, reorder, lock)
* Export data to Excel, PDF, or CSV
* Receive confirmation messages for each operation

The integration leverages two key Grid methods:

* **`GetAIRequest()`**&mdash;Generates a properly formatted request containing the user's prompt and Grid column information to send to your AI service.
* **`ProcessAIResponseAsync()`**&mdash;Processes the AI service response and automatically applies all returned commands to the Grid.

>tip The example in this article uses a Telerik-hosted AI service for demonstration purposes only. For production applications, you should [implement your own AI service](slug:grid-ai-service-setup) that understands your specific domain, data, and business requirements.

## Setup Steps

To implement an AI Chat Assistant for your Grid, follow the steps below:

1. Add the Grid

    Configure the desired features in the Grid. You can control Grid features through the state, even if their UI is not enabled explicitly in the declaration of the component.

    ````RAZOR.skip-repl
    <TelerikGrid @ref="@GridRef"
                Data="@GridData"
                FilterMode="GridFilterMode.FilterMenu"
                Groupable="true"
                Pageable="true"
                Reorderable="true"
                Resizable="true"
                ShowColumnMenu="true"
                Sortable="true">
        <GridSettings>
            <GridPdfExport PageOrientation="@GridPdfExportPageOrientation.Landscape" />
        </GridSettings>
        <GridColumns>
            <!-- Define columns -->
        </GridColumns>
    </TelerikGrid>
    ````

2. Set Up the Chat Component

    Add a Chat component to collect user prompts. Handle the [`OnSendMessage`](slug:chat-events#onsendmessage) event to process user input. Use the Chat's `Suggestions` parameter to provide helpful prompt examples:

    ````RAZOR.skip-repl
    <TelerikChat @ref="@ChatRef"
                AuthorId="@CurrentUser.Id"
                Data="@ChatData"
                OnSendMessage="@OnChatSendMessage"
                Suggestions="@ChatSuggestions"
                Placeholder="Ask me to sort, filter, or analyze your data.">
    </TelerikChat>

    @code {
        private TelerikChat<Message> ChatRef { get; set; }
        private List<Message> ChatData { get; set; } = new();
        
        private List<string> ChatSuggestions = new() {
            "Sort by Bookings descending",
            "Group by Sales Person",
            "Export to PDF",
            "Filter by North America"
        };
        
        private Author CurrentUser = new() { 
            Id = "user", 
            Name = "Grid User" 
        };
    }
    ````

3. Process User Prompts

    Implement the Chat `OnSendMessage` event handler to process user prompts and send them to your AI service. Use the Grid's `GetAIRequest()` method to generate a properly formatted request:

    ````C#.skip-repl
    private async Task OnChatSendMessage(ChatSendMessageEventArgs args)
    {
        // Add user message to Chat
        Message userMessage = new Message()
        {
            AuthorId = CurrentUser.Id,
            AuthorName = CurrentUser.Name,
            Text = args.Message
        };
        ChatData.Add(userMessage);

        // Add AI response placeholder with typing indicator
        Message aiResponse = new Message()
        {
            AuthorId = "ai",
            AuthorName = "AI Assistant",
            IsTyping = true
        };
        ChatData.Add(aiResponse);
        ChatRef.Refresh();

        try
        {
            // Generate AI request from Grid
            GridAIRequestDescriptor aiRequest = GridRef.GetAIRequest(args.Message);
            
            // Send to AI service
            HttpResponseMessage requestResult = await HttpClientInstance.PostAsJsonAsync(
                "https://your-ai-service.com/api/grid/smart-state", 
                aiRequest);
            
            string aiResultContent = await requestResult.Content.ReadAsStringAsync();
            
            // Process AI response and apply to Grid
            await GridRef.ProcessAIResponseAsync(aiResultContent);
            
            // Extract messages from response
            GridAIResponse gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(aiResultContent);
            string commandMessages = string.Join(" ", gridAIResponse.Commands.Select(x => x.Message));
            
            // Update AI response message
            aiResponse.IsTyping = false;
            aiResponse.Text = commandMessages ?? "Grid updated successfully.";
        }
        catch (Exception)
        {
            aiResponse.IsTyping = false;
            aiResponse.Text = "The request failed. Please try another request.";
        }

        ChatRef.Refresh();
    }
    ````

4. Display AI Responses

    Extract messages from the AI service response to display in the Chat. The `GridAIResponse` object contains a `Commands` collection where each command has a `Message` property describing what operation was performed:

    ````C#.skip-repl
    // Deserialize the AI response
    GridAIResponse gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(aiResultContent);

    // Extract messages from each command
    string commandMessages = string.Join(" ", gridAIResponse.Commands.Select(x => x.Message));

    // Update the Chat message
    aiResponse.Text = commandMessages ?? "Grid updated successfully.";
    ````

5. Optional: Add Layout Components

    For a better user experience, consider using layout components like the Drawer to show/hide the Chat interface:

    ````RAZOR.skip-repl
    <TelerikDrawer @ref="@DrawerRef"
                Expanded="@DrawerExpanded"
                Mode="@DrawerMode.Push"
                Position="@DrawerPosition.End"
                Width="360px">
        <Template>
            <TelerikChat @ref="@ChatRef" ...>
            </TelerikChat>
        </Template>
        <DrawerContent>
            <TelerikGrid @ref="@GridRef" ...>
                <GridToolBar>
                    <GridToolBarCustomTool>
                        <TelerikToggleButton OnClick="@ToggleChat"
                                            Selected="@DrawerExpanded">
                            AI Assistant
                        </TelerikToggleButton>
                    </GridToolBarCustomTool>
                </GridToolBar>
            </TelerikGrid>
        </DrawerContent>
    </TelerikDrawer>

    @code {
        private bool DrawerExpanded { get; set; }
        
        private async Task ToggleChat()
        {
            await DrawerRef.ToggleAsync();
        }
    }
    ````

View the [complete live demo](https://demos.telerik.com/blazor-ui/grid/ai-chat-assistant).

## Best Practices

### Provide Initial Guidance

Add a welcome message to the Chat when it initializes to guide users on what they can ask:

````C#.skip-repl
protected override void OnInitialized()
{
    ChatData.Add(new Message()
    {
        AuthorId = "ai",
        AuthorName = "AI Assistant",
        Text = "👋 Hi! I'm your AI Grid Assistant. I can help you:\n\n• Sort, filter, or group data\n• Manage columns\n• Export to Excel, PDF, or CSV\n\nTry one of the suggestions below!"
    });
}
````

### Use Chat Suggestions

Provide common prompts as suggestions to help users understand the AI's capabilities:

````C#.skip-repl
private List<string> ChatSuggestions = new() {
    "Sort by sales descending",
    "Filter orders from last month",
    "Group by region",
    "Export to Excel",
    "Hide the discount column"
};
````

### Handle Errors

When using the Chat `OnSendMessage ` event, consider wrapping the AI service calls in try-catch blocks and provide helpful error messages:

````C#.skip-repl
try
{
    // AI processing logic
}
catch (Exception ex)
{
    aiResponse.Text = "I couldn't process that request. Please try rephrasing or use one of the suggestions.";
    Console.WriteLine($"AI request failed: {ex.Message}");
}
````

### Show Typing Indicators

Use the Message's `IsTyping` property to indicate when the AI is processing:

````C#.skip-repl
Message aiResponse = new Message()
{
    AuthorId = "ai",
    IsTyping = true  // Shows typing indicator
};
ChatData.Add(aiResponse);
ChatRef.Refresh();

// After processing...
aiResponse.IsTyping = false;
aiResponse.Text = "Operation completed!";
ChatRef.Refresh();
````

## See Also

* [Grid Smart AI Features Overview](slug:grid-ai-overview)
* [Grid AI Assistant Tools Setup](slug:grid-ai-assistant-tools-setup)
* [Grid AI Service Setup](slug:grid-ai-service-setup)
* [Chat Component](slug:chat-overview)
* [Drawer Component](slug:drawer-overview)
