---
title: Edit or Add Grid Item Programmatically
description: Edit or Add Grid Item Programmatically
type: how-to
page_title: Edit or Add Grid Item Programmatically
slug: grid-kb-add-edit-state
position: 
tags: grid, state
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

How to enter edit mode from code?

## Solution

The Grid state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the Grid state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the Grid in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug components/grid/columns/command%}).

>caption Enter Grid edit mode programmatically

````CSHTML
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
            <GridCommandButton Command="Save" ShowInEdit="true">Update</GridCommandButton>
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

* [Grid State]({%slug grid-state%})
* [Save the Grid state in a WebAssembly app]({%slug grid-kb-save-state-in-webassembly%})
