---
title: Overview
page_title: InlineAIPrompt Overview
description: Overview of the InlineAIPrompt for Blazor.
slug: inlineaiprompt-overview
tags: telerik,blazor,inlineaiprompt,overview
published: True
position: 0
---

# Blazor InlineAIPrompt Overview

The UI for Blazor InlineAIPrompt is a popup-based component that lets you interact with AI language models right inside your content.

It provides a simple and focused way to send prompts and get responses from AI without interrupting the user’s flow. The InlineAIPrompt is great for adding contextual AI help exactly where users need it.

## Creating Blazor InlineAIPrompt

1. Add the `<TelerikInlineAIPrompt>` tag.
2. Subscribe to the `OnPromptRequest` event that will fire whenever the user sends a prompt request. The handler expects an argument of type `InlineAIPromptPromptRequestEventArgs`.
3. Set the `Prompt` parameter
4. (optional) Set the `PromptContext` parameter

>caption Telerik Blazor InlineAIPrompt

````Razor
<div class="products-container">
    @foreach (var product in Products)
    {
        <div class="product-card"
             @onclick="@((MouseEventArgs e) => ShowPromptAsync(e, product))"
             @onclick:preventDefault="true">
            @product
        </div>
    }
</div>

<TelerikInlineAIPrompt @ref="@InlinePromptRef"
                       @bind-Prompt="@UserPrompt"
                       OnPromptRequest="@OnPromptRequest"
                       PromptContext="@PromptContext">
</TelerikInlineAIPrompt>

@code {
    private string UserPrompt { get; set; }
    private string PromptContext { get; set; }
    private TelerikInlineAIPrompt InlinePromptRef { get; set; }

    private List<string> Products { get; set; } = new()
    {
        "Wireless Noise-Cancelling Headphones",
        "Smart Home Thermostat",
        "4K Ultra HD Monitor"
    };

    private async Task ShowPromptAsync(MouseEventArgs e, string product)
    {
        PromptContext = product;
        await InlinePromptRef.ShowAsync(e.ClientX, e.ClientY);
    }

    private void OnPromptRequest(InlineAIPromptPromptRequestEventArgs args)
    {
        args.Output = $"AI assistance for: {PromptContext}";
    }
}

<style>
    .products-container {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 1rem;
    }

    .product-card {
        padding: 1rem;
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        min-width: 220px;
        text-align: center;
        cursor: pointer;
    }
</style>
````

## Streaming

The InlineAIPrompt component supports streaming responses, letting users view AI-generated content in real time as it’s created. [Read more about the Blazor InlineAIPrompt streaming...](slug:inlineaiprompt-streaming)

## Events

The InlineAIPrompt component offers several events that allow developers to handle user interactions and processes effectively. [Read more about the Blazor InlineAIPrompt events...](slug:inlineaiprompt-events)

## InlineAIPrompt Parameters

The following table lists the InlineAIPrompt parameters. Also check the [InlineAIPrompt API Reference](slug:Telerik.Blazor.Components.TelerikInlineAIPrompt) for a full list of all properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | `The class that is rendered on the .k-prompt element.` |
| `Commands` | `List<AIPromptCommandDescriptor>` | `Configures predefined commands for the component.` |
| `EnableSpeechToText` | `bool` | `Specifies whether to enable speech to text functionality.` |
| `OutputActions` | `List<AIPromptOutputActionDescriptor>` | `Defines the output actions.` |
| `Placeholder` | `string` | `Placeholder text for the input field.` |
| `Prompt` | `string` | `The value of the text field and the prompt that is sent to the AI service.` |
| `PromptContext` | `string` | `Defines the additional context that is passed with the input/command prompt and system prompt.` |
| `SystemPrompt` | `string` | `Defines the system prompt that is used when the component is integrated with MEAI.` |

### Settings and Commands

The InlineAIPrompt exposes settings for itself and its speech to text button. To configure the options, declare a  `<InlineAIPromptPopupSettings>` or `InlineAIPromptSpeechToTextButtonSettings` tag inside a `<InlineAIPromptSettings>` tag.

