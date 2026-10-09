---
title: Agentic UI Generator Overview
page_title: Telerik UI for Blazor Agentic UI Generator Overview
description: Learn how the Telerik UI for Blazor Agentic UI Generator uses specialized assistants to help build and update Blazor applications.
slug: agentic-ui-generator-overview
tags: ai, mcp, assistant, agentic, generator
published: True
previous_url: /ai/ai-coding-assistant/overview
position: 1
tag: updated
---

# Agentic UI Generator Overview

The Agentic UI Generator provides AI assistance for building and updating Telerik UI for Blazor applications. It uses the Telerik Blazor [Model Context Protocol (MCP) server](https://modelcontextprotocol.io/docs/getting-started/intro) to connect your AI client to UI-generation capabilities and knowledge specific to Telerik UI for Blazor.

Use the Agentic UI Generator to generate complete pages, configure components, align with the Progress Design System, and reduce repetitive setup work. For AI interaction with components in a running browser application, use [WebMCP](slug:web-mcp-overview). See the [AI Tools Overview](slug:ai-overview) to compare the development-time and runtime browser AI tools.

Set up the Agentic UI Generator with the Telerik CLI, the AI plugin, or a manual MCP server configuration. The [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started#quick-start) article explains each option. The AI plugin provides the same capabilities as skills and starts the MCP server automatically. Do not configure the plugin and the Telerik MCP server separately in the same AI client.

## What the Agentic UI Generator Does

The Telerik Blazor MCP Server is a local MCP server that is distributed through the [Telerik.Blazor.MCP](https://www.nuget.org/packages/Telerik.Blazor.MCP) NuGet package.

The Agentic UI Generator can use specialized assistants for different development tasks. Use the full generator for a complete page or select a specialized assistant when you need focused help. The following cards describe the available assistants:

<Row>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#use-the-right-assistant-for-your-task">
            <ComponentTitle>UI Generator (Orchestrator)</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#getting-started-assistant">
            <ComponentTitle>Getting Started Assistant</ComponentTitle>
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
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#layout-assistant">
        <ComponentTitle>Layout Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
      <Component className="tile card-icon" href="#localization-assistant">
        <ComponentTitle>Localization Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
        <Component className="tile card-icon" href="#styling-assistant">
        <ComponentTitle>Styling Assistant</ComponentTitle>
    </Column>
    <Column count={[24,12,8]}>
      <Component className="tile card-icon" href="#accessibility-assistant">
        <ComponentTitle>Accessibility Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
      <Component className="tile card-icon" href="#validator-assistant">
        <ComponentTitle>Validator Assistant</ComponentTitle>
        </Component>
    </Column>
    <Column count={[24,12,8]}>
      <Component className="tile card-icon" href="#upgrade-assistant">
        <ComponentTitle>Upgrade Assistant</ComponentTitle>
        </Component>
    </Column>
</Row>

The Agentic UI Generator coordinates the assistants that are relevant to your request. It can build pages and components, apply styling and theming, and follow the design system in one request.

![MCP Server Assistants Diagram](../images/ai-assistants.png)

## Use the Right Assistant for Your Task

Use the Agentic UI Generator for a complete task, such as creating a dashboard or adding a page with several components. It interprets the request, selects relevant assistants, and combines their output into one response.

Use a specialized assistant when you need focused help with an area, such as:

* Component configuration
* Responsive layout
* Custom theme
* Icon selection
* Accessibility requirements
* Localization tasks
* License issue
* Upgrade

When you use the MCP server directly, start a complete request with `#telerik_ui_generator` or use natural-language. When you use the AI plugin, invoke the `telerik-blazor-ui-generator` skill explicitly. See [Prompt Library](slug:agentic-ui-generator-prompt-library) for examples of both approaches.

![Full Pages](../images/ui-templates.png)

### Getting Started Assistant

Use the Getting Started Assistant when you want a guided onboarding flow for first-time setup. Call it to scaffold a Blazor project, configure the Telerik MCP server, set up Telerik UI for Blazor in the project, and complete license activation with minimal manual steps.

It is useful when setting up a new environment, validating your initial MCP integration, or preparing a clean proof of concept quickly.

### Layout Assistant

Use the Layout Assistant to set up or refine the page structure. It helps with section order, spacing, and responsive behavior so the UI stays clear across desktop, tablet, and mobile.

Typical tasks include adding a new dashboard section, cleaning up visual hierarchy, and converting desktop-first screens into responsive layouts.

![Layout Assistant](../images/layout-assistant.png)

### Component Assistant

Use the Component Assistant when you need help configuring Telerik UI for Blazor components. It helps you pick the right component and wire it correctly with real API patterns.

Common tasks include enabling Grid features (sorting, paging, filtering, grouping), building validated forms, setting up virtual scrolling or export, and using sample data for safe prototyping.

![Component Assistant](../images/component-assistant.png)

### Styling Assistant

Use the Styling Assistant when you want consistent visuals across the app. It helps define reusable tokens and CSS variables for scalable theming.

Typical tasks include applying brand colors, adding dark mode or high-contrast variants, and keeping styling behavior consistent as new pages are added.

![Styling Assistant](../images/style-assistant.png)

### Icon Assistant

Use the Icon Assistant to choose icons that match user actions and UI context. This assistant helps you achieve visually consistent navigation, status indicators, and action buttons.

It is useful for toolbars, navigation menus, cards, and any new section where icon consistency matters.

![Icon Assistant](../images/icon-assistant.png)

### Localization Assistant

Use the Localization Assistant to translate UI strings or complete resource `.resx` files in your Blazor app. See the dedicated [Telerik UI for Blazor Localization Assistant page](slug:agentic-ui-generator-localization-assistant) for setup and usage instructions.

<!-- ![Localization Assistant](../images/localization-assistant.png) -->

### Accessibility Assistant

Use the Accessibility Assistant to apply WCAG 2.2 Level AA guidance during implementation, not after it. It helps with ARIA usage, keyboard navigation, semantic markup, and color contrast validation for text and UI controls.
It is especially useful for interactive templates, complex component flows, and final semantic checks before release.

![Accessibility Assistant](../images/accessibility-assistant.png)

### Validator Assistant

Not designed to be invoked manually. It is called automatically by the UI Generator Orchestrator and ensures the generated code follows Telerik UI for Blazor best practices and standards.

### Upgrade Assistant

Use the Upgrade Assistant to migrate existing Blazor applications to the latest version of Telerik UI for Blazor. It automates detection and resolution of [breaking API changes](slug:versions-with-breaking-changes), NuGet version bumps, and CDN reference updates.

For best results, use the Upgrade Assistant with the highest-tier model available in your AI client. More capable models reason more accurately over complex migration scenarios and produce more reliable file edits.

## Start Building in Minutes

Go from zero setup to your first generated UI quickly with the smart Getting Started assistant. Start with [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started) for a simple, guided flow through Telerik CLI installation, MCP setup, license activation, and your first prompt.

Explore the [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library) for ready-to-use prompts covering common UI scenarios.

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

## Privacy

The Telerik MCP server operates under the following conditions:

* The MCP server does not have access to your workspace and application code. Note that when using the Telerik MCP server (or any other MCP server), the LLM generates parameters for the MCP server request, which may include parts of your application code.
* The MCP server does not use your prompts to train Telerik AI models.
* The MCP server does not generate the actual responses and has no access to these responses. The MCP server only provides a better context that helps your selected model (for example, GPT, Gemini, Claude) produce better responses.
* The MCP server does not associate your prompts with your Telerik user account. Your prompts and generated context are anonymized and stored for statistical and troubleshooting purposes.

## Next Steps

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
