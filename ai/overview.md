---
title: Overview
page_title: Telerik Blazor MCP Server Overview
description: Learn about the Telerik Blazor MCP Server, its modes of operation, and how it enhances AI-powered development with Telerik UI for Blazor components.
slug: ai-overview
tags: ai, mcp, assistant, agentic, generator
published: True
tag: updated
previous_url: /ai/agentic-ui-generator/overview, /ai/ai-coding-assistant/overview
position: 1
---

# Telerik UI for Blazor AI Tools Overview

The Telerik UI for Blazor AI Tools are delivered through a single [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/docs/getting-started/intro) that connects your AI client to UI-generation capabilities and knowledge specific to Telerik UI for Blazor.

From idea to implementation, you can use the MCP server to generate complete pages, configure components correctly, align with the Progress Design System, and reduce repetitive setup work.

## What Are the Telerik UI for Blazor AI Tools

The Telerik Blazor MCP Server is a local MCP server that is distributed through the [Telerik.Blazor.MCP](https://www.nuget.org/packages/Telerik.Blazor.MCP) NuGet package.

The Telerik Blazor MCP server uses an orchestration-first model, centered on the Agentic UI Generator tool. It contains a core set of specialized assistants. Click the cards below for more details on each assistant:

<Row>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#how-the-agentic-flow-works">
            <ComponentTitle>UI Generator (Orchestrator)</ComponentTitle>
        </Component>
     </Column>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#component-assistant">
            <ComponentTitle>Component Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#icon-assistant">
            <ComponentTitle>Icon Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,6]}>
        <Component className="tile card-icon" href="#layout-assistant">
        <ComponentTitle>Layout Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,6]}>
        <Component className="tile card-icon" href="#styling-assistant">
        <ComponentTitle>Styling Assistant</ComponentTitle>
    </Column>
    <Column count={[24,12,6]}>
      <Component className="tile card-icon" href="#accessibility-assistant">
        <ComponentTitle>Accessibility Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,6]}>
      <Component className="tile card-icon" href="#validator-assistant">
        <ComponentTitle>Validator Assistant</ComponentTitle>
        </Component>
    </Column>
</Row>

The Agentic UI Generator orchestrates all assistants so you can build pages and components, apply styling and theming, and stay aligned with the design system in one seamless process. You can use the full end-to-end flow when you need complete page generation, or call a specific assistant directly when you need a focused change.

![MCP Server Assistants Diagram](images/ai-assistants.png)

## How the Agentic Flow Works

The Agentic UI Generator takes one prompt and manages the flow for you. It decides which assistants to use and combines their output into a single result. Use it when you want to generate a full page quickly, or call a specific assistant when you need a focused update to the layout, components, styling, theme, or icons in your project.

![Full Pages](images/ui-templates.png)

### Layout Assistant

Use the Layout Assistant to set up or refine the page structure. It helps with section order, spacing, and responsive behavior so the UI stays clear across desktop, tablet, and mobile.

Typical tasks include adding a new dashboard section, cleaning up visual hierarchy, and converting desktop-first screens into responsive layouts.

![Layout Assistant](images/layout-assistant.png)

### Component Assistant

Use the Component Assistant when you need help configuring Telerik UI for Blazor components. It helps you pick the right component and wire it correctly with real API patterns.

Common tasks include enabling Grid features (sorting, paging, filtering, grouping), building validated forms, setting up virtual scrolling or export, and using sample data for safe prototyping.

![Component Assistant](images/component-assistant.png)

### Styling Assistant

Use the Styling Assistant when you want consistent visuals across the app. It helps define reusable tokens and CSS variables for scalable theming.

Typical tasks include applying brand colors, adding dark mode or high-contrast variants, and keeping styling behavior consistent as new pages are added.

![Styling Assistant](images/style-assistant.png)

### Icon Assistant

Use the Icon Assistant to choose icons that match user actions and UI context. This assistant helps you achieve visually consistent navigation, status indicators, and action buttons.

It is useful for toolbars, navigation menus, cards, and any new section where icon consistency matters.

![Icon Assistant](images/icon-assistant.png)

### Accessibility Assistant

Use the Accessibility Assistant to apply WCAG 2.2 Level AA guidance during implementation, not after it. It helps with ARIA usage, keyboard navigation, and semantic markup.
It is especially useful for interactive templates, complex component flows, and final semantic checks before release.

![Accessibility Assistant](images/accessibility-assistant.png)

### Validator Assistant

Not designed to be invoked manually. It is called automatically by the UI Generator Orchestrator and ensures the generated code follows Telerik UI for Blazor best practices and standards.

### When to Use Orchestrated vs Targeted Mode

