---
title: Child content element uses the same parameter name ('context')
description: How to avoid error - A child content element uses the same parameter name ('context') as enclosing child content element of another component. Specify the context parameter name to resolve the ambiguity
type: troubleshooting
page_title: Child content element uses the same parameter name ('context')
slug: nest-renderfragment
position: 
tags: context, child, content, element, nest, renderfragment, render, fragment, enclosing
ticketid: 1432878, 1525801, 1525673, 1525563, 1525450, 1593007
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

The Blazor app produces exceptions when using `RenderFragment` templates in Telerik Blazor components.


## Error Message

The exception message can vary by component name, but the common wording will be similar to:

`The child content element ChildContent of component GridCommandColumn uses the same parameter name (context) as enclosing child content element ChildContent of component EditForm. Specify the parameter name like: <ChildContent Context="another_name"> to resolve the ambiguity.`

or

`The child content element DetailTemplate of component TelerikGrid uses the same parameter name (context) as enclosing child content element DetailTemplate of component TelerikGrid. Specify the parameter name like: <DetailTemplate Context="another_name"> to resolve the ambiguity.`

or

`RZ9999: The child content element Template of component GridColumn uses the same parameter name (context) as enclosing child content element ... of component .... Specify the parameter name like <Template Context="another_name"> to resolve the ambiguity.`

You may also see the following error:

`Cannot convert lambda expression to intended delegate type because some of the return types in the block are not implicitly convertible to the delegate return type.`


## Possible Cause

When nesting components, you will usually do that under tags of type `RenderFragment`. For example, the [`DetailTemplate`](slug:grid-three-level-hierarchy) or the [`GridCommandColumn`](slug:components/grid/columns/command#context) are such examples. Blazor provides an internal variable called [`context`](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/templated-components) for the delegate of the `RenderFragment`. However, if there are nested `RenderFragment`s, this will create multiple `context` variables with the same name in the same programming context. This conflict triggers the exception.


## Solution

Use **named** `context` variables, as the exception message suggests. Each `RenderFragment` should expose a `Context` parameter that lets you choose a name for the variable that you will use instead of the default `context`. This lets you nest the same tags inside one another, and it also resolves the type of the `context` data.

The example below uses three-level Grid hierarchy with different `RenderFragment`s with a `Context` parameter: `DetailTemplate`, column `Template` and `GridCommandColumn`.

>caption Use nested RenderFragments with Telerik UI for Blazor

````RAZOR
<p>CATEGORY Grid with nested <code>RenderFragment</code> templates.</p>

<TelerikGrid Data="@CategoryData">
    <GridColumns>
        <GridColumn Field="@nameof(Category.Name)" Title="Category">
            <Template Context="categoryColumnContext">
                @{
                    var categoryItem = categoryColumnContext as Category;
                }
                <strong>@categoryItem.Name</strong>
            </Template>
        </GridColumn>
        <GridCommandColumn Context="categoryCommandContext">
            @{
                var categoryItem = categoryCommandContext as Category;
            }
            <GridCommandButton>Button for <strong>@categoryItem.Name</strong></GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate Context="categoryDetailContext">
        @{
            var parentCategoryItem = categoryDetailContext as Category;
        }
        <p>PRODUCT Grid with nested <code>RenderFragment</code> templates.</p>
        <TelerikGrid Data="@ProductData.Where(x => x.CategoryId == parentCategoryItem.Id)">
            <GridColumns>
                <GridColumn Field="@nameof(Product.Name)" Title="Product">
                    <Template Context="productColumnContext">
                        @{
                            var productItem = productColumnContext as Product;
                        }
                        <em>@productItem.Name</em>
                    </Template>
                </GridColumn>
                <GridCommandColumn Context="productCommandContext">
                    @{
                        var productItem = productCommandContext as Product;
                    }
                    <GridCommandButton>Button for <em>@productItem.Name</em></GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
            <DetailTemplate Context="productDetailContext">
                @{
                    var parentProductItem = productDetailContext as Product;
                }
                <p>PART Grid with nested <code>RenderFragment</code> templates.</p>
                <TelerikGrid Data="@PartData.Where(x => x.ProductId == parentProductItem.Id)">
                    <GridColumns>
                        <GridColumn Field="@nameof(Part.Name)" Title="Part">
                            <Template Context="partColumnContext">
                                @{
                                    var partItem = partColumnContext as Part;
                                }
                                @partItem.Name
                            </Template>
                        </GridColumn>
                        <GridCommandColumn Context="partCommandContext">
                            @{
                                var partItem = partCommandContext as Part;
                            }
                            <GridCommandButton>Button for @partItem.Name</GridCommandButton>
                        </GridCommandColumn>
                    </GridColumns>
                </TelerikGrid>
            </DetailTemplate>
        </TelerikGrid>
    </DetailTemplate>
</TelerikGrid>

@code {
    private List<Category> CategoryData { get; set; }

    private List<Product> ProductData { get; set; }

    private List<Part> PartData { get; set; }

    protected override void OnInitialized()
    {
        CategoryData = new List<Category>();
        ProductData = new List<Product>();
        PartData = new List<Part>();

        for (int i = 1; i <= 3; i++)
        {
            CategoryData.Add(new Category()
            {
                Id = i,
                Name = "Category " + i
            });
        }

        for (int i = 1; i <= 6; i++)
        {
            ProductData.Add(new Product()
            {
                Id = i,
                CategoryId = i % 3 + 1,
                Name = "Product " + i
            });
        }

        for (int i = 1; i <= 12; i++)
        {
            PartData.Add(new Part()
            {
                Id = i,
                ProductId = i % 6 + 1,
                Name = "Part " + i
            });
        }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
    }

    public class Part
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [ASP.NET Core Blazor templated components](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/templated-components)
