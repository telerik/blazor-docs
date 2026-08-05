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

The following example demonstrates all LLM Kit components working together in an agent workflow. A user submits a question, the agent reasons through it, plans tool usage, requests approval, and displays the result with inline citations.

````RAZOR
@using System.Timers
@implements IDisposable

<div style="max-width: 680px; display: flex; flex-direction: column; gap: 12px; padding-top: 8px;">

    <TelerikPromptBox Value="@Prompt"
                      ReadOnly="true"
                      IsLoading="@Running"
                      EnableSpeechToText="false"
                      OnPromptAction="@HandlePromptAction" />

    @if (Stage >= WorkflowStage.Reasoning)
    {
        <TelerikReasoning Label="@(Stage >= WorkflowStage.ChainOfThought ? "Thought" : "Thinking")"
                          SecondaryLabel="@(Stage >= WorkflowStage.ChainOfThought ? "for 5s" : null)"
                          Icon="@SvgIcon.Brain"
                          Expandable="true"
                          Expanded="@IsReasoningExpanded"
                          ExpandedChanged="@((bool v) => IsReasoningExpanded = v)"
                          Completed="@(Stage >= WorkflowStage.ChainOfThought)">
            <Content>
                @if (Stage >= WorkflowStage.ReasoningText1)
                {
                    <p>I need to identify the correct table and apply a quarterly date filter. Revenue should be summed per customer and sorted descending.</p>
                }
                @if (Stage >= WorkflowStage.ReasoningText2)
                {
                    <p>I'll use query_database with a GROUP BY on customer_name and limit to 5 results.</p>
                }
            </Content>
        </TelerikReasoning>
    }

    @if (Stage >= WorkflowStage.ChainOfThought)
    {
        <TelerikChainOfThought TItem="CotStep"
                               Label="@(Stage >= WorkflowStage.ToolCall ? "Thought" : "Thinking through request")"
                               SecondaryLabel="@(Stage >= WorkflowStage.ToolCall ? "for 3s" : null)"
                               Icon="@SvgIcon.Brain"
                               Expandable="true"
                               Expanded="@IsCotExpanded"
                               ExpandedChanged="@((bool v) => IsCotExpanded = v)"
                               Completed="@(Stage >= WorkflowStage.ToolCall)"
                               Data="@CotSteps">
            <ThoughtTemplate Context="step">
                <div style="display: flex; align-items: flex-start; gap: 8px; padding: 2px 0;">
                    <TelerikSvgIcon Icon="@step.Icon" Size="@ThemeConstants.SvgIcon.Size.Small" />
                    <span>@step.Text</span>
                </div>
            </ThoughtTemplate>
        </TelerikChainOfThought>
    }

    @if (Stage >= WorkflowStage.ToolCall)
    {
        <TelerikToolCall Label="query_database"
                         SecondaryLabel="@(ToolApproved ? "analytics · db · 120ms" : null)"
                         State="@ToolState"
                         Expandable="true"
                         Expanded="@IsToolCallExpanded"
                         ExpandedChanged="@((bool v) => IsToolCallExpanded = v)"
                         Parameters="@ToolParameters"
                         Result="@(ToolApproved ? AsciiTableResult : null)"
                         ErrorText="@(ToolRejected ? "Request rejected — using cached data instead" : null)"
                         ApprovalText="This will run a SELECT query on the analytics database. No data will be modified."
                         OnAction="@HandleToolCallAction" />
    }

    @if (ShowResult)
    {
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
    }

</div>

