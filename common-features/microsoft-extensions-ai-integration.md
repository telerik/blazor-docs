---
title: Integration with Microsoft.Extensions.AI
page_title: Integration with Microsoft.Extensions.AI
description: How to integrate the UI for Blazor components with Microsoft.Extensions.AI
slug: common-features-microsoft-extensions-ai-integration
tags: telerik,blazor,aiprompt,ai,extensions,integration
published: True
position: 4
---

# Integration with Microsoft.Extensions.AI

The [AIPrompt component](slug:aiprompt-overview) incorporates the [Microsoft.Extensions.AI package](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp) to simplify your AI model integration, provide flexibility and let you easily use and test various AI providers.

Other components will support similar integration in future versions of UI for Blazor.

## Integration

To integrate the **Microsoft.Extensions.AI** library with your AIPrompt component, register an [`IChatClient`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient?view=net-9.0-pp) service and configure it according to the model you are using. The AIPrompt is designed to automatically use the registered `IChatClient`.

> The Microsoft AI library is still in preview, so breaking changes may occur. Telerik UI for Blazor references `Microsoft.Extensions.AI.Abstractions` version `9.1.0-preview.1.25064.3`. Do not register a newer version of this package explicitly in your app, as this may cause integration issues or exceptions.
>
> When using the Telerik AIPrompt component with the Microsoft AI library, do not subscribe to the `OnPromptRequest` event.

**Microsoft.Extensions.AI provides** a simple integration with various models where the configuration slightly differs depending on the model. The example below shows usage of [Azure OpenAI](https://www.nuget.org/packages/Azure.AI.OpenAI) and you may [explore some other examples with different models in this post](https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/#chat).

>caption Startup.cs:

<div class="skip-repl"></div>
````C# 
    services.AddSingleton(new AzureOpenAIClient(
       new Uri("YOUR_AZURE_OPENAI_ENDPOINT"),
       new AzureKeyCredential("YOUR_AZURE_OPENAI_CREDENTIAL")));

    services.AddChatClient(services => services.GetRequiredService<AzureOpenAIClient>().AsChatClient("gpt-4o-mini"));
````

## See Also 

* [AIPrompt Overview - Documenation](slug:aiprompt-overview)
* [AIPrompt - Live Demo](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Microsoft.Extensions.AI](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp)
* [Introducing Microsoft.Extensions.AI Preview – Unified AI Building Blocks for .NET](https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/)