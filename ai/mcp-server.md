---
title: MCP Server
page_title: Telerik MCP Server
description: 
slug: ai-mcp-server
tags: telerik,blazor,ai
published: True
position: 10
---

# Telerik MCP Server

Telerik UI for Blazor provides a [GitHub Copilot](https://github.com/features/copilot) extension. If you are using GitHub Copilot, the extension can generate code snippets that include Telerik UI for Blazor components and API.

## Prerequisites

## Installation

The [Agent mode of GitHub Copilot](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) allows you to prompt AI for more complex tasks that require a multi-step process and affect more files.

To use the Telerik MCP server in Copilot Agent mode:

1. Create a `.vscode/mcp.json` file in your workspace (application root).
1. Go to the [`telerik-blazor-mcp`](https://www.npmjs.com/package/@progress/telerik-blazor-mcp?activeTab=readme) npm package page and copy-paste the contents of `mcp.json`.
1. At the bottom of the Copilot Chat pane, select **Agent** from the dropdown that contains **Ask**, **Edit**, and **Agent**.

> Do not click the **Add Server** button at the bottom-right of the open JSON file.
> Do not execute `npm install @progress/telerik-blazor-mcp` manually.
> Do not use `@telerikblazor` in your prompts, because the Copilot Agent mode does not use extensions.

## Usage

Start your prompt with `@TelerikBlazor` and type your request.

If you want to prompt for code that is not related to your previous prompts, then use a new Chat, so that the new context is not polluted by irrelevant old information.

## See Also 

* [Telrik Blazor extension for GitHub Copilot](slug:ai-tooling-ai-coding-assistant).
