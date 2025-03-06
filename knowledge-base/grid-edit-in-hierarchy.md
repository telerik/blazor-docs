---
title: Hierarchy Editing
description: How to perform Editing in Hierarchy Grid.
type: how-to
page_title: Edit in Hierarchy
slug: grid-kb-editing-in-hierarchy
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

This article shows how to create, update, and delete items in the main (master) and nested (detail) Grids in a [hierarchy](slug:components/grid/features/hierarchy).


## Solution

The Grid CRUD operations are independent of the hierarchy. Each Grid performs editing separately and has its own handlers.

1. [Configure editing for the main Grid](slug:grid-editing-overview).
1. Define a [`DetailTemplate`](slug:components/grid/features/hierarchy) and configure the nested Grid inside it, including editing.
1. To persist the expanded state of a `DetailTemplate` while editing its parent item, override the `Equals()` method of the master data item class. This is supported from version **5.1.0**.

The example below shows the separate CUD event handlers and also how to get the parent data item in the nested Grid handlers. The `UpdateOrder`, `CreateOrder`, and `DeleteOrder` handlers receive the `productItem` in order to access the data item from the parent Grid. If you don't need access to the main Grid's data, don't pass the context through a lambda function.

>caption Implement CRUD operations in a hierarchy Grid

````RAZOR
@* The events in the detail Grid are defined with lambda functions, so that the handler can receive the master product object.
    This approach is optional. *@

@* Hierarchy expand persistence during edit requires version 5.1.0 + *@

Grid <code>EditMode</code>:
<TelerikRadioGroup Data="@GridEditModes"
                   @bind-Value="@GridEditMode"
                   Layout="@RadioGroupLayout.Horizontal" />

<TelerikGrid Data="@GridData"
             TItem="@Product"
             Pageable="true"
             PageSize="10"
             Sortable="true"
             EditMode="@GridEditMode"
             Navigable="true"
             OnUpdate="UpdateProduct"
             OnDelete="DeleteProduct"
             OnCreate="CreateProduct"
             OnStateInit="@OnProductGridStateInit">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Product</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(Product.ProductName) Title="Product Name" />
        <GridColumn Field=@nameof(Product.UnitPrice) Title="Unit Price" />
        <GridColumn Field=@nameof(Product.UnitsInStock) Title="Units in Stock" />
        <GridColumn Field=@nameof(Product.CreatedAt) Title="Date Created" />
        <GridColumn Field=@nameof(Product.Discontinued) Title="Discontinued" Width="150px" />
        <GridCommandColumn Width="200px">
            @if (GridEditMode != GridEditMode.Incell)
            {
                <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
                <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
                <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            }
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
    <DetailTemplate Context="productItem">
        @{
            Product product = (Product)productItem;

            <TelerikGrid Data="@product.OrderDetails"
                         Pageable="true"
                         Sortable="true"
                         PageSize="5"
                         EditMode="@GridEditMode"
                         Navigable="true"
                         OnUpdate="@((GridCommandEventArgs args) => UpdateOrder(product, args))"
                         OnDelete="@((GridCommandEventArgs args) => DeleteOrder(args, product))"
                         OnCreate="@((GridCommandEventArgs args) => CreateOrder(args, product))">
                <GridToolBarTemplate>
                    <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Order</GridCommandButton>
                </GridToolBarTemplate>
                <GridColumns>
                    <GridColumn Field=@nameof(OrderDetails.OrderId) Title="Order ID" Editable="false" />
                    <GridColumn Field=@nameof(OrderDetails.UnitPrice) Title="Price" />
                    <GridColumn Field=@nameof(OrderDetails.Discount) Title="Discount">
                        <Template Context="order">
                            @(String.Format("{0:0.00}%", ((OrderDetails)order).Discount))
                        </Template>
                    </GridColumn>
                    <GridColumn Field=@nameof(OrderDetails.Quantity) Title="Quantity" />
                    <GridCommandColumn>
                        @if (GridEditMode != GridEditMode.Incell)
                        {
                            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
                            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
                            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
                        }
                        <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
                    </GridCommandColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
</TelerikGrid>

@code {
    #region CUD operations for the main Grid

    private void UpdateProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = (Product)args.Item;
        var index = GridData.FindIndex(x => x.ProductId == item.ProductId);
        if (index != -1)
        {
            GridData[index] = item;
        }
    }
    private void CreateProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = (Product)args.Item;

        item.ProductId = ++LastId;

        GridData.Insert(0, item);
        item.OrderDetails = GenerateOrderDetails(item);
    }

    private void DeleteProduct(GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = (Product)args.Item;

        GridData.Remove(item);
    }

    #endregion CUD operations for the main Grid

    #region CUD operations for the detail Grid

    private void UpdateOrder(Product product, GridCommandEventArgs args)
    {
        // perform actual data source operations here through your service

        var item = (OrderDetails)args.Item;
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

        var item = (OrderDetails)args.Item;
        var data = product.OrderDetails;

        item.OrderId = data.Count + 1;

        data.Insert(0, item);
    }

    private void DeleteOrder(GridCommandEventArgs args, Product product)
    {
        // perform actual data source operations here through your service

        var item = (OrderDetails)args.Item;
        var data = product.OrderDetails;

        data.Remove(item);
    }

    #endregion CUD operations for the detail Grid

    private List<Product> GridData { get; set; } = new();
    private DateTime StartDate = new DateTime(2018, 1, 1);
    private static Random RandomGenerator = new Random();

    #region Product Grid State

    private void OnProductGridStateInit(GridStateEventArgs<Product> args)
    {
        args.GridState.ExpandedItems = GridData.Where(x => x.ProductId == 1).ToList();
    }

    private GridEditMode GridEditMode { get; set; } = GridEditMode.Inline;

    private IEnumerable<GridEditMode> GridEditModes { get; set; } = new List<GridEditMode> {
            GridEditMode.Incell,
            GridEditMode.Inline,
            GridEditMode.Popup
        };

    #endregion Product Grid State

    #region Sample Data and Models

    private int LastId { get; set; }

    protected override void OnInitialized()
    {
        GridData = GenerateProducts();
    }

    private List<Product> GenerateProducts()
    {
        List<Product> products = new List<Product>();

        for (int i = 1; i <= 3; i++)
        {
            var product = new Product()
            {
                ProductId = ++LastId,
                ProductName = $"Product {LastId}",
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

        for (int i = 1; i <= 2; i++)
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

    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int SupplierId { get; set; }
        public decimal UnitPrice { get; set; }
        public short UnitsInStock { get; set; }
        public bool Discontinued { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<OrderDetails> OrderDetails { get; set; } = new();

        // Persist Product expand/collapse state during editing
        public override bool Equals(object? obj) => Equals(obj as Product);

        public bool Equals(Product? obj)
        {
            return obj != null && obj.ProductId == ProductId;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    public class OrderDetails
    {
        public int OrderId { get; set; }
        public decimal UnitPrice { get; set; }
        public short Quantity { get; set; }
        public float Discount { get; set; }
        public int ProductId { get; set; }
    }

    #endregion Sample Data and Models
}
````

## See Also

* [Grid Editing](slug:grid-editing-overview)
* [Grid Hierarchy](slug:components/grid/features/hierarchy)
