---
title: Cascading DropdDown
description: how to make a cascading a dropdown or combo box.
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
			<td>DropDownList for Blazor, ComboBox for Blazor, MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How to make cascading dropdown or combobox components? The data from one should filter the selection of the next and enable them.

## Solution

Use the `ValueChanged` event to update the model value and to filter the data for the next dropdown. Additionally, you can also use its `Enabled` parameter and tie it to the value of its "parent".

>caption Cascading DropDowns

````DropDownList
@* Cascading componentsare disabled based on the selection of their parents. Events on parent components
    trigger data loading for child components so they show relevant result only.
    You can also see how to get the selected model from a dropdown component.
    The same approach works for a ComboBox (just use nullable values), see the next example *@

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
    async Task SendOrder()
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
````ComboBox
@* The same approach works for the ComboBox, just make sure to use a nullable field so you can see the Placeholder *@

<TelerikComboBox Value="@CurrentOrder.CategoryId" Data="@Categories" Placeholder="Select Category"
                    TextField="CategoryName" ValueField="CategoryId" Filterable="true"
                    ValueChanged="@( (int? c) => CategorySelected(c) )">
</TelerikComboBox>

<TelerikComboBox Value="@CurrentOrder.ProductId" Data="@CurrentProducts" Placeholder="Select Product" Filterable="true"
                    TextField="ProductName" ValueField="ProductId" Enabled="@( CurrentOrder.CategoryId > 0 )"
                    ValueChanged="@( (int? p) => ProductSelected(p) )">
</TelerikComboBox>

@* The last dropdown can use two-way binding, it does not need to filter subsequent data *@
<TelerikComboBox @bind-Value="@CurrentOrder.Quantity" Data="@Quantities" Placeholder="Select Quantity"
                    Enabled="@( CurrentOrder.ProductId > 0 )">
</TelerikComboBox>

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
else if (!string.IsNullOrEmpty(orderStatusMessage))
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
    void CategorySelected(int? category)
    {
        if (category == null) // the default value - the user selected the default item == deselected the current item
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

    void ProductSelected(int? product)
    {
        if (product == null) // the default value - the user selected the default item == deselected the current item
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
    async Task SendOrder()
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
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
}
````
````MultiSelect
@using System.Collections.ObjectModel

<TelerikMultiSelect Value="@CurrentOrder.Categories" Data="@Categories" Placeholder="Select Categories"
                    TextField="CategoryName" ValueField="CategoryId" Filterable="true"
                    ValueChanged="@( (List<int> c) => CategorySelected(c) )">
</TelerikMultiSelect>

<TelerikMultiSelect Value="@CurrentOrder.Products" Data="@CurrentProducts" Placeholder="Select Products" Filterable="true"
                    TextField="ProductName" ValueField="ProductId" Enabled="@( CurrentOrder.Categories.Count > 0 )"
                    ValueChanged="@( (List<int> p) => ProductSelected(p) )">
</TelerikMultiSelect>

@* This sample has only two dropdowns as even dummy data becomes rather long for a multiselect scenario, even for a demo
    The last item could use @bind-Value instead of a handler, this just showcases the main concept. *@

<TelerikButton Enabled="@( CurrentOrder.Products.Count > 0 )" OnClick="@SendOrder">Send Order</TelerikButton>

@if (CurrentOrder.Products.Count > 0)
{
    <h5>Order Summary</h5>
    <ul>
        @foreach (var item in CurrentOrder.ChosenProducts)
        {
            <li>@item.ProductName from category @item.CategoryId</li>
        }
    </ul>
}
else if (!string.IsNullOrEmpty(orderStatusMessage))
{
    <div class="alert alert-success">@orderStatusMessage</div>
}

@code{
    // data sources
    List<Category> Categories { get; set; }
    List<Product> AllProducts { get; set; }
    ObservableCollection<Product> CurrentProducts { get; set; } = new ObservableCollection<Product>();
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
    void CategorySelected(List<int> categories)
    {
        if (categories.Count == 0) // the user deselected all
        {
            //reset the "form" / process
            CurrentOrder = new Order();
            return;
        }

        // cascade the selection by filtering the data for the next dropdown
        CurrentProducts.Clear();
        foreach (var item in categories)
        {
            var productForCategory = AllProducts.Where(p => p.CategoryId == item);
            foreach (var p in productForCategory)
            {
                CurrentProducts.Add(p);
            }
        }
        CurrentProducts.OrderBy(p => p.ProductId);


        // get the selected models from the data source and use them
        CurrentOrder.Categories.Clear();
        CurrentOrder.ChosenCategories.Clear();
        foreach (var item in categories)
        {
            Category SelectedCategory = Categories.Where(c => c.CategoryId == item).First();
            CurrentOrder.Categories.Add(item);
            // business logic
            CurrentOrder.ChosenCategories.Add(SelectedCategory);
        }
    }

    void ProductSelected(List<int> products)
    {
        if (products.Count == 0) // the user deselected all
        {
            //reset the "form" / process
            CurrentOrder.Products = new List<int>();
            CurrentOrder.ChosenProducts = new List<Product>();
            return;
        }


        // get the selected models from the data source and use them
        CurrentOrder.Products.Clear();
        CurrentOrder.ChosenProducts.Clear();
        foreach (var item in products)
        {
            Product SelectedProduct = AllProducts.Where(p => p.ProductId == item).First();
            CurrentOrder.Products.Add(item);
            // business logic
            CurrentOrder.ChosenProducts.Add(SelectedProduct);
        }
    }

    // sample notification of success and resetting of the process, data classes
    async Task SendOrder()
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
        public List<int> Categories { get; set; } = new List<int>();
        public List<int> Products { get; set; } = new List<int>();
        public List<Category> ChosenCategories { get; set; } = new List<Category>();
        public List<Product> ChosenProducts { get; set; } = new List<Product>();
    }
}
````

## Notes

You can, alternatively, use the `OnChange` or `OnBlur` event to fetch data for the next dropdowns. This will allow you to keep using `@bind-Value` and makes the syntax for using `async` methods simpler. Make sure to review the component's Events article to see when these events fire to ensure you do not request data more often than you need to.

If you use the `ValueChanged` events for `async` operations, make sure that their lambda expression in the components markup are marked with `async-await` and that you update the local view-model as early as possible to avoid flickering of the values during execution and awaiting of slow data retrieval operations. In the samples below the local view-model updates are intentionally the last thing in the `ValueChanged` handlers to showcase how slowing this down can result in sub-optimal UX if there are async operations.

In the [dropdownlist-cascading-samples.zip](samples/dropdownlist-cascading-samples.zip) archive, you can find two sample components based on the approaches above that showcase:

* Sample virtualization for one of the dropdowns (local data and `Task.Delay()` are used to simulate actual remote database calls, you can replace them with your actual service calls)
* How you can move the local view-model update earlier when using `ValueChanged` compared to the code snippets above, and how to make its calls `async`.
* How you can use the `OnChange` event instead of `ValueChanged` so you can still get two-way binding (`@bind-Value`) and simpler `async` methods.

