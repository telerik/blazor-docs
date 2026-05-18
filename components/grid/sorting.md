---
title: Sorting
page_title: Grid - Sorting
description: Enable and configure sorting in Grid for Blazor.
slug: components/grid/features/sorting
tags: telerik,blazor,grid,sorting
published: True
position: 21
components: ["grid"]
---

# Grid Sorting

The Telerik Blazor Grid component supports single and multiple column sorting.

In this article:

* [Basics](#basics)
* [Sort From Code](#sort-from-code)
* [More Examples](#more-examples)


## Basics

To enable sorting, set the Grid `Sortable` property to `true`.

When the user clicks a column header, the Grid sorts the data according to the column's data type, and an arrow indicates the sorting direction next to the column title.

You can prevent the user from sorting a certain field by setting `Sortable="false"` on its column.

>caption Enable Sorting in the Telerik Blazor Grid

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@Product"
             Sortable="true"
             Height="90vh">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Category)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 20; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Category = $"Category {i % 3 + 1}",
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
        public string Category { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

### Multi Column Sorting

To allow sorting on more than one column at a time, set the Grid `SortMode` parameter to `Telerik.Blazor.SortMode.Multiple`. After the user sorts by several columns, the Grid shows numbers in the column headers that indicate the sorting priority.

>caption Enable multi column Grid sorting

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@Product"
             Sortable="true"
             SortMode="@SortMode.Multiple"
             Height="90vh">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.CategoryA)" Title="Category A" />
        <GridColumn Field="@nameof(Product.CategoryB)" Title="Category B" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 20; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                CategoryA = $"A {rnd.Next(1, 4)}",
                CategoryB = $"B {rnd.Next(1, 4)}",
                Price = rnd.Next(10, 20),
                Quantity = rnd.Next(0, 10),
                Discontinued = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CategoryA { get; set; } = string.Empty;
        public string CategoryB { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Sort From Code

You can sort the grid from your own code through its [state](slug:grid-state).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Set sorting programmatically

````RAZOR
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````

## More Examples

The following articles and sample projects can be helpful when implementing sorting:

* [Capture Sorted event](slug:grid-state#onstatechanged) - the grid state lets you know when it changes so you can capture different aspects of the change

* [Server Sorting](slug:components/grid/manual-operations) - this article explains how to implement manual data source operations so you can offload the work to the server. It provides the overview of how to setup the grid for that, and examples - several with local data and links a repository with examples using REST API endpoints.

## See Also

* [Live Demo: Grid Sorting](https://demos.telerik.com/blazor-ui/grid/sorting)
* [Blazor Grid](slug:grid-overview)
