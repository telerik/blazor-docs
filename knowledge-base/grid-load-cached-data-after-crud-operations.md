---
title: Load Cached Data in the Grid After CRUD Operations
description: Learn how to spare one database read request and populate the Telerik Grid for Blazor with previously cached data.
type: how-to
page_title: How to Load Cached Data in the Grid After CRUD Operations
slug: grid-kb-load-cached-data-after-crud-operations
tags: blazor, grid, treelist, editing
ticketid:
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to Load Cached Data in the Grid After CRUD Operations?

## Solution

The required approach depends on whether the Grid is databound with the [`Data` parameter](#data-parameter) or the [`OnRead` event](#onread-event).

This end result spares one database request, but the user may not see recent changes made by other users.

### Data Parameter

Use the [Grid CUD event arguments](slug:grid-editing-overview#events) to update the local item collection in the `Data` parameter manually.

>caption Avoid a Read request after Create, Delete, and Update operations

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Incell"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnUpdate="@OnGridUpdate">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add Item</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private ProductService GridProductService { get; set; } = new();

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        int createdItemId = await GridProductService.Create(createdItem);
        createdItem.Id = createdItemId;
        GridData.Insert(0, createdItem);
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        await GridProductService.Delete(deletedItem);

        GridData.Remove(deletedItem);
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        await GridProductService.Update(updatedItem);

        var originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = await GridProductService.Read();
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        [Required]
        public DateTime? ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }

    #region Data Service

    public class ProductService
    {
        private List<Product> Items { get; set; } = new();

        private int LastId { get; set; }

        public async Task<int> Create(Product product)
        {
            await SimulateAsyncOperation();

            product.Id = ++LastId;

            Items.Insert(0, product);

            return LastId;
        }

        public async Task<bool> Delete(Product product)
        {
            await SimulateAsyncOperation();

            if (Items.Contains(product))
            {
                Items.Remove(product);

                return true;
            }

            return false;
        }

        public async Task<List<Product>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        public async Task<DataSourceResult> Read(DataSourceRequest request)
        {
            return await Items.ToDataSourceResultAsync(request);
        }

        public async Task<bool> Update(Product product)
        {
            await SimulateAsyncOperation();

            int originalItemIndex = Items.FindIndex(x => x.Id == product.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = product;
                return true;
            }

            return false;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        public ProductService(int itemCount = 5)
        {
            Random rnd = Random.Shared;

            for (int i = 1; i <= itemCount; i++)
            {
                Items.Add(new Product()
                {
                    Id = ++LastId,
                    Name = $"Product {LastId}",
                    Description = $"Multi-line\ndescription {LastId}",
                    Price = LastId % 2 == 0 ? null : rnd.Next(0, 100) * 1.23m,
                    Quantity = LastId % 2 == 0 ? 0 : rnd.Next(0, 3000),
                    ReleaseDate = DateTime.Today.AddDays(-rnd.Next(365, 3650)),
                    Discontinued = LastId % 2 == 0
                });
            }
        }
    }

    #endregion Data Service
}
````

### OnRead Event

1. Cache the values of `args.Data` and `args.Total` from the previous `OnRead` event handler execution.
1. Raise a boolen flag in the CUD event handler and check it in the `OnRead` handler.
1. Update the cached data and total value with the latest user changes before using them in the current `OnRead` call.
1. Reset the boolean flag, so that next time the Grid receives fresh data from the data source.

>caption Avoid a Read request after Create, Delete, and Update operations

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Incell"
             Height="360px"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnUpdate="@OnGridUpdate"
             Pageable="true"
             Sortable="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add Item</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Width="180px">
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<p><code>OnRead</code> event log: @OnReadLog</p>

@code {
    private ProductService GridProductService { get; set; } = new();

    private List<Product> CachedGridData { get; set; } = new();
    private int CachedGridTotal { get; set; }
    private bool ShouldUseCachedData { get; set; }
    private string OnReadLog { get; set; } = string.Empty;

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        int createdItemId = await GridProductService.Create(createdItem);

        ShouldUseCachedData = true;
        createdItem.Id = createdItemId;
        CachedGridData.Insert(0, createdItem);
        ++CachedGridTotal;
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        await GridProductService.Delete(deletedItem);

        ShouldUseCachedData = true;
        CachedGridData.Remove(deletedItem);
        --CachedGridTotal;
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        if (ShouldUseCachedData)
        {
            ShouldUseCachedData = false;

            args.Data = CachedGridData;
            args.Total = CachedGridTotal;

            OnReadLog = $"Used modified cached data at {DateTime.Now.ToString("HH:mm:ss.fff")}";
        }
        else
        {
            DataSourceResult result = await GridProductService.Read(args.Request);

            CachedGridData = result.Data.Cast<Product>().ToList();
            CachedGridTotal = result.Total;

            args.Data = result.Data;
            args.Total = result.Total;

            OnReadLog = $"Requested new data at {DateTime.Now.ToString("HH:mm:ss.fff")}";
        }
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        await GridProductService.Update(updatedItem);

        ShouldUseCachedData = true;
        int originalItemIndex = CachedGridData.FindIndex(x => x.Id == updatedItem.Id);
        if (originalItemIndex != -1)
        {
            CachedGridData[originalItemIndex] = updatedItem;
        }
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        [Required]
        public DateTime? ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }

    #region Data Service

    public class ProductService
    {
        private List<Product> Items { get; set; } = new();

        private int LastId { get; set; }

        public async Task<int> Create(Product product)
        {
            await SimulateAsyncOperation();

            product.Id = ++LastId;

            Items.Insert(0, product);

            return LastId;
        }

        public async Task<bool> Delete(Product product)
        {
            await SimulateAsyncOperation();

            if (Items.Contains(product))
            {
                Items.Remove(product);

                return true;
            }

            return false;
        }

        public async Task<List<Product>> Read()
        {
            await SimulateAsyncOperation();

            return Items;
        }

        public async Task<DataSourceResult> Read(DataSourceRequest request)
        {
            return await Items.ToDataSourceResultAsync(request);
        }

        public async Task<bool> Update(Product product)
        {
            await SimulateAsyncOperation();

            int originalItemIndex = Items.FindIndex(x => x.Id == product.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = product;
                return true;
            }

            return false;
        }

        private async Task SimulateAsyncOperation()
        {
            await Task.Delay(100);
        }

        public ProductService(int itemCount = 5)
        {
            Random rnd = Random.Shared;

            for (int i = 1; i <= itemCount; i++)
            {
                Items.Add(new Product()
                {
                    Id = ++LastId,
                    Name = $"Product {LastId}",
                    Description = $"Multi-line\ndescription {LastId}",
                    Price = LastId % 2 == 0 ? null : rnd.Next(0, 100) * 1.23m,
                    Quantity = LastId % 2 == 0 ? 0 : rnd.Next(0, 3000),
                    ReleaseDate = DateTime.Today.AddDays(-rnd.Next(365, 3650)),
                    Discontinued = LastId % 2 == 0
                });
            }
        }
    }

    #endregion Data Service
}
````

## See Also

* [Grid CRUD Operations Overview](slug:grid-editing-overview)
* [TreeList CRUD Operations Overview](slug:treelist-editing-overview)