The InlineAIPrompt component also exposes an option to set predefined commands. To configure the actions, use the `Commands` parameter and subscribe to the `OnCommandExecute` event that will fire whenever the user executes a command. The handler expects an argument of type `InlineAIPromptCommandExecuteEventArgs`.

````Razor
<div class="destinations-container">
    @foreach (var destination in TravelDestinations)
    {
        <div class="destination-card"
             @onclick="@((MouseEventArgs e) => ShowPromptAsync(e, destination))"
             @onclick:preventDefault="true">
            @destination
        </div>
    }
</div>

<TelerikInlineAIPrompt @ref="@InlinePromptRef"
                       @bind-Prompt="@UserPrompt"
                       OnPromptRequest="@OnPromptRequest"
                       Commands="@Commands"
                       OnCommandExecute="@OnCommandExecute"
                       EnableSpeechToText="true"
                       PromptContext="@PromptContext">
    <InlineAIPromptSettings>
        <InlineAIPromptPopupSettings AnimationDuration="300"
                                     MaxWidth="400px"
                                     MaxHeight="200px"
                                     AnimationType="@AnimationType.SlideDown"
                                     HorizontalCollision="@PopupCollision.Fit"
                                     VerticalCollision="@PopupCollision.Fit"
                                     VerticalOffset="5" />
        <InlineAIPromptSpeechToTextButtonSettings FillMode="@ThemeConstants.Button.FillMode.Outline"
                                                  Size="@ThemeConstants.Button.Size.Medium"
                                                  Rounded="@ThemeConstants.Button.Rounded.Full"
                                                  ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                                                  Lang="en-US"
                                                  MaxAlternatives="3" />
    </InlineAIPromptSettings>
</TelerikInlineAIPrompt>

@code {
    private string UserPrompt { get; set; }
    private string PromptContext { get; set; }
    private TelerikInlineAIPrompt InlinePromptRef { get; set; }

    private List<InlineAIPromptCommandDescriptor> Commands { get; set; } = new()
    {
        new InlineAIPromptCommandDescriptor()
        {
            Id = "summarize",
            Title = "Summarize Destination",
            Icon = SvgIcon.Sparkles,
            Prompt = "Provide a short summary of this travel destination, including key attractions and best time to visit.",
            Children = new List<InlineAIPromptCommandDescriptor>
            {
                new InlineAIPromptCommandDescriptor()
                {
                    Id = "summarize-attractions",
                    Title = "Summarize Attractions",
                    Icon = SvgIcon.MapMarker,
                    Prompt = "List the main tourist attractions and landmarks for this destination."
                },
                new InlineAIPromptCommandDescriptor()
                {
                    Id = "summarize-food",
                    Title = "Summarize Food Culture",
                    Prompt = "Describe the local cuisine and must-try dishes for this destination."
                }
            }
        },
        new InlineAIPromptCommandDescriptor()
        {
            Id = "travelTips",
            Title = "Travel Tips",
            Icon = SvgIcon.AggregateFields,
            Prompt = "List useful travel tips for visiting this destination, such as transportation, cultural etiquette, and safety advice."
        }
    };

    private List<string> TravelDestinations { get; set; } = new()
    {
        "Tokyo, Japan",
        "Paris, France",
        "New York City, USA"
    };

    private async Task OnCommandExecute(InlineAIPromptCommandExecuteEventArgs args)
    {
        await Task.Delay(500);
        args.Output = $"AI-generated content for: {args.Command.Title} ({PromptContext})";
    }

    private async Task ShowPromptAsync(MouseEventArgs e, string destination)
    {
        PromptContext = destination;
        await InlinePromptRef.ShowAsync(e.ClientX, e.ClientY);
    }

    private void OnPromptRequest(InlineAIPromptPromptRequestEventArgs args)
    {
        args.Output = $"General AI assistance for: {PromptContext}";
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

## InlineAIPrompt Reference

Use the component reference to execute the following methods.

| Method      | Description |
|-------------|-------------|
| `Refresh`   | Re-renders the component. |
| `ShowAsync` | Shows the inline prompt at defined coordinates. Accepts two parameters: X and Y coordinates to position the popup. |
| `HideAsync` | Hides the inline prompt. |

## See Also

* [Live Demo: InlineAIPrompt](https://demos.telerik.com/blazor-ui/inlineaiprompt/overview)