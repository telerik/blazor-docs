---
title: MCP Server
page_title: Telerik Blazor MCP Server
description: Learn how to add and use the Telerik Blazor MCP Server as a Blazor AI coding assistant and code generator for better developer productivity. The Telerik Blazor MCP server provides proprietary context about Telerik UI for Blazor to AI-powered software.
slug: ai-mcp-server
tags: telerik,blazor,ai
published: True
position: 20
---

# Telerik Blazor MCP Server

The Telerik Blazor [MCP Server](https://modelcontextprotocol.io/introduction) lets you interact with AI and reach new levels of developer productivity. The MCP server provides proprietary context to AI-powered IDEs, apps and tools. You can use the Telerik Blazor MCP server for Blazor AI code generation and ask about [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui), features, or general usage. You can successfully prompt more complex questions and tasks, and generate tailored code that includes Telerik UI for Blazor components and API.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* A [compatible MCP client (IDE, code editor or app)](https://modelcontextprotocol.io/clients) that supports *MCP tools*.
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/blazor-ui).
* A [Blazor application that includes Telerik UI for Blazor](slug:blazor-overview#getting-started).

## Installation

Use the documentation of your AI-powered MCP client to add the Telerik MCP server to a specific workspace or globally. The sections below provide installation tips and examples for some popular MCP clients like [Visual Studio](#visual-studio), [VS Code](#vs-code), and [Cursor](#cursor). The generic settings of the Telerik Blazor MCP server are:

* npm package name: `@progress/telerik-blazor-mcp`
* Type: `stdio` (standard input/output transport)
* Command: `npx`
* Arguments: `-y`
* Server name: `telerik_blazor_assistant` (depends on your preferences)

You also need to add your [Telerik licence key](slug:installation-license-key) as an `env` parameter in the `mcp.json` file. There are two options:

* (recommended) Use a `TELERIK_LICENSE_PATH` argument and point to your Telerik license file location.
* Use a `TELERIK_LICENSE` argument and paste your Telerik license key. Make sure to [update the license key](slug:installation-license-key#license-key-updates) when necessary.

### Visual Studio

For detailed instructions, refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers).

> Visual Studio 17.14 seems to impose the following requirements:
> * Do not use hyphens (`-`) in the MCP server name in `.mcp.json`. For example, `"telerik_blazor_assistant"` and `"telerikblazorassistant"` work, but `"telerik-blazor-assistant"` does not.
> * The Copilot Chat window must be open and active when you open a solution.

To enable the Telerik MCP Server in a specific Blazor app, add a `.mcp.json` file to the solution folder.

> caption .mcp.json

````JSON.skip-repl
{
  "servers": {
    "telerik_blazor_assistant": {
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

To enable global automatic discovery of the Telerik MCP Server in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

> Once the Telerik MCP server is added, make sure that the `telerik_blazor_assistant` tool is [enabled (checked) in the Copilot Chart window's tool selection dropdown](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022#configuration-example-with-github-mcp-server). The Telerik MCP server may get disabled and you may see "🔧10/11" in the selected tools dropdown when starting a new chat, changing threads, or relaunching Visual Studio. This is a known issue for MCPs that is being investigated.

### VS Code

For detailed instructions, refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

To enable the Telerik MCP Server in a specific workspace or Blazor app, add a `.vscode` folder with an `mcp.json` file at the root of the workspace:

>caption .vscode/mcp.json at the workspace root

````JSON.skip-repl
{
  "servers": {
    "telerik_blazor_assistant": {
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
        "servers": {
            "telerik_blazor_assistant": {
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

For detailed instructions, refer to [Model Context Protocol](https://docs.cursor.com/context/model-context-protocol).

To [enable the Telerik MCP Server in a specific workspace](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-workspace) or Blazor app, add a `.cursor` folder with an `mcp.json` file at the root of the workspace.

>caption .cursor/mcp.json

````JSON.skip-repl
{
  "mcpServers": {
    "telerik_blazor_assistant": {
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

To [add the Telerik MCP Server globally for Cursor](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-user-settings), add a `.cursor` folder with the above `mcp.json` file in your user folder.

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
    * `Running telerik_blazor_assistant` (in VS Code)
    * `Calling MCP tool telerik_blazor_assistant` (in Cursor)

    If the Telerik MCP server is not used even though it's installed and enabled, then try rephrasing your prompt and use another trigger syntax from the list in step 1.
1. Grant the Telerik tool permission to run for this session, workspace, or always.
1. If you want to prompt for information or code that are not related to your previous prompts, it is a good practice to start a new session in a new chat window, so that the context is not polluted by irrelevant old information.

To increase the probability of the Telerik MVC Server being used, or to call it without the need to mention "telerik" explicitly, add custom instructions to your AI-powered tool. Here are examples for [GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#about-repository-custom-instructions-for-github-copilot-chat) and [Cursor](https://docs.cursor.com/context/rules).

### Sample Prompts

The following list describes how your prompts may look like:

* &quot;Telerik Generate a Blazor Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.&quot;
* &quot;Telerik Generate a ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.&quot;
* &quot;Telerik Show me sample code for a Blazor Grid with virtual scrolling for the rows and columns.&quot;

## Number of Requests

@[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

## See Also 

* [Telerik Blazor extension for GitHub Copilot](slug:ai-copilot-extension)
