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

The <a href = "https://www.telerik.com/blazor-ui/ai-prompt" target="_blank">Blazor AIPrompt component</a> helps you write input (prompt) instructing the Generative AI to produce the desired response. 

The component allows you to interact with the output from the AI and execute a set of predefined commands. Furthermore, the AIPrompt comes with three predefined views—Prompt, Output, and Command, as well as the option to define custom views. Users can navigate the views through the AIPrompt's ToolBar.

## Creating Blazor AIPrompt

1. Add the `<TelerikAIPrompt>` tag.
1. Subscribe to the `OnPromptRequest` event that will fire whenever the user sends a prompt request. The handler expects an argument of type `AIPromptPromptRequestEventArgs`.
1. (optional) Set the `Commands` parameter to a `List<AIPromptCommandDescriptor>`. If the parameter is not set, the AIPrompt will not render the Commands view.
1. (optional) Subscribe to the `OnCommandExecute` event that will fire whenever the user executes a command. The handler expects an argument of type `AIPromptCommandDescriptorExecuteEventArgs`.

>caption Basic configuration of the Telerik AIPrompt

````RAZOR
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest"
                 OnCommandExecute="@HandleCommandExecute"
                 Commands="@PromptCommands">
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }

    private void HandleCommandExecute(AIPromptCommandExecuteEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Vel pretium lectus quam id leo in. Nisl pretium fusce id velit ut tortor pretium.";
    }

    private List<AIPromptCommandDescriptor> PromptCommands { get; set; } = new List<AIPromptCommandDescriptor>()
    {
        new AIPromptCommandDescriptor() { Id = "1", Title = "Correct spelling and grammar", Icon = SvgIcon.SpellChecker },
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

## Integration with Microsoft.Extensions.AI

The AIPrompt supports using the [Microsoft.Extensions.AI library](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp) to provide seamless integration with various AI models and boost your workflow when connecting the AIPrompt with AI models. [Learn how to integrate Microsoft.Extensions.AI with your AIPrompt component...](slug:common-features-microsoft-extensions-ai-integration)

## ToolBar

The AIPrompt includes a toolbar with built-in buttons that activate the view they are related to. The component also exposes the option to add custom tools, which may be associated with arbitrary handlers. [Read more about the AIPrompt's ToolBar...](slug:aiprompt-toolbar)


## Views

The AIPrompt component offers the Prompt, Output, and Commands views that relate to the current state of the prompt-response lifecycle. You can also customize the component through custom views. [Read more about the AIPrompt views...](slug:aiprompt-views-overview) 


## Templates

The AIPrompt component provides templates that enable developers to customize the rendering and appearance of the component. [Read more about the AIPrompt templates...](slug:aiprompt-templates)


## Events

The various AIPrompt events allow you to implement custom functionality and handle user interactions with the component's ToolBar. [Read more about the AIPrompt events...](slug:aiprompt-events) 


## AIPrompt Parameters

The table below lists the AIPrompt parameters. For a full list of the AIPrompt API members (parameters, methods, and events), check the [AIPrompt API Reference](slug:Telerik.Blazor.Components.TelerikAIPrompt).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AIPromptViews` | `RenderFragment` | Allows control over the views of the content. Use it to set the visibility of a predefined view or to create custom views. If a render fragment is not provided, the AIPrompt will display its default views. |
| `AIPromptToolBar` | `RenderFragment` | Any additional buttons that will be rendered within the ToolBar. This parameter will append the new items, rather than override buttons related to existing views. |
| `Class` | `string` | The `class` attribute of the `<div class="k-prompt">` element. Use it to apply custom styles or [override the theme](slug:themes-override). |
| `Commands` | `List<AIPromptCommandDescriptor>` | The predefined commands displayed within the Commands view. |
| `Height` | `string` | The `height` style of the component in any [supported CSS unit](slug:common-features/dimensions). The default AIPrompt dimensions depend on the CSS theme. |
| `PromptText` | `string` | The value of the text within the prompt view. Use it when you need to add some form of transformation to the prompt. The parameter supports two-way binding. |
| `PromptTextChanged` | `EventCallback<string>` | The handler called whenever the `PromptText` changes. |
| `PromptSuggestions` | `List<string>` | The prompt suggestions displayed within the Prompt view. |
| `PromptSuggestionItemTemplate` | `RenderFragment<string>` | The Prompt Suggestion Item template of the AIPrompt. |
| `ShowOutputRating` | `bool` <br /> (`false`) | Controls the visibility of the rating buttons within the output card. |
| `SystemPrompt` | `string` <br /> (See "Description" column) | Defines the system prompt that is passed to the [Microsoft `ChatMessage`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.chatmessage) object constructor. <br /><br /> The default `SystemPrompt` value is: `"You are a helpful assistant designed to assist users. Your goal is to provide helpful, accurate, and contextually appropriate information in a clear and concise manner. Avoid discussing harmful, illegal, or inappropriate topics."`.
| `Width` | `string` | The `width` style of the component in any [supported CSS unit](slug:common-features/dimensions). The default AIPrompt dimensions depend on the CSS theme. |

## AIPrompt Reference and Methods

The AIPrompt exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Refresh` | Re-renders the component. |
| `AddOutput` | Insert a new output item to the AIPrompt. |

>caption AIPrompt reference and method usage

````RAZOR
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
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
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
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
}
````


## Next Steps

* [Configure the AIPrompt ToolBar](slug:aiprompt-toolbar)
* [Customize the AIPrompt Views](slug:aiprompt-views-overview)
* [Make the AIPrompt Your Own through Custom Commands](slug:aiprompt-views-commands)
* [Implement AIPrompt Views Templates](slug:aiprompt-views-templates)
* [Implement AIPrompt Templates](slug:aiprompt-templates)
* [Handle the AIPrompt Events](slug:aiprompt-events)

## See Also

* [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [AIPrompt API Reference](slug:Telerik.Blazor.Components.TelerikAIPrompt)
