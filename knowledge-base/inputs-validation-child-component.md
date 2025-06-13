---
title: Validate a Telerik component as child component and apply invalid border
description: How to Validate a Telerik component as child component and apply invalid border
type: how-to
page_title: Validate a Telerik component as child component and apply invalid border
slug: inputs-kb-validate-child-component
position: 
tags: telerik, blazor, form, validation
ticketid: 1499665
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor,<br />
                ComboBox for Blazor,<br />
                DatePicker for Blazor,<br />
                DateTimePicker for Blazor,<br />
                DropDownList for Blazor,<br />
                MultiColumnComboBox for Blazor,<br />
                MultiSelect for Blazor,<br />
                TimePicker for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

I am wrapping a Telerik component inside a custom component in my Form. When I try to validate it, the red invalid border does not appear.

## Solution

Internally, the Telerik input components use the cascading `EditContext` parameter that the `EditForm` and `TelerikForm` provide. The `EditContext` API allow the components to determine if validation has passed or failed. If the validation fails, the components show a red border.

When you wrap an input component in another component, you must define a `ValueExpression` parameter in the custom component. This will allow the custom component to receive the correct expression from the parent component, which holds the Form. The Blazor framework generates the expression automatically when using `@bind-Value`, but not when there is another component in the component hierarchy tree.

The example below shows how to wrap a Telerik TextBox and DropDownList in different `.razor` files and get the invalid red border when the validation does not pass.

>caption Validate a TextBox and a DropDownList in custom components with ValueExpression parameters

````RAZOR Home.razor
@using System.ComponentModel.DataAnnotations

<TelerikForm Model="@CustomerToEdit"
             OnValidSubmit="@OnFormValidSubmit"
             Width="300px">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Customer.Id)" Enabled="false" LabelText="ID`" />
        <FormItem Field="@nameof(Customer.Name)">
            <Template>
                <label for="customer-name" class="k-label k-form-label">Name</label>
                <div class="k-form-field-wrap">
                    <TextBox @bind-Value="@CustomerToEdit.Name"
                             Id="customer-name" />
                </div>
            </Template>
        </FormItem>
        <FormItem Field="@nameof(Customer.CountryId)">
            <Template>
                <label for="customer-countryid" class="k-label k-form-label">Country</label>
                <div class="k-form-field-wrap">
                    <DropDownList Data="@Countries"
                                  @bind-Value="@CustomerToEdit.CountryId"
                                  TextField="@nameof(Country.Name)"
                                  ValueField="@nameof(Country.Id)"
                                  Id="customer-countryid" />
                </div>
            </Template>
        </FormItem>
    </FormItems>
</TelerikForm>

<p style="color:var(--kendo-color-success)"><strong>@FormSubmitResult</strong></p>

@code {
    private Customer CustomerToEdit { get; set; } = new();

    private List<Country> Countries { get; set; } = new();

    private string FormSubmitResult { get; set; } = string.Empty;

    private void OnFormValidSubmit()
    {
        FormSubmitResult = $"Form Submit Success at {DateTime.Now.ToString("HH:mm:ss")}";
    }

    protected override void OnInitialized()
    {
        Countries = new()
        {
            new() { Id = 1, Name = "Australia" },
            new() { Id = 2, Name = "Bulgaria" },
            new() { Id = 3, Name = "Germany" },
            new() { Id = 4, Name = "India" },
            new() { Id = 5, Name = "UK" },
            new() { Id = 6, Name = "USA" }
        };
    }
}
````
````RAZOR TextBox.razor
@using System.Linq.Expressions

<TelerikTextBox Value="@Value"
                ValueChanged="@ValueChanged"
                ValueExpression="@ValueExpression"
                Id="@Id" />

@code {
    [Parameter]
    public string Value { get; set; } = string.Empty;

    [Parameter]
    public EventCallback<string> ValueChanged { get; set; }

    [Parameter]
    public Expression<System.Func<string>>? ValueExpression { get; set; }

    [Parameter]
    public string Id { get; set; } = string.Empty;

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
````RAZOR DropDownList.razor
@using System.Linq.Expressions

@typeparam TItem
@typeparam TValue

<TelerikDropDownList Data="@Data"
                     Value="@Value"
                     ValueChanged="@ValueChanged"
                     ValueExpression="@ValueExpression"
                     TextField="@TextField"
                     ValueField="@ValueField"
                     Id="@Id" />

@code {
    [Parameter]
    public List<TItem>? Data { get; set; }

    [Parameter]
    public TValue? Value { get; set; }

    [Parameter]
    public EventCallback<TValue?> ValueChanged { get; set; }

    [Parameter]
    public Expression<System.Func<TValue?>>? ValueExpression { get; set; }

    [Parameter]
    public string Id { get; set; } = string.Empty;

    [Parameter]
    public string TextField { get; set; } = string.Empty;

    [Parameter]
    public string ValueField { get; set; } = string.Empty;

    private async Task TextBoxValueChanged(TValue? newValue)
    {
        Value = newValue;

        if (ValueChanged.HasDelegate)
        {
            await ValueChanged.InvokeAsync(newValue);
        }
    }
}
````
````C# Customer.cs
using System.ComponentModel.DataAnnotations;

public class Customer
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public int? CountryId { get; set; }
}

````
````C# Country.cs
public class Country
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
}
````

## See also

* [Knowledge Base article: How to handle the ValueChanged event and use forms and validation. ](slug:value-changed-validation-model)
* [Form Validation](slug:form-validation)
* [FormItem Template](slug:form-formitems-template)
