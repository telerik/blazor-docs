---
title: How to Automatically Scroll to Bottom
description: Learn how to implement automatic scroll to bottom, after the user submits a message, or a responce is received.
type: how-to
page_title: How to Implement Automatic Scroll to Bottom in the Telerik UI for Blazor PromptBox
slug: promptbox-kb-scroll-to-bottom
tags: blazor, popover, scroll, bottom
ticketid: 1714794
res_type: kb
components: ["promptbox"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>PromptBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB shows how to implement automatic scroll to bottom in the PromptBox, after the user submits a message, or a responce is received.

## Solution

1. Add a `<div>` HTML element that will serve as a scrollable container for the messages. Set its `id` attribute and apply `overflow-y: auto;`.
    ````RAZOR.skip-repl
    <div id="message-list" style="flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:0.75rem;">
    ````

2. Use JS interop to invoke a JavaScript function that sets the scroll position of the messages container.
3. Handle the `OnPromptAction` event of the PromptBox and invoke the JavaScript function after `StateHasChanged()` and a small delay:
    ````RAZOR.skip-repl
    StateHasChanged();
    await Task.Delay(50);
    await JS.InvokeVoidAsync("scrollToBottom", "message-list");
    ````

>caption Scroll to bottom in the PromptBox

````RAZOR
@inject IJSRuntime JS

<div style="max-width:700px; margin:2rem auto; display:flex; flex-direction:column; height:80vh;">

    <div id="message-list" style="flex:1; overflow-y:auto; padding:1rem; display:flex; flex-direction:column; gap:0.75rem;">
        @foreach (var msg in Messages)
        {
            <div style="display:flex; justify-content:@(msg.IsUser ? "flex-end" : "flex-start")">
                <div style="max-width:70%; padding:0.6rem 1rem; border-radius:12px;
                            background:@(msg.IsUser ? "#0078d4" : "#f3f3f3");
                            color:@(msg.IsUser ? "white" : "#1a1a1a");
                            font-size:0.95rem; line-height:1.5; word-break:break-word;">
                    @msg.Text
                </div>
            </div>
        }
        @if (IsLoading)
        {
            <div style="display:flex; justify-content:flex-start">
                <div style="padding:0.6rem 1rem; border-radius:12px; background:#f3f3f3; color:#888; font-style:italic;">
                    AI is thinking…
                </div>
            </div>
        }
    </div>

    <div style="padding-top:0.5rem;">
        <TelerikPromptBox @bind-Value="@Prompt"
                          Mode="PromptBoxMode.Auto"
                          IsLoading="@IsLoading"
                          Placeholder="Type a message…"
                          OnPromptAction="@OnActionButtonClick" />
    </div>
</div>

<script suppress-error="BL9992">
    window.scrollToBottom = function (id) {
        const el = document.getElementById(id);
        if (el) el.scrollTop = el.scrollHeight;
    };
</script>

@code {
    private string Prompt = string.Empty;
    private bool IsLoading { get; set; }

    private List<ChatMessage> Messages { get; set; } = new()
    {
        new ChatMessage(false, "Hello! How can I help you today?"),
        new ChatMessage(true,  "What is Blazor?"),
        new ChatMessage(false, "Blazor is a free and open-source web framework that enables developers to create web apps using C# and HTML. It is part of the ASP.NET Core ecosystem."),
        new ChatMessage(true,  "Can I use it with Telerik components?"),
        new ChatMessage(false, "Absolutely! Telerik UI for Blazor provides a rich set of native Blazor components — grids, charts, inputs, and more — that work seamlessly with both Blazor Server and Blazor WebAssembly.")
    };

    private static readonly string[] SimulatedReplies =
    {
        "That's a great question! Let me think about that for a moment…",
        "Based on what you said, I'd suggest reviewing the official documentation.",
        "Interesting point! In Blazor, you can achieve this with dependency injection and component parameters.",
        "Sure thing! The Telerik Grid supports sorting, filtering, paging, and virtual scrolling out of the box.",
        "You can use @bind-Value for two-way data binding in any Telerik input component.",
        "Great choice! Blazor WebAssembly runs entirely in the browser using WebAssembly.",
        "I recommend checking the Telerik demos at demos.telerik.com/blazor-ui for live examples."
    };

    private static readonly Random Rng = new();

    private async Task OnActionButtonClick(PromptBoxActionButtonEventArgs args)
    {
        if (args.Action == PromptBoxActionType.Stop)
        {
            IsLoading = false;
            return;
        }

        if (args.Action == PromptBoxActionType.Send && !string.IsNullOrWhiteSpace(args.Text))
        {
            Messages.Add(new ChatMessage(true, args.Text));
            Prompt = string.Empty;
            IsLoading = true;

            await ScrollAsync();

            await Task.Delay(Rng.Next(800, 1800));

            Messages.Add(new ChatMessage(false, SimulatedReplies[Rng.Next(SimulatedReplies.Length)]));
            IsLoading = false;

            await ScrollAsync();
        }
    }

    private async Task ScrollAsync()
    {
        StateHasChanged();
        await Task.Delay(50);
        await JS.InvokeVoidAsync("scrollToBottom", "message-list");
    }

    private record ChatMessage(bool IsUser, string Text);
}
````

## See Also

* [PromptBox Events](slug:promptbox-events)
* [PromptBox Overview](slug:promptbox-overview)
