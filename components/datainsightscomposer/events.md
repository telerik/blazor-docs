---
title: Events
page_title: DatAInsightsComposer Events
description: Learn about the Telerik DatAInsightsComposer for Blazor events and their event arguments.
slug: datainsightscomposer-events
tags: telerik, blazor, datainsightscomposer, AI, events
published: True
position: 100
components: ["datainsightscomposer"]
---

# DatAInsightsComposer Events

This article describes the events that the Telerik DatAInsightsComposer for Blazor raises:

* [`OnDataProcess`](#ondataprocess)
* [`OnGenerate`](#ongenerate)
* [`OnHistoryItemCreate`](#onhistoryitemcreate)
* [`OnHistoryItemRestore`](#onhistoryitemrestore)
* [`OnPromptCancel`](#onpromptcancel)
* [`OnPromptSubmit`](#onpromptsubmit)
* [`OnRemove`](#onremove)
* [`OnConfirm`](#onconfirm)
* [`PromptChanged`](#promptchanged)

## OnDataProcess

The `OnDataProcess` event fires once for each generated component, before that component renders. The handler receives a [`DatAInsightsComposerDataProcessEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerDataProcessEventArgs) argument. Use its `ComponentType`, `Config`, and `Dataset` properties to inspect the current result. The event enables you to:

* Check or modify the planned data operations in `args.DataSourceRequest`.
* Completely skip the automatic built-in data processing and perform the required data operations manually. Then, set the `ProcessedData` property of the event argument to supply the exact data for the generated component to use as-is.

`OnDataProcess` fires before [`OnGenerate`](#ongenerate) or [`OnHistoryItemRestore`](#onhistoryitemrestore).

>caption Use OnDataProcess to provide data and modify the generated component configuration

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

The `OnGenerate` event fires after the AI generates or refines a valid component configuration. The handler receives a [`DatAInsightsComposerGenerateEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerGenerateEventArgs) argument with the prompt, serialized JSON response, and generated configuration. You can use the event to modify the generated component configuration, including settings that are not exposed as [declarative parameters](slug:datainsightscomposer-components).

`OnGenerate` fires after [`OnDataProcess`](#ondataprocess).

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnGenerate="@OnDAICGenerate" />

@code {
    private Task OnDAICGenerate(DatAInsightsComposerGenerateEventArgs args)
    {
        if (args.Configs.First() is GridComponentConfig gridComponent)
        {
            gridComponent.Title = "Custom Grid Title";
            gridComponent.Config.PageSize = 100;
        }

        return Task.CompletedTask;
    }
}
````

## OnHistoryItemCreate

The `OnHistoryItemCreate` event fires when the user clicks the **Confirm** button to accept a generated component, and the DatAInsigntsComposer creates a history item for a potential restore later. The event handler receives a [`DatAInsightsComposerHistoryItemCreateEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerHistoryItemCreateEventArgs) argument. Its `Item` property contains the created history item with the user prompt, generated component configuration, and datasource.

`OnHistoryItemCreate` fires before [`OnConfirm`](#onconfirm).

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnHistoryItemCreate="@OnDAICHistoryItemCreate" />

@code {
    private Task OnDAICHistoryItemCreate(DatAInsightsComposerHistoryItemCreateEventArgs args)
    {
        ComponentHistoryItemDescriptor historyItem = args.Item;

        return Task.CompletedTask;
    }
}
````

## OnHistoryItemRestore

The `OnHistoryItemRestore` event fires when the user:

1. Edits a generated component configuration.
1. Clicks the **History** button next to **Confirm** and **Discard**.
1. Restores an existing history item.

The handler receives a [`DatAInsightsComposerHistoryItemRestoreEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerHistoryItemRestoreEventArgs) argument. Its `Item` property contains the created history item with the user prompt, generated component configuration, and datasource.

Before `OnHistoryItemRestore`, the DatAInsightsComposer also fires [`OnDataProcess`](#ondataprocess).

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnHistoryItemRestore="@OnDAICHistoryItemRestore" />

@code {
    private Task OnDAICHistoryItemRestore(DatAInsightsComposerHistoryItemRestoreEventArgs args)
    {
        ComponentHistoryItemDescriptor historyItem = args.Item;

        return Task.CompletedTask;
    }
}
````

## OnPromptCancel

The `OnPromptCancel` event fires when the user aborts the current component generation by clicking on the **Generating** button with a **Stop** icon while a prompt request is in progress. The handler receives a [`DatAInsightsComposerPromptCancelEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerPromptCancelEventArgs) argument. Set its `IsCancelled` property to `false` to keep the request running.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnPromptCancel="@OnDAICPromptCancel" />

@code {
    private Task OnDAICPromptCancel(DatAInsightsComposerPromptCancelEventArgs args)
    {
        string userPrompt = args.Prompt;

        return Task.CompletedTask;
    }
}
````

## OnPromptSubmit

The `OnPromptSubmit` event fires when the user submits a prompt. The handler receives a [`DatAInsightsComposerPromptSubmitEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerPromptSubmitEventArgs) argument with the prompt that you can optionally modify on the fly. You can also cancel the request by setting the `IsCancelled` property of the event argument to `true`.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnPromptSubmit="@OnDAICPromptSubmit" />

@code {
    private Task OnDAICPromptSubmit(DatAInsightsComposerPromptSubmitEventArgs args)
    {
        if (args.Prompt.Contains("something invalid"))
        {
            args.IsCancelled = true;
        }

        return Task.CompletedTask;
    }
}
````

## OnRemove

The `OnRemove` event fires when the user deletes an already saved generated component. The handler receives a [`DatAInsightsComposerRemoveEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerRemoveEventArgs) argument with the component configuration and matching dataset descriptor.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnRemove="@OnDAICRemove" />

@code {
    private Task OnDAICRemove(DatAInsightsComposerRemoveEventArgs args)
    {
        ComponentConfig config = args.Config;
        DatasetDescriptor? dataset = args.Dataset;

        return Task.CompletedTask;
    }
}
````

## OnConfirm

The `OnConfirm` event fires when the user saves the generated UI component configuration. The handler receives a [`DatAInsightsComposerConfirmEventArgs`](slug:Telerik.Blazor.Components.DatAInsightsComposerConfirmEventArgs) argument with the serialized configuration JSON in its `Json` property.

`OnConfirm` fires after [`OnHistoryItemCreate`](#onhistoryitemcreate).

````RAZOR.skip-repl
<TelerikDatAInsightsComposer OnConfirm="@OnDAICConfirm" />

@code {
    private Task OnDAICConfirm(DatAInsightsComposerConfirmEventArgs args)
    {
        string json = args.Json;

        return Task.CompletedTask;
    }
}
````

## PromptChanged

The `PromptChanged` event fires when the prompt text changes. The handler receives the new prompt as a `string`. Use this event with one-way `Prompt` parameter binding to detect prompt changes and update the `Prompt` value manually.

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Prompt="@DAICPrompt"
                             PromptChanged="@DAICPromptChanged" />

@code {
    private string DAICPrompt { get; set; } = string.Empty;

    private void DAICPromptChanged(string newPrompt)
    {
        DAICPrompt = newPrompt;
    }
}
````

## See Also

* [DatAInsightsComposer Overview](slug:datainsightscomposer-overview)
* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
