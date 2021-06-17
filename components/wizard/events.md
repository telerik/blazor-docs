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

This article explains the events available in the Telerik DropDownList for Blazor:

* [OnChange](#onchange)
* [ValueChanged](#valuechanged)
* [OnFinish](#onfinish)

## OnChange

The OnChange event is triggered on the current step and fires before the step has changed. It receives an argument of type `WizardStepChangeEventArgs` which exposes the following fields:

* `TargetIndex` - contains the index of the targeted new Wizard step.
* `IsCancelled` - specifies whether the event is canceled and the built-in action is prevented.

>caption Handle the `OnChange` event of the first and second steps. The result from the snippet below.


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

The `ValueChanged` event fires after the Step has been changed.

>caption Handle the `ValueChanged` event of the Wizard. The result from the snippet below.


![ValueChanged](images/valuechanged-example.gif)

````CSHTML
@* Handle the ValueChanged event of the Wizard *@

@Logger

<div style="text-align:center">
    <TelerikWizard ValueChanged="@ValueChangedHandler" Width="600px" Height="300px">
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

    public string Logger { get; set; }

    void ValueChangedHandler()
    {
        Logger = "ValueChanged fired. You can perform the desired logic here.";
    }

}
````

## OnFinish

The `OnFinish` event fires when the Done button of the Wizard is clicked.

>caption Handle the `ValueChanged` event of the Wizard. The result from the snippet below.


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

  * [Live Demos: Wizard Overview](https://demos.telerik.com/blazor-ui/wizard/events)