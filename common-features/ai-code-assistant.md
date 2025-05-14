---
title: AI Code Assistant
page_title: Telerik Blazor AI Code Assistant
description: 
slug: common-features-ai-code-assistant
tags: telerik,blazor,ai
published: True
position: 60
---

# Telerik Blazor AI Code Assistant

Telerik UI for Blazor provides a [GitHub Copilot](https://github.com/features/copilot) extension. If you are using GitHub Copilot, the extension can generate code snippets that include Telerik UI for Blazor components and API.

## Prerequisites

To use the Telerik GitHub Copilot extension for Blazor, you need to have:

* An active [https://github.com/features/copilot](https://github.com/features/copilot) subscription. You can enable or configure GitHub Copilot on the [Copilot Settings page in your GitHub account](https://github.com/settings/copilot).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui).

## Installation

To install the Telerik GitHub Copilot extension:

1. Go to the [TelerikBlazor GitHub App](https://github.com/apps/telerikblazor) page.
1. Click the **Install** button.
1. You will see a list that includes your GitHub account and all GitHub organizations that you are part of. Select your GitHub account.
1. Click the **Install &amp; Authorize** button. This will authorize the GitHub Copilot extension to integrate with your GitHub account.
1. Enter your GitHub password.

On first usage, you have to authenticate with your Telerik credentials:

1. Click the **Authorize** button
1. Enter your Telerik email and password. This will authorize the GitHub Copilot extension to integrate with your Telerik account.

## Usage

Start your prompt with `@TelerikBlazor` and type your request.

If you want to prompt for code that is not related to your previous prompts, then use a new Chat, so that the new context is not polluted by irrelevant old information.

### Add Telerik MCP Server to VS Code

The [Agent mode of GitHub Copilot](https://code.visualstudio.com/blogs/2025/02/24/introducing-copilot-agent-mode) allows you to prompt AI for more complex tasks that require a multi-step process and affect more files.

To use the Telerik MCP server in Copilot Agent mode:

1. Create a `.vscode/mcp.json` file in your workspace (application root).
1. Go to the [`telerik-blazor-mcp`](https://www.npmjs.com/package/@progress/telerik-blazor-mcp?activeTab=readme) npm package page and copy-paste the contents of `mcp.json`.
1. At the bottom of the Copilot Chat pane, select **Agent** from the dropdown that contains **Ask**, **Edit**, and **Agent**.

> Do not click the **Add Server** button at the bottom-right of the open JSON file.
> Do not execute `npm install @progress/telerik-blazor-mcp` manually.
> Do not use `@telerikblazor` in your prompts, because the Copilot Agent mode does not use extensions.

## See Also 

* [GitHub Copilot Tutorials](https://github.com/features/copilot/tutorials).
* [Integrate Telerik UI for Blazor with Microsoft.Extensions.AI](slug:common-features-microsoft-extensions-ai-integration)
