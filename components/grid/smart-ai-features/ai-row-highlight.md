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

## Approach Overview

The AI Row Highlight feature leverages several key components working together:

1. **GridToolBarSmartBoxTool** - A dedicated toolbar tool that provides the user interface for AI interactions, including an AI Prompt component with speech-to-text capabilities and customizable prompt suggestions.

2. **AI Service Integration** - The `OnPromptRequest` event handler sends natural language requests to an external AI service endpoint. The service processes the user's intent (e.g., "Highlight patients with critical condition") and returns a structured response indicating which rows or cells should be highlighted or selected.

3. **Grid State Management** - The Grid uses three key parameters to manage visual highlights and selections:
   - `HighlightedItems` - Collection of full data items to highlight entire rows
   - `HighlightedCells` - Collection of `GridHighlightedCellDescriptor` objects for granular cell-level highlighting
   - `SelectedItems` - Collection of items that should be selected in the Grid

4. **Bidirectional Communication** - The AI service receives the user's natural language prompt along with Grid context, interprets the intent, and returns a response that the Grid automatically applies to update the highlighted/selected state.

This approach enables users to interact with data using conversational language rather than manual filtering or selection, making complex data exploration more accessible and efficient.

## Example

The following example demonstrates AI-powered row and cell highlighting in a patient management Grid. Users can submit natural language prompts like "Highlight patients with critical condition" or "Select patients with age over 18 under treatment" to dynamically highlight and select matching records.

````RAZOR.skip-repl
@using System.Net.Http.Json
@using Telerik.AI.SmartComponents.Extensions

@using PatientService = TelerikBlazorDemos.Services.Data.PatientService;
@using PatientDto = TelerikBlazorDemos.Services.Data.PatientDto;

