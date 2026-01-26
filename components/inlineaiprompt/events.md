---
title: Events
page_title: InlineAIPrompt - Events
description: Events in the InlineAIPrompt for Blazor.
slug: inlineaiprompt-events
tags: telerik,blazor,inlineaiprompt,events
published: true
position: 10
components: ["inlineaiprompt"]
---
# InlineAIPrompt Events

This article describes the events of the Telerik InlineAIPrompt for Blazor:

* [`OnOutputActionClick`](#onoutputactionclick)
* [`OnPromptRequest`](#onpromptrequest)
* [`OnPromptRequestStop`](#onpromptrequeststop)
* [`OnCommandExecute`](#oncommandexecute)
* [`PromptChanged`](#promptchanged)

## OnOutputActionClick

The `OnOutputActionClick` event fires when the user clicks an output action button in the output view of the InlineAIPrompt component. Use this event to handle custom actions such as copying, retrying, or providing feedback on the generated output.

To define the available output actions, set the `OutputActions` parameter to a list of [`InlineAIPromptOutputActionDescriptor`](slug:Telerik.Blazor.Components.InlineAIPromptOutputActionDescriptor) objects. Each action descriptor configures the appearance and behavior of an action button.

The event handler receives an argument of type [`InlineAIPromptOutputActionClickEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptOutputActionClickEventArgs), which provides details about the clicked action, the prompt, the output, and the related command (if any).

## OnPromptRequest

The `OnPromptRequest` event fires when the user clicks on the **Generate** button within the Prompt view or retries a prompt from the Output view.

The event handler receives an argument of type [`InlineAIPromptPromptRequestEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptPromptRequestEventArgs). See the [example below](#example).

> Do not use the `OnPromptRequest` event when [integrating the InlineAIPrompt component with `Microsoft.Extensions.AI`](slug:common-features-microsoft-extensions-ai-integration). The `OnPromptRequest` event disables such integration.

## OnPromptRequestStop

The `OnPromptRequestStop` event fires when the user stops a prompt request by clicking the stop floating action button in the output view. This event allows you to handle the cancellation of an ongoing prompt request.

The event handler receives no arguments.

## OnCommandExecute

The `OnCommandExecute` event fires when the user clicks on a command within the Commands view.

The event handler receives an argument of type [`InlineAIPromptCommandExecuteEventArgs` API reference](slug:Telerik.Blazor.Components.InlineAIPromptCommandExecuteEventArgs). See the [example below](#example).

## PromptChanged

The `PromptChanged` event fires when the user changes the prompt text. Use the event to update the InlineAIPrompt's prompt when the `Prompt` parameter is set with one-way binding, otherwise, the user action will be ignored.

## Example

>caption Using InlineAIPrompt events

````Razor
<div class="genres-container">
    @foreach (var genre in MovieGenres)
    {
        <TelerikButton Class="genre-card"
                       OnClick="@((MouseEventArgs e) => OnGenreContextMenuAsync(e, genre))">
            @genre
        </TelerikButton>
    }
</div>

<TelerikInlineAIPrompt @ref="@InlinePromptRef"
                       @bind-Prompt="@UserPrompt"
                       EnableSpeechToText="true"
                       OnPromptRequest="@OnPromptRequest"
                       OnCommandExecute="@OnCommandExecute"
                       OnPromptRequestStop="@OnPromptRequestStop"
                       OnOutputActionClick="@OnOutputActionClick"
                       Commands="@Commands"
                       OutputActions="@OutputActions"
                       PromptContext="@PromptContext">
</TelerikInlineAIPrompt>

<div id="events-log">
    @((MarkupString)EventsLog)
</div>

@code {
    private int PromptRequestsCount { get; set; } = 0;
    private string EventsLog { get; set; } = string.Empty;
    private string UserPrompt { get; set; } = string.Empty;
    private string PromptContext { get; set; } = string.Empty;
    private TelerikInlineAIPrompt? InlinePromptRef { get; set; }

    private List<InlineAIPromptCommandDescriptor> Commands { get; set; } = new()
    {
        new InlineAIPromptCommandDescriptor()
        {
            Id = "recommend",
            Title = "Recommend Movies",
            Icon = SvgIcon.Sparkles,
            Prompt = "Suggest top-rated movies in this genre.",
            Children = new List<InlineAIPromptCommandDescriptor>
            {
                new InlineAIPromptCommandDescriptor()
                {
                    Id = "recommend-classics",
                    Title = "Classic Picks",
                    Icon = SvgIcon.Star,
                    Prompt = "List timeless classics in this genre."
                },
                new InlineAIPromptCommandDescriptor()
                {
                    Id = "recommend-new",
                    Title = "New Releases",
                    Icon = SvgIcon.Calendar,
                    Prompt = "List recent must-watch releases in this genre."
                }
            }
        },
        new InlineAIPromptCommandDescriptor()
        {
            Id = "trivia",
            Title = "Genre Trivia",
            Icon = SvgIcon.AggregateFields,
            Prompt = "Share fun facts and trivia about this movie genre."
        }
    };

    private List<InlineAIPromptOutputActionDescriptor> OutputActions { get; set; } = new()
    {
        new InlineAIPromptOutputActionDescriptor()
        {
            Text = "Mark as Favorite",
            Icon = SvgIcon.Heart,
            Title = "Save this recommendation to favorites",
            Enabled = true,
        },
        new InlineAIPromptOutputActionDescriptor
        {
            Name = "Retry",
        },
        new InlineAIPromptOutputActionDescriptor
        {
            Name = "Copy",
        },
        new InlineAIPromptOutputActionDescriptor
        {
            Name = "Discard",
        }
    };

    private List<string> MovieGenres { get; set; } = new()
    {
        "Action",
        "Comedy",
        "Drama",
        "Science Fiction"
    };

    private async Task OnGenreContextMenuAsync(MouseEventArgs e, string genre)
    {
        PromptContext = genre;
        await InlinePromptRef!.ShowAsync(e.ClientX, e.ClientY);
    }

    private async Task OnPromptRequest(InlineAIPromptPromptRequestEventArgs args)
    {
        await Task.Delay(200);
        args.Output = $"AI suggestion for prompt #{PromptRequestsCount++} in {PromptContext}";
        EventsLog += $"OnPromptRequest fired <br />";
    }

    private async Task OnCommandExecute(InlineAIPromptCommandExecuteEventArgs args)
    {
        await Task.Delay(200);
        args.Output = $"AI executed: {args.Command.Title} for {PromptContext}";
        EventsLog += $"OnCommandExecute fired <br />";
    }

    private void OnPromptRequestStop()
    {
        EventsLog += $"OnPromptRequestStop: Prompt request stopped. <br />";
    }

    private void OnOutputActionClick(InlineAIPromptOutputActionClickEventArgs args)
    {
        EventsLog += $"OnOutputActionClick fired <br />";
    }
}

<style>
    .genres-container {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
        justify-content: center;
    }

    .genre-card {
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

        .genre-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

    #events-log {
        padding: 1rem;
        font-family: monospace;
        font-size: 0.9rem;
        border-top: 1px solid #ddd;
    }
</style>
````