---
title: FluentValidation Exception Cannot Validate Instances of Type 'ComponentName'
description: Learn how to troubleshoot and resolve runtime exceptions Cannot Validate Instances of Type 'ComponentName'. This Validator Can only Validate Instances of Type 'ModelClassName' in Blazor apps.
type: troubleshooting
page_title: FluentValidation Exception Cannot Validate Instances of Type 'ComponentName'. This Validator Can only Validate Instances of Type 'ModelClassName'
slug: form-kb-fluent-validation-cannot-validate-instances-of-type
tags: telerik, blazor, form, validation
ticketid: 1689449, 1644783, 1670949, 1672711, 1668735, 1595169, 1539619
res_type: kb
components: ["form"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Form for Blazor, <br />
                Grid for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

The KB article deals with the following scenarios that throw a runtime exception. It explains what causes the error and how to fix it.

* A Telerik Form is using a `FluentValidation` validator. A custom input component in a [`FormItem` `Template`](slug:form-formitems-template) crashes the page on value edit.
* An Telerik Grid with inline, incell or popup `EditMode` is using `<FluentValidationValidator>` for validation. One of the Grid columns has an `<EditorTemplate>` with a custom component that wraps a `<TelerikTextBox>`.

In both cases the exception message that occurs on value edit in the custom component is:

`Cannot validate instances of type 'ComponentName'. This validator can only validate instances of type 'ModelClassName'`

In general, the exception may occur when using `FluentValidation` with inputs that are wrapped in custom child components.

## Cause

The exception occurs, because the custom child component that holds the input is not receiving the correct `ValueExpression` from the parent component that holds the edit form.

The issue is not related to or caused by Telerik UI for Blazor. The same behavior can occur with a standard Blazor `EditForm` and `InputText` components.

## Solution

1. Define a public parameter of type `Expression<System.Func<T>>` in the child component. The purpose of this parameter is to receive the correct expression from the parent component. `T` is the value type, which the custom child component is editing. The parameter name must be consistent with the other two related parameter names that deal the two-way value binding:
    * `Foo`
    * `FooChanged`
    * `FooExpression`
1. Pass the validation expression from the parent to the child component. There are two possible options:
    * Use two-way binding for the value parameter (`@bind-Foo`) in the parent component.
    * Pass the expression explicitly by setting `FooExpression` in the parent component.

For a full runnable example, refer to [Form Fluent Validation](slug:form-validation#fluent-validation).

>caption Using ValueExpression for validation in child components

```RAZOR TextBox.razor
@using System.Linq.Expressions

<TelerikTextBox Value="@Value"
                ValueChanged="@ValueChanged"
                ValueExpression="@ValueExpression" />

@code {
    [Parameter]
    public string Value { get; set; } = string.Empty;

    [Parameter]
    public EventCallback<string> ValueChanged { get; set; }

    [Parameter]
    public Expression<System.Func<string>>? ValueExpression { get; set; }

    private async Task TextBoxValueChanged(string newValue)
    {
        Value = newValue;

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(newValue);
        }
    }
}
````
````RAZOR Home.razor
<TextBox @bind-Value="@PersonToEdit.FirstName" />

or

<TextBox Value="@PersonToEdit.FirstName"
         ValueChanged="@FirstNameChanged"
         ValueExpression="@( () => PersonToEdit.FirstName )" />

@code {
    private Person PersonToEdit { get; set; } = new();

    private void FirstNameChanged(string newValue)
    {
        PersonToEdit.FirstName = newValue;
    }

    public class Person
    {
        public string FirstName { get; set; } = string.Empty;
    }
}
````

## See Also

* [Form Validation](slug:form-validation#fluent-validation)
* [Form Item Templates](slug:form-formitems-template)
