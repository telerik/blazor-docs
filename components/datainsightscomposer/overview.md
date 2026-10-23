---
title: Overview
page_title: Data Insights Composer Overview
description: Learn how the Telerik Data Insights Composer for Blazor turns natural-language prompts into data visualizations.
slug: datainsightscomposer-overview
tags: telerik, blazor, data insights composer, AI, data visualization
published: True
position: 0
components: ["datainsightscomposer"]
---

# Blazor Data Insights Composer Overview

The [Data Insights Composer for Blazor](https://www.telerik.com/blazor-ui) lets users describe a data visualization in natural language. The component processes the user prompt through an AI service and renders other Telerik Blazor data components, such as [Grid](slug:grid-overview), [Chart](slug:components/chart/overview), or [Gauge](slug:gauges-overview). The host app supplies dataset metadata and can customize how the component processes data.

The DatAInsightsComposer component abstracts the following processes:

* AI orchestration
* Dataset selection
* UI component selection, configuration and generation

The DatAInsightsComposer enables developers to plug into the above processes and customize them.

>tip The DatAInsightsComposer sends only dataset field metadata to the AI service. It does not send the actual data items.

## Installation

The Telerik DatAInsightsComposer component [depends on a separate NuGet package `Telerik.UI.for.Blazor.DatAInsightsComposer`](slug:getting-started-workflow-details#nuget-packages). Install the package alongside `Telerik.UI.for.Blazor`.

After package installation:

1. Register the composer service with `AddTelerikBlazorDatAInsightsComposer()`.
    >caption Program.cs

    ````C#.skip-repl
    builder.Services.AddTelerikBlazor();
    builder.Services.AddTelerikBlazorDatAInsightsComposer();
    ````
1. Optionally, override the base service interface [`IDatAInsightsComposerAIService`](slug:Telerik.Blazor.Components.DatAInsightsComposer.IDatAInsightsComposerAIService) and register the derived service afterwards:
    >caption Program.cs

    ````C#.skip-repl
    builder.Services.AddTelerikBlazor();
    builder.Services.AddTelerikBlazorDatAInsightsComposer();
    builder.Services.AddScoped<IDatAInsightsComposerAIService, MyDatAInsightsAIService>();
    ````

1. Import the `DatAInsightsComposer` namespace in `_Imports.razor` or in specific `.razor` files.
    >caption _Imports.razor

    ````RAZOR.skip-repl
    @using Telerik.Blazor
    @using Telerik.Blazor.Components
    @using Telerik.Blazor.Components.DatAInsightsComposer
    ````

## Creating Blazor Data Insights Composer

1. Register an `IChatClient` implementation in the app dependency injection container, or provide a custom AI service transport.
1. Create a `DatasetDescriptor` with field metadata and, when local rendering needs it, the dataset's data rows.
1. Set the `Datasets` parameter on the `<TelerikDatAInsightsComposer>` component.

The following example makes a sales dataset available to the component:

>caption Basic configuration of the Data Insights Composer

````RAZOR
<TelerikDatAInsightsComposer Datasets="@Datasets" />

@code {
    private List<DatasetDescriptor> Datasets { get; } = new()
    {
        new DatasetDescriptor
        {
            Id = "monthly-sales",
            Description = "Monthly sales totals",
            Fields = new List<DatasetFieldDescriptor>
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            },
            Data = new List<object>
            {
                new { Month = "January", Revenue = 12000 },
                new { Month = "February", Revenue = 14500 },
                new { Month = "March", Revenue = 13800 }
            }
        }
    };
}
````

## Multiple Datasets and Visualizations

Provide one or more datasets. For multiple datasets, the AI can select the dataset and visualization for each result. A response can contain more than one component configuration.

## Supported Visualization Types

The Composer can generate a [Grid](slug:grid-overview), a [Chart](slug:components/chart/overview), or a gauge from the [gauge family](slug:gauges-overview). Supported chart types include bar, column, line, area, pie, donut, and scatter charts. Supported gauge types are LinearGauge, RadialGauge, CircularGauge, and ArcGauge.

## Data Processing

The component applies generated filtering, sorting, grouping, aggregation, and paging settings to [Grid](slug:grid-overview) and [Chart](slug:components/chart/overview) data. Handle the [`OnDataProcess` event](slug:datainsightscomposer-events#ondataprocess) to process data in the host app instead.

## AI Backend Integration

The default AI service uses the `IChatClient` abstraction from **Microsoft.Extensions.AI**. You can also override the service's request and response transport methods to call an external backend without using `IChatClient`.

## Configuration and State

Use declarative configuration settings to constrain supported [Grid](slug:grid-overview) and [Chart](slug:components/chart/overview) options before the AI request. The component also provides a method to restore its prompt and generated component history.

## Events

Handle prompt, generation, data processing, history, save, and removal events to integrate the Composer with the host app. See the [Data Insights Composer events](slug:datainsightscomposer-events) article for details.

## Data Insights Composer API

For the complete list of component parameters, methods, and event arguments, see the [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer).

## Data Insights Composer Reference

The component exposes methods for programmatic operation, including `SetStateAsync`. Define a reference with the `@ref` directive. Blazor populates component references in `OnAfterRenderAsync`, so the reference is not available earlier.

>caption Define a reference to the Data Insights Composer

````RAZOR.skip-repl
<TelerikDatAInsightsComposer @ref="@DatAInsightsComposerRef" />

@code {
    private TelerikDatAInsightsComposer? DatAInsightsComposerRef { get; set; }
}
````

## Next Steps

* [Handle Data Insights Composer events](slug:datainsightscomposer-events)

## See Also

* [Live Demos: DatAInsightsComposer](https://demos.telerik.com/blazor-ui/datainsightscomposer/overview)
* [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
