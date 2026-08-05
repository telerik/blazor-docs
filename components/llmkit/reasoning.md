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

## Creating the Reasoning Component

To use the Reasoning component:

1. Add the `<TelerikReasoning>` tag.
1. Set `Label` to a string such as `"Thinking"` or `"Thought"`.
1. Define a `<Content>` child template with the agent's reasoning text.
1. (optional) Set `Expandable` and `Expanded` to control collapsibility.
1. (optional) Set `Completed` to mark the reasoning phase as finished.
1. (optional) Set `SecondaryLabel` to display metadata such as duration.

>caption Reasoning block showing agent scratchpad content

````RAZOR
<TelerikReasoning Label="@Label"
                  SecondaryLabel="@SecondaryLabel"
                  Icon="@SvgIcon.Brain"
                  Expandable="true"
                  Expanded="@IsExpanded"
                  ExpandedChanged="@((bool v) => IsExpanded = v)"
                  Completed="@IsCompleted">
    <Content>
        @if (ShowLine1)
        {
            <p>I need to identify the correct table and apply a quarterly date filter. Revenue should be summed per customer and sorted descending.</p>
        }
        @if (ShowLine2)
        {
            <p>I'll use query_database with a GROUP BY on customer_name and limit to 5 results.</p>
        }
    </Content>
</TelerikReasoning>

<div style="margin-top: 12px; display: flex; gap: 8px;">
    <TelerikButton OnClick="@AddLine1" Enabled="@(!ShowLine1)">Add first thought</TelerikButton>
    <TelerikButton OnClick="@AddLine2" Enabled="@(ShowLine1 && !ShowLine2)">Add second thought</TelerikButton>
    <TelerikButton OnClick="@Complete" Enabled="@(ShowLine2 && !IsCompleted)">Complete</TelerikButton>
</div>

@code {
    private bool IsExpanded { get; set; } = true;
    private bool IsCompleted { get; set; }
    private bool ShowLine1 { get; set; }
    private bool ShowLine2 { get; set; }

    private string Label => IsCompleted ? "Thought" : "Thinking";
    private string? SecondaryLabel => IsCompleted ? "for 5s" : null;

    private void AddLine1() => ShowLine1 = true;
    private void AddLine2() => ShowLine2 = true;

    private void Complete()
    {
        IsCompleted = true;
        IsExpanded = false;
    }
}
````

## Reasoning Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Label` | `string` | The primary label shown in the component header, for example `"Thinking"` or `"Thought"`. |
| `SecondaryLabel` | `string` | Additional header text shown next to the label, for example the time taken to reason. |
| `Icon` | `object` | An icon rendered in the header. |
| `Expandable` | `bool` | Whether the content area can be collapsed by the user. |
| `Expanded` | `bool` | Controls the expanded state of the content area. Supports two-way binding. |
| `ExpandedChanged` | `EventCallback<bool>` | Fires when the user toggles the expanded state. |
| `Completed` | `bool` | Marks the reasoning block as completed. Updates the header to a finished visual state. |
| `Class` | `string` | An additional CSS class for the root element. |

## Reasoning Templates

| Template | Description |
| --- | --- |
| `Content` | Defines the inner content of the reasoning block. Render streaming text, paragraphs, or any markup that represents the agent's thought process. |

## Next Steps

* [ChainOfThought](slug:llmkit-chain-of-thought)
* [ToolCall](slug:llmkit-tool-call)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Live Demo: Reasoning](https://demos.telerik.com/blazor-ui/llmkit/reasoning)
