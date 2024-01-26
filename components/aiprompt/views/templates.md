---
title: Templates
page_title: AIPrompt Views Templates
description: View Templates in AIPrompt for Blazor. Learn how to customize the appearance of individual views.
slug: aiprompt-views-templates
tags: telerik,blazor,aiprompt,ai,prompt,templates
published: True
position: 40
---

# AIPrompt Views Templates

This article explains the available templates for the Views of the AIPrompt for Blazor.

- [AIPrompt Views Templates](#aiprompt-views-templates)
  - [ViewTemplate](#viewtemplate)
  - [FooterTemplate](#footertemplate)


## ViewTemplate

The `ViewTemplate` allows you to control the rendering of view's content. You can define it for each of the predefined Views:

>caption Use the ViewTemplate to alter the appearance of the prompt view

````CSHTML
<TelerikAIPrompt @ref="@AIPromptRef" @bind-Prompt="@Prompt">
    <AIPromptViews>
        <AIPromptPromptView ButtonIcon="@SvgIcon.Sparkles">
            <ViewTemplate>
                <TelerikTextBox @bind-Value="@Prompt" Placeholder="Type your prompt here..." />
            </ViewTemplate>
        </AIPromptPromptView>
        <AIPromptOutputView ButtonIcon="@SvgIcon.Comment">
        </AIPromptOutputView>
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private TelerikAIPrompt AIPromptRef { get; set; }

    private string Prompt { get; set; }
}
````

## FooterTemplate

The `FooterTemplate` allows you to control the rendering of the footer within individual views.

>caption Use the FooterTemplate to define a custom button.

````CSHTML
<TelerikAIPrompt @ref="@AIPromptRef" @bind-Prompt="@Prompt">
    <AIPromptViews>
        <AIPromptPromptView ButtonIcon="@SvgIcon.Sparkles">
            <FooterTemplate>
                <TelerikButton OnClick="@HandlePromptRequest">Generate</TelerikButton>
            </FooterTemplate>
        </AIPromptPromptView>
        <AIPromptOutputView ButtonIcon="@SvgIcon.Comment">
        </AIPromptOutputView>
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private TelerikAIPrompt AIPromptRef { get; set; }

    private string Prompt { get; set; }

    private void HandlePromptRequest()
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        AIPromptRef.AddOutput(
            output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            title: "Generated response",
            subtitle: string.Empty,
            prompt: Prompt,
            commandId: null,
            openOutputView: true);
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Views Overview]({%slug aiprompt-views-overview%})
  * [Prompt View]({%slug aiprompt-views-prompt%})
  * [Output View]({%slug aiprompt-views-output%})
  * [Commands View]({%slug aiprompt-views-commands%})