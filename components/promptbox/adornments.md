---
title: Adornments
page_title: PromptBox - Adornments
description: Learn how to customize the Blazor PromptBox component with adornment templates for adding buttons, icons, and custom elements as prefixes, suffixes, and top elements.
slug: promptbox-adornments
tags: telerik,blazor,promptbox,adornments,templates,prefixes,suffixes
published: True
position: 10
components: ["promptbox"]
---

# PromptBox Adornments

The Blazor PromptBox component provides flexible adornment templates that allow you to add custom elements such as buttons, icons, or components around the input area. Adornments adapt intelligently to the current input mode, ensuring optimal layout and user experience.

You can also control the order of action buttons by arranging them within the templates.

The PromptBox supports three types of adornment templates that position content in different areas of the component based on the current [input mode](slug:promptbox-modes).

## Adornment Types

### Start Affix Template

The `PromptBoxStartAffixTemplate` renders content at the beginning of the input area. Its positioning adapts based on the current input mode:

* **SingleLine and Auto (while the input is one line tall)**: The affix is displayed on the left side, inline with the text
* **MultiLine and Auto (after the input grows to multiple lines)**: The affix moves to the bottom-left corner of the input area

In `Auto` mode, the position updates automatically as the input expands from one line to multiple lines while the user types.

>caption Start affix with mode-aware positioning

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  Mode="PromptBoxMode.Auto"
                  Placeholder="Type your message...">
    <PromptBoxStartAffixTemplate>
        <TelerikButton Icon="SvgIcon.User" 
                       FillMode="@ThemeConstants.Button.FillMode.Clear"
                       Size="@ThemeConstants.Button.Size.Small"
                       OnClick="OnUserClick"
                       Title="User Profile" />
    </PromptBoxStartAffixTemplate>
</TelerikPromptBox>

@code {
    private string Prompt = string.Empty;
    
    private void OnUserClick()
    {
        Console.WriteLine("User profile clicked");
    }
}
````

### End Affix Template  

The `PromptBoxEndAffixTemplate` renders content at the end of the input area, typically used for action buttons or secondary controls:

* **SingleLine and Auto (while the input is one line tall)**: The affix is displayed on the right side, inline with the text
* **MultiLine and Auto (after the input grows to multiple lines)**: The affix moves to the bottom-right corner of the input area

In Auto mode, the position updates automatically as the input expands from one line to multiple lines while the user types.

>caption End affix with multiple interactive elements

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  Mode="PromptBoxMode.Auto"
                  EnableSpeechToText="true"
                  EnableFileSelect="true">
    <PromptBoxEndAffixTemplate>
        <div class="d-flex gap-1">
            <TelerikButton Icon="SvgIcon.Image" 
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           Size="@ThemeConstants.Button.Size.Small"
                           OnClick="OnImageClick"
                           Title="Add Image" />
            <TelerikButton Icon="SvgIcon.Link" 
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           Size="@ThemeConstants.Button.Size.Small"
                           OnClick="OnLinkClick"
                           Title="Add Link" />
            <TelerikButton Icon="SvgIcon.Gear" 
                           FillMode="@ThemeConstants.Button.FillMode.Clear"
                           Size="@ThemeConstants.Button.Size.Small"
                           OnClick="OnSettingsClick"
                           Title="Settings" />
        </div>
    </PromptBoxEndAffixTemplate>
</TelerikPromptBox>

@code {
    private string Prompt = string.Empty;
    
    private void OnImageClick() => Console.WriteLine("Image clicked");
    private void OnLinkClick() => Console.WriteLine("Link clicked");
    private void OnSettingsClick() => Console.WriteLine("Settings clicked");
}
````

### Top Affix Template

The `PromptBoxTopAffixTemplate` renders content above the input area and is only visible in `MultiLine` mode or when `Auto` mode has expanded:

* **SingleLine**: Not displayed
* **MultiLine**: Always visible at the top
* **Auto (Default)**: Appears after expansion to multi-line

>caption Top affix for header information and controls

````RAZOR
<TelerikPromptBox @bind-Value="@Prompt"
                  Mode="PromptBoxMode.MultiLine"
                  Rows="4">
    <PromptBoxTopAffixTemplate>
        <div class="p-2 border-bottom d-flex justify-content-between align-items-center">
            <div>
                <span class="fw-bold">Document Editor</span>
                <small class="text-muted ms-2">@WordCount words</small>
            </div>
            <div class="d-flex gap-1">
                <TelerikButton OnClick="OnBoldClick"
                               FillMode="@ThemeConstants.Button.FillMode.Clear"
                               Size="@ThemeConstants.Button.Size.Small"
                               Icon="SvgIcon.Bold" />
                <TelerikButton OnClick="OnItalicClick"
                               FillMode="@ThemeConstants.Button.FillMode.Clear"
                               Size="@ThemeConstants.Button.Size.Small"
                               Icon="SvgIcon.Italic" />
            </div>
        </div>
    </PromptBoxTopAffixTemplate>
