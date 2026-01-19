---
title: Getting Started
page_title: Getting Started with the Telerik UI for Blazor AI Coding Assistant
description: Learn how to add and use the Telerik Blazor MCP Server as a Blazor AI coding assistant and code generator for better developer productivity. The Telerik Blazor MCP server provides proprietary context about Telerik UI for Blazor to AI-powered software.
slug: ai-mcp-server
tags: telerik,blazor,ai
published: True
position: 1
previous_url: /ai/mcp-server
tag: updated
---

# Getting Started with the Telerik UI for Blazor AI Coding Assistant

The Telerik Blazor AI Coding Assistant improves your developer experience and increases your productivity when implementing Blazor apps that include Telerik UI for Blazor. The coding assistant is an AI code generator that provides proprietary context to AI models in order to produce higher quality code samples with the [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui) and API.

## Quick Start

> If you have already completed the [Installation Guide]({% slug ai-installation %}) and configured your license key, skip directly to **step 3** to start using the AI Coding Assistant.

Follow these steps to set up the AI Coding Assistant:

1. Create an `.mcp.json` file in your solution (if you are using Visual Studio), or an `mcp.json` file in your workspace (if you are using Visual Studio Code) with the following configuration:
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
      }
     }
   ````
   The server name `telerik-blazor-mcp` can be customized as desired. The name helps distinguish the MCP server in your configuration and does not affect how you invoke the AI Code Assistant in your prompt.

   > For IDE-specific setup instructions and advanced configuration options, see [MCP Server Configuration](slug:ai-installation#mcp-clients-configuration).

1. Ensure you have a [supported license]({% slug ai-overview#license-requirements %}) and set up your Telerik license key globally on your machine or in the `.mcp.json` configuration. The server automatically recognizes your license and activates [the appropriate tools]({% slug ai-overview#ai-tools-overview-and-comparison %}).

     > Refer to the [Telerik License Key Setup](slug:installation-license-key#manual-installation) section for detailed instructions.

1. Open the AI chat interface of your IDE and start your prompt with `Telerik` to make it more likely for the AI Coding Assistant to get called. If you are using VS Code, then you can start your prompt with the `#telerik_blazor_assistant` handle to invoke the main generator tool:
    ````TEXT.skip-repl
    #telerik_blazor_assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality.
    ````

   > Step-by-step usage instructions are available in the [Usage](#usage) section.

## Usage

By default, MCP clients do not call MCP tools in a deterministic way. Some MCP clients like [VS Code](#vs-code) allow you to explicitly reference the desired MCP tool in your prompt.

To use the AI Coding Assistant:

1. Start your prompt with `Telerik` to make it more likely for the Telerik MCP server to get called. If you are using VS Code, then start your prompt with:
    * `#` and the MCP server name that you used in `mcp.json` (for example, `#telerik-blazor-mcp`)
    * `#` and the name of the Telerik Blazor MCP tool (`#telerik_blazor_assistant`)
1. Confirm that the Telerik MCP server is used. Look for a statement in the output, which is similar to:
    * `Running telerik_blazor_assistant` (in VS Code)
    * `Calling MCP tool telerik_blazor_assistant` (in Cursor)
1. Grant the Telerik tool permission to run for the current session, workspace, or always.

To call the Telerik MCP server without the need to type `Telerik` or `#telerik_blazor_assistant` explicitly, add custom instructions to your AI-powered tool. Here are examples for [GitHub Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#about-repository-custom-instructions-for-github-copilot-chat) and [Cursor](https://cursor.com/docs/context/rules).

### Call the AI Coding Assistant

1. Open the AI chat interface in your IDE&mdash;Start a new chat session to begin interacting with the AI Coding Assistant.
1. In Visual Studio Code, you can start your prompt with the `#telerik_blazor_assistant` handle&mdash;this invokes the main MCP tool that uses an agentic flow to analyze and process your request.
    > Using the `#telerik_blazor_assistant` handle ensures the AI Coding Assistant is called. Alternatively, you can use natural language without the handle. Make sure to mention the "telerik" keyword in your natural language prompt, so that the AI model can automatically recognize when to call the Assistant. The Assistant analyzes your prompt and creates the appropriate Blazor components, markup, and styling.
1. Inspect the output and verify that the `telerik-blazor-mcp` MCP server (or the one with your custom server name) is called. 
1. If prompted, grant the MCP server permission to run for this session, workspace, or always.

### Target the Tools (Advanced)

The AI Coding Assistant includes three specialized tools coordinated by an orchestrator tool optimized for component-level development:

<table>
<thead>
<tr>
<th width="17%">Tool</th>
<th width="26%">Handle</th>
<th width="57%">Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Orchestrator Tool</strong></td>
<td><code>#telerik_blazor_assistant</code></td>
<td>Main tool that coordinates all other tools to answer questions and generate code samples.</td>
</tr>
<tr>
<td><strong>Component Tool</strong></td>
<td><code>#telerik_component_assistant</code></td>
<td>Answers questions and generates code related to Telerik UI for Blazor components. Use this tool when you need to implement or configure specific Telerik UI for Blazor components like Grid, Charts, Forms, etc.</td>
</tr>
<tr>
<td><strong>Icon Tool</strong></td>
<td><code>#telerik_icon_assistant</code></td>
<td>Searches and retrieves icons from the <a href="https://www.telerik.com/design-system/docs/foundation/iconography/icon-list/">Progress Design System iconography</a> by name, category, or keywords. You can also call it directly when you need to find specific icons for your UI components or design elements.</td>
</tr>
<tr>
<td><strong>Validator Tool</strong></td>
<td><code>N/A</code></td>
<td>Not designed to be invoked manually. It is called automatically by the orchestrator and ensures the generated code follows Telerik UI for Blazor best practices and standards.</td>
</tr>
</tbody>
</table>

You can call these tools directly when you need specific functionality, allowing for more precise control over the generation process.

> Tagging specific tools in Visual Studio currently is not available. To increase the probability that a tool will be called, either explicitly mention the tool in your prompt, or specify that in your Copilot instructions. 

### Sample Prompts

The following list describes how your prompts may look like. Check the [Prompt Library](slug:ai-prompt-library) for more examples.

* &quot;Telerik Generate a Blazor Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.&quot;
* &quot;Telerik Generate a ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.&quot;
* &quot;Telerik Show me sample code for a Blazor Grid with virtual scrolling for the rows and columns.&quot;

## See Also 

* [Telerik MCP Server Overview](slug:ai-overview)
