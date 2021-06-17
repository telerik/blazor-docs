---
title: Buttons
page_title: Wizard Buttons
description: Buttons of the Wizard for Blazor.
slug: wizard-structure-buttons
tags: telerik,blazor,wizard,buttons
published: True
position: 5
---

# Wizard Buttons

This article provide details on the buttons available in the Telerik Wizard. 
By default the Wizard provides three buttons, however it also provides option to add custom so you can customize it to match your desired scenario.

In this article:
* [Default buttons](#default-buttons)
* [Custom buttons](#custom-buttons)


## Default buttons

The Wizard provides the folloing default buttons:

* `Next` - navigates to the next step of the Wizard if it is <strong>enabled</strong>. When this condition is met, the following process will be triggered:
    * Invoke [`OnStepChange`]({%slug %}),
    * Go to the next page (if the event is not cancelled from `event args`)
    * Invoke [`ValueChanged`]({%slug %}) after the step is changed

* `Previous` - navigates to the previous step of the Wizard if it is <strong>enabled</strong>. When this condition is met, the following process will be triggered:
    * Invoke [`OnStepChange`]({%slug %}),
    * Go to the previous page (if the event is not cancelled from `event args`)
    * Invoke [`ValueChanged`]({%slug %}) after the step is changed

* `Done` - allows the user to complete the wizard. Invokes the [OnFinish] event({%slug %})

>caption Wizard with the Default buttons. The result from the snippet.

![Default buttons](images/default-buttons-example.png)

````CSHTML

````


## Custom buttons

The Wizard component allows you to include you desired custom buttons. You can define the desired buttons under the `WizardButtons` tag of the `TelerikWizard`.

This configuration overrides the whole rendering of the bottom section of the Wizard including the built-in buttons and the pager an thus provides a full control over it.

..to be discussed

## See Also

  * [Live Demos: Wizard Overview](https://demos.telerik.com/blazor-ui/wizard/buttons)