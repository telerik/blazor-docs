---
title: AI Smart Box
page_title: Grid - AI Smart Box
description: Learn how to use the GridToolBarSmartBoxTool to enable search, semantic search, and AI assistant features in the Blazor Grid.
slug: grid-ai-smart-box
tags: telerik,blazor,grid,ai,smart,box,search,semantic
published: True
position: 15
components: ["grid"]
---

# Grid Smart Box

The `GridToolBarSmartBoxTool` is a comprehensive toolbar component that combines three powerful features in a single interface:

* **Search**&mdash;Provides standard text-based search functionality across Grid data, similar to the `GridSearchBox`.
* **Semantic Search**&mdash;Offers a UI for semantic search with an event handler for implementing custom semantic search logic by integrating with an AI service.
* **AI Assistant**&mdash;Provides a prompt interface for natural language interactions with the Grid and exposes an `OnPromptRequest` event that allows you to implement AI-powered operations.

## Using the Smart Box

To use the `GridToolBarSmartBoxTool`, add it inside the `GridToolBar` tag. The Smart Box provides three nested settings components for configuring each feature:

* `GridToolBarSmartBoxToolSearchSettings`&mdash;Configure standard search functionality and history.
* `GridToolBarSmartBoxToolSemanticSearchSettings`&mdash;Configure semantic search UI and handle the `OnSearch` event to implement your custom semantic search logic.
* `GridToolBarSmartBoxToolAIAssistantSettings`&mdash;Configure the AI prompt interface and handle the `OnPromptRequest` event for your AI integration.

Each settings component can be enabled or disabled individually through its `Enabled` parameter (default is `true`). Each feature also supports history tracking through its respective history settings component.

For detailed information on all available parameters, see the [GridToolBarSmartBoxTool API reference]({%slug Telerik.Blazor.Components.GridToolBarSmartBoxTool%}).

## Standard Search

The standard search feature works similarly to the [`GridSearchBox` component](slug:grid-searchbox). Use the `Fields` parameter to specify which Grid columns to search in. The `DebounceDelay` parameter (default `300` milliseconds) controls how long to wait before triggering the search after the user stops typing.

Configure search history through the `GridToolBarSmartBoxToolSearchHistorySettings` nested tag. The `Size` parameter determines how many recent searches to display in the history dropdown.

## Semantic Search

Semantic search is not a built-in feature. The `GridToolBarSmartBoxTool` provides only the UI elements and event handling mechanism. To implement semantic search:

1. Subscribe to the `OnSearch` event of the `GridToolBarSmartBoxToolSemanticSearchSettings`.
1. In the event handler, integrate with your chosen AI service to perform semantic search operations.
1. Update the Grid data based on the semantic search results from your AI service.

For detailed implementation guidance, see the [Grid AI Semantic Search article](slug:grid-ai-semantic-search).

## AI Assistant

The AI assistant feature provides only the UI and event handling. You must implement the actual AI integration:

1. Subscribe to the `OnPromptRequest` event to handle user prompts.
1. Send the prompt to your AI service.
1. Process the AI response and apply the appropriate Grid operations (filtering, sorting, grouping, etc.).
1. Optionally, subscribe to `OnPromptRequestStop` to handle cancellation of ongoing AI operations.

Use the `PromptSuggestions` parameter to provide a list of predefined prompts that users can select. The AI Assistant also supports speech-to-text input through the nested `AIPromptSpeechToTextButtonSettings` component, which has the same configuration options as the [AIPrompt component](slug:aiprompt-overview).

Configure AI assistant history through the `GridToolBarSmartBoxToolAIAssistantHistorySettings` nested tag.

## Example

The following example demonstrates how to configure the `GridToolBarSmartBoxTool` with all three features: standard search, semantic search, and AI Assistant.

````RAZOR.skip-repl
<TelerikGrid Data="@GridData">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolSearchSettings Placeholder="Search...">
                    <GridToolBarSmartBoxToolSearchHistorySettings Size="5">
                    </GridToolBarSmartBoxToolSearchHistorySettings>
                </GridToolBarSmartBoxToolSearchSettings>

                <GridToolBarSmartBoxToolSemanticSearchSettings OnSearch="@OnSemanticSearch"
                                                               Placeholder="Semantic search...">
                    <GridToolBarSmartBoxToolSemanticSearchHistorySettings Size="5">
                    </GridToolBarSmartBoxToolSemanticSearchHistorySettings>
                </GridToolBarSmartBoxToolSemanticSearchSettings>

                <GridToolBarSmartBoxToolAIAssistantSettings OnPromptRequest="@OnAIPromptRequest"
                                                            OnPromptRequestStop="@OnPromptRequestStop"
                                                            Placeholder="Ask AI...">
                    <AIPromptSpeechToTextButtonSettings ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">
                    </AIPromptSpeechToTextButtonSettings>
                </GridToolBarSmartBoxToolAIAssistantSettings>
            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>
    </GridToolBar>

    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Category)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private async Task OnSemanticSearch(GridSmartBoxSemanticSearchEventArgs args)
    {
        // Implement your semantic search logic here
        // For example, connect to an AI service to perform semantic search
        string semanticSearchText = args.Text;
        
        // Update the Grid with semantic search results
        // GridData = await YourSemanticSearchService.SearchAsync(semanticSearchText);
        
        await Task.CompletedTask;
    }

    private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        // Implement your AI assistant logic here
        // For example, send the prompt to an AI service
        string promptText = args.Text;
        
        // Process the AI response and update the Grid
        // You can apply filtering, sorting, grouping, etc. based on AI response
        
        await Task.CompletedTask;
    }

    private async Task OnAIPromptRequestStop(GridSmartBoxAIAssistantPromptRequestStopEventArgs args)
    {
        // Handle the stop request
        // For example, cancel any ongoing AI operations
        string promptText = args.Text;
        
        await Task.CompletedTask;
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
        {
            Id = x,
            Name = $"Product {x}",
            Price = x * 10,
            Category = $"Category {x % 5}"
        }).ToList();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
````

View the [complete live demo](https://demos.telerik.com/blazor-ui/grid/ai-chat-assistant).

## See Also

* [Grid AI Semantic Search](slug:grid-ai-semantic-search)
* [Grid AI Toolbar Assistant](slug:grid-ai-toolbar-assistant)
* [Grid AI Features Overview](slug:grid-ai-overview)
* [Grid SearchBox](slug:grid-searchbox)
