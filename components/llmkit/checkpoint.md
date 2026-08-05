---
title: Checkpoint
page_title: LLM Kit Checkpoint
description: Use the Checkpoint component from the Telerik UI for Blazor LLM Kit to mark recoverable points in an agent conversation and let users restart the workflow.
slug: llmkit-checkpoint
tags: telerik,blazor,llmkit,checkpoint,agent,ai,restart
published: True
position: 2
---

# Blazor LLM Kit Checkpoint

The Checkpoint component marks a recoverable point in an agent conversation. It lets users restart the workflow from that point without losing prior context. Use the component alongside AI-generated responses to give users a clear way to go back and try a different path.

## Creating the Checkpoint

To use the Checkpoint component:

1. Add the `<TelerikCheckpoint>` tag.
1. Set the `State` parameter to a `CheckpointState` value.
1. Subscribe to the `StateChanged` event to handle the user action, for example resetting the workflow.

>caption Checkpoint that lets the user restart the agent workflow

````RAZOR
@if (ShowResult)
{
    <TelerikCheckpoint State="CheckpointState.StartOver"
                       StateChanged="@OnStartOver" />

    <div>
        <p>Top 5 customers by revenue in Q1 2025:</p>
        <ol>
            <li>Acme Corp — $142,000</li>
            <li>TechStart Inc — $98,500</li>
            <li>Meridian Labs — $87,200</li>
            <li>Nova Systems — $76,400</li>
            <li>Brightpath Co — $61,100</li>
        </ol>
    </div>
}
else
{
    <TelerikButton OnClick="@ShowResponse">Show Response</TelerikButton>
}

@code {
    private bool ShowResult { get; set; }

    private void ShowResponse()
    {
        ShowResult = true;
    }

    private void OnStartOver(CheckpointState _)
    {
        ShowResult = false;
    }
}
````

## Checkpoint Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `State` | `CheckpointState` | Defines the checkpoint action available to the user. Use `CheckpointState.StartOver` to show a restart control. |
| `StateChanged` | `EventCallback<CheckpointState>` | Fires when the user activates the checkpoint. Use the handler to reset the workflow state. |
| `Class` | `string` | An additional CSS class for the root element. |

## Next Steps

* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Live Demo: Checkpoint](https://demos.telerik.com/blazor-ui/llmkit/checkpoint)
