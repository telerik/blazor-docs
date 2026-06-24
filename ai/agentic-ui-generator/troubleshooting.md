---
title: Troubleshooting
meta_title: Telerik Blazor AI Tools Troubleshooting
description: Common issues and their solutions when using the Telerik MCP Server for AI-powered development tools.
slug: ai-troubleshooting
tags: AI, troubleshooting, issue
position: 30
previous_url: /ai/troubleshooting
---

# Troubleshooting

This article provides solutions to common issues you may encounter when working with the Telerik UI for Blazor AI Tools.

## No Access to the AI Coding Assistant

Starting in February 2026, we restructured the Telerik UI for Blazor AI Tools to better serve different user needs by deprecating the AI Coding Assistant. The Telerik Blazor MCP server now provides a single workflow centered around the Agentic UI Generator tool and its specialized MCP assistants.

As part of this restructuring, license requirements have also changed.:

* **All active Telerik Subscription models**&mdash;Provide access to the Agentic UI Generator.
* **Trial licenses**&mdash;Provide access to the Agentic UI Generator during the active trial period.
* **Perpetual licenses**&mdash;Do not grant access to the AI tools. You must have an active Subscription or a trial license to use the Telerik Blazor MCP server.

@[template](/_contentTemplates/common/general-info.md#license-names)

For detailed information about license requirements and tool capabilities, see [License Requirements](slug:ai-overview#license-requirements).

## I Started a Trial License but Cannot Activate the MCP Server

When you activate a trial license, you must download and install the updated license key to enable access to the AI Tools. To resolve this issue:

1. Follow the steps in the [License Key Updates](slug:installation-license-key#license-key-updates) section.
1. Restart your IDE to ensure the changes take effect.

The MCP server validates your license during initialization. Without a properly activated license key, the server cannot authenticate your access to the AI Tools.

## MCP Assistants Not Recognized by Visual Studio

If the Telerik MCP server assistants are not available or recognized by GitHub Copilot in Visual Studio, you may need to manually enable them:

1. Click on the *Select Tools* button on the bottom right part of the Copilot chat window.
1. In the popup that opens, check **telerik-blazor-mcp** from the list to enable it.

<img alt="Enable MCP Server assistants in Visual Studio" src="../images/mcp-server-enable-tools.png" style="width: 80%"/>

## Hanging Tool Calls in Visual Studio

When using Telerik AI tools in Visual Studio, GitHub Copilot may:
* **Hang** during tool invocation.
* Show UI for a successful tool response, but actually **fail silently**.
* Continue generation without waiting for **parallel tool calls**.

This is a [known issue](https://developercommunity.visualstudio.com/t/Copilot-stopped-working-after-latest-upd/10936456) in older Visual Studio versions that has been fixed in Visual Studio 2026 Insiders 18.3.0 (11426.168).

## Unable to Establish HTTP/2 Connection

The Telerik AI Assistant depends on gRPC, which requires HTTP/2. If the client device does not support HTTP/2 or the protocol is disabled, the following exception occurs:

````TEXT.skip-repl
HttpRequestException: Requesting HTTP version 2.0 with version policy RequestVersionExact while unable to establish HTTP/2 connection.
````

In this case, enable HTTP/2 on the client device and any related firewalls or proxy servers in the network.

## AI Plugin and MCP Server Running Simultaneously

The [telerik-blazor-plugin](slug:ai-overview#ai-plugins) comes with its own predefined MCP server configuration tuned for skills, so if you already have the MCP server configured in your IDE, you must disable or remove it before installing the plugin. Running both at the same time can cause the following issues:

* Tool vs. skill confusion&mdash;The MCP server exposes a `telerik_ui_generator` tool. The plugin intentionally disables that tool and provides a `telerik-ui-generator` skill instead, to avoid ambiguity. When the MCP server is also active, that protection no longer works and the agent may be unsure which entry point to use.
* Duplicated context&mdash;MCP tools carry static context that is injected into the model on every invocation. The plugin replaces this with skills that are loaded on demand. If both configurations are active, the agent receives both the skill instructions and the tool's static context — duplicate information that leads to higher token usage and inconsistent responses.
* Double invocation&mdash;When both are present, the agent may read the plugin skill and then also call the MCP tool. The result is even more context, more confusion, and less predictable output.

Disable or remove the Telerik MCP server configuration from your IDE before using the plugin. For example, for VS Code, remove or comment out the `telerik-mcp-server` entry from your `.vscode/mcp.json` or user-level `mcp.json`. Then reload the window (`Developer: Reload Window`) before starting a new session.

## See Also

* [Telerik UI for Blazor AI Tools Overview](slug:ai-overview)
* [Agentic UI Generator Getting Started ](slug:agentic-ui-generator-getting-started)
* [Licensing](slug:installation-license-key)
