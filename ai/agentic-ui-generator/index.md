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

The Agentic UI Generator is an intelligent, prompt-driven AI development assistant designed to accelerate the creation and styling of modern web applications. Built around Telerik and Kendo UI, the Agent enables developers to move from idea to quality UI with speed, precision, and confidence.

## What Is the Agentic UI Generator

At its core, the Agentic UI Generator integrates five specialized tools: 
* UI Generator
* Style Search
* Component Search
* Style Customization
* Icon Search

The tools are working together in an agentic flow to deliver complete, beautiful, on-brand and enterprise-ready UIs. The main generator coordinates these tools to handle component generation, styling, theming, and design system integration seamlessly.

## How It Works

The Blazor Agentic UI Generator uses an intelligent approach where specialized tools work together to handle different aspects of UI development. When you provide a prompt, the main generator analyzes your requirements and coordinates the appropriate tools to deliver the desired outcome. For more control over specific aspects of your UI, you can also call individual tools directly as described in the [Advanced Use](#advanced-use) section.

## Intended Use

The Agentic UI Generator is designed to help with various development scenarios:

### Create Individual Components

Build specific Telerik components with specific configurations and features like filtering, validation, and data binding

**Example:** "#telerik_ui_generator Create a Select component with filtering and the option to add new items"

### Create Full Responsive Pages

* Build complete dashboards, landing pages, and listing pages in existing applications
* Generate pages similar to the [Progress Design System page templates](https://www.telerik.com/design-system/docs/ui-templates/templates/automotive-industry/)

**Example:** "#telerik_ui_generator I have created an empty application that now needs a login screen and an admin dashboard. Create a new PoC"

### Modify Existing Pages

* Enhance existing dashboards by adding new sections
* Insert new sections that match existing layout style and responsiveness

**Example:** "#telerik_ui_generator Insert a new section in the middle of an existing page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message"

### Create and Modify Themes

* Generate new themes inside existing applications. Add dark mode or high-contrast themes

**Example:** "Generate a complete dark theme for my app based on a prompt so my UI looks on-brand in dark mode as well"

### Implement Responsive Layout

* Create new responsive pages and sections
* Convert existing pages to be responsive for mobile and tablet views

**Example:** "Update an existing page layout to make it responsive"

For specific examples of these use cases, see the [Sample Prompts](#sample-prompts) section.

## Installing the Agentic UI Generator

The Agentic UI Generator is available as an MCP (Model Context Protocol) server that integrates with AI-powered IDEs like Visual Studio Code, Cursor, and other MCP-compatible tools.

### Prerequisites

* An AI-powered IDE that supports MCP servers, for example, Visual Studio, Visual Studio Code, Cursor.

### Configuration Steps

This section contains information about how to set up the Agentic UI Generator in Visual Studio and Visual Studio Code.   

#### Visual Studio

To enable the Agentic UI Generator in a specific Blazor app, add a `.mcp.json` file to the solution folder and paste the configuration from the [Agentic UI Generator | MCP Configuration page](https://uiagent.mcp.telerik.com/preview). 

To enable global automatic discovery of the Agentic UI Generator in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

#### Visual Studio Code

1. Go to the [Agentic UI Generator Preview Configuration](https://uiagent.mcp.telerik.com/preview). 
2. Log in with a valid Telerik account. 
3. Click the **Add to VS Code** button. This will open a tab named **MCP Server: telerik-ui-generator** in your VS Code instance.
4. In the new VS Code tab, click **Install**.

After adding the configuration, restart your IDE to load the MCP server.

## Call the Generator

The Agentic UI Generator can be used in two primary modes: basic usage through the main tool, or advanced usage by calling specific MCP tools directly.

### Basic Use

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

### Target the Tools (Advanced)

For more granular control, you can call individual tools that make up the Agentic UI Generator:

| Tool Handle | Description |
|------------|-------------|
| `telerik_ui_generator` | Main generator for building full UI flows. Coordinates all other tools to deliver complete solutions. |
| `telerik_layout_assistant` | Applies suitable CSS utility classes from the Progress Design System for styling and positioning elements. Use this tool when you need help with spacing, typography, colors, layout structure, or transforms. |
| `telerik_component_assistant` | Answers questions and generates code related to Teelrik UI for Blazor components. Use this tool when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc. |
| `telerik_style_assistant` | Generates custom styles and theme configurations for your application. Use this tool when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI. |
| `telerik_icon_assistant` | Searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this tool when you need to find and add specific icons for your UI components or design elements. |

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

### Provide Clear Context

* Be specific about your requirements and desired layout structure.
* Mention any existing components or styles you want to match.
* Attach the files you want to modify as context to your prompt so the tool can understand your existing code structure.
* Specify responsiveness requirements for different screen sizes.
* Reference existing design patterns when applicable (e.g., "similar to the automotive industry template").

### Best Practices

* Don't configure too many MCP tools or extensions simultaneously, as this may affect performance. In case of issues when both the Telerik AI Coding Assistant and the Agentic UI Generator are enabled, disable one of the tools.
* Ensure you have a stable internet connection for AI processing.
* Keep your Blazor project structure organized and follow naming conventions.
* Start with simpler prompts and gradually add complexity.
* Customize the generated code to match your specific business logic and branding.
* Use the advanced tool handles when you need precise control over specific aspects.
* Leverage existing [Telerik Design System](https://www.telerik.com/design-system/docs/) patterns for consistency.

## See Also

* [Telerik MCP Server Documentation](slug:ai-mcp-server)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