</TelerikPromptBox>

@code {
    private string Prompt = string.Empty;
    
    private int WordCount => string.IsNullOrWhiteSpace(Prompt) 
        ? 0 
        : Prompt.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length;
    
    private void OnBoldClick() => Console.WriteLine("Bold formatting");
    private void OnItalicClick() => Console.WriteLine("Italic formatting");
}
````

# Action Buttons Configuration

Add the desired action button tag within the affix template to configure its position.

>caption Example with action buttons arranged

````Razor
<div class="prompt-container">
    <TelerikPromptBox OnBlur="@(() => Logs.Add("PromptBox blurred"))"
                      DebounceDelay="0"
                      OnPromptAction="@HandlePromptAction"
                      InputFiles="@InputFiles"
                      InputFilesChanged="@((IList<FileSelectFileInfo> files) => OnInputFilesChanged(files))"
                      Value="@PromptBoxValue"
                      ValueChanged="@OnPromptBoxValueChanged"
                      OnChange="@((args) => Logs.Add("PromptBox changed"))"
                      EnableFileSelect="false" EnableSpeechToText="false" EnableActionButton="false"
                      Mode="PromptBoxMode.SingleLine">
        <PromptBoxStartAffixTemplate>
            <PromptBoxActionButton Icon="@SvgIcon.Accessibility" Title="TEST TITLE" />

            <PromptBoxSpeechToTextButton Continuous="true"
                                         IntegrationMode="@SpeechToTextButtonIntegrationMode.WebSpeech"
                                         Lang="en-US"
                                         OnStart="@(() => Logs.Add("Speech to text started"))"
                                         OnEnd="@(() => Logs.Add("Speech to text ended"))"
                                         OnError="@((string error) => Logs.Add($"Speech to text error: {error}"))"
                                         OnResult="@((arg) => Logs.Add($"Speech to text result: {arg.Alternatives.First().Transcript}"))"
                                         InterimResults="false"
                                         MaxAlternatives="3"
                                         Title="Start Speech to Text"
                                         OnClick="@(() => Logs.Add("Speech to text button clicked"))" />

            <PromptBoxFileSelectButton Multiple="true"
                                       Icon="@SvgIcon.DashboardOutline"
                                       OnRemove="@((args) => Logs.Add($"File removed: {args.Name}"))"
                                       Capture="capture attribute"
                                       Title="Select Files"
                                       Enabled="true"
                                       MaxFileSize="10485760"
                                       MinFileSize="1024"
                                       AllowedExtensions="@(new List<string>() { ".txt", ".pdf" })"
                                       OnSelect="@((args) => Logs.Add($"Files selected: {string.Join(", ", args.Files.Select(f => f.Name).ToList())}"))" />
        </PromptBoxStartAffixTemplate>

        <PromptBoxEndAffixTemplate>
            End Affix
        </PromptBoxEndAffixTemplate>

        <PromptBoxTopAffixTemplate>
            Top Affix
        </PromptBoxTopAffixTemplate>
    </TelerikPromptBox>

    <TelerikPromptBox OnBlur="@(() => Logs.Add("PromptBox blurred"))"
                      DebounceDelay="0"
                      OnPromptAction="@((args) => Logs.Add($"Prompt action: {args.Action} {string.Join(", ", args.Files.Select(file => file.Name).ToList())} {args.Text}"))"
                      OnChange="@((args) => Logs.Add("PromptBox changed"))"
                      EnableFileSelect="false" EnableSpeechToText="false" EnableActionButton="false"
                      Mode="PromptBoxMode.Auto">
        <PromptBoxStartAffixTemplate>
            Start Affix
        </PromptBoxStartAffixTemplate>

        <PromptBoxEndAffixTemplate>
            <PromptBoxActionButton Icon="@SvgIcon.Accessibility" Title="TEST TITLE" />

            <PromptBoxSpeechToTextButton Continuous="true"
                                         IntegrationMode="@SpeechToTextButtonIntegrationMode.WebSpeech"
                                         Lang="en-US"
                                         OnStart="@(() => Logs.Add("Speech to text started"))"
                                         OnEnd="@(() => Logs.Add("Speech to text ended"))"
                                         OnError="@((string error) => Logs.Add($"Speech to text error: {error}"))"
                                         OnResult="@((arg) => Logs.Add($"Speech to text result: {arg.Alternatives.First().Transcript}"))"
                                         InterimResults="true"
                                         MaxAlternatives="3"
                                         Title="Start Speech to Text"
                                         OnClick="@(() => Logs.Add("Speech to text button clicked"))" />

            <PromptBoxFileSelectButton Multiple="true"
                                       Icon="@SvgIcon.DashboardOutline"
                                       OnRemove="@((args) => Logs.Add($"File removed: {args.Name}"))"
                                       Capture="capture attribute"
                                       Title="Select Files"
                                       Enabled="true"
                                       MaxFileSize="10485760"
                                       MinFileSize="1024"
                                       AllowedExtensions="@(new List<string>() { ".txt", ".pdf" })"
                                       OnSelect="@((args) => Logs.Add($"Files selected: {string.Join(", ", args.Files.Select(f => f.Name).ToList())}"))" />
        </PromptBoxEndAffixTemplate>

        <PromptBoxTopAffixTemplate>
            Top Affix
        </PromptBoxTopAffixTemplate>
    </TelerikPromptBox>

    <TelerikPromptBox OnBlur="@(() => Logs.Add("PromptBox blurred"))"
                      DebounceDelay="0"
                      OnPromptAction="@((args) => Logs.Add($"Prompt action: {args.Action} {string.Join(", ", args.Files.Select(file => file.Name).ToList())} {args.Text}"))"
                      OnChange="@((args) => Logs.Add("PromptBox changed"))"
                      EnableFileSelect="false" EnableSpeechToText="false" EnableActionButton="false"
                      Mode="PromptBoxMode.MultiLine">
        <PromptBoxStartAffixTemplate>
            Start Affix
        </PromptBoxStartAffixTemplate>

        <PromptBoxEndAffixTemplate>
            End Affix
        </PromptBoxEndAffixTemplate>

        <PromptBoxTopAffixTemplate>
            <PromptBoxActionButton Icon="@SvgIcon.Accessibility" Title="TEST TITLE" />

            <PromptBoxSpeechToTextButton Continuous="true"
                                         IntegrationMode="@SpeechToTextButtonIntegrationMode.WebSpeech"
                                         Lang="en-US"
                                         OnStart="@(() => Logs.Add("Speech to text started"))"
                                         OnEnd="@(() => Logs.Add("Speech to text ended"))"
                                         OnError="@((string error) => Logs.Add($"Speech to text error: {error}"))"
                                         OnResult="@((arg) => Logs.Add($"Speech to text result: {arg.Alternatives.First().Transcript}"))"
                                         InterimResults="true"
                                         MaxAlternatives="3"
                                         Title="Start Speech to Text"
                                         OnClick="@(() => Logs.Add("Speech to text button clicked"))" />

            <PromptBoxFileSelectButton Multiple="true"
                                       Icon="@SvgIcon.DashboardOutline"
                                       OnRemove="@((args) => Logs.Add($"File removed: {args.Name}"))"
                                       Capture="capture attribute"
                                       Title="Select Files"
                                       Enabled="true"
                                       MaxFileSize="10485760"
                                       MinFileSize="1024"
                                       AllowedExtensions="@(new List<string>() { ".txt", ".pdf" })"
                                       OnSelect="@((args) => Logs.Add($"Files selected: {string.Join(", ", args.Files.Select(f => f.Name).ToList())}"))" />
        </PromptBoxTopAffixTemplate>
    </TelerikPromptBox>
