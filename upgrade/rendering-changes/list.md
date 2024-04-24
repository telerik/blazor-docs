---
title: List of Versions
description: See which versions have rendering changes so you can take them into account when upgrading.
page_title: List of Versions with Rendering Changes
slug: versions-with-rendering-changes
position: 0
---

# List of Telerik UI for Blazor Versions with Rendering Changes


As the Telerik UI for Blazor matures we will continuously optimize the rendering and the usage of CSS classes. The rendering changes will affect the styling of the components if the business application overrode the built-in CSS rules. This article will track the version where such changes are introduced.

* [5.2.0]({%slug changes-in-5-2-0%})
* [4.6.0]({%slug changes-in-4-6-0%})
* [4.3.0]({%slug changes-in-4-3-0%})
* [4.0.0]({%slug changes-in-4-0-0%})
* [3.6.0]({%slug changes-in-3-6-0%})
* [3.4.0]({%slug changes-in-3-4-0%})

## Good Styling Practices

@[template](/_contentTemplates/common/good-styling-practices.md#good-styling-practices)

>caption Provide some custom CSS rules to the header and cells of the Grid. In the `Advisable` tab you can see the good practices in action. 

<div class="skip-repl"></div>
````Advisable
<style>
    .custom-header-style {
        font-weight: bold;
        color: red;
        font-style: italic;
    }

    .discontinued-product {
        color: white;
        background-color: red;
        font-weight: bold;
    }
</style>

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" HeaderClass="custom-header-style" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" OnCellRender="@OnCellRenderHandler" />
    </GridColumns>
</TelerikGrid>

@code {
    private void OnCellRenderHandler(GridCellRenderEventArgs args)
    {
        Product currentProduct = args.Item as Product;

        if (currentProduct.Discontinued)
        {
            args.Class = "discontinued-product";
        }
    }

    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
            {
                Id = x,
                Name = "Product name " + x,
                Price = (decimal)(x * 3.14),
                Released = DateTime.Now.AddMonths(-x).Date,
                Discontinued = x % 5 == 0
            }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
````Inadvisable
<style>
    .k-grid .k-grid-header .k-header:first-child {
        font-weight: bold;
        color: red;
        font-style: italic;
    }
</style>

<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true"
             FilterMode="@GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" />
        <GridColumn Field="@(nameof(Product.Released))" />
        <GridColumn Field="@(nameof(Product.Discontinued))" />
    </GridColumns>
</TelerikGrid>

@code {
    List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new Product
        {
            Id = x,
            Name = "Product name " + x,
            Price = (decimal)(x * 3.14),
            Released = DateTime.Now.AddMonths(-x).Date,
            Discontinued = x % 5 == 0
        }).ToList();

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````
