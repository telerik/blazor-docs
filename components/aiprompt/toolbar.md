---
title: Toolbar
page_title: AIPrompt - Toolbar
description: Learn how to configure and use the Blazor AIPrompt toolbar and its buttons, and see how to define custom toolbar buttons.
slug: aiprompt-toolbar
tags: telerik,blazor,aiprompt,ai,prompt,toolbar
published: True
position: 20
---

# AIPrompt ToolBar

The AIPrompt ToolBar renders buttons for the predefined views (Prompt, Output, and Command) and also allows you to add custom tools, which may invoke arbitrary commands or handlers.
The toolbar buttons for the Prompt and Output views are always available, while the one for the Commands view is optional. Any custom buttons that you add will always appear after the view-related buttons.


## Custom Tools

To define custom tools within the ToolBar, use the `<AIPromptToolBarItems>` tag, which is a standard Blazor `RenderFragment`.

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

* [Customize the AIPrompt Views]({%slug aiprompt-views-overview%})
* [Implement AIPrompt Templates]({%slug aiprompt-templates%})
* [Handle AIPrompt Events]({%slug aiprompt-events%})

## See Also

* [Views Templates]({%slug aiprompt-views-templates%})
* [Live Demo: AIPrompt Overview](https://demos.telerik.com/blazor-ui/aiprompt/overview)