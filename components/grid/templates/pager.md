---
title: Pager Template
page_title: Grid Pager Template
description: Learn how to use a custom pager template in the Blazor Data Grid. The template allows you to customize the layout, content, and functionality of the Pager UI component.
slug: grid-templates-pager
tags: telerik,blazor,grid,templates,pager
published: True
position: 40
---


# Pager Template

The `GridPagerTemplate` allows you to modify the layout, content, and functionality of the Pager. To paginate the data, you can use any set of Blazor components and DOM elements instead of the default Grid [Pager](slug:pager-overview).


>caption Using the Telerik UI for Blazor Slider to paginate the Grid data

````RAZOR
@* Telerik Blazor Grid with Pager Template *@
<TelerikGrid Data="@GridData"
             Pageable="true"
             @bind-Page="@CurrentPage"
             PageSize="@PageSize">
    <GridPagerTemplate>
        <div style="padding:10px">
            <TelerikSlider @bind-Value="@CurrentPage"
                           Width="100%"
                           Min="1"
                           Max="@Total">
            </TelerikSlider>
        </div>
    </GridPagerTemplate>
    <GridColumns>
        <GridColumn Field="Name" Title="Product Name" />
        <GridColumn Field="Price" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:D}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    private int CurrentPage { get; set; } = 1;

    private int PageSize { get; set; } = 10;

    private int Total { get; set; } = 10;

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 100; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Price = (decimal)(rnd.Next(1, 50) * 3.14),
                    Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                    Discontinued = i % 5 == 0
                });

        }

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

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Blazor Grid](slug:grid-overview)

