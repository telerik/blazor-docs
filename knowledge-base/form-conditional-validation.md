---
title: Conditional Form Validation
description: How to implement dynamic custom conditional form validation with the Telerik Blazor Form.
type: how-to
page_title: How to Use Conditional Form Validation
slug: form-kb-conditional-validation
position: 
tags: form, validation
ticketid: 1543336, 1558247, 1560189
res_type: kb
category: knowledge-base
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Form for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to apply custom conditional validation, based on user selection?

How to implement conditional *required* validation for a form field? There are fields that I want to set as required only when another field has a certain value.

How to set dynamic validation for Blazor form fields? I want to update the validation criteria of a TextBox at runtime.


## Solution

The **TelerikForm** supports any [validator that is compatible with the Blazor EditForm and EditContext]({%slug form-validation%}). There are several options to validate form values conditionally:

* Use a [third-party validator that allows conditional validation]({%slug form-validation%}#fluent-validation).
* Perform custom validation in the [Form's `OnSubmit` event]({%slug form-events%}#onsubmit).
* Implement [remote (server-side) custom validation](https://github.com/telerik/blazor-ui/tree/master/form/remote-validation).
* Use [`FormItem` Templates]({%slug form-formitems-template%}). Subscribe to the **change** handlers of the field editors to execute custom logic, show notifications, etc.
* Implement a [conditional `DataAnnotation` attribute](https://stackoverflow.com/questions/26354853/conditionally-required-property-using-data-annotations). To see inline error messages next to the field editor, use the [`ValidationResult` overload that passes a **field name**](https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationresult.-ctor?view=net-6.0#system-componentmodel-dataannotations-validationresult-ctor(system-string-system-collections-generic-ienumerable((system-string)))). In this way the form validator will know which field has failed validation.

    <div class="skip-repl"></div>

    ````CS
    return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName),
        new List<string> { validationContext.MemberName });
    ````
