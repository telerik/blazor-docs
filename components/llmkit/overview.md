---
title: Overview
page_title: LLM Kit Overview
description: Discover the Telerik UI for Blazor LLM Kit — a collection of purpose-built components for building transparent, interactive, and enterprise-ready AI agent experiences.
slug: llmkit-overview
tags: telerik,blazor,llmkit,ai,agent,chain of thought,tool call,reasoning,citation,checkpoint
published: True
position: 0
components: ["llmkit", "chainofthought", "citation", "checkpoint", "reasoning", "toolcall"]
---

# Blazor LLM Kit Overview

The Telerik UI for Blazor LLM Kit is a collection of purpose-built components for building transparent, interactive, and enterprise-ready AI agent experiences. Designed to work alongside any chat or agentic interface, the kit brings visibility, control, and human oversight to AI-powered workflows. The kit provides ready-made building blocks for:

* Visualizing agent execution
* Multi-step workflows
* Tool invocations
* Reasoning and decision points
* Inline citations
* Approvals
* Conversation checkpoints

## LLM Kit Components

| Component | Description |
| --- | --- |
| [ChainOfThought](slug:llmkit-chain-of-thought) | Renders a sequential list of agent analysis steps with icons, connectors, and optional chip tags. Use it to visualize how the agent searches for tools, evaluates options, and arrives at a decision. |
| [Checkpoint](slug:llmkit-checkpoint) | Marks a recoverable point in an agent conversation. Lets users restart the workflow from that point without losing context. |
| [Citation](slug:llmkit-citation) | Displays inline source references attached to AI-generated content. Users can expand the citation to review the underlying sources. |
| [Reasoning](slug:llmkit-reasoning) | Renders a collapsible block of agent inner monologue or scratchpad content. Use it to expose the agent's raw thinking process. |
| [ToolCall](slug:llmkit-tool-call) | Shows a tool invocation made by the agent, including its parameters and result. Supports an approval flow that lets users approve or reject the tool execution before it runs. |

## Example

The following example demonstrates all LLM Kit components together. It shows a completed agent workflow — reasoning, chain of thought, a tool call, and a response with an inline citation and a checkpoint.

<demo metaUrl="client/llmkit/overview/example-1/" height="420"></demo>

## Next Steps

* [ChainOfThought](slug:llmkit-chain-of-thought)
* [Checkpoint](slug:llmkit-checkpoint)
* [Citation](slug:llmkit-citation)
* [ToolCall](slug:llmkit-tool-call)
* [Reasoning](slug:llmkit-reasoning)

## See Also

* [Live Demo: LLM Kit](https://demos.telerik.com/blazor-ui/llmkit/overview)
