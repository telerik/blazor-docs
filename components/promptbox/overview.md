---
title: Overview
page_title: PromptBox Overview
description: Overview of the PromptBox for Blazor - a component designed for human-AI communication with speech-to-text, file attachments, and flexible input modes.
slug: promptbox-overview
tags: telerik,blazor,promptbox,ai,communication,speech,files,input
published: True
position: 0
components: ["promptbox"]
---

# Blazor PromptBox Overview

The <a href="https://www.telerik.com/blazor-ui/promptbox" target="_blank">Blazor PromptBox component</a> facilitates human-AI communication with a feature-rich input interface. It combines text input, speech-to-text functionality, file attachments, and intelligent layout adaptation to provide a comprehensive user experience for AI workflows.

The component also offers advanced functionality like automatic mode switching, integrated action buttons, and customizable adornments.

## Basic Usage

1. Add the `<TelerikPromptBox>` tag to a Razor file.
1. Set the `Value` parameter to a `string` object. It supports one-way and two-way binding.
1. (optional) Set the `Mode` parameter to control input behavior: `SingleLine`, `MultiLine`, or `Auto` (default).
1. (optional) Configure built-in features like `EnableSpeechToText` and `EnableFileSelect`.
1. (optional) Handle the `OnPromptAction` event to respond to user submissions.

>caption Basic PromptBox with auto-expanding mode

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  Mode="PromptBoxMode.Auto"
                  Placeholder="Type, speak, or attach files…"
                  OnPromptAction="@OnActionButtonClick" />
<p>Current prompt: @Prompt</p>

@code {
    private string Prompt = string.Empty;

    private async Task OnActionButtonClick(PromptBoxActionButtonEventArgs args)
    {
        if (args.Action == PromptBoxActionType.Send)
        {
            // Process the user input
            Console.WriteLine($"User submitted: {args.Text}");

            // Clear the prompt after processing
            Prompt = string.Empty;
        }
    }
}
````

## Input Modes

The component supports three input modes that adapt to different use cases. [Read more about PromptBox modes...](slug:promptbox-modes).

## File Attachments

Users can attach files directly through the integrated file selection button. [Read more about PromptBox file attachments...](slug:promptbox-attachments).

## Adornments

The PromptBox supports customizable adornments that adapt to the current input mode. You can add custom buttons, icons, or components as prefixes, suffixes, or top-level elements. [Read more about PromptBox adornments...](slug:promptbox-adornments).

## Events

The PromptBox fires events to respond to user interactions and state changes. [Read more about PromptBox events...](slug:promptbox-events).

## PromptBox API

To review all available parameters for the PromptBox component, see the [PromptBox API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikPromptBox#parameters).

## Next Steps

* [Configure File Attachments](slug:promptbox-attachments)
* [Customize Adornments](slug:promptbox-adornments)
* [Explore PromptBox Modes](slug:promptbox-modes)
* [Handle Events](slug:promptbox-events)