---
title: Overview
page_title: Telerik Blazor AI Tooling Overview
description: Learn about the AI-powered developer tools that integrate with your IDE or code editor for greater productivity and enhanced developer experience.
slug: ai-overview
tags: telerik,blazor,ai
published: True
position: 0
previous_url: /ai
---

# Telerik Blazor AI Coding Assistant Overview

The Telerik Blazor AI Coding Assistant improves your developer experience and increases your productivity when implementing Blazor apps that include Telerik UI for Blazor. The coding assistant is an AI code generator that provides proprietary context to AI models in order to produce higher quality code samples with the [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui) and API.

The Telerik AI Coding Assistant is integrated in the [Telerik Blazor MCP Server](slug:ai-mcp-server).

## Getting Started

To use the Telerik Blazor AI Coding Assistant, you need:

* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor subscription license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).
* A [Blazor application that includes Telerik UI for Blazor](slug:blazor-overview#getting-started).
* @[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

To learn how to set up and use the Telerik Blazor AI Coding Assistant, see the [Getting Started with the Telerik UI for Blazor AI Coding Assistant](slug:ai-mcp-server) article.

## Intended Use

You can use the Telerik AI Coding Assistant for:

* Initial code generation: Quickly add components to your app to speed up the initial development.
* Component configuration: Enable or disable specific component features, or fine tune the configuration through prompting. More complex configurations are possible but may require additional manual work to be production-ready.
* Dummy data generation and data binding: Quickly add data to your app for testing and prototyping purposes. Avoid exposing or providing access to your proprietary or production data to AI-enabled tools.
* Step-by-step explanations: Understand the solutions provided by the AI Coding Assistant through the detailed explanations (depends on the tool, mode, and model). To further develop your knowledge, check the respective documentation.
* Preliminary troubleshooting: Resolve obvious and easy-to-solve issues affecting your code. For more complex issues, search the product documentation or look for assistance from the community.

>warning Always double-check the suggested code and solutions of any AI-powered tool before applying them to your app.

> The Telerik AI Coding Assistant is not intended for styling and theme customization. If you are looking for AI-powered styling and theming, check out [Telerik ThemeBuilder](https://www.telerik.com/themebuilder).

## Recommendations

Consider the following recommendations when working with the Telerik AI Coding Assistant:

* When switching between tasks and files, start a new session in a new chat window to avoid polluting the context with irrelevant or outdated information.
* At the time of publishing, Claude Sonnet 4 and GPT-5 produce better results.
* Sometimes, the AI Coding Assistant might generate custom styles. To avoid any custom styling, include a similar statement in your prompts: `Don't add custom CSS styles`.

## Telerik Document Processing AI Coding Assistant

You can also use the AI Coding Assistant for [Telerik Document Processing](https://www.telerik.com/document-processing-libraries) to generate high-quality code samples and speed up your development. Read the full guide in the dedicated [DPL AI Coding Assistant](https://docs.telerik.com/devtools/document-processing/ai-coding-assistant/overview) article.

## Usage Limits

The Telerik Blazor AI Conding Assistant allows the following maximum number of requests, depending on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

### Subscription licenses

* A Subscription is the primary license that grants full access to the AI Coding Assistant.
* Includes a virtually unlimited number of requests, with fair usage applied

### Perpetual licenses

* Perpetual license holders have no access to the AI Coding Assistant by default.
* Requires starting a [30-day trial](https://www.telerik.com/try/ui-for-blazor) to access the AI Coding Assistant.
* After the trial expires, access is no longer available unless a Subscription License is purchased.

### Trial licenses

* Automatically provides a 30-day trial for the AI products when starting a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).
* Trial licenses grant access to both the AI Coding Assistant and the [Agentic UI Generator](slug:agentic_ui_generator_overview).
* Includes a virtually unlimited number of requests, with fair usage applied.
* Reactivating the same trial for a new release does not grant additional requests.
* Designed for evaluating the feature before purchasing.

> All Telerik AI tools share a single request limit for your Telerik account. For example, the [Telerik MCP server](slug:ai-mcp-server) and the [Agentic UI Generator](slug:agentic-ui-generator-overview) both take up from the same usage quota.
> When using the Telerik MCP server, one prompt may trigger several requests, depending on the prompt complexity.

## Privacy

The Telerik Blazor AI Coding Assistant operates under the following conditions:

* The Assistant does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The Assistant does not use your prompts to train Telerik AI models.
* The Assistant does not generate the actual responses and has no access to these responses. The Assistant only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The Assistant does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The Assistant stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

Make sure to also get familiar with the terms and privacy policy of your selected AI model and AI client.

## Next Steps

* Getting Started with the [Telerik Blazor MCP Server](slug:ai-mcp-server).
