---
title: AI Toolbar Assistant
page_title: Grid - AI Toolbar Assistant
description: Learn how to use the GridToolBarAIAssistantTool to enable AI-powered operations in the Blazor Grid.
slug: grid-ai-toolbar-assistant
tags: telerik,blazor,grid,ai,assistant,toolbar
published: True
position: 20
components: ["grid"]
---

# Grid AI Toolbar Assistant

The `GridToolBarAIAssistantTool` is a built-in toolbar tool that integrates an AI prompt interface directly into the Grid toolbar. It allows users to type natural language prompts that can be sent to an AI service, which then suggests appropriate data operations for the Grid to perform.

## Tutorial

Use the following steps to implement a scenario with built-in Grid AI integration using the `GridToolBarAIAssistantTool`.

### Install NuGet Package

1. Add the [`Telerik.AI.SmartComponents.Extensions` NuGet package](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) to your Blazor app.
1. Import the `Telerik.AI.SmartComponents.Extensions` namespace in your `.razor` file or globally in `_Imports.razor`.

````RAZOR.skip-repl
@using Telerik.AI.SmartComponents.Extensions
````

### Add GridToolBarAIAssistantTool

1. Add a `GridToolBarAIAssistantTool` tool to the [Grid ToolBar](slug:components/grid/features/toolbar). 
2. Subscribe to the `OnPromptRequest` event of the nested `<GridToolBarAIAssistantToolPromptSettings>` component. It is effectively the `OnPromptRequest` event of a [Telerik AIPrompt component](slug:aiprompt-events).
3. Optionally, define some [`PromptSuggestions`](slug:aiprompt-views-prompt).

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

The following online demos show complete implementations of the Grid AI smart functionality with the `GridToolBarAIAssistantTool`. These examples use a Telerik-hosted AI service for demonstration purposes only. See [Integration with Telerik.AI.SmartComponents.Extensions](slug:grid-ai-service-setup) for more information on how you can implement your own server-side AI service to be compatible with the Telerik Grid.

* [Grid AI Data Operations](https://demos.telerik.com/blazor-ui/grid/ai-data-operations)
* [Grid AI Data Highlight](https://demos.telerik.com/blazor-ui/grid/ai-highlight)

## See Also

* [Grid AI Features Overview](slug:grid-ai-overview)
* [InlineAIPrompt Overview](slug:inlineaiprompt-overview)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:grid-ai-service-setup)
