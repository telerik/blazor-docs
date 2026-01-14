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

The Telerik AI Tools are delivered through a single MCP (Model Context Protocol) server that automatically provides access to the appropriate level of functionality based on your Telerik license:

* **Agentic UI Generator**&mdash;Available exclusively with [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription licenses (or [Trial](https://www.telerik.com/try/ui-for-blazor)). This mode includes all AI Coding Assistant capabilities plus advanced UI generation, responsive layout creation, and custom theming tools.

* **AI Coding Assistant**&mdash;Available with a [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription or [DevCraft UI](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription licenses. This mode provides access to component documentation, code generation, configuration assistance, and troubleshooting tools.

This article provides detailed installation instructions for popular AI-powered IDEs.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* A [compatible MCP client (IDE, code editor, or app)](https://modelcontextprotocol.io/clients) that supports MCP tools
* A [Telerik User Account](https://www.telerik.com/account/)
* An active [Telerik license]({% slug installation-license-key %}). Your license type determines which [MCP server operation mode]({% slug ai-overview %}) you can access:
  * [DevCraft Complete or DevCraft Ultimate](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription (or [Trial](https://www.telerik.com/try/ui-for-blazor)) licenses&mdash;Grant access to the **Agentic UI Generator** mode
  * [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription or [DevCraft UI](https://www.telerik.com/purchase.aspx?filter=dotnet#product-bundles) subscription licenses&mdash;Grant access to the **AI Coding Assistant** mode
* [.NET 8 or newer](https://dotnet.microsoft.com/en-us/download).

## MCP Server Configuration

Use the documentation of your AI-powered MCP client to enable the Telerik MCP Server in a specific workspace or globally. Below you can find installation tips and examples for some popular MCP clients.

### Generic Settings of the Telerik Blazor MCP Server

* Server name: `telerik-blazor-mcp` (an arbitrary name that depends on your preferences)
* Type: `stdio` (standard input/output transport)
* Command: `dnx` (the MCP server works through a NuGet package). The `dnx` value is valid when setting up the MCP Server on .NET 10. For .NET 8 or 9, see [.NET 8 and 9 Local Tool Installation](#-net-8-and-9-local-tool-installation)
* Supported arguments: `--yes`
* NuGet package name: `Telerik.Blazor.MCP`

### License Key Setup

The Telerik MCP server requires a valid Telerik license key for authentication. You can configure your license key either globally *(recommended)* on your machine or locally in the `env` configuration of the `.mcp.json` file.

If you already have your `telerik-license.txt` license file in the default location, the MCP server will discover it automatically and authenticate successfully:  

>caption Default license file location

````JSON.skip-repl
"TELERIK_LICENSE_PATH": "C:\\Users\\YourName\\AppData\\Roaming\\Telerik\\telerik-license.txt"
````
> For detailed instructions on installing and activating your license, see the [Telerik License Key](slug:installation-license-key#manual-installation) article.

When configured locally, you have to define either one of the following arguments inside the `env` configuration of the `.mcp.json` file:
  * `TELERIK_LICENSE_PATH`&mdash;The full path to your license file location, including the license file name itself.
  * `TELERIK_LICENSE`&mdash;Paste your license key directly. Make sure to update the license key when necessary.

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
      "args": ["Telerik.Blazor.MCP", "--yes"]
      // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally 
      //"env": {
      //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
      //  // or
      //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      //}
    }
  },
  "inputs": []
}
````

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
      "args": ["Telerik.Blazor.MCP", "--yes"]
      // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally 
      //"env": {
      //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
      //  // or
      //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      //}
    }
  },
  "inputs": []
}
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
      "args": ["Telerik.Blazor.MCP"]
      // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally 
      //"env": {
      //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
      //  // or
      //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      //}
    }
  }
}
````

### .NET 8 and 9 Local Tool Installation

For .NET 8 and 9 projects, you can install the MCP server as a local tool without global installation:

````bash.skip-repl
dotnet tool install Telerik.Blazor.MCP
````

MCP Configuration for VS Code `.vscode/mcp.json` using local tools:

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dotnet",
      "args": ["tool", "run", "telerik-blazor-mcp"],
      // set any of the arguments in the 'env' configuration below, if you haven't set up your license file globally 
      //"env": {
      //  "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE",
      //  // or
      //  "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
      //}
    }
  },
  "inputs": []
}
````

> The `command` argument value must be `dotnet`, when you configure the MCP Server for .NET 8 or 9. 

## See Also

* [Overview]({% slug ai-overview %})
* [Agentic UI Generator Getting Started]({% slug agentic-ui-generator-getting-started %})
* [AI Coding Assistant Getting Started]({% slug ai-mcp-server %})
