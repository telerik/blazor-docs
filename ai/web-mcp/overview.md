---
title: Overview
page_title: WebMCP Tools Overview
description: Learn how Telerik UI for Blazor components expose their operations as Web MCP tools, allowing AI models to discover and control component state through the browser.
slug: web-mcp-overview
tags: web, mcp, tools, ai, model-context-protocol
published: True
position: 1
---

# WebMCP Tools Overview

>important WebMCP is an experimental browser standard. It is currently available behind a feature flag in some Chromium-based browsers. The API and behavior may change as the standard evolves. The Telerik UI for Blazor WebMCP integration is a preview feature.

[WebMCP](https://developer.chrome.com/blog/webmcp-epp) is a browser standard that lets web applications expose actions to AI agents running in the browser. Instead of the AI reading the DOM or simulating clicks, each component tells the AI exactly what it can do.

Telerik UI for Blazor components support WebMCP out-of-the-box. When enabled, a component registers its operations (sorting, filtering, navigation, value changes, and more) as tools that an AI agent can call directly. For example, an AI can sort a Grid, navigate a Scheduler to a date, or set a value in an input — all from a natural language prompt.

## How It Works

When a component has WebMCP enabled, a connected AI agent can control it through natural language. The user types a prompt and the component reacts without the need to click buttons and fill-in forms.

For example:

* *"Show only orders from last month"* — the Grid filters accordingly.
* *"Go to next week"* — the Scheduler navigates forward.
* *"Set the discount to 15"* — the NumericTextBox updates its value.

The result is the same as if the user had interacted with the UI directly.

To learn more, visit the [AI-Ready Components](https://www.telerik.com/ai-components) page and see the following videos below.

<div style="display: flex; gap: 1em; flex-wrap: wrap;">

<div>
<p><strong>AI Agent-Ready Dashboard</strong></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/YSbnMzPu9SM" title="AI Agent-Ready Dashboard powered by Telerik and Kendo UI with WebMCP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<div>
<p><strong>Telerik and Kendo UI Workflows</strong></p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/UPzLqOjUsuM" title="Telerik and Kendo UI Workflows Powered by WebMCP" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

</div>

## Enable Browser WebMCP

### 1. Enable the Browser Flag

WebMCP is currently available behind a browser flag in Chromium-based browsers.

1. Open `chrome://flags/#enable-webmcp-testing` in your Chromium browser (these URLs cannot be clickable).
1. You should see **WebMCP for testing**. Set the flag to **Enabled**.
1. Restart the browser.

### 2. Install the Telerik WebMCP Extension

The browser flag enables the WebMCP API, but you still need an AI client that can discover and call the registered tools. The Telerik WebMCP Extension is a browser extension that provides a chat interface connected to an AI model. It reads the tools on the current page and invokes them based on your prompts.

1. [Download the Telerik WebMCP Browser Extension](./assets/telerik-kendo-browser-extension.zip).
1. Unzip the file.
1. Open `chrome://extensions/` in your Chromium browser (these URLs cannot be clickable).
1. Enable **Developer mode** at the top-right.
1. Click the **Load unpacked** button at the top-left and select the folder that holds the unzipped extension.

See the [Extension Documentation](slug:web-mcp-extension) for details on the extension features and settings.

### 3. Try the Demos

 Once you enable WebMCP in your browser and [configure the Telerik WebMCP browser extension](slug:web-mcp-extension#settings), you can explore WebMCP in action:

* [WebMCP Operations Hub Demo](https://demos.telerik.com/blazor-ui/marketing-campaigns/webmcp-operations-hub)
* [Zero Click Dashboard Demo](https://demos.telerik.com/blazor-ui/marketing-campaigns/webmcp-zero-click-dashboard)

## Enable WebWMCP for Telerik Components

All Telerik Blazor components that support WebMCP follow the same configuration pattern.

### EnableWebMcpTools Parameter

Each Telerik Blazor component that supports WebMCP has an `EnableWebMcpTools` parameter. Set it to `true` to register the component's tools with the browser.

### Settings and Tool Overrides

Components register tools based on their configuration. For example, the Grid registers the `grid-sort` tool only when `Sortable` is `true`. Some tools like `grid-highlight` are always registered. See [Supported Components](slug:web-mcp-supported-components) for a list of all component tools and their registration conditions.

Some tools are never registered by default even when `EnableWebMcpTools` is `true`. For example, `grid-get-data` returns all Grid rows to the AI model, which can expose sensitive data or bloat the AI context. Such tools are useful when you want the AI to read and process your data, but they require an explicit opt-in. Set `Enabled="true"` on the tool override in the component settings. See the [example below](#componentwebmcptool-parameters).

Each component has a corresponding settings element named after it, for example:

* `<GridWebMcpSettings>` for the Grid
* `<SchedulerWebMcpSettings>` for the Scheduler, and so on.

In this article, `Component` is a placeholder for the actual component name. Add the WebMCP tool settings inside the component's settings tag, for example, place `<GridWebMcpSettings>` inside `<GridSettings>`.

The `ComponentWebMcpSettings` allow you to:

* Set a `Name` to tell apart multiple instances of the same component on the same page. See [Multi-Instance Support](#multiple-instances-on-the-same-page).
* Override individual tools through `<ComponentWebMcpTools>` and `<ComponentWebMcpTool>` child elements.

### ComponentWebMcpTool Parameters

Each component has a dedicated tool override element, for example, `<GridWebMcpTool>`. Place one tool tag inside `<ComponentWebMcpTools>` for each tool you want to configure.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Command` | `GridWebMcpToolCommand` `enum` | Identifies which tool this override applies to. |
| `Name` | `string` | Overrides the default tool name. |
| `Description` | `string` | Overrides the default tool description. |
| `Enabled` | `bool` <br /> (`true` by default) | Whether the tool is registered. Set to `false` to disable it. For opt-in tools like `grid-get-data`, the default is `false` — set it to `true` to enable them. |

>tip Components provide default descriptions for each tool. However, to ensure smooth and more deterministic user experience, you can customize the description of each enabled tool and add more context for the AI model. For example, provide descriptions that reflect your data, as users rarely mention component names in their prompts. For example, *"show me sales above $500"* should match a filter tool on a Sales table, not just any filter. Thus, the `Filter` tool description of the Grid should mention "sales".

In the following example:

* The `Filter` tool uses a custom description.
* The `ExportExcel` tool is disabled and will not be registered.
* The `GetData` tool is explicitly enabled. It is disabled by default because it returns raw grid data to the AI model, which may include sensitive information. Only enable it when the data is safe to expose.
* All other tools that match the Grid's enabled features (sorting, paging) are registered with their default names and descriptions.

>caption Customize tool registrations in a Telerik Blazor Grid

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
                                Description="Get the records from the sales data grid."
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

### Multiple Instances on the Same Page

If two instances of the same component are on the same page, they will register tools with identical names and the AI will not know which one to use. Set `Name` on `<ComponentWebMcpSettings>` to give each instance a unique prefix.

For example, with `Name="Sales"` and `Name="Inventory"`, the tools become `sales-grid-sort` and `inventory-grid-sort`. The AI can now target each instance separately.

>caption Set distinct WebMCP tool names to two Grid instances on the same page

````RAZOR.skip-repl
<TelerikGrid Data="@SalesData" EnableWebMcpTools="true" Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Sales" />
    </GridSettings>
</TelerikGrid>

<TelerikGrid Data="@InventoryData" EnableWebMcpTools="true" Sortable="true">
    <GridSettings>
        <GridWebMcpSettings Name="Inventory" />
    </GridSettings>
</TelerikGrid>
````

The AI sees `sales-grid-sort` and `inventory-grid-sort` as separate tools and targets each independently.

## Supported Components

For the full list of components, their available tools, and tool conditions, see [WebMCP Supported Components](slug:web-mcp-supported-components).

## Next Steps

* [Learn about the Telerik WebMCP Extension](slug:web-mcp-extension)
* [Find out which Telerik Blazor components support WebMCP](slug:web-mcp-supported-components)
