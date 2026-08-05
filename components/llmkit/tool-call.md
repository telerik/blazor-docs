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

## Creating the ToolCall

To use the ToolCall component:

1. Add the `<TelerikToolCall>` tag.
1. Set the `Label` parameter to the tool name.
1. Set the `State` parameter to a `ToolCallState` value that reflects the current execution state.
1. Set the `Parameters` parameter to an object representing the tool inputs.
1. (optional) Set `ApprovalText` to describe what the tool will do. This text appears when `State` is `ToolCallState.AwaitingApproval`.
1. (optional) Subscribe to `OnAction` to handle approve and reject actions.
1. (optional) Set `Result` to display the tool output after execution.
1. (optional) Set `ErrorText` to display an error message when `State` is `ToolCallState.Error`.

>caption ToolCall with an approval flow

````RAZOR
<TelerikToolCall Label="query_database"
                 SecondaryLabel="@SecondaryLabel"
                 State="@CurrentState"
                 Expandable="true"
                 Expanded="@IsExpanded"
                 ExpandedChanged="@((bool v) => IsExpanded = v)"
                 Parameters="@ToolParameters"
                 Result="@ToolResult"
                 ErrorText="@ErrorText"
                 ApprovalText="This will run a SELECT query on the analytics database. No data will be modified."
                 OnAction="@HandleToolCallAction" />

@code {
    private ToolCallState CurrentState { get; set; } = ToolCallState.AwaitingApproval;
    private bool IsExpanded { get; set; } = true;
    private string? SecondaryLabel { get; set; }
    private object? ToolResult { get; set; }
    private string? ErrorText { get; set; }

    private object ToolParameters { get; } = new
    {
        database = "analytics",
        query = "SELECT customer_name, SUM(revenue) AS total\nFROM orders\nWHERE quarter = 'Q1 2025'\nGROUP BY customer_name\nORDER BY total DESC\nLIMIT 5"
    };

    private static readonly string QueryResult =
        "| Customer       | Revenue  |\n" +
        "|----------------|----------|\n" +
        "| Acme Corp      | $142,000 |\n" +
        "| TechStart Inc  |  $98,500 |\n" +
        "| Meridian Labs  |  $87,200 |\n" +
        "| Nova Systems   |  $76,400 |\n" +
        "| Brightpath Co  |  $61,100 |";

    private async void HandleToolCallAction(ToolCallAction action)
    {
        if (action == ToolCallAction.Approve)
        {
            CurrentState = ToolCallState.Completed;
            SecondaryLabel = "analytics · db · 120ms";
            ToolResult = QueryResult;
        }
        else
        {
            CurrentState = ToolCallState.Error;
            ErrorText = "Request rejected — using cached data instead";
        }
        IsExpanded = false;
        await InvokeAsync(StateHasChanged);
    }
}
````

## ToolCall States

| State | Description |
| --- | --- |
| `ToolCallState.AwaitingApproval` | The tool call is pending user approval. The `ApprovalText` and approve/reject buttons are shown. |
| `ToolCallState.Running` | The tool is currently executing. |
| `ToolCallState.Completed` | The tool executed successfully. The `Result` is shown. |
| `ToolCallState.Error` | The tool execution failed or was rejected. The `ErrorText` is shown. |

## ToolCall Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Label` | `string` | The tool name shown in the component header. |
| `SecondaryLabel` | `string` | Additional header text, for example execution metadata such as database name and duration. |
| `State` | `ToolCallState` | The current state of the tool call. Controls which UI is shown. |
| `Parameters` | `object` | The input parameters passed to the tool. Rendered as a formatted block. |
| `Result` | `object` | The output returned by the tool after successful execution. |
| `ErrorText` | `string` | An error message shown when `State` is `ToolCallState.Error`. |
| `ApprovalText` | `string` | A description of what the tool will do, shown when `State` is `ToolCallState.AwaitingApproval`. |
| `Expandable` | `bool` | Whether the content area can be collapsed by the user. |
| `Expanded` | `bool` | Controls the expanded state of the content area. Supports two-way binding. |
| `ExpandedChanged` | `EventCallback<bool>` | Fires when the user toggles the expanded state. |
| `OnAction` | `EventCallback<ToolCallAction>` | Fires when the user clicks the approve or reject button. The argument is a `ToolCallAction` value. |
| `Class` | `string` | An additional CSS class for the root element. |

## ToolCall Events

| Event | Description |
| --- | --- |
| `OnAction` | Fires when the user clicks **Approve** or **Reject**. The event argument is a `ToolCallAction` enum value (`ToolCallAction.Approve` or `ToolCallAction.Reject`). |

## Next Steps

* [Reasoning](slug:llmkit-reasoning)
* [ChainOfThought](slug:llmkit-chain-of-thought)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Live Demo: ToolCall](https://demos.telerik.com/blazor-ui/llmkit/tool-call)
