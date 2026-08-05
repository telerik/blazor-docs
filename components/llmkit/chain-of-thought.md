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

The ChainOfThought component renders a sequential list of agent reasoning steps. Each step can include an icon, label text, optional chip tags, and a visual connector to the next step. Use the component to show how the agent searches for tools, evaluates options, and plans its next action.

The component accepts a strongly typed data collection through the `Data` parameter and uses a `ThoughtTemplate` to control how each step renders.

## Creating the ChainOfThought

To use the ChainOfThought component:

1. Add the `<TelerikChainOfThought>` tag.
1. Set `TItem` to your step model type.
1. Set the `Data` parameter to a `List<TItem>`.
1. Define a `<ThoughtTemplate>` with a `Context` parameter to render each step.
1. (optional) Set `Label` and `SecondaryLabel` for the header text.
1. (optional) Set `Expandable` and `Expanded` to control collapsibility.
1. (optional) Set `Completed` to mark the block as finished.

>caption ChainOfThought showing agent tool discovery steps

````RAZOR
<TelerikChainOfThought TItem="ResearchStep"
                       Label="Thinking through request"
                       Icon="@SvgIcon.Brain"
                       Expandable="true"
                       Expanded="true"
                       Data="@Steps">
    <ThoughtTemplate Context="step">
        <div style="display: flex; align-items: flex-start; gap: 8px; padding: 2px 0;">
            <TelerikSvgIcon Icon="@step.Icon" Size="@ThemeConstants.SvgIcon.Size.Small" />
            <span>@step.Text</span>
        </div>
    </ThoughtTemplate>
</TelerikChainOfThought>

@code {
    private List<ResearchStep> Steps { get; set; } = new()
    {
        new ResearchStep { Icon = SvgIcon.Search, Text = "Searched for analytics tools" },
        new ResearchStep { Icon = SvgIcon.DataSql, Text = "Found query_database — supports GROUP BY, date filters, and aggregation" },
        new ResearchStep { Icon = SvgIcon.Search, Text = "Searching for related work..." },
        new ResearchStep { Icon = SvgIcon.DataSql, Text = "Found 3 related queries — revenue by month, top customers by order value, and invoice reconciliation report" }
    };

    public class ResearchStep
    {
        public ISvgIcon Icon { get; set; } = SvgIcon.Search;
        public string Text { get; set; } = string.Empty;
    }
}
````

## ChainOfThought Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Data` | `IEnumerable<TItem>` | The collection of step items to render through the `ThoughtTemplate`. |
| `TItem` | `Type` | The type of the step model. Required. |
| `Label` | `string` | The primary label shown in the component header. |
| `SecondaryLabel` | `string` | An additional label shown next to the primary label, for example a duration. |
| `Icon` | `object` | An icon rendered in the header. |
| `Expandable` | `bool` | Whether the content area can be collapsed by the user. |
| `Expanded` | `bool` | Controls the expanded state of the content area. Supports two-way binding. |
| `ExpandedChanged` | `EventCallback<bool>` | Fires when the user toggles the expanded state. |
| `Completed` | `bool` | Marks the reasoning block as completed, which can update the visual state of the header. |
| `Class` | `string` | An additional CSS class for the root element. |

## ChainOfThought Templates

| Template | Description |
| --- | --- |
| `ThoughtTemplate` | Defines how each step item is rendered. Exposes the current item through the `Context` parameter. |

## Next Steps

* [Checkpoint](slug:llmkit-checkpoint)
* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Live Demo: ChainOfThought](https://demos.telerik.com/blazor-ui/llmkit/chain-of-thought)
