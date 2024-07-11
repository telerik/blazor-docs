---
title: Wrap Form Items in Custom Component
description: 
type: how-to
page_title: How to Wrap Form Items in Custom Component
slug: form-kb-wrap-items-in-custom-component
position: 
tags: telerik, blazor
ticketid: 
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

* How to


## Solution

Here are the required steps to exclude Telerik UI for Blazor components from `telerik-blazor.js` and rebuild the Telerik JSInterop file.

1. Login to your [Telerik account](https://www.telerik.com/account/).

>caption Example

````Home.razor
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
    private Person Employee = new Person();

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
````SingleFormGroup.razor
<div style="margin:.6em 0;padding:1em;background:#cf9;border:1px solid #ccc;">

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
````MultipleFormItems.razor
@using SupportServer.Data

<div style="margin:.4em 0;padding:1em;background:#ffd;border:1px solid #ccc;">

    <TelerikFormItemRenderer Item="@( Context?.Items.Cast<IFormItem>().First(x => x.Field == nameof(Person.FirstName)) )" />

    <TelerikFormItemRenderer Item="@( Context?.Items.Cast<IFormItem>().First(x => x.Field == nameof(Person.LastName)) )" />

</div>

@code {
#nullable enable

    [Parameter]
    public FormGroupRendererTemplateContext? Context { get; set; }
}
````
````SingleFormItem.razor
<div style="margin:.4em 0;padding:1em;background:#fc9;border:1px solid #ccc;">

    <TelerikFormItemRenderer Item="@FormItem" />

</div>

@code {
    [Parameter]
    public IFormItem? FormItem { get; set; }
}
````
````Person.cs
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

* [Adding Telerik UI for Blazor to a Blazor app]({%slug getting-started/what-you-need%})