@inject PatientService PatientService
@inject HttpClient HttpClientInstance

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             HighlightedItems="@HighlightedItems"
             HighlightedCells="@HighlightedCells"
             @bind-SelectedItems="@SelectedItems"
             SelectionMode="@GridSelectionMode.Multiple"
             Pageable="true"
             Reorderable="true"
             Resizable="true"
             Sortable="true">
    <GridToolBar>
        <GridToolBarSmartBoxTool>
            <GridToolBarSmartBoxToolSettings>
                <GridToolBarSmartBoxToolAIAssistantSettings OnPromptRequest="@OnAIPromptRequest"
                                                            PromptSuggestions="@AIPromptSuggestions"
                                                            Placeholder="Highlight or select Grid items with AI"
                                                            EnableSpeechToText="true">
                    <AIPromptSpeechToTextButtonSettings Lang="en-US" ThemeColor="@ThemeConstants.Button.ThemeColor.Error">
                    </AIPromptSpeechToTextButtonSettings>
                </GridToolBarSmartBoxToolAIAssistantSettings>

                <GridToolBarSmartBoxToolSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSearchSettings>

                <GridToolBarSmartBoxToolSemanticSearchSettings Enabled="false">
                </GridToolBarSmartBoxToolSemanticSearchSettings>

            </GridToolBarSmartBoxToolSettings>
        </GridToolBarSmartBoxTool>

        <GridToolBarSpacerTool />

        <GridToolBarCustomTool>
            <TelerikButton Icon="@nameof(SvgIcon.ArrowRotateCcw)" OnClick="@OnResetChangesClick">Reset Changes</TelerikButton>
        </GridToolBarCustomTool>
    </GridToolBar>

    <GridColumns>
        <GridColumn Field="@nameof(PatientDto.PatientName)" Title="Patient Name" Width="180px" />
        <GridColumn Field="@nameof(PatientDto.Age)" Title="Age" Width="80px" />
        <GridColumn Field="@nameof(PatientDto.ConditionSeverity)" Title="Condition Severity" Width="150px">
            <Template>
                @{
                    var dataItem = (PatientDto)context;
                    var themeColor = GetSeverityThemeColor(dataItem);

                    <TelerikBadge Position="@BadgePosition.Inline"
                                  Rounded="@ThemeConstants.Badge.Rounded.Medium"
                                  ThemeColor="@themeColor"
                                  Class="@($"k-badge-{themeColor}")">
                        @dataItem.ConditionSeverity
                    </TelerikBadge>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(PatientDto.Department)" Title="Department" Width="160px" />
        <GridColumn Field="@nameof(PatientDto.Status)" Title="Status" Width="160px">
            <Template>
                @{
                    var dataItem = (PatientDto)context;

                    <TelerikBadge Position="@BadgePosition.Inline"
                                  Rounded="@ThemeConstants.Badge.Rounded.Medium"
                                  ThemeColor="@GetStatusThemeColor(dataItem)"
                                  Class="@($" k-badge-{GetStatusThemeColor(dataItem)}")">
                        @dataItem.Status
                    </TelerikBadge>
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(PatientDto.AdmissionDate)" Title="Admission Date" DisplayFormat="{0:d}" Width="170px" />
        <GridColumn Field="@nameof(PatientDto.RiskScore)" Title="Risk Score">
            <Template>
                @{
                    var dataItem = (PatientDto)context;

                    <TelerikProgressBar Class="progressbar"
                                        Max="100"
                                        Value="@dataItem.RiskScore">
                    </TelerikProgressBar>
                }
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<style>
    .k-badge.k-badge-base, .k-badge.k-badge-solid.k-badge-base {
        border-color: var(--kendo-color-base-emphasis, #c2c2c2);
    }

    .k-grid .k-toolbar .k-smart-box {
        width: 390px;
        margin-left: auto;
        margin-right: auto;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
</style>

@code {
    private TelerikGrid<PatientDto> GridRef { get; set; }
    private List<PatientDto> GridData { get; set; }
    private IEnumerable<PatientDto> SelectedItems { get; set; } = new List<PatientDto>();
    private List<PatientDto> HighlightedItems { get; set; } = new();
    private List<GridHighlightedCellDescriptor> HighlightedCells { get; set; } = new();

    private List<string> AIPromptSuggestions { get; set; } = new()
    {
        "Highlight patients with critical condition",
        "Select patients with age over 18 under treatment",
        "Highlight patients in Neurology department",
        "Select patients with risk score between 5 and 20",
        "Clear highlighting",
        "Clear selection"
    };

    public async Task OnAIPromptRequest(GridSmartBoxAIAssistantPromptRequestEventArgs args)
    {
        try
        {
            var requestResult = await this.HttpClientInstance.PostAsJsonAsync("https://demos.telerik.com/service/v2/ai/grid/smart-state", args.Request);
            var resultContent = await requestResult.Content.ReadAsStringAsync();
            var gridAIResponse = JsonSerializer.Deserialize<GridAIResponse>(resultContent);

            args.Response = resultContent;
        }
        catch (Exception)
        {
            Console.WriteLine("The request returned no results. Try another request from the prompt suggestions.");
        }
    }

    private async Task OnResetChangesClick()
    {
        await GridRef.SetStateAsync(null);

        SelectedItems = new List<PatientDto>();
        HighlightedItems = new List<PatientDto>();
        HighlightedCells = new List<GridHighlightedCellDescriptor>();
    }

    private string GetSeverityThemeColor(PatientDto dataItem)
    {
        string themeColor = ThemeConstants.Badge.ThemeColor.Base;

        switch (dataItem.ConditionSeverity)
        {
            case "Critical":
                themeColor = ThemeConstants.Badge.ThemeColor.Error;
                break;
            case "Severe":
                themeColor = ThemeConstants.Badge.ThemeColor.Warning;
                break;
            case "Moderate":
                themeColor = ThemeConstants.Badge.ThemeColor.Info;
                break;
            case "Mild":
                themeColor = ThemeConstants.Badge.ThemeColor.Success;
                break;
            case "Clinical":
                themeColor = ThemeConstants.Badge.ThemeColor.Inverse;
                break;
        }

        return themeColor;
    }

    private string GetStatusThemeColor(PatientDto dataItem)
    {
        string themeColor = ThemeConstants.Chip.ThemeColor.Base;

        switch (dataItem.Status)
        {
            case "Awaiting Diagnosis":
                themeColor = ThemeConstants.Chip.ThemeColor.Base;
                break;
            case "Transferred":
                themeColor = ThemeConstants.Chip.ThemeColor.Base;
                break;
            case "Under Treatment":
                themeColor = ThemeConstants.Chip.ThemeColor.Info;
                break;
            case "In Surgery":
                themeColor = ThemeConstants.Chip.ThemeColor.Warning;
                break;
            case "Critical":
                themeColor = ThemeConstants.Chip.ThemeColor.Error;
                break;
            case "Monitoring":
                themeColor = ThemeConstants.Chip.ThemeColor.Info;
                break;
            case "Discharged":
                themeColor = ThemeConstants.Chip.ThemeColor.Success;
                break;
        }

        return themeColor;
    }

    protected override void OnInitialized()
    {
        GridData = PatientService.GetData();
    }
}
````

View the [complete live demo](https://demos.telerik.com/blazor-ui/grid/ai-highlight).

## See Also

* [Grid Smart AI Features Overview]({%slug grid-ai-overview%})
* [Grid AI Prompt Component]({%slug grid-ai-prompt%})
* [Grid Toolbar]({%slug grid-toolbar%})
