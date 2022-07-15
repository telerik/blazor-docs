---
title: Events
page_title: Wizard Events
description: Events of the Wizard for Blazor.
slug: wizard-events
tags: telerik,blazor,wizard,events
published: True
position: 15
---

## Events

The available events in the Telerik Wizard for Blazor are:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnFinish](#onfinish)

## OnChange

The `OnChange` event is triggered on the current step and fires before the step has changed. The handler receives an object of type `WizardStepChangeEventArgs` which exposes the following fields:

* `TargetIndex` - contains the index of the targeted new Wizard step.
* `IsCancelled` - specifies whether the event is canceled and the built-in action is prevented.

>[Custom Wizard buttons]({%slug wizard-structure-buttons%}#custom-buttons) do not trigger the `OnChange` event. See section [Execute Business Logic With Custom Wizard Buttons]({%slug wizard-structure-buttons%}#execute-business-logic-with-custom-wizard-buttons).

The `OnChange` event handler is defined in the respective `<WizardStep>` tag.

>caption Handle the `OnChange` event of the first and second step (code snippet below)

![OnChange](images/onchange-example.gif)

````CSHTML
@* Handle the OnChange event of the steps *@

Next targeted step index: @TargetIndex

<div style="text-align:center">
    <TelerikWizard Width="600px" Height="300px">
        <WizardSteps>
            <WizardStep OnChange="@OnChangeHandler1" Text="1">
                <Content>
                    <h2>Content for Wizard Step 1</h2>
                </Content>
            </WizardStep>
            <WizardStep OnChange="@OnChangeHandler2" Text="2">
                <Content>
                    <h2>Content for Wizard Step 2</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="3">
                <Content>
                    <h2>Content for Wizard Step 3</h2>
                </Content>
            </WizardStep>
        </WizardSteps>
    </TelerikWizard>
</div>

@code{
    public int? TargetIndex { get; set; } = null;

    async Task OnChangeHandler1(WizardStepChangeEventArgs args)
    {
        TargetIndex = args.TargetIndex;
    }

    async Task OnChangeHandler2(WizardStepChangeEventArgs args)
    {
        args.IsCancelled = true;

        await Dialog.AlertAsync("Please complete step 2 first", "You cannot proceed");

    }

    [CascadingParameter]
    public DialogFactory Dialog { get; set; }
}
````

## ValueChanged

The `ValueChanged` event fires after the [`OnChange`](#onchange) event, if the latter has not been cancelled. The handler receives the new Wizard value (step index) as an event argument. Make sure to set it to the `Value` parameter, so that the new step content is rendered.

>caption Handle the `ValueChanged` event of the Wizard

````CSHTML
<TelerikWizard ValueChanged="@ValueChangedHandler" Value="@WizardValue">
    <WizardSteps>
        <WizardStep Text="1">
            <Content>
                <h2>Content for Wizard Step 1</h2>
            </Content>
        </WizardStep>
        <WizardStep Text="2">
            <Content>
                <h2>Content for Wizard Step 2</h2>
            </Content>
        </WizardStep>
        <WizardStep Text="3">
            <Content>
                <h2>Content for Wizard Step 3</h2>
            </Content>
        </WizardStep>
    </WizardSteps>
</TelerikWizard>

<p>ValueChanged log: @Logger </p>

@code{

    string Logger { get; set; }

    int WizardValue { get; set; }

    void ValueChangedHandler(int newValue)
    {
        WizardValue = newValue;
        Logger = "ValueChanged fired, the new Wizard Step index is " + WizardValue;
    }
}
````

## OnFinish

The `OnFinish` event fires when the **Done** button of the Wizard is clicked.

>[Custom Wizard buttons]({%slug wizard-structure-buttons%}#custom-buttons) do not trigger the `OnFinish` event. See section [Execute Business Logic With Custom Wizard Buttons]({%slug wizard-structure-buttons%}#execute-business-logic-with-custom-wizard-buttons).

>caption Handle the `OnFinish` event of the Wizard (code snippet below)

![OnFinish](images/onfinish-example.gif)

````CSHTML
@* Handle the OnFinish event of the Wizard *@

<div style="text-align:center">
    <TelerikWizard OnFinish="@OnFinishHandler" Width="600px" Height="300px">
        <WizardSteps>
            <WizardStep Text="1">
                <Content>
                    <h2>Content for Wizard Step 1</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="2">
                <Content>
                    <h2>Content for Wizard Step 2</h2>
                </Content>
            </WizardStep>
            <WizardStep Text="3">
                <Content>
                    <h2>Content for Wizard Step 3</h2>
                </Content>
            </WizardStep>
        </WizardSteps>
    </TelerikWizard>
</div>

@code{

    async Task OnFinishHandler()
    {
        await Dialog.AlertAsync("You completed the Wizard!", "Congratulations!");
    }

    [CascadingParameter]
    public DialogFactory Dialog { get; set; }

}
````

## See Also

  * [Live Demos: Wizard Events](https://demos.telerik.com/blazor-ui/wizard/events)
