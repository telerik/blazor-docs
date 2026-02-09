---
title: Modes
page_title: PromptBox - Input Modes
description: Learn about the different input modes of the Blazor PromptBox component - SingleLine, MultiLine, and Auto modes with their behaviors and use cases.
slug: promptbox-modes
tags: telerik,blazor,promptbox,modes,singleline,multiline,auto
published: True
position: 15
components: ["promptbox"]
---

# PromptBox Input Modes

The Blazor PromptBox component supports three distinct input modes that adapt to different user scenarios and content requirements. Each mode provides a specific behavior for text input and adornment positioning.

You can control the input mode through the `Mode` parameter using the `PromptBoxMode` enumeration.

## Mode Types

The PromptBox supports the following input modes:

### SingleLine Mode

SingleLine mode provides a fixed single-line input with horizontal scrolling capabilities. This mode maintains a consistent height regardless of content length.

### MultiLine Mode

MultiLine mode provides a traditional textarea experience with vertical growth and scrolling. This mode is ideal for longer content that requires multiple lines from the start.

### Auto Mode (Default)

Auto mode provides intelligent behavior that combines the benefits of both SingleLine and MultiLine modes. It starts as a single-line input and automatically expands to multi-line when content overflows.

## Example

>caption Comprehensive mode comparison

````RAZOR
<div class="d-flex flex-column gap-4">
    <div>
        <h4>SingleLine Mode</h4>
        <TelerikPromptBox @bind-Value="@SingleLinePrompt"
                          Mode="PromptBoxMode.SingleLine"
                          Placeholder="Single line input..."
                          Width="100%" />
    </div>
    
    <div>
        <h4>MultiLine Mode</h4>
        <TelerikPromptBox @bind-Value="@MultiLinePrompt"
                          Mode="PromptBoxMode.MultiLine"
                          Placeholder="Multi-line input..."
                          Rows="3"
                          Width="100%" />
    </div>
    
    <div>
        <h4>Auto Mode</h4>
        <TelerikPromptBox @bind-Value="@AutoPrompt"
                          Mode="PromptBoxMode.Auto"
                          Placeholder="Auto-expanding input..."
                          MaxTextAreaHeight="120px"
                          Width="100%" />
    </div>
</div>

@code {
    private string SingleLinePrompt = string.Empty;
    private string MultiLinePrompt = string.Empty;
    private string AutoPrompt = string.Empty;
}
````

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Adornments](slug:promptbox-adornments)
* [PromptBox Events](slug:promptbox-events)