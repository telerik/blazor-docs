---
title: Streaming
page_title: InlineAIPrompt Streaming
description: Streaming in the InlineAIPrompt for Blazor.
slug: inlineaiprompt-streaming
tags: telerik,blazor,inlineaiprompt,streaming
published: True
position: 5
---

# Streaming AI Responses with InlineAIPrompt

The UI for Blazor InlineAIPrompt component supports streaming responses, allowing users to see AI-generated content as it is being produced. This feature improves the user experience by providing immediate feedback and a more interactive interface.

Streaming is particularly useful when:

* Working with long-form AI responses that take several seconds to generate.
* Creating inline editing interfaces where users expect real-time feedback.
* Integrating with AI services that support chunked responses.
* Enhancing user engagement in contextual AI assistance scenarios.

## Configuration

To enable streaming in the InlineAIPrompt component, follow these steps:

1. Handle the [`OnPromptRequest`](slug:inlineaiprompt-events#onpromptrequest) event to start streaming output. When the user sends a prompt, the `OnPromptRequest` event is triggered. In the event handler, set up your AI model streaming logic and call the `AppendOutput` method on the TelerikInlineAIPrompt reference to update the output as new data arrives.
2. Handle the [`OnPromptRequestStop`](slug:slug:inlineaiprompt-events#onpromptrequeststop) event to stop streaming.
This event is fired when the user clicks the Stop Generation button. You can use it to cancel the AI request.

When implementing real AI model streaming logic:

* Replace the sample `OutputChunks` loop with your actual AI model streaming code.
* Each time a new piece of text arrives from the AI model, call `AppendOutput` to update the InlineAIPrompt output area.
* If the user clicks the Stop Generation button, cancel the AI request in `OnPromptRequestStop`.

## Example

>caption Using InlineAIPrompt streaming

````Razor
@using System.Threading

<div class="destinations-container">
    @foreach (var destination in TravelDestinations)
    {
        <div class="destination-card"
             @onclick="@((MouseEventArgs e) => OnDestinationContextMenuAsync(e, destination))"
             @onclick:preventDefault="true">
            @destination
        </div>
    }
</div>

<TelerikInlineAIPrompt @ref="@InlinePromptRef"
                       @bind-Prompt="@UserPrompt"
                       OnPromptRequest="@OnPromptRequestAsync"
                       OnPromptRequestStop="@OnPromptRequestStopAsync"
                       PromptContext="@PromptContext">
</TelerikInlineAIPrompt>

@code {
    private string UserPrompt { get; set; }
    private string PromptContext { get; set; }
    private TelerikInlineAIPrompt InlinePromptRef { get; set; }
    private CancellationTokenSource CancellationTokenSource { get; set; }

    private async Task OnPromptRequestStopAsync()
    {
        await CancellationTokenSource.CancelAsync();
    }

    private List<string> TravelDestinations { get; set; } = new()
    {
        "Paris, France",
        "Kyoto, Japan",
        "New York City, USA"
    };

    private List<string> OutputChunks { get; set; } = new()
    {
        "Welcome to your travel guide! \n\n",
        "Paris offers the Eiffel Tower, charming cafés, and world-class museums. \n\n",
        "Don’t miss a day trip to Versailles for breathtaking gardens and history. \n\n",
    };

    private async Task OnDestinationContextMenuAsync(MouseEventArgs e, string destination)
    {
        PromptContext = destination;
        await InlinePromptRef.ShowAsync(e.ClientX, e.ClientY);
    }

    private async Task OnPromptRequestAsync(InlineAIPromptPromptRequestEventArgs args)
    {
        CancellationTokenSource = new CancellationTokenSource();
        foreach (var chunk in OutputChunks)
        {
            InlinePromptRef.AppendOutput(chunk);
            await Task.Delay(1000, CancellationTokenSource.Token);
        }
    }
}

<style>
    .destinations-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
        justify-content: center;
    }

    .destination-card {
        padding: 1rem 1.5rem;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease;
        min-width: 200px;
        text-align: center;
        cursor: pointer;
    }

    .destination-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
</style>
````