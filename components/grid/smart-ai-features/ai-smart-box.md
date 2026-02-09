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
* **Semantic Search**&mdash;Offers a UI for semantic search with an event handler where you can implement custom semantic search logic by integrating with an AI service.
* **AI Assistant**&mdash;Provides a prompt interface for natural language interactions with the Grid, where you can implement AI-powered operations through the exposed `OnPromptRequest` event.

## Parameters

### GridToolBarSmartBoxTool

The `GridToolBarSmartBoxTool` is added as a tool in the Grid toolbar. It contains nested settings components for each of its three sections.

### GridToolBarSmartBoxToolSearchSettings

Configures the standard search functionality of the Smart Box.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Placeholder` | `string` | `null` | Specifies the placeholder text for the search input. |
| `DebounceDelay` | `int` | `300` | Specifies the interval in milliseconds to wait before triggering the search. |
| `Enabled` | `bool` | `true` | Toggles the search functionality on or off. |
| `Fields` | `List<string>` | `null` | Specifies a list of column fields to search in. Similar to the `GridSearchBox` component. |

#### GridToolBarSmartBoxToolSearchHistorySettings

Configures the search history display.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Size` | `int` | `5` | Specifies the maximum number of history queries that will be displayed. |
| `TimestampFormat` | `string` | `null` | Specifies the date format used to display the history query timestamps. |
| `ItemTemplate` | `RenderFragment<GridSmartBoxHistoryItemTemplate>` | `null` | Specifies a custom template for rendering history items. |

#### OnSearch Event

The `OnSearch` event is triggered when a search is performed. It provides the search value through the event arguments.

### GridToolBarSmartBoxToolSemanticSearchSettings

Configures the semantic search functionality. 

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Placeholder` | `string` | `null` | Specifies the placeholder text for the semantic search input. |
| `DebounceDelay` | `int` | `300` | Specifies the interval in milliseconds to wait before triggering the search. |
| `Enabled` | `bool` | `true` | Toggles the semantic search functionality on or off. |

#### GridToolBarSmartBoxToolSemanticSearchHistorySettings

Configures the semantic search history display.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Size` | `int` | `5` | Specifies the maximum number of history queries that will be displayed. |
| `TimestampFormat` | `string` | `null` | Specifies the date format used to display the history query timestamps. |
| `ItemTemplate` | `RenderFragment<GridSmartBoxHistoryItemTemplate>` | `null` | Specifies a custom template for rendering history items. |

#### OnSearch Event

The `OnSearch` event is triggered when a semantic search is performed. You must implement your semantic search logic in this event handler. For example, you can connect to an AI service and update the Grid data accordingly.

### GridToolBarSmartBoxToolAIAssistantSettings

Configures the AI assistant functionality. The AI Assistant provides a prompt interface for natural language interactions. You must implement the AI integration logic yourself in the `OnPromptRequest` event exposed for the AI Assistant.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Placeholder` | `string` | `null` | Specifies the placeholder text for the AI assistant input. |
| `PromptSuggestions` | `List<string>` | `null` | Specifies a list of predefined prompt suggestions to display to users. |
| `PromptSuggestionTemplate` | `RenderFragment<GridSmartBoxPromptSuggestionTemplate>` | `null` | Specifies a custom template for rendering prompt suggestion items. |
| `Enabled` | `bool` | `true` | Toggles the AI assistant functionality on or off. |

#### GridToolBarSmartBoxToolAIAssistantHistorySettings

Configures the AI assistant history display.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `Size` | `int` | `5` | Specifies the maximum number of history queries that will be displayed. |
| `TimestampFormat` | `string` | `null` | Specifies the date format used to display the history query timestamps. |
| `ItemTemplate` | `RenderFragment<GridSmartBoxHistoryItemTemplate>` | `null` | Specifies a custom template for rendering history items. |

#### AIPromptSpeechToTextButtonSettings

Configures the settings for the speech-to-text button in the AI assistant. The settings are the same as in the [AIPrompt component](slug:aiprompt-overview).

#### OnPromptRequest Event

The `OnPromptRequest` event is triggered when a user submits an AI request. The `Text` property of the event arguments provides the prompt text. You must implement your AI integration logic in this event handler by sending the prompt to an AI service and updating the Grid accordingly.

#### OnPromptRequestStop Event

The `OnPromptRequestStop` event is triggered when a user clicks the "stop" button in the AI input after submitting a prompt request. The `Text` property provides the prompt text that was being processed.

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

## Key Concepts

### Standard Search

The standard search feature works similarly to the `GridSearchBox` component. It provides text-based filtering across specified Grid columns and maintains a search history.

### Semantic Search

Semantic search is not a built-in feature. The `GridToolBarSmartBoxTool` provides only the UI elements and event handling mechanism. To implement semantic search:

1. Subscribe to the `OnSearch` event of the `GridToolBarSmartBoxToolSemanticSearchSettings`.
1. In the event handler, integrate with your chosen AI service to perform semantic search operations.
1. Update the Grid data based on the semantic search results from your AI service.

For more information, see the [Semantic Search article](slug:grid-ai-semantic-search).

### AI Assistant

The AI assistant feature provides only the UI and event handling. You must implement the actual AI integration:

1. Subscribe to the `OnPromptRequest` event to handle user prompts.
1. Send the prompt to your AI service.
1. Process the AI response and apply the appropriate Grid operations (filtering, sorting, grouping, etc.).
1. Optionally, subscribe to `OnPromptRequestStop` to handle cancellation of ongoing AI operations.

## See Also

* [Grid AI Semantic Search](slug:grid-ai-semantic-search)
* [Grid AI Toolbar Assistant](slug:grid-ai-toolbar-assistant)
* [Grid AI Features Overview](slug:grid-ai-overview)
* [Grid SearchBox](slug:grid-searchbox)
