---
title: Row Selection in Edit
description: How to Select a row in Edit
type: how-to
page_title: Row selection in Edit
slug: grid-kb-row-selection-in-edit
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This article showcases how to programmatically [select]({%slug components/grid/selection/overview%}) a row which is edited in [InCell]({%slug components/grid/editing/incell%}) Editing Mode.


## Solution

Use the `OnEdit` and `OnUpdate` [Grid events](%slug grid-events%#cud-events). In the handler for the `OnEdit` event add the currently edited item, passed to the method through the object of type `GridCommandEventArgs`, into the SelectedItems collection. The item added to the collection is with the old value, before the editing.
In the handler for the `OnUpdate` update the SelectedItems collection with the new value of the edited item otherwise the visual representation of the row selection will not be present.

>caption How to Select a row in Edit

````CSHTML
@* You can create your own extension method to add an item into IEnumerable collection without the usage of a mediator one. *@

<TelerikGrid Data="@GridData"
             Height="400px"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems"
             EditMode="GridEditMode.Incell"
             OnUpdate="@UpdateItem"
             OnEdit="@EditHandler">
    <GridColumns>
        <GridCheckboxColumn SelectAllMode="@GridSelectAllMode.All"></GridCheckboxColumn>
        <GridColumn Field=@nameof(Product.ProductId) Title="Product Id" Editable="false" />
        <GridColumn Field=@nameof(Product.ProductName) Title="Product Name" />
        <GridColumn Field=@nameof(Product.SupplierId) Title="Supplier Id" />
        <GridColumn Field=@nameof(Product.UnitPrice) Title="Unit Price" />
        <GridColumn Field=@nameof(Product.UnitsInStock) Title="Units in stock" />
    </GridColumns>
</TelerikGrid>

@if (SelectedItems.Any())
{
    <ul>
        @foreach (Product item in SelectedItems)
        {
            <li>@item.ProductName</li>
        }
    </ul>
}


@code {
    public void EditHandler(GridCommandEventArgs args)
    {
        var item = args.Item as Product;
        var foundItem = SelectedItems.Where(x => x.ProductId == item.ProductId).FirstOrDefault();

        if (foundItem == null)
        {
            var selItemsList = SelectedItems.ToList();
            selItemsList.Add(item);
            SelectedItems = new List<Product>(selItemsList);
            StateHasChanged();
        }
    }

    public void UpdateItem(GridCommandEventArgs args)
    {
        var item = args.Item as Product;
        int index = GridData.FindIndex(x => item.ProductId == x.ProductId);
        var currentSelectedItems = new List<Product>(SelectedItems);
        int selectedItemIndex = currentSelectedItems.FindIndex(x => x.ProductId == item.ProductId);

        if (index != -1)
        {
            GridData[index] = item;
            currentSelectedItems[selectedItemIndex] = item;
            SelectedItems = currentSelectedItems;
        }
    }

    public List<Product> GridData { get; set; }
    public IEnumerable<Product> SelectedItems { get; set; } = new List<Product>();
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
            };
            products.Add(product);
        }
        return products;
    }

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SupplierId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
    }
}
````
