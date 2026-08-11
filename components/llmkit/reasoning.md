---
title: Reasoning
page_title: LLM Kit Reasoning
description: Use the Reasoning component from the Telerik UI for Blazor LLM Kit to display a collapsible block of agent inner monologue or scratchpad content.
slug: llmkit-reasoning
tags: telerik,blazor,llmkit,reasoning,agent,ai,thinking,scratchpad
published: True
position: 5
---

# Blazor LLM Kit Reasoning

The Reasoning component renders a collapsible block that exposes the agent's raw thinking process — its inner monologue or scratchpad content. Use the component to give users visibility into how the agent approaches a problem before it takes action.

Content inside the Reasoning block streams in progressively as the agent thinks, and the block can be marked as completed once the reasoning phase finishes.

## Creating Blazor Reasoning

To use the Reasoning component:

1. Add the `<TelerikReasoning>` tag.
1. Set `Label` to a string such as `"Thinking"` or `"Thought"`.
1. Define a `<ContentTemplate>` child template with the agent's reasoning text.
1. (optional) Set `Expandable` and `Expanded` to control collapsibility.
1. (optional) Set `Completed` to mark the reasoning phase as finished.
1. (optional) Set `SecondaryLabel` to display metadata such as duration.

>caption Completed Reasoning block showing agent scratchpad content

````RAZOR
<TelerikReasoning Label="Thought"
                  SecondaryLabel="for 5s"
                  Expandable="true"
                  @bind-Expanded="@IsExpanded"
                  Completed="true">
    <ContentTemplate>
        <p>I need to sum revenue per customer for Q1 2025 and return the top 5 results ordered descending.</p>
        <p>I'll use query_database with a GROUP BY on customer_name and limit to 5 results.</p>
    </ContentTemplate>
</TelerikReasoning>

@code {
    private bool IsExpanded { get; set; } = true;
}
````

## Reasoning API

Get familiar with all Reasoning parameters, templates, and events in the [Reasoning API Reference](slug:Telerik.Blazor.Components.TelerikReasoning).

## Next Steps

* [ChainOfThought](slug:llmkit-chain-of-thought)
* [ToolCall](slug:llmkit-tool-call)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Reasoning API Reference](slug:Telerik.Blazor.Components.TelerikReasoning)
