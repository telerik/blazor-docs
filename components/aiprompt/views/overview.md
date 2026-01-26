---
title: Overview
page_title: AIPrompt - Views Overview
description: Views basics in the AIPrompt for Blazor.
slug: aiprompt-views-overview
tags: telerik,blazor,aiprompt,ai,prompt,view,overview
published: True
position: 0
components: ["aiprompt"]
---
# AIPrompt Views

The AIPrompt component provides three predefined views and also lets you create custom views. Through interaction with the component, the user can change the currently active view.

The available built-in views are:

* [Prompt View](slug:aiprompt-views-prompt)
* [Output View](slug:aiprompt-views-output)
* [Commands View](slug:aiprompt-views-commands)

## Parameters

The AIPrompt views provide various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `ButtonText` | `string` | The text rendered within the toolbar button associated with the view. |
| `ButtonIcon` | `object` | The [Telerik Font or SVG icon](slug:common-features-icons) rendered within the toolbar button associated with the view. |
| `ViewTemplate` | `RenderFragment` | The template controlling the rendering of the view's content. Read more in the [Templates](slug:aiprompt-views-templates#view-template) article. |
| `FooterTemplate` | `RenderFragment` | The template controlling the rendering of the view's footer. Read more in the [Templates](slug:aiprompt-views-templates#footer-template) article. |

By default, the AIPrompt will always render both the Prompt and the Output view. The Commands view will be rendered only if you pass a custom set of commands through the `Commands` parameter:


````RAZOR
@* The user can only navigate between the Prompt and Output views - the Commands view, for example, will not be rendered, as no commands have been passed to the `Commands` parameter. *@

<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest"></TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
}
````

>caption Using the `ButtonText` and `ButtonIcon` parameters to customize the appearance of the toolbar buttons


````RAZOR
@* The example showcases how to customize the appearance of the toolbar through the `ButtonText` and `ButtonIcon` parameters. *@

<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest">
    <AIPromptViews>
        <AIPromptPromptView ButtonText="Custom Prompt" ButtonIcon="@SvgIcon.Star" />
        <AIPromptOutputView ButtonText="Custom Output" ButtonIcon="@SvgIcon.Clipboard" />
        <AIPromptCommandView ButtonText="Custom Commands" ButtonIcon="@SvgIcon.Grid" />
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel pretium lectus quam id leo in.";
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Prompt View](slug:aiprompt-views-prompt)
  * [Output View](slug:aiprompt-views-output)
  * [Commands View](slug:aiprompt-views-commands)
  * [Views Templates](slug:aiprompt-views-templates)

