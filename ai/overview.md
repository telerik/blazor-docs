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

The Telerik Blazor MCP Server improves your developer experience and increases your productivity when implementing Blazor apps that leverage Telerik UI for Blazor. The MCP server provides proprietary context to AI-powered IDEs, apps, and tools, enabling you to generate tailored code and prompt complex questions and tasks that include [Telerik UI for Blazor](https://www.telerik.com/blazor-ui) components and API. The MCP server can help you create responsive dashboards, landing pages, and more. You can also ask it about component features, properties, events, or general usage.

## What Is the Telerik MCP Server

The Telerik Blazor MCP Server is a local MCP server that operates in two modes based on your Telerik license: **Agentic UI Generator** (for DevCraft Complete or Ultimate subscription licenses) and **AI Coding Assistant** (for Telerik UI for Blazor or DevCraft UI subscription licenses). 

The server is distributed via NuGet, which provides robust package management, streamlined authentication with your Telerik license key, and seamless integration with .NET development workflows.

## General Workflow

To get started with the Telerik MCP server, complete the following steps:

1. [Configure the MCP server]({% slug ai-installation#mcp-server-configuration %}).
2. (Optional) If you have not installed your license key, follow the [License Key Guidelines]({% slug installation-license-key#manual-installation %}).
3. Start using the tools—Open a chat session in your AI-powered IDE and begin prompting for component assistance or UI generation

For tool-specific usage guidance, visit the [Agentic UI Generator Getting Started]({% slug agentic-ui-generator-getting-started %}) or [AI Coding Assistant Getting Started]({% slug ai-mcp-server %}) articles.

## AI Tools Overview and Comparison

The Telerik Blazor MCP server supports two modes of operation that depend on your Telerik license type:
* Agentic UI Generator&mdash;This mode provides advanced capabilities for building complete user interfaces with responsive layouts and custom theming.
* AI Coding Assistant&mdash;A mode designed for streamlined component integration and configuration tasks.

| Mode | Available With | When to Use | What it Generates | Included Tools |
|------|----------------|----------------|----------------|----------------|
| Agentic UI Generator | [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription license | - Build complete pages, dashboards, or entire UI sections from scratch. <br>- Apply comprehensive styling, theming, and responsive design. <br>- Create a full visual design with layout and theme | Individual components with proper data binding and configuration. Complete pages with layout, styling, components, and responsiveness | - UI Generator <br>- Component Tool <br>- Layout Tool <br>- Icon Tool <br>- Style Tool <br>- Validator Tool |
| AI Coding Assistant | [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) or [DevCraft UI](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription license | - Add or configure individual Telerik UI for Blazor components.<br>- Ask component-specific questions (APIs, properties, events).<br>- Find icons for your buttons and components.| Individual components with proper data binding and configuration | - Orchestrator<br>- Component Tool<br>- Icon Tool<br>- Validator Tool |

## License Requirements

Access to the Telerik AI Tools depends on your [Telerik license type](https://www.telerik.com/purchase.aspx?filter=web). The table below summarizes which level of functionality you can access with each license type:

<table>
<thead>
<tr>
<th width="25%"></th>
<th width="15%">DevCraft Complete or Ultimate Subscription</th>
<th width="15%">Other Subscriptions</th>
<th width="15%">Perpetual License</th>
<th width="15%">Trial License</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>UI Generator Orchestrator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No*</td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Coding Assistant Orchestrator Tool</strong></td>
<td>No**</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No**</td>
<td>No**</td>
</tr>
<tr>
<td><strong>Component Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Icon Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Layout Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No*</td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Styling Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No*</td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
</tbody>
</table>

*Available with a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you) or [a Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).

**The Coding Assistant Orchestrator Tool is available only when you have a subscription license that enables the limited set of tools (Component and Icon Tool). When you have access to the full set of tools (DevCraft Complete/Ultimate subscription or Trial), the UI Generator Orchestrator Tool is in charge of coordinating all tools.

## Usage Limits

Usage limits for the Telerik MCP Server and its modes of operation:

* DevCraft Complete and Ultimate Subscription
  * These are the licenses that grant full access to the Agentic UI Generator mode of operation.
  * The number of requests is virtually unlimited, with fair use policy applied.
* Telerik UI for Blazor or DevCraft UI Subscription
  * Grants access to the AI Coding Assistant mode of operation.
  * Includes a virtually unlimited number of requests, with fair usage applied
* Trial License
  * An [AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you) automatically starts a 30-day trial for the AI tools.
  * Includes a virtually unlimited number of requests, with fair usage applied.
  * Reactivating the same trial for a new release does not grant additional requests.
  * Designed for evaluating the feature before purchasing.

> All Telerik AI tools share the same fair usage quota for your Telerik account.
> When using the AI tools, one prompt may trigger several requests, depending on the prompt complexity.

## Privacy

The Telerik MCP server operates under the following conditions:

* The MCP server does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The MCP server does not use your prompts to train Telerik AI models.
* The MCP server does not generate the actual responses and has no access to these responses. The MCP server only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) provide better responses.
* The MCP server does not associate your prompts to your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The MCP server stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

## Next Steps

* [Install the Telerik MCP server]({% slug ai-installation %})
* [Agentic UI Generator Getting Started]({% slug agentic-ui-generator-getting-started %}) 
* [AI Coding Assistant Getting Started]({% slug ai-mcp-server %})

## See Also

* [Agentic UI Generator Prompt Library]({% slug agentic-ui-generator-prompt-library %})
* [AI Coding Assistant Prompt Library]({% slug ai-prompt-library %})
