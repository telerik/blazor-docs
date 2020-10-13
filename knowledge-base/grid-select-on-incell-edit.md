---
title: Row Selection in Edit with InCell EditMode
description: How to Select a row that is being edited in InCell editing mode.
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

When using the [InCell]({%slug components/grid/editing/incell%}) Editing Mode, I want the row that is currently edited to be selected. I want the user to get the current row selected by clicking both in editable and non-editable cells.

 By default, the click action opens a cell for editing and does not select a row to avoid an ambiguous action, and so rows can only be selected with the dedicated grid selection column.



## Solution

Use the [Grid events]({%slug grid-events%}#cud-events) to update the `SelectedItems` collection as required:

* In the handler for the `OnEdit` event add the currently edited item, passed to the method through the object of type `GridCommandEventArgs`, into the `SelectedItems` collection.

    * The item added to the collection is with the old value, before the editing.

* In the handler for the `OnUpdate` event, update the `SelectedItems` collection with the new value of the edited item to ensure data integrity.

* For non-editable cells you can use the [OnRowClick]({%slug grid-events%}#onrowclick) event. 

    * Alternatively, add a [Column Template]({%slug grid-templates-column%}). Use a `<div>` block and add an `onclick` event with a method where the row data is added to the SelectedItems collection as shown in the second example.

>caption Examples


* [How to Select the row that is being edited in InCell edit mode using the OnRowClick event](#how-to-select-the-row-that-is-being-edited-in-incell-edit-mode-using-the-onrowclick-event)

* [How to Select the row that is being edited in InCell edit mode using Cell Tempalte and the onclick event](#how-to-select-the-row-that-is-being-edited-in-incell-edit-mode-using-cell-tempalte-and-the-onclick-event)


### How to Select the row that is being edited in InCell edit mode using the OnRowClick event

````CSHTML
@* This sample does not require a template for non-editable columns *@

<TelerikGrid Data="@GridData"
             Height="400px"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems"
             EditMode="GridEditMode.Incell"
             OnUpdate="@UpdateItem"
             OnEdit="@EditHandler"
             OnRowClick="@OnRowClickHandler">
    <GridColumns>
        @* You can add the information from the non-editable row to the SelectedItems collection *@
        <GridColumn Field=@nameof(Product.ProductId) Title="Product Id" Editable="false">
        </GridColumn>
        <GridColumn Field=@nameof(Product.ProductName) Title="Product Name" />
        <GridColumn Field=@nameof(Product.SupplierId) Title="Supplier Id" />
        <GridColumn Field=@nameof(Product.UnitPrice) Title="Unit Price" />
        <GridColumn Field=@nameof(Product.UnitsInStock) Title="Units in stock" Editable="false" />
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
    void OnRowClickHandler(GridRowClickEventArgs args)
    {
        var item = args.Item as Product;

        AddToSelectedCollection(item);
    }

    public void EditHandler(GridCommandEventArgs args)
    {
        var item = args.Item as Product;
        AddToSelectedCollection(item);
    }

    //Add the information from clicking on non-editable cell to the SelectedItems collection
    public void AddToSelectedCollection(Product item)
    {
        var currentSelectedItems = new List<Product>(SelectedItems);
        if (currentSelectedItems.FindIndex(x => x.ProductId == item.ProductId) == -1)
        {
            currentSelectedItems.Add(item);
            SelectedItems = currentSelectedItems;
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

### How to Select the row that is being edited in InCell edit mode using Cell Tempalte and the onclick event


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
        @* You can add the information from the non-editable row to the SelectedItems collection *@
        <GridColumn Field=@nameof(Product.ProductId) Title="Product Id" Editable="false">
            <Template>
                @{
                    Product item = context as Product;
                    <div @onclick="@( () => AddToSelectedCollection(item) )">@item.ProductId</div>
                }
            </Template>
        </GridColumn>
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
        AddToSelectedCollection(item);
    }

    //Add the information from clicking on non-editable cell to the SelectedItems collection
    public void AddToSelectedCollection(Product item)
    {
        var currentSelectedItems = new List<Product>(SelectedItems);
        if(currentSelectedItems.FindIndex(x => x.ProductId == item.ProductId) == -1)
        {
            currentSelectedItems.Add(item);
            SelectedItems = currentSelectedItems;
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
