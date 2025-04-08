---
title: Editor Integration with Inline Prompt
page_title: Editor Integration with Inline Prompt
description: Integration of the Inline Prompt in the Editor for Blazor.
slug: editor-Inline Prompt-integration
tags: telerik,blazor,editor,ai,ai integration,Inline Prompt
published: True
position: 3
---

# AI Integration Overview

The Editor provides a built-in integration with an Inline Prompt component to help developers add AI-driven suggestions, completions, and assistance to their Editor.

The inline prompt is displayed inside Popup which appears when the user selects a text in the Editor. Once enabled, each command prompt will work only with this selected context. The result appears inside the card and can be replaced or appended directly inside the Editor or discarded if the result is not good.

The Inline prompt will automatically appear and it will align its top left corner with the bottom left corner of the selection.

The integration with the Inline Prompt covers the following use cases:

* Prompting with context - The user prompt will use the selected text in the Editor as additional context.
* Command with context - The user will run a command that will be applied to selected content.

## Enabling the Inline Prompt

To enable the Inline Prompt in the Editor:

1. Set the `EnableInline Prompt` parameter to `true`.
1. Register an [`IChatClient` service](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient?view=net-9.0-pp) to generate the Inline Prompt responses. Configure the service according to the model you are using. The Inline Prompt is designed to automatically use the registered `IChatClient` as the component provides a [built-in integration with the **Microsoft.Extensions.AI** library](slug:common-features-microsoft-extensions-ai-integration).

>caption Enabling the Inline Prompt in the Editor

````RAZOR

````

## Customizing the Inline Prompt

The Editor allows customizing some of the integrated Inline Prompt's settings. For that purpose, use the `<EditorInline PromptSettings>` tag. It provides the following parameters that you can configure:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `SystemPrompt`  | `string` <br/> (See "Description" column) | The system prompt that will be passed to the integrated Inline Prompt. If not provided, the Inline Prompt will use its [default `SystemPrompt` value](slug:Inline Prompt-overview#Inline Prompt-parameters) |
| `Commands` | `List<Inline PromptCommandDescriptor>` | The commands displayed within the Commands view. If not set the Inline Prompt will use the [default predefined commands](slug:editor-ai-integration-overview#default-commands)

>caption Customizing the Inline Prompt in the Editor

````RAZOR

````

## See Also

* [Live Demo: AI Integration](https://demos.telerik.com/blazor-ui/editor/overview)
* [AI Integration Overview](slug:editor-ai-integration-overview)
* [Editor Integration with Inline Prompt](slug:editor-ai-integration-overview)
