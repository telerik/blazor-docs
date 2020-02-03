---
title: Cascading DropdDown
description: how to make a cascading a dropdown or combo box
type: how-to
page_title: Cascading DropDown or ComboBox
slug: dropdown-kb-cascading
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor, ComboBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How to make cascading dropdown or combobox components? The data from one should filter the selection of the next and enable them.

## Solution

Use the `ValueChanged` event to update the model value and to filter the data for the next dropdown. Additionally, you can also use its `Enabled` parameter and tie it to the value of its "parent".

>caption Cascading DropDowns

````CSHTML
@* Cascading componentsare disabled based on the selection of their parents. Events on parent components
    trigger data loading for child components so they show relevant result only.
    You can also see how to get the selected model from a dropdown component.
    This sample works with a ComboBox as well *@

<TelerikDropDownList Value="@CurrentOrder.CategoryId" Data="@Categories" DefaultText="Select Category"
                     TextField="CategoryName" ValueField="CategoryId"
                     ValueChanged="@( (int c) => CategorySelected(c) )">
</TelerikDropDownList>

<TelerikDropDownList Value="@CurrentOrder.ProductId" Data="@CurrentProducts" DefaultText="Select Product"
                     TextField="ProductName" ValueField="ProductId" Enabled="@( CurrentOrder.CategoryId > 0 )"
                     ValueChanged="@( (int p) => ProductSelected(p) )">
</TelerikDropDownList>

@* The last dropdown can use two-way binding, it does not need to filter subsequent data *@
<TelerikDropDownList @bind-Value="@CurrentOrder.Quantity" Data="@Quantities" DefaultText="Select Quantity"
                     Enabled="@( CurrentOrder.ProductId > 0 )">
</TelerikDropDownList>

<TelerikButton Enabled="@( CurrentOrder.Quantity > 0 )" OnClick="@SendOrder">Send Order</TelerikButton>

@if (CurrentOrder.CategoryId > 0)
{
    <h5>Order Summary</h5>
    @CurrentOrder.CategoryName
    <br />
    @CurrentOrder.ProductName
    <br />
    @CurrentOrder.Quantity
}
else if(!string.IsNullOrEmpty(orderStatusMessage))
{
    <div class="alert alert-success">@orderStatusMessage</div>
}

@code{
    // data sources
    List<Category> Categories { get; set; }
    List<Product> AllProducts { get; set; }
    List<Product> CurrentProducts { get; set; }
    List<int> Quantities { get; set; }
    // model
    Order CurrentOrder { get; set; } = new Order();

    string orderStatusMessage { get; set; } // UI related for the sample

    // generate data we will be using in this example
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Categories = Enumerable.Range(1, 6).Select(x => new Category
        {
            CategoryId = x,
            CategoryName = $"Category {x}"
        }).ToList();

        AllProducts = Enumerable.Range(1, 50).Select(x => new Product
        {
            ProductId = x,
            ProductName = $"Product {x}",
            CategoryId = (int)Math.Ceiling((double)x % 7)
        }).ToList();
    }

    //ValueChanged handlers - implementation of cascading dropdowns
    void CategorySelected(int category)
    {
        if(category == 0) // the default value - the user selected the default item == deselected the current item
        {
            //reset the "form" / process
            CurrentOrder = new Order();
            return;
        }

        // cascade the selection by filtering the data for the next dropdown
        CurrentProducts = AllProducts.Where(p => p.CategoryId == category).ToList();

        // get the selected model from the data source
        Category SelectedCategory = Categories.Where(c => c.CategoryId == category).First();

        // business logic
        CurrentOrder.CategoryId = SelectedCategory.CategoryId;
        CurrentOrder.CategoryName = SelectedCategory.CategoryName;
    }

    void ProductSelected(int product)
    {
        if(product == 0) // the default value - the user selected the default item == deselected the current item
        {
            //reset the "form" / process
            CurrentOrder.ProductId = product;
            CurrentOrder.ProductName = string.Empty;
            CurrentOrder.Quantity = 0;
            return;
        }

        Random rnd = new Random();
        Quantities = Enumerable.Range(1, new Random().Next(5, 10)).ToList();

        Product SelectedProduct = AllProducts.Where(p => p.ProductId == product).First();

        CurrentOrder.ProductId = SelectedProduct.ProductId;
        CurrentOrder.ProductName = SelectedProduct.ProductName;
    }

    // sample notification of success and reseting of the process, data classes
    async void SendOrder()
    {
        CurrentOrder = new Order();
        orderStatusMessage = "Thank you for your order!";
        await Task.Delay(2000);
        orderStatusMessage = "";
        StateHasChanged();
    }

    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }

    public class Product
    {
        public int CategoryId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }

    public class Order
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
}
````

