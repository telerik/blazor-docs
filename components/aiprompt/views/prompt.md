---
title: Prompt View
page_title: AIPrompt - Prompt View
description: Explore the AIPrompt Prompt view that allows users to type their queries, and learn how to pass a set of prompt suggestions.
slug: aiprompt-views-prompt
tags: telerik,blazor,aiprompt,prompt
published: True
position: 10
components: ["aiprompt"]
---

# AIPrompt Prompt View

The Prompt view features the prompt input, where users can type their query. It also contains a button to trigger a response request.

Additionally, the Prompt view can display prompt suggestions related to the prompt itself. To control these suggestions, use the `PromptSuggestions` parameter. The user can select any of the available suggestions, which in turn will populate the prompt input with the selected suggestion. This interaction will not trigger a response request right away—the user can modify the suggestion first.

>caption Using `PromptSuggestions` to display a set of predefined prompts or hints.

<demo metaUrl="client/aiprompt/views/prompt/promptsuggestions-1/" height="550"></demo>

## See Also

* [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
* [Views Overview](slug:aiprompt-views-overview)
* [Prompt View](slug:aiprompt-views-prompt)
* [Output View](slug:aiprompt-views-output)
* [Views Templates](slug:aiprompt-views-templates)