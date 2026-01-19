---
title: Prompt Library
page_title: Agentic UI Generator Prompt Library
description: Explore example prompts that demonstrate the capabilities of the Telerik UI for Blazor Agentic UI Generator for building modern web applications.
slug: agentic-ui-generator-prompt-library
position: 20
tags: telerik,blazor,ai,agentic,ui,generator,prompts
published: True
tag: updated
---

# Agentic UI Generator Prompt Library

This article provides example prompts that demonstrate the capabilities of the Telerik UI for Blazor Agentic UI Generator. Use these as inspiration for building modern web applications with speed and precision.

>tip [Go straight to the prompts ⬇️](#general-prompts)

## How to Use the Prompts

All prompts in this library target the Agentic UI Generator. The `#telerik_ui_generator` handle explicitly calls the generator, but you can also use natural language descriptions and let your AI assistant automatically recognize when to use the UI Generator or one of the other specialized tools.

1. Browse the [prompt library](#general-prompts) to find a prompt that suits your needs.
2. Copy the prompt text (including the `#telerik_ui_generator` handle if present).
3. (optional) Customize the prompt as needed for your specific use case. Make sure the changes comply with the [intended use](slug:agentic-ui-generator-getting-started#using-the-agentic-ui-generator)  for the Agentic UI Generator.
4. Run the prompt against your AI-powered IDE.

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

## General Prompts

This section provides examples of common UI creation tasks that demonstrate the capabilities of the Agentic UI Generator. The UI generator is the main tool for building full UI flows, which coordinates all other tools to deliver complete solutions.

```prompt Project Setup
I have created an empty application that now needs a login screen and an admin dashboard. Add a login form with email/password fields and validation using Telerik UI for Blazor components. After a successful login, redirect to an admin dashboard page featuring a sidebar menu and a main content area displaying key metrics and recent activity.
```
```Razor
```

```prompt System Dashboard Section
Create a new page using the existing top navigation and footer. In the middle, add 3 rows with 3 responsive columns each. The top row shows system health KPIs for CPU, memory, and error counts. The middle rows include a Log Stream panel, a Telerik LineChart of API response times, and a BarChart of requests per service. The bottom row contains a Deployment History table, an Alerts panel, and a list of open tickets.
```
```Razor
```

```prompt Appointments Dashboard
Create a responsive appointments dashboard in the Schedule.razor page using a 3x2 grid layout. The top row contains a Telerik dropdown to filter appointments by doctor and a list of today's upcoming appointments. The middle row displays a month-view scheduler showing the filtered appointments. The bottom row shows a bar chart visualizing doctor occupancy rates and a pie chart showing appointment status distribution (completed, pending, canceled).
```
```Razor
```

```prompt Responsive Page
Create a product catalog page with a responsive CSS grid layout displaying product cards. Add a Telerik toolbar with filtering options, and expandable detail view for each product that work seamlessly on mobile, tablet, and desktop.
```
```Razor
```

```prompt Landing Page
Build a landing page similar to the "Automotive Industry" Telerik page ui template with a hero section, feature highlights, statistics, and a call-to-action section.
```
```Razor
```

## Tool-Specific Prompts

This section provides prompt examples for directly calling individual specialized tools for more granular control.

### Layout Assistant Prompts

The Layout Assistant tool applies suitable CSS utility classes from the [Progress Design System](https://www.telerik.com/design-system/docs/) for styling and positioning elements. You can use it, when you need help with spacing, typography, colors, layout structure, or transforms.

```prompt Responsive Layout
#telerik_layout_assistant Update the existing page layout by adding a new section in the middle of the page. In that added section, a Dashboard Card displays summary KPIs (revenue, active users, growth rate), next to a Compact Card showing a recent alert or message. Make the page responsive with proper spacing and typography.
```
```Razor
```

### Component Assistant Prompts

The Component Assistant tool answers questions and generates code related to Telerik UI for Blazor components. Use this tool when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc.

```prompt Interactive Data Page
#telerik_component_assistant Create a Grid component with paging, sorting, and filtering. Include column configuration for a product catalog with name, price, category, and actions. Ensure the Grid is properly integrated into a card layout with responsive design and consistent spacing.
```
```Razor
```

```prompt Multi-Component Data View
#telerik_component_assistant Insert a new section with a Grid on the left to filter and sort product data. On the right, add a Chart and DateRangePicker to visualize product sales over time. Both components should be data-bound to the same source.
```
```Razor
```

### Style Assistant Prompts

The Style Assistant tool generates custom styles and theme configurations for your application. Use this tool when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Accessible Color Theme
#telerik_style_assistant Generate a custom theme for a corporate blue and green color scheme with high contrast accessibility requirements.
```
```Razor
```

```prompt Dark Mode Theme
#telerik_style_assistant Create a comprehensive dark mode theme with a dark background, light text, subtle border radius on cards and buttons, and increased spacing between the UI components.
```
```Razor
```

</div>

### Icon Assistant Prompts

The Icon Assistant tool searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this tool when you need to find and add specific icons for your UI components or design elements.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Navigation Icons
#telerik_icon_assistant Add icons suitable for the Home, Settings, and User Profile buttons in my navigation bar.
```
```Razor
```

```prompt Toolbar Action Icons
#telerik_icon_assistant Find appropriate icons for data visualization actions like export, print, refresh, and search in a dashboard toolbar.
```
```Razor
```

</div>

## See Also

* [Telerik MCP Server Overview](slug:ai-overview)
* [Getting Started with the Agentic UI Generator](slug:agentic-ui-generator-getting-started)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
