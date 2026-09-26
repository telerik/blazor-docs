---
title: Overview
page_title: AIPrompt Overview
description: Discover the AIPrompt component for Blazor. Learn how to add the component to your app and explore its features like handling prompts and their outputs.
slug: aiprompt-overview
tags: telerik,blazor,aiprompt,ai,prompt
published: True
position: 0
components: ["aiprompt"]
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

<demo metaUrl="client/aiprompt/basic-configuration-2/" height="420"></demo>

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

## Parameters and API

The AIPrompt component provides a wide range of parameters and methods that let you customize its appearance, behavior, and integration with your application. You can configure built-in and custom views, toolbar items, commands, prompt suggestions, and more. The component also exposes methods for programmatic control, such as refreshing the UI or adding output items dynamically.

For a complete list of available parameters and methods, refer to the [AIPrompt API Reference](slug:Telerik.Blazor.Components.TelerikAIPrompt).

To use component methods, define a reference to the AIPrompt instance with the `@ref` directive. For example:

<demo metaUrl="client/aiprompt/basic-configuration-1/" height="420"></demo>

## SpeechToTextButton Integration

To integrate a built-in SpeechToTextButton in the AIPrompt component, set `EnableSpeechToText="true"`. Optionally, you can use the `<AIPromptSettings>` tag as a child of `<TelerikAIPrompt>`. Inside `<AIPromptSettings>`, you can define the `<AIPromptSpeechToTextButtonSettings>` tag to configure the appearance and behavior of the built-in SpeechToTextButton. For a complete list of available parameters, refer to the [AIPromptSpeechToTextButtonSettings API Reference](slug:Telerik.Blazor.Components.AIPromptSpeechToTextButtonSettings).

For advanced configuration options and more details about the SpeechToTextButton component, see the [SpeechToTextButton documentation](slug:speechtotextbutton-overview).

>caption Example of integrating the SpeechToTextButton in the AIPrompt component

````RAZOR.skip-repl
<TelerikAIPrompt EnableSpeechToText="true" Prompt="@Prompt" PromptChanged="@OnPromptChanged">
    <AIPromptSettings>
        <AIPromptSpeechToTextButtonSettings FillMode="@ThemeConstants.Button.FillMode.Outline"
                                            Size="@ThemeConstants.Button.Size.Large"
                                            Rounded="@ThemeConstants.Button.Rounded.Full"
                                            ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                                            MaxAlternatives="3" />
    </AIPromptSettings>
</TelerikAIPrompt>

@code {
    private void OnPromptChanged(string prompt)
    {
        Prompt = prompt;
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
