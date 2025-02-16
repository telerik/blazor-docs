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

In Cell editing allows the user to click cells and type new values immediately like in Excel. There is no need for Edit, Update and Cancel buttons.

Users can use the `Tab`, `Shift+Tab` and `Enter` keys to move between edited cells quickly. If validation is not satisfied, the user cannot exit edit mode, unless they satisfy validation, or cancel changes by pressing `Esc`.

Command columns and non-editable columns are skipped while tabbing.

The InCell edit mode provides a specific user experience and behaves differently than other edit modes. Please review the notes below to get a better understanding of these specifics.


#### Sections in this article

* [Basics](#basics)
* [Event Sequence](#event-sequence)
* [Incell Editing and Selection](#incell-editing-and-selection)
* [Editor Template](#editor-template)


## Basics

### In Cell

Set the Grid `EditMode` parameter to `GridEditMode.Incell`. During in-cell editing, only one table cell is in edit mode. The user can:

* Press **Tab** or **Shift** + **Tab** to confirm the current value and edit the next or previous cell.
* Press **Enter** to confirm the current value and edit the cell below.
* Press **ESC** to cancel the current change and exit edit mode.
* Click on another cell to confirm the current value and edit the new cell.
* Click outside the Grid to confirm the current value and exit edit mode.
* Peform another Grid operation, for example, paging or sorting, to cancel the current edit operation.

The Grid commands execute cell by cell and the Grid events also fire cell by cell.

In-cell CUD operations use the following commands:

* **Add** command
* **Delete** command

Without using the above command buttons, the application can:

* [Manage insert or edit mode](slug:grid-kb-add-edit-state) through the [Grid state](slug:grid-state).
* Modify data items directly in the Grid `Data` collection or the data source. [Rebind the Grid](slug:common-features-data-binding-overview#refresh-data) afterwards.

In-cell edit mode does not require **Edit**, **Save**, and **Cancel** command buttons.

In in-cell edit mode, the `OnAdd` and `OnCreate` events fire immediately one after the other, unless `OnAdd` is cancelled. This means that users are always editing existing rows. They are never adding a new row.

===

To enable InCell editing mode, set the `EditMode` property of the grid to `Telerik.Blazor.GridEditMode.Incell`. You can handle the `OnUpdate`, `OnCreate` and `OnDelete` events to perform the CUD operations, as shown in the example below. 

To add a new item, you must add a [toolbar](slug:components/grid/features/toolbar) with an `Add` command. `OnCreate` will fire immediately when you click the `Add` button - see [Event Sequence](#event-sequence) below.

It is up to the data access logic to save the data once it is changed in the data collection. The example below showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

>caption Incell Editing Example. See the code comments for details.

````RAZOR
@using System.ComponentModel.DataAnnotations
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>The example below shows how to:</p>

<ul>
    <li>Render command buttons conditionally.</li>
    <li>Refresh the Grid after editing by reloading the data from the remote datasource.</li>
    <li>Refresh the Grid after editing by applying the user changes to the local data collection.</li>
    <li>Confirm Delete commands with a built-in Grid dialog. You can also intercept Delete commands with a separate Dialog or a custom popup.</li>
    <li>Cancel the OnAdd and OnEdit events conditionally, so that the Grid does not go into edit mode.</li>
</ul>

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

>caption InCell editing behavior

![Blazor Grid Incell Editing](images/incell-editing.gif)


## Event Sequence

* The `OnCreate` event will fire as soon as you click the `Add` button. The Grid will render the new row and enter edit mode for the first editable column (to fire `OnEdit` and let the user alter the column). This means you should have [default values](slug:grid-kb-default-value-for-new-row) that satisfy any initial validation and requirements your models may have.

    * This means that there is no actual inserted item, an item in InCell editing is always in Edit mode, never in Insert mode. Thus, you cannot use the `InsertedItem` field of the Grid [State](slug:grid-state). If you want to insert items programmatically in the Grid, alter the `Data` collection, and use the `OriginalEditItem` feature of the state (see the [Initiate Editing or Inserting of an Item](slug:grid-kb-add-edit-state) example - it can put the InLine and Popup edit modes in Insert mode, but this cannot work for InCell editing).

* The `OnEdit` event fires every time a cell is opened for editing. Until version **2.27**, the event fired **once per row** - when the user edits a cell from a different row.

* The `OnUpdate` event fires every time an edited cell is closed. Until version **2.27**, the event fired **once per row** - when the currently edited row loses focus.

* If there is a cell that is being edited at the moment, clicking on another cell will first close the current cell and fire `OnUpdate`. To start editing the new cell, you need a second click. When the user removes focus from the Grid or the current row, the `OnUpdate` event fires, where the data-access logic can move it to the actual data source. 

* The `OnCancel` event works only when pressing `Esc`. The `Cancel` command button is not supported. Clicking outside the currently edited cell will trigger `OnUpdate` and thus, clicking on the `Cancel` command button will not fire the `OnCancel` event, because an update has already occured.


## Incell Editing and Selection

* To enable row selection with InCell Edit Mode, add a `<GridCheckboxColumn />` to the `<Columns>` collection. More information on that can be read in the [Row Selection](slug:grid-selection-row#selection-and-editing-modes) article.

    * To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode](slug:grid-kb-row-select-incell-edit) Knowledge Base article.


## Editor Template

The incell editor template requires a focusable element to maintain the tab order when using the keyboard. If you prevent editing based on a runtime condition, you must provide some focusable element. (Setting `Editable=false` for the entire column does not require a focusable element.) Here is one way to add a focusable non-editable element:

<div class="skip-repl"></div>

````RAZOR
<EditorTemplate>
    @{
        if (myCurrentEditCondition)
        {
            <MyCustomEditor />
        }
        else
        {
            <div tabindex="0">editing not allowed</div>
        }
    }
</EditorTemplate>
````

## Examples

The following two examples show Grid in-cell editing in action:

* A basic example that includes only the minimum required setup.
* A more comprehensive example that includes additional event handlers, custom logic, and a simulated data service.


### Basic InCell Editing Example

### Comprehensive InCell Editing Example


## See Also

* [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
* [Grid Selection Documentation](slug:grid-selection-overview)
* [Blazor Grid](slug:grid-overview)
