---
title: Prompt Library
page_title: Agentic UI Generator Prompt Library
description: Explore example prompts that demonstrate the capabilities of the Telerik UI for Blazor Agentic UI Generator for building modern web applications.
slug: agentic-ui-generator-prompt-library
position: 20
tags: telerik,blazor,ai,agentic,ui,generator,prompts
published: True
---

# Agentic UI Generator Prompt Library

This article provides example prompts that demonstrate the capabilities of the Telerik UI for Blazor Agentic UI Generator. Use these as inspiration for building modern web applications with speed and precision.

## How to Use the Prompts

All prompts in this library target the Agentic UI Generator. The `#telerik_ui_generator` handle explicitly calls the generator, but you can also use natural language descriptions and let your AI assistant automatically recognize when to use the UI Generator or one of the other specialized tools.

1. Browse the prompt library to find a prompt that suits your needs.
2. Copy the prompt text (including the `#telerik_ui_generator` handle if present).
3. (optional) Customize the prompt as needed for your specific use case. Make sure the changes comply with the [intended use](slug:agentic-ui-generator-overview#intended-use) and the [recommendations](slug:agentic-ui-generator-overview#recommendations) for the Agentic UI Generator.
4. Run the prompt against your AI-powered IDE.

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

## Sample Prompts

Here are some example prompts that demonstrate the capabilities of the Agentic UI Generator tools.

### UI Generator Prompts

The UI generator is the main tool for building full UI flows, which coordinates all other tools to deliver complete solutions.

````TEXT.skip-repl
Create a new page using the existing top navigation and footer. In the middle, add 3 rows with 3 responsive columns each. The top row shows system health KPIs for CPU, memory, and error counts. The middle rows include a Log Stream panel, a Line Chart of API response times, and a Bar Chart of requests per service. The bottom row contains a Deployment History table, an Alerts panel, and a list of open tickets.
````

````TEXT.skip-repl
Build a landing page similar to the automotive industry template with a hero section, feature highlights, statistics, and a call-to-action section.
````

### Layout Assistant Prompts

The Layout Assistant tool applies suitable CSS utility classes from the Progress Design System for styling and positioning elements. You can use it, when you need help with spacing, typography, colors, layout structure, or transforms.

````TEXT.skip-repl
Update the existing page layout by adding a new section in the middle of the page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message. Make the page responsive with proper spacing and typography.
````

### Component Assistant Prompts

The Component Assistant tool answers questions and generates code related to Telerik UI for Blazor components. Use this tool when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc.

````TEXT.skip-repl
Create a Grid component with paging, sorting, and filtering. Include column configuration for a product catalog with name, price, category, and actions. Ensure the Grid is properly integrated into a card layout with responsive design and consistent spacing.
````

### Style Assistant Prompts

The Style Assistant tool generates custom styles and theme configurations for your application. Use this tool when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI.

````TEXT.skip-repl
Generate a custom theme for a corporate blue and green color scheme with high contrast accessibility requirements.
````

````TEXT.skip-repl
Create a comprehensive dark mode theme with a dark background, light text, subtle border radius on cards and buttons, and increased spacing between the UI components.
````

### Icon Assistant Prompts

The Icon Assistant tool searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this tool when you need to find and add specific icons for your UI components or design elements.

````TEXT.skip-repl
Add icons suitable for the Home, Settings, and User Profile buttons in my navigation bar.
````

````TEXT.skip-repl
Find appropriate icons for data visualization actions like export, print, refresh, and search in a dashboard toolbar.
````

## See Also

* [Agentic UI Generator Overview](slug:agentic-ui-generator-overview)
* [Getting Started with the Agentic UI Generator](slug:agentic-ui-generator-getting-started)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
