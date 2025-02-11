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
                new AIPromptCommandDescriptor() { Id = "3", Title = "Professional" },
                new AIPromptCommandDescriptor() { Id = "4", Title = "Conversational" },
                new AIPromptCommandDescriptor() { Id = "5", Title = "Humorous" },
                new AIPromptCommandDescriptor() { Id = "6", Title = "Empathic" },
                new AIPromptCommandDescriptor() { Id = "7", Title = "Academic" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "8", Title = "Change Formality", Icon = SvgIcon.ApplyFormat,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "9", Title = "Casual" },
                new AIPromptCommandDescriptor() { Id = "10", Title = "Neutral" },
                new AIPromptCommandDescriptor() { Id = "11", Title = "Formal" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "12", Title = "Translate", Icon = SvgIcon.EditTools,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "13", Title = "English" },
                new AIPromptCommandDescriptor() { Id = "14", Title = "Bulgarian" },
                new AIPromptCommandDescriptor() { Id = "15", Title = "Spanish" },
            }
        },
        new AIPromptCommandDescriptor() { Id = "16", Title = "Simplify", Icon = SvgIcon.MinWidth },
        new AIPromptCommandDescriptor() { Id = "17", Title = "Expand", Icon = SvgIcon.MaxWidth },
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