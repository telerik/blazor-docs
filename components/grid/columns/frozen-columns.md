---
title: Frozen
page_title: Grid for Blazor | Frozen Columns
description: Drag to reorder columns in the Grid for Blazor
slug: grid-columns-frozen
tags: telerik,blazor,grid,column,freeze,frozen
published: False
position: 5
---

# Freeze Columns

The Grid lets you freeze one or more columns. This will allow the user to [scroll]({%slug components/grid/overview%}#scrolling) horizontally through the Grid, but still be able to keep some important data visible at all times.

The `Locked` parameter applies to the following **parts of the column**:
* Header
* Content
* Footer

# Requirements
To enable the column freezing, set the `Locked` parameter of the column to `true`.

Set the [Width]({%slug grid-columns-width%}) parameter of the Grid in pixels.

All columns need to have their `Width` parameter set in **pixels** to enable horizontal scrolling in the Grid.

>caption Frozen Columns in Telerik Grid

````CSHTML
@* Click on the Freeze / Unfreeze button to observe Freezing and Unfreezing a selected column. This approach can be used to programmatically toggle the Locked parameter of any column *@

<p>
    <TelerikButton ButtonType="ButtonType.Button"
                   Primary="true"
                   Class="btn btn-primary btn-lg active rounded"
                   OnClick="@(() => isFrozen = !isFrozen)">Freeze / Unfreeze Command Column</TelerikButton>
</p>

<div class=@("alert w-25 p-3 " + ( isFrozen ? "alert-success" : "alert-danger" ) )>
    The Command Column is
    <strong class="text-muted">
        @(isFrozen ? "Frozen" : "Unfrozen")
    </strong>
</div>

@if (isClicked)
{
    <div class="alert alert-info w-25">@Result</div>
}

<TelerikGrid Data="@GridData"
             Width="850px"
             Height="400px">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Product</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Product.ProductName) Title="Product Name" Width="150px" Locked="true" />
        <GridColumn Field=@nameof(Product.UnitPrice) Title="Unit Price" Width="150px" />
        <GridColumn Field=@nameof(Product.UnitsInStock) Title="Units in stock" Width="150px" />
        <GridColumn Field=@nameof(Product.CreatedAt) Title="Date created" Width="250px" />
        <GridColumn Field=@nameof(Product.Discontinued) Title="Discontinued" Width="150px" />
        <GridCommandColumn Width="250px" Locked="@isFrozen">
            <GridCommandButton Command="CustomCommand"
                               Icon="information"
                               OnClick="(() => isClicked = !isClicked )">Information</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>


@code {
    private bool isFrozen { get; set; } = false;
    private bool isClicked { get; set; } = false;
    private string Result { get; set; } = "My custom command button was clicked.";

    #region Sample data
    public List<Product> GridData { get; set; }
    DateTime StartDate = new DateTime(2018, 1, 1);
    static Random RandomGenerator = new Random();
    protected override void OnInitialized()
    {
        GridData = GenerateProducts();
    }

    private List<Product> GenerateProducts()
    {
        List<Product> products = new List<Product>();

        for (int i = 1; i <= 100; i++)
        {
            var product = new Product()
            {
                ProductId = i,
                ProductName = "Product " + i.ToString(),
                SupplierId = i,
                UnitPrice = (decimal)(i * 3.14),
                UnitsInStock = (short)(i * 1),
                Discontinued = RandomGenerator.NextDouble() >= 0.5,
                CreatedAt = GetRandomDate(StartDate)
            };
            products.Add(product);
        }
        return products;
    }

    private DateTime GetRandomDate(DateTime startDate)
    {
        int range = (DateTime.Today - startDate).Days;
        return startDate.AddDays(RandomGenerator.Next(range));
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SupplierId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
        public bool Discontinued { get; set; }
        public DateTime CreatedAt { get; set; }
    }
    #endregion
}
````

>caption How column reordering works in the Telerik grid

![](images/column-reorder-preview.gif)

## See Also

  * [Live Demo: Column Reordering](https://demos.telerik.com/blazor-ui/grid/column-reordering)
