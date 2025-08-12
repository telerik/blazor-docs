---
title: Overview
page_title: Grid - Smart AI Features Overview
description: Learn how to enable smart AI-powered operations with the Blazor Grid data.
slug: grid-ai-overview
tags: telerik,blazor,grid,ai
published: True
position: 1
---

# Grid AI Features

This article describes the built-in AI-enabled features of the Telerik Grid for Blazor. You can allow users to type prompts, which are sent to an AI service that suggests the appropriate data operations for the Grid to perform. The currently supported data operations include filtering, grouping, sorting, and highlighting of items.

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
| `GetAIResult()` | `string` | Returns a `GridAIResult` that you can use to [update properties from the Grid state](slug:grid-state#methods). Processes a serialized `GridAIResponse` object that is received as a string method argument. Then, the Grid applies all defined data operations from the `GridAIResponse` to its state, for example, filtering, grouping, highlighting, and sorting. When using the `GridToolBarAIAssistantTool`, you can set the serialized `GridAIResponse` object from the endpoint directly to `Response` property of the `OnPromptRequest` event argument, which is an `AIPromptPromptRequestEventArgs` object. |

## Tutorial

Use the following steps to implement a scenario with built-in Grid AI integration.

### Install NuGet Package

1. Add the `Telerik.AI.SmartComponents.Extensions` NuGet package to your Blazor app. The package is hosted on `nuget.org`.
1. Import the `Telerik.AI.SmartComponents.Extensions` namespace in your `.razor` file or globally in `_Imports.razor`.

````RAZOR.skip-repl
@using Telerik.AI.SmartComponents.Extensions
````

### Add GridToolBarAIAssistantTool

Add a `GridToolBarAIAssistantTool` tool to the [Grid ToolBar](slug:components/grid/features/toolbar). Subscribe to the `OnPromptRequest` event of the nested `<GridToolBarAIAssistantToolPromptSettings>` component. It is effectively the `OnPromptRequest` event of a [Telerik AIPrompt component](slug:aiprompt-events). Optionally, define some [`PromptSuggestions`](slug:aiprompt-views-prompt).

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

@code {
    private List<string> AIPromptSuggestions { get; set; } = new();

    private async Task OnAIPromptRequest(AIPromptPromptRequestEventArgs args)
    {
    }
}
````

### Implement OnPromptRequest Handler

Implement the `OnPromptRequest` event handler of the AIPrompt that is used internally by the `GridToolBarAIAssistantTool`:

1. Submit the `Request` property of the `OnPromptRequest` event argument to the API endpoint of your AI service.
1. Return a serialized `GridAIResponse` from your API endpoint.
1. Set the `Response` property of the `AIPromptPromptRequestEventArgs` event argument to the `string` response of the API endpoint. Alternatively, execute the Grid `ProcessAIResponseAsync()` method and provide the API response as a `string` argument.

````C#.skip-repl
private async Task OnAIPromptRequest(AIPromptPromptRequestEventArgs args)
{
    try
    {
        HttpResponseMessage requestResult = await this.HttpClientInstance.PostAsJsonAsync("https://.....", args.Request);
        string resultContent = await requestResult.Content.ReadAsStringAsync();
        GridAIResponse aiResponse = await requestResult.Content.ReadFromJsonAsync<GridAIResponse>();

        args.Output = $"The request was processed. {string.Join(". ", aiResponse.Messages)}.";

        args.Response = resultContent;
    }
    catch (Exception)
    {
        args.Output = "The request returned no results. Try another request.";
    }
}
````

## Examples

The following online demos show complete implementations of the Grid AI smart functionality. These examples use a Telerik-hosted AI service for demonstration purposes only. See [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration) for more information on how you can implement your own server-side AI service to be compatible with the Telerik Grid.

* [Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)

## Next Steps

* [Use a Grid AI Column Assistant to perform AI operations that target a specific Grid data item](slug:grid-ai-column)

## See Also

* [InlineAIPrompt Overview](slug:inlineaiprompt-overview)
* [Live Demo: Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Live Demo: Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:common-features-telerik-ai-smartcomponents-extensions-integration)
