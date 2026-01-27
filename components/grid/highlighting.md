---
title: Highlighting
page_title: Grid Highlighting
slug: grid-highlighting
description: Highlight rows and cells in the Telerik Blazor Grid to draw attention to important data.
tags: telerik,blazor,grid,highlight,highlighting
published: true
position: 40
components: ["grid"]
---
# Blazor Grid Highlighting

The Telerik Blazor Grid enables you to highlight rows and cells programmatically. Use highlighting to draw attention to important data, indicate status, or visually group related records. Highlighting does not require user interaction and is fully controlled by the application logic.

## Key Features

* Highlight entire rows by providing a list of data items.
* Highlight individual cells by specifying the data item and column.
* Combine row and cell highlighting.
* Highlighting uses a visual style similar to selection, but does not affect selection state or user interaction.

To see the Grid highlighting in action, check the below [example](#example).

## API Reference

The Grid highlighting feature exposes the following parameters:

- `HighlightedItems`—Highlight entire rows by providing the data items to highlight. The list must contain references to items from the grid's data source, not new instances.
- `HighlightedCells`—Highlight individual cells by specifying both the data item and the column field. Both values must match the Grid data and column definitions.

See [Grid Highlighting API Reference](slug:telerik.blazor.components.HighlightedCellDescriptor) for details about these parameters and the `GridHighlightedCellDescriptor` type.

## Example

>caption Example of highlighting rows and cells in the Blazor Grid

````RAZOR 
<TelerikGrid Data="@GridData"
             HighlightedItems="@HighlightedItems"
             HighlightedCells="@HighlightedCells"
             Pageable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Product.ProductId)" />
        <GridColumn Field="@nameof(Product.ProductName)" />
        <GridColumn Field="@nameof(Product.UnitPrice)" />
        <GridColumn Field="@nameof(Product.UnitsInStock)" />
        <GridColumn Field="@nameof(Product.CreatedAt)" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();
    private List<Product> HighlightedItems { get; set; } = new();
    private List<GridHighlightedCellDescriptor> HighlightedCells { get; set; } = new();

    protected override void OnInitialized()
    {
        GenerateData();
        SetHighlight();
    }

    private void SetHighlight()
    {
        // Highlight 5 items starting from the 3rd item in the data list
        HighlightedItems = GridData.Skip(2).Take(5).ToList();

        // Highlight specific cells: the ProductName of the first item and Discounted of the second item
        HighlightedCells = new List<GridHighlightedCellDescriptor>
        {
            new GridHighlightedCellDescriptor
            {
                ColumnField = nameof(Product.ProductName),
                DataItem = GridData[0]
            },
            new GridHighlightedCellDescriptor
            {
                ColumnField = nameof(Product.Discontinued),
                DataItem = GridData[1]
            }
        };
    }

    private void GenerateData()
    {
        var random = new Random();
        for (int i = 1; i <= 20; i++)
        {
            GridData.Add(new Product
            {
                ProductId = i,
                ProductName = $"Product {i}",
                UnitPrice = Math.Round(random.NextDouble() * 100, 2),
                UnitsInStock = random.Next(1, 100),
                CreatedAt = DateTime.Now.AddDays(-random.Next(1, 100)),
                Discontinued = i % 5 == 0
            });
        }
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public double UnitPrice { get; set; }
        public int UnitsInStock { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Grid Selection](slug:grid-selection-overview)
* [Highlighting API Reference](slug:telerik.blazor.components.HighlightedCellDescriptor)