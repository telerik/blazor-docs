---
title: Validation
page_title: Grid Validation
description: Built-in validation in the Grid and how to customize the validation behavior.
slug: grid-editing-validation
tags: telerik, blazor, grid, validation, editing
published: True
position: 40
components: ["grid"]
---
# Grid Validation

The Telerik Grid for Blazor supports built-in validation that is enabled by default. This article describes how the Grid validation works and how to customize or disable it.

@[template](/_contentTemplates/grid/editing.md#overview-required)

## Basics

By default, the Grid validation uses a [`DataAnnotationValidator`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.dataannotationsvalidator) and creates an `EditContext` for the row that is in add or edit mode. When you use [inline](slug:grid-editing-inline) or [in-cell](slug:grid-editing-incell) editing, the Grid renders validation messages in [Validation Tooltips](slug:validation-tools-tooltip) on hover of the invalid inputs. In popup edit mode, the Grid shows a [Validation Summary](slug:validation-tools-summary) in the popup.

When a row is not in edit mode, the `EditContext` is `null`. The Grid `EditContext` is a cascading parameter, which can overrides any cascading parameters from parent components, such as an `<EditForm>` that may wrap the Grid.

The built-in Grid validation is not supported with dynamic data such as `ExpandoObject`, `DataTable`, or `Dictionary`.

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

## Disable Validation

To disable the built-in Grid validation:

1. Add `<GridSettings>` as a child tag inside the Grid.
1. Add a `<GridValidationSettings>` tag inside `<GridSettings>`.
1. Set the `Enabled` parameter of `GridValidationSettings` to false.

See the [example](#example) below.

## Use Custom Validator

You can validate the Grid with any validator that uses the `EditContext`. To change the default validator:

1. Add `<GridSettings>` as a child tag inside the Grid.
1. Add a `<GridValidationSettings>` tag inside `<GridSettings>`.
1. Define the custom validator in the `<ValidatorTemplate>` `RenderFragment` inside `<GridValidationSettings>`.

Third party validation tools are not part of Telerik UI for Blazor. Reference the required NuGet packages explicitly.

## Example

The example below shows how to:

* Enable and disable validation in the Grid.
* Validate the user input with a custom validator instead of the default `DataAnnotationsValidator`.

Install the [`Blazored.FluentValidation`](https://www.nuget.org/packages/Blazored.FluentValidation) NuGet package to run the following code and refer to the [FluentValidation documentation](https://docs.fluentvalidation.net/en/latest/built-in-validators.html).

>caption Use Telerik Grid for Blazor with FluentValidation

````RAZOR.skip-repl
@* Requires the Blazored.FluentValidation NuGet package *@

@using Blazored.FluentValidation
@using FluentValidation

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
             OnCreate="@OnGridCreate"
             OnUpdate="@OnGridUpdate">
    <GridSettings>
        <GridValidationSettings Enabled="@GridValidationEnabled">
            <ValidatorTemplate>
                <FluentValidationValidator Validator="@GridFluentValidator" />
            </ValidatorTemplate>
        </GridValidationSettings>
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add Item</GridCommandButton>
        <label class="k-checkbox-label">
            <TelerikCheckBox @bind-Value="@GridValidationEnabled" />
            Enable Validation
        </label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private FluentProductValidator GridFluentValidator = new();

    public class FluentProductValidator : AbstractValidator<Product>
    {
        public FluentProductValidator()
        {
            RuleFor(item => item.Name).NotEmpty().MinimumLength(3).MaximumLength(24);
            RuleFor(item => item.Price).NotNull().GreaterThan(0);
            RuleFor(item => item.ReleaseDate).NotEmpty().GreaterThanOrEqualTo(DateTime.Today.AddYears(-10));
        }
    }

    private bool GridValidationEnabled { get; set; } = true;

    private int LastId { get; set; }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        createdItem.Id = ++LastId;

        GridData.Insert(0, createdItem);
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;
        int originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Product {LastId}",
                Price = LastId % 2 == 0 ? null : Random.Shared.Next(0, 100) * 1.23m,
                Quantity = LastId % 2 == 0 ? 0 : Random.Shared.Next(0, 3000),
                ReleaseDate = DateTime.Today.AddDays(-Random.Shared.Next(365, 3650)),
                Discontinued = LastId % 2 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Custom Grid `DataAnnotations` Validation](slug:validation-kb-custom-dataannotations-validator)
* [Remote Validation](https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation)
