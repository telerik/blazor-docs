---
title: Templates
page_title: AIPrompt Templates
description: Discover the AIPrompt templates that let you customize the appearance of the component, for example, the rendering of the prompt suggestions.
slug: aiprompt-templates
tags: telerik,blazor,aiprompt,ai,prompt,templates
published: True
position: 30
components: ["aiprompt"]
---

# AIPrompt Templates

The AIPrompt component provides the `PromptSuggestionItemTemplate` that allows you to change the appearance of the prompt suggestions made by the component.

>tip The AIPrompt component also implements [View templates](slug:aiprompt-templates) that control the rendering of the Prompt, Output, and Command views.

The Prompt view of the AIPrompt renders any suggestions passed to the `PromptSuggestions` parameter in the form of elevated bubbles within a collapsible section. The `PromptSuggestionItemTemplate` allows you to control the rendering of individual suggestions.

>note By default, clicking on a suggestion will populate the prompt's input with the suggestion's value and also trigger a `PromptTextChanged` event. If you use the `PromptSuggestionItemTemplate`, you should also handle [any event](slug:aiprompt-events) you deem necessary (such as `onclick`).

>caption Using the `PromptSuggestionItemTemplate` to alter the appearance of the suggestions

<demo metaUrl="client/aiprompt/templates/promptsuggestionitemtemplate-1/" height="470"></demo>

## See Also

* [Views Templates](slug:aiprompt-views-templates)
