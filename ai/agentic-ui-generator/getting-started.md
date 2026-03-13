---
title: Getting Started
page_title: Getting Started with the Telerik UI for Blazor Agentic UI Generator
description: Learn how to set up the Telerik UI for Blazor Agentic UI Generator using the Telerik CLI, which automates project creation and configuration through a single guided command.
slug: agentic-ui-generator-getting-started
position: 10
tags: telerik,blazor,ai,agentic,cli,generator,installation
previous_url: /ai/ai-coding-assistant/mcp-server, /ai/installation
published: True
tag: updated
---

# Getting Started with the Agentic UI Generator

The Agentic UI Generator is an intelligent development tool delivered through the [Telerik Blazor MCP Server](https://www.nuget.org/packages/Telerik.Blazor.MCP) that enables UI generation from natural language prompts. Once configured and authenticated, you can use the Agentic UI Generator tool (`#telerik_ui_generator`) together with the available specialized MCP assistants.

This article describes a streamlined approach to setting up the Agentic UI Generator using the Telerik CLI, which automates license configuration, Telerik MCP server and Telerik NuGet setup, and project scaffolding.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* [.NET 8 or newer](https://dotnet.microsoft.com/en-us/download).
* A [compatible MCP client (IDE, code editor, or app)](https://modelcontextprotocol.io/clients) that supports MCP server integrations.
* An [active Telerik license](slug:ai-overview#license-requirements) - trial or subscription.

## Quick Start

Instead of manually creating configuration files, you can use the [Telerik CLI](slug:installation-cli) and the built-in Getting Started Assistant to handle the entire setup automatically - whether you are starting a new project or adding Telerik UI for Blazor to an existing one.

Follow these steps to set up the Agentic UI Generator:

1. Install the Telerik CLI globally by executing the following command in any standard command-line interface (CLI) or terminal on your operating system:
   ````SH.skip-repl
   dotnet tool install -g Telerik.CLI
   ````

1. Set up the Telerik NuGet feed so that the CLI and your IDE can restore Telerik NuGet packages:
   ````SH.skip-repl
   telerik nuget config
   ````

1. Activate (update) your Telerik license:
   ````SH.skip-repl
   telerik license get-key
   ````

1. Configure the Telerik MCP server:

   <TabStrip>
   <TabStripTab title=".NET 10">

   ````SH.skip-repl
   telerik mcp config all blazor
   ````

   </TabStripTab>
   <TabStripTab title=".NET 8 or 9">

   ````SH.skip-repl
   dotnet tool install Telerik.Blazor.MCP
   ````

   ````SH.skip-repl
   telerik mcp config all blazor
   ````

   </TabStripTab>
   </TabStrip>
  
1. Create a Blank Solution in Visual Studio, or an empty folder in Visual Studio Code, and open it in your IDE. In the AI chat interface, invoke the Getting Started Assistant:
   ````TEXT.skip-repl
   #telerik_getting_started_assistant create a new blazor web app
   ````

1. Now you can start using the Agentic Ul Generator by prompting in your IDE's chat interface.

   ````TEXT.skip-repl
   #telerik_ui_generator Build a sales operations dashboard with a pageable and sortable Grid
   ````

   For a comprehensive collection of sample prompts covering general UI tasks, layout organization, component implementation, styling, accessibility, and icon selection, see the [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library).

## Use Cases

The Agentic UI Generator is designed to help with various development scenarios:

* Generate specific Telerik UI for Blazor components with particular configurations and features like filtering, validation, and data binding.
* Create full responsive pages
   * Build complete dashboards, landing pages, and listing pages in existing applications.
   * Generate pages similar to the [Progress Design System page templates](https://www.telerik.com/design-system/docs/ui-templates/overview/).
* Modify existing pages
   * Enhance existing dashboards by adding new sections.
   * Insert new sections that match existing layout style and responsiveness.
* Create and modify themes
* Implement Responsive Layout
   * Create new responsive pages and sections.
   * Convert existing pages to be responsive for mobile and tablet views.

>  While the Agentic UI Generator performs great with powerful models like **Claude Sonnet 4.6**, **GPT-5.2**, or **Gemini 3 Pro**, it also excels with smaller models as well (such as **Haiku** and **GPT 5.1 mini**).

## See Also

* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
