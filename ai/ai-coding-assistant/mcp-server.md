---
title: Getting Started
page_title: Getting Started with the Telerik UI for Blazor AI Coding Assistant
description: Learn how to add and use the Telerik Blazor MCP Server as a Blazor AI coding assistant and code generator for better developer productivity. The Telerik Blazor MCP server provides proprietary context about Telerik UI for Blazor to AI-powered software.
slug: ai-mcp-server
tags: telerik,blazor,ai
published: True
position: 1
previous_url: /ai/mcp-server
---

# Getting Started with the Telerik UI for Blazor AI Coding Assistant

The Telerik Blazor [MCP Server](https://modelcontextprotocol.io/introduction) lets you interact with AI and reach new levels of developer productivity. The MCP server provides proprietary context to AI-powered IDEs, apps and tools. You can use the Telerik Blazor MCP server for Blazor AI code generation and ask about [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui), features, or general usage. You can successfully prompt more complex questions and tasks, and generate tailored code that includes Telerik UI for Blazor components and API.

## Prerequisites

To use the Telerik Blazor MCP server, you need:

* [Node.js](https://nodejs.org/en) 18 or a newer version.
* A [compatible MCP client (IDE, code editor or app)](https://modelcontextprotocol.io/clients) that supports *MCP tools*. Using the latest version of the MCP client is highly recommended.
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor subscription license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor).
* A [Blazor application that includes Telerik UI for Blazor](slug:blazor-overview#getting-started).

Check [AI Coding Assistant Overview](slug:ai-overview) for more recommendations and usage information.

## Installation

There are two ways to install the Telerik Blazor MCP server:

* Use a manual approach, which is described below.
* Use an automated process provided by the Telerik extensions for [Visual Studio](slug:getting-started-vs-integration-ai-configuration) and [VS Code](slug:getting-started-vs-code-integration-ai-configuration).

To install the Telerik MCP server manually, use the documentation of your AI-powered MCP client. You can enable the MCP server for specific workspaces or globally. The sections below provide installation tips and examples for some popular MCP clients like [Visual Studio](#visual-studio), [VS Code](#vs-code), and [Cursor](#cursor). The generic settings of the Telerik Blazor MCP server are:

* npm package name: `@progress/telerik-blazor-mcp`
* Type: `stdio` (standard input/output transport)
* Command: `npx`
* Arguments: `-y`
* Server name: `telerik_blazor_assistant`. This name depends on your preferences. The suggestion here matches the MCP tool name in the npm package. See the notes below.
* Your [Telerik license key](#license-key) as an `env` parameter

> * Some MCP clients expect the MCP servers to be listed under a `servers` JSON key, while others expect `mcpServers`.
> * Some MCP clients expect an `mcp.json` file, while others like Visual Studio 2022 expect an `.mcp.json` file.
> * Some MCP clients, including older Visual Studio versions, may not accept a server name that uses hyphens (`-`) or underscores (`_`). In such cases, update the MCP client version or use a different server name.

### License Key

To use the Telerik MCP Server, your configuration must provide your [Telerik licence key](slug:installation-license-key) as an `env` parameter in the MCP `.json` file. There are two options:

* Use a `TELERIK_LICENSE_PATH` argument and point to your Telerik license file location. This approach is recommended, unless you are sharing your VS Code settings across different computers with different operating systems or user names.
* Use a `TELERIK_LICENSE` argument and paste your Telerik license key. Make sure to [update the license key](slug:installation-license-key#license-key-updates) when necessary.

### Visual Studio

For detailed instructions, refer to [Use MCP servers in Visual Studio](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers). You can also install the Telerik Blazor MCP server through the [Telerik UI for Blazor Visual Studio extension](slug:getting-started-vs-integration-ai-configuration).

> Early Visual Studio 17.14 versions require the Copilot Chat window to be open and active when you open a solution. Otherwise the Telerik MCP server is not used.

To enable the Telerik MCP Server in a specific Blazor app, add a `.mcp.json` file to the solution folder.

>caption .mcp.json

````JSON.skip-repl
{
  "servers": {
    "telerik_blazor_assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp@latest"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

To enable global automatic discovery of the Telerik MCP Server in Visual Studio, add the above `.mcp.json` file to your user directory (`%USERPROFILE%`), for example, `C:\Users\____\.mcp.json`.

> Once the Telerik MCP server is added, make sure that the `telerik_blazor_assistant` tool is [enabled (checked) in the Copilot Chat window's tool selection dropdown](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=vs-2022#configuration-example-with-github-mcp-server). This dropdown opens when clicking on a wrench icon 🔧 at the bottom of the Copilot Window. The Telerik MCP server may get disabled when starting a new chat, changing threads, or relaunching Visual Studio. This is a known issue with MCP servers in general.

### VS Code

For detailed instructions, refer to [Use MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers). You can also install the Telerik Blazor MCP server through the [Telerik UI for Blazor VS Code extension](slug:getting-started-vs-code-integration-ai-configuration).

> This section applies to VS Code 1.102.1 and newer versions.

Make sure that [`chat.mcp.enabled`](vscode://settings/chat.mcp.enabled) is enabled in the VS Code settings.

To enable the Telerik MCP Server in a specific [workspace](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-workspace), Blazor app, or [globally](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_add-an-mcp-server-to-your-user-configuration), add a `.vscode` folder with an `mcp.json` file at the root of the workspace, app, or your user folder, respectively.

>caption .vscode/mcp.json

````JSON.skip-repl
{
  "servers": {
    "telerik_blazor_assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp@latest"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

To use the Telerik MCP server in all workspaces and apps, make sure that [`chat.mcp.discovery.enabled`](vscode://settings/chat.mcp.discovery.enabled) is enabled in [`settings.json`](https://code.visualstudio.com/docs/configure/settings#_settings-json-file).

>caption VS Code settings.json

````JSON.skip-repl
{
  // ...
  "chat.mcp.discovery.enabled": true,
}
````

### Cursor

For detailed instructions, refer to [Model Context Protocol](https://docs.cursor.com/context/mcp).

To [enable the Telerik MCP Server in a specific workspace, Blazor app, or globally](https://docs.cursor.com/context/mcp#using-mcp-json), add a `.cursor` folder with an `mcp.json` file at the root of the workspace, app, or your user folder, respectively.

>caption .cursor/mcp.json

````JSON.skip-repl
{
  "mcpServers": {
    "telerik_blazor_assistant": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@progress/telerik-blazor-mcp@latest"],
      "env": {
        "TELERIK_LICENSE_PATH": "C:\\Users\\___\\AppData\\Roaming\\Telerik\\telerik-license.txt"
      }
    }
  }
}
````

## Usage

By default, MCP clients do not call MCP tools in a deterministic way. Some MCP clients like [VS Code](#vs-code) allow you to explicitly reference the desired MCP tool in your prompt.

To use the Telerik MCP Server:

1. Start your prompt with `Telerik` to make it more likely for the Telerik MCP server to get called. If you are using VS Code, then start your prompt with:
    * `#` and the MCP server name that you used in `mcp.json` (for example, `#telerik_blazor_assistant`)
    * `#` and the name of the Telerik Blazor MCP tool (`#telerik_blazor_assistant`)
1. Confirm that the Telerik MCP server is used. Look for a statement in the output, which is similar to:
    * `Running telerik_blazor_assistant` (in VS Code)
    * `Calling MCP tool telerik_blazor_assistant` (in Cursor)
1. Grant the Telerik tool permission to run for the current session, workspace, or always.

Also check the general [AI Coding Assistant Recommendations](slug:ai-overview#recommendations) for more usage tips.

To call the Telerik MCP server without the need to type `Telerik` or `#telerik_blazor_assistant` explicitly, add custom instructions to your AI-powered tool. Here are examples for [GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#about-repository-custom-instructions-for-github-copilot-chat) and [Cursor](https://docs.cursor.com/context/rules).

### Sample Prompts

The following list describes how your prompts may look like. Check the [Prompt Library](slug:ai-prompt-library) for more examples.

* &quot;Telerik Generate a Blazor Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.&quot;
* &quot;Telerik Generate a ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.&quot;
* &quot;Telerik Show me sample code for a Blazor Grid with virtual scrolling for the rows and columns.&quot;

## Usage Limits

@[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

## Connect to Local AI Model

You can use the Telerik Blazor MCP server with local large language models (LLM). For example, run your local model through [Ollama](https://ollama.com) and use a third-party package such as [MCP-LLM Bridge](https://github.com/patruff/ollama-mcp-bridge) to connect the model to the Telerik MCP server. This will allow you to use the Telerik AI Coding Assistant without a cloud-based AI model.

## See Also 

* [Telerik Agentic UI Generator](slug:agentic-ui-generator-overview)
