---
title: Inline Editing
page_title: Grid - Inline Editing
description: Inline (row) editing of data in Grid for Blazor.
slug: components/grid/editing/inline
tags: telerik,blazor,grid,inline,editing
published: True
position: 1
---

# Grid Inline Editing

Inline Grid editing lets users modify all values on a Grid row. The edit process starts and ends with clicking of command buttons on the respective row. Inline editing can be more intuitive for beginner users, compared to in-cell editing.

## Basics

To use inline Grid editing, [set the Grid `EditMode` parameter to `GridEditMode.Inline`](slug:components/grid/editing/overview#edit-modes). During inline editing, only one table row is in edit mode. Users can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous editable cell.
* Click the **Save** command button or press **Enter** to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

Inline add, edit, and delete operations use the following [commands](slug:components/grid/editing/overview#commands):

* **Add**
* **Delete**
* **Edit**
* **Save**
* **Cancel**

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or remote data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

The Grid commands execute row by row and the Grid events also fire row by row.

## Integration with Other Features

Here is how the component behaves when the user tries to use add and edit operations together with other component features. Also check the [common information on this topic for all edit modes](slug:components/grid/editing/overview#integration-with-other-features).

### Add, Edit

This section explains what happens when the component is already in add or edit mode, and the user tries to add or edit another row or cell.

* If the validation is not satisfied, the component will block the user action until they complete or cancel the current add or edit operation.
* If the validation is satisfied, then editing will abort and the component will fire `OnCancel`.

### Delete, Filter, Group, Search, Sort

This section explains what happens when the user tries to perform another data operation, while the component is already in add or edit mode.

* If the component is in `Inline` edit mode, then editing will abort and the component will fire `OnCancel`.

===

In a similar fashion, the `Cancel` and `Delete` command buttons fire events on the grid to let you handle the data source operations.

When validation is not satisfied, clicking the Save, Delete or Add buttons will not have effect, but you can still navigate between all fields in the row to complete editing.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Inline editing in the grid, set its `EditMode` property to `Telerik.Blazor.GridEditMode.Inline`, then handle the CRUD events as shown in the example below.

## Examples

### Basic

The example below shows how to:

* Implement inline Grid CRUD operations with the simplest and minimal required setup.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Reload the Grid `Data` after making changes to the data source. When using the Grid `OnRead` event, the component will fire `OnRead` and rebind automatically.
* Use `DataAnnotations` validation for some model class properties.

>caption Basic Grid inline editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
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
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
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

        await GridProductService.Create(createdItem);

        GridData = await GridProductService.Read();
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        await GridProductService.Delete(deletedItem);

        GridData = await GridProductService.Read();
    }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        await GridProductService.Update(updatedItem);

        GridData = await GridProductService.Read();
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

### Advanced

The example below shows how to:

* Implement inline Grid CRUD operations with all available events and various built-in customizations.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Reload the Grid `Data` after making changes to the data source. When using the Grid `OnRead` event, the component will fire `OnRead` and rebind automatically.
* Apply the user changes to the Grid `Data` parameter to spare one read request to the database.
* Use `DataAnnotations` validation for some model class properties.
* Mark a column as non-editable.
* Customize column editors without using an `EditorTemplate`.
* Render command buttons conditionally.
* Confirm **Delete** commands with the built-in Grid Dialog. You can also [intercept item deletion with a separate Dialog or a custom popup](slug:grid-kb-customize-delete-confirmation-dialog).
* Cancel the `OnAdd` and `OnEdit` events conditionally, so that the Grid does not go into edit mode.
* Cancel the `OnCancel` event conditionally, so that the Grid remains in edit mode and the user doesn't lose their unsaved changes.

>caption Advanced Grid inline editing configuration

````RAZOR
<TelerikGrid Data="@GridData"
             ConfirmDelete="@GridConfirmDelete"
             EditMode="@GridEditMode.Inline"
             OnAdd="@OnGridAdd"
             OnCancel="@OnGridCancel"
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
        <GridColumn Field="@nameof(Product.Description)" EditorType="@GridEditorType.TextArea">
            <Template>
                @{ var dataItem = (Product)context; }
                <div style="white-space:pre">@dataItem.Description</div>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" EditorType="@GridEditorType.Switch" />
        <GridCommandColumn Title="Commands" Width="180px">
            @{ var dataItem = (Product)context; }
            <GridCommandButton Command="Edit" ThemeColor="@AddEditButtonThemeColor">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
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

* [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
