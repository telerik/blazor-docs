---
title: Events
page_title: Data Insights Composer Events
description: Learn about the Telerik Data Insights Composer for Blazor events and their event arguments.
slug: datainsightscomposer-events
tags: telerik, blazor, data insights composer, AI, events
published: True
position: 100
components: ["datainsightscomposer"]
---

# Data Insights Composer Events

This article describes the events that the Telerik Data Insights Composer for Blazor raises:

* [`OnDataProcess`](#ondataprocess)
* [`OnGenerate`](#ongenerate)
* [`OnHistoryItemCreate`](#onhistoryitemcreate)
* [`OnHistoryItemRestore`](#onhistoryitemrestore)
* [`OnPromptCancel`](#onpromptcancel)
* [`OnPromptSubmit`](#onpromptsubmit)
* [`OnRemove`](#onremove)
* [`OnSave`](#onsave)
* [`PromptChanged`](#promptchanged)

## OnDataProcess

The `OnDataProcess` event fires once for each generated component, before that component renders. For a response with a Grid and a Chart, the event fires twice. The `OnGenerate` event fires first after the configuration is generated or refined successfully.

The handler receives a [`DatAInsightsComposerDataProcessEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerDataProcessEventArgs) argument. Use its `ComponentType`, `Config`, and `Dataset` properties to inspect the current result. Set `ProcessedData` to provide data that the component uses as-is. Leave it unset to use the built-in data processing.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnDataProcess="@OnDAICDataProcess" />

@code {
    private Task OnDAICDataProcess(DatAInsightsComposerDataProcessEventArgs args)
    {
        if (args.ComponentType != ComponentType.Grid || args.DataSourceRequest == null)
        {
            return Task.CompletedTask;
        }

        var result = args.Dataset.Data!.AsQueryable().ToDataSourceResult(args.DataSourceRequest);
        args.ProcessedData = result.Data.Cast<object>().ToList();

        return Task.CompletedTask;
    }
}
````

## OnGenerate

The `OnGenerate` event fires after the AI generates or refines a valid component configuration. The handler receives a [`DatAInsightsComposerGenerateEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerGenerateEventArgs) argument with the prompt, serialized JSON response, and generated configurations.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnGenerate="@OnDAICGenerate" />

@code {
    private Task OnDAICGenerate(DatAInsightsComposerGenerateEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnHistoryItemCreate

The `OnHistoryItemCreate` event fires when the component creates a history item for an accepted generated result. The handler receives a [`DatAInsightsComposerHistoryItemCreateEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerHistoryItemCreateEventArgs) argument. Its `Item` property contains the created history item.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnHistoryItemCreate="@OnDAICHistoryItemCreate" />

@code {
    private Task OnDAICHistoryItemCreate(DatAInsightsComposerHistoryItemCreateEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnHistoryItemRestore

The `OnHistoryItemRestore` event fires when the user restores a history item. The handler receives a [`DatAInsightsComposerHistoryItemRestoreEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerHistoryItemRestoreEventArgs) argument. Its `Item` property contains the restored history item.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnHistoryItemRestore="@OnDAICHistoryItemRestore" />

@code {
    private Task OnDAICHistoryItemRestore(DatAInsightsComposerHistoryItemRestoreEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnPromptCancel

The `OnPromptCancel` event fires when the user clicks **Stop** while a prompt request is in progress. The event fires before cancellation. The handler receives a [`DatAInsightsComposerPromptCancelEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerPromptCancelEventArgs) argument. Set its `IsCancelled` property to `false` to keep the request running.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnPromptCancel="@OnDAICPromptCancel" />

@code {
    private Task OnDAICPromptCancel(DatAInsightsComposerPromptCancelEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnPromptSubmit

The `OnPromptSubmit` event fires when the user submits a prompt while no dataset is available. Use this event to provide a dataset or handle the request in the host app. The handler receives a [`DatAInsightsComposerPromptSubmitEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerPromptSubmitEventArgs) argument with the prompt and an `IsCancelled` property.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnPromptSubmit="@OnDAICPromptSubmit" />

@code {
    private Task OnDAICPromptSubmit(DatAInsightsComposerPromptSubmitEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnRemove

The `OnRemove` event fires when the user removes a generated component. The handler receives a [`DatAInsightsComposerRemoveEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerRemoveEventArgs) argument with the component configuration and matching dataset descriptor.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnRemove="@OnDAICRemove" />

@code {
    private Task OnDAICRemove(DatAInsightsComposerRemoveEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## OnSave

The `OnSave` event fires when the user saves the current configuration. The handler receives a [`DatAInsightsComposerSaveEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerSaveEventArgs) argument with the serialized configuration JSON in its `Json` property.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnSave="@OnDAICSave" />

@code {
    private Task OnDAICSave(DatAInsightsComposerSaveEventArgs args)
    {
        return Task.CompletedTask;
    }
}
````

## PromptChanged

The `PromptChanged` event fires when the prompt text changes. The handler receives the new prompt as a `string`. Use this event with one-way binding to update the `Prompt` value in the host app. For two-way binding, use `@bind-Prompt`.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Prompt="@Prompt" PromptChanged="@OnDAICPromptChanged" />

@code {
    private string Prompt { get; set; } = string.Empty;

    private void OnDAICPromptChanged(string newPrompt)
    {
        Prompt = newPrompt;
    }
}
````

## Example

The following example connects each event to a handler. Register an `IChatClient` implementation or configure a custom AI service transport in the host app to enable AI requests.

>caption Handle Data Insights Composer events

````RAZOR
<TelerikDatAInsightsComposer Datasets="@Datasets"
                             Prompt="@Prompt"
                             PromptChanged="@OnDAICPromptChanged"
                             OnDataProcess="@OnDAICDataProcess"
                             OnGenerate="@OnDAICGenerate"
                             OnHistoryItemCreate="@OnDAICHistoryItemCreate"
                             OnHistoryItemRestore="@OnDAICHistoryItemRestore"
                             OnPromptCancel="@OnDAICPromptCancel"
                             OnPromptSubmit="@OnDAICPromptSubmit"
                             OnRemove="@OnDAICRemove"
                             OnSave="@OnDAICSave" />

@code {
    private string Prompt { get; set; } = string.Empty;

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

    private Task OnDAICDataProcess(DatAInsightsComposerDataProcessEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICGenerate(DatAInsightsComposerGenerateEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICHistoryItemCreate(DatAInsightsComposerHistoryItemCreateEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICHistoryItemRestore(DatAInsightsComposerHistoryItemRestoreEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICPromptCancel(DatAInsightsComposerPromptCancelEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICPromptSubmit(DatAInsightsComposerPromptSubmitEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICRemove(DatAInsightsComposerRemoveEventArgs args)
    {
        return Task.CompletedTask;
    }

    private Task OnDAICSave(DatAInsightsComposerSaveEventArgs args)
    {
        return Task.CompletedTask;
    }

    private void OnDAICPromptChanged(string newPrompt)
    {
        Prompt = newPrompt;
    }
}
````

## See Also

* [Data Insights Composer Overview](slug:datainsightscomposer-overview)
* [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
