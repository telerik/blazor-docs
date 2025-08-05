---
title: AI Tools Configuration
page_title: AI Tools Configuration in Visual Studio
description: Learn how to configure Telerik AI-powered tools like the MCP server and GitHub Copilot extension for Telerik UI for Blazor development in Visual Studio.
slug: getting-started-vs-integration-ai-configuration
position: 8
---

# AI Tools Configuration in Visual Studio

The Telerik UI for Blazor Extension for Visual Studio @[template](/_contentTemplates/common/ai-coding-assistant.md#vs-intro)

## Prerequisites

To set up the Telerik UI for Blazor AI tools automatically:

* [Install the Telerik UI for Blazor extension for Visual Studio](slug:getting-started-vs-integration-overview).
@[template](/_contentTemplates/common/ai-coding-assistant.md#prerequisites)

To access the automated commands, open **Extensions** > **Telerik** > **Telerik UI for Blazor** in the Visual Studio menu.

## Configure Telerik MCP Server

The Telerik UI for Blazor extension provides two menu options to [set up the Telerik Blazor MCP server](slug:ai-mcp-server#visual-studio):

* **Configure MCP Server for Solution**&mdash;this command creates an `.mcp.json` file in the solution folder. The configuration applies only to the projects in that application.
* **Configure MCP Server Globally**&mdash;this command creates an `.mcp.json` file in your operating system user folder (`%USERPROFILE%`, for example, `C:\Users\___\.mcp.json`). This configuration applies to all Visual Studio solutions and projects.

> Make sure to open the generated `.mcp.json` @[template](/_contentTemplates/common/ai-coding-assistant.md#verify-license-key)

Finally, check for any [usage notes about the Telerik Blazor MCP Server](slug:ai-mcp-server#visual-studio).

## Add/Update Copilot Instructions

The **Add/Update Copilot Instructions** @[template](/_contentTemplates/common/ai-coding-assistant.md#copilot-instructions)

## Install Telerik Blazor Copilot Extension

The **Install Telerik Blazor Copilot Extension** @[template](/_contentTemplates/common/ai-coding-assistant.md#command-github-app)

## See Also

@[template](/_contentTemplates/common/ai-coding-assistant.md#see-also)
* [Visual Studio Integration Overview](slug:getting-started-vs-integration-overview)
