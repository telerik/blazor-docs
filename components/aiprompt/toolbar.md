---
title: Toolbar
page_title: AIPrompt - Toolbar
description: Configure and use the Blazor AIPrompt toolbar and its buttons. How to define custom toolbar buttons.
slug: aiprompt-toolbar
tags: telerik,blazor,aiprompt,ai,prompt,toolbar
published: True
position: 20
---

# AIPrompt ToolBar

The AIPrompt toolbar always renders buttons for the currently visible predefined views (Prompt, Output, and optionally, Command). These built-in buttons activate the appropriate view they represent. Any custom buttons will always appear after the view-related buttons. This article shows how to add custom tools to the AIPrompt's toolbar, which may invoke arbitrary commands or handlers.


## Custom Tools

To define custom tools within the toolbar, use the `<AIPromptToolBarItems>` tag, which is a standard Blazor `RenderFragment`.

The example below omits any event handlers for brevity. Custom buttons are to be used for arbitrary logic which is not part of the AIPrompt component, thus feel free to attach the handlers you need.

>caption Setting up the AIPrompt ToolBar

````CSHTML
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest">
    <AIPromptToolbarItems>
        <TelerikButton OnClick="@OnCustomButtonClick">Custom Button</TelerikButton>
    </AIPromptToolbarItems>
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // handle the prompt request here.
    }

    private void OnCustomButtonClick()
    {
        // handle the custom button click here.
    }
}
````


## Next Steps

* [Customize the AIPrompt views]({%slug aiprompt-views-overview%})
* [Implement AIPrompt templates]({%slug aiprompt-templates%})
* [Handle AIPrompt events]({%slug aiprompt-events%})

## See Also

* [Views Templates]({%slug aiprompt-views-templates%})
* [Live Demo: AIPrompt Overview](https://demos.telerik.com/blazor-ui/aiprompt/overview)