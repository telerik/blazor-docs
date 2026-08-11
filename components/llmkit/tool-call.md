---
title: ToolCall
page_title: LLM Kit ToolCall
description: Use the ToolCall component from the Telerik UI for Blazor LLM Kit to display agent tool invocations with parameters, results, and an approval workflow.
slug: llmkit-tool-call
tags: telerik,blazor,llmkit,tool call,agent,ai,approval,human in the loop
published: True
position: 4
---

# Blazor LLM Kit ToolCall

The ToolCall component shows a tool invocation made by the agent, including the tool name, its input parameters, and the result. It also supports a human-in-the-loop approval flow where users can approve or reject the tool execution before it runs.

Use the component when an agent requests access to an external system such as a database, API, or file store, and you want to give users visibility and control over that action.

## Creating Blazor ToolCall

To use the ToolCall component:

1. Add the `<TelerikToolCall>` tag.
1. Set the `Label` parameter to the tool name.
1. Set the `State` parameter to a `ToolCallState` value that reflects the current execution state.
1. Set the `Parameters` parameter to an object representing the tool inputs.
1. (optional) Set `ApprovalText` to describe what the tool will do. This text appears when `State` is `ToolCallState.AwaitingApproval`.
1. (optional) Subscribe to `OnAction` to handle approve and reject actions.
1. (optional) Set `Result` to display the tool output after execution.
1. (optional) Set `ErrorText` to display an error message when `State` is `ToolCallState.Error`.

>caption Completed ToolCall showing tool name, parameters, and execution metadata

````RAZOR
<TelerikToolCall Label="query_database"
                 SecondaryLabel="analytics · db · 120ms"
                 State="ToolCallState.Completed"
                 Expandable="true"
                 Expanded="true"
                 Parameters="@ToolParameters" />

@code {
    private object ToolParameters { get; } = new
    {
        database = "analytics",
        query = "SELECT customer_name, SUM(revenue) AS total FROM orders WHERE quarter = 'Q1 2025' GROUP BY customer_name ORDER BY total DESC LIMIT 5"
    };
}
````

>caption ToolCall awaiting user approval before execution

````RAZOR
<TelerikToolCall Label="send_email"
                 State="@ToolState"
                 ApprovalText="Send a summary email to the top 5 customers."
                 Parameters="@ToolParameters"
                 OnAction="@OnToolAction" />

@code {
    private ToolCallState ToolState { get; set; } = ToolCallState.AwaitingApproval;

    private object ToolParameters { get; } = new
    {
        recipients = "top-5-customers",
        subject = "Q1 2025 Revenue Summary"
    };

    private void OnToolAction(ToolCallAction action)
    {
        ToolState = action == ToolCallAction.Approve ? ToolCallState.Completed : ToolCallState.Error;
    }
}
````

## ToolCall API

Get familiar with all ToolCall parameters, states, and events in the [ToolCall API Reference](slug:Telerik.Blazor.Components.TelerikToolCall).

## Next Steps

* [Reasoning](slug:llmkit-reasoning)
* [ChainOfThought](slug:llmkit-chain-of-thought)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [ToolCall API Reference](slug:Telerik.Blazor.Components.TelerikToolCall)
