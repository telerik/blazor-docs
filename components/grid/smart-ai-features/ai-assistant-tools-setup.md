---
title: AI Assistant Tools Setup
page_title: Grid - AI Assistant Tools Setup
description: Learn how to set up AI assistant tools for the Blazor Grid.
slug: grid-ai-assistant-tools-setup
tags: telerik,blazor,grid,ai,assistant,tools,setup
published: True
position: 5
components: ["grid"]
---

# Grid AI Assistant Tools Setup

The Smart Grid provides AI Assistant tools that enable you to apply Grid operations through natural language prompts. The Grid supports different approaches for connecting these tools to your backend AI service, allowing you to choose the level of control that best fits your application requirements.

The AI Assistant tools that support integration with your AI service are:

* **[AI Smart Box](slug:grid-ai-smart-box)**&mdash;Versatile search box that supports AI Assistant mode for natural language prompts, along with standard search and semantic search functionality.
* **[AI Toolbar Assistant](slug:grid-ai-toolbar-assistant)**&mdash;Dedicated AI Assistant toolbar button for applying AI-powered Grid operations through a standalone prompt interface.

## Integration Approaches

Both AI Assistant tools follow the same integration pattern through the `OnPromptRequest` event. This event fires when a user submits a natural language prompt, allowing you to:

1. Send the user's prompt to your backend AI service
2. Receive a structured response describing Grid operations
3. Apply the AI-suggested operations to the Grid state

The level of control you have depends on how you implement the `OnPromptRequest` handler and process the AI response.

## Prerequisites

Before implementing AI Assistant tools, ensure you have:

* A backend AI service that can process natural language prompts and return structured Grid operation commands
* The [`Telerik.AI.SmartComponents.Extensions` NuGet package](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) installed (if using the Telerik AI service integration)
* An `HttpClient` instance configured for making requests to your AI service

For detailed guidance on implementing a compatible backend service, see [Integration with Telerik.AI.SmartComponents.Extensions](slug:grid-ai-service-setup).

## Basic Setup

### Add Required NuGet Package

Install the `Telerik.AI.SmartComponents.Extensions` package to your project:

````RAZOR.skip-repl
@using Telerik.AI.SmartComponents.Extensions
````

### Configure AI Assistant Tool

Add an AI Assistant tool to your Grid toolbar and implement the `OnPromptRequest` event handler:

````RAZOR.skip-repl
<TelerikGrid Data="@GridData">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolAIAssistantSettings 
                    OnPromptRequest="@OnAIPromptRequest"
                    PromptSuggestions="@AIPromptSuggestions"
                    Placeholder="Ask AI to modify the Grid">
                </GridToolBarSmartBoxToolAIAssistantSettings>
            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>
    </GridToolBar>
    <GridColumns>
        <!-- Grid columns -->
    </GridColumns>
</TelerikGrid>

@code {
    private List<MyDataModel> GridData { get; set; }
    
    private List<string> AIPromptSuggestions { get; set; } = new()
    {
        "Show products with price over 50",
        "Sort by name descending",
        "Group by category"
    };

    private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        // Implement AI service communication
    }
}
````

## AI Service Communication

The `OnPromptRequest` event provides access to the user's prompt through the event arguments. You are responsible for:

1. Sending the prompt to your AI service
2. Receiving and deserializing the response
3. Setting the `Response` property to apply Grid operations automatically

### Standard Implementation

The following example demonstrates the recommended pattern for AI service communication used in the Telerik demos:

````RAZOR.skip-repl
@inject HttpClient HttpClientInstance

@code {
    private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        try
        {
            var requestResult = await HttpClientInstance.PostAsJsonAsync(
                "https://demos.telerik.com/service/v2/ai/grid/smart-state", 
                args.Request);
            
            var resultContent = await requestResult.Content.ReadAsStringAsync();
            var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

            // Setting Response applies the AI operations automatically
            args.Response = resultContent;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"AI request failed: {ex.Message}");
        }
    }
}
````

### Custom Service Implementation

If you have implemented your own backend service using the `Telerik.AI.SmartComponents.Extensions` library, point to your own endpoint:

````RAZOR.skip-repl
private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
{
    try
    {
        var requestResult = await HttpClientInstance.PostAsJsonAsync(
            "https://your-api.com/api/grid/smart-state", 
            args.Request);
        
        var resultContent = await requestResult.Content.ReadAsStringAsync();
        args.Response = resultContent;
    }
    catch (Exception ex)
    {
        // Handle errors appropriately
    }
}
````

## Request and Response Format

### Request Structure

The `args.Request` property contains a `GridAIRequest` object with the following structure:

* `Role`&mdash;The role context (typically "user")
* `Contents`&mdash;Array containing the user's natural language prompt
* `Columns`&mdash;Array of Grid column information (field names, types, titles)

