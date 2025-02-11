---
title: Customize the Delete Confirmation Dialog
description: How to customize the Delete Confirmation Dialog? 
type: how-to
page_title: Customize the Delete Confirmation Dialogs
slug: grid-kb-customize-delete-confirmation-dialog
position: 
tags: grid, customize, delete, confirmation, dialog, message
ticketid: 1553006, 1660439, 1625888
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor <br/>TreeList for Blazor <br/>Scheduler for Blazor </td>
        </tr>	
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to customize the built-in Delete Confirmation Dialog of the Grid?
* I want to add some item details to the text of the Delete Confirmation Dialog to notify the user for the item they are trying to delete. How to achieve that?
* How to change the text of the buttons in the Delete Confirmation Dialog?
* How to change the title and the content of the Delete Confirmation Dialog?

## Solution

The built-in Delete Confirmation Dialog requires minimum effort and code. It only needs the `ConfirmDelete` parameter of the Grid to be `true`. Thus, the dialog itself does not provide customization options. However, there are several ways to achieve a custom Delete Confirmation Dialog.

This article lists several samples for the Grid component. The suggested solutions, however, are applicable for the Treelist and Scheduler components, too.

You can use:

* [Localization](#localization) - this approach is useful if you just want to change the text of the built-in Delete Confirmation Dialog elements. It does not allow adding item details to the dialog text.
* [Predefined Dialog Component](#predefined-dialog-component) - this option is useful if you want to just change the dialog text and include some details for the item the user tries to delete (for example, record name).
* [Dialog Component](#dialog-component) - this solution allows you to fully customize the rendering and appearance of the dialog. You may add any desired content there, be that custom text, HTML elements or other components.


### Localization

You can enable [Localization](slug:globalization-localization) in your application and provide the desired custom text for the corresponding element keys.

The keys for the elements of the built-in Delete Confirmation Dialog are:

| Element | Key |
| --- | --- |
| Title | `Grid_ConfirmDeleteTitle` |
| Text | `Grid_ConfirmDeleteText` |
| OK button | `Grid_ConfirmDeleteOk` |
| Cancel button | `Grid_ConfirmDeleteCancel` |

>tip The keys for the Treelist and Scheduler components are the same, just change the component name before the `_` symbol.

### Predefined Dialog Component

Use a [Predefined Confirm Dialog](slug:dialog-predefined#confirm) with the desired custom text. Additionally, you may get the details for the current item and add them to the text:

* Use the Grid `Class` parameter to set a `z-index` style, which is lower than the default Dialog `z-index` of 10,000.
* Handle the [`OnDelete`](slug:grid-events#cud-events) event of the Grid.
* Display the predefined Dialog in the `OnDelete` handler.
* Cancel the event or proceed with the `OnDelete` logic depending on the user choice.
* The same approach is applicable to the `OnCreate` and `OnUpdate` events.

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikGrid Data="@GridData"
             Class="z-index-1"
             EditMode="@GridEditMode.Inline"
             OnDelete="@OnGridDelete"
             OnUpdate="@OnGridUpdate"
             Pageable="true"
             PageSize="20"
             Height="90vh">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<style>
    /* Create a stacking context for the whole Grid,
       which is lower than the stacking context of the Dialog. */
    .z-index-1 {
        z-index: 1;
    }
</style>

@code {
    [CascadingParameter]
    public DialogFactory? TelerikDialogs { get; set; }

    private List<Product> GridData { get; set; } = new();

    private int LastId { get; set; }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;

        bool cancelled = await ShouldCancel("Updating", updatedItem.Name);
        if (cancelled)
        {
            args.IsCancelled = true;
            return;
        }

        var originalItemIndex = GridData.FindIndex(i => i.Id == updatedItem.Id);

        if (originalItemIndex != -1)
        {
            GridData[originalItemIndex] = updatedItem;
        }
    }

    private async Task OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;

        bool cancelled = await ShouldCancel("Deleting", deletedItem.Name);
        if (cancelled)
        {
            args.IsCancelled = true;
            return;
        }

        GridData.Remove(deletedItem);
    }

    private async Task<bool> ShouldCancel(string operation, string name)
    {
        string dialogMessage = $"{operation} product {name}. Continue?";

        bool dialogResult = true;

        if (TelerikDialogs != null)
        {
            dialogResult = await TelerikDialogs.ConfirmAsync(dialogMessage, "Confirm Data Change");
        }

        return !dialogResult;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Name {LastId}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000),
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = "Default Name";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

### Dialog Component

Using the [Dialog component](slug:dialog-overview) will let you have fully customized Delete Confirmation Dialog. To handle the scenario:

* Declare a Dialog instance and add the desired content and buttons there. Normally, you would need at least two buttons - for confirmation and cancelling the delete operation.
* Use [custom commands](slug:components/grid/columns/command) instead of the built-in `Save` and `Delete` commands to obtain the data item and show the Dialog component.
* Handle the Dialog button clicks: 
    * Proceed with the item deletion in the Confirm button click handler. 
    * Hide the Dialog on Cancel. Optionally, [exit Grid edit mode programmatically](slug:grid-kb-add-edit-state).
* The same approach is applicable to the `OnCreate` and `OnUpdate` events.

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Inline"
             OnCancel="@OnGridCancel"
             Pageable="true"
             PageSize="20"
             Height="90vh">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="CustomSave"
                               OnClick="@OnGridSave"
                               ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            <GridCommandButton Command="CustomDelete"
                               OnClick="@OnGridDelete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<TelerikDialog @bind-Visible="@DialogVisible"
               Width="300px"
               ButtonsLayout="@DialogButtonsLayout.End">
    <DialogTitle>
        Confirm Data Change
    </DialogTitle>
    <DialogContent>
        @DialogContent
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@( () => OnDialogButtonClick(true) )"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Success">OK</TelerikButton>
        <TelerikButton OnClick="@( () => OnDialogButtonClick(false) )"
                       ThemeColor="@ThemeConstants.Button.ThemeColor.Error">Cancel</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private TelerikGrid<Product>? GridRef { get; set; }
    private List<Product> GridData { get; set; } = new();

    private bool DialogVisible { get; set; }

    private Product? ItemToUpdate { get; set; }
    private Product? ItemToDelete { get; set; }

    private MarkupString DialogContent { get; set; } = new();

    private int LastId { get; set; }

    private void OnGridSave(GridCommandEventArgs args)
    {
        var itemToUpdate = (Product)args.Item;
        ItemToUpdate = itemToUpdate;

        DialogContent = new MarkupString($"<p>Saving product <strong>{ItemToUpdate.Name}</strong>. <br /> Do you want to continue?</p>");
        DialogVisible = true;
    }

    private void OnGridDelete(GridCommandEventArgs args)
    {
        var deletedItem = (Product)args.Item;
        ItemToDelete = deletedItem;

        DialogContent = new MarkupString($"<p>Deleting product <strong>{ItemToDelete.Name}</strong>. <br /> Do you want to continue?</p>");
        DialogVisible = true;
    }

    private void OnGridCancel(GridCommandEventArgs args)
    {
        ItemToUpdate = null;
    }

    private async Task OnDialogButtonClick(bool operationConfirmed)
    {
        if (operationConfirmed)
        {
            if (ItemToDelete != null)
            {
                GridData.Remove(ItemToDelete);
            }

            if (ItemToUpdate != null)
            {
                var originalItemIndex = GridData.FindIndex(i => i.Id == ItemToUpdate.Id);

                if (originalItemIndex != -1)
                {
                    GridData[originalItemIndex] = ItemToUpdate;
                }
            }

            GridRef!.Rebind();
        }
        else if (ItemToUpdate != null)
        {
            var gridState = GridRef!.GetState();

            gridState.EditItem = null!;
            gridState.OriginalEditItem = null!;

            await GridRef!.SetStateAsync(gridState);
        }

        DialogVisible = false;

        ItemToDelete = null;
        ItemToUpdate = null;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Name {LastId}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000),
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = "Default Name";
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [Grid Editing](slug:components/grid/editing/overview)
* [Dialog Overview](slug:dialog-overview)
