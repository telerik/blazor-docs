---
title: Validation
page_title: Validation
description: Validation for the Stepper for Blazor.
slug: stepper-steps-validation
tags: telerik,blazor,stepper,steps,validation
published: True
position: 7
components: ["stepper"]
---

# Steps Validation

The Stepper component allows you to set validation logic for each step. You can configure it through the `Valid` parameter of the `StepperStep` which accepts `bool?`.

Step validation serves as a visual indication whether a step is valid or not. It does not prevent the users from navigating between steps.

You can toggle the `Valid` parameter value based on your application logic to accordingly render success or error icon. You can then use the `Valid` parameter value to perform logic for any further desired operations (for example preventing the user from navigating to the next step if the current one is invalid).

Depending on the [display mode](slug:stepper-display-modes) the Stepper is using, validation icons will be displayed either in the step indicator or as part of the step label.


In this article:

* [Validation in Stepper with Display mode: Steps](#validation-in-stepper-with-display-mode-steps)
* [Validation in Stepper with Display mode: Labels](#validation-in-stepper-with-display-mode-labels)

## Validation in Stepper with Display mode: Steps

If the Stepper uses the default display mode ([`Steps`](slug:stepper-display-modes#steps)), the validation icons will be displayed in the step indicator regardless of whether or not a label is defined for every step.

When validation icons are rendered inside the indicators, they will override the content of the step indicator (text, icon etc). They have priority over the step indicator content in order to notify whether the corresponding step is valid or not.

>caption Setup Steps validation in a Stepper with Display mode: Steps.

<demo metaUrl="client/stepper/steps/validation/example-2/" height="320"></demo>

## Validation in Stepper with Display mode: Labels

If the Stepper uses the [`Labels`](slug:stepper-display-modes#labels)display mode, the validation icons will be displayed as part of the step label.

>caption Setup Steps validation in a Stepper with Display mode: Labels.

<demo metaUrl="client/stepper/steps/validation/example-1/" height="320"></demo>


## See Also

* [Live Demo: Stepper Validation](https://demos.telerik.com/blazor-ui/stepper/validation)