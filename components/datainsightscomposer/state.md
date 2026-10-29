---
title: State
page_title: DatAInsightsComposer State
description: Learn how to get and manage the state of the Telerik DatAInsightsComposer for Blazor.
slug: datainsightscomposer-state
tags: telerik, blazor, datainsightscomposer, AI, state
published: True
position: 40
components: ["datainsightscomposer"]
---

# DatAInsightsComposer State

The Telerik DatAInsightsComposer for Blazor exposes state management capabilities through methods. Use them to get, save, and programmatically manipulate the DatAInsightsComposer state, including the configuration of already generated components.

## Objects

The DatAInsightsComposer stores its state in the following objects:

* [`DatAInsightsComposerState`](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatAInsightsComposerState)&mdash;the state of the DatAInsightsComposer and all generated components together with their history items.
* [`ComponentConfigSectionState`](slug:Telerik.Blazor.Components.DatAInsightsComposer.ComponentConfigSectionState)&mdash;the state of a specific component and its history items.

## Methods

The [`GetState` and `SetState` methods](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer#methods) of the [DatAInsightsComposer instance](slug:datainsightscomposer-overview#data-insights-composer-reference) let you obtain or update the current DatAInsightsComposer state on demand at any time in or after `OnAfterRenderAsync`.

To make changes to the DatAInsightsComposer state:

1. Get the current state with the `GetState` method.
1. Apply the desired modifications to the obtained `DatAInsightsComposerState` object.
1. Set the modified state object through the `SetState` method.

To reset the DatAInsightsComposer state, call the `SetState` method and pass a new `DatAInsightsComposerState` instance as an argument.

## Example

The following example demonstrates how to:

* Modify the `Prompt` and Grid `Height` through the DatAInsightsComposer state. Setting the `Prompt` in the state fires [`PromptChanged`](slug:datainsightscomposer-events#promptchanged), so that the app also updates the parameter value. Alternatively, you can directly set the DatAInsightsComposer `Prompt` parameter.
* Reset the DatAInsightsComposer state and remove any generated components and history items.

>caption Reset or modify the DatAInsightsComposer state

````RAZOR.skip-repl
<TelerikButton OnClick="@UpdateDAICState">Update DAIC State</TelerikButton>
<TelerikButton OnClick="@ResetDAICState">Reset DAIC State</TelerikButton>

<TelerikDatAInsightsComposer @ref="@DAICRef"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private TelerikDatAInsightsComposer? DAICRef;

    private string DAICPrompt { get; set; } = string.Empty;

    private async Task UpdateDAICState()
    {
        if (DAICRef is null)
        {
            return;
        }

        DatAInsightsComposerState daicState = DAICRef.GetState();

        daicState.Prompt = "New programmatic prompt";
        GridComponentConfig? gridConfig = daicState.Components.FirstOrDefault(x => x.ComponentConfig?.ComponentType == ComponentType.Grid)?.ComponentConfig as GridComponentConfig;

        if (gridConfig is not null)
        {
            gridConfig.Config.PageSize = 5;
            gridConfig.Config.Height = "auto";
        }

        await DAICRef.SetStateAsync(daicState);
    }

    private async Task ResetDAICState()
    {
        if (DAICRef is null)
        {
            return;
        }

        DatAInsightsComposerState newDAICState = new DatAInsightsComposerState();

        await DAICRef.SetStateAsync(newDAICState);
    }
}
````

## Next Steps

* [Handle DatAInsightsComposer Events](slug:datainsightscomposer-events)

## See Also

* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
