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
components: ["form"]
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

The **TelerikForm** supports any [validator that is compatible with the Blazor EditForm and EditContext](slug:form-validation). There are several options to validate form values conditionally:

* Use a [third-party validator that allows conditional validation](slug:form-validation#fluent-validation).
* Perform custom validation in the [Form's `OnSubmit` event](slug:form-events#onsubmit).
* Implement [remote (server-side) custom validation](https://github.com/telerik/blazor-ui/tree/master/form/remote-validation).
* Use [`FormItem` Templates](slug:form-formitems-template). Subscribe to the **change** handlers of the field editors to execute custom logic, show notifications, etc.
* Implement a [custom conditional `DataAnnotations` attribute](slug:validation-kb-custom-dataannotations-validator). To see inline error messages next to the field editor, return the [`ValidationResult` overload that accepts the invalid field name(s)](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.validationresult). In this way the form validator will know which field has failed validation.

    <div class="skip-repl"></div>

    ````CS
    return new ValidationResult(this.FormatErrorMessage(validationContext.DisplayName),
        new List<string> { validationContext.MemberName });
    ````

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## See Also

* [Custom `DataAnnotations` Validation](slug:validation-kb-custom-dataannotations-validator)
* [Fluent Validation](slug:form-validation#fluent-validation)
* [Live Demo: DateRangePicker Custom DataAnnotation Attribute](https://demos.telerik.com/blazor-ui/daterangepicker/validation)
