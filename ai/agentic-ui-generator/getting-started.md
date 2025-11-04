---
title: Getting Started
page_title: Getting Started with the Telerik UI for Blazor Agentic UI Generator
description: Learn how to install and configure the Telerik UI for Blazor Agentic UI Generator in Visual Studio and Visual Studio Code.
slug: agentic-ui-generator-getting-started
position: 10
tags: telerik,blazor,ai,agentic,ui,generator,installation
published: True
---

# Getting Started with the Agentic UI Generator

This article describes how to install, configure, and use the Telerik UI for Blazor Agentic UI Generator in Visual Studio and Visual Studio Code.

## Prerequisites

An AI-powered IDE that supports MCP servers, for example, Visual Studio, Visual Studio Code, Cursor.

## Installation

The Agentic UI Generator is available as an MCP (Model Context Protocol) server that integrates with AI-powered IDEs like Visual Studio Code, Cursor, and other MCP-compatible tools.

### Configuration Steps

This section contains information about how to set up the Agentic UI Generator in Visual Studio and Visual Studio Code.   

#### Visual Studio

1. Log in with a valid [Telerik user account](https://www.telerik.com/account/).
2. To enable the Agentic UI Generator in a specific Blazor app, add a `.mcp.json` file to the solution folder and paste the configuration from the [Agentic UI Generator | MCP Configuration page](https://uiagent.mcp.telerik.com/preview). 

To enable global automatic discovery of the Agentic UI Generator in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

#### Visual Studio Code

1. Log in with a valid [Telerik user account](https://www.telerik.com/account/).
2. Go to the [Agentic UI Generator Preview Configuration](https://uiagent.mcp.telerik.com/preview). 
3. Click the **Add to VS Code** button. This will open a tab named **MCP Server: telerik-ui-generator** in your VS Code instance.
4. In the new VS Code tab, click **Install**.

After adding the configuration, restart your IDE to load the MCP server.

## Basic Usage

The Agentic UI Generator can be used in two primary modes: basic usage through the main tool, or advanced usage by calling specific MCP tools directly.

### Call the Agentic UI Generator

To use the Agentic UI Generator, you can call it in two ways:

#### Method 1: Using the Tool Handle

Prefix your prompt with `#telerik_ui_generator` followed by your request:

````TEXT.skip-repl
#telerik_ui_generator Create a dashboard page with a grid showing sales data and a chart visualizing monthly trends
````

#### Method 2: Using Natural Language

Prefixing your prompt with `#telerik_ui_generator` will make it more likely for the Agentic UI Generator to get called. Alternatively, you can use natural language and simply describe what you want. The AI assistant automatically recognizes when to use the Agentic UI Generator:

````TEXT.skip-repl
Create a product management page with a grid for displaying products, a form for adding new items, and filtering options
````

The generator analyzes your prompt and creates the appropriate Blazor components, markup, and styling.

## Advanced Usage

For more granular control, you can call individual tools that make up the Agentic UI Generator:

| Tool Handle | Description |
|------------|-------------|
| `telerik_ui_generator` | Main generator for building full UI flows. Coordinates all other tools to deliver complete solutions. |
| `telerik_layout_assistant` | Applies suitable CSS utility classes from the Progress Design System for styling and positioning elements. Use this tool when you need help with spacing, typography, colors, layout structure, or transforms. |
| `telerik_component_assistant` | Answers questions and generates code related to Teelrik UI for Blazor components. Use this tool when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc. |
| `telerik_style_assistant` | Generates custom styles and theme configurations for your application. Use this tool when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI. |
| `telerik_icon_assistant` | Searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this tool when you need to find and add specific icons for your UI components or design elements. |

You can call these tools directly when you need specific functionality, allowing for more precise control over the generation process.

## See Also

* [Agentic UI Generator Overview](slug:agentic-ui-generator-overview)
* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
