---
title: Popup Editing
page_title: Grid - Popup Editing
description: Popup editing of data in Grid for Blazor.
slug: components/grid/editing/popup
tags: telerik,blazor,grid,Popup,editing
published: True
position: 2
---

# Grid Popup Editing

Popup editing enables the app to render a larger form with customizable dimensions and layout. This edit mode is also more suitable for mobile devices with small screens. The popup edit form may contain editable fields from hidden columns in the Grid table.

> This article requires familiarity with the information at [Grid CRUD Operations](slug:components/grid/editing/overview).

## Basics

To use popup Grid editing, set the Grid `EditMode` parameter to `GridEditMode.Popup`. During popup editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous input component.
* Click the **Save** command button to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.

The popup edit mode can display a [Telerik Validation Summary component](slug:validation-tools-summary) if the Grid model is configured for validation.

## Commands

Popup add, edit, and delete operations use the following [command buttons](slug:components/grid/editing/overview#commands):

* **Add**
* **Delete**
* **Edit**

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

Popup edit mode does not use **Save** and **Cancel** command buttons in the [Grid command column](slug:grid-columns-command). The Grid renders them automatically in the popup, unless you define a [Buttons Template](slug:grid-templates-popup-buttons) or a [Form Template](slug:grid-templates-popup-form).

The Grid commands execute row by row and the Grid events also fire row by row.

## Customization

The Grid exposes options to customize the edit popup and its form. Define the desired configuration in the `GridPopupEditSettings` and `GridPopupEditFormSettings` tags under the `GridSettings` tag.

### Edit Hidden Columns

Starting with version 7.0, the Grid allows users to edit [hidden columns](slug:grid-columns-visible) by default. To disable editing of a hidden column, set `Editable="false"` to the respective `<GridColumn>` tag.

### Popup Dimensions and Styles

The `GridPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

For example, here is [how to set the Grid popup edit form's title, so that it matches a property value of the edited data item](slug:grid-kb-popup-edit-title).

### Form Layout

The `GridPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#edit-form-settings)

>important These settings are not applicable if you are using a `<FormTemplate>` with a custom Form component. See more details in [Form Template - Specifics](slug:grid-templates-popup-form#specifics).

### Form Template

In the `GridPopupEditFormSettings`, you can declare a `FormTemplate`. This template enables you to fully customize the appearance and content of the create/edit Popup window in the Grid. For more information and examples on customizing the Grid Popup window, refer to the [Popup Form Template](slug:grid-templates-popup-form) article.

### Buttons Template

You can specify a `ButtonsTemplate` in the `GridPopupEditFormSettings` to customize how the buttons look in the create/edit Popup window of the Grid. To learn more and see an example of customizing the Grid Popup buttons, refer to the [Popup Buttons Template](slug:grid-templates-popup-buttons) article.

## Examples

### Basic

The example below shows how to:

* Implement popup Grid CRUD operations with the simplest and minimal required setup.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Rebind the Grid automatically through the `OnRead` event after the create, delete, or update operation is complete. When [using the `Data` parameter, you must either query the data source again, or modify the local `Data` collection manually](#advanced).
* Use `DataAnnotations` validation for some model class properties.

>caption Basic Grid popup editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid OnRead="OnGridRead"
             TItem="@Product"
             EditMode="@GridEditMode.Popup"
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

* Implement popup Grid CRUD operations with all available events and various built-in customizations.
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Reload the Grid `Data` after making changes to the data source. When [using the Grid `OnRead` event, the component will fire `OnRead` and rebind automatically](#basic).
* Apply the user changes to the Grid `Data` parameter to spare one read request to the database.
* Use `DataAnnotations` validation for some model class properties.
* Mark a column as non-editable.
* Edit a column that is not visible in the Grid.
* Customize the popup edit form dimensions and layout.
* Customize column editors without using an `EditorTemplate`.
* Render command buttons conditionally.
* Confirm **Delete** commands with the built-in Grid Dialog. You can also [intercept item deletion with a separate Dialog or a custom popup](slug:grid-kb-customize-delete-confirmation-dialog).
* Cancel the `OnAdd` and `OnEdit` events conditionally, so that the Grid does not go into edit mode.
* Cancel the `OnCancel` event conditionally, so that the Grid remains in edit mode and the user doesn't lose their unsaved changes.

>caption Advanced Grid popup editing configuration

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikGrid Data="@GridData"
             ConfirmDelete="@GridConfirmDelete"
             EditMode="@GridEditMode.Popup"
             OnAdd="@OnGridAdd"
             OnCancel="@OnGridCancel"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnEdit="@OnGridEdit"
             OnUpdate="@OnGridUpdate"
             Pageable="true"
             PageSize="5"
             Sortable="true">
    <GridSettings>
        <GridPopupEditSettings Width="600px" MaxWidth="90vw" Height="400px" MaxHeight="90vh" />
        <GridPopupEditFormSettings Columns="2" ColumnSpacing="2em" ButtonsLayout="@FormButtonsLayout.Stretch" />
    </GridSettings>
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
        <GridColumn Field="@nameof(Product.Description)" Visible="false" EditorType="@GridEditorType.TextArea">
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

* [Live Demo: Grid Popup Editing](https://demos.telerik.com/blazor-ui/grid/editing-popup)
* [Custom Editor Template Per Field](slug:grid-templates-editor)
* [Custom Editor Layout](https://github.com/telerik/blazor-ui/tree/master/grid/custom-popup-form)
* [Blazor Grid](slug:grid-overview)