@code {
    private enum WorkflowStage
    {
        Initial, Reasoning, ReasoningText1, ReasoningText2,
        ChainOfThought, ToolCall, Done
    }

    private WorkflowStage Stage { get; set; } = WorkflowStage.Initial;
    private bool IsReasoningExpanded { get; set; } = true;
    private bool IsCotExpanded { get; set; } = true;
    private bool IsToolCallExpanded { get; set; } = true;
    private bool ToolApproved { get; set; }
    private bool ToolRejected { get; set; }
    private bool Running { get; set; }
    private bool ShowResult { get; set; }
    private string Prompt { get; set; } = "What are our top customers by revenue this quarter?";
    private int Tick { get; set; }
    private Timer? DemoTimer { get; set; }

    private ToolCallState ToolState => ToolApproved
        ? ToolCallState.Completed
        : ToolRejected
            ? ToolCallState.Error
            : ToolCallState.AwaitingApproval;

    private static readonly string AsciiTableResult =
        "| Customer       | Revenue  |\n" +
        "|----------------|----------|\n" +
        "| Acme Corp      | $142,000 |\n" +
        "| TechStart Inc  |  $98,500 |\n" +
        "| Meridian Labs  |  $87,200 |\n" +
        "| Nova Systems   |  $76,400 |\n" +
        "| Brightpath Co  |  $61,100 |";

    private object ToolParameters { get; } = new
    {
        database = "analytics",
        query = "SELECT customer_name, SUM(revenue) AS total\nFROM orders\nWHERE quarter = 'Q1 2025'\nGROUP BY customer_name\nORDER BY total DESC\nLIMIT 5"
    };

    private List<CotStep> CotSteps { get; set; } = new();

    private List<RevenueSource> Sources { get; } = new()
    {
        new RevenueSource { Title = "Acme Corp Q1 2025 Revenue Report", Url = "https://acme-corp.com/reports/q1-2025" },
        new RevenueSource { Title = "TechStart Inc Financial Summary", Url = "https://techstart.com/financials/2025" },
        new RevenueSource { Title = "Meridian Labs Quarterly Results", Url = "https://meridian-labs.com/results/q1" },
        new RevenueSource { Title = "Nova Systems Revenue Dashboard", Url = "https://nova-systems.com/dashboard" },
        new RevenueSource { Title = "Brightpath Co Earnings Report", Url = "https://brightpath.co/earnings/2025" }
    };

    private static readonly (int Tick, WorkflowStage Stage)[] Schedule =
    {
        (0, WorkflowStage.Reasoning),
        (2, WorkflowStage.ReasoningText1),
        (4, WorkflowStage.ReasoningText2),
        (6, WorkflowStage.ChainOfThought),
        (8, WorkflowStage.ToolCall)
    };

    private void HandlePromptAction(PromptBoxActionButtonEventArgs args)
    {
        if (Running) return;
        Running = true;
        Stage = WorkflowStage.Initial;
        ToolApproved = false;
        ToolRejected = false;
        ShowResult = false;
        IsReasoningExpanded = true;
        IsCotExpanded = true;
        IsToolCallExpanded = true;
        CotSteps = new();
        Tick = 0;
        DemoTimer?.Stop();
        DemoTimer?.Dispose();
        DemoTimer = new Timer(700) { AutoReset = true };
        DemoTimer.Elapsed += OnTick;
        DemoTimer.Start();
    }

    private void OnTick(object? sender, ElapsedEventArgs e)
    {
        Tick++;
        foreach (var (tick, stage) in Schedule)
        {
            if (Tick >= tick && Stage < stage)
            {
                if (stage == WorkflowStage.ChainOfThought)
                {
                    IsReasoningExpanded = false;
                    CotSteps = new List<CotStep>
                    {
                        new CotStep { Icon = SvgIcon.Search, Text = "Searched for analytics tools" },
                        new CotStep { Icon = SvgIcon.DataSql, Text = "Found query_database — supports GROUP BY and aggregation" }
                    };
                }
                else if (stage == WorkflowStage.ToolCall)
                {
                    IsCotExpanded = false;
                }
                Stage = stage;
            }
        }
        if (Stage >= WorkflowStage.ToolCall)
        {
            DemoTimer?.Stop();
        }
        InvokeAsync(StateHasChanged);
    }

    private async void HandleToolCallAction(ToolCallAction action)
    {
        if (action == ToolCallAction.Approve)
        {
            ToolApproved = true;
        }
        else
        {
            ToolRejected = true;
        }
        IsToolCallExpanded = false;
        Running = false;
        ShowResult = true;
        await InvokeAsync(StateHasChanged);
    }

    private void OnStartOver(CheckpointState _)
    {
        Stage = WorkflowStage.Initial;
        ToolApproved = false;
        ToolRejected = false;
        ShowResult = false;
        Running = false;
        IsReasoningExpanded = true;
        IsCotExpanded = true;
        IsToolCallExpanded = true;
        CotSteps = new();
        Tick = 0;
        DemoTimer?.Stop();
        DemoTimer?.Dispose();
        DemoTimer = null;
    }

    public void Dispose()
    {
        DemoTimer?.Stop();
        DemoTimer?.Dispose();
    }

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
