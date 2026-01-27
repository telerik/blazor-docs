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

````RAZOR
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest" PromptSuggestions="PromptSuggestions"></TelerikAIPrompt>

@code {
    private List<string> PromptSuggestions { get; set; } = new List<string>()
    {
        "Act as a marketing specialist and content writer and write a compelling [type of text] that speaks directly to my [ideal customer persona] and encourages them to take [desired action] on my [website/product].",
        "I'm looking for a [type of text] that will convince [ideal customer persona] to sign up for my [program/subscription] by explaining the value it brings and the benefits they'll receive.",
        "Write a Twitter thread idea that will both go viral and attract high-quality leads for my [product/service] with a strong call-to-action and compelling visuals."
    };

    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // The example uses dummy data intentionally. Replace the hard-coded string with a call to your AI API.
        args.Output = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Views Overview](slug:aiprompt-views-overview)
  * [Prompt View](slug:aiprompt-views-prompt)
  * [Output View](slug:aiprompt-views-output)
  * [Views Templates](slug:aiprompt-views-templates)