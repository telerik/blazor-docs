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

Popup editing enables the app to render a larger form that occupies a larger part of the screen and contain editable fields that are not visible in the Grid.

In this article:

* [Basics](#basics)
* [Customization](#customization)
    * [Editing of Hidden Columns](#editability-of-hidden-columns)
    * [Popup Customization](#popup-customization)
    * [Edit Form Customization](#edit-form-customization)
    * [Popup Form Customization](#popup-form-customization)
    * [Popup Buttons Customization](#popup-buttons-customization)

## Basics

Grid popup editing lets the user click an [Edit command button](slug:components/grid/columns/command) on the row, and a popup shows up with all its editable columns open up for changes. They can then click the **Save** button in the dialog to submit the changes to the model. This fires the `OnUpdate` event of the grid where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service).

In a similar fashion, the **Cancel** and **Delete** command buttons, and the **Add** toolbar command button fire events in the Grid to let you handle the data source operations.

You can also cancel the events by setting the `IsCancelled` property of the `GridCommandEventArgs` event argument to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Popup editing in the grid, set its `EditMode` property to `Telerik.Blazor.GridEditMode.Popup`, then handle the CRUD events as shown in the example below.

The Popup editing mode supports [validation](slug:common-features/input-validation). To use it, all you need to do is decorate your model with the desired annotations. Validation errors will be shown in the popup and will prevent the Update operation.

===

### Popup

Set the Grid `EditMode` parameter to `GridEditMode.Popup`. During popup editing, only one table row is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to focus the next or previous input component.
* Click the **Save** command button to confirm the current row changes and exit edit mode.
* Click the **Cancel** command button or press **ESC** to cancel the current row changes and exit edit mode.

Popup CUD operations use the following commands:

* **Add** command
* **Delete** command
* **Edit** command

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

Popup edit mode does not require **Save** and **Cancel** command buttons. The Grid renders them automatically in the popup, unless you define a [`<ButtonsTemplate>`](slug:grid-templates-popup-buttons) or a [`<FormTemplate>`](slug:grid-templates-popup-form).

The Grid commands execute row by row and the Grid events also fire row by row.

===

>caption Grid popup editing example. Please review the code comments

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>The example below shows how to:</p>

<ul>
    <li>Customize the popup edit form dimensions and layout.</li>
    <li>Render command buttons conditionally.</li>
    <li>Refresh the Grid after editing by reloading the data from the remote datasource.</li>
    <li>Refresh the Grid after editing by applying the user changes to the local data collection.</li>
    <li>Cancel the OnCancel event conditionally, so that the Grid remains in edit mode. Similar behavior can be achieved by cancelling OnCreate and OnUpdate.</li>
    <li>Confirm Delete commands with a built-in Grid dialog. You can also intercept Delete commands with a separate Dialog or a custom popup.</li>
    <li>Cancel the OnAdd and OnEdit events conditionally, so that the Grid does not go into edit mode.</li>
</ul>

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

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## Customization

The Grid exposes options to customize the edit popup and its form. Define the desired configuration in the `GridPopupEditSettings` and `GridPopupEditFormSettings` tags under the `GridSettings` tag.

### Editability of Hidden Columns

Starting with version 7.0, the Grid allows users to edit [hidden columns](slug:grid-columns-visible) by default. To disable editing of a hidden column, set `Editable="false"` to the respective `<GridColumn>` tag.

### Popup Customization

The `GridPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

For example, here is [how to set the Grid popup edit form's title, so that it matches a property value of the edited data item](slug:grid-kb-popup-edit-title).

### Edit Form Customization

The `GridPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#edit-form-settings)

>important These settings are not applicable if you are using a `<FormTemplate>` with a custom Form component. See more details in [Form Template - Specifics](slug:grid-templates-popup-form#specifics).

>caption Customize the popup edit form

````RAZOR
@*The snippet focuses on the popup edit form customization. CRUD events are not handled for brevity*@

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Popup" Pageable="true" Height="500px">
    <GridSettings>
        <GridPopupEditSettings MaxWidth="600px"
                               MaxHeight="300px"
                               Class="custom-popup">
        </GridPopupEditSettings>
        <GridPopupEditFormSettings Orientation="@FormOrientation.Horizontal"
                                   ButtonsLayout="FormButtonsLayout.Center"
                                   Columns="2">
        </GridPopupEditFormSettings>
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) />
        <GridColumn Field=@nameof(SampleData.Name) />
        <GridColumn Field=@nameof(SampleData.Team) />
        <GridColumn Field=@nameof(SampleData.HireDate) />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {

    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = "name " + x,
            Team = "team " + x % 5,
            HireDate = DateTime.Now.AddDays(-x).Date
        }).ToList();
}
````

### Popup Form Customization

In the `GridPopupEditFormSettings`, you can declare a `FormTemplate`. This template enables you to fully customize the appearance and content of the create/edit Popup window in the Grid. For more information and examples on customizing the Grid Popup window, refer to the [Popup Form Template](slug:grid-templates-popup-form) article.

### Popup Buttons Customization

You can specify a `ButtonsTemplate` in the `GridPopupEditFormSettings` to customize how the buttons look in the create/edit Popup window of the Grid. To learn more and see an example of customizing the Grid Popup buttons, refer to the [Popup Buttons Template](slug:grid-templates-popup-buttons) article.

## See Also

* [Live Demo: Grid Popup Editing](https://demos.telerik.com/blazor-ui/grid/editing-popup)
* [Custom Editor Template Per Field](slug:grid-templates-editor)
* [Custom Editor Layout](https://github.com/telerik/blazor-ui/tree/master/grid/custom-popup-form)
* [Blazor Grid](slug:grid-overview)