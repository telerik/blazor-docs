---
title: Show Tooltip Over Stepper Steps
description: Learn how to display tooltips over each step in the Telerik UI for Blazor Stepper while maintaining icons and layout.
type: how-to
page_title: Display Tooltip for Each Step in Telerik UI for Blazor Stepper
meta_title: Display Tooltip for Each Step in Telerik UI for Blazor Stepper
slug: kb-stepper-show-step-tooltip
tags: blazor, stepper, tooltip
res_type: kb
ticketid: 1719627
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor Stepper</td>
        </tr>
    </tbody>
</table>

## Description

How to show a tooltip over the text of each step in the Telerik Blazor Stepper while also displaying the step icons and maintaining the default layout? Additionally, some steps may are disabled.

This knowledge base article also answers the following questions:

* How to add tooltips to the steps in the Telerik Blazor Stepper?
* How to displat a tooltip over Stepper steps?
* How to maintain layout and functionality when adding tooltips to the UI for Blazor Stepper?

## Solution

To show tooltips over each Stepper Step, use a combination of a Step Template and a Tooltip. Follow these steps:

1. Use a [Step `Template`](slug:step-template) to customize the rendering of the Stepper steps and add `title` attributes for the Tooltip to show. To preserve the default HTML rendering and CSS styling of the Stepper steps, use the following template content:
    ````RAZOR.skip-repl
    <span class="k-step-indicator">
        <TelerikSvgIcon Icon="..." Class="k-step-indicator-icon" />
        @* OR *@
        @*<TelerikFontIcon Icon="..." Class="k-step-indicator-icon" />*@
    </span>
    <span class="k-step-label">
        <span class="k-step-text">...</span>
    </span>
    ````
2. Ensure steps are not `Disabled`, otherwise the Tooltip won't show. Alternatively, add custom CSS to enable `pointer-events` for the Tooltip target element(s):
    ````CSS.skip-repl
    .tooltip-target.k-disabled .k-step-indicator,
    .tooltip-target.k-disabled .k-step-label {
        pointer-events: auto;
    }
    ````
3. Using a [Tooltip `Template`](slug:tooltip-template) is optional and may be beneficial if you want to render the value of multiple `data` attributes from the Step `Template`.

>caption Display Tooltip for Stepper Steps

````RAZOR
<TelerikStepper Value="@StepperValue">
    <StepperSteps>
        @foreach (var step in Steps)
        {
            <StepperStep @key="@step" Label="@step.Text" Text="@step.Text" Icon="@step.Icon" Class="tooltip-target">
                <Template>
                    <span class="k-step-indicator" title="@($"Tooltip text for {step.Text}")">
                        <TelerikSvgIcon Icon="@step.Icon" Class="k-step-indicator-icon" />
                    </span>
                    <span class="k-step-label" title="@($"Tooltip text for {step.Text}")">
                        <span class="k-step-text">@step.Text</span>
                    </span>
                </Template>
            </StepperStep>
        }
    </StepperSteps>
</TelerikStepper>

<TelerikTooltip TargetSelector=".tooltip-target .k-step-indicator, .tooltip-target .k-step-label" />

@code {
    private int StepperValue { get; set; }

    private List<StepperModel> Steps { get; set; } = new()
    {
        new StepperModel() { Text = "Step 1", Icon = SvgIcon.Home },
        new StepperModel() { Text = "Step 2", Icon = SvgIcon.AwardNumber },
        new StepperModel() { Text = "Step 3", Icon = SvgIcon.Columns }
    };

    public class StepperModel
    {
        public string Text { get; set; } = string.Empty;
        public ISvgIcon? Icon { get; set; }
    }
}
````

## See Also

* [Stepper Step `Template`](slug:step-template)
* [Tooltip `Template`](slug:tooltip-template)
