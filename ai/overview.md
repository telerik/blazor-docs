---
title: Overview
page_title: Telerik Blazor MCP Server Overview
description: Learn about the Telerik Blazor MCP Server, its modes of operation, and how it enhances AI-powered development with Telerik UI for Blazor components.
slug: ai-overview
tags: ai, mcp, assistant, agentic, generator
published: True
tag: new
previous_url: /ai/agentic-ui-generator/overview, /ai/ai-coding-assistant/overview
position: 1
---

# Telerik Blazor MCP Server Overview

The Telerik Blazor MCP Server improves your developer experience and increases your productivity when implementing Blazor apps that leverage Telerik UI for Blazor. The MCP server provides proprietary context to AI-powered IDEs, apps, and tools, enabling you to generate tailored code and prompt complex questions and tasks that include [Telerik UI for Blazor](https://www.telerik.com/blazor-ui) components and API. You can also use it to ask about component features, properties, events, or general usage.

## What Is the Telerik MCP Server

The Telerik Blazor MCP Server is a local MCP server that operates in two modes based on your Telerik license: **Agentic UI Generator** (for DevCraft Complete or Ultimate subscription licenses) and **AI Coding Assistant** (for Telerik UI for Blazor subscription licenses). If you have a different license type, you can start a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you). 

The server is distributed via NuGet, which provides robust package management, streamlined authentication with your Telerik license key, and seamless integration with .NET development workflows.

## Modes of Operation

The Telerik Blazor MCP server supports two modes of operation that depend on your Telerik license type:
* Agentic UI Generator&mdash;This mode provides advanced capabilities for building complete user interfaces with responsive layouts and custom theming.
* AI Coding Assistant&mdash;A mode designed for streamlined component integration and configuration tasks.

> The Agentic UI Generator includes the AI Coding Assistant, providing a comprehensive development experience.

| Mode | Available With | When to Use | What it Generates | Included Tools |
|------|----------------|----------------|----------------|----------------|
| Agentic UI Generator | [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription license | - Build complete pages, dashboards, or entire UI sections from scratch. <br>- Apply comprehensive styling, theming, and responsive design. <br>- Create a full visual design with layout and theme | Individual components with proper data binding and configuration. Complete pages with layout, styling, components, and responsiveness | <ul><li>UI Generator</li><li>Component Assistant</li><li>Layout Assistant</li><li>Icon Assistant</li><li>Style Assistant</li><li>Validator Assistant</li></ul> |
| AI Coding Assistant | [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription license | - Add or configure individual Telerik UI for Blazor components.<br>- Ask component-specific questions (APIs, properties, events).<br>- Find icons for your buttons and components.</li></ul>| Individual components with proper data binding and configuration | <ul><li>Orchestrator</li><li>Icon Assistant</li><li>Validator Assistant</li></ul> |

## Available Tools

Each mode provides access to specific tools that work together to generate high-quality code:

* UI Generator&mdash;Creates complete pages with layout, styling, and components (Agentic UI Generator mode only).
* Component Assistant&mdash;Answers questions and generates code related to Telerik UI for Blazor components.
* Layout Assistant&mdash;Helps with responsive design and CSS utilities from the [Progress Design System](https://www.telerik.com/design-system/docs/) (Agentic UI Generator mode only).
* Icon Assistant&mdash;Searches and retrieves icons from the Progress Design System iconography.
* Style Assistant&mdash;Generates custom themes and CSS variables (Agentic UI Generator mode only).
* Orchestrator&mdash;Intelligently manages the workflow and coordinates the usage of the other tools.
* Validator&mdash;Ensures that the generated code follows Telerik UI for Blazor best practices and standards.

## Quick Start

To start using the Telerik Blazor MCP Server:

1. Activate your license&mdash;Authenticate with your [Telerik license key]({% slug ai-installation#license-key %}).
2. Configure MCP&mdash;Add the [Telerik Blazor MCP Server configuration]({% slug ai-installation#mcp-server-configuration %}) to your AI-powered IDE or tool.
3. Start using&mdash;Open a chat session in your AI-powered IDE and begin prompting for component assistance or UI generation based on your license.

For detailed setup instructions, refer to the [Installation]({% slug ai-installation %}) article. For mode-specific usage guidance, see the [AI Coding Assistant]({% slug ai-mcp-server %}) or [Agentic UI Generator]({% slug agentic-ui-generator-getting-started %}) articles.

## Usage Limits

Access to the Telerik MCP Server modes of operation depends on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* DevCraft Complete and Ultimate Subscription
  * These are the licenses that grant full access to the Agentic UI Generator mode of operation.
  * The number of requests is virtually unlimited, with fair use policy applied.
* Telerik UI for Blazor Subscription
  * Grants access to the AI Coding Assistant mode of operation.
  * Includes a virtually unlimited number of requests, with fair usage applied
* Trial License
  * An [AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you) automatically starts a 30-day trial for the AI tools.
  * Includes a virtually unlimited number of requests, with fair usage applied.
  * Reactivating the same trial for a new release does not grant additional requests.
  * Designed for evaluating the feature before purchasing.

> All Telerik AI tools share the same fair usage quota for your Telerik account.
> When using the AI tools, one prompt may trigger several requests, depending on the prompt complexity.

## See Also

* [Installation]({% slug ai-installation %})
