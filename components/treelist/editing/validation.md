---
title: Validation
page_title: TreeList Validation
description: Built-in validation in the TreeList and how to customize the validation behavior.
slug: treelist-editing-validation
tags: telerik, blazor, treelist, validation, editing
published: True
position: 40
---

# TreeList Validation

The Telerik TreeList for Blazor supports built-in validation that is enabled by default. This article describes how the TreeList validation works and how to customize or disable it.

@[template](/_contentTemplates/treelist/editing.md#overview-required)

## Basics

By default, the TreeList validation uses a [`DataAnnotationValidator`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.dataannotationsvalidator) and creates an `EditContext` for the row that is in add or edit mode. When you use [inline](slug:treelist-editing-inline) or [in-cell](slug:treelist-editing-incell) editing, the TreeList renders validation messages in [Validation Tooltips](slug:validation-tools-tooltip) on hover of the invalid inputs. In popup edit mode, the TreeList shows a [Validation Summary](slug:validation-tools-summary) in the popup.

When a row is not in edit mode, the `EditContext` is `null`. The TreeList `EditContext` is a cascading parameter, which can overrides any cascading parameters from parent components, such as an `<EditForm>` that may wrap the TreeList.

The built-in TreeList validation is not supported with dynamic data such as `ExpandoObject`, `DataTable`, or `Dictionary`.

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## Disable Validation

To disable the built-in TreeList validation:

1. Add `<TreeListSettings>` as a child tag inside the TreeList.
1. Add a `<TreeListValidationSettings>` tag inside `<TreeListSettings>`.
1. Set the `Enabled` parameter of `TreeListValidationSettings` to false.

See the [example](#example) below.

## Use Custom Validator

You can validate the TreeList with any validator that uses the `EditContext`. To change the default validator:

1. Add `<TreeListSettings>` as a child tag inside the TreeList.
1. Add a `<TreeListValidationSettings>` tag inside `<TreeListSettings>`.
1. Define the custom validator in the `<ValidatorTemplate>` `RenderFragment` inside `<TreeListValidationSettings>`.

Third party validation tools are not part of Telerik UI for Blazor. Reference the required NuGet packages explicitly.

## Example

The example below shows how to:

* Enable and disable validation in the TreeList.
* Validate the user input with a custom validator instead of the default `DataAnnotationsValidator`.

Install the [`Blazored.FluentValidation`](https://www.nuget.org/packages/Blazored.FluentValidation) NuGet package to run the following code and refer to the [FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/built-in-validators.html).

>caption Use Telerik TreeList for Blazor with FluentValidation

````RAZOR.skip-repl
@* Requires the Blazored.FluentValidation NuGet package *@

@using Blazored.FluentValidation
@using FluentValidation
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(Employee.Id)"
                 ParentIdField="@nameof(Employee.ParentId)"
                 ConfirmDelete="true"
                 EditMode="@TreeListEditMode.Inline"
                 OnCreate="@OnTreeListCreate"
                 OnUpdate="@OnTreeListUpdate"
                 Height="400px">
    <TreeListSettings>
        <TreeListValidationSettings Enabled="@TreeListValidationEnabled">
            <ValidatorTemplate>
                <FluentValidationValidator Validator="@TreeListFluentValidator" />
            </ValidatorTemplate>
        </TreeListValidationSettings>
    </TreeListSettings>
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
        <label class="k-checkbox-label">
            <TelerikCheckBox @bind-Value="@TreeListValidationEnabled" />
            Enable Validation
        </label>
    </TreeListToolBarTemplate>
    <TreeListToolBarTemplate>
        <TreeListCommandButton Command="Add">Add Item</TreeListCommandButton>
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(Employee.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(Employee.Salary)" DisplayFormat="{0:C2}" Width="130px" />
        <TreeListColumn Field="@nameof(Employee.HireDate)" DisplayFormat="{0:d}" Width="140px" />
        <TreeListColumn Field="@nameof(Employee.IsDriver)" Width="80px" />
        <TreeListCommandColumn Width="160px">
            <TreeListCommandButton Command="Add">Add</TreeListCommandButton>
            <TreeListCommandButton Command="Edit">Edit</TreeListCommandButton>
            <TreeListCommandButton Command="Save" ShowInEdit="true">Save</TreeListCommandButton>
            <TreeListCommandButton Command="Cancel" ShowInEdit="true">Cancel</TreeListCommandButton>
        </TreeListCommandColumn>
    </TreeListColumns>
</TelerikTreeList>

@code {
    private IEnumerable<Employee>? TreeListData { get; set; }

    private EmployeeService TreeListEmployeeService { get; set; } = new();

    private FluentProductValidator TreeListFluentValidator = new();

    public class FluentProductValidator : AbstractValidator<Employee>
    {
        public FluentProductValidator()
        {
            RuleFor(item => item.Name).NotEmpty().MinimumLength(3).MaximumLength(24);
            RuleFor(item => item.Salary).NotNull().GreaterThan(0);
            RuleFor(item => item.HireDate).NotEmpty().GreaterThanOrEqualTo(DateTime.Today);
        }
    }

    private bool TreeListValidationEnabled { get; set; } = true;

    private async Task OnTreeListCreate(TreeListCommandEventArgs args)
    {
        var createdItem = (Employee)args.Item;
        var parentItem = (Employee?)args.ParentItem;

        await TreeListEmployeeService.Create(createdItem, parentItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    private async Task OnTreeListUpdate(TreeListCommandEventArgs args)
    {
        var updatedItem = (Employee)args.Item;

        await TreeListEmployeeService.Update(updatedItem);

        TreeListData = await TreeListEmployeeService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        TreeListData = await TreeListEmployeeService.Read();
    }

@[template](/_contentTemplates/treelist/editing.md#flat-crud-service-and-model)
}
````

## See Also

* [Custom TreeList `DataAnnotations` Validation](slug:validation-kb-custom-dataannotations-validator)
* [Remote Validation](https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation)
