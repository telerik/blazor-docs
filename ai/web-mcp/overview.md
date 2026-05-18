---
title: Overview
page_title: WebMCP Tools Overview
description: Learn how Telerik UI for Blazor components expose their operations as Web MCP tools, allowing AI models to discover and control component state through the browser.
slug: web-mcp-overview
tags: web, mcp, tools, ai, model-context-protocol
published: True
tag: preview
position: 1
---

# WebMCP Tools Overview

>important WebMCP is an experimental browser standard currently available behind a feature flag in some Chromium-based browsers. The API and behavior may change as the standard evolves. The Telerik UI for Blazor WebMCP integration is a preview feature.

[WebMCP](https://developer.chrome.com/blog/webmcp-epp) is a browser standard that lets web applications expose actions to AI agents running in the browser. Instead of the AI reading the DOM or simulating clicks, each component tells the AI exactly what it can do.

Telerik UI for Blazor components support WebMCP out of the box. When enabled, a component registers its operations (sorting, filtering, navigation, value changes, and more) as tools that an AI agent can call directly. For example, an AI can sort a Grid, navigate a Scheduler to a date, or set a value in an input — all from a natural language prompt.

## How It Works

When a component has WebMCP enabled, a connected AI agent can control it through natural language. The user types a prompt and the component responds — no clicking, no form filling.

For example:

* *"Show only orders from last month"* — the Grid filters accordingly.
* *"Go to next week"* — the Scheduler navigates forward.
* *"Set the discount to 15"* — the NumericTextBox updates its value.

The result is the same as if the user had interacted with the UI directly.

## How to Enable WebMCP

### 1. Enable the Browser Flag

WebMCP is currently available behind a browser flag in Chromium-based browsers.

1. Open [`chrome://flags/#enable-webmcp-testing`](chrome://flags/#enable-webmcp-testing) in your browser (listed as **WebMCP for testing**).
1. Set the flag to **Enabled**.
1. Restart the browser.

### 2. Install the Telerik WebMCP Extension

The browser flag enables the WebMCP API, but you still need an AI client that can discover and call the registered tools. The Telerik WebMCP Extension is a browser extension that provides a chat interface connected to an AI model. It reads the tools on the current page and invokes them based on your prompts.

<!-- TODO: replace with actual link -->
[Download the Telerik WebMCP Extension](https://example.com/placeholder-extension-download) and see the [Extension Documentation](slug:web-mcp-extension) for setup instructions.

### 3. Try the Demos

Once you have the browser flag enabled and the extension installed, you can explore WebMCP in action:

* [WebMCP Operations Hub Demo](https://demos.telerik.com/blazor-ui/marketing-campaigns/webmcp-operations-hub)
* [Zero Click Dashboard Demo](https://demos.telerik.com/blazor-ui/marketing-campaigns/webmcp-zero-click-dashboard)

## Register Component Tools

Each Telerik Blazor component that supports WebMCP has an `EnableWebMcpTools` parameter. Set it to `true` to register the component's tools with the browser.

All components that support WebMCP follow the same configuration pattern.

### EnableWebMcpTools Parameter

The `EnableWebMcpTools` parameter is a `bool` on the root component. The default value is `false`. Set it to `true` to opt in.

Tools are registered based on the component's configuration — for example, `grid-sort` registers only when `Sortable` is `true`, while `grid-highlight` is always registered. For each tool and its registration condition, see [Supported Components](slug:web-mcp-supported-components).

Some tools are never registered by default even when `EnableWebMcpTools` is `true`. For example, `grid-get-data` returns all Grid rows to the AI model, which can expose sensitive data or bloat the AI context. Such tools are useful when you want the AI to read and process your data, but they require an explicit opt-in — set `Enabled="true"` on the tool override in the component settings. See the example below.

Even if `<ComponentWebMcpSettings>` is present, tools are not registered unless `EnableWebMcpTools` is `true`.

### Settings and Tool Overrides

Each component has a corresponding settings element named after it — for example, `<GridWebMcpSettings>` for the Grid and `<SchedulerWebMcpSettings>` for the Scheduler. In this article, `Component` is a placeholder for the actual component name. Place the settings element inside the component's `<Settings>` tag.

Use it to:
* Set a `Name` to tell apart multiple instances of the same component on the same page. See [Multi-Instance Support](#multi-instance-support).
* Override individual tools through `<ComponentWebMcpTools>` and `<ComponentWebMcpTool>` child elements.

### ComponentWebMcpTool Parameters

Similarly, each component has a dedicated tool override element — for example, `<GridWebMcpTool>`. Place one inside `<ComponentWebMcpTools>` for each tool you want to configure.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `Command` | Enum | - | Identifies which tool this override applies to. |
| `Name` | `string` | `null` | Overrides the default tool name. |
| `Description` | `string` | `null` | Overrides the default tool description. Write a description that reflects your data — users rarely say component names in their prompts. For example, *"show me orders above $500"* should match a filter tool on an orders table, not just any filter. |
| `Enabled` | `bool` | `true` | Whether the tool is registered. Set to `false` to disable it. For opt-in tools like `grid-get-data`, the default is `false` — set it to `true` to enable them. |

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
                <GridWebMcpTool Command="@GridWebMcpToolCommand.GetData"
                                Enabled="true" />
            </GridWebMcpTools>
        </GridWebMcpSettings>
    </GridSettings>

    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
    </GridColumns>

    <GridToolBar>
        <GridToolBarExcelExportTool>
            Export to Excel
        </GridToolBarExcelExportTool>
    </GridToolBar>

    <GridExport>
        <GridExcelExport FileName="telerik-grid-export" />
    </GridExport>
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
* The `grid-get-data` tool is explicitly enabled. It is disabled by default because it returns raw grid data to the AI model, which may include sensitive information. Only enable it when the data is safe to expose.
* All other tools that match the Grid's enabled features (sorting, paging) are registered with their default names and descriptions.

### Multiple Instances on the Same Page

If two instances of the same component are on the same page, they would register tools with identical names — and the AI would not know which one to use. Set `Name` on `<ComponentWebMcpSettings>` to give each instance a unique prefix.

For example, with `Name="Sales"` and `Name="Inventory"`, the tools become `sales-grid-sort` and `inventory-grid-sort`. The AI can now target each instance separately.

>caption Two Grid instances on the same page with distinct WebMCP tool names

````RAZOR
<TelerikGrid Data="@SalesData" EnableWebMcpTools="true" Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Sales" />
    </GridSettings>
    ...
</TelerikGrid>

<TelerikGrid Data="@InventoryData" EnableWebMcpTools="true" Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Inventory" />
    </GridSettings>
    ...
</TelerikGrid>
````

The AI sees `sales-grid-sort` and `inventory-grid-sort` as separate tools and targets each independently.

## Supported Components

For the full list of components, their available tools, and tool conditions, see [WebMCP Supported Components](slug:web-mcp-supported-components).

## Next Steps

* [Telerik WebMCP Extension](slug:web-mcp-extension)
* [WebMCP Supported Components](slug:web-mcp-supported-components)
