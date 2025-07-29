---
title: Overview
page_title: Telerik Blazor AI Tooling Overview
description: Learn about the AI-powered developer tools that integrate with your IDE or code editor for greater productivity and enhanced developer experience.
slug: ai-overview
tags: telerik,blazor,ai
published: True
position: 1
---

# Telerik Blazor AI Coding Assistant Overview

The Telerik Blazor AI Coding Assistant improves your developer experience and increases your productivity when implementing Blazor apps that include Telerik UI for Blazor. The coding assistant is an AI code generator that provides proprietary context to AI models in order to produce higher quality code samples with the [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui) and API.

The Telerik AI Coding Assistant is integrated in:

* The [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension)
* The [Telerik Blazor MCP Server](slug:ai-mcp-server)

The major differences between these tools are:

* The MCP server is more powerful and can handle more complex prompts that require several requests to the AI model. An MCP-enabled client like Cursor or GitHub Copilot in **Agent** mode can directly suggest changes to your app and even rebuild it to verify the new AI generated code.
* The responses of the GitHub Copilot extension may contain more explanations how to accomplish the task, and shorter or partial code snippets. When using the MCP server, the AI response is mostly code.

## Getting Started

To use the Telerik Blazor AI Coding Assistant, you need:

* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/blazor-ui).
* A [Blazor application that includes Telerik UI for Blazor](slug:blazor-overview#getting-started).
* @[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

## Number of Requests

The Telerik Blazor AI Conding Assistant allows the following maximum number of requests, depending on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* Perpetual licenses: 50 requests per year
* Subscription licenses: virtually unlimited number of requests with a fair use threshold of 300 requests per day
* Trial licenses: 300 requests per trial per year. Activating the same trial for a new release does not grant additional 300 requests.

> All Telerik AI tools share a single request limit for your Telerik account. For example, the [Telerik Copilot extension](slug:ai-copilot-extension) and the [Telerik MCP server](slug:ai-mcp-server) both take up from the same usage quota.
> When using the Telerik MCP server, one prompt may trigger several requests, depending on the prompt complexity.

## Privacy

The Telerik Blazor AI Coding Assistant operates under the following conditions:

* The Assistant does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The Assistant does not use your prompts to train Telerik AI models.
* The Assistant does not generate the actual responses and has no access to these responses. The Assistant only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The Assistant does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The Assistant stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#number-of-requests).

Make sure to also get familiar with the terms and privacy policy of your selected AI model and AI client.

## Next Steps

* Install the [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension).
* Add the [Telerik Blazor MCP Server](slug:ai-mcp-server) to an MCP-enabled client.
