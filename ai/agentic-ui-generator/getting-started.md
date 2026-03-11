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
* Enabled HTTP/2 protocol support on the client device and any firewalls and proxies that may manage the network requests.
* A [Telerik user account](https://www.telerik.com/account/).
* An [active Telerik license](slug:ai-overview#license-requirements) that provides access to the Telerik Blazor MCP server.

## Quick Start

Instead of manually creating configuration files, you can use the [Telerik CLI](https://www.nuget.org/packages/Telerik.CLI) and the built-in Getting Started Assistant to handle the entire setup automatically—whether you are starting a new project or adding Telerik UI for Blazor to an existing one.

Follow these steps:

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
   ````SH.skip-repl
   telerik mcp config visualstudio blazor
   ````

   The example above shows how to call the `telerik mcp config` command for Visual Studio. Instead of `visualstudio`, you can pass a different IDE argument value: `vscode`, `cursor`, or `all`.

1. Open your IDE (Visual Studio Code or another supported AI-enabled IDE). In the AI chat interface, invoke the Getting Started Assistant:
   ````TEXT.skip-repl
   #telerik_getting_started_assistant create a new blazor web app
   ````

## Using the Agentic UI Generator

Once installed, you can start using the Agentic UI Generator by prompting in your IDE's chat interface. The Agentic UI Generator can be used in two primary modes: basic usage through [the Agentic UI Generator orchestrator](#call-the-agentic-ui-generator), or advanced usage by [calling specific MCP assistants directly](#target-the-assistants-advanced).

### Call the Agentic UI Generator

1. Open the AI chat interface in your IDE&mdash;Start a new chat session to begin interacting with the Agentic UI Generator.
1. Start your prompt with the `#telerik_ui_generator` handle&mdash;this invokes the orchestrator tool that uses an agentic flow to analyze and process your request.

    ```prompt Sales Dashboard
    #telerik_ui_generator Build a sales operations dashboard with a pageable and sortable Grid
    ```
    ```Razor
    ```


### Target the Assistants (Advanced)

For more precise control over the generation process, you can invoke the specialized assistants individually using their dedicated handles. Each assistant focuses on a specific aspect of UI development:

| Assistant | Handle | Purpose |
|------------|-------------|-------------|
| Getting Started Assistant| `#telerik_getting_started_assistant` | Performs the initial Telerik UI for Blazor setup workflow, including project scaffolding, Telerik NuGet setup, Telerik MCP server configuration, and license activation. You can specify the project name, project type, and Kendo theme for the scaffolded app. Use this assistant when you want to get from zero setup to your first working prompt quickly. |
| Layout Assistant | `#telerik_layout_assistant` | Applies suitable CSS utility classes from the [Progress Design System](https://www.telerik.com/design-system/docs/) for styling and positioning elements. Use this assistant when you need help with spacing, typography, colors, layout structure, or transforms. |
| Component Assistant | `#telerik_component_assistant` | Answers questions and generates code related to Telerik UI for Blazor components. Use this assistant when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc. |
| Style Assistant | `#telerik_style_assistant` | Generates custom styles and theme configurations for your application. Use this assistant when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI. |
| Icon Assistant | `#telerik_icon_assistant` | Searches and retrieves icons from the [Progress Design System Iconography](https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/) by name, category, or keywords. Use this assistant when you need to find and add specific icons for your UI components or design elements. |
| Accessibility Assistant | `#telerik_accessibility_assistant` | Provides WCAG 2.2 Level AA guidance and component-specific accessibility implementation details. Use this assistant to ensure your UI meets compliance standards, implements correct ARIA roles, and retrieves accessibility API references for Telerik UI for Blazor components. |
| Validator Assistant | n/a | Not designed to be invoked manually. It is called automatically by the UI Generator Orchestrator and ensures the generated code follows Telerik UI for Blazor best practices and standards. |

For examples of how to use each specialized assistant, see the [Assistant-Specific Prompts](slug:agentic-ui-generator-prompt-library#assistant-specific-prompts) section in the Prompt Library article.

> Using assistant handles to target specific tools in Visual Studio currently is not available. To increase the probability that a tool will be called, either explicitly mention the tool in your prompt, or specify that in your Copilot instructions.

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

> tip For a comprehensive collection of sample prompts covering general UI tasks, layout organization, component implementation, styling, accessibility, and icon selection, see the [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library).

## Agentic UI Generator in Telerik REPL for Blazor

Telerik REPL for Blazor now includes a Preview integration with the Agentic UI Generator. Through this integration, developers can generate complete UI pages, layouts, and UI for Blazor components directly in the browser and evaluate them in real time&mdash;making it easy to experiment with different configurations without setting up a local project. For more details, see [Agentic UI Generator Integration in Blazor REPL](slug:blazor-repl-integration#agentic-ui-generator-integration-with-blazor-repl-preview).

## Privacy

The Telerik MCP server operates under the following conditions:

* The MCP server does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The MCP server does not use your prompts to train Telerik AI models.
* The MCP server does not generate the actual responses and has no access to these responses. The MCP server only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) produce better responses.
* The MCP server does not associate your prompts with your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.
* The MCP server stores metrics about how often and how much you use it in order to ensure compliance with the [allowed number of requests that correspond to your current license](#usage-limits).

### Best Practices

To get the best results from the Agentic UI Generator:

* Start with a focused prompt, then iterate by adding requirements step by step.
* Be explicit about layout, behavior, data structure, and acceptance criteria.
* Reference existing components, styling, or patterns to match (for example the [Progress Design System](https://www.telerik.com/design-system/docs/)).
* Attach relevant files so the generator can align with your current project structure.
* Use `#telerik_ui_generator` when you want coordinated output across layout, components, styling, icons, and accessibility.
* Specify responsive behavior for desktop, tablet, and mobile.
* Keep your Blazor project structure and naming conventions consistent.
* Review, test, and validate generated code before using it in production.
* While the Agentic UI Generator performs close to parity with Copilot when paired with powerful models like **Claude Sonnet 4.5**, **GPT-5.2**, or **Gemini 3 Pro**, it also excels with smaller models such as **Haiku** and **GPT 5.1 mini**.

## See Also

* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
