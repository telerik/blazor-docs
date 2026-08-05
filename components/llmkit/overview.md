---
title: Overview
page_title: LLM Kit Overview
description: Discover the Telerik UI for Blazor LLM Kit — a collection of purpose-built components for building transparent, interactive, and enterprise-ready AI agent experiences.
slug: llmkit-overview
tags: telerik,blazor,llmkit,ai,agent,chain of thought,tool call,reasoning,citation,checkpoint
published: True
position: 0
---

# Blazor LLM Kit Overview

The Telerik UI for Blazor LLM Kit is a collection of purpose-built components for building transparent, interactive, and enterprise-ready AI agent experiences.

It provides ready-made building blocks for visualizing agent execution, multi-step workflows, tool invocations, reasoning and decision points, inline citations, approvals, and conversation checkpoints. Designed to work alongside any chat or agentic interface, the kit brings visibility, control, and human oversight to AI-powered workflows.

## LLM Kit Components

| Component | Description |
| --- | --- |
| [ChainOfThought](slug:llmkit-chain-of-thought) | Renders a sequential list of agent reasoning steps with icons, connectors, and optional chip tags. Use it to visualize how the agent searches for tools, evaluates options, and arrives at a decision. |
| [Checkpoint](slug:llmkit-checkpoint) | Marks a recoverable point in an agent conversation. Lets users restart the workflow from that point without losing context. |
| [Citation](slug:llmkit-citation) | Displays inline source references attached to AI-generated content. Users can expand the citation to review the underlying sources. |
| [ToolCall](slug:llmkit-tool-call) | Shows a tool invocation made by the agent, including its parameters and result. Supports an approval flow that lets users approve or reject the tool execution before it runs. |
| [Reasoning](slug:llmkit-reasoning) | Renders a collapsible block of agent inner monologue or scratchpad content. Use it to expose the agent's raw thinking process. |

## Combined Example

The following example demonstrates all LLM Kit components together. It shows a completed agent workflow — reasoning, chain of thought, a tool call, and a response with an inline citation and a checkpoint.

````RAZOR
<div style="max-width: 680px; display: flex; flex-direction: column; gap: 12px; padding-top: 8px;">

    <TelerikReasoning Label="Thought"
                      SecondaryLabel="for 5s"
                      Icon="@SvgIcon.Brain"
                      Expandable="true"
                      Expanded="false"
                      Completed="true">
        <ContentTemplate>
            <p>I need to sum revenue per customer for Q1 2025 and return the top 5 results ordered descending.</p>
        </ContentTemplate>
    </TelerikReasoning>

    <TelerikChainOfThought TItem="CotStep"
                           Label="Thought"
                           SecondaryLabel="for 3s"
                           Icon="@SvgIcon.Brain"
                           Expandable="true"
                           Expanded="false"
                           Completed="true"
                           Data="@Steps">
        <ThoughtTemplate Context="step">
            <div style="display: flex; align-items: flex-start; gap: 8px; padding: 2px 0;">
                <TelerikSvgIcon Icon="@step.Icon" Size="@ThemeConstants.SvgIcon.Size.Small" />
                <span>@step.Text</span>
            </div>
        </ThoughtTemplate>
    </TelerikChainOfThought>

    <TelerikToolCall Label="query_database"
                     SecondaryLabel="analytics · db · 120ms"
                     State="ToolCallState.Completed"
                     Expandable="true"
                     Expanded="false"
                     Parameters="@ToolParameters" />

    <TelerikCheckpoint State="CheckpointState.StartOver"
                       StateChanged="@OnStartOver" />

    <div>
        <p>Your top 5 customers by revenue in Q1 2025:</p>
        <ol>
            <li>Acme Corp — $142,000</li>
            <li>TechStart Inc — $98,500</li>
            <li>Meridian Labs — $87,200</li>
            <li>Nova Systems — $76,400</li>
            <li>Brightpath Co — $61,100</li>
        </ol>
        <p>Together they account for $465,200 — approximately 67% of total quarterly revenue.
            <TelerikCitation Data="@Sources" TItem="RevenueSource" Label="acme-corp.com" />
        </p>
    </div>

</div>

@code {
    private List<CotStep> Steps { get; set; } = new()
    {
        new CotStep { Icon = SvgIcon.Search, Text = "Searched for analytics tools" },
        new CotStep { Icon = SvgIcon.DataSql, Text = "Found query_database — supports GROUP BY and aggregation" }
    };

    private object ToolParameters { get; } = new
    {
        database = "analytics",
        query = "SELECT customer_name, SUM(revenue) AS total FROM orders WHERE quarter = 'Q1 2025' GROUP BY customer_name ORDER BY total DESC LIMIT 5"
    };

    private List<RevenueSource> Sources { get; } = new()
    {
        new RevenueSource { Title = "Acme Corp Q1 2025 Revenue Report", Url = "https://acme-corp.com/reports/q1-2025" },
        new RevenueSource { Title = "Analytics DB Export", Url = "https://analytics.internal/export/revenue-q1-2025" }
    };

    private void OnStartOver(CheckpointState _) { }

    public class CotStep
    {
        public ISvgIcon Icon { get; set; } = SvgIcon.Search;
        public string Text { get; set; } = string.Empty;
    }

    public class RevenueSource
    {
        public string? Title { get; set; }
        public string? Url { get; set; }
    }
}
````

## Next Steps

* [ChainOfThought](slug:llmkit-chain-of-thought)
* [Checkpoint](slug:llmkit-checkpoint)
* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [Live Demo: LLM Kit](https://demos.telerik.com/blazor-ui/llmkit/overview)
