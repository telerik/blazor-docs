---
title: Enter and Exit Grid Edit Mode Programmatically
description: How to add and edit Grid rows programmatically or with custom buttons.
type: how-to
page_title: Enter and Exit Grid Edit Mode from Code
slug: grid-kb-add-edit-state
position: 
tags: grid, state, editing
ticketid:
res_type: kb
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

* How to enter edit mode from code?
* How to initiate insert and edit operations programmatically, instead of using [command buttons](slug:components/grid/columns/command)?
* How to add new Grid rows with a custom button, which is outside the component?
* How to insert Grid rows with an external button?
* How to cancel Grid edit mode programmatically?
* How to implement Grid command buttons outside the Grid?


## Solution

This scenario requires knowledge about the [Grid State](slug:grid-state). Get familiar with the following sections first:

* [Information in the Grid State](slug:grid-state#information-in-the-grid-state)
* [Grid State Methods](slug:grid-state#methods)

To enter and exit edit mode, set the following properties of the `GridState` object:

* `InsertedItem` must be a new data item instance that will potentially be added to the Grid. Applicable only for `Inline` and `Popup` edit mode. You can set some default values, if needed.
* `OriginalEditItem` must be a reference to an existing data item.
* `EditItem` must be a clone (copy) of the `OriginalEditItem`. Later it will either update the original item, or be discarded.
* `EditField` is used for incell editing only. It determines which cell will render an editor.

Each property that is not relevant to a desired Grid state, should be set to `null`.


## Example

The sample below shows how to add, edit, cancel and save items in [`Inline`](slug:grid-editing-inline) and [`Popup`](slug:grid-editing-popup) `EditMode`.

All these operations can also be used for [`Incell`](slug:grid-editing-incell). However, blurring the edited cell triggers [`OnUpdate`](slug:grid-editing-overview#events), so external UI to manage the Grid doesn't make sense. Some special [`EditorTemplate`](slug:grid-templates-editor) may benefit from programmatic incell cancel or update. The required logic is the same as with inline editing, with the addition of `EditField`.

>caption Enter and exit Grid edit mode programmatically

````RAZOR
<h1>Grid Edit Operations via the State</h1>

<h2>Inline and Popup EditMode</h2>

<TelerikGrid @ref="@GridInlineRef"
             Data="@GridInlineData"
             EditMode="@GridEditMode.Inline"
             OnCreate="@OnGridInlineCreate"
             OnUpdate="@OnGridInlineUpdate">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add</GridCommandButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineAdd">Programmatic Add</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineEdit">Programmatic Edit</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineCancel">Programmatic Cancel</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@InlineUpdate">Programmatic Update</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<h2>Incell EditMode</h2>

<TelerikGrid @ref="@GridIncellRef"
             Data="@GridIncellData"
             EditMode="@GridEditMode.Incell"
             OnCreate="@OnGridIncellCreate"
             OnUpdate="@OnGridIncellUpdate">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add">Add</GridCommandButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@IncellAdd">Programmatic Add</TelerikButton>
        <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Secondary"
                       OnClick="@IncellEdit">Programmatic Edit</TelerikButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Stock)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product> GridInlineRef { get; set; } = null!;
    private TelerikGrid<Product> GridIncellRef { get; set; } = null!;

    private List<Product> GridInlineData { get; set; } = new List<Product>();
    private List<Product> GridIncellData { get; set; } = new List<Product>();

    #region Programmatic Inline Editing

    private async Task InlineAdd()
    {
        var gridState = GridInlineRef.GetState();

        gridState.InsertedItem = new Product();
        gridState.InsertedItem.Name = "New value";
        gridState.OriginalEditItem = null;
        gridState.EditItem = null;

        await GridInlineRef.SetStateAsync(gridState);
    }

    private async Task InlineEdit()
    {
        if (GridInlineData.Any())
        {
            var gridState = GridInlineRef.GetState();

            gridState.InsertedItem = null;
            gridState.OriginalEditItem = GridInlineData.First();
            gridState.EditItem = GridInlineData.First().Clone();
            gridState.EditItem.Name = "Updated inline value";

            await GridInlineRef.SetStateAsync(gridState);
        }
    }

    private async Task InlineCancel()
    {
        var gridState = GridInlineRef.GetState();

        gridState.InsertedItem = null;
        gridState.OriginalEditItem = null;
        gridState.EditItem = null;

        await GridInlineRef.SetStateAsync(gridState);
    }

    private async Task InlineUpdate()
    {
        var gridState = GridInlineRef.GetState();

        if (gridState.EditItem != null)
        {
            OnGridInlineUpdate(new GridCommandEventArgs()
            {
                Item = gridState.EditItem
            });
        }
        else if (gridState.InsertedItem != null)
        {
            OnGridInlineCreate(new GridCommandEventArgs()
            {
                Item = gridState.InsertedItem
            });
        }

        gridState.InsertedItem = null;
        gridState.OriginalEditItem = null;
        gridState.EditItem = null;

        await GridInlineRef.SetStateAsync(gridState);
    }

    #endregion Programmatic Inline Editing

    #region Programmatic Incell Editing

    private async Task IncellAdd()
    {
        var gridState = GridIncellRef.GetState();

        var insertedProduct = new Product();

        OnGridIncellCreate(new GridCommandEventArgs()
        {
            Item = insertedProduct
        });

        gridState.OriginalEditItem = insertedProduct;
        gridState.EditItem = insertedProduct.Clone();
        gridState.EditField = nameof(Product.Name);
        gridState.EditItem.Name = "New value";

        await GridIncellRef.SetStateAsync(gridState);
    }

    private async Task IncellEdit()
    {
        if (GridIncellData.Any())
        {
            var gridState = GridIncellRef.GetState();

            gridState.OriginalEditItem = GridIncellData.First();
            gridState.EditItem = GridIncellData.First().Clone();
            gridState.EditField = nameof(Product.Name);
            gridState.EditItem.Name = "Updated incell value";

            await GridIncellRef.SetStateAsync(gridState);
        }
    }

    #endregion Programmatic Incell Editing

    #region Grid Inline Editing Handlers

    private void OnGridInlineUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;
        var index = GridInlineData.FindIndex(i => i.Id == updatedItem.Id);
        if (index != -1)
        {
            GridInlineData[index] = updatedItem;
        }
    }

    private void OnGridInlineCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;
        createdItem.Id = Guid.NewGuid();
        GridInlineData.Insert(0, createdItem);
    }

    #endregion Grid Inline Editing Handlers

    #region Grid Incell Editing Handlers

    private void OnGridIncellUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (Product)args.Item;
        var index = GridIncellData.FindIndex(i => i.Id == updatedItem.Id);
        if (index != -1)
        {
            GridIncellData[index] = updatedItem;
        }
    }

    private void OnGridIncellCreate(GridCommandEventArgs args)
    {
        var createdItem = (Product)args.Item;
        createdItem.Id = Guid.NewGuid();
        GridIncellData.Insert(0, createdItem);
    }

    #endregion Grid Incell Editing Handlers

    #region Data Generation and Model

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 3; i++)
        {
            GridInlineData.Add(new Product()
            {
                Id = Guid.NewGuid(),
                Name = $"Product {i}",
                Stock = (short)rnd.Next(0, 1000)
            });
            GridIncellData.Add(new Product()
            {
                Id = Guid.NewGuid(),
                Name = $"Product {10 + i}",
                Stock = (short)rnd.Next(0, 1000)
            });
        }
    }

    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public int Stock { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool InProduction { get; set; }

        public Product Clone()
        {
            return new Product()
            {
                Id = Id,
                Name = Name,
                Price = Price,
                Stock = Stock,
                ReleaseDate = ReleaseDate,
                InProduction = InProduction
            };
        }
    }

    #endregion Data Generation and Model
}
````

## See Also

* [Grid State documentation](slug:grid-state)
* [GridState API reference](slug:Telerik.Blazor.Components.GridState-1)
