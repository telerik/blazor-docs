---
title: Integrations with Microsoft.Extensions.AI package
page_title: Integrations with Microsoft.Extensions.AI package
description: How to integrate the UI for Blazor components with Microsoft.Extensions.AI package
slug: common-features-extensions-ai-integration
tags: telerik,blazor,aiprompt,ai,extensions,integration
published: True
position: 4
---

# Integrations with Microsoft.Extensions.AI package

Some of the UI for Blazor components can be integrated with the [Microsoft.Extensions.AI package](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp) to allow......

## Supported Components

At the time of writing, the Extensions.AI package can be integrated with the [AIPrompt component](slug:aiprompt-overview). Other components will support similar integration in future versions of UI for Blazor.

## Integration

To integrate the Microsoft.Extensions.AI package with your AIPrompt component, add the following services:

````C# Startup.cs
    services.AddSingleton(new AzureOpenAIClient(
       new Uri("https://ai-explorations.openai.azure.com"),
       new AzureKeyCredential("---")));

    services.AddChatClient(services => services.GetRequiredService<AzureOpenAIClient>().AsChatClient("gpt-4o-mini"));
````

## See Also 

* [AIPrompt Overview - Documenation](slug:aiprompt-overview)
* [AIPrompt - Live Demo](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Microsoft.Extensions.AI package](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai?view=net-9.0-pp)