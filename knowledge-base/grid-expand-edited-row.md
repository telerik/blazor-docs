---
title: How to Automatically Expand the Currently Edited Row
description: Learn how to automatically expand the detail of the currently edited or newly inserted item in the TelerikGrid for UI for Blazor.
type: how-to
page_title: Expanding Details of Edited or New Row in TelerikGrid
meta_title: Expanding Details of Edited or New Row in TelerikGrid
slug: grid-kb-expand-edited-row
tags: grid, expand, template, edit, mode, hierarchy
res_type: kb
ticketid: 1694649
components: ["grid"]
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

I want to automatically expand the detail template of the row that is currently being edited or the newly inserted item in the [TelerikGrid](slug:grid-overview).

## Solution

To achieve automatic expansion of a detail template for the edited or newly inserted item, use the `OnEdit` and `OnCreate` events of the TelerikGrid with the `SetStateAsync` method. Below is an example implementation:

>caption Expand currently edited row

````RAZOR
<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             TItem="@Product"
             Pageable="true"
             PageSize="10"
             Sortable="true"
             EditMode="@GridEditMode"
             Navigable="true"
             OnUpdate="UpdateProduct"
             OnDelete="DeleteProduct"
             OnCreate="CreateProduct"
             OnEdit="@OnEdit"
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
    public TelerikGrid<Product> GridRef { get; set; }

    private GridEditMode GridEditMode { get; set; } = GridEditMode.Inline;
    private List<Product> GridData { get; set; } = new();
    private int LastId { get; set; }
    private DateTime StartDate = new DateTime(2018, 1, 1);
    private static Random RandomGenerator = new Random();

    // When a row enters edit mode, expand it
    private async Task OnEdit(GridCommandEventArgs args)
    {
        var editedItem = (Product)args.Item;

        var state = GridRef.GetState();
        state.ExpandedItems = new List<Product> { editedItem }; // collapse all others
        await GridRef.SetStateAsync(state);
    }

    #region CRUD Operations for Main Grid
    private void UpdateProduct(GridCommandEventArgs args)
    {
        var item = (Product)args.Item;
        var index = GridData.FindIndex(x => x.ProductId == item.ProductId);
        if (index != -1)
        {
            GridData[index] = item;
        }
    }

    private void CreateProduct(GridCommandEventArgs args)
    {
        var item = (Product)args.Item;
        item.ProductId = ++LastId;
        GridData.Insert(0, item);
        item.OrderDetails = GenerateOrderDetails(item);

        // Auto-expand the new item
        _ = ExpandNewItem(item);
    }

    private async Task ExpandNewItem(Product newItem)
    {
        await Task.Delay(50); // ensure grid state has updated
        var state = GridRef.GetState();
        state.ExpandedItems = new List<Product> { newItem };
        await GridRef.SetStateAsync(state);
    }

    private void DeleteProduct(GridCommandEventArgs args)
    {
        var item = (Product)args.Item;
        GridData.Remove(item);
    }
    #endregion

    #region CRUD for Details Grid
    private void UpdateOrder(Product product, GridCommandEventArgs args)
    {
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
        var item = (OrderDetails)args.Item;
        var data = product.OrderDetails;
        item.OrderId = data.Count + 1;
        data.Insert(0, item);
    }

    private void DeleteOrder(GridCommandEventArgs args, Product product)
    {
        var item = (OrderDetails)args.Item;
        var data = product.OrderDetails;
        data.Remove(item);
    }
    #endregion

    private void OnProductGridStateInit(GridStateEventArgs<Product> args)
    {
        args.GridState.ExpandedItems = new List<Product>(); // start with nothing expanded
    }

    #region Data Generation
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
    #endregion

    #region Models
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

        // Ensures Grid can identify which rows are expanded
        public override bool Equals(object? obj) => Equals(obj as Product);
        public bool Equals(Product? obj) => obj != null && obj.ProductId == ProductId;
        public override int GetHashCode() => ProductId.GetHashCode();
    }

    public class OrderDetails
    {
        public int OrderId { get; set; }
        public decimal UnitPrice { get; set; }
        public short Quantity { get; set; }
        public float Discount { get; set; }
        public int ProductId { get; set; }
    }
    #endregion
}
````

## See Also

* [Grid Overview](slug:grid-overview)
* [SetStateAsync Method](slug:grid-state#methods)
* [Hierarchical Grid](slug:components/grid/features/hierarchy)
