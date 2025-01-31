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

Inline editing lets the user click an [Edit command button](slug:components/grid/columns/command) on the row, and all its editable columns open up for changes. They can then click a `Save` command button to submit the changes to the data access layer. This fires the `OnUpdate` event of the grid where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service).

In a similar fashion, the `Cancel` and `Delete` command buttons fire events on the grid to let you handle the data source operations.

When validation is not satisfied, clicking the Save, Delete or Add buttons will not have effect, but you can still navigate between all fields in the row to complete editing.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Inline editing in the grid, set its `EditMode` property to `Telerik.Blazor.GridEditMode.Inline`, then handle the CRUD events as shown in the example below.

>caption The Command buttons and the grid events let you handle data operations in Inline edit mode (see the code comments for details)

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>The example below shows how to:</p>

<ul>
    <li>Render command buttons conditionally.</li>
    <li>Refresh the Grid after editing by reloading the data from the remote datasource.</li>
    <li>Refresh the Grid after editing by applying the user changes to the local data collection.</li>
    <li>Cancel the OnCancel event conditionally, so that the Grid remains in edit mode. Similar behavior can be achieved by cancelling OnCreate and OnUpdate.</li>
    <li>Confirm Delete commands with a built-in Grid dialog. You can also intercept Delete commands with a separate Dialog or a custom popup.</li>
    <li>Cancel the OnAdd and OnEdit events conditionally, so that the Grid does not go into edit mode.</li>
</ul>

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
        <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ShouldConfirmOnCancel" /> Confirm Cancel Commands</label>
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
        <GridColumn Field="@nameof(Product.Discontinued)" Width="120px" />
        <GridCommandColumn Title="Commands" Width="180px">
            @{ var dataItem = (Product)context; }
            <GridCommandButton Command="Edit" ThemeColor="@AddEditButtonThemeColor">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ThemeColor="@CancelButtonThemeColor" ShowInEdit="true">Cancel</GridCommandButton>
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

>caption The result from the code snippet above, after the Edit button was clicked on the fourth row

![Blazor Grid Inline Editing](images/inline-editing.png)

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## See Also

  * [Live Demo: Grid Inline Editing](https://demos.telerik.com/blazor-ui/grid/editing-inline)
  * [Blazor Grid](slug:grid-overview)
