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
* Layout Assistant
* Component Assistant
* Style Assistant
* Icon Assistant

The tools are working together in an agentic flow to deliver complete, beautiful, on-brand and enterprise-ready UIs. The main generator coordinates these tools to handle component generation, styling, theming, and design system integration seamlessly.

## How It Works

The Blazor Agentic UI Generator uses an intelligent approach where specialized tools work together to handle different aspects of UI development. When you provide a prompt, the main generator analyzes your requirements and coordinates the appropriate tools to deliver the desired outcome. For more control over specific aspects of your UI, you can also call individual tools directly as described in the [Advanced Use](slug:agentic-ui-generator-getting-started#advanced-use) section.

## Intended Use

The Agentic UI Generator is designed to help with various development scenarios:

### Create Individual Components

Build specific Telerik components with specific configurations and features like filtering, validation, and data binding

````TEXT.skip-repl
#telerik_ui_generator Create a Select component with filtering and the option to add new items
````

### Create Full Responsive Pages

* Build complete dashboards, landing pages, and listing pages in existing applications
* Generate pages similar to the [Progress Design System page templates](https://www.telerik.com/design-system/docs/ui-templates/templates/automotive-industry/)

````TEXT.skip-repl
#telerik_ui_generator I have created an empty application that now needs a login screen and an admin dashboard. Create a new PoC
````

### Modify Existing Pages

* Enhance existing dashboards by adding new sections
* Insert new sections that match existing layout style and responsiveness

````TEXT.skip-repl
#telerik_ui_generator Insert a new section in the middle of an existing page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message
````

### Create and Modify Themes

* Generate new themes inside existing applications. Add dark mode or high-contrast themes

````TEXT.skip-repl
#telerik_ui_generator Generate a complete dark theme for my app based on a prompt so my UI looks on-brand in dark mode as well
````

### Implement Responsive Layout

* Create new responsive pages and sections
* Convert existing pages to be responsive for mobile and tablet views

````TEXT.skip-repl
#telerik_ui_generator Update the existing page layout to make it responsive
````

For specific examples of these use cases, see the [Prompt Library](slug:agentic-ui-generator-prompt-library).

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

* [Getting Started with the Agentic UI Generator](slug:agentic-ui-generator-getting-started)
* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
