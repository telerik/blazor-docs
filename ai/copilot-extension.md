---
title: Copilot Extension
page_title: Telerik Blazor GitHub Copilot Extension
description: Learn how to add and use the Telerik Blazor GitHub Copilot extension as a Blazor AI coding assistant and code generator for better developer productivity. The Telerik Blazor GitHub Copilot extension provides proprietary context about Telerik UI for Blazor to AI-powered software.
slug: ai-copilot-extension
tags: telerik,blazor,ai
published: True
position: 10
---

# Telerik Blazor GitHub Copilot Extension

The Telerik Blazor [GitHub Copilot](https://github.com/features/copilot) extension provides proprietary context for the [Telerik UI for Blazor components](https://www.telerik.com/blazor-ui). The extension works as a Blazor AI code generator and can help you reach new levels of developer productivity. You can get useful tips and generate tailored code snippets that include Telerik UI for Blazor components and API.

## Prerequisites

To use the Telerik GitHub Copilot extension for Blazor, you need to have:

* An active [GitHub Copilot](https://github.com/features/copilot) subscription. You can enable or configure GitHub Copilot on the [Copilot Settings page in your GitHub account](https://github.com/settings/copilot).
* A [Telerik user account](https://www.telerik.com/account/).
* An active [DevCraft or Telerik UI for Blazor license](https://www.telerik.com/purchase/blazor-ui) or a [Telerik UI for Blazor trial](https://www.telerik.com/blazor-ui).

## Installation

To install the Telerik Blazor Copilot extension:

1. Go to the [TelerikBlazor GitHub App](https://github.com/apps/telerikblazor) page and click the **Install** button.
1. You will see a list that includes your GitHub account and all GitHub organizations that you are part of. Normally, select your GitHub account.
1. Click the **Install &amp; Authorize** button. This will authorize the GitHub Copilot extension to integrate with your GitHub account.
1. Enter your GitHub password.
1. You will be redirected to telerik.com. Enter your Telerik account credentials if prompted. This will authorize the GitHub Copilot extension to integrate with your Telerik account.
1. Upon successful Telerik authentication, you will be redirected once again to a page that confirms successful Copilot extension installation.
1. Restart your [Copilot-enabled apps](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions#supported-clients-and-ides) (for example, Visual Studio and VS Code).
1. Start a new chat session in Copilot.

## Usage

To use the Telerik Blazor Copilot extension:

1. Open the GitHub Copilot chat window in your [Copilot-enabled app](https://docs.github.com/en/copilot/building-copilot-extensions/about-building-copilot-extensions#supported-clients-and-ides) (for example, Visual Studio or VS Code).
1. Make sure you are in **Ask** mode and not in **Edit** or **Agent** mode. The Edit and Agent modes do not use the Telerik Copilot extension. However, the Agent mode can use the [Telerik Blazor MCP server](slug:ai-mcp-server).
1. Start your prompt with `@telerikblazor` and type your request. Make sure that `@telerikblazor` is recognized and highlighted, otherwise the extension may not be installed.
1. Verify that you see a label similar to **TelerikBlazor working...** or **TelerikBlazor generating response...** in the output.
1. Grant permission to the Telerik Blazor extension to read your workspace files.
1. If you want to prompt for information or code that are not related to your previous prompts, it is a good practice to start a new session in a new chat window, so that the context is not polluted by irrelevant old information.

### Sample Prompts

The following list describes how your prompts may look like:

* `@telerikblazor` Generate a Grid with sorting and paging enabled. Bind the Grid to a Person model and provide dummy data.
* `@telerikblazor` Generate a Telerik ComboBox for Blazor that shows a list of products. Create a Product class and generate sample data.
* `@telerikblazor` Show me sample code for a Telerik Blazor Grid with virtual scrolling for the rows and columns.

## Number of Requests

> The usage limits below will take place after June 28, 2025. Until then, each customer with an active commercial or trial license can make up to 300 daily requests.

The Telerik Blazor Copilot extension allows the following maximum number of requests, depending on your [Telerik license type](https://www.telerik.com/purchase/faq/licensing-purchasing):

* Perpetual licenses: 50 requests per year
* Subscription licenses: 300 requests per day
* Trial licenses: 300 requests per trial per year. Activating the same trial for a new release does not grant additional 300 requests.

> All Telerik AI tools share a single request limit for your Telerik account. For example, the Telerik Copilot extension and the Telerik MCP server both take up from the same usage quota.

## See Also 

* [GitHub Copilot Tutorials](https://github.com/features/copilot/tutorials)
* [Telerik Blazor MCP Server](slug:ai-mcp-server)
