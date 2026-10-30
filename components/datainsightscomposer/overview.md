---
title: Overview
page_title: DatAInsightsComposer Overview
description: Learn how the Telerik DatAInsightsComposer for Blazor turns natural-language prompts into data visualizations.
slug: datainsightscomposer-overview
tags: telerik, blazor, datainsightscomposer, AI, data visualization
published: True
position: 0
components: ["datainsightscomposer"]
---

# Blazor DatAInsightsComposer Overview

The [DatAInsightsComposer for Blazor](https://www.telerik.com/blazor-ui) lets users describe and create a data visualization in natural language. The component processes the user prompt through an AI service and renders other Telerik Blazor data components, such as [Grid](slug:grid-overview), [Chart](slug:components/chart/overview), or [Gauge](slug:gauges-overview). The host app supplies dataset metadata and can customize how the component processes data.

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

## Creating Blazor DatAInsightsComposer

1. Register an `IChatClient` implementation in the app dependency injection container, or [provide a custom AI service transport](#ai-integration).
1. Create one or more [`DatasetDescriptor`](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatasetDescriptor) objects with field metadata. Optionally, also populate the data items initially.
1. Set the `<TelerikDatAInsightsComposer>` `Datasets` parameter to an `IEnumerable<DatasetDescriptor>`.

>caption Basic DatAInsightsComposer

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

## User Interface

By default, the initial UI consists of the following elements:

* Title
* PromptBox with two different placeholders that encourage the user to type their prompt and then refine it.
* Datasets panel inside the PromptBox that shows all datasets with their fields in a dropdown.
* Datasets list that shows all datasets as chips below the PromptBox.
* **Generate** button to submit the user prompt. While the AI response is in progress, the same button can abort the request.

You can customize the title, placeholders, and datasets information visibiliy through the respective [DatAInsightsComposer parameters](slug:Telerik.Blazor.Components.DatAInsightsComposer.TelerikDatAInsightsComposer).

Once the user submits a prompt, the DatAInsightsComposer generates a UI component in a new panel below the PromptBox that includes:

* Title that is generated, based on the user prompt.
* The generated UI component (Grid, Chart, Gauge).
* **Confirm** and **Discard** buttons to accept or reject the generated component and its configuration.
* **History** button to show all prompts from the current session in a dropdown and restore the respective generated components.

You can customize the title and generated UI component settings in the [DatAInsightsComposer `OnGenerate` event](slug:datainsightscomposer-events#ongenerate).

## Datasets

The DatAInsightsComposer supports multiple datasets and the AI model selects the most appropriate one, depending on the user prompt and the dataset metadata. The AI model does not receive the data items from the datasets. [Learn mode about how to define datasets and provide data](slug:datainsightscomposer-data-binding).

## Data Processing

The DatAInsightsComposer applies generated filtering, sorting, paging, grouping, and aggregations to data, based on the user prompts. The AI model suggests the data operations to perform, but has no access to the data itself. You can handle the [DatAInsightsComposer `OnDataProcess` event](slug:datainsightscomposer-events#ondataprocess) to process data manually or load it on demand.

## Visualization Components

The DatAInsightsComposer can generate a [Grid](slug:grid-overview), a [Chart](slug:components/chart/overview), or a [Gauge](slug:gauges-overview). The app can [configure component settings](slug:datainsightscomposer-components) declaratively in the DatAInsightsComposer definition, or at runtime in the DatAInsightsComposer [`OnGenerate` event](slug:datainsightscomposer-events#ongenerate).

## AI Integration

The DatAInsightsComposer initiates AI service calls, including system prompt, context provision, and instructions about the expected response format.

By default, the DatAInsightsComposer uses the built-in [`DatAInsightsComposerAIService`](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatAInsightsComposerAIService) that implements the [`IDatAInsightsComposerAIService`](slug:Telerik.Blazor.Components.DatAInsightsComposer.IDatAInsightsComposerAIService) interface and relies on a registered [`Microsoft.Extensions.AI.IChatClient`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.ai.ichatclient) in the app. You can inherit and customize the `DatAInsightsComposerAIService`, or implement your own `IDatAInsightsComposerAIService`. In either case, register the new AI service after the default one:

>caption Program.cs

````C#.skip-repl
// Default Telerik DatAInsightsComposer AI service
builder.Services.AddTelerikBlazorDatAInsightsComposer();

// Custom Telerik DatAInsightsComposer AI service
builder.Services.AddScoped<IDatAInsightsComposerAIService, MyDatAInsightsAIService>();
````

## State

The DatAInsightsComposer allows the app to [get or set the component state](slug:datainsightscomposer-state) programmatically for greater flexibility.

## Security

See the [Security](slug:datainsightscomposer-security) article to find out how the DatAInsightsComposer protects the application and data security, and what the app can or should contribute in this regard.

## Events

Handle prompt, generation, data processing, history, confirm, and remove events for greater app flexibility. See the [DatAInsightsComposer events](slug:datainsightscomposer-events) article for details.

## DatAInsightsComposer API

See the [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.DatAInsightsComposer.TelerikDatAInsightsComposer) for the complete list of parameters, methods, and events.

## DatAInsightsComposer Reference

The DatAInsightsComposer exposes methods for programmatic operation. To call them, define a reference with the `@ref` directive. Blazor populates component references in `OnAfterRenderAsync`, so the reference is not available earlier.

>caption Define a reference to the DatAInsightsComposer

````RAZOR.skip-repl
<TelerikDatAInsightsComposer @ref="@DatAInsightsComposerRef" />

@code {
    private TelerikDatAInsightsComposer? DatAInsightsComposerRef;
}
````

## Next Steps

* [Provide Data to the DatAInsightsComposer](slug:datainsightscomposer-data-binding)
* [Configure Generated Components](slug:datainsightscomposer-components)
* [Implement Best Security Practices](slug:datainsightscomposer-security)
* [Handle DatAInsightsComposer events](slug:datainsightscomposer-events)

## See Also

* [Live Demos: DatAInsightsComposer](https://demos.telerik.com/blazor-ui/datainsightscomposer/overview)
* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.DatAInsightsComposer.TelerikDatAInsightsComposer)
