---
title: Copilot Extension
page_title: Telerik Blazor GitHub Copilot Extension
description: Learn how to add and use the Telerik Blazor GitHub Copilot extension as a Blazor AI coding assistant and code generator for better developer productivity. The Telerik Blazor GitHub Copilot extension provides proprietary context about Telerik UI for Blazor to AI-powered software.
slug: ai-copilot-extension
tags: telerik,blazor,ai
published: True
position: 10
previous_url: /ai/copilot-extension
hidden: True
---

# Telerik Blazor GitHub Copilot Extension

The Telerik Blazor [GitHub Copilot](https://github.com/features/copilot) extension provides proprietary context for the [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui). The extension works as a Blazor AI code generator and can help you reach new levels of developer productivity. You can get useful tips and generate tailored code snippets that include Telerik UI for Blazor components and API.

> [Microsoft sunset GitHub Copilot extensions](https://github.blog/changelog/2025-09-24-deprecate-github-copilot-extensions-github-apps) on November 10, 2025, in favor of the Model Context Protocol (MCP) standard.
>
> The Telerik and Kendo UI AI Coding Assistants are available exclusively through our [MCP servers](slug:ai-mcp-server). You can enjoy the same powerful capabilities that are delivered by a modern, open, and officially recommended standard.

## Prerequisites

To use the Telerik GitHub Copilot extension for Blazor, you need to have:

* An active [GitHub Copilot](https://github.com/features/copilot) subscription. You can enable or configure GitHub Copilot on the [Copilot Settings page in your GitHub account](https://github.com/settings/copilot).
* [Enabled Copilot extensions](https://github.com/settings/copilot/features) in your GitHub account.
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/blazor-ui).
* A [Blazor application that includes Telerik UI for Blazor](slug:blazor-overview#getting-started).
* Using the latest version of your Copilot-enabled app is recommended (for example, Visual Studio or VS Code).

Check [AI Coding Assistant Overview](slug:ai-overview) for more recommendations and usage information.

## Installation

To install the Telerik Blazor Copilot extension:

1. Make sure you are logged in [GitHub](https://github.com).
1. Go to the [TelerikBlazor GitHub App](https://github.com/apps/telerikblazor) page and click the **Install** button. If you have already installed the extension, you will see a **Configure** button instead.
1. You will see a list that includes your GitHub account and all GitHub organizations that you are part of. Normally, select your GitHub account.
1. Click the **Install &amp; Authorize** button. This will authorize the GitHub Copilot extension to integrate with your GitHub account.
1. Enter your GitHub password.
1. You will be redirected to telerik.com. Enter your Telerik account credentials if prompted. This will authorize the GitHub Copilot extension to integrate with your Telerik account.
1. Upon successful Telerik authentication, you will be redirected once again to a page that confirms successful Copilot extension installation.
1. Restart your Copilot-enabled apps (for example, Visual Studio and VS Code).
1. Start a new chat session in Copilot.

You can also start the installation from the Telerik UI for Blazor extensions for [Visual Studio](slug:getting-started-vs-integration-ai-configuration#install-telerik-blazor-copilot-extension) and [VS Code](slug:getting-started-vs-code-integration-ai-configuration). Then, continue the installation from step 2.

## Usage

To use the Telerik Blazor Copilot extension:

1. Open the GitHub Copilot chat window in your [Copilot-enabled app](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions#supported-clients-and-ides) (for example, Visual Studio or VS Code).
1. Make sure you are in **Ask** mode and not in **Edit** or **Agent** mode. The Edit and Agent modes do not use the Telerik Copilot extension. However, the Agent mode can use the [Telerik Blazor MCP server](slug:ai-mcp-server).
1. Start your prompt with `@telerikblazor` and type your request. Make sure that `@telerikblazor` is recognized and highlighted, otherwise the extension may not be installed.
1. Verify that you see a label similar to **TelerikBlazor working...** or **TelerikBlazor generating response...** in the output.
1. Grant permission to the Telerik Blazor extension to read your workspace files.

Also check the general [AI Coding Assistant Recommendations](slug:ai-overview#recommendations) for more usage tips.

### Sample Prompts

The following list describes how your prompts may look like:

* &quot;`@telerikblazor` Generate a Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.&quot;
* &quot;`@telerikblazor` Generate a Telerik ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.&quot;
* &quot;`@telerikblazor` Show me sample code for a Telerik Blazor Grid with virtual scrolling for the rows and columns.&quot;

## Usage Limits

@[template](/_contentTemplates/common/ai-coding-assistant.md#number-of-requests)

## See Also 

* [GitHub Copilot Tutorials](https://github.com/features/copilot/tutorials)
* [Telerik Blazor MCP Server](slug:ai-mcp-server)
