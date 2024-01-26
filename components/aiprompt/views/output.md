---
title: Output View
page_title: AIPrompt Output View
description: Explore the AIPrompt Output View. Learn how to handle output rating.
slug: aiprompt-views-output
tags: telerik,blazor,aiprompt,ai,prompt,output
published: True
position: 20
---

# AIPrompt Output View

The Output view shows the generated responses by the underlying AI service. Each response renders in its dedicated output card and provides two options to the user - to copy the content of the response or to retry the request.

If the `ShowOutputRating` is enabled on the component level, the output card will also feature two additional options - to upvote and downvote the response. This interaction can be handled through the `OnOutputRate` event. For more information on how to handle the event, refer to the [AIPrompt events]({%slug aiprompt-events%}) article.

By default, the Output View is rendered and is part of the predefined views. However, if you provide a render fragment of type `AIPromptViews` to the `TelerikAIPrompt` tag, you override the default rendering, meaning you should explicitly add `AIPromptOutputView` tag within it. The Output View is activated through interaction - once the user fills out a prompt within the Prompt View and requests a response, the Output View will become active.

>caption Use the `ButtonText` and `ButtonIcon` to alter the appearance of view button.

````CSHTML
<TelerikAIPrompt @bind-Prompt="@Prompt">
    <AIPromptViews>
        <AIPromptPromptView ButtonText="Prompt View" ButtonIcon="@SvgIcon.Sparkles" />
        <AIPromptOutputView ButtonText="Output View" ButtonIcon="@SvgIcon.Comment" />
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private string Prompt { get; set; }
}
````

>caption Use the `ShowOutputRating` to include visuals related to upvoting or downvoting a specific output.

````CSHTML
<TelerikAIPrompt @bind-Prompt="@Prompt" ShowOutputRating="true" OnOutputRate="@OnOutputRateHandler">
    <AIPromptViews>
        <AIPromptPromptView ButtonText="Prompt View" ButtonIcon="@SvgIcon.Sparkles" />
        <AIPromptOutputView ButtonText="Output View" ButtonIcon="@SvgIcon.Comment" />
    </AIPromptViews>
</TelerikAIPrompt>

@code {
    private string Prompt { get; set; }

    private void OnOutputRateHandler(AIPromptOutputRatingEventArgs args)
    {
        // Handle the output rate event here
    }
}
````

## See Also

  * [Live Demo: AIPrompt](https://demos.telerik.com/blazor-ui/aiprompt/overview)
  * [Views Overview]({%slug aiprompt-views-overview%})
  * [Prompt View]({%slug aiprompt-views-prompt%})
  * [Commands View]({%slug aiprompt-views-commands%})
  * [Views Templates]({%slug aiprompt-views-templates%})