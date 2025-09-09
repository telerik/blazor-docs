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

````RAZOR
@* Type in the textbox *@

<TelerikButton Class="search-tooltip" ThemeColor="primary">Click for tooltip</TelerikButton>

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

## Possible Cause

The Tooltip component renders at the root of the app to ensure its correct position - it is a direct child of the `<TelerikRootComponent>` in the main layout.

This means that its content is no longer a sibling or child of the current component whose view-model you changed, and this is why calls to `StateHasChanged` do not update it.


## Solution

Encapsulate the desired Tooltip content in a separate child component that has its own logic and component life cycle. This will help with the rendering updates. You can expose the necessary parameters and events, so that there are no API changes in the view-model of the main component

Note that the child component will call its `OnParametersSet` method only on Tooltip display. If you need `OnParametersSet` to execute on each parameter change from the parent component, then use two nested components inside the Tooltip template.

<div class="skip-repl"></div>

````RAZOR Home.razor
<TelerikButton Class="search-tooltip-target" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Click to Show Tooltip</TelerikButton>

@SearchClickLog

<TelerikTooltip TargetSelector=".search-tooltip-target"
                Position="TooltipPosition.Bottom"
                ShowOn="TooltipShowEvent.Click">
    <Template>
        @* The Update AnotherParameter button will not work
			unless the whole Tooltip Template content is in a child component. *@
        <TelerikButton OnClick="@UpdateAnotherParameter"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Error">
            Update AnotherParameter
        </TelerikButton>
        <TelerikButton OnClick="@UpdateAnotherValue"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Success">
            Update AnotherValue
        </TelerikButton>
        <br />
        <br />
        <SearchTooltipContent @ref="@CounterRef"
                              @bind-SearchText="@SearchText"
                              AnotherParameter="@AnotherValue"
                              OnSearch="@Search" />
    </Template>
</TelerikTooltip>

@code{
    private string SearchText { get; set; } = string.Empty;

    private string SearchClickLog { get; set; } = string.Empty;

    private int AnotherValue { get; set; }

    private Counter? CounterRef { get; set; }

    private void Search()
    {
        SearchClickLog = $"Search Button clicked at {DateTime.Now.ToString("HH:mm:ss.fff")} for {SearchText}.";
    }

    private void UpdateAnotherParameter()
    {
        // Will not work inside a Tooltip,
		// unless this method is insde a child component of the Tooltip Template
  		// and AnotherValue is consumed by a grand child.
	    // Use the next method as an alternative.
        AnotherValue = DateTime.Now.Millisecond;
    }

    private void UpdateAnotherValue()
    {
        AnotherValue = DateTime.Now.Millisecond;
        CounterRef?.GetValuesFromParent(AnotherValue);
    }
}
````
````RAZOR SearchTooltipContent
<TelerikTextBox Value="@SearchText"
                ValueChanged="@TextBoxValueChanged"
                ShowClearButton="true"
                Width="160px" />

<TelerikButton OnClick="@OnSearchButtonClick"
               ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               Enabled="@(!string.IsNullOrEmpty(SearchText))">
    Search
</TelerikButton>

<p>
    Another Parameter: @AnotherParameter,
    Another Value: @AnotherValue
</p>

@code {
    [Parameter]
    public string SearchText { get; set; } = string.Empty;

    [Parameter]
    public EventCallback<string> SearchTextChanged { get; set; }

    [Parameter]
    public EventCallback OnSearch { get; set; }

    [Parameter]
    public int AnotherParameter { get; set; }

    private int AnotherValue { get; set; }

    private async Task TextBoxValueChanged(string newValue)
    {
        SearchText = newValue;

        if (SearchTextChanged.HasDelegate)
        {
            await SearchTextChanged.InvokeAsync(SearchText);
        }
    }

    private async Task OnSearchButtonClick()
    {
        if (OnSearch.HasDelegate)
        {
            await OnSearch.InvokeAsync(null);
        }
    }

    public void GetValuesFromParent(int anotherParameterValue)
    {
        AnotherValue = anotherParameterValue;
        StateHasChanged();
    }

    protected override void OnParametersSet()
    {
        // This method will not be called, except:
        // - On each new Tooltip display
        // - If this component is outside a Tooltip
        // - If this component is a grand child of a Tooltip Template
        // Call component instance methods as a workaround. See GetValuesFromParent()

        base.OnParametersSet();
    }
}
````
