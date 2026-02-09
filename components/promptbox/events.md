---
title: Events
page_title: PromptBox - Events
description: Events in the PromptBox for Blazor - handle user interactions, value changes, and action button clicks in AI communication scenarios.
slug: promptbox-events
tags: telerik,blazor,promptbox,events,action,speech,files
published: true
position: 20
components: ["promptbox"]
---

# Events

The Blazor PromptBox component provides comprehensive event handling for user interactions and state changes. This article explains the events available in the PromptBox component and how to use them effectively.

The PromptBox fires events for text input changes, action button interactions, speech-to-text results, and file selection activities.

### OnPromptAction

The `OnPromptAction` event represents the primary user action for submitting content or stopping ongoing operations. This event fires when:

* The user clicks the action button
* The user presses **Enter** (when content is available and not loading)
* The button state changes between Send and Stop modes

The event provides `PromptBoxActionButtonEventArgs` containing the current text and action type.

>caption Handle action button interactions

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  IsLoading="@IsProcessing"
                  OnPromptAction="@OnActionClick"
                  Placeholder="Type your message or question...">
</TelerikPromptBox>

<div class="mt-3">
    <h5>Event Log:</h5>
    <ul class="list-unstyled">
        @foreach (var logEntry in EventLog)
        {
            <li class="text-muted small">@logEntry</li>
        }
    </ul>
</div>

@code {
    private string Prompt = string.Empty;
    private bool IsProcessing;
    private List<string> EventLog = new();

    private async Task OnActionClick(PromptBoxActionButtonEventArgs args)
    {
        var timestamp = DateTime.Now.ToString("HH:mm:ss");

        if (args.Action == PromptBoxActionType.Send)
        {
            EventLog.Add($"{timestamp} - Send action: '{args.Text}'");
            IsProcessing = true;

            // Simulate processing
            await Task.Delay(2000);

            EventLog.Add($"{timestamp} - Processing completed");
            Prompt = string.Empty; // Clear after processing
            IsProcessing = false;
        }
        else if (args.Action == PromptBoxActionType.Stop)
        {
            EventLog.Add($"{timestamp} - Stop action requested");
            IsProcessing = false;
        }

        StateHasChanged();
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

### ValueChanged

The `ValueChanged` event fires upon every change in the text input (such as each keystroke). When using the `ValueChanged` event, you cannot use two-way data binding because the `@bind-Value` directive internally uses this event.

>caption Handle ValueChanged event

````RAZOR
<TelerikPromptBox Value="@Prompt"
                  ValueChanged="OnValueChanged"
                  Placeholder="Type to see value changes...">
</TelerikPromptBox>

<div class="mt-3">
    <p><strong>Current value:</strong> @Prompt</p>
    <p><strong>Character count:</strong> @CharacterCount</p>
    <p><strong>Word count:</strong> @WordCount</p>
</div>

@code {
    private string Prompt = string.Empty;
    
    private int CharacterCount => Prompt?.Length ?? 0;
    private int WordCount => string.IsNullOrWhiteSpace(Prompt) 
        ? 0 
        : Prompt.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;

    private void OnValueChanged(string newValue)
    {
        Prompt = newValue;
        // Perform real-time validation or processing
        StateHasChanged();
    }
}
````

### OnChange

The `OnChange` event represents a user confirmation of the current value. It fires when the input loses focus and the value has changed since it gained focus.

>caption Handle OnChange event

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  OnChange="OnChangeHandler"
                  Placeholder="Type and click outside to trigger OnChange...">
</TelerikPromptBox>

<p class="mt-3">Last committed value: <strong>@LastCommittedValue</strong></p>

@code {
    private string Prompt = string.Empty;
    private string LastCommittedValue = string.Empty;

    private void OnChangeHandler(object input)
    {
        LastCommittedValue = input as string ?? string.Empty;
        Console.WriteLine($"Value committed: {LastCommittedValue}");
        StateHasChanged();
    }
}
````

### OnBlur

The `OnBlur` event fires when the PromptBox loses focus, regardless of whether the value has changed.

>caption Handle OnBlur event

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  OnBlur="OnBlurHandler"
                  Placeholder="Click outside to lose focus...">
</TelerikPromptBox>

<p class="mt-3">Focus events: @FocusEventCount</p>

@code {
    private string Prompt = string.Empty;
    private int FocusEventCount = 0;

    private void OnBlurHandler()
    {
        FocusEventCount++;
        Console.WriteLine("PromptBox lost focus");
        StateHasChanged();
    }
}
````

## Speech-to-Text Events

When speech-to-text functionality is enabled, the PromptBox provides events through the [`PromptBoxSpeechToTextButtonSettings`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikPromptBox.ButtonSettings.PromptBoxSpeechToTextButtonSettings):

### OnStart

Fires when speech recognition begins.

### OnResult

Fires when speech recognition returns results. Provides `SpeechToTextButtonResultEventArgs` with recognition data.

### OnEnd

Fires when speech recognition ends or disconnects.

### OnError

Fires when a speech recognition error occurs.

>caption Speech-to-text event handling

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  EnableSpeechToText="true"
                  Placeholder="Click microphone or type...">
    <PromptBoxSettings>
        <PromptBoxSpeechToTextButtonSettings Lang="en-US"
                                             OnStart="OnSpeechStart"
                                             OnResult="OnSpeechResult"
                                             OnEnd="OnSpeechEnd"
                                             OnError="OnSpeechError" />
    </PromptBoxSettings>
</TelerikPromptBox>

<div class="mt-3">
    <div class="alert alert-info">
        <strong>Speech Status:</strong> @SpeechStatus
    </div>
    @if (!string.IsNullOrEmpty(LastSpeechResult))
    {
        <div class="alert alert-success">
            <strong>Last Recognition:</strong> @LastSpeechResult
        </div>
    }
    @if (!string.IsNullOrEmpty(SpeechError))
    {
        <div class="alert alert-danger">
            <strong>Speech Error:</strong> @SpeechError
        </div>
    }
</div>

@code {
    private string Prompt = string.Empty;
    private string SpeechStatus = "Ready";
    private string LastSpeechResult = string.Empty;
    private string SpeechError = string.Empty;

    private void OnSpeechStart()
    {
        SpeechStatus = "Listening...";
        SpeechError = string.Empty;
        StateHasChanged();
    }

    private void OnSpeechResult(SpeechToTextButtonResultEventArgs args)
    {
        if (args.IsFinal)
        {
            SpeechStatus = "Recognition completed";
        }
        else
        {
            SpeechStatus = $"Interim result: ...";
        }

        StateHasChanged();
    }

    private void OnSpeechEnd()
    {
        SpeechStatus = "Speech recognition ended";
        StateHasChanged();
    }

    private void OnSpeechError(string error)
    {
        SpeechError = error;
        SpeechStatus = "Speech recognition error occurred";
        StateHasChanged();
    }
}
````

## File Selection Events

File selection events are handled through the [`PromptBoxFileSelectButtonSettings`](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikPromptBox.ButtonSettings.PromptBoxFileSelectButtonSettings):

### OnSelect

Fires when users [select files](slug:promptbox-attachments). Provides `FileSelectEventArgs` with information about the selected files.

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Modes](slug:promptbox-modes)
* [PromptBox Adornments](slug:promptbox-adornments)
* [PromptBox File Attachments](slug:promptbox-attachments)