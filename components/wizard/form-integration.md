---
title: Form Integration
page_title: Wizard Form Integration
description: Form Integration in the Wizard for Blazor.
slug: wizard-form-integration
tags: telerik,blazor,wizard,form,integration
published: True
position: 15
components: ["wizard"]
---

# Form Integration

The Wizard component provides integration with the [Telerik Form](slug:form-overview).

Each step of the Wizard can include an instance of Telerik Form inside its `Content` tag. You will be able to use all the built-in features of the Form including its [Validation](slug:form-validation) to achieve the desired Wizard configuration.

If the Form validation is not satisfied, you can cancel the `OnChange` event of the step and prevent the user from moving to the next step until the Form is valid. To even improve the UX, you can also toggle the [`Valid`](slug:wizard-structure-stepper#valid) or [`Disabled`](slug:wizard-structure-stepper#disabled) parameters to add another visual aspect in the validation process.


>caption Integrate a Form component in the Telerik Wizard. Use its validation state to control the `Valid` parameter of the Steps.

<demo metaUrl="client/wizard/form-integration/example-1/" height="720"></demo>

## See Also

* [Live Demos: Wizard Form](https://demos.telerik.com/blazor-ui/wizard/form)