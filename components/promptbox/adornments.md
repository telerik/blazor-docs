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

The PromptBox supports three types of adornment templates that position content in different areas of the component based on the current [input mode](slug:promptbox-modes).

## Adornment Types

### Start Affix Template

The `PromptBoxStartAffixTemplate` renders content at the beginning of the input area. Its positioning adapts based on the current input mode:

* **SingleLine and Auto (initial)**: Positioned on the left side of the input
* **MultiLine and Auto (expanded)**: Positioned at the bottom-left of the input area

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

* **SingleLine and Auto (initial)**: Positioned on the right side of the input
* **MultiLine and Auto (expanded)**: Positioned at the bottom-right of the input area

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

The `PromptBoxTopAffixTemplate` renders content above the input area and is only visible in MultiLine mode or when Auto mode has expanded:

* **SingleLine**: Not displayed
* **MultiLine**: Always visible at the top
* **Auto**: Appears after expansion to multi-line

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

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Modes](slug:promptbox-modes)
* [PromptBox Events](slug:promptbox-events)