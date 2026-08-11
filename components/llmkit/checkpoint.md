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

## Creating Blazor Checkpoint

To use the Checkpoint component:

1. Add the `<TelerikCheckpoint>` tag.
1. Set the `State` parameter to a `CheckpointState` value.
1. Subscribe to the `OnClick` event to handle the user action, for example resetting the workflow.
1. (optional) Set `Visible="true"` to keep the checkpoint always visible. Otherwise, it appears on hover.

>caption Checkpoint placed above an AI-generated response

````RAZOR
<TelerikCheckpoint State="@CheckpointState"
                   Visible="true"
                   OnClick="@OnCheckpointClick" />

<div>
    <p>Your top 5 customers by revenue in Q1 2025:</p>
    <ol>
        <li>Acme Corp — $142,000</li>
        <li>TechStart Inc — $98,500</li>
        <li>Meridian Labs — $87,200</li>
        <li>Nova Systems — $76,400</li>
        <li>Brightpath Co — $61,100</li>
    </ol>
</div>

@code {
    private CheckpointState CheckpointState { get; set; } = CheckpointState.StartOver;

    private void OnCheckpointClick()
    {
        CheckpointState = CheckpointState.Saved;
    }
}
````

## Checkpoint API

Get familiar with all Checkpoint parameters and events in the [Checkpoint API Reference](slug:Telerik.Blazor.Components.TelerikCheckpoint).

## Next Steps

* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [LLM Kit Overview](slug:llmkit-overview)
* [Checkpoint API Reference](slug:Telerik.Blazor.Components.TelerikCheckpoint)
