---
title: AI Row Highlight
page_title: Grid - AI Row Highlight
description: Learn how to use AI-powered row highlighting in the Blazor Grid.
slug: grid-ai-row-highlight
tags: telerik,blazor,grid,ai,highlight,rows
published: True
position: 35
components: ["grid"]
---

# Grid AI Row Highlight

The Grid AI Row Highlight feature enables intelligent highlighting of rows and cells based on natural language requests processed by an external AI service. Users can interact with the Grid through an AI Prompt component to dynamically highlight or select data that matches specific criteria without writing code or applying manual filters.

## Setup Steps

The suggested approach for implementation is the following:

1. [Configure the Grid](#configure-the-grid).
1. [Add GridToolBarSmartBoxTool](#add-gridtoolbarsmartboxtool).
1. [Handle AI prompt requests](#handle-ai-prompt-requests).
1. (optional) [Reset highlighted and selected items](#reset-highlighted-and-selected-items).

## Configure the Grid

Configure the Grid with the three key parameters that control highlighting and selection: `HighlightedItems` for row highlighting, `HighlightedCells` for cell-level highlighting, and `SelectedItems` for row selection. Enable multiple selection to allow users to select multiple rows based on AI prompts.

````RAZOR.skip-repl
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             HighlightedItems="@HighlightedItems"
             HighlightedCells="@HighlightedCells"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Pageable="true"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(PatientDto.PatientName)" Title="Patient Name" />
        <GridColumn Field="@nameof(PatientDto.Age)" Title="Age" />
        <GridColumn Field="@nameof(PatientDto.Department)" Title="Department" />
        <GridColumn Field="@nameof(PatientDto.Status)" Title="Status" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<PatientDto> GridRef { get; set; }
    private List<PatientDto> GridData { get; set; }
    private IEnumerable<PatientDto> SelectedItems { get; set; } = new List<PatientDto>();
    private List<PatientDto> HighlightedItems { get; set; } = new();
    private List<GridHighlightedCellDescriptor> HighlightedCells { get; set; } = new();

    protected override void OnInitialized()
    {
        GridData = PatientService.GetData();
    }
}
````

## Add GridToolBarSmartBoxTool

Add a `GridToolBarSmartBoxTool` to the Grid toolbar to provide the AI interaction interface. Configure the `GridToolBarSmartBoxToolAIAssistantSettings` with the `OnPromptRequest` event handler that will process user prompts. Optionally, provide predefined prompt suggestions and enable speech-to-text functionality.

````RAZOR.skip-repl
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             HighlightedItems="@HighlightedItems"
             HighlightedCells="@HighlightedCells"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolAIAssistantSettings OnPromptRequest="@OnAIPromptRequest"
                                                            PromptSuggestions="@AIPromptSuggestions"
                                                            Placeholder="Highlight or select Grid items with AI"
                                                            EnableSpeechToText="true">
                    <AIPromptSpeechToTextButtonSettings Lang="en-US">
                    </AIPromptSpeechToTextButtonSettings>
                </GridToolBarSmartBoxToolAIAssistantSettings>

                <GridToolBarSmartBoxToolSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSearchSettings>

                <GridToolBarSmartBoxToolSemanticSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSemanticSearchSettings>
            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>
    </GridToolBar>
    <GridColumns>
        <!-- Grid columns -->
    </GridColumns>
</TelerikGrid>

@code {
    private List<string> AIPromptSuggestions { get; set; } = new()
    {
        "Highlight patients with critical condition",
        "Select patients with age over 18 under treatment",
        "Highlight patients in Neurology department",
        "Select patients with risk score between 5 and 20",
        "Clear highlighting",
        "Clear selection"
    };
}
````

## Handle AI Prompt Requests

Implement the `OnPromptRequest` event handler to send user prompts to your AI service and set the response. The AI service should process the natural language request and return a structured response that the Grid will automatically apply to update the `HighlightedItems`, `HighlightedCells`, or `SelectedItems` collections.

````C#.skip-repl
@inject HttpClient HttpClientInstance

@code {
    public async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        try
        {
            var requestResult = await this.HttpClientInstance.PostAsJsonAsync(
                "https://demos.telerik.com/service/v2/ai/grid/smart-state", 
                args.Request);
            
            var resultContent = await requestResult.Content.ReadAsStringAsync();
            var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

            args.Response = resultContent;
        }
        catch (Exception)
        {
            Console.WriteLine("The request returned no results. Try another request from the prompt suggestions.");
        }
    }
}
````

## Reset Highlighted and Selected Items

Optionally, provide a way for users to clear all highlights and selections. You can add a toolbar button that resets the Grid state and clears the highlight and selection collections.

````RAZOR.skip-repl
<TelerikGrid @ref="@GridRef">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <!-- AI Assistant settings -->
        </GridToolBarSmartBoxTool>

        <GridToolBarSpacerTool />

        <GridToolBarCustomTool>
            <TelerikButton Icon="@nameof(SvgIcon.ArrowRotateCcw)" 
                           OnClick="@OnResetChangesClick">
                Reset Changes
            </TelerikButton>
        </GridToolBarCustomTool>
    </GridToolBar>
    <GridColumns>
        <!-- Grid columns -->
    </GridColumns>
</TelerikGrid>

@code {
    private async Task OnResetChangesClick()
    {
        await GridRef.SetStateAsync(null);

        SelectedItems = new List<PatientDto>();
        HighlightedItems = new List<PatientDto>();
        HighlightedCells = new List<GridHighlightedCellDescriptor>();
    }
}
````

View the [complete live demo](https://demos.telerik.com/blazor-ui/grid/ai-highlight).

## See Also

* [Grid Smart AI Features Overview]({%slug grid-ai-overview%})
* [Grid AI Prompt Component]({%slug grid-ai-prompt%})
* [Grid Toolbar]({%slug grid-toolbar%})
