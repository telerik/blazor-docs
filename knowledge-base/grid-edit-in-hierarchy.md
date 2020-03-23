---
title: Hierarchy Editing
description: How to perform Editing in Hierarchy Grid
type: how-to
page_title: Edit in Hierarchy
slug: grid-kb-editing-in-hierarchy
position: 
tags: 
res_type: kb
---


## Description

This article showcases how to **Create**, **Update** and **Delete** items in both the main and nested Grids. Those operations are independent from the Hierarchy. Each Grid has it`s own handlers.


## Solution

The `UpdateOrder`, `CreateOrder` and `DeleteOrder` handlers are getting the context in order to access the Data from the parent. If you do not need access to the main Grid you should not pass the context either.

Set the `EditMode` of the nesting grid to either `Popup`, `Inline`, `Incell`. By default it is `Inline`.


````
<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="10"
             Sortable="true"
             EditMode="GridEditMode.Popup"
             OnUpdate="UpdateProduct"
             OnDelete="DeleteProduct"
             OnCreate="CreateProduct">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Product</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Product.ProductName) Title="Product Name" />
        <GridColumn Field=@nameof(Product.UnitPrice) Title="Unit Price" />
        <GridColumn Field=@nameof(Product.UnitsInStock) Title="Units in stock" />
        <GridColumn Field=@nameof(Product.CreatedAt) Title="Date created" />
        <GridColumn Field=@nameof(Product.Discontinued) Title="Discontinued" Width="150px" />
        <GridCommandColumn Width="auto">
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate>
        @{
            Product product = context as Product;

            <TelerikGrid Data="@product.OrderDetails"
                         Height="auto"
                         Pageable="true"
                         Sortable="true"
                         PageSize="5"
                         EditMode="GridEditMode.Popup"
                         OnUpdate="@((GridCommandEventArgs args) => UpdateOrder(product, args))"
                         OnDelete="@((GridCommandEventArgs args) => DeleteOrder(args, product))"
                         OnCreate="@((GridCommandEventArgs args) => CreateOrder(args, product))">
                <GridToolBar>
                    <GridCommandButton Command="Add" Icon="add">Add Order</GridCommandButton>
                </GridToolBar>
                <GridColumns>
                    <GridColumn Field=@nameof(OrderDetails.OrderId) Title="Order ID" Editable="false" />
                    <GridColumn Field=@nameof(OrderDetails.UnitPrice) Title="Price" />
                    <GridColumn Field=@nameof(OrderDetails.Discount) Title="Discount">
                        <Template Context="order">
                            @(String.Format("{0:0.00}%", (order as OrderDetails).Discount))
                        </Template>
                    </GridColumn>
                    <GridColumn Field=@nameof(OrderDetails.Quantity) Title="Quantity" />
                    <GridCommandColumn Width="auto">
                        <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
                        <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
                    </GridCommandColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
</TelerikGrid>

@code {
    //CUD operations for the main Grid
    #region CUD operation for the main Grid
    private void UpdateProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = args.Item as Product;
        var index = GridData.FindIndex(x => x.ProductId == item.ProductId);
        if (index != -1)
        {
            GridData[index] = item;
        }
    }
    private void CreateProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = args.Item as Product;

        item.ProductId = GridData.Count + 1;

        GridData.Insert(0, item);
        item.OrderDetails = GenerateOrderDetails(item);
    }

    private void DeleteProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = args.Item as Product;

        GridData.Remove(item);
    }
    #endregion

    //CUD operations for the nested Grid
    #region CUD operations for the nested Grid
    private void UpdateOrder(Product product, GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = args.Item as OrderDetails;
        var data = product.OrderDetails;
        int index = data.FindIndex(x => x.OrderId == item.OrderId);
        if (index != -1)
        {
            data[index] = item;
        }
    }

    private void CreateOrder(GridCommandEventArgs args, Product product)
    {
        // perform actual data source operations here through your service

        var item = args.Item as OrderDetails;
        var data = product.OrderDetails;

        item.OrderId = data.Count + 1;

        data.Insert(0, item);
    }

    private void DeleteOrder(GridCommandEventArgs args, Product product)
    {
        // perform actual data source operations here through your service

        var item = args.Item as OrderDetails;
        var data = product.OrderDetails;

        data.Remove(item);
    }
    #endregion

    public List<Product> GridData { get; set; }
    DateTime StartDate = new DateTime(2018, 1, 1);
    static Random RandomGenerator = new Random();

    //Sample data and models
    #region Sample data and models
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

            product.OrderDetails = GenerateOrderDetails(product);

            products.Add(product);
        }

        return products;
    }

    private List<OrderDetails> GenerateOrderDetails(Product product)
    {
        double minDiscount = 0.1;
        double maxDiscount = 0.2;
        var orderDetails = new List<OrderDetails>();

        for (int i = 1; i <= 40; i++)
        {
            orderDetails.Add(new OrderDetails()
            {
                OrderId = Int32.Parse($"{product.ProductId}{i}"),
                UnitPrice = (decimal)product.UnitPrice,
                Quantity = (short)(1 + (RandomGenerator.Next() % 10)),
                Discount = (float)((RandomGenerator.NextDouble() * (maxDiscount - minDiscount) + minDiscount)) * 100,
                ProductId = product.ProductId,
            });
        }

        return orderDetails;
    }

    private DateTime GetRandomDate(DateTime startDate)
    {
        int range = (DateTime.Today - startDate).Days;
        return startDate.AddDays(RandomGenerator.Next(range));
    }
    #endregion
}
````
