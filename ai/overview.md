---
title: Overview
page_title: Telerik Blazor MCP Server Overview
description: Learn about the Telerik Blazor MCP Server, its modes of operation, and how it enhances AI-powered development with Telerik UI for Blazor components.
slug: ai-overview
tags: ai, mcp, assistant, agentic, generator
published: True
tag: new
position: 1
---

# Telerik Blazor MCP Server Overview

The Telerik Blazor MCP Server enables you to achieve interaction with AI and reach new levels of developer productivity. The MCP server provides proprietary context to AI-powered IDEs, apps, and tools. You can use the Telerik Blazor MCP server to ask about [Telerik UI for Blazor](https://www.telerik.com/blazor-ui) components, features, or general usage. You can successfully prompt more complex questions and tasks, and generate tailored code that includes Telerik UI for Blazor components and API.

## Single Unified MCP Server

The Telerik Blazor MCP Server has been significantly enhanced to provide a more streamlined development experience. The **Agentic UI Generator** and **AI Coding Assistant** have been merged into a single local MCP server. This consolidation simplifies installation, configuration, and usage, eliminating the need to manage multiple server instances.

Benefits of merging the AI tools into a single local MCP server:
* Simplified Usage&mdash;install and configure once, access all capabilities based on your license. Refer to [Modes of Operation](#modes-of-operation) for more details. 
* Seamless Experience&mdash;switch between coding assistance and UI generation without changing tools or servers.
* Reduced Complexity&mdash;no need to manage separate remote and local MCP configurations.
* Streamlined Authentication&mdash;you can now use your Telerik license key to activate the AI tools

## NuGet Distribution

The MCP server is now distributed via NuGet instead of npm. In addition to leveraging NuGet's robust package management, this opens the door to the integration of the Orchestrator and Validator tools.

* Orchestrator Tool&mdash;intelligently manages the agentic workflow, including the `Icons` tool for seamless icon integration.
* Validator Tool&mdash;ensures generated code follows Telerik UI for Blazor best practices and standards.

## Modes of Operation

The Telerik Blazor MCP server supports two modes of operation that depend on your Telerik license type:

| Mode | Available With | Included Tools |
|------|----------------|----------------|
| **AI Coding Assistant** | [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription license | Component documentation assistant, code generation, configuration assistance, troubleshooting support, Orchestrator, Icon, and Validator tools |
| **Agentic UI Generator** | [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription license | UI Generator, Component Assistant, Layout Assistant, Icon Assistant, Style Assistant, and Validator tools |

> The Agentic UI Generator includes the AI Coding Assistant, providing a comprehensive development experience.

### AI Coding Assistant

The AI Coding Assistant mode is designed for streamlined component integration and configuration tasks.

**Intended Use:**

* Initial Code Generation&mdash;quickly add components to your app to speed up initial development.
* Component Configuration&mdash;enable or disable specific component features, or fine-tune the configuration through prompting. More complex configurations are possible but may require additional manual work to be production-ready.
* Dummy Data Generation and Data Binding&mdash;quickly add data to your app for testing and prototyping purposes. Avoid exposing or providing access to your proprietary or production data to AI-enabled tools.
* Step-by-Step Explanations&mdash;understand the solutions provided by the AI Coding Assistant through detailed explanations (depends on the tool, mode, and model used). To further develop your knowledge, check the respective documentation.
* Preliminary Troubleshooting&mdash;resolve obvious and easy-to-solve issues affecting your code. For more complex issues, look for assistance from the community or contact the support team.

### Agentic UI Generator

The Agentic UI Generator mode provides advanced capabilities for building complete user interfaces with responsive layouts and custom theming.

**Intended Use:**

* Create Individual Components&mdash;build specific Telerik UI for Blazor components with particular configurations and features like filtering, validation, and data binding.
* Create full responsive pages
  * Build complete dashboards, landing pages, and listing pages in existing applications.
  * Generate pages similar to the Progress Design System page templates.
* Modify existing pages&mdash;generate new themes inside existing applications. Add dark mode or high-contrast themes.
* Implement responsive layout
  * Create new responsive pages and sections.
  * Convert existing pages to be responsive for mobile and tablet views.

## Getting Started

To start using the Telerik Blazor MCP Server:

1. **Configure MCP**&mdash;add the Telerik Blazor MCP Server configuration to your AI-powered IDE or tool.
2. **Add Your License Key**&mdash;authenticate with your Telerik license key.
3. **Start Using**&mdash;open a chat session in your AI-powered IDE and begin prompting for component assistance or UI generation based on your license.

For detailed setup instructions, refer to the [Installation]({% slug ai-installation %}) article. For mode-specific usage guidance, see the [AI Coding Assistant]({% slug ai-mcp-server %}) or [Agentic UI Generator]({% slug agentic-ui-generator-getting-started %}) articles.

## See Also

* [Installation]({% slug ai-installation %})
* [Agentic UI Generator]({% slug agentic-ui-generator-overview %})
* [AI Coding Assistant]({% slug ai-overview %})
