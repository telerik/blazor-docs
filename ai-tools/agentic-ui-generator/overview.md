---
title: Overview
meta_title: Overview of the Telerik UI for Blazor Agentic UI Generator
description: Learn about the Telerik UI for Blazor Agentic UI Generator, an intelligent prompt-driven development assistant that accelerates the creation of modern web applications.
slug: agentic-ui-generator-overview
position: 0
tags: telerik,blazor,ai,agentic,ui,generator
published: True
---

# Telerik UI for Blazor Agentic UI Generator

The Agentic UI Generator is an intelligent, prompt-driven development assistant designed to accelerate the creation and styling of modern web applications. Built around Telerik and Kendo UI, the Agent enables developers to move from idea to quality UI with speed, precision, and confidence. It allows developers to use it with their favourite AI-powered IDEs for seamless integration with their existing workflows, delivering more productivity with no extra friction.

## What is the Agentic UI Generator

At its core, the Agentic UI Generator integrates five specialized tools—UI Generator, Style Search, Component Search, Style Customization, and Icon Search—working together in an agentic flow to deliver complete, beautiful, on-brand and enterprise-ready UIs. The main generator coordinates these tools to handle component generation, styling, theming, and design system integration seamlessly.

### How It Works

The Agentic UI Generator uses an intelligent approach where specialized tools work together to handle different aspects of UI development. When you provide a prompt, the main generator analyzes your requirements and coordinates the appropriate tools to deliver the desired outcome. For more control over specific aspects of your UI, you can also call individual tools directly as described in the [Advanced Use](#advanced-use) section.

### Intended Use

The Agentic UI Generator is designed to help with various development scenarios:

**Create Individual Components**
* Build specific Telerik components with custom configurations
* Generate components with advanced features like filtering, validation, and data binding
* Example: "Create a Select component with filtering and the option to add new items"

**Create Full Responsive Pages**
* Build complete dashboards, landing pages, and listing pages in existing applications
* Generate pages similar to [Telerik Design System page templates](https://www.telerik.com/design-system/docs/ui-templates/templates/automotive-industry/)
* Example: "Create a new PoC and I have created an empty application that now needs a login screen and an admin dashboard"

**Modify Existing Pages**
* Enhance existing dashboards by adding new sections
* Insert new sections that match existing layout style and responsiveness
* Example: "Insert a new section in the middle of an existing page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message"

**Create and Modify Themes**
* Generate new themes inside existing applications
* Add dark mode or high-contrast themes
* Example: "Generate a complete dark theme for my app based on a prompt so my UI looks on-brand in dark mode as well"

**Responsive Layout**
* All created pages and sections are automatically responsive
* Convert existing pages to be responsive for mobile and tablet views
* Example: "Update an existing page layout to make it responsive"

For specific examples of these use cases, see the [Sample Prompts](#sample-prompts) section.

## Installing the Agentic UI Generator

The Agentic UI Generator is available as an MCP (Model Context Protocol) server that integrates with AI-powered IDEs like GitHub Copilot, Cursor, and other MCP-compatible tools.

### Prerequisites

* A valid Telerik DevCraft Complete, or DevCraft Ultimate license.
* An AI-powered IDE that supports MCP servers (e.g., Visual Studio, Visual Studio Code).

### Configuration Steps

Sign in to your Telerik account to ensure proper user identification.

#### Visual Studio

To enable the Agentic UI Generator in a specific Blazor app, add a `.mcp.json` file to the solution folder and paste the [Preview JSON MCP Configuration](https://uiagent.mcp.telerik.com/preview) in the file. 

>caption .mcp.json

````JSON.skip-repl
{
  "servers": {
    "telerik-ui-generator": {
      "type": "http",
      "url": "https://uiagent.mcp.telerik.com/mcp/blazor",
      "headers": {
        "x-preview-access": "userid-..."
      }
    }
  }
}
````

To enable global automatic discovery of the Agentic UI Generator in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

#### Visual Studio Code

1. Go to the [Agentic UI Generator Preview Configuration](https://uiagent.mcp.telerik.com/preview).
2. Click the `Add to VS Code` button. This will open a tab named `MCP Server: telerik-ui-generator` in your VS Code instance.
3. In the new VS Code tab, click the `Install` button.

After adding the configuration, restart your IDE to load the MCP server.

## Using the Agentic UI Generator

The Agentic UI Generator can be used in two primary modes: basic usage through the main tool, or advanced usage by calling specific MCP tools directly.

### Basic Use

To use the Agentic UI Generator, you can call it in two ways:

**Method 1: Using the Tool Handle**
Prefix your prompt with `#telerik_ui_generator` followed by your request:

````TEXT.skip-repl
#telerik_ui_generator Create a dashboard page with a grid showing sales data and a chart visualizing monthly trends
````

**Method 2: Using Natural Language**
Simply describe what you want to create using natural language. The AI assistant will automatically recognize when to use the Agentic UI Generator:

````TEXT.skip-repl
Create a product management page with a grid for displaying products, a form for adding new items, and filtering options
````

The generator will analyze your prompt and create the appropriate Blazor components, markup, and styling.

### Advanced Use

For more granular control, you can call individual tools that make up the Agentic UI Generator:

| Tool Handle | Description |
|------------|-------------|
| `telerik_ui_generator` | Main generator for building full UI flows. Coordinates all other tools to deliver complete solutions. |
| `telerik_style_search` | Retrieves design system utilities including spacing, typography, and colors for consistent layouts. |
| `telerik_component_search` | Retrieves documentation and answers about Telerik/Kendo components, providing implementation guidance. |
| `telerik_style_customization` | Generates CSS variables for themes and customization, enabling brand-specific styling. |
| `telerik_icon_search` | Retrieves icons from the Telerik Design System for consistent iconography across your application. |

You can call these tools directly when you need specific functionality, allowing for more precise control over the generation process.

## Sample Prompts

Here are some example prompts that demonstrate the generator's capabilities:

**Dashboard Creation:**
````TEXT.skip-repl
Create a new page using the existing top navigation and footer. In the middle, add 3 rows with 3 responsive columns each. The top row shows charts, the second data grids, and the bottom contains column summaries
````

**Interactive Data Page:**
````TEXT.skip-repl
Insert a new section with a Data Grid on the left to filter, sort, and edit product data. On the right, add a Chart and Date Range Picker to visualize product sales over time. Both components should be data-bound to the same source and reactively update based on the selected date range
````

**Theme Customization:**
````TEXT.skip-repl
Add a dark mode theme to the application with rounded corners and larger spacing between components
````

**Responsive Page:**
````TEXT.skip-repl
Create a product catalog page with a responsive grid layout, filtering options, and detail view modals that work seamlessly on mobile, tablet, and desktop
````

**Landing Page:**
````TEXT.skip-repl
Build a landing page similar to the automotive industry template with a hero section, feature highlights, statistics, and a call-to-action section
````

## Recommendations

To get the best results from the Agentic UI Generator:

**Provide Clear Context:**
* Be specific about your requirements and desired layout structure.
* Mention any existing components or styles you want to match.
* Specify responsiveness requirements for different screen sizes.
* Reference existing design patterns when applicable (e.g., "similar to the automotive industry template").

**Optimize Your Environment:**
* Don't configure too many MCP tools or extensions simultaneously, as this may affect performance.
* In case of issues when both the Telerik AI Coding Assistant and the Agentic UI Generator are enabled, disable one of the tools.
* Ensure you have a stable internet connection for AI processing.
* Keep your Blazor project structure organized and follow naming conventions.

**Best Practices:**
* Start with simpler prompts and gradually add complexity.
* Review and test generated code before integrating into production.
* Customize the generated code to match your specific business logic and branding.
* Use the advanced tool handles when you need precise control over specific aspects.
* Leverage existing Telerik Design System patterns for consistency.

## See Also

* [Telerik MCP Server Documentation](slug:ai-mcp-server)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
