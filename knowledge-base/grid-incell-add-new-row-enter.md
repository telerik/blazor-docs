---
title: Add New Grid Row on Enter
description: How to add a new Grid row automatically when hitting Enter on the last row.
type: how-to
page_title: 
slug: grid-kb-incell-add-new-row-enter
position: 
tags: grid, edit
ticketid: 1579328
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

How to automatically append a new Grid row when hitting Enter while in edit mode on the last row?

When you press Enter while editing a cell on the last row, the Grid takes the row out of edit mode. How to automatically add a new row at the bottom of the Grid, and place the user in that row?


## Solution

The task includes a few required milestones:

* The application should detect when the user updates a cell on the *last* Grid row.
* Updating should occur via `Enter` on *any* cell or `Tab` on the *last* editable cell.
* The last editable cell may change after column reorder.

Here are the required development steps:

1. [Attach a `keyup` handler](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) for the Grid element (`div.k-grid`). Use a JavaScript code and call it once from `OnAfterRenderAsync`.
1. Use the [`keyup` event arguments](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) to track `Enter` and `Tab` key presses inside edit cells (`td.k-grid-edit-cell`) on the last table row in the Grid.
1. Check if the user is updating the last Grid row in the [`OnUpdate` handler](slug:grid-editing-overview#events).
1. If the previous point is true, then use JSInterop to verify if the user has pressed `Enter` or `Tab`. In this case, add a new data item at the end of the Grid `Data` collection.
1. If column reordering is enabled, use the [`OnStateChanged` event](slug:grid-state#events) to track which is the last editable column. Use this information when the user is tabbing, before adding a new data item to the Grid.

>tip Note that the `keyup` and `OnUpdate` events may fire in random order. The example below uses several JSInterop calls in `OnUpdate` to wait for the `keyup` event handler to execute and obtain its result.

>caption Add a new Grid row automatically on Enter or Tab

````RAZOR
@inject IJSRuntime js

<TelerikGrid Id="auto-line-grid"
             Data="@GridData"
             Navigable="true"
             Reorderable="true"
             EditMode="@GridEditMode.Incell"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate"
             OnDelete="@OnGridDelete"
             OnStateChanged="@( (GridStateEventArgs<Product> args) => OnGridStateChanged(args) )">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Item</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Editable="false" />
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Stock)" Title="Units In Stock" />
        <GridCommandColumn>
            <GridCommandButton Command="Delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@* suppress-error allows script tags in razor files. Move the script to a separate file in production *@
<script suppress-error="BL9992">
var lastKey;

function attachKeyHandler() {
    document.getElementById("auto-line-grid").addEventListener("keyup", function(e) {
        if ((e.code == "Enter" || (e.code == "Tab" && !e.shiftKey)) &&
            e.target.closest(".k-grid-edit-cell") &&
            !e.target.closest("tr").nextElementSibling) {
            lastKey = e.code;
        }
    });
}

function getLastKey() {
    var result = lastKey;
    // clear the logged key, so that it doesn't affect the next OnUpdate
    lastKey = "";
    return result;
}
</script>

@code {
    private List<Product> GridData { get; set; }

    // Generate IDs for newly added rows.
    private int LastId { get; set; }

    // Detect Tab on the last cell on the last row.
    private string LastColumnField { get; set; } = nameof(Product.Stock);

    // Distinguish between Tab and Enter after OnUpdate.
    private string LastKey { get; set; }

    #region Example-specific logic

    // called by OnGridUpdate
    private async Task AppendGridRow(string editField)
    {
        string lastKey = String.Empty;
        int waitCounter = 0;

        // Get the Tab/Enter key even if OnUpdate fires before keyup.
        // Adjust the counter and delay for the app server's typical latency.
        while (String.IsNullOrEmpty(lastKey) && waitCounter < 5)
        {
            waitCounter++;
            await Task.Delay(50);
            lastKey = await js.InvokeAsync<string>("getLastKey");
        }

        // do not add a new row when tabbing before the last cell
        if (!String.IsNullOrEmpty(lastKey) && (lastKey == "Enter" || editField == LastColumnField))
        {
            var newProduct = new Product() { Id = ++LastId };
            GridData.Add(newProduct);
        }
    }

    private void OnGridStateChanged(GridStateEventArgs<Product> args)
    {
        // Track the last editable column to know when tabbing from it.
        if (args.PropertyName == "ColumnStates")
        {
            int maxColumnIndex = 0;
            string maxColumnField = String.Empty;

            foreach (GridColumnState col in args.GridState.ColumnStates)
            {
                if (!String.IsNullOrEmpty(col.Field) && col.Index > maxColumnIndex && col.Field != nameof(Product.Id))
                {
                    maxColumnIndex = col.Index;
                    maxColumnField = col.Field;
                }
            }

            LastColumnField = maxColumnField;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            // listen for Tab and Enter keys
            await js.InvokeVoidAsync("attachKeyHandler");
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    #endregion

    #region Grid CRUD event handlers

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var item = args.Item as Product;
        var index = GridData.FindIndex(i => i.Id == item.Id);

        if (index != -1)
        {
            GridData[index] = item;
        }

        if (item.Id == GridData[GridData.Count - 1].Id)
        {
            await AppendGridRow(args.Field);
        }
    }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var item = args.Item as Product;
        item.Id = ++LastId;

        GridData.Insert(0, item);
    }

    private void OnGridDelete(GridCommandEventArgs args)
    {
        var item = args.Item as Product;

        GridData.Remove(item);
    }

    #endregion

    #region Data generation

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        var rnd = new Random();
        var totalRows = 1;

        LastId = totalRows;

        for (int i = 1; i <= totalRows; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = "Product " + i,
                Price = rnd.Next(1, 20) * 1.25m,
                Stock = rnd.Next(0, 10),
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Price { get; set; }
        public int Stock { get; set; }
    }

    #endregion
}
````

## See Also

* [Grid in cell editing](slug:grid-editing-incell)
