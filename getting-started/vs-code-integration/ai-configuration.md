---
title: AI Tools Configuration
page_title: AI Tools Configuration in VS Code
description: Learn how to configure Telerik AI-powered tools like the MCP server and GitHub Copilot extension for Telerik UI for Blazor development in Visual Studio Code (VS Code).
slug: getting-started-vs-code-integration-ai-configuration
position: 4
---

# AI Tools Configuration in VS Code

The Telerik UI for Blazor Extension for VS Code @[template](/_contentTemplates/common/ai-coding-assistant.md#vs-intro)

## Prerequisites

To set up the Telerik UI for Blazor AI tools automatically:

* [Install the Telerik UI for Blazor extension for VS Code](slug:getting-started-vs-code-integration-overview).
@[template](/_contentTemplates/common/ai-coding-assistant.md#prerequisites)

To access the automated commands:

1. Open the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) at the center top of the VS Code interface.
1. Select **Show and Run Commands**.
1. Search for the following Telerik commands:
    * [Configure MCP Server](#configure-mcp-server)
    * [Install Telerik Blazor Copilot Extension](#install-telerik-blazor-copilot-extension)
    * [Add GitHub Copilot Custom Instructions](#add-github-copilot-custom-instructions)

## Configure MCP Server

The **Telerik UI for Blazor: Configure MCP Server** command provides two configuration scopes to set up the [Telerik Blazor MCP Server](slug:ai-mcp-server#vs-code):

* **Workspace**&mdash;Creates an `mcp.json` file in a `.vscode` folder in your current workspace. This configuration applies only to the current workspace.
* **Global**&mdash;Creates an `mcp.json` file in your operating system user folder (for example, `C:\Users\___\AppData\Roaming\Code\User\.mcp.json` on Windows or `/Users/___/Library/Application Support/Code/User/mcp.json` on macOS). This configuration applies to all VS Code workspaces.

> Make sure to open the generated `mcp.json` @[template](/_contentTemplates/common/ai-coding-assistant.md#verify-license-key)

Finally, check for any [usage notes about the Telerik Blazor MCP Server](slug:ai-mcp-server#vs-code).

## Add GitHub Copilot Custom Instructions

The **Telerik UI for Blazor: Add GitHub Copilot Custom Instructions** @[template](/_contentTemplates/common/ai-coding-assistant.md#copilot-instructions)

## Install Telerik Blazor Copilot Extension

The **Telerik UI for Blazor: Install Telerik Blazor Copilot Extension** @[template](/_contentTemplates/common/ai-coding-assistant.md#command-github-app)

## See Also

@[template](/_contentTemplates/common/ai-coding-assistant.md#see-also)
* [VS Code Integration Overview](slug:getting-started-vs-code-integration-overview)
