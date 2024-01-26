---
title: Overview
page_title: AIPrompt Overview
description: Discover the AIPrompt component for Blazor. Learn how to add the component to your app and explore its features like handling prompts and their outputs.
slug: aiprompt-overview
tags: telerik,blazor,aiprompt,ai,prompt
published: True
position: 0
---

# Blazor AIPrompt Overview

The <a href = "https://www.telerik.com/blazor-ui/aiprompt" target="_blank">Blazor AIPrompt component</a> helps you write input (prompt) instructing the Generative AI to generate the desired response. Furthermore, the component allows you to interact with the output from the AI, and execute a set of predefined commands. The AIPrompt comes with three predefined views - Prompt, Output, and Command, as well as the option to define custom views. Each view can be navigated through the AIPrompt's toolbar.

## Creating Blazor AIPrompt

To use a Telerik AIPrompt for Blazor:

1. Add the `<TelerikAIPrompt>` tag.
1. Subscribe to the `OnPromptRequest` event that will fire whenever the user sends a prompt request. The handler expects an argument of type `AIPromptPromptRequestEventArgs`.
1. (optional)Set the `Commands` parameter to a `List<AIPromptCommandDescriptor>`. If the parameter is not set, the AIPrompt will not render the Commands view.
1. (optional) Subscribe to the `OnCommandExecute` event that will fire whenever the user executes a command. The handler expects an argument of type `AIPromptCommandDescriptorExecuteEventArgs`.

>caption Basic configuration of the Telerik AIPrompt

````CSHTML
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest"
                 OnCommandExecute="@HandleCommandExecute"
                 Commands="@PromptCommands">
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }

    private void HandleCommandExecute(AIPromptCommandExecuteEventArgs args)
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        args.Output = "Vel pretium lectus quam id leo in. Nisl pretium fusce id velit ut tortor pretium.";
    }

    private List<AIPromptCommandDescriptor> PromptCommands { get; set; } = new List<AIPromptCommandDescriptor>()
    {
        new AIPromptCommandDescriptor() { Id = "1", Title = "Correct spelling and grammar", Icon = FontIcon.SpellChecker },
        new AIPromptCommandDescriptor() { Id = "2", Title = "Change Tone", Icon = SvgIcon.TellAFriend,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "3", Title = "Professional" },
                new AIPromptCommandDescriptor() { Id = "4", Title = "Conversational" },
                new AIPromptCommandDescriptor() { Id = "5", Title = "Humorous" },
                new AIPromptCommandDescriptor() { Id = "6", Title = "Empathic" },
                new AIPromptCommandDescriptor() { Id = "7", Title = "Academic" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "8", Title = "Simplify", Icon = SvgIcon.MinWidth },
        new AIPromptCommandDescriptor() { Id = "9", Title = "Expand", Icon = SvgIcon.MaxWidth },
    };
}
````


## Toolbar

The [AIPrompt includes a toolbar with some built-in buttons]({%slug aiprompt-toolbar%}). When clicked, these tools activate the corresponding view they are related to. The component also exposes the option to add custom tools which may be associated with arbitrary handlers.


## Views

The AIPrompt component offers [different views]({%slug aiprompt-views-overview%}) that relate to the current state of the prompt-response lifecycle. There is also the option to customize the component through custom views. The built-in views are:

* Prompt View
* Output View
* Commands View


## Templates

The [AIPrompt component provides templates]({%slug aiprompt-templates%}) to enable developers to customize the rendering and appearance of the component.


## Events

The various [AIPrompt events]({%slug aiprompt-events%}) allow you to implement custom functionality and handle user interactions with the component's toolbar.


## AIPrompt Parameters

The table below lists the AIPrompt parameters. For a full list of the AIPrompt API members (parameters, methods, and events), check the [AIPrompt API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikAIPrompt).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AIPromptViews` | `RenderFragment` | Allows control over the views of the content. Use it to set visibility of a predefined view or to create custom views. If a render fragment is not provided, the AIPrompt will display its default views. |
| `AIPromptToolbarItems` | `RenderFragment` | Any additional buttons that are to be rendered within the toolbar. This parameter will append the new items, rather than override buttons related to existing views. |
| `PromptText` | `string` | The value of the text within the prompt view. Use when you need to add some form of transformation to the prompt. The parameter supports two-way binding. |
| `PromptTextChanged` | `EventCallback<string>` | The handler called whenever the `PromptText` changes. |
| `PromptSuggestions` | `List<string>` | The prompt suggestions displayed within the prompt view. |
| `PromptSuggestionItemTemplate` | `RenderFragment<string>` | The Prompt Suggestion Item template of the AIPrompt. |
| `Commands` | `List<AIPromptCommandDescriptor>` | The predefined commands displayed within the commands view. |
| `ShowOutputRating` | `bool` <br /> (`false`) | Controls the visibility of the rating buttons within the output card. |
| `OnPromptRequest` | `EventCallback<AIPromptPromptRequestEventArgs>` | The event handler called when the user requests an output for a given prompt. |
| `OnCommandExecute` | `EventCallback<AIPromptCommandDescriptorExecuteEventArgs>` | The event handler called when a user clicks on a command within the Command View. |
| `OnOutputRate` | `EventCallback<AIPromptOutputRateEventArgs>` | The event handler called when a user rates an output item. |
| `Class` | `string` | The `class` attribute of the `<div class="k-prompt">` element. Use it to apply custom styles or [override the theme]({%slug themes-override%}). |
| `Height` | `string` | The `height` style of the component in any [supported CSS unit]({%slug common-features/dimensions%}). The default AIPrompt dimensions depend on the CSS theme. |
| `Width` | `string` | The `width` style of the component in any [supported CSS unit]({%slug common-features/dimensions%}). The default AIPrompt dimensions depend on the CSS theme. |

## AIPrompt Reference and Methods

The AIPrompt exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Refresh` | Re-renders the component. |
| `AddOutput` | Insert a new output item to the AIPrompt. |

>caption AIPrompt reference and method usage

````CSHTML
<TelerikAIPrompt @ref="@AIPromptRef" OnPromptRequest="@HandlePromptRequest"></TelerikAIPrompt>
<div style="margin-top: 2em;">
    <TelerikTextBox @bind-Value="@CustomPrompt"></TelerikTextBox>
    <TelerikButton OnClick="@ExternalGenerateHandler">Generate</TelerikButton>
</div>

@code {
    private string CustomPrompt { get; set; }
    private TelerikAIPrompt AIPromptRef { get; set; }

    private void ExternalGenerateHandler()
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        AIPromptRef.AddOutput(
            output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            title: "Generated from an external prompt",
            subtitle: string.Empty,
            prompt: CustomPrompt,
            commandId: null,
            openOutputView: true);
    }

    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // dummy data intentionally used. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
}
````


## Next Steps

* [Configure the AIPrompt toolbar]({%slug aiprompt-toolbar%})
* [Customize the AIPrompt views]({%slug aiprompt-views-overview%})
* [Make the AIPrompt your own through custom commands]({%slug aiprompt-views-commands%})
* [Implement AIPrompt templates]({%slug aiprompt-views-templates%})
* [Implement AIPrompt templates]({%slug aiprompt-templates%})
* [Handle the AIPrompt events]({%slug aiprompt-events%})

## See Also

* [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [AIPrompt API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikAIPrompt)
