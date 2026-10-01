---
title: ChainOfThought
page_title: LLM Kit ChainOfThought
description: Use the ChainOfThought component from the Telerik UI for Blazor LLM Kit to visualize sequential agent reasoning steps with icons, connectors, and chip tags.
slug: llmkit-chain-of-thought
tags: telerik,blazor,llmkit,chain of thought,agent,ai,reasoning
published: True
position: 1
components: ["llmkit", "chainofthought"]
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

<demo metaUrl="client/llmkit/chain-of-thought/example-1/" height="420"></demo>

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
