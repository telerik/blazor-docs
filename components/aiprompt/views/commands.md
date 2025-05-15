---
title: Commands View
page_title: AIPrompt - Commands View
description: Explore the AIPrompt's  Commands view that displays a set of predefined commands and learn how to define your custom commands.
slug: aiprompt-views-commands
tags: telerik,blazor,aiprompt,ai,prompt,commands
published: True
position: 30
---

# AIPrompt Commands View

The Commands View displays a set of predefined commands, which the user can browse and execute. The commands are passed to the component through the `Commands` parameter, which expects a collection of type `List<AIPromptCommandDescriptor>`. You can also organize commands in a hierarchy, through parent-child relationships.

>note Parent commands cannot be directly executed, and only one level of nesting is supported.

## AIPromptCommandDescriptor Parameters

The following properties enable you to customize each command:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| ----------- | ----------- | ----------- |
| `Id` | `string` | The `Id` of the command. |
| `Title` | `string` | The title of the command. Rendered as text within the Command view. |
| `Icon` | `object` | The [Telerik Font or SVG icon](slug:common-features-icons) rendered before the title within the Command view. |
| `Prompt` | `string` |  The prompt of the command. It enables easily passing commands along with the prompts that should be executed inside the AIPrompt. |
| `Children` | `List<AIPromptCommandDescriptor>` | The nested commands (if any) of the command. |

>caption Using the `Commands` parameter to pass a collection of predefined commands to the AIPrompt for Blazor

````RAZOR
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest"
                 OnCommandExecute="@HandleCommandExecute"
                 Commands="@PromptCommands">
</TelerikAIPrompt>

@code {
    private List<AIPromptCommandDescriptor> PromptCommands { get; set; } = new List<AIPromptCommandDescriptor>()
    {
        new AIPromptCommandDescriptor() { Id = "1", Title = "Correct Spelling and grammar", Icon = SvgIcon.SpellChecker },
        new AIPromptCommandDescriptor() { Id = "2", Title = "Change Tone", Icon = SvgIcon.TellAFriend,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "3", Title = "Professional", Prompt = "Change the tone of the following text to professional" },
                new AIPromptCommandDescriptor() { Id = "4", Title = "Conversational", Prompt = "Change the tone of the following text to conversational" },
                new AIPromptCommandDescriptor() { Id = "5", Title = "Humorous", Prompt = "Change the tone of the following text to humorous" },
                new AIPromptCommandDescriptor() { Id = "6", Title = "Empathic", Prompt = "Change the tone of the following text to empathic" },
                new AIPromptCommandDescriptor() { Id = "7", Title = "Academic", Prompt = "Change the tone of the following text to academic" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "8", Title = "Change Formality", Icon = SvgIcon.ApplyFormat,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "9", Title = "Casual", Prompt = "Change the formality of the following text to casual" },
                new AIPromptCommandDescriptor() { Id = "10", Title = "Neutral", Prompt = "Change the formality of the following text to neutral" },
                new AIPromptCommandDescriptor() { Id = "11", Title = "Formal", Prompt = "Change the formality of the following text to formal" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "12", Title = "Translate", Icon = SvgIcon.EditTools,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "13", Title = "English", Prompt = "Translate the following text to English" },
                new AIPromptCommandDescriptor() { Id = "14", Title = "Bulgarian", Prompt = "Translate the following text to Bulgarian" },
                new AIPromptCommandDescriptor() { Id = "15", Title = "Spanish", Prompt = "Translate the following text to Spanish" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "16", Title = "Simplify", Icon = SvgIcon.MinWidth, Prompt = "Simplify the following text" },
        new AIPromptCommandDescriptor() { Id = "17", Title = "Expand", Icon = SvgIcon.MaxWidth, Prompt = "Expand the following text"},
    };

    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel pretium lectus quam id leo in.";
    }

    private void HandleCommandExecute(AIPromptCommandExecuteEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Nisl pretium fusce id velit ut tortor pretium. A pellentesque sit amet porttitor eget dolor. Lectus mauris ultrices eros in cursus turpis massa tincidunt.";
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Views Overview](slug:aiprompt-views-overview)
  * [Prompt View](slug:aiprompt-views-prompt)
  * [Output View](slug:aiprompt-views-output)
  * [Views Templates](slug:aiprompt-views-templates)