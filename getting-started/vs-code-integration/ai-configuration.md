---
title: AI Configuration
page_title: Visual Studio Code AI Configuration
description: Learn how to configure AI-powered tools like MCP servers and GitHub Copilot for Telerik UI for Blazor development in Visual Studio Code.
slug: getting-started-vs-code-integration-ai-configuration
position: 8
---

# AI Configuration in Visual Studio Code

The Telerik UI for Blazor Extension for Visual Studio Code provides automated configuration commands for AI-powered development tools. These commands help you quickly set up [MCP servers](slug:ai-mcp-server) and [GitHub Copilot](slug:ai-copilot-extension) for enhanced developer productivity with Telerik UI for Blazor components.

## Available Commands

To access these commands, press `Ctrl`+`Shift`+`P` on Windows/Linux or `Cmd`+`Shift`+`P` on Mac to open the VS Code command palette, then search for the following Telerik commands:

### Configure MCP Server

The **Telerik UI for Blazor: Configure MCP Server** command automatically creates the necessary configuration file for the [Telerik Blazor MCP Server](slug:ai-mcp-server). This command provides two configuration scopes:

* **Workspace Scope** - Creates an `mcp.json` file under the `.vscode` folder in your current workspace. This configuration applies only to the current workspace.
* **Global Scope** - Creates an `mcp.json` file under `C:\Users\[username]\AppData\Roaming\Code\User\` (Windows) or the equivalent user configuration directory on other platforms. This configuration applies to all VS Code workspaces.

The generated `mcp.json` file includes the proper configuration for the Telerik Blazor MCP server with placeholder values for your Telerik license. You need to update the license path or key in the generated file.

>caption Generated .vscode/mcp.json (Workspace Scope)

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

### Add GitHub Copilot Custom Instructions

The **Telerik UI for Blazor: Add GitHub Copilot Custom Instructions** command generates a `copilot-instructions.md` file under the `.github` folder in your current workspace. This file contains custom instructions that help GitHub Copilot provide better assistance when working with Telerik UI for Blazor components.

The generated file includes:
* Best practices for Razor component development
* Telerik UI for Blazor specific coding guidelines
* Component naming conventions
* Recommended code structure patterns

### Install Telerik Blazor Copilot Extension

The **Telerik UI for Blazor: Install Telerik Blazor Copilot Extension** command opens the GitHub App installation page in your default browser:

`https://github.com/apps/telerikblazor/installations/select_target`

This allows you to quickly install the [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension) for your GitHub account or organization.

## Prerequisites

Before using these AI configuration commands, ensure you have:

* A [Telerik user account](https://www.telerik.com/account/)
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or [trial](https://www.telerik.com/blazor-ui)
* [Node.js](https://nodejs.org/en) 18 or newer (for MCP server functionality)
* The latest version of the Telerik UI for Blazor VS Code extension

## Next Steps

After configuring the AI tools:

1. **For MCP Server**: Follow the [complete MCP server setup guide](slug:ai-mcp-server) to understand usage and troubleshooting.
2. **For GitHub Copilot**: Learn how to use the [Telerik Blazor Copilot Extension](slug:ai-copilot-extension) effectively.
3. **For both**: Review the [AI tooling overview](slug:ai-overview) to understand the capabilities and limitations of these tools.

## See Also

* [Telerik Blazor MCP Server](slug:ai-mcp-server)
* [Telerik Blazor GitHub Copilot Extension](slug:ai-copilot-extension)
* [AI Tooling Overview](slug:ai-overview)
* [VS Code Integration Overview](slug:getting-started-vs-code-integration-overview)