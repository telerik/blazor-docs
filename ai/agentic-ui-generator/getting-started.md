---
title: Getting Started
page_title: Getting Started with the Telerik UI for Blazor Agentic UI Generator
description: Learn how to install and configure the Telerik UI for Blazor Agentic UI Generator in Visual Studio and Visual Studio Code.
slug: agentic-ui-generator-getting-started
position: 10
tags: telerik,blazor,ai,agentic,ui,generator,installation
published: True
---

# Getting Started with the Agentic UI Generator

This article describes how to install, configure, and use the Telerik UI for Blazor Agentic UI Generator in Visual Studio and Visual Studio Code.

## Quick Start

Follow these steps to set up the Agentic UI Generator:

1. Ensure you have a supported license. You need a DevCraft Complete or Ultimate Subscription to access the Agentic UI Generator. If you have a different license type, you can start a [30-day AI Tools trial](https://www.telerik.com/mcp-servers-blazor/thank-you).

1. Save your `telerik-license.txt` file in:  
    * (on Windows) `%AppData%\Telerik\telerik-license.txt`, for example, `C:\Users\...\AppData\Roaming\Telerik\telerik-license.txt`
    * (on Mac or Linux) `~/.telerik/telerik-license.txt`, for example, `/Users/.../.telerik/telerik-license.txt`

    > For more information about obtaining and using your license key, refer to the [Installation]({% slug ai-installation %}) article.

1. To add the MCP server to your IDE, create an `.mcp.json` file in your solution (if you are using Visual Studio), or an `mcp.json` file in your workspace (if you are using Visual Studio Code) with the following configuration:
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

   An alternative way to authenticate without using a `telerik-license.txt` file is to set the `TELERIK_LICENSE` argument in the MCP Server configuration and paste your Telerik license key. Make sure to update the license key when necessary.
   
   The server name `telerik-blazor-mcp` can be customized as desired. The name helps distinguish the MCP server in your configuration and does not affect how you invoke the generator tool in your prompt.

   > For more details on how to configure the MCP server, refer to the instructions for your specific IDE below:
   > * [Visual Studio](slug:ai-installation#visual-studio)
   > * [Visual Studio Code](slug:ai-installation#visual-studio-code)
   > * [Cursor](slug:ai-installation#cursor)

1. Open the AI chat interface of your IDE and start your prompt with `Telerik` to make it more likely for the Agentic UI Generator to get called. If you are using VS Code, then you can start your prompt with the `#telerik_ui_generator` handle to invoke the main generator tool:
    ````TEXT.skip-repl
    #telerik_ui_generator Create a dashboard page with a grid showing sales data and a chart visualizing monthly trends.
    ````

   > Step-by-step usage instructions are available in [Using the Agentic UI Generator](#using-the-agentic-ui-generator).

## Using the Agentic UI Generator

Once installed, start a new chat session in your IDE to begin interacting with the Agentic UI Generator via natural language prompts. The Agentic UI Generator can be used in two primary modes: basic usage through [the main tool](#call-the-agentic-ui-generator), or advanced usage by [calling specific MCP tools directly](#target-the-tools-advanced).

### Call the Agentic UI Generator

1. Open the AI chat interface in your IDE&mdash;Start a new chat session to begin interacting with the Agentic UI Generator.
1. In Visual Studio Code, you can start your prompt with the `#telerik_ui_generator` handle&mdash;this invokes the main MCP tool that uses an agentic flow to analyze and process your request.
    > Using the `#telerik_ui_generator` handle ensures the Agentic UI Generator is called. Alternatively, you can use natural language without the handle. Make sure to mention the "telerik" keyword in your natural language prompt, so that the AI model can automatically recognize when to call the generator. The generator analyzes your prompt and creates the appropriate Blazor components, markup, and styling.
1. Inspect the output and verify that the `telerik-blazor-mcp` MCP server (or the one with your custom server name) is called. Look for a similar statement in the output:

    <img alt="MCP Server uses Telerik UI Generator in VS Code" src="../images/generator-confirmation.png" style="width: 80%"/>

1. If prompted, grant the MCP server permission to run for this session, workspace, or always.

### Target the Tools (Advanced)

For more granular control, you can call individual tools that make up the Agentic UI Generator:

| Tool Handle | Description |
|------------|-------------|
| `telerik_ui_generator` | Main generator for building full UI flows. Coordinates all other tools to deliver complete solutions. |
| `telerik_layout_assistant` | Applies suitable CSS utility classes from the Progress Design System for styling and positioning elements. Use this tool when you need help with spacing, typography, colors, layout structure, or transforms. |
| `telerik_component_assistant` | Answers questions and generates code related to Telerik UI for Blazor components. Use this tool when you need to implement or configure specific UI for Blazor components like Grid, Charts, Forms, etc. |
| `telerik_style_assistant` | Generates custom styles and theme configurations for your application. Use this tool when you need to apply brand-specific colors, create custom themes, or modify the overall visual design of your UI. |
| `telerik_icon_assistant` | Searches and retrieves icons from the Progress Design System iconography by name, category, or keywords. Use this tool when you need to find and add specific icons for your UI components or design elements. |

You can call these tools directly when you need specific functionality, allowing for more precise control over the generation process.

> The Validator Assistant tool is not designed to be invoked manually. It is called automatically by the Agentic UI Generator and ensures the generated code follows Telerik UI for Blazor best practices and standards.

> Tagging specific tools in Visual Studio currently is not available. To increase the probability that a tool will be called, either explicitly mention the tool in your prompt, or specify that in your Copilot instructions. 

## See Also

* [Agentic UI Generator Prompt Library](slug:agentic-ui-generator-prompt-library)
* [Telerik Design System](https://www.telerik.com/design-system/docs/)
