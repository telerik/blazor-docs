---
title: Overview
page_title: Telerik UI for Blazor AI Tools Overview
description: Learn how the Telerik UI for Blazor AI Tools use MCP and WebMCP to support AI-assisted development and runtime UI interactions.
slug: ai-overview
tags: ai, mcp, webmcp, agentic, blazor
published: True
position: 1
tag: updated
---

# Telerik UI for Blazor AI Tools Overview

Telerik UI for Blazor provides AI tools for development and runtime browser interaction. The Telerik Blazor MCP Server uses the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) standard to provide AI assistance while you build and update Blazor applications. WebMCP is a browser standard that lets an AI agent interact with enabled Telerik components in a running application.

Together, the Telerik Blazor MCP Server and WebMCP support AI-assisted development and controlled AI interaction with application UI.

## AI Tools for Development and Runtime

The following table shows how the Telerik Blazor MCP Server and WebMCP support different stages of application development and use:

| Goal | Telerik Blazor MCP Server | WebMCP |
| --- | --- | --- |
| Main use | Build or update a Telerik Blazor application with AI assistance in your development environment. | Let an AI agent operate selected Telerik components in a running application. |
| Where it runs | AI-enabled IDE, code editor, or development client | Chromium-based browser with WebMCP support |
| Typical tasks | Retrieve Telerik UI for Blazor knowledge; generate pages and components; configure layout, styling, icons, accessibility, localization, licensing, and upgrades; and modify application code through your AI client. | Filter or export a Grid, navigate a Scheduler, select a tab, and change an input value through component operations that you enable on the current page. |
| Start here | [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started) | [WebMCP Tools Overview](slug:web-mcp-overview) |

You can use both in the same product. For example, use the Agentic UI Generator while you develop a dashboard, then use WebMCP to let an agent filter and navigate that dashboard after you deploy it.

## About the Telerik Blazor MCP Server

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is a standard that lets an AI client connect to external tools and context providers. The Telerik Blazor MCP Server is distributed through the [Telerik.Blazor.MCP](https://www.nuget.org/packages/Telerik.Blazor.MCP) NuGet package.

Use the MCP server when you want AI assistance with Telerik UI for Blazor development. The Agentic UI Generator can coordinate specialized assistants for component configuration, layout, styling, icons, accessibility, localization, licensing, and upgrades. Use it to create a complete page or target a specialized assistant for a focused task.

You can set up the Agentic UI Generator in three ways:

* Use the Telerik CLI to configure the Telerik Blazor MCP Server automatically.
* Install the `telerik-blazor-plugin` to use the same capabilities as AI agent skills. The plugin starts the MCP server automatically.
* Configure the MCP server manually in an `.mcp.json` or `mcp.json` file.

See [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started) for the setup instructions. To learn about the available assistants and development scenarios, see the [Agentic UI Generator Overview](slug:agentic-ui-generator-overview).

## About WebMCP

[WebMCP](https://developer.chrome.com/docs/ai/webmcp/compare-mcp) is an experimental browser API that lets a web page expose deliberate UI operations to an AI agent. Instead of asking an agent to inspect the DOM or simulate pointer input, a Telerik component can register the actions that it supports as browser tools.

For example, an agent can filter a Grid, navigate a Scheduler, or set the value of an input component when the component has WebMCP enabled. The agent can only use the tools that your application registers.

WebMCP is currently available behind a feature flag in some Chromium-based browsers. To try it, enable the browser feature, install and configure the Telerik WebMCP browser extension, and enable WebMCP tools on supported components. See the [WebMCP Tools Overview](slug:web-mcp-overview) for the complete setup.

## License Requirements

The Telerik Blazor MCP Server and Agentic UI Generator are available with an active Telerik UI for Blazor subscription or trial license. Perpetual license holders can evaluate the AI tools with a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you) or a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).

## Next Steps

* [Set Up the Agentic UI Generator](slug:agentic-ui-generator-getting-started)
* [Explore Agentic UI Generator Capabilities](slug:agentic-ui-generator-overview)
* [Set Up WebMCP Tools](slug:web-mcp-overview)
* [Review Supported WebMCP Components](slug:web-mcp-supported-components)