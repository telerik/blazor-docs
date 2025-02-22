#overview-required

> This article requires the knowledge from [Grid CRUD Operations](slug:grid-editing-overview).

#end

#without-commands

Without using the above command buttons, the application can:

* [Manage add or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

#end

#basic-example-description
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Rebind the Grid automatically through the `OnRead` event after the create, delete, or update operation is complete. When [using the `Data` parameter, you must either query the data source again, or modify the local `Data` collection manually](#advanced).
* Use `DataAnnotations` validation for some model class properties.
#end

#basic-example-parameters-columns
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
#end

#basic-example-code
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
#end

#crud-service-and-model
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
#end

#advanced-example-description
* Use the `OnCreate`, `OnDelete` and `OnUpdate` events to make changes to the Grid data source.
* Reload the Grid `Data` after making changes to the data source. When [using the Grid `OnRead` event, the component will fire `OnRead` and rebind automatically](#basic).
* Apply the user changes to the Grid `Data` parameter to spare one read request to the database.
* Use `DataAnnotations` validation for the `Name` and `ReleaseDate` properties.
* Define the `Id` column as non-editable.
* Customize the `Description` and `Discontinued` column editors without using an `EditorTemplate`.
* Render the **Delete** command button conditionally if `Discontinued` is `true`.
* Confirm **Delete** commands with the built-in Grid Dialog. You can also [intercept item deletion with a separate Dialog or a custom popup](slug:grid-kb-customize-delete-confirmation-dialog).
* Cancel the `OnAdd` and `OnEdit` events conditionally, so that the Grid does not go into edit mode.
* Cancel the `OnCancel` event conditionally, so that the Grid remains in edit mode and the user doesn't lose their unsaved changes.
#end

#advanced-example-parameters
             OnAdd="@OnGridAdd"
             OnCancel="@OnGridCancel"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnEdit="@OnGridEdit"
             OnUpdate="@OnGridUpdate"
             Pageable="true"
             PageSize="5"
             Sortable="true">
#end

#advanced-example-toolbar
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" ThemeColor="@AddEditButtonThemeColor">Add Item</GridCommandButton>
        <span class="k-separator"></span>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShouldCancelOnAddEdit" /> Cancel OnAdd and OnEdit Events</label>
        <span class="k-separator"></span>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@GridConfirmDelete" /> Confirm Delete Commands</label>
        <span class="k-separator"></span>
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShouldConfirmOnCancel" /> Confirm Cancel Commands</label>
    </GridToolBarTemplate>
#end

#advanced-example-columns
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" EditorType="@GridEditorType.Switch" />
#end

#advanced-example-code
    private List<Product> GridData { get; set; } = new();

    private ProductService GridProductService { get; set; } = new();

    [CascadingParameter]
    public DialogFactory? TelerikDialogs { get; set; }

    #region Example Settings

    private bool GridConfirmDelete { get; set; } = true;
    private bool ShouldCancelOnAddEdit { get; set; }
    private bool ShouldConfirmOnCancel { get; set; } = true;

    private string AddEditButtonThemeColor => ShouldCancelOnAddEdit ? ThemeConstants.Button.ThemeColor.Error : ThemeConstants.Button.ThemeColor.Base;
    private string DeleteButtonThemeColor => GridConfirmDelete ? ThemeConstants.Button.ThemeColor.Base : ThemeConstants.Button.ThemeColor.Warning;
    private string CancelButtonThemeColor => ShouldConfirmOnCancel ? ThemeConstants.Button.ThemeColor.Base : ThemeConstants.Button.ThemeColor.Warning;

    #endregion Example Settings

    #region Grid Events

    private void OnGridAdd(GridCommandEventArgs args)
    {
        if (ShouldCancelOnAddEdit)
        {
            args.IsCancelled = true;
        }
    }

    private async Task OnGridCancel(GridCommandEventArgs args)
    {
        if (ShouldConfirmOnCancel && TelerikDialogs != null)
        {
            bool shouldContinue = await TelerikDialogs.ConfirmAsync("Do you want to discard your changes?");

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
        // Create the item in the local data instead of reloading.
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
        // Delete the item in the local data instead of reloading.
        //GridData.Remove(deletedItem);
    }

    private void OnGridEdit(GridCommandEventArgs args)
    {
        if (ShouldCancelOnAddEdit)
        {
            args.IsCancelled = true;
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
        // Update the item in the local data instead of reloading.
        //int originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);
        //if (originalItemIndex != -1)
        //{
        //    GridData[originalItemIndex] = updatedItem;
        //}
    }

    #endregion Grid Events

    protected override async Task OnInitializedAsync()
    {
        GridData = await GridProductService.Read();
    }
#end
