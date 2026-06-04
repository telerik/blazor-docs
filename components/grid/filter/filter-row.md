---
title: Filter Row
page_title: Grid - Filter Row
description: Enable and configure Filter Row in Grid for Blazor.
slug: grid-filter-row
tags: telerik,blazor,grid,filtering,filter,row
published: True
position: 5
components: ["grid"]
---
# Grid Filter Row

The FilterRow filtering mode renders a row below the column headers, providing a UI where you can fill in the filter criteria.

The Grid applies the filters as the user types in the filtering input. 

## Enabling Filter Row

Set the `FilterMode` parameter of the Telerik Grid to `GridFilterMode.FilterRow` and make sure that all filterable columns have their `Field` parameter set.

````RAZOR.skip-repl
<TelerikGrid FilterMode="@GridFilterMode.FilterRow" />
````

Also see the full [runnable example](#example) below.

The default filter operator is `Contains` for `string` columns and `IsEqualTo` for numbers and dates. Boolean columns display a filtering drop down that effectively combines the filter operator and value.

## Customization

You can customize the default behavior of the filter row with parameters of the columns and the Grid.

### Configuring the Filter Row

You can override the default Filter Row behavior for each column through the following properties the `GridColumn` exposes:

@[template](/_contentTemplates/common/filtering.md#filter-row-customization-properties)

### Debouncing the Filtering

@[template](/_contentTemplates/common/filtering.md#filter-debounce-delay-customization)

### Filter Row Template

The template will let you have full control over the Filter Row rendering and behavior. See how you can implement it and explore the example in the [Filter Row Template](slug:grid-templates-filter#filter-row-template) article.

## Filter From Code

To learn how to programmatically filter the Grid, refer to the [Grid State](slug:grid-state) documentation article. You can filter the Grid on initial display with the [`OnStateInit` event](slug:grid-state#onstateinit) or at any time afterwards with the [`SetStateAsync()` method](slug:grid-state#methods).

## Example

>caption Using the Grid Filter Row

````RAZOR
@using Telerik.DataSource

<TelerikGrid Data="@GridData"
             TItem="@Product"
             FilterMode="GridFilterMode.FilterRow"
             FilterRowDebounceDelay="200"
             Pageable="true"
             Sortable="true"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)"
                    DefaultFilterOperator="@FilterOperator.Contains"
                    ShowFilterCellButtons="false" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.Released)"
                    DisplayFormat="{0:d}"
                    DefaultFilterOperator="@FilterOperator.IsGreaterThanOrEqualTo"
                    FilterEditorFormat="d"
                    FilterEditorType="@GridFilterEditorType.DatePicker" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 27; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
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
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Grid Filtering Overview](slug:components/grid/filtering)
* [Live Demo: Grid Filter Row](https://demos.telerik.com/blazor-ui/grid/filter-row)
* [Blazor Grid](slug:grid-overview)
