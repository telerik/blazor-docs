---
title: Prompt-Controlled DataGrid
page_title: Grid - Prompt-Controlled DataGrid
description: Learn how to control the Blazor Grid through natural language prompts using the built-in AI assistant tool.
slug: grid-prompt-controlled
tags: telerik,blazor,grid,ai,prompt,prompt-controlled
published: True
position: 5
---

# Prompt-Controlled DataGrid

The Prompt-Controlled DataGrid feature allows users to interact with the Blazor Grid using natural language prompts. Instead of manually configuring filters, sorting, grouping, and other data operations, users can type their requirements in plain text, and an AI service translates these instructions into actual Grid operations.

This feature enhances user experience by making the Grid more accessible and intuitive, especially for users who may not be familiar with traditional data manipulation interfaces.

## How It Works

The Prompt-Controlled DataGrid feature consists of the following components:

1. **AI Assistant Tool** - A built-in toolbar tool (`GridToolBarAIAssistantTool`) that displays an AI Prompt interface.
2. **Natural Language Processing** - Users type prompts in plain language describing their desired data operations.
3. **AI Service Integration** - The prompts are sent to an AI service that analyzes the request and returns appropriate Grid operations.
4. **Automatic Grid Updates** - The Grid automatically applies the suggested operations (filtering, sorting, grouping, highlighting) to its data.

## Supported Operations

The Prompt-Controlled DataGrid currently supports the following data operations through natural language prompts:

* **Filtering** - Filter data based on specific criteria (for example, "Show only products with price greater than 100").
* **Sorting** - Sort data by one or multiple columns (for example, "Sort by name in ascending order").
* **Grouping** - Group data by specific fields (for example, "Group by category").
* **Highlighting** - Highlight specific rows or cells that meet certain conditions (for example, "Highlight products that are out of stock").

## Getting Started

To implement a Prompt-Controlled DataGrid, follow these steps:

### Step 1: Install Required Package

Add the `Telerik.AI.SmartComponents.Extensions` NuGet package to your Blazor app. This package provides the necessary types and integration support.

````C#.skip-repl
@using Telerik.AI.SmartComponents.Extensions
````

### Step 2: Add the AI Assistant Tool

Add the `GridToolBarAIAssistantTool` to your Grid toolbar. This tool provides the user interface for entering prompts.

````RAZOR.skip-repl
<TelerikGrid>
    <GridToolBar>
        <GridToolBarAIAssistantTool>
            <GridToolBarAIAssistantToolSettings>
                <GridToolBarAIAssistantToolPromptSettings OnPromptRequest="@OnAIPromptRequest"
                                                          PromptSuggestions="@AIPromptSuggestions">
                </GridToolBarAIAssistantToolPromptSettings>
            </GridToolBarAIAssistantToolSettings>
        </GridToolBarAIAssistantTool>
    </GridToolBar>
</TelerikGrid>
````

### Step 3: Handle Prompt Requests

Implement the `OnPromptRequest` event handler to connect the Grid with your AI service. The handler receives the user's prompt and Grid metadata, sends it to the AI service, and returns the response.

````C#.skip-repl
private async Task OnAIPromptRequest(AIPromptPromptRequestEventArgs args)
{
    try
    {
        // Send the prompt to your AI service
        HttpResponseMessage requestResult = await HttpClient.PostAsJsonAsync("your-ai-endpoint", args.Request);
        string resultContent = await requestResult.Content.ReadAsStringAsync();
        GridAIResponse aiResponse = await requestResult.Content.ReadFromJsonAsync<GridAIResponse>();

        // Set the AI response message
        args.Output = $"Applied: {string.Join(", ", aiResponse.Messages)}";

        // Apply the AI-suggested operations to the Grid
        args.Response = resultContent;
    }
    catch (Exception)
    {
        args.Output = "Unable to process the request. Please try again.";
    }
}
````

### Step 4: (Optional) Add Prompt Suggestions

Provide predefined prompt suggestions to help users get started quickly.

````C#.skip-repl
private List<string> AIPromptSuggestions { get; set; } = new()
{
    "Show products with price over $50",
    "Group by category and sort by price",
    "Highlight out of stock items",
    "Filter discontinued products"
};
````

## Example Use Cases

The Prompt-Controlled DataGrid is ideal for various scenarios:

* **Business Intelligence Dashboards** - Allow non-technical users to explore data without learning complex filtering interfaces.
* **Data Analysis Tools** - Enable analysts to quickly manipulate data views using natural language.
* **Customer Support Portals** - Help support staff find relevant information faster.
* **Enterprise Applications** - Improve productivity by reducing the learning curve for new users.

## API Reference

The following types are essential for implementing a Prompt-Controlled DataGrid:

| Type | Description |
| --- | --- |
| `GridAIRequestDescriptor` | Contains the user's prompt and Grid column metadata. |
| `GridAIResponse` | Contains the AI service response with suggested data operations. |
| `GridAIResult` | Contains converted objects compatible with Grid state for more granular control. |

The Grid provides these methods for working with AI operations:

| Method | Description |
| --- | --- |
| `GetAIRequest(string prompt)` | Returns a `GridAIRequestDescriptor` with the user prompt and Grid metadata. |
| `ProcessAIResponseAsync(string response)` | Processes the AI response and applies all suggested operations to the Grid. |
| `GetAIResult(string response)` | Returns a `GridAIResult` for more granular control over applying operations. |

## Complete Example

For a complete, runnable example of a Prompt-Controlled DataGrid, refer to these live demos:

* [Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)

>note The demos use a Telerik-hosted AI service for demonstration purposes only. For production use, implement your own AI service. See [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration) for details.

## Related Articles

* [Grid AI Features Overview](slug:grid-ai-overview)
* [Grid AI Column Assistant](slug:grid-ai-column)
* [AIPrompt Component](slug:aiprompt-overview)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration)

## See Also

* [Live Demo: Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Live Demo: Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)
* [Grid API Reference](slug:Telerik.Blazor.Components.TelerikGrid-1)
