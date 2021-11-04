---
title: How to Skip a Wizard Step
description: How to skip a step in the TelerikWizard, based on custom condition from another step?
type: how-to
page_title: How to Skip a Wizard Step Programmatically
slug: wizard-skip-step
position:
tags: wizard, skip, step
ticketid: 1541661
res_type: kb
---

## Description

How to skip one or more Wizard steps, based on the results of another step?

The [Wizard flow is set to linear]({%slug wizard-structure-stepper%}#linear-flow), so I can't disable steps, but I need to skip an unneeded step programmatically, based on a custom condition in a previous step.

## Solution

1. Subscribe to the [`OnChange`]({%slug wizard-events%}#onchange) event of the originating step.
1. Check `args.TargetIndex` to find out if the user is navigating in the desired direction.
1. Set `args.IsCancelled` to `true` to cancel navigation to the next step.
1. Set the Wizard `Value` to the desired step.

>caption Skip a Wizard Step Based on Business Logic

````CSHTML
@* Skip a Wizard Step Based on Custom Condition *@

<TelerikWizard Width="600px"
               Height="300px"
               @bind-Value="@WizardStep">
    <WizardSteps>
        <WizardStep>
            <Content>
                <p>This is Step 1.</p>
            </Content>
        </WizardStep>
        <WizardStep OnChange="@OnStep1Change">
            <Content>
                <p>This is Step 2.</p>
                <label><TelerikCheckBox @bind-Value="@SkipStep2" /> Skip Step 3</label>
            </Content>
        </WizardStep>
        <WizardStep>
            <Content>
                <p>This is Step 3.</p>
            </Content>
        </WizardStep>
        <WizardStep>
            <Content>
                <p>This is Step 4.</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

@code {
    int WizardStep { get; set; } = 1;
    bool SkipStep2 { get; set; } = true;

    async Task OnStep1Change(WizardStepChangeEventArgs args)
    {
        // Wizard step indexes are zero-based
        if (args.TargetIndex == 2 && SkipStep2)
        {
            args.IsCancelled = true;
            WizardStep = 3;
        }
    }
}
````
