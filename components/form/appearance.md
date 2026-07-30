---
title: Appearance
page_title: Form Appearance
description: Appearance settings of the Form for Blazor.
slug: form-appearance
tags: telerik,blazor,form,appearance
published: True
position: 35
components: ["form"]
---

# Appearance Settings

This article outlines the available Form parameters, which control its appearance.

## Size

You can increase or decrease the Form dimensions with the `Size` parameter, which affects the font size, margins, and paddings in the Form. The parameter also influences the nested Telerik components that are not part of a [`Template`](slug:form-formitems-template).

For a valid and readable Form configuration, set the `Size` to a `string` member of the static [`ThemeConstants.Form.Size`](slug:Telerik.Blazor.ThemeConstants.Form.Size) class. The following code snippets are equivalent:

>caption Setting the Form Size Parameter

````RAZOR.skip-repl
<TelerikForm Size="@ThemeConstants.Form.Size.Small" />

<TelerikForm Size="sm" />
````

## Example

>caption All Built-in Form Sizes

````RAZOR
@using System.ComponentModel.DataAnnotations

Form <code>Size</code>:
<TelerikRadioGroup Data="@FormSizes"
                   @bind-Value="@FormSize"
                   Layout="@RadioGroupLayout.Horizontal" />

<TelerikForm Model="@FormModel"
             Size="@FormSize"
             Width="300px">
    <FormValidation>
        <DataAnnotationsValidator></DataAnnotationsValidator>
        <TelerikValidationSummary />
    </FormValidation>
    <FormItems>
        <FormItem Field="@nameof(Product.Name)" />
        <FormItem Field="@nameof(Product.Price)" />
        <FormItem Field="@nameof(Product.Quantity)" />
        <FormItem Field="@nameof(Product.Released)" LabelText="Release Date" />
        <FormItem Field="@nameof(Product.Discontinued)" />
    </FormItems>
</TelerikForm>

@code {
    private Product FormModel { get; set; } = new();

    private readonly string[] FormSizes = new[]
    {
        ThemeConstants.Form.Size.Small,
        ThemeConstants.Form.Size.Medium,
        ThemeConstants.Form.Size.Large
    };

    private string FormSize { get; set; } = ThemeConstants.Form.Size.Medium;

    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(24)]
        public string Name { get; set; } = string.Empty;
        
        [Range(0, (double)decimal.MaxValue)]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public DateTime? Released { get; set; }

        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Live Demo: Form Appearance](https://demos.telerik.com/blazor-ui/form/appearance)
