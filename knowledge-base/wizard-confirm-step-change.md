---
title: Confirm navigation between Wizard steps
description: How to show a popup dialog or window to confirm the change of the current Wizard step.
type: how-to
page_title: How to pop up a confirmation window or dialog between Wizard steps
slug: wizard-kb-confirm-step-change
position: 
tags: wizard
ticketid: 1559188
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Wizard for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
When a user wants to move to the next step, I need to confirm the move and show them a popup warning for some situations. If they choose to "continue", take them to the next step as normal, otherwise back to the current step.

## Solution
Use the [`OnChange` event](slug://wizard-events#onchange) of the originating step to show a [confirm Dialog](slug://dialog-predefined#confirm). Cancel the event if the user does not confirm. It is also possible to use a Window component, but a confirmation Dialog is likely more suitable.

This example shows confirmation when moving away from step 1. You can extend it for other steps. You can also add a lambda expression in the handler on each step to provide more data to the method - for example, to form a more meaningful message for the step or to distinguish steps more easily.

````RAZOR
@* Moving away from step 1 will be confirmed. You can attach the handler to more than one step and raise flags whether to require confirmation as per the business logic *@

<TelerikWizard Width="600px"
               Height="300px"
               @bind-Value="@WizardStep">
    <WizardSteps>
        <WizardStep OnChange="@OnStep1Change">
            <Content>
                <p>This is Step 1. Moving to the next one will be confirmed.</p>
            </Content>
        </WizardStep>
        <WizardStep>
            <Content>
                <p>This is Step 2.</p>
            </Content>
        </WizardStep>
        <WizardStep>
            <Content>
                <p>This is Step 3.</p>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

@code {
    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    int WizardStep { get; set; } = 0;
    bool shouldConfirmStepChange { get; set; } = true; // change as required in the business logic to fire confirmations

    async Task OnStep1Change(WizardStepChangeEventArgs args)
    {
        // Wizard step indexes are 1-based
        // alternatively, you could use a lambda in the handler declaration in the WizardStep
        // to add metadata to this method so you can tell the steps apart more easily
        //Console.WriteLine(args.TargetIndex);

        // you can have this handler for multiple steps and check which ones you want to fire the confirm for
        // this second flag here imitates business logic that decides whether the confirmation is necessary
        // for example, if modifications have been made to the previous step you may want them confirmed
        if (args.TargetIndex == 1 && shouldConfirmStepChange)
        {
            string confirmText = $"Are you sure you want to go to the next step?";
            bool userIsSure = await Dialogs.ConfirmAsync(confirmText);
            // cancel the navigation from this step if the user does not confirm the prompt
            args.IsCancelled = !userIsSure;
        }
    }
}
````