</div>

<div>
    PromptBoxValue: @PromptBoxValue
</div>
<ul>
    @foreach (var log in Logs)
    {
        <li>@log</li>
    }
</ul>

<style>
    .prompt-container {
        display: flex;
        gap: 10px;
        align-items: start;
    }
</style>

@code {
    private List<string> Logs { get; set; } = new List<string>();
    private List<FileSelectFileInfo> InputFiles { get; set; } = new List<FileSelectFileInfo>();
    private string PromptBoxValue { get; set; } = string.Empty;

    private void OnInputFilesChanged(IList<FileSelectFileInfo> files)
    {
        InputFiles = files.ToList();
        Logs.Add($"Input files changed: {string.Join(", ", files.Select(file => file.Name).ToList())}");
    }

    private void OnPromptBoxValueChanged(string value)
    {
        PromptBoxValue = value;
    }

    private void HandlePromptAction(PromptBoxActionButtonEventArgs args)
    {
        Logs.Add($"Prompt action: {args.Action} {string.Join(", ", args.Files.Select(file => file.Name).ToList())} {args.Text}");
        PromptBoxValue = string.Empty;
        InputFiles = new List<FileSelectFileInfo>();
    }
}
````

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Modes](slug:promptbox-modes)
* [PromptBox Events](slug:promptbox-events)