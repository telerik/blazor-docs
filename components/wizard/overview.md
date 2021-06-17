---
title: Overview
page_title: Wizard Overview
description: Overview of the Wizard for Blazor.
slug: wizard-overview
tags: telerik,blazor,wizard,overview
published: True
position: 0
---

# Wizard Overview

The Wizard for Blazor component displays content in sequential, stepwise order. Each step of the Wizard has content (`render fragment`), which can contain any type of HTML content including a [Form]({% slug %}) component.

The Wizard is separated into 3 main sections:
* [Stepper]({% slug wizard-structure-stepper%})
* [Content]({% slug %})
* [Buttons]({% slug %})


#### To create a basic Telerik Wizard:

1. Use the `TelerikWizard` tag
1. under its `WizardSteps` tag, set and configure the desired `WizardStep` instances and include the desired content in their `Content` tag

>caption Set up a basic Telerik Wizard. The result from the snippet.

![Basic Wizard](images/basic-wizard-example.png)

````CSHTML

````

## Features

* StepperPosition - `WizardStepperPosition` - Specify where the stepper is rendered against the wizard content. The default is `Top`. Read more about its configuration in the [Layout]() article.

* Value - `int` - Specifies the current step index.

* Width - `string` - Specifies the width of the Wizard.

* Height - `string` - Specifies the height of the Wizard.

* `ShowPager` - `bool` - Specifies if the pager text should be shown.

* `Class` - CSS class that will be rendered on the main wrapping element of the Wizard.

## See Also

  * [Live Demos: Wizard Overview](https://demos.telerik.com/blazor-ui/wizard/index)