---
title: Extension
page_title: Telerik WebMCP Extension
description: Learn about the Telerik WebMCP Extension, a browser-based chat UI that connects AI models to WebMCP tools registered by Telerik UI for Blazor components.
slug: web-mcp-extension
tags: web, mcp, extension, chat, ai, browser
published: True
tag: new
position: 3
---

# Telerik WebMCP Extension

> The Telerik WebMCP Extension is currently in beta. Features and behavior may change before the final release.

The Telerik WebMCP Extension is a browser extension that provides a chat interface for interacting with AI models. It connects to all [WebMCP tools](slug:web-mcp-overview) registered on the current page and allows AI models to discover and invoke those tools through natural language conversation.

<!-- TODO: replace with actual screenshot -->
![Telerik WebMCP Extension](images/extension-chat-placeholder.png)

<!-- TODO: replace with actual download link -->
[Download the Telerik WebMCP Extension](https://example.com/placeholder-extension-download)

## Quick Setup

1. Download and install the extension from the link above.
1. Enable the WebMCP browser flag - open `chrome://flags`, search for `#enable-webmcp-testing`, set it to **Enabled**, and restart the browser.
1. Open the extension from the browser toolbar.
1. Go to the **Settings** tab and configure your [API credentials](#api-credentials) (OpenAI, Google Gemini, Anthropic, or Azure OpenAI).
1. Navigate to a page that has Telerik Blazor components with `EnableWebMcpTools="true"`.
1. Open the **Chat** tab and start a conversation.

The AI model automatically discovers the tools registered on the current page and can invoke them based on your prompts.

## Extension Tabs

The extension toolbar contains four tabs:

| Tab | Purpose |
|---|---|
| **Chat** | The main conversation interface. Send prompts and the AI model invokes WebMCP tools on the page. |
| **Tools** | Inspect all WebMCP tools registered on the current page. View tool names, descriptions, and parameters. |
| **Usage** | Track AI usage metrics - input tokens, output tokens, and total consumption across conversations. |
| **Settings** | Configure API credentials, prompting behavior, page access, extension behavior, and history preferences. |

### Chat

The Chat tab is the primary interface. Type a natural language prompt and the AI model determines which registered tools to call. Tool invocations happen on the current page and results are streamed back into the conversation.

### Tools

The Tools tab displays all WebMCP tools discovered on the current page. Use it to verify that your components are registering the expected tools.

For more information about how components register tools and under what conditions, see [WebMCP Supported Components](slug:web-mcp-supported-components).

## Settings

The Settings tab is organized into five sections.

### API Credentials

Register an AI model provider that the extension uses to process conversations and invoke tools. The following providers are supported:

* **OpenAI** - provide your OpenAI API key and select a model.
* **Google Gemini** - provide your Gemini API key.
* **Anthropic** - provide your Anthropic API key.
* **Azure OpenAI** - provide your Azure OpenAI endpoint, deployment name, and API key.

### Prompting

Set custom system instructions that are sent with every conversation. Use this to define rules specific to your application and use case.

For example, you can instruct the model to always filter the Grid before exporting, or to navigate the Scheduler to today's date before creating an event.

### Page Access

Control which pages the extension can inspect and where page tools can run.

Configure allowed origins - one entry per line. The extension only inspects pages and invokes tools on matching origins. All other origins are denied by default.

Accepted formats:

* Full origins - `https://example.com`
* Bare hostnames - `example.com`
* Host with port - `localhost:3000`
* Wildcard subdomains - `*.example.com`

### Behavior

Control how messages are sent and how the transcript behaves.

| Setting | Description |
|---|---|
| **Auto-scroll** | Automatically scroll to the latest message while streaming. |
| **Compress tool history** | Collapse completed tool-call sequences to reduce tokens sent on each request. |
| **Show token usage** | Show per-message token counts. Usage is always tracked and visible in the Usage tab. |
| **Auto-approve tool calls** | Skip manual approval prompts and run page tools immediately. Leave this off unless you trust the current workflow. |
| **Max tool calls before continue** | After this many tool calls in one turn, the extension pauses and asks you to continue. Default is 20. |

### History

Choose whether conversations are saved and how long they are kept.

| Setting | Description |
|---|---|
| **Save history** | Persist conversations so you can reopen them later. |
| **Retain tool outputs** | Include tool call results when saving a conversation. Disable to save space. |
| **Clear history** | Manually delete all saved conversations (never auto-deletes). |

## Next Steps

* [WebMCP Tools Overview](slug:web-mcp-overview) - learn how components expose tools to the extension.
* [WebMCP Supported Components](slug:web-mcp-supported-components) - see all available tools per component.

## See Also

* [WebMCP Tools Overview](slug:web-mcp-overview)
* [Web Model Context Protocol Specification](https://anthropic.com/research/model-context-protocol)