The Grid automatically populates this request object with all necessary context before calling your handler.

### Response Structure

Your AI service must return a `GridAIResponse` object (as a JSON string) with the following properties:

* `State`&mdash;Contains Grid state changes (filtering, sorting, grouping, paging, column visibility)
* `SelectedIndexes`&mdash;Array of row indexes to select
* `HighlightedIndexes`&mdash;Array of row indexes to highlight
* `HighlightedCells`&mdash;Array of cell descriptors for cell-level highlighting
* `Export`&mdash;Export configuration (format, file name)
* `Messages`&mdash;Array of informational messages to display to the user

When you set `args.Response` to the serialized response, the Grid automatically applies all specified operations.

## Semantic Search Integration

The Smart Box tool also supports semantic search, which uses a different integration approach through the `SmartComponents.LocalEmbeddings` library. Semantic search enables users to find data based on meaning rather than exact text matches.

For implementation details and examples of semantic search, see [AI Semantic Search](slug:grid-ai-semantic-search).

## Advanced Scenarios

### Validating AI Responses

You can validate or modify the AI response before applying it to the Grid:

````RAZOR.skip-repl
private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
{
    try
    {
        var requestResult = await HttpClientInstance.PostAsJsonAsync(
            "https://your-api.com/api/grid/smart-state", 
            args.Request);
        
        var resultContent = await requestResult.Content.ReadAsStringAsync();
        var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

        // Validate response
        if (IsValidResponse(gridAIResponse))
        {
            args.Response = resultContent;
        }
        else
        {
            Console.WriteLine("Invalid AI response received");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"AI request failed: {ex.Message}");
    }
}

private bool IsValidResponse(GridAIResponse response)
{
    // Implement your validation logic
    return response != null && response.Messages?.Any() == true;
}
````

### Providing User Feedback

You can provide feedback to users about AI operations through the `Messages` property of the response:

````RAZOR.skip-repl
private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
{
    try
    {
        var requestResult = await HttpClientInstance.PostAsJsonAsync(
            "https://your-api.com/api/grid/smart-state", 
            args.Request);
        
        var resultContent = await requestResult.Content.ReadAsStringAsync();
        var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

        if (gridAIResponse?.Messages != null)
        {
            foreach (var message in gridAIResponse.Messages)
            {
                Console.WriteLine($"AI: {message}");
            }
        }

        args.Response = resultContent;
    }
    catch (Exception ex)
    {
        Console.WriteLine("The request returned no results. Try another request from the prompt suggestions.");
    }
}
````

## Example

The following example demonstrates a complete implementation of the AI Smart Box with custom prompt suggestions:

````RAZOR.skip-repl
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions

@inject HttpClient HttpClientInstance

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolAIAssistantSettings 
                    OnPromptRequest="@OnAIPromptRequest"
                    PromptSuggestions="@AIPromptSuggestions"
                    Placeholder="Ask AI to modify the Grid"
                    EnableSpeechToText="true">
                </GridToolBarSmartBoxToolAIAssistantSettings>
                
                <GridToolBarSmartBoxToolSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSearchSettings>
                
                <GridToolBarSmartBoxToolSemanticSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSemanticSearchSettings>
            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>
    </GridToolBar>
    
    <GridColumns>
        <GridColumn Field="@nameof(Product.ProductName)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.UnitPrice)" Title="Price" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.UnitsInStock)" Title="Stock" />
        <GridColumn Field="@nameof(Product.Category)" Title="Category" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }
    
    private List<string> AIPromptSuggestions { get; set; } = new()
    {
        "Show products with price over 50",
        "Sort by name descending",
        "Group by category",
        "Filter products with low stock",
        "Clear all filters"
    };

    private async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        try
        {
            var requestResult = await HttpClientInstance.PostAsJsonAsync(
                "https://demos.telerik.com/service/v2/ai/grid/smart-state", 
                args.Request);
            
            var resultContent = await requestResult.Content.ReadAsStringAsync();
            var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

            args.Response = resultContent;
        }
        catch (Exception)
        {
            Console.WriteLine("The request returned no results. Try another request from the prompt suggestions.");
        }
    }

    protected override void OnInitialized()
    {
        GridData = GetProducts();
    }

    private List<Product> GetProducts()
    {
        // Return your data
        return new List<Product>();
    }

    public class Product
    {
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
        public string Category { get; set; }
    }
}
````

## See Also

* [Grid AI Smart Box](slug:grid-ai-smart-box)
* [Grid AI Toolbar Assistant](slug:grid-ai-toolbar-assistant)
* [Grid AI Row Highlight](slug:grid-ai-row-highlight)
* [Grid AI Semantic Search](slug:grid-ai-semantic-search)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:grid-ai-service-setup)
* [Grid Toolbar](slug:grid-toolbar)
