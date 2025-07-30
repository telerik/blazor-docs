---
title: AI Configuration
page_title: Visual Studio AI Configuration
description: Learn how to configure AI-powered tools like MCP servers and GitHub Copilot for Telerik UI for Blazor development in Visual Studio.
slug: getting-started-vs-integration-ai-configuration
position: 8
---

# AI Configuration in Visual Studio

The Telerik UI for Blazor Extension for Visual Studio provides automated configuration commands for AI-powered development tools. These commands help you quickly set up [MCP servers](slug:ai-mcp-server) and [GitHub Copilot](slug:ai-copilot-extension) for enhanced developer productivity with Telerik UI for Blazor components.

## Available Commands

To access these commands, go to **Extensions** > **Telerik** > **Telerik UI for Blazor** in the Visual Studio menu.

### Configure MCP Server

The Telerik UI for Blazor extension provides two MCP server configuration options:

#### Configure MCP Server for Solution

The **Configure MCP Server for Solution** command generates a `.mcp.json` file in the solution folder. This configuration applies only to the current solution and any projects within it.

#### Configure MCP Server Globally

The **Configure MCP Server Globally** command generates a `.mcp.json` file under the user profile directory (`%USERPROFILE%`, for example, `C:\Users\<yourusername>`). This configuration applies to all Visual Studio solutions and projects.

Both commands create a properly configured `.mcp.json` file for the [Telerik Blazor MCP Server](slug:ai-mcp-server) with placeholder values for your Telerik license.

>caption Generated .mcp.json

```json
{
  "servers": {
    "telerikBlazorAssistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp@latest"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
```

> Make sure to update the `TELERIK_LICENSE_PATH` value with your actual [Telerik license file location](slug:installation-license-key), or replace it with a `TELERIK_LICENSE` key containing your license key directly.

### Add/Update Copilot Instructions

The **Add/Update Copilot Instructions** command generates a `copilot-instructions.md` file in the `.github` folder under the solution. This file contains custom instructions that help GitHub Copilot provide better assistance when working with Telerik UI for Blazor components.

The generated file includes:
* Best practices for Razor component development
* Telerik UI for Blazor specific coding guidelines
* Component naming conventions
* Recommended code structure patterns

### Install Telerik Blazor Copilot Extension

The **Install Telerik Blazor Copilot Extension** command opens the GitHub App installation page in your default browser:

`https://github.com/apps/telerikblazor/installations/select_target`

This allows you to quickly install the [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension) for your GitHub account or organization.

## Prerequisites

Before using these AI configuration commands, ensure you have:

* A [Telerik user account](https://www.telerik.com/account/)
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or [trial](https://www.telerik.com/blazor-ui)
* [Node.js](https://nodejs.org/en) 18 or newer (for MCP server functionality)
* Visual Studio 2022 or 2019 with the latest Telerik UI for Blazor extension

## Important Notes for Visual Studio

* Early Visual Studio 17.14 versions require the Copilot Chat window to be open and active when you open a solution for the MCP server to work properly.
* After configuring the MCP server, make sure that the `telerikBlazorAssistant` tool is [enabled (checked) in the Copilot Chat window's tool selection dropdown](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022#configuration-example-with-github-mcp-server).
* The Telerik MCP server may get disabled and you may see "🔧10/11" in the selected tools dropdown when starting a new chat, changing threads, or relaunching Visual Studio. This is a known issue that is being investigated.

## Next Steps

After configuring the AI tools:

1. **For MCP Server**: Follow the [complete MCP server setup guide](slug:ai-mcp-server) to understand usage and troubleshooting.
2. **For GitHub Copilot**: Learn how to use the [Telerik Blazor Copilot Extension](slug:ai-copilot-extension) effectively.
3. **For both**: Review the [AI tooling overview](slug:ai-overview) to understand the capabilities and limitations of these tools.

## See Also

* [Telerik Blazor MCP Server](slug:ai-mcp-server)
* [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension)
* [AI Tooling Overview](slug:ai-overview)
* [Visual Studio Integration Overview](slug:getting-started-vs-integration-overview)