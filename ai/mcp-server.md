---
title: MCP Server
page_title: Telerik Blazor MCP Server
description: 
slug: ai-mcp-server
tags: telerik,blazor,ai
published: True
position: 20
---

# Telerik Blazor MCP Server

The Telerik Blazor [MCP Server](https://modelcontextprotocol.io/introduction) enables you achieve interation with AI and reach new levels of developer productivity. The MCP server provides proprietary context to AI-powered IDEs, apps and tools. You can use the Telerik Blazor MCP server to ask about Telerik UI for Blazor components, features, or general usage. You can successfully prompt more complex questions and tasks, and generate tailored code that includes Telerik UI for Blazor components and API.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* A [compatible MCP client (IDE, code editor or app)](https://modelcontextprotocol.io/clients) that supports *MCP tools*.
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/blazor-ui).

## Installation

Use the documentation of your AI-powered MCP client to add the Telerik MCP server to a specific workspace or globally. You can see installation tips and examples for some popular MCP clients below.

The generic settings of the Telerik Blazor MCP server are:

* Server name: `telerik-blazor-assistant`
* Type: `stdio` (standard input/output transport)
* Command: `npx` (the MCP server works through an npm package)
* Supported arguments: `-y`
* npm package name: `@progress/telerik-blazor-mcp`
* You also need to add your [Telerik licence key](slug:installation-license-key) as an `env` parameter in the `mcp.json` file. There are two options:
    * (recommended) Use a `TELERIK_LICENSE_PATH` argument and point to your Telerik license file location.
    * Use a `TELERIK_LICENSE_KEY` argument and paste your Telerik license key. Make sure to [update the license key](slug:installation-license-key#license-key-updates) when necessary.

### Visual Studio

Refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers).

To enable the Telerik MCP Server in a specific Blazor app, add a `.mcp.json` file to the solution folder.

> caption SOLUTIONDIR/.mcp.json

````JSON.skip-repl
{
  "inputs": [
    // ...
  ],
  "servers": {
    "telerik-blazor-assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

To enable automatic global discovery of the Telerik MCP Server in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

### VS Code

Refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

To enable the Telerik MCP Server in a specific workspace or Blazor app, add a `.vscode` folder with an `mcp.json` file at the root of the workspace:

>caption .vscode/mcp.json at the workspace root

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

To [add the Telerik MCP Server globally for VS Code, edit the VS Code `settings.json` file](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-user-settings):

>caption VS Code settings.json

````JSON.skip-repl
{
    // ...
    "chat.mcp.discovery.enabled": true,
    "mcp": {
        "inputs": [
          // ...
        ],
        "servers": {
            "telerik-blazor-assistant": {
                "type": "stdio",
                "command": "npx",
                "args": ["-y", "@progress/telerik-blazor-mcp"],
                "env": {
                    "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
                }
            }
        }
    }
}
````

### Cursor

Refer to [Model Context Protocol](https://docs.cursor.com/context/model-context-protocol).

To [enable the Telerik MCP Server in a specific workspace](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-workspace) or Blazor app, add a `.cursor` folder with an `mcp.json` file at the root of the workspace.

>caption .cursor/mcp.json at the workspace root

````JSON.skip-repl
{
  "mcpServers": {
    "telerik-blazor-assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

To [add the Telerik MCP Server globally for Cursor](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-user-settings), add a `.cursor` folder with an `mcp.json` file in your user folder:

>caption .cursor/mcp.json inside your user folder

````JSON.skip-repl
{
  "mcpServers": {
    "telerik-blazor-assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

## Usage

To use the Telerik MCP Server:

1. Start your prompt with one of the following:
    * `telerik`
    * `/telerik`
    * `@telerik`
    * `telerikblazor`
    * `/telerikblazor`
    * `@telerikblazor`
1. Confirm that the Telerik MCP server is used, because this doesn't happen deterministically. Look for a statement in the output, which is similar to:
    * `Running telerik-blazor-assistant` (in VS Code)
    * `Calling MCP tool telerik-blazor-assistant` (in Cursor)

    If the Telerik MCP server is not used even though it's installed and enabled, then try rephrasing your prompt and use another trigger syntax from the list in step 1.
1. Grant the Telerik tool a permission to run for this session, workspace, or always.
1. If you want to prompt for information or code that are not related to your previous prompts, it is a good practice to start a new session in a new chat window, so that the context is not polluted by irrelevant old information.

To increase the probability of the Telerik MVC Server being used, or to call it without the need to mention "telerik" explicitly, add custom instructions to your AI-powered tool. Here are examples for [GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#about-repository-custom-instructions-for-github-copilot-chat) and [Cursor](https://docs.cursor.com/context/rules).

### Sample Prompts

The following list describes how your prompts may look like:

* Telerik Generate a Grid with sorting and paging enabled. Bind the Grid to a Person model that is defined in the same .razor file and provide dummy data.
* Telerik What is DebounceDelay for the Telerik TextBox?
* Telerik Why am I getting a TelerikBlazor was undefined JavaScript error?

## Number of Requests

> The usage limits below will take place after after June 28, 2025. Until then, each customer with an active commercial or trial license can make up to 300 daily requests.

The Telerik Blazor MCP Server allows the following maximum number of requests, depending on your license type:

* Perpetual licenses: 50 requests per year
* Subscription licenses: 300 requests per day
* Trial licenses: 300 requests per trial per year. Activating the same trial for a new release does not grant additional 300 requests.

> One prompt may trigger several requests to the MCP server, depending on the complexity.
>
> All Telerik AI tools share a single request limit for your Telerik account. For example, the Telerik MCP server and the Telerik Copilot extension both take up from the same usage quota.

## See Also 

* [Telerik Blazor extension for GitHub Copilot](slug:ai-copilot-extension)
