---
title: Commands View
page_title: AIPrompt - Commands View
description: Explore the AIPrompt's  Commands view that displays a set of predefined commands and learn how to define your custom commands.
slug: aiprompt-views-commands
tags: telerik,blazor,aiprompt,ai,prompt,commands
published: True
position: 30
components: ["aiprompt"]
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
| `Prompt` | `string` |  The text to send as the prompt when this command is executed by the AIPrompt. |
| `Children` | `List<AIPromptCommandDescriptor>` | The nested commands (if any) of the command. |

>caption Using the `Commands` parameter to pass a collection of predefined commands to the AIPrompt for Blazor

<demo metaUrl="client/aiprompt/views/commands/commands-1/" height="420"></demo>

## See Also

* [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Views Overview](slug:aiprompt-views-overview)
* [Prompt View](slug:aiprompt-views-prompt)
* [Output View](slug:aiprompt-views-output)
* [Views Templates](slug:aiprompt-views-templates)