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

## Quick Start

Follow these steps to set up the AI Coding Assistant:

1. Ensure you have a supported license. You need a [Telerik UI for Blazor](https://www.telerik.com/purchase.aspx?filter=dotnet#individual-products) subscription license to access the AI Coding Assistant. If you have a different license type, you can start a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you).

1. Add your Telerik license key by either placing the license file in `%AppData%/Telerik/telerik-license.txt` (Windows) or `~/.telerik/telerik-license.txt` (macOS/Linux), or by using the `TELERIK_LICENSE_PATH` or `TELERIK_LICENSE` environment variables in the configuration above.

    > For more information about obtaining and using your license key, refer to the [Installation]({% slug ai-installation %}) article.

2. To add the MCP server to your IDE, create an `.mcp.json` file in your solution (if you are using Visual Studio), or an `mcp.json` file in your workspace (if you are using Visual Studio Code) with the following configuration:
   ````JSON.skip-repl
   {
     "servers": {
       "telerik-blazor-mcp": {
         "type": "stdio",
         "command": "dnx",
         "args": ["Telerik.Blazor.MCP", "--yes"],
         "env": {
           "TELERIK_LICENSE_PATH": "THE_PATH_TO_YOUR_LICENSE_FILE"
           // or
           // "TELERIK_LICENSE": "YOUR_LICENSE_KEY"
         }
       }
      }
     }
   ````
   The server name `telerik-blazor-mcp` can be customized as desired. The name helps distinguish the MCP server in your configuration and does not affect how you invoke the generator tool in your prompt.

   > For more details on how to configure the MCP server, refer to the instructions for your specific IDE below:
   > * [Visual Studio](slug:ai-installation#visual-studio)
   > * [Visual Studio Code](slug:ai-installation#visual-studio-code)
   > * [Cursor](slug:ai-installation#cursor)

1. Open the AI chat interface of your IDE and start your prompt with `Telerik` to make it more likely for the AI Coding Assistant to get called. If you are using VS Code, then you can start your prompt with the `#telerik_blazor_assistant` handle to invoke the main generator tool:
    ````TEXT.skip-repl
    #telerik_blazor_assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality.
    ````

   > Step-by-step usage instructions are available in the [Usage](#usage) section.

## Usage

By default, MCP clients do not call MCP tools in a deterministic way. Some MCP clients like [VS Code](#vs-code) allow you to explicitly reference the desired MCP tool in your prompt.

To use the Telerik MCP Server:

1. Start your prompt with `Telerik` to make it more likely for the Telerik MCP server to get called. If you are using VS Code, then start your prompt with:
    * `#` and the MCP server name that you used in `mcp.json` (for example, `#telerik-blazor-mcp`)
    * `#` and the name of the Telerik Blazor MCP tool (`#telerik_blazor_assistant`)
1. Confirm that the Telerik MCP server is used. Look for a statement in the output, which is similar to:
    * `Running telerik_blazor_assistant` (in VS Code)
    * `Calling MCP tool telerik_blazor_assistant` (in Cursor)
1. Grant the Telerik tool permission to run for the current session, workspace, or always.

To call the Telerik MCP server without the need to type `Telerik` or `#telerik_blazor_assistant` explicitly, add custom instructions to your AI-powered tool. Here are examples for [GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#about-repository-custom-instructions-for-github-copilot-chat) and [Cursor](https://docs.cursor.com/context/rules).

### Sample Prompts

The following list describes how your prompts may look like. Check the [Prompt Library](slug:ai-prompt-library) for more examples.

* &quot;Telerik Generate a Blazor Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.&quot;
* &quot;Telerik Generate a ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.&quot;
* &quot;Telerik Show me sample code for a Blazor Grid with virtual scrolling for the rows and columns.&quot;

## Usage Limits

@[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

## See Also 

* [Telerik MCP Server Overview](slug:ai-overview)
