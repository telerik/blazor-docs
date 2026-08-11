---
title: ChainOfThought
page_title: LLM Kit ChainOfThought
description: Use the ChainOfThought component from the Telerik UI for Blazor LLM Kit to visualize sequential agent reasoning steps with icons, connectors, and chip tags.
slug: llmkit-chain-of-thought
tags: telerik,blazor,llmkit,chain of thought,agent,ai,reasoning
published: True
position: 1
---

# Blazor LLM Kit ChainOfThought

The ChainOfThought component renders a sequential list of agent execution steps. Each step can include an icon, label text, optional chip tags, and a visual connector to the next step. Use the component to show how the agent searches for tools, evaluates options, and plans its next action.

The component accepts a strongly typed data collection through the `Data` parameter and uses a `ItemTemplate` to control how each step renders.

## Creating Blazor ChainOfThought

To use the ChainOfThought component:

1. Add the `<TelerikChainOfThought>` tag.
1. Set the `Data` parameter to a `List<TItem>`.
1. Define a `<ItemTemplate>` with a `Context` parameter to render each step.
1. (optional) Set `Label` and `SecondaryLabel` for the header text.
1. (optional) Set `Expandable` and `Expanded` to control collapsibility.
1. (optional) Set `Completed` to mark the block as finished.

>caption ChainOfThought showing agent tool discovery steps

````RAZOR
<TelerikChainOfThought Data="@Steps"
                       Label="Thinking through request"
                       Expandable="true"
                       @bind-Expanded="@IsExpanded"
                       Completed="@IsComplete">
    <ItemTemplate Context="step">
        <div style="display: flex; align-items: flex-start; gap: 8px; padding: 2px 0;">
            <span>@step.Text</span>
        </div>
    </ItemTemplate>
</TelerikChainOfThought>

@code {
    private bool IsExpanded { get; set; } = true;
    private bool IsComplete { get; set; }

    private List<ResearchStep> Steps { get; set; } = new()
    {
        new ResearchStep { Text = "Searched for analytics tools" },
        new ResearchStep { Text = "Found query_database — supports GROUP BY, date filters, and aggregation" },
        new ResearchStep { Text = "Searching for related work..." }
    };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(2000);
            Steps.Add(new ResearchStep { Text = "Found 3 related queries — revenue by month, top customers by order value, and invoice reconciliation report" });
            IsComplete = true;
            StateHasChanged();
        }
    }

    public class ResearchStep
    {
        public string Text { get; set; } = string.Empty;
    }
}
````

## ChainOfThought API

Get familiar with all ChainOfThought parameters, templates, and events in the [ChainOfThought API Reference](slug:Telerik.Blazor.Components.TelerikChainOfThought-1).

## Next Steps

* [Checkpoint](slug:llmkit-checkpoint)
* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [ChainOfThought API Reference](slug:Telerik.Blazor.Components.TelerikChainOfThought-1)
