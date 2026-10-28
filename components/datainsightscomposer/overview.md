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

* [Communication with AI](#ai-integration).
* [Dataset](slug:datainsightscomposer-data-binding) selection.
* [UI component selection, configuration and generation](slug:datainsightscomposer-components).

The DatAInsightsComposer enables developers to plug into the above processes and customize them.

## Installation

The Telerik DatAInsightsComposer component [depends on a separate NuGet package `Telerik.UI.for.Blazor.DatAInsightsComposer`](slug:getting-started-workflow-details#nuget-packages). Install the package alongside `Telerik.UI.for.Blazor`.

After package installation:

1. Register the composer service with `AddTelerikBlazorDatAInsightsComposer()`.
    >caption Program.cs

    ````C#.skip-repl
    // Telerik UI for Blazor
    builder.Services.AddTelerikBlazor();

    // Telerik DatAInsightsComposer
    builder.Services.AddTelerikBlazorDatAInsightsComposer();
    ````

1. Import the `DatAInsightsComposer` namespace in `_Imports.razor` or in specific `.razor` files.
    >caption _Imports.razor

    ````RAZOR.skip-repl
    @* Telerik UI for Blazor *@
    @using Telerik.Blazor
    @using Telerik.Blazor.Components

    @* Telerik DatAInsightsComposer *@
    @using Telerik.Blazor.Components.DatAInsightsComposer
    ````

## Creating Blazor Data Insights Composer

1. Register an `IChatClient` implementation in the app dependency injection container, or [provide a custom AI service transport](#ai-integration).
1. Create one or more [`DatasetDescriptor`s](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatasetDescriptor) with field metadata and data items.
1. Set the `<TelerikDatAInsightsComposer>` `Datasets` parameter to an `IEnumerable<DatasetDescriptor>`.

The following example makes a sales dataset available to the component.

>caption Basic Data Insights Composer

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = string.Empty;

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "monthly-sales",
            Description = "Total monthly sales",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            },
            Data = new List<DAICModel>()
            {
                new() { Month = "January", Revenue = 12000 },
                new() { Month = "February", Revenue = 14500 },
                new() { Month = "March", Revenue = 13800 }
            }
        }
    };

    public class DAICModel
    {
        public string Month { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }
}
````

## Datasets

The DatAInsightsComposer supports multiple datasets and the AI model selects the most appropriate one, depending on the user prompt and the dataset metadata. [Learn mode about how to define datasets and provide data](slug:datainsightscomposer-data-binding).

## Data Processing

The component applies generated filtering, sorting, paging, grouping, and aggregation to data, based on the user prompt. You can handle the [DatAInsightsComposer `OnDataProcess` event](slug:datainsightscomposer-events#ondataprocess) to process data in the host app instead.

## Visualization Components

The DatAInsightsComposer can generate a [Grid](slug:grid-overview), a [Chart](slug:components/chart/overview), or a [Gauge](slug:gauges-overview). The app can [configure component settings](slug:datainsightscomposer-components) declaratively in the DatAInsightsComposer definition, or at runtime in the DatAInsightsComposer events.

## AI Integration

The DatAInsightsComposer initiates AI service calls, including system prompt, context provision, and instructions about the expected response format.

By default, the DatAInsightsComposer uses an AI service that implements the [`IDatAInsightsComposerAIService`](slug:Telerik.Blazor.Components.DatAInsightsComposer.IDatAInsightsComposerAIService) interface and relies on a registered [`Microsoft.Extensions.AI.IChatClient`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient) in the app. You can override the service if you provide your own implementation of `IDatAInsightsComposerAIService` and register it after the default one:

>caption Program.cs

````C#.skip-repl
// Default Telerik DatAInsightsComposer AI service
builder.Services.AddTelerikBlazorDatAInsightsComposer();

// Custom Telerik DatAInsightsComposer AI service
builder.Services.AddScoped<IDatAInsightsComposerAIService, MyDatAInsightsAIService>();
````

## State

The DatAInsightsComposer allows the app to [get or set the component state](slug:datainsightscomposer-state) programmatically for greater flexibility.

## Events

Handle prompt, generation, data processing, history, save, and removal events to integrate the Composer with the host app. See the [Data Insights Composer events](slug:datainsightscomposer-events) article for details.

## Data Insights Composer API

For the complete list of component parameters, methods, and event arguments, see the [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer).

## Data Insights Composer Reference

The component exposes methods for programmatic operation. To call them, define a reference with the `@ref` directive. Blazor populates component references in `OnAfterRenderAsync`, so the reference is not available earlier.

>caption Define a reference to the Data Insights Composer

````RAZOR.skip-repl
<TelerikDatAInsightsComposer @ref="@DatAInsightsComposerRef" />

@code {
    private TelerikDatAInsightsComposer? DatAInsightsComposerRef;
}
````

## Next Steps

* [Provide Data to the Data Insights Composer](slug:datainsightscomposer-data-binding)
* [Configure Generated Components](slug:datainsightscomposer-components)
* [Handle Data Insights Composer events](slug:datainsightscomposer-events)

## See Also

* [Live Demos: DatAInsightsComposer](https://demos.telerik.com/blazor-ui/datainsightscomposer/overview)
* [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
