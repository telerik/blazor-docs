---
title: InCell Editing
page_title: Grid - InCell Editing
description: In-cell editing of data in Grid for Blazor.
slug: components/grid/editing/incell
tags: telerik,blazor,grid,in cell,editing
published: True
position: 4
---

# Grid InCell Editing

In-cell editing allows users to click data cells and type new values like in Excel. There is no need for command buttons to enter and exit edit mode. Users can quickly move between the editable cells and rows by using keyboard navigation.

The in-cell edit mode provides a different user experience, compared to the inline and popup edit modes. In-cell edit mode can be more convenient for advanced users, fast users, or users who prefer keyboard navigation rather than clicking command buttons.

> This article requires familiarity with the information at [Grid CRUD Operations](slug:components/grid/editing/overview).

## Basics

To use in-cell Grid editing, [set the Grid `EditMode` parameter to `GridEditMode.Incell`](slug:components/grid/editing/overview#edit-modes). During in-cell editing, only one table cell is in edit mode at a time. Users can:

* Press **Tab** or **Shift** + **Tab** to confirm the current value and edit the next or previous cell.
* Press **Enter** to confirm the current value and edit the cell below.
* Press **ESC** to cancel the current change and exit edit mode.
* Click on another cell to confirm the current value and edit the new cell.
* Click outside the Grid to confirm the current value and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

Command columns and non-editable columns are skipped while tabbing.

## Commands

In-cell add, edit and delete operations use the following [command buttons](slug:components/grid/editing/overview#commands):

* **Add**
* **Delete**

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

Unlike [inline editing](slug:components/grid/editing/inline), the in-cell edit mode does not use **Edit**, **Save**, and **Cancel** command buttons.

## Events

Users enter and exit in-cell edit mode cell by cell, so the `OnEdit`, `OnCancel`, and `OnUpdate` Grid events also fire cell by cell.

In in-cell edit mode, the `OnAdd` and `OnCreate` events fire immediately one after the other, unless `OnAdd` is cancelled. This means that:

* The new row is added to the Grid data source before users start editing it.
* Valid [default values](slug:grid-kb-default-value-for-new-row) are recommended.
* Users are always editing existing rows, not adding new ones.
* The [`InsertedItem` property](slug:grid-state#information-in-the-grid-state) of the [Grid state](slug:grid-state) is not used and is always `null`.
* To [add a new row programmatically and put it in edit mode](slug:grid-kb-add-edit-state), use the `OriginalEditItem`, `EditItem`, and `EditField` properties of the Grid state.

The above algorithm is different from [inline](slug:components/grid/editing/inline) and [popup](slug:components/grid/editing/popup) editing where new rows are only added to the data source after users populate them with valid values.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:components/grid/editing/overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another cell.

* If the validation is not satisfied, the component will block the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing will complete and the component will fire `OnUpdate`.

### Delete, Filter, Group, Search, Sort

This section explains what happens when the user tries to perform another data operation, while the component is already in add or edit mode.

* If the validation is satisfied, then editing will complete and the component will fire `OnUpdate`.
* If the validation is not satisfied, then editing will abort and the component will fire `OnCancel`.

### Selection

To enable [row selection](slug:grid-selection-row) with in-cell edit mode, use a [checkbox column](slug:components/grid/columns/checkbox). More information on that can be read in the [Row Selection](slug:grid-selection-row#selection-and-editing-modes) article.

To see how to select the row that is currently in in-cell edit mode without using a `<GridCheckboxColumn />`, see the [Row Selection in Edit with InCell EditMode](slug:grid-kb-row-select-incell-edit) Knowledge Base article.

[Cell selection](slug:grid-selection-cell) is not supported with in-cell edit mode.

## Examples

### Basic

The example below shows how to:

* Implement in-cell Grid CRUD operations with the simplest and minimal required setup.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Rebind the Grid automatically through the `OnRead` event after the create, delete, or update operation is complete. When [using the `Data` parameter, you must either query the data source again, or modify the local `Data` collection manually](#advanced).
* Use `DataAnnotations` validation for some model class properties.

>caption Basic Grid in-cell editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="@OnGridRead"
             TItem="@Product"
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
    private ProductService GridProductService { get; set; } = new();

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        await GridProductService.Create(createdItem);
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        await GridProductService.Delete(deletedItem);
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = await GridProductService.Read(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        await GridProductService.Update(updatedItem);
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

### Advanced

The example below shows how to:

* Implement in-cell Grid CRUD operations with all available events and various built-in customizations.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Reload the Grid `Data` after making changes to the data source. When [using the Grid `OnRead` event, the component will fire `OnRead` and rebind automatically](#basic).
* Apply the user changes to the Grid `Data` parameter to spare one read request to the database.
* Use `DataAnnotations` validation for some model class properties.
* Mark a column as non-editable.
* Customize column editors without using an `EditorTemplate`.
* Render command buttons conditionally.
* Confirm **Delete** commands with the built-in Grid Dialog. You can also [intercept item deletion with a separate Dialog or a custom popup](slug:grid-kb-customize-delete-confirmation-dialog).
* Cancel the `OnAdd` and `OnEdit` events conditionally, so that the Grid does not go into edit mode.
* Cancel the `OnCancel` event conditionally, so that the Grid remains in edit mode and the user doesn't lose their unsaved changes.

>caption Advanced Grid in-cell editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             ConfirmDelete="@GridConfirmDelete"
             EditMode="@GridEditMode.Incell"
             OnAdd="@OnGridAdd"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnEdit="@OnGridEdit"
             OnUpdate="@OnGridUpdate"
             Pageable="true"
             PageSize="5"
             Sortable="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" ThemeColor="@AddEditButtonThemeColor">Add Item</GridCommandButton>
        <span class="k-separator"></span>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShouldCancelOnAddEdit" /> Cancel OnAdd and OnEdit Events</label>
        <span class="k-separator"></span>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@GridConfirmDelete" /> Confirm Delete Commands</label>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Editable="false" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Title="Commands" Width="180px">
            @{ var dataItem = (Product)context; }
            @if (dataItem.Discontinued)
            {
                <GridCommandButton Command="Delete" ThemeColor="@DeleteButtonThemeColor">Delete</GridCommandButton>
            }
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    private ProductService GridProductService { get; set; } = new();

    [CascadingParameter]
    public DialogFactory? TelerikDialogs { get; set; }

    private bool GridConfirmDelete { get; set; } = true;
    private bool ShouldCancelOnAddEdit { get; set; }
    private bool ShouldConfirmOnCancel { get; set; } = true;

    private string AddEditButtonThemeColor => ShouldCancelOnAddEdit ? ThemeConstants.Button.ThemeColor.Error : ThemeConstants.Button.ThemeColor.Base;
    private string DeleteButtonThemeColor => GridConfirmDelete ? ThemeConstants.Button.ThemeColor.Base : ThemeConstants.Button.ThemeColor.Warning;
    private string CancelButtonThemeColor => ShouldConfirmOnCancel ? ThemeConstants.Button.ThemeColor.Base : ThemeConstants.Button.ThemeColor.Warning;

    private void OnGridAdd(GridCommandEventArgs args)
    {
        if (ShouldCancelOnAddEdit)
        {
            args.IsCancelled = true;
            return;
        }
    }

    private async Task OnGridCancel(GridCommandEventArgs args)
    {
        if (ShouldConfirmOnCancel)
        {
            bool shouldContinue = await TelerikDialogs!.ConfirmAsync("Do you want to discard your changes?");

            if (!shouldContinue)
            {
                args.IsCancelled = true;
            }
        }
    }

    private async Task OnGridCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;

        // Create the item in the database.
        int newId = await GridProductService.Create(createdItem);

        // Reload the data from the database.
        GridData = await GridProductService.Read();
        // OR
        // Create the item in the local data too.
        //createdItem.Id = newId;
        //GridData.Insert(0, createdItem);
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        // Delete the item in the database.
        await GridProductService.Delete(deletedItem);

        // Reload the data from the database.
        GridData = await GridProductService.Read();
        // OR
        // Delete the item in the local data too.
        //GridData.Remove(deletedItem);
    }

    private void OnGridEdit(GridCommandEventArgs args)
    {
        if (ShouldCancelOnAddEdit)
        {
            args.IsCancelled = true;
            return;
        }
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        // Update the item in the database.
        bool success = await GridProductService.Update(updatedItem);

        // Reload the data from the database.
        GridData = await GridProductService.Read();
        // OR
        // Update the item in the local data too.
        //int originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);
        //if (originalItemIndex != -1)
        //{
        //    GridData[originalItemIndex] = updatedItem;
        //}
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = await GridProductService.Read();
    }

    public class ProductService
    {
        private List<Product> Items { get; set; }

        private int LastId { get; set; }

        public async Task<int> Create(Product product)
        {
            // Simulate async operation.
            await Task.Delay(100);

            product.Id = ++LastId;

            Items.Insert(0, product);

            return LastId;
        }

        public async Task<bool> Delete(Product product)
        {
            // Simulate async operation.
            await Task.Delay(100);

            if (Items.Contains(product))
            {
                Items.Remove(product);

                return true;
            }

            return false;
        }

        public async Task<List<Product>> Read()
        {
            // Simulate async operation.
            await Task.Delay(100);

            return Items;
        }

        public async Task<DataSourceResult> Read(DataSourceRequest request)
        {
            return await Items.ToDataSourceResultAsync(request);
        }

        public async Task<bool> Update(Product product)
        {
            // Simulate async operation.
            await Task.Delay(100);

            int originalItemIndex = Items.FindIndex(x => x.Id == product.Id);

            if (originalItemIndex != -1)
            {
                Items[originalItemIndex] = product;
                return true;
            }

            return false;
        }

        public ProductService()
        {
            Items = new();

            for (int i = 1; i <= 15; i++)
            {
                Items.Add(new Product()
                {
                    Id = ++LastId,
                    Name = $"Product {LastId}",
                    Description = $"Multi-line\ndescription {LastId}",
                    Price = LastId % 2 == 0 ? null : Random.Shared.Next(0, 100) * 1.23m,
                    Quantity = LastId % 2 == 0 ? 0 : Random.Shared.Next(0, 3000),
                    ReleaseDate = DateTime.Today.AddDays(-Random.Shared.Next(365, 3650)),
                    Discontinued = LastId % 2 == 0
                });
            }

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
}
````

## See Also

* [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
* [Grid Selection Documentation](slug:grid-selection-overview)
