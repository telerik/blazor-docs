---
title: Integration with Inline Prompt
page_title: Editor Integration with Inline Prompt
description: Integration of the Inline Prompt in the Editor for Blazor.
slug: editor-inline-prompt-integration
tags: telerik,blazor,editor,ai,ai integration,Inline Prompt
published: True
position: 3
---

# Editor Integration with Inline Prompt

The Editor provides a built-in integration with an inline prompt component to help users add AI-driven suggestions and completions to their Editor.

The inline prompt displays inside a Popup which appears when the user selects text in the Editor. Once enabled, each command prompt will work only with this selected context. The result appears in the card and can be replaced or appended directly inside the Editor, or discarded if the result is not good.

The Inline prompt will automatically appear and it will align its top left corner with the bottom left corner of the selection.

The integration with the Inline Prompt covers the following use cases:

* Prompting with context - The user prompt will use the selected text in the Editor as additional context.
* Command with context - The user will run a command that will be applied to the selected content.

## Enabling the Inline Prompt

To enable the Inline Prompt in the Editor:

1. Set the `EnableInlineAIPrompt` parameter to `true`.
1. Register an [`IChatClient` service](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient?view=net-9.0-pp) to generate the Inline Prompt responses. Configure the service according to the model you are using. The Inline Prompt is designed to automatically use the registered `IChatClient` as the component provides a [built-in integration with the **Microsoft.Extensions.AI** library](slug:common-features-microsoft-extensions-ai-integration).

>caption Enabling the Inline Prompt in the Editor

<div class="skip-repl"></div>
````RAZOR Editor
<TelerikEditor @bind-Value="@EditorValue"
               EnableInlineAIPrompt="true"
               Height="400px">
</TelerikEditor>

@code {

    private string EditorValue { get; set; } = "<p>Sample Editor content</p>";

}
````
````C# Program.cs
// ...

// This example uses Azure OpenAI but you must configure the service depending on the model you are using. Read more at https://www.telerik.com/blazor-ui/documentation/common-features/microsoft-extensions-ai-integration
services.AddSingleton(new AzureOpenAIClient(
    new Uri("YOUR_AZURE_OPENAI_ENDPOINT"),
    new AzureKeyCredential("YOUR_AZURE_OPENAI_CREDENTIAL")));

services.AddChatClient(services => services.GetRequiredService<AzureOpenAIClient>().AsChatClient("gpt-4o-mini"));

// ...
````

## Customizing the Inline Prompt

The Editor allows customizing some of the integrated Inline Prompt's settings. For that purpose, use the `<EditorInlineAIPromptSettings>` tag. It provides the following parameters that you can configure:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `SystemPrompt`  | `string` | The system prompt that will be passed to the integrated Inline Prompt. If not provided, the Inline Prompt will use its [default `SystemPrompt` value](slug:Inline Prompt-overview#Inline Prompt-parameters). |
| `Commands` | `List<Inline PromptCommandDescriptor>` | The commands displayed within the Commands view. If not set the Inline Prompt will use the [default predefined commands](slug:editor-ai-integration-overview#ai-integration-capabilities). |

>caption Customizing the Inline Prompt in the Editor

<div class="skip-repl"></div>
````RAZOR Editor
<TelerikEditor @bind-Value="@EditorValue"
               EnableInlineAIPrompt="true"
               Height="400px">
    <EditorSettings>
        <EditorInlineAIPromptSettings Commands="@Commands"></EditorInlineAIPromptSettings>
    </EditorSettings>
</TelerikEditor>

@code {

    private string EditorValue { get; set; } = "Sample Editor content";

    private List<AIPromptCommandDescriptor> Commands { get; set; } = new List<AIPromptCommandDescriptor>
    {
        new AIPromptCommandDescriptor() { Id = "1", Title = "Simplify", Icon = SvgIcon.MinWidth, Prompt = "Simplify the text" },
        new AIPromptCommandDescriptor() { Id = "2", Title = "Expand", Icon = SvgIcon.MaxWidth , Prompt = "Expand the text" },
        new AIPromptCommandDescriptor() { Id = "3", Title = "Translate", Icon = SvgIcon.EditTools,
            Children = new List<AIPromptCommandDescriptor>
            {
                new AIPromptCommandDescriptor() { Id = "4", Title = "English", Prompt = "Translate the text to English" },
                new AIPromptCommandDescriptor() { Id = "5", Title = "Bulgarian", Prompt = "Translate the text to Bulgarian" },
                new AIPromptCommandDescriptor() { Id = "6", Title = "Spanish", Prompt = "Translate the text to Spanish" },
            }
        }
    };
}
````
````C# Program.cs
// ...

// This example uses Azure OpenAI but you must configure the service depending on the model you are using. Read more at https://www.telerik.com/blazor-ui/documentation/common-features/microsoft-extensions-ai-integration
services.AddSingleton(new AzureOpenAIClient(
    new Uri("YOUR_AZURE_OPENAI_ENDPOINT"),
    new AzureKeyCredential("YOUR_AZURE_OPENAI_CREDENTIAL")));

services.AddChatClient(services => services.GetRequiredService<AzureOpenAIClient>().AsChatClient("gpt-4o-mini"));

// ...
````

## See Also

* [Live Demo: AI Integration](https://demos.telerik.com/blazor-ui/editor/ai-integration)
* [AI Integration Overview](slug:editor-ai-integration-overview)
* [Editor Integration with AIPrompt](slug:editor-aiprompt-integration)
