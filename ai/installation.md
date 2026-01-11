---
title: Installation
page_title: Telerik Blazor MCP Server Installation
description: Learn how to install and configure the Telerik Blazor MCP Server for AI-powered development with Telerik UI for Blazor components.
slug: ai-installation
tags: ai, mcp, installation, setup
published: True
tag: new
position: 2
---

# Installing the Telerik Blazor MCP Server

This article provides step-by-step instructions for installing and configuring the Telerik Blazor MCP Server in your development environment.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* A [compatible MCP client (IDE, code editor, or app)](https://modelcontextprotocol.io/clients) that supports MCP tools
* A [Telerik User Account](https://www.telerik.com/account/)
* An active Telerik license. Your license type determines which [MCP server mode]({% slug ai-overview %}) you can access: 
  * [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription license&mdash;grants access to the **AI Coding Assistant** mode
  * [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription license (or [trial](https://www.telerik.com/try/ui-for-blazor))&mdash;grants access to the **Agentic UI Generator** mode
* [.NET 10](https://dotnet.microsoft.com/en-us/download)

## Installation

Use the documentation of your AI-powered MCP client to add the Telerik MCP server to a specific workspace or globally. You can see installation tips and examples for some popular MCP clients below.

### License Key

You need to add and activate your Telerik license key. The type of license you have determines which modes of operation are available to you:

* **AI Coding Assistant**&mdash;available with a [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription license. This mode provides access to component documentation, code generation, configuration assistance, and troubleshooting tools.

* **Agentic UI Generator**&mdash;available exclusively with [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription licenses (or [trial](https://www.telerik.com/try/ui-for-blazor)). This mode includes all AI Coding Assistant capabilities plus advanced UI generation, responsive layout creation, and custom theming tools.

If you are new to Telerik UI for Blazor, sign up for a free [trial](https://www.telerik.com/try/ui-for-blazor).

#### Installing Your License Key

@[template](/_contentTemplates/common/get-started.md#license-key-manual-steps)

@[template](/_contentTemplates/common/get-started.md#license-key-update-whenever)

For more detailed guidance on activating your license, see the [Telerik License Key](slug:installation-license-key#basics) article. 

## MCP Server Configuration

Use the documentation of your AI-powered MCP client to enable the Telerik MCP Server in a specific workspace or globally. Below you can find installation tips and examples for some popular MCP clients.

### Generic Settings of the Telerik Blazor MCP Server

* Server name: `telerik-blazor-mcp` (an arbitrary name that depends on your preferences)
* Type: `stdio` (standard input/output transport)
* Command: `dnx` (the MCP server works through a NuGet package)
* Supported arguments: `--yes`
* NuGet package name: `Telerik.Blazor.MCP`

### Visual Studio

Refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/copilot/visual-studio-github-copilot-extension?view=vs-2022#model-context-protocol-mcp-support).

To enable global automatic discovery of the Telerik MCP Server in Visual Studio, add the `.mcp.json` file posted below to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

To enable the Telerik MCP Server in a specific Blazor app, add a `.mcp.json` file to the solution folder (if you are using Visual Studio), or an `mcp.json` file in your workspace (if you are using Visual Studio Code).

**.mcp.json**

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dnx",
      "args": ["Telerik.Blazor.MCP", "--yes"],
      "env": {
        "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
        // or
        "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      }
    }
  },
  "inputs": []
}
````

The `TELERIK_LICENSE_PATH` value must be the full path to the license key file, including the license file name itself, for example, 

````JSON.skip-repl
"TELERIK_LICENSE_PATH": "C:\\Users\\YourName\\AppData\\Roaming\\Telerik\\telerik-license.txt"
````

An alternative way to authenticate without using a `telerik-license.txt` file is to set the `TELERIK_LICENSE` argument in the MCP Server configuration and paste your Telerik license key. Make sure to update the license key when necessary.

Once the Telerik MCP server is added, make sure that all of its tools are enabled (checked) in the Copilot Chat window's tool selection dropdown in Visual Studio.

### Visual Studio Code

Refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/copilot-mcp-architecture).

To enable the Telerik MCP Server in a specific workspace or Blazor app, add a `.vscode` folder with an `mcp.json` file at the root of the workspace:

**.vscode/mcp.json at the workspace root**

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dnx",
      "args": ["Telerik.Blazor.MCP", "--yes"],
      "env": {
        "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
        // or
        "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      }
    }
  },
  "inputs": []
}
````

The `TELERIK_LICENSE_PATH` value must be the full path to the license key file, including the license file name itself, for example, 

````JSON.skip-repl
"TELERIK_LICENSE_PATH": "C:\\Users\\YourName\\AppData\\Roaming\\Telerik\\telerik-license.txt"
````

Make sure that [`chat.mcp.enabled`](vscode://settings/chat.mcp.enabled) is enabled in the VS Code settings. 

To use the Agentic UI Generator in all workspaces and apps, make sure that [`chat.mcp.discovery.enabled`](vscode://settings/chat.mcp.discovery.enabled) is enabled in [`settings.json`](https://code.visualstudio.com/docs/configure/settings#_settings-json-file).

>caption VS Code settings.json

````JSON.skip-repl
{
  // ...
  "chat.mcp.discovery.enabled": true,
}
````

After adding the configuration, restart your IDE to load the Agentic UI Generator.

### Cursor

Refer to [Model Context Protocol](https://cursor.com/docs/context/mcp), which enables Cursor to connect to external tools.

To enable the Telerik MCP Server in a specific workspace or Blazor app, add a `.cursor` folder with an `mcp.json` file at the root of the workspace.

**.cursor/mcp.json at the workspace root**

````JSON.skip-repl
{
  "mcpServers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dnx",
      "args": ["Telerik.Blazor.MCP"],
      "env": {
        "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
        // or
        "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      }
    }
  }
}
````

### .NET 8 and 9 Local Tool Installation

For .NET 8 and 9 projects, you can install the MCP server as a local tool without global installation:

````bash.skip-repl
dotnet tool install Telerik.Blazor.MCP
````

### MCP Configuration for .NET 8 and 9 Local Tools

For VS Code `.vscode/mcp.json` using local tools:

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dotnet",
      "args": ["tool", "run", "telerik-blazor-mcp"],
      "env": {
        "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
        // or
        "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      }
    }
  },
  "inputs": []
}
````

## See Also

* [Overview]({% slug ai-overview %})
* [Agentic UI Generator Getting Started]({% slug agentic-ui-generator-getting-started %})
* [AI Coding Assistant Getting Started]({% slug ai-mcp-server %})
