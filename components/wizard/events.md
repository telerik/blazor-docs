---
title: Events
page_title: Wizard Events
description: Events of the Wizard for Blazor.
slug: wizard-events
tags: telerik,blazor,wizard,events
published: True
position: 100
components: ["wizard"]
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

>[Custom Wizard buttons](slug:wizard-structure-buttons#custom-buttons) do not trigger the `OnChange` event. See section [Execute Business Logic With Custom Wizard Buttons](slug:wizard-structure-buttons#execute-business-logic-with-custom-wizard-buttons).

The `OnChange` event handler is defined in the respective `<WizardStep>` tag.

>caption Handle the `OnChange` event of the first and second step (code snippet below)

<demo metaUrl="client/wizard/events/example-1/" height="520"></demo>

## ValueChanged

The `ValueChanged` event fires after the [`OnChange`](#onchange) event, if the latter has not been canceled. The handler receives the new Wizard value (step index) as an event argument. Make sure to set it to the `Value` parameter, so that the new step content is rendered.

>caption Handle the `ValueChanged` event of the Wizard

<demo metaUrl="client/wizard/events/example-2/" height="520"></demo>

## OnFinish

The `OnFinish` event fires when the **Done** button of the Wizard is clicked.

>[Custom Wizard buttons](slug:wizard-structure-buttons#custom-buttons) do not trigger the `OnFinish` event. See section [Execute Business Logic With Custom Wizard Buttons](slug:wizard-structure-buttons#execute-business-logic-with-custom-wizard-buttons).

>caption Handle the `OnFinish` event of the Wizard (code snippet below)

<demo metaUrl="client/wizard/events/example-3/" height="520"></demo>

## See Also

* [Live Demos: Wizard Events](https://demos.telerik.com/blazor-ui/wizard/events)
