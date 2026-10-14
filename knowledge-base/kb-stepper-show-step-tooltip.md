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

I want to show a tooltip over the text of each step in the [UI for Blazor Stepper](https://www.telerik.com/blazor-ui/components/stepper/overview) while also displaying the step icons and maintaining the default layout. Additionally, some steps are disabled, so I need to ensure pointer-events are available for the tooltip.

This knowledge base article also answers the following questions:
- How to add tooltips to the steps in a UI for Blazor Stepper?
- How to use a tooltip in combination with the UI for Blazor Stepper?
- How to maintain layout and functionality when adding tooltips to the UI for Blazor Stepper?

## Solution

To show tooltips over each step's text in the Stepper, use a combination of a Step Template and a Tooltip. Follow these steps:

1. Use a Step Template to customize the rendering of the Stepper steps. This allows adding `title` attributes for tooltips.
2. Ensure steps are not disabled, or add custom CSS to enable pointer-events for tooltips on disabled steps.
3. Optionally, use a Tooltip Template for additional customization of the tooltip content.
4. Always include the `@key` directive within loops to ensure proper rendering of the components.

Here is an example implementation:

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

## Notes

- Use the `title` attribute within the Step Template to define the tooltip text for each step.
- The `TargetSelector` in the Tooltip specifies which elements within the Step Template will display the tooltip.
- Steps marked as `Disabled` require enabling `pointer-events` in CSS if tooltips are necessary. Add a CSS rule like:
  ```css
  .tooltip-target[disabled] {
      pointer-events: auto;
  }
  ```

## See Also

- [UI for Blazor Stepper Documentation](https://www.telerik.com/blazor-ui/components/stepper/overview)
- [UI for Blazor Stepper Step Template](https://www.telerik.com/blazor-ui/components/stepper/step-template)
- [UI for Blazor Tooltip Documentation](https://www.telerik.com/blazor-ui/components/tooltip/overview)
- [Tooltip Template in UI for Blazor](https://www.telerik.com/blazor-ui/components/tooltip/template)
- [Blazor Component Key Directive](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships?view=aspnetcore-10.0)
```
