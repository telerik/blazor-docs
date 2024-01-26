---
title: Overview
page_title: AIPrompt - Views Overview
description: Views basics in the AIPrompt for Blazor.
slug: aiprompt-views-overview
tags: telerik,blazor,aiprompt,ai,prompt,view,overview
published: True
position: 0
---

# AIPrompt Views

The AIPrompt component provides three different predefined views. There is also the option to define custom views. Through interaction with the component, the user can change the currently active view.

The available built-in views are:

* [Prompt View]({%slug aiprompt-views-prompt%})
* [Output View]({%slug aiprompt-views-output%})
* [Commands View]({%slug aiprompt-views-commands%})

## Parameters

>caption The AIPrompt views provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `ButtonText` | `string` | The text rendered within the toolbar button associated with the view. |
| `ButtonIcon` | `object` | The [Telerik Font or SVG icon]({%slug common-features-icons%}) rendered within the toolbar button associated with the view. |
| `ViewTemplate` | `RenderFragment` | The ViewTemplate allows you to control the rendering of the content of the view. Read more in the [Templates]({%slug aiprompt-views-templates%}#viewtemplate) article. |
| `FooterTemplate` | `RenderFragment` | The FooterTemplate allows you to control the rendering of the footer of the view. Read more in the [Templates]({%slug aiprompt-views-templates%}#footertemplate) article. |

>caption By default, the AIPrompt will always render both the Prompt and the Output view. The Commands view will be rendered only if a custom set of commands has been passed through the `Commands` parameter.


````CSHTML
@* The user can only navigate between the Prompt and Output views - the Commands view, for example, will not be rendered, as no commands has been passed to the `Commands` parameter. *@

<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest"></TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
}
````

>caption Use the `ButtonText` and `ButtonIcon` parameters to customize the appearance of the toolbar buttons associated with the predefined views.


````CSHTML
@* The example showcases how to customize the appearance of the toolbar through the `ButtonText` and `ButtonIcon` parameters. *@

<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest">
    <AIPromptViews>
        <AIPromptPromptView ButtonText="Custom Prompt" ButtonIcon="@SvgIcon.Star" />
        <AIPromptOutputView ButtonText="Custom Output" ButtonIcon="@SvgIcon.Clipboard" />
        <AIPromptCommandDescriptorView ButtonText="Custom Commands" ButtonIcon="@SvgIcon.Grid" />
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel pretium lectus quam id leo in.";
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Prompt View]({%slug aiprompt-views-prompt%})
  * [Output View]({%slug aiprompt-views-output%})
  * [Commands View]({%slug aiprompt-views-commands%})
  * [Views Templates]({%slug aiprompt-views-templates%})

