---
title: Overview
page_title: Grid - Smart AI Features Overview
description: Learn how to enable smart AI-powered operations with the Blazor Grid data.
slug: grid-ai-overview
tags: telerik,blazor,grid,ai
published: True
position: 1
components: ["grid"]
---
# Grid AI Features

This article describes the built-in AI-enabled features of the Telerik Grid for Blazor. You can allow users to type prompts, which are sent to an AI service that suggests the appropriate operations for the Grid to perform. The currently supported operations include those managed through the Grid state (such as filtering and sorting) and those triggered through Grid methods, for example, export.

## Supported Operations

The Prompt-Controlled DataGrid currently supports the following data operations through natural language prompts:

* Filtering&mdash;Filter data based on specific criteria (for example, "Show only products with price greater than 100").
* **Sorting** - Sort data by one or multiple columns (for example, "Sort by name in ascending order").
* **Grouping** - Group data by specific fields (for example, "Group by category").
* **Highlighting** - Highlight specific rows or cells that meet certain conditions (for example, "Highlight products that are out of stock").
* **Column Operations** – Resize, reorder (change column position), show/hide, and lock/unlock columns.
* **Pagination** – Navigate between pages and adjust page sizes.
* **Selection** – Select or deselect rows based on criteria, or select/deselect all.
* **Export** – Export grid data to Excel, PDF, or CSV formats.

## AI Tools

The Grid provides multiple AI-powered tools that you can add to the Grid toolbar:

* **[Grid Toolbar AI Assistant](slug:grid-ai-toolbar-assistant)**&mdash;A built-in toolbar component that integrates an AI prompt interface for natural language Grid operations.
* **[Grid Smart Box](slug:grid-ai-smart-box)**&mdash;A comprehensive toolbar component that combines standard search, semantic search, and AI assistant features. Note that semantic search and AI assistant features provide only UI and event handling—you must implement the AI integration yourself.

## API Reference

The following types and Grid methods are relevant to scenarios when you want to integrate AI functionality with the Telerik Grid.

See [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration) for more information on how you can implement your server-side AI service to be compatible with the Telerik Grid.

### Types

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Class Name | Description |
| --- | --- |
| `GridAIRequestDescriptor` | Contains information about the Grid column `Field`s and the user's prompt. |
| `GridAIResponse` | Contains information about the data operations that the Grid must perform. Supported operations include filtering, grouping, highlighting, and sorting. The object also has a `Messages` property that contains the AI string responses. `GridAIResponse` is the type that your AI service must return. |
| `GridAIResult` | Contains converted objects that are compatible with the [Grid State properties](slug:grid-state#information-in-the-grid-state). Use this type if you want to [modify the Grid state](slug:grid-state#methods) in a more granular fashion, rather then apply all changes suggested by AI at once. |

### Grid Methods

The following Grid methods work with the above types.

| Grid Method | Argument Type | Description |
| --- | --- | --- |
| `GetAIRequest()` | `string` | Returns a `GridAIRequestDescriptor` that includes the user prompt if you pass it as a method argument. When using the `GridToolBarAIAssistantTool`, the app can receive the `GridAIRequestDescriptor` automatically from the `Request` property of the `OnPromptRequest` event argument, which is an `AIPromptPromptRequestEventArgs` object. |
| `ProcessAIResponseAsync()` | `string` | Processes a serialized `GridAIResponse` object that is received as a string method argument. Then, the Grid applies all defined data operations from the `GridAIResponse` to its state, for example, filtering, grouping, highlighting, and sorting. When using the `GridToolBarAIAssistantTool`, you can set the serialized `GridAIResponse` object from the endpoint directly to `Response` property of the `OnPromptRequest` event argument, which is an `AIPromptPromptRequestEventArgs` object. |

### Semantic Search

The semantic search functionality available through the `GridToolBarSmartBoxTool` is not a built-in feature. Telerik UI for Blazor provides only the user interface and event handlers. You must implement the actual semantic search logic by integrating with an AI service of your choice. This approach gives you flexibility in choosing your AI provider and customizing the search logic to fit your data model.

For detailed information on implementing semantic search, see the [Grid AI Semantic Search article](slug:grid-ai-semantic-search).

## Examples

The following online demos show complete implementations of the Grid AI smart functionality. These examples use a Telerik-hosted AI service for demonstration purposes only. See [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration) for more information on how you can implement your own server-side AI service to be compatible with the Telerik Grid.

* [Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)

## Next Steps

* [Use the Grid Toolbar AI Assistant to enable AI-powered operations](slug:grid-ai-toolbar-assistant)
* [Configure the Grid Smart Box with search, semantic search, and AI assistant features](slug:grid-ai-smart-box)
* [Implement semantic search functionality](slug:grid-ai-semantic-search)
* [Use a Grid AI Column Assistant to perform AI operations that target a specific Grid data item](slug:grid-ai-column)

## See Also

* [Grid Toolbar AI Assistant](slug:grid-ai-toolbar-assistant)
* [Grid Smart Box](slug:grid-ai-smart-box)
* [Grid AI Semantic Search](slug:grid-ai-semantic-search)

* [InlineAIPrompt Overview](slug:inlineaiprompt-overview)
* [Live Demo: Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Live Demo: Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration)
