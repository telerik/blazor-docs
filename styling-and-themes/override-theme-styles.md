---
title: Override Theme Styles
page_title: Override Theme Styles
description: General rules of thumb to override UI for Blazor themes
slug: themes-override
tags: telerik,blazor,theme,override
published: True
position: 25
previous_url: /styling-and-themes/good-styling-practices
---

# Override Theme Styles

Sometimes you may need to make a small change to the appearance of a component, while still using the same [built-in](slug://themes-overview) or [custom](slug://themes-customize) theme.

This article provides high-level guidance about the knowledge and tools required to override existing CSS styles without changing the theme's CSS file. In scenarios with a larger number of customizations, it may be [more practical to use a different approach, for example, a custom theme](slug://common-kb-theme-customization-options).

## CSS Knowledge

To override an existing style, you implement another [conflicting style](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#conflicting_rules). To make sure the new style takes precedence, it should have a *higher specificity*. If it has the same specificity, then the style should come later in the order of CSS rules and files on the page.

* [MDN Documentation for CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity). You may prefer a [less formal explanation](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/).
* How to easily [calculate CSS Specificity](https://stuffandnonsense.co.uk/blog/css-specisithity).
* [CSS Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) provide different ways to target an element, depending on its place in the DOM structure. Combinators are often called ["selectors"](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors), which is something different. Developers most commonly use *descendant* or *child* combinators, but there are many other options.

## Tools

To see what CSS styles are applied on an HTML element, use the browser's developer tools.

* [Inspect the HTML output of a page](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#inspect-the-generated-html-of-a-control)
* [See the applied styles for a specific element](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools#see-the-applied-styles)
* [Inspect elements that hide automatically and disappear from the DOM](https://www.telerik.com/blogs/improve-your-debugging-skills-with-chrome-devtools-(part-2)#inspect-auto-hiding-tooltips-and-elements)

## Blazor CSS Isolation

[CSS isolation](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/css-isolation) is a .NET feature, which scopes styles to a specific Razor component.

* There are two cases when CSS isolation may not work with UI for Blazor components. We explain the reasons and suggest workarounds in [this knowledge base article](slug://common-kb-css-isolation). The two cases are:
   * Using isolated styles with a component `Class`.
   * Using isolated styles for popups (Window, Dialog).

## Best Practices

When implementing CSS overrides, it's usually best to set custom CSS classes through the exposed component parameters and event arguments. This brings the following benefits:

* There is less need to be familiar with the components' HTML rendering and built-in CSS styles, although this knowledge is recommended and cannot be fully avoided.
* The custom CSS code in the application is more future-proof if a [rendering change](slug://versions-with-rendering-changes) occurs.
* The custom CSS classes may follow a naming convention of the app, instead of the naming convention of the Telerik themes.

The example below demonstrates using custom CSS classes with the Grid and the ComboBox.

>caption Style Telerik Blazor components with custom CSS classes

````RAZOR
<style>
    .custom-grid {
        border-color: #00f;
    }

        .custom-grid .custom-grid-header {
            font-weight: bold;
            color: #f00;
            background: #ff0;
            font-style: italic;
        }

    .custom-combobox {
        font-size: 12px;
        color: #00f;
        font-weight: bold;
        border-color: #00f;
    }
</style>

<TelerikComboBox Data="@SampleData"
                 @bind-Value="@ComboBoxValue"
                 Class="custom-combobox"
                 TextField="@nameof(Product.Name)"
                 ValueField="@nameof(Product.Id)"
                 Filterable="true"
                 ShowClearButton="true">
</TelerikComboBox>

<br /><br />

<TelerikGrid Data="@SampleData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Class="custom-grid">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" HeaderClass="custom-grid-header" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Released)" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> SampleData { get; set; } = new();

    private int ComboBoxValue { get; set; } = 2;

    protected override void OnInitialized()
    {
        SampleData = Enumerable.Range(1, 30).Select(x => new Product
        {
            Id = x,
            Name = $"Product name {x}",
            Price = (decimal)(Random.Shared.Next(1, 100) * 1.23),
            Released = DateTime.Now.AddDays(-Random.Shared.Next(60, 1500)).Date,
            Discontinued = x % 5 == 0
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [How to customize the look of Telerik Blazor components](slug://common-kb-theme-customization-options)
