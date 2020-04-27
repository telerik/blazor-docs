---
title: Row Selection in Edit with InCell EditMode
description: How to Select a row that is being edited in InCell editing mode
type: how-to
page_title: Row Selection in Edit with InCell EditMode
slug: grid-kb-row-select-incell-edit
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

When using the [InCell]({%slug components/grid/editing/incell%}) Editing Mode, I want the row that is currently edited to be selected. I want the user to get the current row selected when they edit it.

 By default, the click action opens a cell for editing and does not select a row to avoid an ambiguous action, and so rows can only be selected with the dedicated grid selection column.


## Solution

Use the `OnEdit` and `OnUpdate` [Grid events]({%slug grid-events%}#cud-events):
* In the handler for the `OnEdit` event add the currently edited item, passed to the method through the object of type `GridCommandEventArgs`, into the `SelectedItems` collection.
    * The item added to the collection is with the old value, before the editing.
* In the handler for the `OnUpdate` event, update the `SelectedItems` collection with the new value of the edited item to ensure data integrity.

>caption How to Select the row that is being edited in InCell edit mode

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
            // add the currently edited row to the selected items
            var selItemsList = SelectedItems.ToList();
            selItemsList.Add(item);
            SelectedItems = new List<Product>(selItemsList);
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
            // update the selected items collection
            currentSelectedItems[selectedItemIndex] = item;
            SelectedItems = currentSelectedItems;

            // The actual Update operation for the view-model data. Add your actual data source operations here
            GridData[index] = item;
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
