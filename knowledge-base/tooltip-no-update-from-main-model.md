---
title: Tooltip Does Not Update Content with the View-Model fields and events
description: The tooltip contents don't update and react to events and field values in the view-model. Why and how to fix
type: troubleshooting
page_title: Tooltip Does not Update According to ViewModel fields and events
slug: tooltip-kb-no-update-from-main-model
position: 
tags: 
ticketid: 1490348
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Tooltip for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When I have some dynamic content inside the tooltip template, the tooltip seems not to be re-rendering. E.g. when I have a tooltip with a text input and button and wish to disable the button when no text is entered, the tooltip seems to be only refreshing after closing and re-opening it. Calling `StateHasChanged` in the desired event does not help.


## Steps to Reproduce

A simplified example - show the tooltip, type in the textbox - the expected behavior is that the button will get enabled, but it does not

````CSHTML
@* Type in the textbox *@

<TelerikButton Class="search-tooltip" Primary="true">Click for tooltip</TelerikButton>

<TelerikTooltip TargetSelector=".search-tooltip" Position="TooltipPosition.Bottom" ShowOn="TooltipShowEvent.Click">
    <Template>
        <TelerikTextBox @bind-Value="@SearchText"></TelerikTextBox>
        <TelerikButton OnClick="@Search" Enabled="@(!string.IsNullOrEmpty(SearchText))">Search</TelerikButton>
    </Template>
</TelerikTooltip>

@code{
    string SearchText { get; set; }
    void Search()
    {
        Console.WriteLine("Search Click");
    }
}
````

## Cause\Possible Cause(s)

The Tooltip component renders at the root of the app to ensure its correct position - it is a direct child of the `<TelerikRootComponent>` in the main layout.

This means that its content is no longer a sibling or child of the current component whose view-model you changed, and this is why calls to `StateHasChanged` do not update it.


## Solution

The solution is to encapsulate the desired content in its own component so that its own logic and view-model updates itself and its own rendering, and changes from the parent component also fire up its `OnParametersSet` method so it can also re-render as needed.

You can expose the necessary parameters and events from it so that there are no API changes in the view-model of the main component

````MainComponent
@* The API is the same, the contents are in their own component, see the adjacent tab *@

<TelerikButton Class="search-tooltip" Primary="true">Click for tooltip</TelerikButton>

<TelerikTooltip TargetSelector=".search-tooltip" Position="TooltipPosition.Bottom" ShowOn="TooltipShowEvent.Click">
    <Template>
        <SearchTooltipContent @bind-SearchText="@SearchText" OnSearch="@Search" />
    </Template>
</TelerikTooltip>

@code{
    string SearchText { get; set; }
    void Search()
    {
        Console.WriteLine("Search Click");
    }
}
````
````SearchTooltipContent
@* Sample content for the tooltip that fires up the necessary events and can update as necessary *@

<TelerikTextBox Value="@SearchText" ValueChanged="@( (string v) => ValueChangedHandler(v) )"></TelerikTextBox>
<TelerikButton OnClick="@Search" Enabled="@(!string.IsNullOrEmpty(SearchText))">Search</TelerikButton>

@code {
    [Parameter]
    public string SearchText { get; set; }

    [Parameter]
    public EventCallback<string> SearchTextChanged { get; set; }

    [Parameter]
    public EventCallback OnSearch { get; set; }

    void ValueChangedHandler(string v)
    {
        SearchText = v;
        if (SearchTextChanged.HasDelegate)
        {
            SearchTextChanged.InvokeAsync(SearchText);
        }
    }

    async Task Search()
    {
        if (OnSearch.HasDelegate)
        {
            await OnSearch.InvokeAsync(null);
        }
    }
}
````

