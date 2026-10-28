---
title: ToolCall
page_title: LLM Kit ToolCall
description: Use the ToolCall component from the Telerik UI for Blazor LLM Kit to display agent tool invocations with parameters, results, and an approval workflow.
slug: llmkit-tool-call
tags: telerik,blazor,llmkit,tool call,agent,ai,approval,human in the loop
published: True
position: 4
components: ["toolcall"]
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

<demo metaUrl="client/llmkit/tool-call/example-1/" height="420"></demo>

>caption ToolCall awaiting user approval before execution

<demo metaUrl="client/llmkit/tool-call/example-2/" height="500"></demo>

## ToolCall API

Get familiar with all ToolCall parameters, states, and events in the [ToolCall API Reference](slug:Telerik.Blazor.Components.TelerikToolCall).

## Next Steps

* [Reasoning](slug:llmkit-reasoning)
* [ChainOfThought](slug:llmkit-chain-of-thought)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [ToolCall API Reference](slug:Telerik.Blazor.Components.TelerikToolCall)
