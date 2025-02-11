---
title: Use Form Items inside Custom Components
description: Learn how to use Telerik Blazor Form items inside custom components. See how to add Form items to child components of the Telerik Blazor Form and the FormItemsTemplate.
type: how-to
page_title: How to Use Form Items inside Custom Razor Components
slug: form-kb-use-items-in-custom-component
position: 
tags: telerik, blazor
ticketid: 1656228, 1647734
res_type: kb
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

This KB article answers the following questions:

* How to add Form items in another component, wnich is inside the Telerik Blazor form?
* How to wrap Form items in a reusable custom component?
* How to implement a `FormGroup` that contains a nested shared component with `FormItem` instances inside?
* How to put a `<FormItem>` in another component (control)?


## Solution

To render Form items inside custom Razor components:

1. Define all [`<FormGroup>`](slug:form-formgroups) and [`<FormItem>`](slug:form-formitems) instances inside the `<FormItems>` tag of the Form.
1. Add a [`<FormItemsTemplate>`](slug:form-formitems-formitemstemplate) tag to the Form.
1. Define [group renderers](slug:form-formitems-formitemstemplate#form-group-renderer) and [item renderers](slug:form-formitems-formitemstemplate#form-item-renderer) for the Form groups and items, which will be children of the `<FormItemsTemplate>`.
1. Add the custom Razor components inside `<FormItemsTemplate>`.
1. Define parameters for the custom Razor components, which will receive Form groups or Form items.
1. Define the required renderers inside the custom Razor components, according to the parameters from the previous step.

### Example

The example below assumes that the project name is `YourAppName` and the `Person` class is defined in namespace `YourAppName.Data`. Rename the namespaces in `Home.razor`, `MultipleFormItems.razor`, and `Person.cs` before running the code in your app.

* `Home.razor` is the main Razor file, which holds the Form.
* `SingleFormGroup.razor` includes a complete Form Group. The component receives an `IFormGroup` as a parameter.
* `MultipleFormItems.razor` renders multiple Form items that belong to a group. The component receives all items as a collection in a single parameter of type `FormGroupRendererTemplateContext`. This approach is not required and you can also define a different parameter for each item.
* `SingleFormItem.razor` includes a single Form item. The component receives an `IFormItem` as a parameter.

>caption Wrap Telerik Blazor Form groups and items in custom Razor components

<div class="skip-repl"></div>

````RAZOR Home.razor
@using YourAppName.Data

<TelerikForm Model="@Employee"
             Width="600px">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Person.Id)"></FormItem>
        <FormGroup LabelText="Names" Id="names-group">
            <FormItem Field="@nameof(Person.FirstName)" LabelText="First Name"></FormItem>
            <FormItem Field="@nameof(Person.LastName)" LabelText="Last Name"></FormItem>
        </FormGroup>
        <FormItem Field="@nameof(Person.BirthDate)" LabelText="Date of Birth" Id="birth-date-item"></FormItem>
        <FormGroup LabelText="Evaluations" Id="evaluations-group">
            <FormItem Field="@nameof(Person.InterviewNotes)"
                      LabelText="Interview Notes"
                      EditorType="@FormEditorType.TextArea"></FormItem>
            <FormItem Field="@nameof(Person.PerformanceReview)"
                      LabelText="Performance Notes"
                      EditorType="@FormEditorType.TextArea"></FormItem>
        </FormGroup>
    </FormItems>
    <FormItemsTemplate Context="formContext">
        @{
            var rootFormMembers = formContext.Items;
        }

        <TelerikFormItemRenderer Item="@( rootFormMembers.OfType<IFormItem>().First(x => x.Field == nameof(Person.Id)) )" />

        <TelerikFormGroupRenderer Group="@( (IFormGroup)rootFormMembers.First(x => x.Id == "names-group") )">
            <Template Context="groupContext">
                <MultipleFormItems Context="@groupContext" />
            </Template>
        </TelerikFormGroupRenderer>

        <SingleFormItem FormItem="@( rootFormMembers.OfType<IFormItem>().First(x => x.Field == nameof(Person.BirthDate)) )" />

        <SingleFormGroup FormGroup="@( (IFormGroup)rootFormMembers.First(x => x.Id == "evaluations-group") )" />

    </FormItemsTemplate>
</TelerikForm>

@code {
    private Person? Employee { get; set; }

    protected override void OnInitialized()
    {
        Employee = new Person()
        {
            Id = 1,
            FirstName = "John",
            LastName = "Doe",
            BirthDate = DateTime.Today.AddYears(-30)
        };

        base.OnInitialized();
    }
}
````
````RAZOR SingleFormGroup.razor
<div style="margin:.6em 0;padding:1em;background:#cf9;border:1px solid #ccc;">

    <p><strong><code>SingleFormGroup.razor</code></strong></p>

    <TelerikFormGroupRenderer Group="@FormGroup">
        <Template Context="groupContext">
            @foreach (IFormItem item in groupContext.Items)
            {
                <TelerikFormItemRenderer Item="@item" />
            }
        </Template>
    </TelerikFormGroupRenderer>

</div>

@code {
    [Parameter]
    public IFormGroup? FormGroup { get; set; }
}
````
````RAZOR MultipleFormItems.razor
@using YourAppName.Data

<div style="margin:.4em 0;padding:1em;background:#ffd;border:1px solid #ccc;">

    <p><strong><code>MultipleFormItems.razor</code></strong></p>

    <TelerikFormItemRenderer Item="@( Context?.Items.Cast<IFormItem>().First(x => x.Field == nameof(Person.FirstName)) )" />

    <TelerikFormItemRenderer Item="@( Context?.Items.Cast<IFormItem>().First(x => x.Field == nameof(Person.LastName)) )" />

</div>

@code {
    [Parameter]
    public FormGroupRendererTemplateContext? Context { get; set; }
}
````
````RAZOR SingleFormItem.razor
<div style="margin:.4em 0;padding:1em;background:#fdc;border:1px solid #ccc;">

    <p><strong><code>SingleFormItem.razor</code></strong></p>

    <TelerikFormItemRenderer Item="@FormItem" />

</div>

@code {
    [Parameter]
    public IFormItem? FormItem { get; set; }
}
````
````C# Person.cs
using System.ComponentModel.DataAnnotations;

namespace YourAppName.Data
{
    public class Person
    {
        [Editable(false)]
        public int Id { get; set; }

        [Required]
        [MaxLength(24)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(24)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        public DateTime BirthDate { get; set; } = DateTime.Today;

        public string InterviewNotes { get; set; } = string.Empty;

        public string PerformanceReview { get; set; } = string.Empty;
    }
}
````


## See Also

* [Form Template for All Items](slug:form-formitems-formitemstemplate)
* [Form Items](slug:form-formitems)
