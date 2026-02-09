---
title: AI Column Assistant
page_title: Grid - AI Column Assistant
description: Learn how to use the Telerik Grid for Blazor together with an InlineAIPrompt component to generate AI content and update the Grid data items.
slug: grid-ai-column
tags: telerik,blazor,grid,ai
published: True
position: 30
components: ["grid"]
---
# Grid AI Column Assistant

The Grid AI Column Assistant is an integration between the Telerik Inline AI Prompt and Grid components. This article shows how to display an Inline AI Prompt from a Grid column template to allow users to use AI for a specific Grid data item. Depending on the business requirements, the AI model can analyze the Grid data item and suggest additions or modifications.

The suggested algorithm for implementation is the following:

1. [Configure an InlineAIPrompt component that receives and provides the user prompt](#define-inlineaiprompt-component).
1. [Add a Grid column with a button that displays the InlineAIPrompt component](#add-grid-column-with-button).
1. (optional) [Implement an additional property of the Grid model class for AI content](#add-grid-column-for-ai-content).
1. [Update the Grid data or perform another action, based on the AI response](#update-grid-data).

## Define InlineAIPrompt Component

Follow the [InlineAIPrompt component documentation](slug:inlineaiprompt-overview) to configure an Inline AI Prompt component. Users can type an arbitrary prompt or optionally, pick from a predefined list of suggestions.

````RAZOR.skip-repl
<TelerikInlineAIPrompt @ref="@InlineAIPromptRef"
                       @bind-Prompt="@UserPrompt"
                       Commands="@PredefinedPromptSuggestions"
                       OnCommandExecute="@OnPredefinedPromptSuggestionSelect"
                       OutputActions="@ActionsOverAIResponse"
                       OnOutputActionClick="@OnAIResponseActionClick"
                       OnPromptRequest="@SendAIRequestAndGetResponse" />

@code {
    private TelerikInlineAIPrompt? InlineAIPromptRef { get; set; }

    private string UserPrompt { get; set; } = string.Empty;

    // List optional predefined prompt suggestions.
    private List<InlineAIPromptCommandDescriptor> PredefinedPromptSuggestions { get; set; } = new();

    // Define possible actions over the AI response.
    private List<InlineAIPromptOutputActionDescriptor> ActionsOverAIResponse { get; set; } = new();

    private void OnPredefinedPromptSuggestionSelect(InlineAIPromptCommandExecuteEventArgs args)
    {
        // This handler executes when the user selects a predefined prompt.

        Prompt = args.Command.Prompt;
    }

    private async Task SendAIRequestAndGetResponse(InlineAIPromptPromptRequestEventArgs args)
    {
        // This handler executes when the user submits their AI prompt.
        // Set the AI service response to args.Output.

        args.Output = "The AI response to the user prompt.";
    }

    private async Task OnAIResponseActionClick(InlineAIPromptOutputActionClickEventArgs args)
    {
        // This handler executes when the user clicks on an action from ActionsOverAIResponse.
        // You can modify the Grid data source here.
    }
}
````

## Add Grid Column with Button

Add a Grid column with no `Field`. The column must have a `<Template>` to render a button that saves the current Grid data item and displays the InlineAIPrompt component.

````RAZOR.skip-repl
<GridColumn Resizable="false" Width="70px">
    <Template>
        @{
            var dataItem = (GridModel)context;

            <TelerikButton OnClick="@((MouseEventArgs args) => OnAIButtonClick(dataItem, args))"
                           Icon="@nameof(SvgIcon.Sparkles)" />
        }
    </Template>
</GridColumn>

@code {
    // GridModel is the Grid data item type
    private GridModel? DataItemForAI { get; set; }

    private async Task OnAIButtonClick(GridModel dataItem, MouseEventArgs args)
    {
        // Get the clicked Grid data item for later use.
        DataItemForAI = dataItem;

        // Show the InlineAIPrompt.
        await InlineAIPromptRef.ShowAsync(args.ClientX, args.ClientY);
    }
}
````

## Add Grid Column for AI Content

You can save the AI response in a separate model property in the Grid data. To display that AI content, define its dedicated column:

````RAZOR.skip-repl
<GridColumn Field="@nameof(GridModel.AIGenerated)" Title="AI Content" />
````

## Update Grid Data

Update the Grid data in the `OnOutputActionClick` event of the InlineAIPrompt. Theoretically, you can also update the Grid data in the `OnPromptRequest` event of the InlineAIPrompt. However, this approach skips the user review and approval, which is normally not recommended.

````C#.skip-repl
// DataItemForAI is populated in the OnClick handler of the Button (OnAIButtonClick method).
private GridModel? DataItemForAI { get; set; }

// This is the OnOutputActionClick event handler of the InlineAIPrompt
private async Task OnAIResponseActionClick(InlineAIPromptOutputActionClickEventArgs args)
{
    // If the user approves the AI response, update the Grid data.
    // args.Action is a member of the ActionsOverAIResponse collection.
    if (args.Action.Name == "Insert")
    {
        DataItemForAI.AIGenerated = args.Output;

        await InlineAIPromptRef.HideAsync();
    }
}
````

## Example

See the [Grid AI Column Assistant live demo](https://demos.telerik.com/blazor-ui/grid/ai-column) for a complete runnable example.

## See Also

* [InlineAIPrompt Overview](slug:inlineaiprompt-overview)
* [Grid AI Column Assistant Live Demo](https://demos.telerik.com/blazor-ui/grid/ai-column)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
* [Integration with Telerik.AI.SmartComponents.Extensions](slug:grid-ai-service-setup)
