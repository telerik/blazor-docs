---
title: Integration with AIPrompt
page_title: Editor Integration with AIPrompt
description: Integration of the AIPrompt component in the Editor for Blazor.
slug: editor-aiprompt-integration
tags: telerik,blazor,editor,ai,ai integration,aiprompt
published: True
position: 3
---

# Editor Integration with AIPrompt

The Editor provides a built-in integration with the [AIPrompt component](slug:aiprompt-overview) to help users add AI-driven suggestions, completions, and assistance to their Editor.

The integration with the AIPrompt component covers the following use cases:

* Standalone prompting - The user can ask the AIPrompt without any context provided by the Editor. This could be useful for ideas generation, writing a whole piece of content (blog post), or just random questions.
* Prompting with context - The user prompt will use additional context from the Editor (the UI allows user can decide whether to use the selected text if any or the whole content).
* Command with context - The user can select a command that will be applied to the selected content (if any) or the whole content if no text is selected.

## Enabling the AIPrompt

To enable the AIPrompt in the Editor:

1. Set the `EnableAIPrompt` parameter to `true`.
1. Register an [`IChatClient` service](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient?view=net-9.0-pp) to generate the AIPrompt responses. Configure the service according to the model you are using. The AIPrompt is designed to automatically use the registered `IChatClient` as the component provides a [built-in integration with the **Microsoft.Extensions.AI** library](slug:common-features-microsoft-extensions-ai-integration).

>caption Enabling the AIPrompt in the Editor

<div class="skip-repl"></div>
````RAZOR Editor
<TelerikEditor @bind-Value="@EditorValue"
               EnableAIPrompt="true"
               Height="400px">
</TelerikEditor>

@code {

    private string EditorValue { get; set; } = "Sample Editor content";

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

## Customizing the AIPrompt

The Editor allows customizing some of the integrated AIPrompt's settings. For that purpose, use the `<EditorAIPromptSettings>` tag. It provides the following parameters that you can configure:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default value | Description |
|-----------|------------------------|-------------|
| `SystemPrompt`  | `string` <br/> (See "Description" column) | The system prompt that will be passed to the integrated AIPrompt. If not provided, the AIPrompt will use its [default `SystemPrompt` value](slug:aiprompt-overview#aiprompt-parameters). |
| `Commands` | `List<AIPromptCommandDescriptor>` | The commands displayed within the Commands view. If not set the AIPrompt will use the [default predefined commands](slug:editor-ai-integration-overview#ai-integration-capabilities). |

>caption Customizing the AIPrompt in the Editor

<div class="skip-repl"></div>
````RAZOR Editor
<TelerikEditor @bind-Value="@EditorValue"
               EnableAIPrompt="true"
               Height="400px">
    <EditorSettings>
        <EditorAIPromptSettings Commands="@Commands"></EditorAIPromptSettings>
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
* [Editor Integration with Inline Prompt](slug:editor-ai-integration-overview)
