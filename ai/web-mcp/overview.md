---
title: Overview
page_title: WebMCP Tools Overview
description: Learn how Telerik UI for Blazor components expose their operations as Web MCP tools, allowing AI models to discover and control component state through the browser.
slug: web-mcp-overview
tags: web, mcp, tools, ai, model-context-protocol
published: True
tag: new
position: 1
---

# WebMCP Tools Overview

>important WebMCP is an experimental browser standard currently available behind a feature flag in Chromium-based browsers. The API and behavior may change as the standard evolves. Telerik UI for Blazor WebMCP integration is a preview feature.

[WebMCP](https://developer.chrome.com/blog/webmcp-epp) is a browser-native standard that provides a way for websites and web applications to expose structured tools to AI agents. It introduces the `navigator.modelContext` API, which lets components register operations that AI models can discover and invoke directly - instead of relying on DOM scraping or simulated clicks.

Telerik UI for Blazor components integrate with WebMCP to expose their functionality as structured tools. When enabled, a component registers tools for its supported operations like data operations, value changes, navigation, and more. AI assistants can then call these tools with typed parameters to manipulate the component state. For example, an AI agent can sort a Grid, navigate a Scheduler to a specific date, or set the Editor's content through the WebMCP protocol.

## Try It Out

To use WebMCP tools with Telerik Blazor components, you need a WebMCP-compatible AI agent. The Telerik WebMCP Extension provides a ready-to-use agent that connects to the registered tools in the browser.

<!-- TODO: replace with actual link -->
* [Download the Telerik WebMCP Extension](https://example.com/placeholder-extension-download)
* [Extension Documentation](slug:web-mcp-extension)

You can also explore WebMCP tools in action on the following live demo pages:

<!-- TODO: replace with actual demo URLs -->
* [Grid WebMCP Demo](https://example.com/placeholder-grid-demo)
* [Scheduler WebMCP Demo](https://example.com/placeholder-scheduler-demo)
* [Dashboard WebMCP Demo](https://example.com/placeholder-dashboard-demo)

## How to Enable WebMCP

### 1. Enable the Browser Flag

WebMCP requires the `navigator.modelContext` API. This API is currently available behind an experimental browser flag in Chromium-based browsers.

To enable it:

1. Open `chrome://flags` in your browser address bar.
1. Search for `#enable-webmcp-testing` (listed as **WebMCP for testing**).
1. Set the flag to **Enabled**.
1. Restart the browser.

This flag enables the WebMCP API and its associated testing interfaces, activating the `window.navigator.modelContext` object that components use to register and expose their tools.

### 2. Set EnableWebMcpTools to the Component

Each Telerik Blazor component that supports WebMCP has an `EnableWebMcpTools` parameter. Set it to `true` to register the component's tools with the browser.

>caption Enable WebMCP tools on a Button component

````RAZOR
<TelerikButton OnClick="@HandleClick"
               EnableWebMcpTools="true">
    Submit
</TelerikButton>

@code {
    private void HandleClick()
    {
        // The AI model can trigger this click through the registered "button-click" tool.
    }
}
````

When `EnableWebMcpTools` is `true`, the component registers its tools with default names and descriptions. Some tools are always registered (for example, `Highlight` and `ClearHighlight` on the Grid), while others depend on the component's configuration. For example, a Grid registers the `Sort` tool only when `Sortable` is `true`. For the full list of tools and their registration conditions, see the [Supported Components](slug:web-mcp-supported-components) article.

## How It Works

The following sequence describes the WebMCP tool lifecycle:

1. The developer sets `EnableWebMcpTools="true"` on the component.
1. The component inspects its current configuration (for example, whether filtering, sorting, or paging is enabled) and builds a list of tool descriptors.
1. The JavaScript layer calls `navigator.modelContext.registerTool()` for each enabled tool, providing a name, description, and JSON Schema for the input parameters.
1. When an AI model invokes a tool, the JavaScript handler routes the command back to the C# component through a `[JSInvokable]` method.
1. The component executes the operation and the UI re-renders automatically.

Tools are only registered when their corresponding feature is enabled on the component. For example, a Grid with `FilterMode="@GridFilterMode.None"` does not register the `Filter` tool.

## Common API

All components that support WebMCP follow the same configuration pattern.

### EnableWebMcpTools Parameter

The `EnableWebMcpTools` parameter is a `bool` on the root component. The default value is `false`. Set it to `true` to opt in. Even if `<ComponentWebMcpSettings>` is present, tools are not registered unless this parameter is `true`.

When `EnableWebMcpTools` is `true` without any settings, tools are registered based on the component's enabled features.

### Settings and Tool Overrides

Use the `<ComponentWebMcpSettings>` child component to customize tool registration. Place it inside the component's settings tag.

| Element | Description |
|---|---|
| `<ComponentWebMcpSettings>` | Accepts a `Name` parameter for [multi-instance disambiguation](#multi-instance-support) and a `<ComponentWebMcpTools>` RenderFragment for tool overrides. |
| `<ComponentWebMcpTool>` | Overrides a single tool's `Name`, `Description`, or `Enabled` state via its `Command` parameter. |

### ComponentWebMcpTool Parameters

The following parameters are the same across all component tool overrides (`GridWebMcpTool`, `SchedulerWebMcpTool`, and so on).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `Command` | Enum | - | The component operation this override applies to. |
| `Name` | `string` | `null` | Overrides the default tool name visible to the AI model. |
| `Description` | `string` | `null` | Overrides the default tool description visible to the AI model. |
| `Enabled` | `bool` | `true` | Whether this tool is registered. Set to `false` to suppress a tool. |

>caption Customize tool registration on a Grid

````RAZOR
<TelerikGrid Data="@GridData"
             EnableWebMcpTools="true"
             FilterMode="@GridFilterMode.FilterRow"
             Sortable="true"
             Pageable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Sales">
            <GridWebMcpTools>
                <GridWebMcpTool Command="@GridWebMcpToolCommand.Filter"
                                Description="Filter the sales data grid by a column." />
                <GridWebMcpTool Command="@GridWebMcpToolCommand.ExportExcel"
                                Enabled="false" />
            </GridWebMcpTools>
        </GridWebMcpSettings>
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>()
    {
        new Product { Name = "Product 1", Price = 9.99m },
        new Product { Name = "Product 2", Price = 19.99m },
        new Product { Name = "Product 3", Price = 29.99m }
    };

    public class Product
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
````

In this example:

* The `Filter` tool uses a custom description instead of the default.
* The `ExportExcel` tool is disabled and will not be registered.
* All other tools that match the Grid's enabled features (sorting, paging) are registered with their default names and descriptions.

### Multi-Instance Support

When multiple instances of the same component exist on a page, use the `Name` parameter on `<ComponentWebMcpSettings>` to disambiguate their tools.

* Tool names are prefixed with the `Name` value. For example, `"Sales"` produces `sales-grid-filter`, `sales-grid-sort`, and so on.
* Tool descriptions are annotated with the name for AI model context.

>caption Two Grid instances on the same page with distinct WebMCP tool names

````RAZOR
<TelerikGrid Data="@SalesData"
             EnableWebMcpTools="true"
             Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Sales" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(SaleItem.Region)" />
        <GridColumn Field="@nameof(SaleItem.Revenue)" />
    </GridColumns>
</TelerikGrid>

<TelerikGrid Data="@InventoryData"
             EnableWebMcpTools="true"
             Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Inventory" />
    </GridSettings>
    <GridColumns>
        <GridColumn Field="@nameof(InventoryItem.Product)" />
        <GridColumn Field="@nameof(InventoryItem.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SaleItem> SalesData { get; set; } = new();
    private List<InventoryItem> InventoryData { get; set; } = new();

    public class SaleItem
    {
        public string Region { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }

    public class InventoryItem
    {
        public string Product { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
````

The AI model sees `sales-grid-sort` and `inventory-grid-sort` as separate tools and can target each Grid independently.

## Supported Components

For the full list of components, their available tools, and tool conditions, see [WebMCP Supported Components](slug:web-mcp-supported-components).

## Next Steps

* [WebMCP Supported Components](slug:web-mcp-supported-components)
* [Telerik WebMCP Extension](slug:web-mcp-extension)