Use `#telerik_ui_generator` for a complete orchestration-first workflow from a single prompt. When you need finer control or want to adjust just one aspect (such as layout, theme, or a component), you can call a specialized assistant directly by its dedicated handle. For details, see [Target the Assistants (Advanced)](slug:agentic-ui-generator-getting-started#target-the-assistants-advanced).

## Start Building in Minutes

To get started with the Telerik Blazor MCP server, complete the following steps:

1. [Configure the MCP server](slug:ai-installation#mcp-server-configuration)
1. _(Optional)_ [Set up your Telerik license key](slug:ai-installation#license-key-setup) if not already configured globally
1. Start prompting in your IDE's chat interface:
    - `#telerik_ui_generator` for full, orchestrated UI generation
    - `#telerik_component_assistant`, `#telerik_layout_assistant`, `#telerik_style_assistant`, `#telerik_icon_assistant`, or `#telerik_accessibility_assistant` for targeted workflows

For detailed setup instructions, see the [Installation](slug:ai-installation) article. For guided usage, continue with [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started).

### Example Prompts and Expected Results

The following examples show how natural-language prompts can map to practical, editable output in your project.

```prompt Sales Dashboard
#telerik_ui_generator Build a sales operations dashboard with a pageable and sortable Grid, a monthly revenue Chart, and a KPI summary row.`
```
```Razor
```

**Expected result:** A page scaffold with responsive sections, configured Telerik UI for Blazor Grid and Chart, both wired to sample data, and KPI cards arranged for desktop and mobile.

```prompt Dark Theme
#telerik_ui_generator Apply a dark theme and define reusable CSS variables for brand, surface, and semantic colors.`
```
```Razor
```

**Expected result:** A token-driven theme setup with color variables and a dark-mode-ready styling baseline that you can refine for your brand.

## License Requirements

The Telerik UI for Blazor MCP server and its tools are offered as a single experience through the **Agentic UI Generator** (`#telerik_ui_generator`) in [all active Telerik subscription licenses](https://www.telerik.com/purchase.aspx?filter=web).

<table>
<colgroup>
<col style="width: 40%">
<col style="width: 30%">
</colgroup>
<thead>
<tr>
<th>License Type</th>
<th>Agentic UI Generator</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Subscription License</strong>
</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr><tr>
<td><strong>Trial License</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Perpetual License</strong></td>
<td>No*</td>
</tr>

</tbody>
</table>

<p style="font-size: 18px; font-style: italic; color: #666; margin-top: 12px; line-height: 1.5;">
<em>
*  All AI tools are available with a <a href="https://www.telerik.com/mcp-servers-blazor/thank-you">30-day AI Tools trial</a> or <a href="https://www.telerik.com/try/ui-for-blazor">a Telerik UI for Blazor trial</a>.
</em> <br/>

</p>

@[template](/_contentTemplates/common/general-info.md#license-names)

## Next Steps

* [Installing the Telerik MCP server](slug:ai-installation)
* [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started)
* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)

## See Also

* [MCP Clients](https://modelcontextprotocol.io/clients)
* [Changelog](slug:ai-changelog)


<style>
div .card-icon {
    padding: 10px 0;
}

.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
le>
# Telerik Blazor MCP Server Overview

The Telerik Blazor MCP Server enables you to achieve interaction with AI and reach new levels of developer productivity. The MCP server provides proprietary context to AI-powered IDEs, apps, and tools. You can use the Telerik Blazor MCP server to ask about [Telerik UI for Blazor](https://www.telerik.com/blazor-ui) components, features, or general usage. T successfully prompt more complex questions  tasks, and You can also generate tailored code that includes Telerik UI for Blazor components and API.

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

## AI Tools Overview and Comparison

* Agentic UI Generator&mdash;This tool provides advanced capabilities for building complete user interfaces with responsive layouts and custom theming.
* AI Coding Assistant&mdash;A tool designed for streamlined component integration and configuration tasks.

<table>
<colgroup>
<col width="20%" />
<col width="30%" />
<col width="35%" />
</colgroup>
<thead>
<tr>
<th></th>
<th>Agentic UI Generator</th>
<th>AI Coding Assistant</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Orchestrator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<tr>
<td><strong>Component Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Icon Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Layout Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
</tr>
<tr>
<td><strong>Styling Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
</tr>
<tr>
<td><strong>Accessibility Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
</tr>
<tr>
<td><strong>Validator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Scope</strong></td>
<td>Complete pages, dashboards with layout, styling, components, and responsivenes.</td>
<td>Individual components with proper data binding and configuration.</td>
</tr>
</tbody>
</table>



## License Requirements

Access to the Telerik AI Tools depends on your [Telerik license type](https://www.telerik.com/purchase.aspx?filter=web). The table below summarizes which level of functionality you can access with each license type:

<table>
<thead>
<tr>
<th width="25%"></th>
<th width="15%">DevCraft Complete or Ultimate Subscription</th>
<th width="15%">Other Subscriptions</th>
<th width="15%">Perpetual License</th>
<th width="15%">Trial License**</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>UI Generator Orchestrator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Coding Assistant Orchestrator Tool</strong></td>
<td>No*</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td>No*</td>
</tr>
<tr>
<td><strong>Component Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Icon Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Layout Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Styling Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
</tr>
<tr>
<td><strong>Accessibility Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Validator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
<td><strong>Validator Tool</strong></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
<td>No</td>
<td><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" stroke="white" stroke-width="2"/></svg></td>
</tr>
<tr>
</tbody>
</table>

*The Coding Assistant Orchestrator Tool is available only when you have a subscription license that enables the limited set of tools (Component and Icon Tool). When you have access to the full set of tools (DevCraft Complete/Ultimate subscription or Trial), the UI Generator Orchestrator Tool is in charge of coordinating all tools.

**Tools available with a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you) or [a Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).

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
