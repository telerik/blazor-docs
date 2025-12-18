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

The `GridPagerTemplate` allows you to modify the layout, content, and functionality of the Pager. To page the data, you can use any set of Blazor components and DOM elements instead of the default Grid [Pager component](slug:pager-overview).

>caption Using the Telerik UI for Blazor Slider to paginate the Grid data

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
             FilterMode="GridFilterMode.FilterRow"
             Height="360px"
             Pageable="true"
             @bind-Page="@GridPage"
             PageSize="@GridPageSize"
             Sortable="true">
    <GridPagerTemplate>
        <div style="padding: var(--kendo-spacing-2); display: flex; justify-content: space-between; align-items: center;">
            @if (GridTotal > 0)
            {
                <TelerikSlider @bind-Value="@GridPage"
                            Min="1"
                            Max="@Convert.ToInt32(Math.Ceiling((decimal)GridTotal / (decimal)GridPageSize))"
                            Width="50%">
                </TelerikSlider>
            }
            <div>
                Page @GridPage. Showing rows @GetVisibleRowRange() or @CurrentPageTotal of @GridTotal
            </div>
        </div>
    </GridPagerTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private int GridPage { get; set; } = 1;
    private int GridPageSize { get; set; } = 10;

    private int CurrentPageTotal { get; set; }
    private int GridTotal { get; set; }

    private string GetVisibleRowRange()
    {
        return $"{(GridPage - 1) * GridPageSize + 1} - {Math.Min(GridPage * GridPageSize, GridTotal)}";
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        CurrentPageTotal = result.Data.Cast<Product>().Count();

        args.Total = result.Total;
        GridTotal = result.Total;

        args.AggregateResults = result.AggregateResults;
    }

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 47; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Group = $"Group {i % 3 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 10000),
                Released = DateTime.Today.AddDays(-rnd.Next(60, 1000)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
 * [Get Current Page of Grid Items and Total Count](slug:grid-kb-get-filtered-data)
