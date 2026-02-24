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

This article explains how to install the Telerik Blazor MCP (Model Context Protocol) Server. The installation instructions include examples for some popular AI-powered IDEs.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* A [compatible MCP client (IDE, code editor, or app)](https://modelcontextprotocol.io/clients) that supports MCP tools.
* [.NET 8 or newer](https://dotnet.microsoft.com/en-us/download).
* Enabled HTTP/2 protocol support on the client device and any firewalls and proxies that may manage the network requests.
* A [Telerik user account](https://www.telerik.com/account/).
* An active Telerik Subscription license and a [license key](slug:installation-license-key). Your license type determines which [MCP server operation mode](slug:ai-overview#ai-modes-and-tools) you can use.

@[template](/_contentTemplates/common/general-info.md#license-names)

## MCP Server Configuration

Use the documentation of your AI-powered MCP client to enable the Telerik MCP Server in a specific workspace or globally. Below you can find installation tips and examples for some popular MCP clients.

### Generic Settings of the Telerik Blazor MCP Server

* Server name: `telerik-blazor-mcp` (an arbitrary name that depends on your preferences)
* Type: `stdio` (standard input/output transport)
* Command: `dnx` (the MCP server works through the [Telerik.Blazor.MCP](https://www.nuget.org/packages/Telerik.Blazor.MCP) NuGet package). The `dnx` value is valid when setting up the MCP Server on .NET 10. For .NET 8 or 9, see [.NET 8 and 9 Local Tool Installation](#-net-8-and-9-local-tool-installation)
* Supported arguments: `--yes`
* NuGet package name: `Telerik.Blazor.MCP`

### License Key Setup

The Telerik MCP server requires an [active Subscription or trial license](slug:ai-overview#license-requirements) and a valid key for authentication. You can configure your license key either globally on your machine (recommended) or locally in the `env` configuration of the `.mcp.json` file.

> When you start a new trial, you must [update your license key](slug:installation-license-key#license-key-updates).

If you have already completed the [Installation Guide](slug:ai-installation) and configured your license key, skip directly to [MCP Clients Configuration](#mcp-clients-configuration).

#### Global License Key Configuration

When the `telerik-license.txt` license file is in its default location, the MCP server will discover it automatically and authenticate successfully:  

>caption Default license file location

````JSON.skip-repl
"TELERIK_LICENSE_PATH": "C:\\Users\\YourName\\AppData\\Roaming\\Telerik\\telerik-license.txt"
````

For detailed instructions on installing and activating your license, see the [Telerik License Key](slug:installation-license-key#manual-installation) article.

#### Local License Key Configuration

To configure the license key locally, you have to define either one of the following arguments inside the `env` configuration of the `.mcp.json` file:
  * `TELERIK_LICENSE_PATH`&mdash;The full path to your license file location, including the license file name itself.
  * `TELERIK_LICENSE`&mdash;Paste your license key directly. Make sure to update the license key when necessary.

### MCP Clients Configuration

Below you can find installation tips and MCP server configuration for some popular MCP clients.

<TabStrip>
<TabStripTab title="Visual Studio">

Refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=visualstudio).

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

</TabStripTab>
<TabStripTab title="Visual Studio Code">

Refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

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

</TabStripTab>
<TabStripTab title="Cursor">

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

</TabStripTab>
</TabStrip>

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

* [Telerik AI Tools Overview](slug:ai-overview)
* [Agentic UI Generator Getting Started](slug:agentic-ui-generator-getting-started)
* [AI Coding Assistant Getting Started](slug:ai-mcp-server)
